import { useState } from "react";
import JobList from "../components/JobList";

export default function Discover() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HEADER */}
      <div className="bg-white px-6 py-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Discover Jobs
        </h1>

        {/* FILTER BAR */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-wrap gap-3">
          
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search job title, company, or keywords"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* LOCATION */}
          <input
            type="text"
            placeholder="Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="flex-1 min-w-[150px] bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* JOB TYPE */}
          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>

          {/* EXPERIENCE */}
          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Experience</option>
            <option value="Entry">Entry</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>

          <select
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Salary</option>
            <option value="under-50000">Under $50k</option>
            <option value="50000-99999">$50k - $99k</option>
            <option value="100000-149999">$100k - $149k</option>
            <option value="150000-plus">$150k+</option>
          </select>
        </div>
      </div>

      {/* JOB LIST */}
      <div className="p-6">
        <JobList
          searchTerm={searchTerm}
          locationFilter={locationFilter}
          jobTypeFilter={jobTypeFilter}
          experienceFilter={experienceFilter}
          salaryFilter={salaryFilter}
        />
      </div>
    </div>
  );
}
