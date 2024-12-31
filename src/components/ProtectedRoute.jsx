import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import { backendUrl } from "../utils/constants"
import AccessDenied from "../pages/AccessDenied"
import LogoutBtn from "./sidebar/LogoutBtn"
export default function ProtectedRoute({ children, allowedRoles }) {
  const navigate = useNavigate()
  const { setIsAuthenticated, isAuthenticated, loading, role } =
    useContext(AuthContext)
  if (loading) {
    return <div>Loading..</div>
  }
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  console.log("role hai" + " " + role)
  if (allowedRoles.includes(role)) {
    return children
  } else {
    return (
      <div>
        <AccessDenied />
      </div>
    )
  }
}
