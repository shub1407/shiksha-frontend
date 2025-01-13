import React, { useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../../../context/AuthContext"

const TakeTeacherAttendance = () => {
  const [attendanceDate, setAttendanceDate] = useState("")
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isAttendanceAlreadyMarked, setIsAttendanceAlreadyMarked] =
    useState(false)
  const { userId, role } = useContext(AuthContext)

  const handleFetchTeachers = async () => {
    if (!attendanceDate) {
      setError("Please provide a date.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const attendanceStatus = await axios.post(
        "http://localhost:4000/api/attendance/check-attendance-status",
        {
          attendanceDate,
          userType: "teacher",
        }
      )

      if (attendanceStatus.data.data) {
        const markedByUser = attendanceStatus.data.data.markedByUser
        const msg = `${attendanceStatus.data.message} by 
          ${markedByUser.name} 
          (${markedByUser.role})`
        setError(msg)
        setTeachers(attendanceStatus.data.data.attendanceData)
        setIsAttendanceAlreadyMarked(true)
        setLoading(false)
        return
      }

      setIsAttendanceAlreadyMarked(false)
      const response = await axios.get(
        "http://localhost:4000/api/admins/view-teachers"
      )
      if (!response.data.error) {
        setTeachers(
          response.data.data.map((teacher) => ({
            ...teacher,
            isPresent: false,
          }))
        )
      } else {
        setError(response.data.message || "Error fetching teachers.")
      }
    } catch (err) {
      setError("An error occurred while fetching teachers.")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAttendanceChange = (id) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher._id === id
          ? { ...teacher, isPresent: !teacher.isPresent }
          : teacher
      )
    )
  }

  const handleSubmitAttendance = async () => {
    const attendance = teachers.map(({ _id, isPresent }) => ({
      id: _id,
      status: isPresent ? "present" : "absent",
    }))

    if (!attendanceDate) {
      setError("Please provide a date.")
      return
    }
    const obj = {
      attendanceDate: attendanceDate,
      attendanceData: attendance,
      markedById: userId,
      markedByRole: role,
    }

    try {
      setLoading(true)
      setError("")

      const response = await axios.post(
        "http://localhost:4000/api/attendance/mark-attendance",
        obj
      )

      if (response.data.error) {
        setError(response.data.message || "Error submitting attendance.")
      } else {
        alert("Attendance submitted successfully!")
        setTeachers([]) // Clear teachers after submission
      }
    } catch (err) {
      setError("An error occurred while submitting attendance.")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Teacher Attendance Sheet</h1>
      <div style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date:</label>
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            style={styles.input}
          />
        </div>
        <button
          onClick={handleFetchTeachers}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Fetching..." : "Fetch Teachers"}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}
      {isAttendanceAlreadyMarked && teachers.length > 0 && (
        <div>
          <h2 style={styles.subHeading}>
            Attendance for Teachers on {attendanceDate}
          </h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Teacher ID</th>
                <th style={styles.th}>Teacher Name</th>
                <th style={styles.th}>Days Present</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id} style={styles.tr}>
                  <td style={styles.td}>{teacher.userId.staffId}</td>
                  <td style={styles.td}>{teacher.name}</td>
                  <td style={styles.td}>{teacher.totalDaysPresent}</td>
                  <td style={styles.td}>{teacher.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isAttendanceAlreadyMarked && teachers.length > 0 && (
        <div>
          <h2 style={styles.subHeading}>
            Attendance for Teachers on {attendanceDate}
          </h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Teacher ID</th>
                <th style={styles.th}>Teacher Name</th>
                <th style={styles.th}>Class</th>
                <th style={styles.th}>Section</th>
                <th style={styles.th}>Assigned Day</th>
                <th style={styles.th}>Days Present</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id} style={styles.tr}>
                  <td style={styles.td}>{teacher.rollNo}</td>
                  <td style={styles.td}>{teacher.name}</td>
                  <td style={styles.td}>{teacher.class}</td>
                  <td style={styles.td}>{teacher.sectionName}</td>
                  <td style={styles.td}>
                    {teacher.assignedDays == 0 ? "Mon-Wed" : "Thur-Sat"}
                  </td>
                  <td style={styles.td}>{teacher.totalDaysPresent}</td>
                  <td style={styles.td}>
                    <input
                      type="checkbox"
                      checked={teacher.isPresent}
                      onChange={() => handleAttendanceChange(teacher._id)}
                      style={styles.checkbox}
                    />
                    {teacher.isPresent ? " Present" : " Absent"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => {
              alert("Undder Construction")
            }}
            style={styles.submitButton}
          >
            Submit Attendance
          </button>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f1f5f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#555",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "200px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    textAlign: "left",
  },
  th: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    fontWeight: "bold",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  checkbox: {
    marginRight: "10px",
  },
  submitButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
}

export default TakeTeacherAttendance
