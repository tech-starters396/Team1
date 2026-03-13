import { useEffect, useState } from "react";
import apiClient from "../api/client";

interface Job {
  id: number;
  title: string;
  company:string;
  location: string;
  experience_level: string;
  job_type: string;
  description: string;
  application_deadline?: string;
  key_responsibilities?: string;
  basic_qualifications?: string;
  preferred_qualifications?: string;
  apply_url: string;
}


interface JobListProps {
  searchTerm: string;
  locationFilter: string;
  jobTypeFilter: string;
  experienceFilter: string;
}


function JobList({
  searchTerm,
  locationFilter,
  jobTypeFilter,
  experienceFilter,
}: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    apiClient
      .get("/joblistings/")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error(error));
  }, []);


  const filteredJobs = jobs.filter((job) => {
  const search = searchTerm.trim().toLowerCase();

  const matchesSearch =
    job.title.toLowerCase().includes(search) ||
    job.company.toLowerCase().includes(search);

  const matchesLocation =
    locationFilter === "" ||
    job.location.toLowerCase().includes(locationFilter.toLowerCase());

  const matchesType =
    jobTypeFilter === "" ||
    job.job_type.toLowerCase() === jobTypeFilter.toLowerCase();

  const matchesExperience =
    experienceFilter === "" ||
    job.experience_level.toLowerCase() === experienceFilter.toLowerCase();

  return matchesSearch && matchesLocation && matchesType && matchesExperience;
});


 
  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Jobs</h2>

      {filteredJobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        filteredJobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
              textAlign: "left",
            }}
          >
            <h2>{job.title}</h2>

            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Experience Level:</strong> {job.experience_level}</p>
            <p><strong>Job Type:</strong> {job.job_type}</p>

            {job.application_deadline && (
              <p>
                <strong>Application Deadline:</strong> {job.application_deadline}
              </p>
            )}

            <h4>Description</h4>
            <p>{job.description}</p>

            {job.key_responsibilities && (
              <>
                <h4>Key Responsibilities</h4>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {job.key_responsibilities}
                </pre>
              </>
            )}

            {job.basic_qualifications && (
              <>
                <h4>Basic Qualifications</h4>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {job.basic_qualifications}
                </pre>
              </>
            )}

            {job.preferred_qualifications && (
              <>
                <h4>Preferred Qualifications</h4>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {job.preferred_qualifications}
                </pre>
              </>
            )}

            <a
              href={job.apply_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#1d4ed8",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Apply Now
              </button>
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default JobList;