import "./App.css"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider, AuthContext } from "./context/AuthContext.jsx"
import Login from "./pages/login/Login"
import Dashboard from "./pages/dashboard/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import useFetch from "./hooks/useFetch.jsx"
import { backendUrl } from "./utils/constants.js"
import { useEffect, useContext, useState } from "react"
import axios from "axios"
import NotFound from "./pages/notFound/NotFound.jsx"

import AdminHomePage from "./pages/admin/AdminHomePage.jsx"
import AdminDashboard from "./pages/admin/Dashboard.jsx"

function App() {
  console.log("backend url hai", backendUrl)
  const { loading } = useContext(AuthContext)
  if (loading) {
    return <div>Loading</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminHomePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
