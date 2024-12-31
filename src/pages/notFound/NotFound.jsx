import React from "react"
import { useNavigate } from "react-router-dom" // For navigating back to the homepage or previous page.

const NotFound = () => {
  const navigate = useNavigate()

  // Function to go back to the homepage or any other desired route
  const goHome = () => {
    navigate("/login") // Adjust to your homepage or any other route
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#04517d] to-[#039d94] text-white">
      <div className="text-center space-y-6">
        <div className="text-6xl font-extrabold">404</div>
        <div className="text-2xl font-medium">Oops! Page Not Found</div>
        <p className="text-lg max-w-md mx-auto">
          The page you are looking for doesn’t exist or has been moved. Please
          check the URL or return to the homepage.
        </p>
        <div>
          <button
            onClick={goHome}
            className="mt-4 px-6 py-3 bg-[#04517d] text-white rounded-full text-lg font-semibold hover:bg-[#034a63] transition-all"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
