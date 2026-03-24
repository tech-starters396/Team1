import { useEffect, useState } from "react";
import apiClient from "../api/client";

interface Job {
  id: number;
  job_title: string;
  company: string;
  location: string;
  experience_level: string;
  job_type: string;
  description: string;
  salary?: string;
  key_responsibilities?: string;
  basic_qualifications?: string;            
  preferred_qualifications?: string;        
  apply_url: string;
  status?: string;
}

interface JobListProps {
  searchTerm: string;
  locationFilter: string;
  jobTypeFilter: string;
  experienceFilter: string;
  salaryFilter: string;
}

function JobList({
  searchTerm,
  locationFilter,
  jobTypeFilter,
  experienceFilter,
  salaryFilter,
}: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  const normalizeStatus = (status: string | undefined) => (status || "").trim().toLowerCase();
  const extractSalaryNumbers = (salary: string | undefined) => {
    if (!salary) return [];
    return (salary.match(/\d[\d,]*/g) || [])
      .map((value) => Number(value.replace(/,/g, "")))
      .filter((value) => !Number.isNaN(value));
  };

  const matchesSalaryFilter = (salary: string | undefined, selectedRange: string) => {
    if (selectedRange === "") return true;

    const salaryValues = extractSalaryNumbers(salary);
    if (salaryValues.length === 0) return false;

    const highestSalary = Math.max(...salaryValues);

    switch (selectedRange) {
      case "under-50000":
        return highestSalary < 50000;
      case "50000-99999":
        return highestSalary >= 50000 && highestSalary <= 99999;
      case "100000-149999":
        return highestSalary >= 100000 && highestSalary <= 149999;
      case "150000-plus":
        return highestSalary >= 150000;
      default:
        return true;
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    apiClient
      .get("/companies/")
      .then((response) =>
        setJobs(
          response.data.map((job: Job) => ({
            ...job,
            status: normalizeStatus(job.status),
          }))
        )
      )
      .catch((error) => console.error(error));
  };

  const handleSave = async (id: number) => {
    try {
      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job.id === id ? { ...job, status: "saved" } : job
        )
      );

      await apiClient.patch(`/companies/${id}/`, {
        status: "saved"
      });
    } catch (err: any) {
      console.error("ERROR RESPONSE:", err.response?.data);
      fetchJobs();
    }
  };

 const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      search === "" ||
      job.job_title.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search) ||
      job.location.toLowerCase().includes(search) ||
      job.description.toLowerCase().includes(search);

    const matchesLocation =
      locationFilter === "" ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesType =
      jobTypeFilter === "" ||
      job.job_type.toLowerCase() === jobTypeFilter.toLowerCase();

    const matchesExperience =
      experienceFilter === "" ||
      job.experience_level.toLowerCase() === experienceFilter.toLowerCase();

    const matchesSalary = matchesSalaryFilter(job.salary, salaryFilter);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesExperience &&
      matchesSalary
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Discover Jobs
      </h2>

      {filteredJobs.length === 0 ? (
        <p className="text-gray-500">No jobs available.</p>
      ) : (
        filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm cursor-pointer hover:shadow-md transition"
            onClick={() =>
              setExpandedJobId(
                expandedJobId === job.id ? null : job.id
              )
            }
          >
            {/* BASIC INFO */}
            <h2 className="text-lg font-bold text-gray-900">
              {job.job_title}
            </h2>

            <p className="text-blue-600 font-semibold text-sm">
              {job.company}
            </p>

            <p className="text-gray-600 text-sm">
              {job.location} • {job.job_type}
            </p>

            {job.salary && (
              <p className="text-green-600 font-semibold mt-1">
                {job.salary}
              </p>
            )}

            {/* EXPANDED */}
            {expandedJobId === job.id && (
              <div className="mt-4 border-t pt-4">

                {/* DESCRIPTION */}
                <p className="text-gray-700 mb-3">
                  {job.description}
                </p>

                {/* RESPONSIBILITIES */}
                {job.key_responsibilities && (
  <div className="mt-3">
    <h4 className="font-semibold text-gray-800 mb-1">
      Key Responsibilities
    </h4>

    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
      {job.key_responsibilities
        .split("\n")
        .filter(line => line.trim() !== "")
        .map((line, index) => (
          <li key={index}>
            {line.replace("-", "").trim()}
          </li>
        ))}
    </ul>
  </div>
)}

                {/*  BASIC QUALIFICATIONS BULLETS */}
                {job.basic_qualifications && (
                  <div className="mt-3">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Basic Qualifications
                    </h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {job.basic_qualifications.split("\n").map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* PREFERRED QUALIFICATIONS BULLETS */}
                {job.preferred_qualifications && (
                  <div className="mt-3">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Preferred Qualifications
                    </h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {job.preferred_qualifications.split("\n").map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* ACTIONS */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave(job.id);
                    }}
                    className={`px-3 py-1 rounded-lg text-white ${
                      normalizeStatus(job.status) === "saved"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {normalizeStatus(job.status) === "saved" ? "Saved" : "Save"}
                  </button>

                  <a
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-100">
                      Apply
                    </button>
                  </a>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default JobList;
