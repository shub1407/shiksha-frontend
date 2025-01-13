import React, { useState } from "react"
import "./Login.css"
import clubLogo from "../assets/logo.png" // Ensure you have the logo image in the assets folder
import axios from "axios"
import { backendUrl } from "../utils/constants"
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("admin")

  const handleSubmit = async (e) => {
    const data = { email, password }
    e.preventDefault()
    try {
      const response = await axios.post(
        `http://localhost:4000/api/admins/login`,
        data
      )
      console.log(response)
    } catch (error) {
      console.log(error)
    }

    // Handle login logic here
    console.log({ email, password, role })
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={clubLogo} alt="Shiksha Club Logo" className="club-logo" />
        <h1 className="login-title">Shiksha Login</h1>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
