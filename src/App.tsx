"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Search,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
const API_URL =
  "https://talento-peru-jobs-tjhon-tjhons-projects.vercel.app/jobs/last";

interface Job {
  id_uuid: string;
  position: string;
  institution: string;
  ubication: string;
  num_conv: string;
  n_vac: number;
  wage: number;
  begin_date: string;
  end_date: string;
}

export default function JobBoard() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [currentJobs, setCurrentJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [positionFilter, setPositionFilter] = useState("");
  const jobsPerPage = 9;

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const indexOfLastJob = page * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    setCurrentJobs(filteredJobs.slice(indexOfFirstJob, indexOfLastJob));
  }, [page, filteredJobs]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setAllJobs(data);
      setFilteredJobs(data);
      setCurrentJobs(data.slice(0, jobsPerPage));
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filtered = allJobs.filter((job) =>
      job.position.toLowerCase().includes(positionFilter.toLowerCase())
    );
    setFilteredJobs(filtered);
    setPage(1);
  };

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const Pagination = () => (
    <div className="flex justify-center items-center my-8 space-x-4">
      <Button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        variant="outline"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4 mr-2" /> Anterior
      </Button>
      <span className="text-sm">
        Página {page} de {totalPages}
      </span>
      <Button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        variant="outline"
        aria-label="Página siguiente"
      >
        Siguiente <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Empleos del Estado Peruano
      </h1>

      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Input
          type="text"
          placeholder="Buscar por posición"
          value={positionFilter}
          onChange={(e) => {
            setPositionFilter(e.target.value);
            applyFilters();
          }}
          className="w-full sm:w-64"
        />
        <Button onClick={applyFilters}>
          <Search className="w-4 h-4 mr-2" /> Aplicar Filtros
        </Button>
      </div>

      {filteredJobs.length > 0 && <Pagination />}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentJobs.map((job) => (
            <Card
              key={job.id_uuid}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold break-words">
                  {job.position}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start text-sm text-gray-500 mb-2">
                  <Building2 />
                  <span className="text-sm font-bold text-gray-700 mb-2 break-words">
                    {job.institution}
                  </span>
                </div>
                <div className="text-sm font-semibold mb-2">
                  Sueldo: S/ {job.wage.toFixed(2)}
                </div>
                <div className="flex items-start text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 mr-1 mt-1 flex-shrink-0" />
                  <span className="break-words">{job.ubication}</span>
                </div>
                <div className="flex items-start text-sm text-gray-500 mb-2">
                  <Briefcase className="w-4 h-4 mr-1 mt-1 flex-shrink-0" />
                  <span className="break-words">
                    Convocatoria: {job.num_conv}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Users className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>Vacantes: {job.n_vac}</span>
                </div>

                <div className="flex items-start text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1 mt-1 flex-shrink-0" />
                  <span className="break-words">
                    {job.begin_date} - {job.end_date}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-center items-center mt-8 space-x-4">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          variant="outline"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Anterior
        </Button>
        <span className="text-sm">
          Página {page} de {totalPages}
        </span>
        <Button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          variant="outline"
          aria-label="Página siguiente"
        >
          Siguiente <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
