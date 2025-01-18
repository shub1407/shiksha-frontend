import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { backendUrl } from "../../../utils/constants"
const AllSections = () => {
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState("9")
  const [sections, setSections] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newSectionName, setNewSectionName] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  // Fetch sections of the selected class
  const fetchSections = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admins/class/${selectedClass}`
      )
      setSections(response.data.data || [])
    } catch (error) {
      console.error("Error fetching class data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Add a new section
  const addSection = async () => {
    if (!newSectionName.trim()) {
      alert("Please enter a section name.")
      return
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/admins/create-section`,
        null,
        {
          params: {
            class: selectedClass,
            name: newSectionName,
          },
        }
      )
      alert("Section added successfully!")
      setNewSectionName("") // Clear the input field
      setIsModalOpen(false) // Close the modal
      fetchSections() // Refresh the section list
    } catch (error) {
      console.error("Error adding section:", error)
      alert("Failed to add section. Please try again.")
    }
  }

  // Update sections when selectedClass changes
  useEffect(() => {
    if (selectedClass) {
      setLoading(true)
      fetchSections()
    }
  }, [selectedClass])

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Select a Class</h1>

      {/* Dropdown for selecting class */}
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">-- Select a Class --</option>
        <option value="9">Class 9</option>
        <option value="10">Class 10</option>
        {/* Add more class options as needed */}
      </select>

      {loading && <p>Loading sections...</p>}

      {/* Section cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {sections.map((section) => (
          <div
            key={section._id}
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/admin/sections/${section._id}`)}
          >
            <h2 style={{ marginBottom: "10px" }}>Section: {section.name}</h2>
            <p>
              <strong>Class:</strong> {section.class}
            </p>
            <p>
              <strong>No. of Students:</strong> {section.students.length}
            </p>
            <p>
              <strong>No. of Teachers:</strong> {section.teachers.length}
            </p>
          </div>
        ))}
      </div>

      {/* Button to add a new section */}
      {selectedClass && (
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add New Section
        </button>
      )}

      {/* Modal for adding a new section */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3>Add a New Section</h3>
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Enter section name"
              style={{
                padding: "10px",
                fontSize: "16px",
                marginBottom: "10px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={addSection}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  color: "#fff",
                  backgroundColor: "#007bff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Add
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#ccc",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllSections
