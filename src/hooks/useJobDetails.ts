import { useState, useEffect } from 'react'
import { JobDetails } from '../types/job'

const useJobDetails = (date: string, id: string) => {
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://127.0.0.1:8000/jobs/job/date=${date}/uuid=${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch job details')
        }
        const data = await response.json()
        setJobDetails(data.data[0])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [date, id])

  return { jobDetails, loading, error }
}

export default useJobDetails