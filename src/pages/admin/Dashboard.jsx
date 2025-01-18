import React, { useEffect, useState } from "react"
import axios from "axios"
import { backendUrl } from "../../utils/constants"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    presentToday: 0,
    absentToday: 0,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${backendUrl}/api/admins/dashboard-stats`
        )
        const data = response.data.data
        setStats(data)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      }
      setLoading(false)
    }

    fetchStats()
  }, [])

  return (
    <div style={styles.dashboard}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      {loading && <p style={styles.loading}>Loading...</p>}
      {!loading && (
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>{stats.totalStudents}</h2>
            <p style={styles.statLabel}>Total Students</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>{stats.totalTeachers}</h2>
            <p style={styles.statLabel}>Total Teachers</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>{stats.presentToday}</h2>
            <p style={styles.statLabel}>Present Today</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>{stats.absentToday}</h2>
            <p style={styles.statLabel}>Absent Today</p>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  dashboard: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "20px auto",
    textAlign: "center",
    backgroundColor: "#f9fafb",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "32px",
    color: "#1f2937",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  loading: {
    fontSize: "18px",
    color: "#6b7280",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "20px",
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px 30px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "250px",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  statCardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
  },
  statNumber: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: "10px",
  },
  statLabel: {
    fontSize: "16px",
    color: "#4b5563",
  },
}

export default Dashboard
