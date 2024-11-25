import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Briefcase,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  GraduationCap,
  Book,
  Brain,
  Star,
  ExternalLink,
} from "lucide-react";
import useJobDetails from "../hooks/useJobDetails";

const JobDetails: React.FC = () => {
  const { date, id } = useParams<{ date: string; id: string }>();
  const { jobDetails, loading, error } = useJobDetails(date!, id!);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!jobDetails) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <Link
        to="/"
        className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
      >
        &larr; Volver a la Lista
      </Link>
      <h1 className="text-3xl font-bold mb-4">{jobDetails.job_title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <InfoItem
            icon={<Building />}
            label="Institución Pública"
            value={jobDetails.public_institution}
          />
          <InfoItem
            icon={<DollarSign />}
            label="Salario"
            value={`S/ ${jobDetails.salary.toLocaleString()}`}
          />
          <InfoItem
            icon={<MapPin />}
            label="Ubicación"
            value={jobDetails.ubication}
          />
          <InfoItem
            icon={<Users />}
            label="Vacantes"
            value={jobDetails.vacancies.toString()}
          />
          <InfoItem
            icon={<Calendar />}
            label="Período de solicitud"
            value={`${jobDetails.start_publication_date} - ${jobDetails.end_publication_date}`}
          />
        </div>
        <div>
          <InfoItem
            icon={<Briefcase />}
            label="Experiencia Requerida"
            value={jobDetails.required_experience}
          />
          <InfoItem
            icon={<GraduationCap />}
            label="Educación"
            value={jobDetails.educational_background}
          />
          <InfoItem
            icon={<Book />}
            label="Especialización"
            value={jobDetails.specialization}
          />
          <InfoItem
            icon={<Brain />}
            label="Conocimientos Requeridos"
            value={jobDetails.required_knowledge}
          />
          <InfoItem
            icon={<Star />}
            label="Habilidades"
            value={jobDetails.skills}
          />
        </div>
      </div>
      <div className="mt-8">
        <a
          href={jobDetails.job_posting_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 inline-flex items-center"
        >
          View Job Posting <ExternalLink size={20} className="ml-2" />
        </a>
      </div>
    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <div className="flex items-start mb-4">
    <div className="text-gray-500 dark:text-gray-400 mr-2">{icon}</div>
    <div>
      <h3 className="font-semibold">{label}</h3>
      <p className="text-gray-600  dark:text-gray-300">{value}</p>
    </div>
  </div>
);

export default JobDetails;
