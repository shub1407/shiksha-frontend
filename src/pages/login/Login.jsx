import { useState, useContext, useEffect } from "react"
import "./Login.css"
import clubLogo from "../../assets/logo.png" // Ensure you have the logo image in the assets folder
import axios from "axios"
import { backendUrl } from "../../utils/constants"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("admin")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const {
    setIsAuthenticated,
    isAuthenticated,
    setRole: setRoleContext,
    loading: contextLoading,
  } = useContext(AuthContext)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard")
    } else {
      navigate("/login")
    }
  }, [isAuthenticated])

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    const data = { email, password, role }
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`${backendUrl}/login`, data, {
        withCredentials: true,
      })
      setErrorMessage("") // Clear any previous error messages
      console.log(response)
      setIsAuthenticated(true)
      setRoleContext(role)
      navigate("/dashboard")
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage("An error occurred")
        console.log(error)
      }
    }
    // Handle login logic here
    console.log({ email, password, role })
    setLoading(false)
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={clubLogo} alt="Shiksha Club Logo" className="club-logo" />
        <h1 className="login-title">Shiksha Login</h1>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button type="submit" className="login-button">
            {loading ? <div className="spinner"></div> : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
