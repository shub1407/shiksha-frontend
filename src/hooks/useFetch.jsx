import { useState, useEffect } from "react"
import axios from "axios"
function useFetch(url) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(url)
      setData(response.data.data)
      setMessage(response.data.message)
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message)
      } else {
        setError("An error occurred")
      }
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [url])
  return { data, message, error, loading }
}
export default useFetch
