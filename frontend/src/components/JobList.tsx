import { useEffect, useState } from "react";

type DiscoverInlineField = "title" | "description";

interface DiscoverInlineEdit {
  jobId: number;
  field: DiscoverInlineField;
}
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
  is_saved_by_current_user?: boolean;
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
  const emptyJobForm = {
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
  };
  const [jobs, setJobs] = useState<Job[]>([]);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [jobForm, setJobForm] = useState(emptyJobForm);
  const [discoverInlineEdit, setDiscoverInlineEdit] = useState<DiscoverInlineEdit | null>(null);
  const [discoverInlineDraft, setDiscoverInlineDraft] = useState("");

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

  useEffect(() => {
    if (!discoverInlineEdit || discoverInlineEdit.field !== "description") return;
    const { jobId } = discoverInlineEdit;
    if (expandedJobId !== jobId) {
      setDiscoverInlineEdit(null);
      setDiscoverInlineDraft("");
    }
  }, [expandedJobId, discoverInlineEdit]);

  const startDiscoverInlineEdit = (job: Job, field: DiscoverInlineField) => {
    setDiscoverInlineEdit({ jobId: job.id, field });
    setDiscoverInlineDraft(field === "title" ? job.job_title : job.description);
  };

  const cancelDiscoverInlineEdit = () => {
    setDiscoverInlineEdit(null);
    setDiscoverInlineDraft("");
  };

  const saveDiscoverInlineEdit = async () => {
    if (!discoverInlineEdit) return;

    const payload =
      discoverInlineEdit.field === "title"
        ? { job_title: discoverInlineDraft }
        : { description: discoverInlineDraft };

    try {
      await apiClient.put(`/companies/${discoverInlineEdit.jobId}/`, payload);
      const field =
        discoverInlineEdit.field === "title" ? "job_title" : "description";

      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job.id === discoverInlineEdit.jobId
            ? { ...job, [field]: discoverInlineDraft }
            : job
        )
      );
      cancelDiscoverInlineEdit();
      fetchJobs();
    } catch (err: unknown) {
      console.error("Error updating job inline:", err);
      alert("Failed to update job.");
    }
  };

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
          job.id === id ? { ...job, is_saved_by_current_user: true } : job
        )
      );
      setSaveMessage(null);

      const response = await apiClient.post(`/tracker/`, {
        source_job: id
      });
      setSaveMessage(
        response.data.reminder_email_sent
          ? "Saved to your tracker. A reminder email is on the way."
          : "Saved to your tracker."
      );
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
      await apiClient.post("/companies/", jobForm);
      setShowAddModal(false);
      setEditingJobId(null);
      setJobForm(emptyJobForm);
      fetchJobs();
    } catch (err: any) {
      console.error("Error adding discover job:", err.response?.data || err);
      alert("Failed to add discover job.");
    }
  };

  const handleOpenAddModal = () => {
    setEditingJobId(null);
    setJobForm(emptyJobForm);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (job: Job) => {
    setEditingJobId(job.id);
    setJobForm({
      company: job.company,
      job_title: job.job_title,
      location: job.location,
      salary: job.salary || "",
      job_type: job.job_type,
      experience_level: job.experience_level,
      description: job.description,
      key_responsibilities: job.key_responsibilities || "",
      basic_qualifications: job.basic_qualifications || "",
      preferred_qualifications: job.preferred_qualifications || "",
      apply_url: job.apply_url,
      status: "new",
      show_in_discover: true,
    });
    setShowAddModal(true);
  };

  const handleSaveDiscoverJob = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingJobId === null) {
      await handleAddDiscoverJob(e);
      return;
    }

    try {
      await apiClient.put(`/companies/${editingJobId}/`, jobForm);
      setShowAddModal(false);
      setEditingJobId(null);
      setJobForm(emptyJobForm);
      fetchJobs();
    } catch (err: any) {
      console.error("Error updating discover job:", err.response?.data || err);
      alert("Failed to update this job.");
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
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Discover Jobs
            </h2>
            <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
              {filteredJobs.length} job{filteredJobs.length === 1 ? "" : "s"}
            </span>
          </div>
          {saveMessage && (
            <p className="mt-3 text-sm font-medium text-emerald-600">{saveMessage}</p>
          )}
        </div>
        {currentUser?.is_staff && (
          <button
            onClick={handleOpenAddModal}
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
          const isSavedToTracker = Boolean(job.is_saved_by_current_user);
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
              <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditModal(job);
                  }}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteDiscoverJob(job.id);
                  }}
                  className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600"
                >
                  Delete
                </button>
              </div>
            )}
            {currentUser?.is_staff &&
            discoverInlineEdit?.jobId === job.id &&
            discoverInlineEdit.field === "title" ? (
              <div className="pr-20" onClick={(e) => e.stopPropagation()}>
                <input
                  className="mb-2 w-full rounded-lg border border-gray-300 bg-white p-2 text-lg font-bold text-gray-900 [color-scheme:light] outline-none focus:ring-2 focus:ring-blue-500"
                  value={discoverInlineDraft}
                  onChange={(e) => setDiscoverInlineDraft(e.target.value)}
                  autoFocus
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      saveDiscoverInlineEdit();
                    }}
                    className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelDiscoverInlineEdit();
                    }}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-start gap-2">
                <h2 className="text-lg font-bold text-gray-900">{job.job_title}</h2>
                {currentUser?.is_staff && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      startDiscoverInlineEdit(job, "title");
                    }}
                    className="rounded-full bg-gray-50 px-2.5 py-0.5 text-[11px] font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                )}
              </div>
            )}

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
                <div className="mb-3">
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-gray-800">Description</span>
                    {currentUser?.is_staff && (
                      <>
                        {discoverInlineEdit?.jobId === job.id &&
                        discoverInlineEdit.field === "description" ? (
                          <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                saveDiscoverInlineEdit();
                              }}
                              className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                cancelDiscoverInlineEdit();
                              }}
                              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              startDiscoverInlineEdit(job, "description");
                            }}
                            className="rounded-full bg-gray-50 px-2.5 py-0.5 text-[11px] font-semibold text-gray-700 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  {discoverInlineEdit?.jobId === job.id &&
                  discoverInlineEdit.field === "description" ? (
                    <textarea
                      rows={6}
                      className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 [color-scheme:light] outline-none focus:ring-2 focus:ring-blue-500"
                      value={discoverInlineDraft}
                      onChange={(e) => setDiscoverInlineDraft(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      autoFocus
                    />
                  ) : (
                    <p className="text-gray-700">{job.description}</p>
                  )}
                </div>

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
                    disabled={isSavedToTracker}
                    className={`px-3 py-1 rounded-lg text-white ${
                      isSavedToTracker
                        ? "bg-emerald-600 cursor-default"
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
            <h3 className="mb-6 text-2xl font-bold text-gray-800">{editingJobId === null ? "Add Discover Job" : "Edit Discover Job"}</h3>
            <form onSubmit={handleSaveDiscoverJob} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Job Title</label><input required className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={jobForm.job_title} onChange={(e) => setJobForm({ ...jobForm, job_title: e.target.value })} /></div>
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Company</label><input required className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={jobForm.company} onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })} /></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Location</label><input required className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })} /></div>
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Salary</label><input required className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={jobForm.salary} onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })} /></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Job Type</label>
                  <select className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={jobForm.job_type} onChange={(e) => setJobForm({ ...jobForm, job_type: e.target.value })}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Experience</label>
                  <select className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={jobForm.experience_level} onChange={(e) => setJobForm({ ...jobForm, experience_level: e.target.value })}>
                    <option value="Entry">Entry</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Apply URL</label><input required type="url" className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={jobForm.apply_url} onChange={(e) => setJobForm({ ...jobForm, apply_url: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Description</label><textarea rows={4} className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Key Responsibilities</label><textarea rows={3} className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={jobForm.key_responsibilities} onChange={(e) => setJobForm({ ...jobForm, key_responsibilities: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Basic Qualifications</label><textarea rows={3} className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={jobForm.basic_qualifications} onChange={(e) => setJobForm({ ...jobForm, basic_qualifications: e.target.value })} /></div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Preferred Qualifications</label><textarea rows={3} className="w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500" value={jobForm.preferred_qualifications} onChange={(e) => setJobForm({ ...jobForm, preferred_qualifications: e.target.value })} /></div>
              <div className="flex justify-end gap-3 border-t pt-4">
                <button type="button" onClick={() => { setShowAddModal(false); setEditingJobId(null); setJobForm(emptyJobForm); }} className="rounded-lg px-5 py-2.5 font-medium text-gray-600 hover:bg-gray-100">Cancel</button>
                <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700">{editingJobId === null ? "Add Job" : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobList;
