import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const AllStudents = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState([])
  const [sections, setSections] = useState([])
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const navigate = useNavigate()

  // Fetch classes and sections on mount
  useEffect(() => {
    // You can replace these with actual API calls to fetch available classes and sections
    const availableClasses = ["8", "9", "10", "11"] // Example classes
    const availableSections = ["A", "B", "C", "D"] // Example sections

    setClasses(availableClasses)
    setSections(availableSections)
  }, [])

  // Fetch students based on selected class and section
  useEffect(() => {
    setLoading(true)

    // Build the URL for fetching students
    let url = `http://localhost:4000/api/admins/students/${selectedClass}`
    if (selectedSection) {
      url += `?section=${selectedSection}`
    }

    // Fetch students data from the API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.data || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching students:", error)
        setLoading(false)
      })
  }, [selectedClass, selectedSection]) // Re-run the effect when the selected class or section changes

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>
  }

  return (
    <div className="border-2 border-black border-solid flex flex-col  p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Student Information
      </h2>

      {/* Filters Section */}
      <div className="mb-6 flex justify-between">
        <div className="w-1/3">
          <label htmlFor="class" className="block text-lg font-medium mb-2">
            Class
          </label>
          <select
            id="class"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Class</option>
            {classes.map((classItem) => (
              <option key={classItem} value={classItem}>
                Class {classItem}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/3">
          <label htmlFor="section" className="block text-lg font-medium mb-2">
            Section
          </label>
          <select
            id="section"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            disabled={!selectedClass}
          >
            <option value="">All</option>
            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg border-t border-gray-300">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-[#04517d] text-white text-left">
              <th className="py-3 px-4">Adm No</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Class</th>
              <th className="py-3 px-4">Section</th>
              <th className="py-3 px-4">Contact No</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student._id}
                  className="hover:bg-[#f1f1f1] transition-colors duration-300 cursor-pointer select-none"
                  onClick={() => {
                    // Add your custom logic to handle student selection
                    navigate(`/admin/student/${student._id}`)
                    console.log("Selected student:", student)
                  }}
                >
                  <td className="py-3 px-4">{student.admNo}</td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{student.class}</td>
                  <td className="py-3 px-4">{student.sectionName || "N/A"}</td>
                  <td className="py-3 px-4">{student.contactNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllStudents
