import { useState } from "react";
import CompanyList from "./components/CompanyList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Company Job Search Dashboard</h1>

      {/* Search Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px"
          }}
        />

        <button
          style={{
            padding: "10px 15px",
            backgroundColor: "#1d4ed8",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            cursor: "pointer"
          }}
        >
          Search Jobs
        </button>

        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            padding: "10px 15px",
            backgroundColor: "#6b7280",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Filters
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            gap: "15px"
          }}
        >
          <select onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="">Location</option>
            <option value="Remote">Remote</option>
            <option value="United States">United States</option>
            <option value="California">California</option>
          </select>

          <select onChange={(e) => setJobTypeFilter(e.target.value)}>
            <option value="">Job Type</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>

          <select onChange={(e) => setExperienceFilter(e.target.value)}>
            <option value="">Experience</option>
            <option value="Entry">Entry</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
      )}

      <CompanyList
        searchTerm={searchTerm}
        locationFilter={locationFilter}
        jobTypeFilter={jobTypeFilter}
        experienceFilter={experienceFilter}
      />
    </div>
  );
}

export default App;