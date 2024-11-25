export interface Job {
    vacancies: number
    salary: number
    job_posting_url: string
    start_publication_date: string
    end_publication_date: string
    ubication_region: string
    ubication_dist: string | null
    job_title: string
    unique_id: string
    public_institution: string
  }
  
  export interface JobDetails extends Job {
    job_posting_number: string
    required_experience: string
    educational_background: string
    specialization: string
    required_knowledge: string
    skills: string
    ubication: string
    scraping_date: string
  }
  
  export interface JobsResponse {
    total_jobs: number
    page: number
    data: Job[]
  }