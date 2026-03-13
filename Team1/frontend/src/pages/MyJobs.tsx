import { useState, useEffect } from 'react';
import apiClient from '../api/client';

// We use the exact same Job interface as Discover.tsx
interface Job {
  id: number;
  company_name: string;
  job_title: string;
  location: string;
  salary: string;
  status: string;
  created_at?: string;
}

// Helper to color-code the statuses in the table
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'Offer': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Interviewing': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-blue-100 text-blue-800 border-blue-200'; // Saved, Applied
  }
};

export default function MyJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch from the exact same endpoint so the data is completely synced
  const fetchJobs = async () => {
    try {
      const response = await apiClient.get('/companies/');
      setJobs(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setLoading(false);
    }
  };

  // Run the fetch every time you navigate to this page
  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      await apiClient.delete(`/companies/${id}/`);
      fetchJobs(); // Refresh the table after deleting
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-[90vh] flex flex-col">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Jobs List</h2>
        <p className="text-gray-600 mt-2 font-medium">A detailed list view of all your tracked applications.</p>
      </div>

      {/* Table Container */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading your jobs...</div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex-1">
          <div className="overflow-x-auto h-full">
            <table className="w-full text-left border-collapse">
              
              <thead className="sticky top-0 bg-gray-50 z-10 shadow-sm">
                <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-5 font-bold">Job Title</th>
                  <th className="p-5 font-bold">Company</th>
                  <th className="p-5 font-bold">Location</th>
                  <th className="p-5 font-bold">Salary</th>
                  <th className="p-5 font-bold">Status</th>
                  <th className="p-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100">
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-gray-500 italic">
                      No jobs tracked yet. Go to the Application Tracker to add some!
                    </td>
                  </tr>
                ) : (
                  jobs.map(job => (
                    <tr key={job.id} className="hover:bg-gray-50/50 transition">
                      <td className="p-5 font-bold text-gray-900">{job.job_title}</td>
                      <td className="p-5 text-blue-600 font-bold">{job.company_name}</td>
                      <td className="p-5 text-gray-600 font-medium flex items-center gap-2"><span className="text-lg">📍</span> {job.location}</td>
                      <td className="p-5 text-gray-600 font-medium">{job.salary}</td>
                      <td className="p-5">
                        <span className={`px-3 py-1.5 text-xs font-bold rounded-full border ${getStatusBadgeColor(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button 
                          onClick={() => handleDelete(job.id)}
                          className="text-red-500 hover:text-white border border-red-500 hover:bg-red-500 font-bold text-xs py-1.5 px-3 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              
            </table>
          </div>
        </div>
      )}
    </div>
  );
}