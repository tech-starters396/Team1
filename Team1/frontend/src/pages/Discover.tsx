import { useState, useEffect } from 'react';
import apiClient from '../api/client';

// Matches backend api/models.py and serializers.py
interface Job {
  id: number;
  company_name: string;
  job_title: string;
  location: string;
  salary: string;
}

export default function Discover() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Hits endpoint defined in api/urls.py
        const response = await apiClient.get('/companies/');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load opportunities from the server.');
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Discover Opportunities</h2>
      
      {loading ? (
        <div className="text-center py-10 text-gray-600">Loading opportunities...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div key={job.id} className="border rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
              <h3 className="text-xl font-bold">{job.job_title}</h3>
              <p className="text-gray-600 font-medium mb-4">{job.company_name}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="mr-2">📍</span> {job.location}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-2">💰</span> {job.salary}
              </div>
              <button className="w-full bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-100 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}