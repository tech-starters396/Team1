import { useEffect, useState } from "react";
import apiClient from "../api/client";

interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
}

interface CompanyListProps {
  searchTerm: string;
  locationFilter: string;
  jobTypeFilter: string;
  experienceFilter: string;
}

function CompanyList({
  searchTerm,
  locationFilter,
}: CompanyListProps) {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    apiClient
      .get("/companies/")
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "" ||
      company.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Companies</h2>

      {filteredCompanies.length === 0 ? (
        <p>No companies found.</p>
      ) : (
        <ul>
          {filteredCompanies.map((company) => (
            <li key={company.id}>
              <strong>{company.name}</strong> — {company.industry} (
              {company.location})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompanyList;