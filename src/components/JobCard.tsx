import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import { Job } from "../types/job";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col">
      <Link
        to={`/job/10-10-2024/${job.unique_id}`}
        className="text-xl font-semibold mb-2 hover:underline"
      >
        {job.job_title}
      </Link>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center">
        <Building size={16} className="mr-2" />
        {job.public_institution}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center">
        <DollarSign size={16} className="mr-2" />
        S/ {job.salary.toLocaleString()}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center">
        <MapPin size={16} className="mr-2" />
        {job.ubication_region}{" "}
        {job.ubication_dist ? `- ${job.ubication_dist}` : ""}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center">
        <Calendar size={16} className="mr-2" />
        {job.start_publication_date} - {job.end_publication_date}
      </div>
      <div className="mt-auto">
        <a
          href={job.job_posting_url}
          target="_blank"
          //   rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          Ver anuncio en su pagina <ExternalLink size={16} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default JobCard;
