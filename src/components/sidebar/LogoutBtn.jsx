import axios from "axios"
import { backendUrl } from "../../utils/constants"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
export default function LogoutBtn() {
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <button
      className="p-2 border-2 border-black border-solid rounded items-end"
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
  )
}
