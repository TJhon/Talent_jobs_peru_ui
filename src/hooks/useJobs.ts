import { useState, useEffect } from 'react'
import { JobsResponse } from '../types/job'

const useJobs = (page: number) => {
  const [jobs, setJobs] = useState<JobsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://127.0.0.1:8000/jobs/date=10-10-2024?page=${page}`)
        if (!response.ok) {
          throw new Error('Failed to fetch jobs')
        }
        const data: JobsResponse = await response.json()
        setJobs(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [page])

  return { jobs, loading, error }
}

export default useJobs