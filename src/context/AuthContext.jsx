import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true) // To handle initial loading
  const [role, setRole] = useState(null)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth-status",
          {
            withCredentials: true, // Include cookies for auth
          }
        )
        console.log(response.data)
        console.log("Context ke andar auth status m")

        if (response.data.data.authenticated) {
          setIsAuthenticated(true)
          console.log("is Authenticated" + isAuthenticated)
          setRole(response.data.data.user.role) // Optional: Set user role
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Error checking auth status:", error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, role, setRole, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
