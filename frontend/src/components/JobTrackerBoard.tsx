import { useEffect, useRef, useState } from 'react';
import apiClient from '../api/client';

interface Job {
  id: number;
  company: string;
  job_title: string;
  location: string;
  salary: string;
  status: string;
  description: string;
  notes?: string;
  resume?: string;
  cover_letter?: string;
  created_at?: string;
  show_in_discover?: boolean;
}

const TRACKER_STATUSES = ['saved', 'applied', 'interview'] as const;

const normalizeStatus = (status: string | undefined) => (status || '').trim().toLowerCase();
const formatStatusLabel = (status: string) => status.charAt(0).toUpperCase() + status.slice(1);

const getStatusBadgeColor = (status: string) => {
  switch (normalizeStatus(status)) {
    case 'interview': return 'bg-amber-500 text-white';
    case 'applied': return 'bg-blue-600 text-white';
    default: return 'bg-blue-600 text-white';
  }
};

const getFileName = (url: string | undefined) => {
  if (!url) return '';
  return decodeURIComponent(url.split('/').pop() || '');
};

const getFileDownloadUrl = (url: string) => {
  if (url.startsWith('http')) return url;
  return `http://localhost:8000${url}`;
};

export default function JobTrackerBoard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedJobId, setDraggedJobId] = useState<number | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterSalary, setFilterSalary] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewDetailsJob, setViewDetailsJob] = useState<Job | null>(null);
  const [newJob, setNewJob] = useState({ company: '', job_title: '', location: '', salary: '', status: 'saved', description: '', notes: '', show_in_discover: false });

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const coverLetterInputRef = useRef<HTMLInputElement>(null);

  const fetchJobs = async () => {
    try {
      const response = await apiClient.get('/companies/');
      setJobs(
        response.data.map((job: Job) => ({
          ...job,
          status: normalizeStatus(job.status),
        }))
      );
      setLoading(false);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/companies/', newJob);
      setShowAddModal(false);
      setNewJob({ company: '', job_title: '', location: '', salary: '', status: 'saved', description: '', notes: '', show_in_discover: false });
      fetchJobs();
    } catch (err) {
      console.error('Error adding job:', err);
      alert('Failed to add tracked job.');
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await apiClient.put(`/companies/${id}/`, { status: newStatus });
      fetchJobs();
      if (viewDetailsJob && viewDetailsJob.id === id) {
        setViewDetailsJob({ ...viewDetailsJob, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(id));
    setDraggedJobId(id);
  };

  const handleDragEnd = () => {
    setDraggedJobId(null);
    setDragOverStatus(null);
  };

  const handleDropOnColumn = async (event: React.DragEvent<HTMLDivElement>, status: string) => {
    event.preventDefault();

    const droppedId = Number(event.dataTransfer.getData('text/plain'));
    const jobId = Number.isNaN(droppedId) ? draggedJobId : droppedId;
    if (jobId === null) return;

    const draggedJob = jobs.find(job => job.id === jobId);
    if (!draggedJob || normalizeStatus(draggedJob.status) === status) {
      handleDragEnd();
      return;
    }

    setJobs(currentJobs =>
      currentJobs.map(job =>
        job.id === jobId ? { ...job, status } : job
      )
    );

    setDragOverStatus(null);

    try {
      await apiClient.put(`/companies/${jobId}/`, { status });
      if (viewDetailsJob && viewDetailsJob.id === jobId) {
        setViewDetailsJob({ ...viewDetailsJob, status });
      }
      fetchJobs();
    } catch (err) {
      console.error('Error updating status:', err);
      fetchJobs();
    } finally {
      setDraggedJobId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this job from your tracker?')) return;

    try {
      await apiClient.put(`/companies/${id}/`, {
        status: 'new',
      });

      fetchJobs();
      setViewDetailsJob(null);
    } catch (err) {
      console.error('Error removing job:', err);
    }
  };

  const handleSaveNote = async () => {
    if (!viewDetailsJob) return;
    try {
      await apiClient.put(`/companies/${viewDetailsJob.id}/`, { notes: viewDetailsJob.notes });
      fetchJobs();
      alert('Note saved successfully!');
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, field: 'resume' | 'cover_letter') => {
    const file = event.target.files?.[0];
    if (!file || !viewDetailsJob) return;

    const formData = new FormData();
    formData.append(field, file);

    try {
      const response = await apiClient.put(`/companies/${viewDetailsJob.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setViewDetailsJob({ ...viewDetailsJob, [field]: response.data[field] });
      fetchJobs();
      alert(`${field === 'resume' ? 'Resume' : 'Cover Letter'} uploaded successfully!`);
    } catch (err) {
      console.error('Error uploading document:', err);
      alert('Failed to upload document.');
    }
  };

  const uniqueCompanies = Array.from(new Set(jobs.map(j => j.company))).filter(Boolean);
  const uniqueLocations = Array.from(new Set(jobs.map(j => j.location))).filter(Boolean);
  const uniqueSalaries = Array.from(new Set(jobs.map(j => j.salary))).filter(Boolean);

  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      job.job_title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      (job.notes && job.notes.toLowerCase().includes(query));

    const matchesCompany = filterCompany === '' || job.company === filterCompany;
    const matchesLocation = filterLocation === '' || job.location === filterLocation;
    const matchesSalary = filterSalary === '' || job.salary === filterSalary;

    return matchesSearch && matchesCompany && matchesLocation && matchesSalary;
  });

  return (
    <div className="mt-10 flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Job Tracker</h2>
          <p className="mt-2 text-sm font-medium text-gray-500">Manage saved jobs, applications, notes, and documents in one place.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
        >
          + Track New Job
        </button>
      </div>

      <div className="mb-8 space-y-4">
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 flex items-center">
          <div className="pl-4 text-gray-400 text-xl">🔍</div>
          <input
            type="text"
            placeholder="Search job titles, companies, locations, or notes..."
            className="w-full bg-transparent border-none py-2 px-4 outline-none text-gray-700 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="pr-4 text-gray-400 hover:text-gray-600 font-bold transition">✖</button>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <select value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)} className="flex-1 min-w-[200px] bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium cursor-pointer appearance-none">
            <option value="">All Companies</option>
            {uniqueCompanies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} className="flex-1 min-w-[200px] bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium cursor-pointer appearance-none">
            <option value="">All Locations</option>
            {uniqueLocations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={filterSalary} onChange={(e) => setFilterSalary(e.target.value)} className="flex-1 min-w-[200px] bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium cursor-pointer appearance-none">
            <option value="">All Pay Amounts</option>
            {uniqueSalaries.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {(filterCompany || filterLocation || filterSalary) && (
            <button onClick={() => { setFilterCompany(''); setFilterLocation(''); setFilterSalary(''); }} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition shadow-sm">
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading tracker...</div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-6 items-start">
          {TRACKER_STATUSES.map(status => {
            const jobsForColumn = filteredJobs
              .filter(j => TRACKER_STATUSES.includes(normalizeStatus(j.status) as typeof TRACKER_STATUSES[number]))
              .filter(j => normalizeStatus(j.status) === status);

            return (
              <div
                key={status}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (draggedJobId !== null && dragOverStatus !== status) {
                    setDragOverStatus(status);
                  }
                }}
                onDragLeave={() => {
                  if (dragOverStatus === status) {
                    setDragOverStatus(null);
                  }
                }}
                onDrop={(e) => handleDropOnColumn(e, status)}
                className={`bg-gray-100/70 border rounded-2xl p-4 min-w-[320px] w-full max-w-sm flex-shrink-0 transition ${dragOverStatus === status ? 'border-blue-400 bg-blue-50/70 shadow-md' : 'border-gray-200'}`}
              >
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-gray-800 text-lg">{formatStatusLabel(status)}</h3>
                  <span className="bg-white border text-gray-600 text-sm py-1 px-3 rounded-full font-bold shadow-sm">{jobsForColumn.length}</span>
                </div>

                <div className="space-y-4">
                  {jobsForColumn.map(job => (
                    <div
                      key={job.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, job.id)}
                      onDragEnd={handleDragEnd}
                      className={`bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition relative group cursor-grab active:cursor-grabbing ${draggedJobId === job.id ? 'opacity-60 ring-2 ring-blue-300' : ''}`}
                    >
                      <button onClick={() => handleDelete(job.id)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">✖</button>
                      <h4 className="font-bold text-lg text-gray-900 leading-tight">{job.job_title}</h4>
                      <p className="text-blue-600 font-semibold mb-3 text-sm">{job.company}</p>
                      <div className="text-xs text-gray-600 mb-1">📍 {job.location}</div>
                      <div className="text-xs text-gray-600 mb-4">💰 {job.salary}</div>
                      <div className="pt-3 border-t border-gray-100 flex gap-2 items-center">
                        <select value={job.status} onChange={(e) => handleStatusChange(job.id, e.target.value)} className="flex-1 bg-gray-50 border border-gray-200 text-xs rounded-lg p-1.5 text-gray-800">
                          {TRACKER_STATUSES.map(s => (
                            <option key={s} value={s}>Move to {formatStatusLabel(s)}</option>
                          ))}
                        </select>
                        <button onClick={() => setViewDetailsJob(job)} className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">View Details</button>
                      </div>
                    </div>
                  ))}

                  {jobsForColumn.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl">
                      {(searchQuery || filterCompany || filterLocation || filterSalary) ? 'No matches found' : 'No applications'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Track New Application</h3>
            <form onSubmit={handleAddJob} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label><input required type="text" className="w-full border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400" value={newJob.job_title} onChange={e => setNewJob({ ...newJob, job_title: e.target.value })} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Company</label><input required type="text" className="w-full border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400" value={newJob.company} onChange={e => setNewJob({ ...newJob, company: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><input required type="text" className="w-full border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Salary</label><input required type="text" className="w-full border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400" value={newJob.salary} onChange={e => setNewJob({ ...newJob, salary: e.target.value })} /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                <select className="w-full border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white cursor-pointer text-gray-900" value={newJob.status} onChange={e => setNewJob({ ...newJob, status: e.target.value })}>
                  {TRACKER_STATUSES.map(s => <option key={s} value={s}>{formatStatusLabel(s)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                <textarea rows={4} className="w-full border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white resize-none text-gray-900 placeholder:text-gray-400" value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} />
              </div>
              <div className="flex justify-end space-x-3 mt-8 pt-4 border-t">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-blue-600 font-medium text-white rounded-lg hover:bg-blue-700">Save to Tracker</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewDetailsJob && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row">
            <button onClick={() => setViewDetailsJob(null)} className="absolute top-4 right-6 text-gray-400 hover:text-gray-800 text-4xl font-light transition z-10">&times;</button>

            <div className="flex-1 p-8 border-r border-gray-100">
              <div className="mb-6">
                <button className="text-gray-500 hover:text-gray-800 mb-4 flex items-center font-medium" onClick={() => setViewDetailsJob(null)}>&larr; Back to Jobs</button>
                <div className="flex items-center gap-4 border border-gray-200 p-4 rounded-2xl shadow-sm">
                  <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-md">{viewDetailsJob.company.charAt(0)}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 leading-tight">{viewDetailsJob.job_title}</h2>
                    <p className="text-gray-600 font-medium flex items-center gap-2 mt-1"><span>🏢 {viewDetailsJob.company}</span> • <span>📍 {viewDetailsJob.location}</span></p>
                  </div>
                </div>
              </div>

              <div className="mb-8 border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{viewDetailsJob.description || 'No description provided.'}</div>
              </div>

              <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Notes</h3>
                <textarea rows={4} placeholder="Add personal notes about this position..." className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white transition resize-none mb-4" value={viewDetailsJob.notes || ''} onChange={e => setViewDetailsJob({ ...viewDetailsJob, notes: e.target.value })} />
                <div className="flex justify-end">
                  <button onClick={handleSaveNote} className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition">Save note</button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 p-8 bg-gray-50 rounded-r-2xl">
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3">Current Status</h3>
                <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3 shadow-sm">
                  <div className={`w-2.5 h-2.5 rounded-full ${getStatusBadgeColor(viewDetailsJob.status).split(' ')[0]}`}></div>
                  <select value={viewDetailsJob.status} onChange={(e) => handleStatusChange(viewDetailsJob.id, e.target.value)} className="flex-1 bg-transparent font-medium text-gray-800 outline-none cursor-pointer">
                    {TRACKER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Upload Documents</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-white mb-4 hover:bg-gray-50 transition cursor-pointer">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3 text-xl shadow-sm">↑</div>
                  <p className="text-sm text-gray-600 mb-1">Drag and drop files here</p>
                  <p className="text-xs text-gray-400">or click to browse</p>
                </div>

                <input type="file" ref={resumeInputRef} className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, 'resume')} />
                <input type="file" ref={coverLetterInputRef} className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, 'cover_letter')} />

                <div className="space-y-4">
                  <div>
                    <button onClick={() => resumeInputRef.current?.click()} className={`w-full font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition ${viewDetailsJob.resume ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 shadow-sm'}`}>📄 {viewDetailsJob.resume ? 'Update Resume' : 'Upload Resume'}</button>
                    {viewDetailsJob.resume && (
                      <div className="mt-2 p-3 bg-white border border-gray-200 rounded-lg flex flex-col gap-2 shadow-sm">
                        <span className="text-xs font-semibold text-gray-600 truncate" title={getFileName(viewDetailsJob.resume)}>{getFileName(viewDetailsJob.resume)}</span>
                        <a href={getFileDownloadUrl(viewDetailsJob.resume)} target="_blank" rel="noopener noreferrer" download className="text-xs font-bold text-center bg-blue-50 text-blue-700 border border-blue-200 py-2 rounded hover:bg-blue-100 transition">↓ Download Resume</a>
                      </div>
                    )}
                  </div>
                  <div>
                    <button onClick={() => coverLetterInputRef.current?.click()} className={`w-full font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition ${viewDetailsJob.cover_letter ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 shadow-sm'}`}>📄 {viewDetailsJob.cover_letter ? 'Update Cover Letter' : 'Upload Cover Letter'}</button>
                    {viewDetailsJob.cover_letter && (
                      <div className="mt-2 p-3 bg-white border border-gray-200 rounded-lg flex flex-col gap-2 shadow-sm">
                        <span className="text-xs font-semibold text-gray-600 truncate" title={getFileName(viewDetailsJob.cover_letter)}>{getFileName(viewDetailsJob.cover_letter)}</span>
                        <a href={getFileDownloadUrl(viewDetailsJob.cover_letter)} target="_blank" rel="noopener noreferrer" download className="text-xs font-bold text-center bg-blue-50 text-blue-700 border border-blue-200 py-2 rounded hover:bg-blue-100 transition">↓ Download Cover Letter</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
