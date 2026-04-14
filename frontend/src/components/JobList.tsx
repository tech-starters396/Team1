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
  show_in_discover?: boolean;
}

interface AuthUser {
  id: number;
  username: string;
  is_staff: boolean;
  is_superuser: boolean;
}

interface JobListProps {
  currentUser: AuthUser | null;
  onRequireAuth: () => void;
  searchTerm: string;
  locationFilter: string;
  jobTypeFilter: string;
  experienceFilter: string;
  salaryFilter: string;
}

function JobList({
  currentUser,
  onRequireAuth,
  searchTerm,
  locationFilter,
  jobTypeFilter,
  experienceFilter,
  salaryFilter,
}: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newJob, setNewJob] = useState({
    company: "",
    job_title: "",
    location: "",
    salary: "",
    job_type: "Full-time",
    experience_level: "Entry",
    description: "",
    key_responsibilities: "",
    basic_qualifications: "",
    preferred_qualifications: "",
    apply_url: "",
    status: "new",
    show_in_discover: true,
  });

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
    if (!currentUser) {
      onRequireAuth();
      return;
    }

    try {
      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job.id === id ? { ...job, status: "saved" } : job
        )
      );

      await apiClient.patch(`/companies/${id}/`, {
        status: "saved"
      });
      fetchJobs();
    } catch (err: any) {
      console.error("ERROR RESPONSE:", err.response?.data);
      alert("Failed to save this job to your tracker.");
      fetchJobs();
    }
  };

  const handleAddDiscoverJob = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiClient.post("/companies/", newJob);
      setShowAddModal(false);
      setNewJob({
        company: "",
        job_title: "",
        location: "",
        salary: "",
        job_type: "Full-time",
        experience_level: "Entry",
        description: "",
        key_responsibilities: "",
        basic_qualifications: "",
        preferred_qualifications: "",
        apply_url: "",
        status: "new",
        show_in_discover: true,
      });
      fetchJobs();
    } catch (err: any) {
      console.error("Error adding discover job:", err.response?.data || err);
      alert("Failed to add discover job.");
    }
  };

  const handleDeleteDiscoverJob = async (id: number) => {
    if (!confirm("Delete this job from Discover?")) return;

    try {
      await apiClient.delete(`/companies/${id}/`);
      setJobs((currentJobs) => currentJobs.filter((job) => job.id !== id));
    } catch (err: any) {
      console.error("Error deleting discover job:", err.response?.data || err);
      alert("Failed to delete discover job.");
    }
  };

 const discoverJobs = jobs.filter(
    (job) => job.show_in_discover !== false
  );

 const filteredJobs = discoverJobs.filter((job) => {
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
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Discover Jobs
          </h2>
          <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
            {filteredJobs.length} job{filteredJobs.length === 1 ? "" : "s"}
          </span>
        </div>
        {currentUser?.is_staff && (
          <button
            onClick={() => setShowAddModal(true)}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 shadow-sm"
          >
            + Add Discover Job
          </button>
        )}
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-gray-500">No jobs available.</p>
      ) : (
        filteredJobs.map((job) => {
          const isSavedToTracker = ["saved", "applied", "interview"].includes(normalizeStatus(job.status));
          return (
          <div
            key={job.id}
            className="group bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm cursor-pointer hover:shadow-md transition relative"
            onClick={() =>
              setExpandedJobId(
                expandedJobId === job.id ? null : job.id
              )
            }
          >
            {/* BASIC INFO */}
            {currentUser?.is_staff && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteDiscoverJob(job.id);
                }}
                className="absolute right-4 top-4 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 opacity-0 transition group-hover:opacity-100"
              >
                Delete
              </button>
            )}
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
                      isSavedToTracker
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isSavedToTracker ? "Saved" : "Save"}
                  </button>

                  <a
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="border border-slate-300 bg-slate-50 text-slate-700 px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors">
                      Apply
                    </button>
                  </a>
                </div>
              </div>
            )}
          </div>
          );
        })
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
            <h3 className="mb-6 text-2xl font-bold text-gray-800">Add Discover Job</h3>
            <form onSubmit={handleAddDiscoverJob} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Job Title</label><input required className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={newJob.job_title} onChange={(e) => setNewJob({ ...newJob, job_title: e.target.value })} /></div>
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Company</label><input required className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={newJob.company} onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} /></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Location</label><input required className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} /></div>
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Salary</label><input required className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={newJob.salary} onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })} /></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Job Type</label>
                  <select className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={newJob.job_type} onChange={(e) => setNewJob({ ...newJob, job_type: e.target.value })}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Experience</label>
                  <select className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={newJob.experience_level} onChange={(e) => setNewJob({ ...newJob, experience_level: e.target.value })}>
                    <option value="Entry">Entry</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Apply URL</label><input required type="url" className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={newJob.apply_url} onChange={(e) => setNewJob({ ...newJob, apply_url: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Description</label><textarea rows={4} className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Key Responsibilities</label><textarea rows={3} className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={newJob.key_responsibilities} onChange={(e) => setNewJob({ ...newJob, key_responsibilities: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Basic Qualifications</label><textarea rows={3} className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={newJob.basic_qualifications} onChange={(e) => setNewJob({ ...newJob, basic_qualifications: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Preferred Qualifications</label><textarea rows={3} className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={newJob.preferred_qualifications} onChange={(e) => setNewJob({ ...newJob, preferred_qualifications: e.target.value })} /></div>
              <div className="flex justify-end gap-3 border-t pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="rounded-lg px-5 py-2.5 font-medium text-gray-600 hover:bg-gray-100">Cancel</button>
                <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700">Add Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobList;
