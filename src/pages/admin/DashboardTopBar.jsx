import React from "react"
import LogoutBtn from "../../components/sidebar/LogoutBtn"
import logo from "../../assets/logo.png"
import profile from "../../assets/profile.png"
const DashboardTopBar = () => {
  return (
    <div className="w-full bg-[#2e5077;] shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left Side - Logo and Title */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <img
            src={logo} // Update with your logo path
            alt="Logo"
            className="h-8 w-8 rounded-full" // Adjust size and rounded shape of the logo
          />
          {/* Title */}
          <h1 className="text-white text-lg font-semibold">Dashboard</h1>
        </div>

        {/* Right Side - Profile and Logout */}
        <div className="flex items-center space-x-4">
          {/* Profile Icon */}
          <div className="relative">
            <img
              src={profile} // Replace with profile image path
              alt="Profile"
              className="h-8 w-8 rounded-full border-2 border-white"
            />
            <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-400"></div>{" "}
            {/* Optional status indicator */}
          </div>

          {/* Logout Button */}
          <LogoutBtn />
        </div>
      </div>
    </div>
  )
}

export default DashboardTopBar
