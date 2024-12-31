import axios from "axios"
import { backendUrl } from "../../utils/constants"
import { Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
export default function Dashboard() {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AuthContext)
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <h1 className="text-red-500">Dashboard</h1>
        <button
          onClick={async () => {
            const response = await axios.get(`${backendUrl}/logout`, {
              withCredentials: true,
            })
            console.log(response)
            setIsAuthenticated(false)
            navigate("/login")
            alert("Logout")
          }}
        >
          Logout
        </button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
