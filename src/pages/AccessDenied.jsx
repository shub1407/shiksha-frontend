import { useNavigate } from "react-router-dom" // For navigating back to the homepage or login page

const AccessDenied = () => {
  const navigate = useNavigate()

  // Function to navigate back to homepage or login
  const goHome = () => {
    navigate("/") // Adjust to your homepage or login page
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#dc3545] to-[#e63946] text-white">
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-24 h-24 text-white mx-auto"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9h2v4h-2zm0 6h2v2h-2z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Title and Message */}
        <div className="text-6xl font-extrabold">403</div>
        <div className="text-2xl font-medium">Access Denied</div>
        <p className="text-lg max-w-md mx-auto">
          You don't have permission to access this page. If you think this is an
          error, please contact the administrator.
        </p>

        {/* Button to go back */}
        <div>
          <button
            onClick={goHome}
            className="mt-4 px-6 py-3 bg-[#e63946] text-white rounded-full text-lg font-semibold hover:bg-[#c72c34] transition-all"
          >
            Go to Homepage
          </button>
          <LogoutBtn />
        </div>
      </div>
    </div>
  )
}

export default AccessDenied
