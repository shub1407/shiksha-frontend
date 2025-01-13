import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios"

export function SectionDetail() {
  const { sectionId } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [view, setView] = useState("students")
  const [unassignedStudents, setUnassignedStudents] = useState([])
  const [unassignedTeachers, setUnassignedTeachers] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const [selectedTeachers, setSelectedTeachers] = useState()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Fetch data for section details
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/admins/class-detail/${sectionId}`
        )
        setData(response.data.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch data.")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const fetchUnassignedStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/admins/students/${data.class}?section=none`
      )
      setUnassignedStudents(response.data.data)
      setShowModal(true) // Open modal
    } catch (err) {
      setError("Failed to fetch unassigned students.")
    }
  }
  const fetchUnassignedTeachers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/admins/view-teachers/${data.class}?section=none&day=all `
      )
      setUnassignedTeachers(response.data.data)
      console.log(response.data.data)
      setShowModal(true) // Open modal
    } catch (err) {
      setError("Failed to fetch unassigned teachers.")
    }
  }

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    )
  }

  const assignStudentsToSection = async () => {
    try {
      // Assign all selected students to the section
      await axios.post(`http://localhost:4000/api/admins/assign-students`, {
        sectionId: data._id,
        studentId: selectedStudents,
      })
      // Re-fetch the section data to update the list of students
      const response = await axios.get(
        `http://localhost:4000/api/admins/class-detail/${sectionId}`
      )
      setData(response.data.data)
      setShowModal(false) // Close modal after assigning students
    } catch (err) {
      setError("Failed to assign students.")
    }
  }
  const assignTeacherToSection = async () => {
    try {
      // Assign all selected students to the section
      await axios.post(`http://localhost:4000/api/admins/assign-teacher`, {
        sectionId: data._id,
        teacherId: selectedTeachers,
      })
      // Re-fetch the section data to update the list of students
      const response = await axios.get(
        `http://localhost:4000/api/admins/class-detail/${sectionId}`
      )
      setData(response.data.data)
      setShowModal(false) // Close modal after assigning students
    } catch (err) {
      setError("Failed to assign students.")
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#333" }}>
        Section {data.name} - Class {data.class}
      </h1>

      {/* Summary Card */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h4 style={{ marginBottom: "5px" }}>Students</h4>
          <p>{data.students.length}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h4 style={{ marginBottom: "5px" }}>Teachers</h4>
          <p>{data.teachers.length}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h4 style={{ marginBottom: "5px" }}>Assigned Class</h4>
          <p>{data.class}</p>
        </div>
      </div>

      {/* Buttons for View Toggle */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setView("students")}
          style={{
            backgroundColor: view === "students" ? "red" : "white",
            color: view === "students" ? "white" : "black",
            padding: "12px 25px",
            marginRight: "10px",
            border: "2px solid #ddd",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          Student Details
        </button>
        <button
          onClick={() => setView("teachers")}
          style={{
            backgroundColor: view === "teachers" ? "red" : "white",
            color: view === "teachers" ? "white" : "black",
            padding: "12px 25px",
            border: "2px solid #ddd",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          Teacher Details
        </button>
      </div>

      {/* Assign New Student Button */}
      <button
        onClick={
          view === "students"
            ? fetchUnassignedStudents
            : fetchUnassignedTeachers
        }
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "12px 25px",
          border: "2px solid #ddd",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
          transition: "all 0.3s",
        }}
      >
        {view === "teachers" ? "Assign teacher" : "Assign new Student"}
      </button>

      {/* Modal for Assigning Students */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "80%",
              maxHeight: "80%",
              overflowY: "auto",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2 style={{ textAlign: "center" }}>
              {view === "students"
                ? "Unassigned Students"
                : "Unassigned Teacher"}
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {view === "students" &&
                unassignedStudents.map((student) => (
                  <div
                    key={student._id}
                    onClick={() => handleStudentSelection(student._id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "15px",
                      borderBottom: "1px solid #ddd",
                      borderRadius: "8px",
                      cursor: "pointer",
                      backgroundColor: selectedStudents.includes(student._id)
                        ? "#87D37C"
                        : "#f9f9f9",
                      color: selectedStudents.includes(student._id)
                        ? "white"
                        : "#333",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                  >
                    <div>
                      <h4>{student.name}</h4>
                      <p>Adm No: {student.admNo}</p>
                    </div>
                  </div>
                ))}

              {view === "teachers" &&
                unassignedTeachers.map((teacher) => (
                  <div
                    key={teacher._id}
                    onClick={() => setSelectedTeachers(teacher._id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "15px",
                      borderBottom: "1px solid #ddd",
                      borderRadius: "8px",
                      cursor: "pointer",
                      backgroundColor:
                        selectedTeachers === teacher._id
                          ? "#87D37C"
                          : "#f9f9f9",
                      color:
                        selectedTeachers === teacher._id ? "white" : "#333",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                  >
                    <div>
                      <h4>{teacher.name}</h4>
                      <h4>{teacher.subject}</h4>
                      <h4>Day preference: {teacher.assignedDays}</h4>
                    </div>
                  </div>
                ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button
                onClick={
                  view === "students"
                    ? assignStudentsToSection
                    : assignTeacherToSection
                }
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "12px 25px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                {view === "teachers"
                  ? "Assign Selected Teacher"
                  : "Assign Selected Students"}
              </button>
              <button
                onClick={() => {
                  setShowModal(false)
                  setSelectedTeachers(null)
                  setSelectedStudents([])
                }}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "12px 25px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Students */}
      {view === "students" && (
        <div>
          <h2 style={{ color: "#333" }}>Students</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {data.students.map((student) => (
              <div
                key={student._id}
                style={{
                  border: "1px solid #ddd",
                  padding: "20px",
                  borderRadius: "8px",
                  width: "250px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                  transition: "all 0.3s",
                }}
              >
                <h3 style={{ color: "#555" }}>{student.name}</h3>
                <p>Class: {student.class}</p>
                <p>Section: {student.sectionName}</p>
                <p>Adm No: {student.admNo}</p>
                <p>Contact: {student.contactNumber}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Teachers */}
      {view === "teachers" && (
        <div>
          <h2 style={{ color: "#333" }}>Teachers</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {data.teachers.map((teacher) => (
              <div
                key={teacher._id}
                style={{
                  border: "1px solid #ddd",
                  padding: "20px",
                  borderRadius: "8px",
                  width: "250px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                  transition: "all 0.3s",
                }}
              >
                <h3 style={{ color: "#555" }}>{teacher.name}</h3>
                <p>Subject: {teacher.subject}</p>
                <p>Assigned Days: {teacher.assignedDays}</p>
                <p>Class: {teacher.class}</p>
                <p>Section: {teacher.sectionName}</p>
                <p>Email: {teacher.email}</p>
                <p>Phone: {teacher.contactNumber}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
