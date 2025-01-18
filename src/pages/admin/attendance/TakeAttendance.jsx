import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import { AuthContext } from "../../../context/AuthContext"
import { backendUrl } from "../../../utils/constants"
import { use } from "react"
import { selectClasses } from "@mui/material"
const Attendance = () => {
  const [classInput, setClassInput] = useState("")
  const [sectionInput, setSectionInput] = useState("")
  const [attendanceDate, setAttendanceDate] = useState("")
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isAttendanceAlreadyMarked, setIsAttendanceAlreadyMarked] =
    useState(false)
  const { userId, role } = useContext(AuthContext)

  const [classes, setClasses] = useState([])
  const [sections, setSections] = useState([])
  useEffect(() => {
    const fetchClass = async (req, res) => {
      const response = await axios.get(`${backendUrl}/api/admins/all-classes`)
      const availableClasses = response.data.data.classes
      const availableSections = response.data.data.sections
      console.log(availableSections[9])
      setLoading(false)
      setClasses(availableClasses)
      setSections(availableSections)
    }

    fetchClass()
  }, [])

  const handleFetchStudents = async () => {
    if (!classInput || !sectionInput || !attendanceDate) {
      setError("Please provide class, section, and date.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const attendanceStatus = await axios.post(
        `${backendUrl}/api/attendance/check-attendance-status`,
        {
          classInput,
          sectionInput,
          attendanceDate,
          userType: "student",
        }
      )
      if (attendanceStatus.data.data) {
        const markedByUser = attendanceStatus.data.data.markedByUser
        console.log(markedByUser)
        const msg = `${attendanceStatus.data.message}  by
           
            ${markedByUser.name} 
            (${markedByUser.role})
            
           `
        setError(msg)
        setStudents(attendanceStatus.data.data.attendanceData)
        setIsAttendanceAlreadyMarked(true)
        setLoading(false)
        return
      }
      setIsAttendanceAlreadyMarked(false)
      const response = await axios.get(
        `${backendUrl}/api/admins/students/${classInput}?section=${sectionInput}`
      )
      if (!response.data.error) {
        setStudents(
          response.data.data.map((student) => ({
            ...student,
            isPresent: false,
          }))
        )
      } else {
        setError(response.data.message || "Error fetching students.")
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message)
      } else {
        setError("An error occurred while fetching students.")
        console.log(err)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAttendanceChange = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === id
          ? { ...student, isPresent: !student.isPresent }
          : student
      )
    )
  }
  const handleEditAttendance = async () => {
    setLoading(true)
    setError("")
    try {
      setIsAttendanceAlreadyMarked(false)
      const response = await axios.get(
        `${backendUrl}/api/admins/students/${classInput}?section=${sectionInput}`
      )
      if (!response.data.error) {
        setStudents(
          response.data.data.map((student) => ({
            ...student,
            isPresent: false,
          }))
        )
      } else {
        setError(response.data.message || "Error fetching students.")
      }
    } catch (err) {
      setError("An error occurred while fetching students.")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  const handleSubmitAttendance = async () => {
    const attendance = students.map(({ _id, isPresent }) => ({
      id: _id,
      status: isPresent ? "present" : "absent",
    }))

    if (!classInput || !sectionInput || !attendanceDate) {
      setError("Please provide class, section, and date.")
      return
    }
    const obj = {
      classInput,
      sectionInput,
      attendanceDate: attendanceDate,
      attendanceData: attendance,
      markedById: userId,
      markedByRole: role,
      userType: "student",
    }
    console.log(obj)

    try {
      setLoading(true)
      setError("")

      const response = await axios.post(
        `${backendUrl}/api/attendance/mark-attendance`,
        obj
      )

      if (response.data.error) {
        setError(response.data.message || "Error submitting attendance.")
      } else {
        alert("Attendance submitted successfully!")
        setStudents([]) // Clear students after submission
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message)
      } else setError("An error occurred while submitting attendance.")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Attendance Sheet Of Student</h1>
      <div style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Class:</label>
          <select
            value={classInput}
            onChange={(e) => {
              setClassInput(e.target.value)
              setStudents([])
              setIsAttendanceAlreadyMarked(false)
              setError("")
            }}
            style={styles.dropdown}
          >
            <option value="">Select Class</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls === "Select Class" ? "" : cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Section:</label>
          <select
            value={sectionInput}
            onChange={(e) => setSectionInput(e.target.value)}
            style={styles.dropdown}
          >
            <option value="">Select Section</option>
            {classInput &&
              sections[classInput].map((sec, index) => (
                <option key={index} value={sec === "Select Section" ? "" : sec}>
                  {sec}
                </option>
              ))}
          </select>
        </div>
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
          onClick={handleFetchStudents}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Fetching..." : "Fetch Students"}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}
      {isAttendanceAlreadyMarked && students.length > 0 && (
        <div>
          <h2 style={styles.subHeading}>
            Attendance for Class {classInput}, Section {sectionInput} on{" "}
            {attendanceDate}
          </h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student ID</th>
                <th style={styles.th}>Student Name</th>
                <th style={styles.th}>Days Present</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} style={styles.tr}>
                  <td style={styles.td}>{student.userId.admNo}</td>
                  <td style={styles.td}>{student.userId.name}</td>
                  <td style={styles.td}>{student.userId.totalDaysPresent}</td>
                  <td style={styles.td}>{student.status}</td>
                </tr>
              ))}
            </tbody>
            <button
              onClick={() => {
                setIsAttendanceAlreadyMarked(false)
                handleEditAttendance()
                //TODO:fix the total present day status
              }}
              style={styles.submitButton}
            >
              Edit Attendance
            </button>
          </table>
        </div>
      )}
      {/* if attendance not already marked */}
      {!isAttendanceAlreadyMarked && students.length > 0 && (
        <div>
          <h2 style={styles.subHeading}>
            Attendance for Class {classInput}, Section {sectionInput} on{" "}
            {attendanceDate}
          </h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student ID</th>
                <th style={styles.th}>Student Name</th>
                <th style={styles.th}>Days Present</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} style={styles.tr}>
                  <td style={styles.td}>{student.admNo}</td>
                  <td style={styles.td}>{student.name}</td>
                  <td style={styles.td}>{student.totalDaysPresent}</td>
                  <td style={styles.td}>
                    <input
                      type="checkbox"
                      checked={student.isPresent}
                      onChange={() => handleAttendanceChange(student._id)}
                      style={styles.checkbox}
                    />
                    {student.isPresent ? " Present" : " Absent"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleSubmitAttendance} style={styles.submitButton}>
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
  dropdown: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "200px",
    backgroundColor: "#fff",
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
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
  },
  checkbox: {
    transform: "scale(1.2)",
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

export default Attendance
