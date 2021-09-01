import { useEffect, useState } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const resp = await fetch(url, { signal: abortController.signal })
        const result = await resp.json()
        setData(result)
      } catch (e) {
        setData([])
        setError(e)
      }
      setIsLoading(false)
    }

    fetchData()
    return () => abortController.abort()
  }, [url])
  return { data, error, isLoading }
}

export default useFetch
