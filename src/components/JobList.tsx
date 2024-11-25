import React from "react";
import { useParams, Link } from "react-router-dom";
import useJobs from "../hooks/useJobs";
import JobCard from "./JobCard";
import Pagination from "./Pagination";

const JobList: React.FC = () => {
  const { page = "1" } = useParams<{ page?: string }>();
  const currentPage = parseInt(page, 10);
  const { jobs, loading, error } = useJobs(currentPage);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!jobs) return null;

  return (
    <div className="space-y-8">
      <Pagination
        currentPage={currentPage}
        totalJobs={jobs.total_jobs}
        jobsPerPage={12}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.data.map((job) => (
          <JobCard key={job.unique_id} job={job} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalJobs={jobs.total_jobs}
        jobsPerPage={12}
      />
    </div>
  );
};

export default JobList;
