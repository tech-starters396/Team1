import { useEffect, useState } from "react";
import apiClient from "../api/client";

interface Job {
  id: number;
  company: string;
  job_title: string;
  location: string;
  salary: string;
  status: string;
}

const TRACKER_STATUSES = ["saved", "applied", "interview"] as const;
const CHART_HEIGHT = 220;

const normalizeStatus = (status: string | undefined) => (status || "").trim().toLowerCase();
const formatStatusLabel = (status: string) => status.charAt(0).toUpperCase() + status.slice(1);

const getStatusTone = (status: string) => {
  switch (status) {
    case "applied":
      return "from-blue-500 to-cyan-500";
    case "interview":
      return "from-amber-400 to-orange-500";
    default:
      return "from-slate-500 to-blue-500";
  }
};

export default function JobTrackerAnalytics({ refreshSignal }: { refreshSignal: number }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackerJobs = async () => {
      try {
        const response = await apiClient.get("/tracker/");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching tracker analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackerJobs();
  }, [refreshSignal]);

  const totalTracked = jobs.length;
  const statusCounts = TRACKER_STATUSES.map((status) => ({
    status,
    count: jobs.filter((job) => normalizeStatus(job.status) === status).length,
  }));
  const appliedCount = statusCounts.find((item) => item.status === "applied")?.count || 0;
  const interviewCount = statusCounts.find((item) => item.status === "interview")?.count || 0;
  const conversionRate = totalTracked === 0 ? 0 : Math.round(((appliedCount + interviewCount) / totalTracked) * 100);

  const topCompanies = Object.entries(
    jobs.reduce<Record<string, number>>((accumulator, job) => {
      accumulator[job.company] = (accumulator[job.company] || 0) + 1;
      return accumulator;
    }, {})
  )
    .sort((first, second) => second[1] - first[1])
    .slice(0, 4);

  const maxStatusCount = Math.max(...statusCounts.map((item) => item.count), 1);
  const maxCompanyCount = Math.max(...topCompanies.map((item) => item[1]), 1);

  return (
    <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Analytics</p>
          <h2 className="text-3xl font-bold text-slate-900">Your search snapshot</h2>
          <p className="mt-2 text-sm text-slate-500">A quick view of how your saved jobs are moving through the tracker.</p>
        </div>
        <div className="rounded-2xl bg-slate-50 px-5 py-4">
          <p className="text-sm font-medium text-slate-500">Apply momentum</p>
          <p className="text-3xl font-bold text-slate-900">{conversionRate}%</p>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-slate-500">
          Loading analytics...
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-900 px-5 py-5 text-white">
                <p className="text-sm text-slate-300">Tracked jobs</p>
                <p className="mt-2 text-3xl font-bold">{totalTracked}</p>
              </div>
              <div className="rounded-2xl bg-blue-50 px-5 py-5 text-slate-900">
                <p className="text-sm text-slate-500">Applications sent</p>
                <p className="mt-2 text-3xl font-bold">{appliedCount}</p>
              </div>
              <div className="rounded-2xl bg-amber-50 px-5 py-5 text-slate-900">
                <p className="text-sm text-slate-500">Interviews lined up</p>
                <p className="mt-2 text-3xl font-bold">{interviewCount}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Application stage chart</h3>
                <span className="text-sm text-slate-500">Saved to interview</span>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="mb-3 flex items-end justify-between text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  <span>Jobs</span>
                  <span>{maxStatusCount}</span>
                </div>
                <div className="flex items-end justify-between gap-4" style={{ height: `${CHART_HEIGHT}px` }}>
                  {statusCounts.map((item) => {
                    const barHeight = (item.count / maxStatusCount) * (CHART_HEIGHT - 36);
                    return (
                      <div key={item.status} className="flex h-full flex-1 flex-col justify-end">
                        <div className="mb-3 text-center text-sm font-bold text-slate-700">{item.count}</div>
                        <div className="flex flex-1 items-end justify-center rounded-t-2xl bg-white px-2 pb-0 shadow-inner">
                          <div
                            className={`w-full rounded-t-2xl bg-gradient-to-t ${getStatusTone(item.status)} transition-all duration-300`}
                            style={{ height: `${Math.max(barHeight, item.count > 0 ? 20 : 0)}px` }}
                          />
                        </div>
                        <div className="mt-3 text-center text-sm font-semibold text-slate-600">
                          {formatStatusLabel(item.status)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Top companies</h3>
              <span className="text-sm text-slate-500">Where your focus is</span>
            </div>

            {topCompanies.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-slate-500">
                Save a few jobs and your charts will appear here.
              </div>
            ) : (
              <div className="space-y-4">
                {topCompanies.map(([company, count]) => (
                  <div key={company}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-700">{company}</span>
                      <span className="text-slate-500">{count} job{count === 1 ? "" : "s"}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-blue-500"
                        style={{ width: `${(count / maxCompanyCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
