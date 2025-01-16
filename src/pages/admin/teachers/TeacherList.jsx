import React, { useState, useEffect } from "react"
import axios from "axios"

const TeacherList = () => {
  const [teachers, setTeachers] = useState([])
  const [filteredTeachers, setFilteredTeachers] = useState([])

  const [selectedClass, setSelectedClass] = useState("9")
  const [selectedDay, setSelectedDay] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedSections, setSelectedSections] = useState("all")

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch teacher data from API
    const fetchTeachers = async () => {
      try {
        let response
        if (selectedClass === "all") {
          response = await axios.get(
            `http://localhost:4000/api/admins/view-teachers`
          )
        } else
          response = await axios.get(
            `http://localhost:4000/api/admins/view-teachers/${selectedClass}?section=all&day=all`
          )
        setTeachers(response.data.data)
        setFilteredTeachers(response.data.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching teacher data:", error)
        setLoading(false)
      }
    }

    fetchTeachers()
  }, [selectedClass])

  const handleFilterChange = () => {
    let filtered = teachers

    if (selectedClass !== "all") {
      filtered = filtered.filter((teacher) => teacher.class === selectedClass)
    }

    if (selectedDay !== "all") {
      filtered = filtered.filter(
        (teacher) => teacher.assignedDays === selectedDay
      )
    }
    if (selectedSubject !== "all") {
      filtered = filtered.filter(
        (teacher) => teacher.subject === selectedSubject
      )
    }
    if (selectedSections !== "all") {
      filtered = filtered.filter(
        (teacher) => teacher.sectionName === selectedSections
      )
    }
    console.log(teachers)

    setFilteredTeachers(filtered)
  }

  useEffect(() => {
    handleFilterChange()
  }, [selectedClass, selectedDay, selectedSubject, selectedSections])

  return (
    <div className="p-6">
      {loading ? (
        <div className="text-center text-lg font-semibold text-gray-600">
          Loading...
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex space-x-4 justify-center">
            <div className="flex items-center space-x-2">
              <label className="text-gray-700">Class:</label>
              <select
                onChange={(e) => setSelectedClass(e.target.value)}
                value={selectedClass}
                className="px-4 py-2 border rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-700">Section:</label>
              <select
                onChange={(e) => setSelectedSections(e.target.value)}
                value={selectedSections}
                className="px-4 py-2 border rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-700">Day:</label>
              <select
                onChange={(e) => setSelectedDay(e.target.value)}
                value={selectedDay}
                className="px-4 py-2 border rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All</option>
                <option value="0">Day 0</option>
                <option value="1">Day 1</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-700">Subject:</label>
              <select
                onChange={(e) => setSelectedSubject(e.target.value)}
                value={selectedSubject}
                className="px-4 py-2 border rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All</option>
                <option value="Maths">Maths</option>
                <option value="Science">Science</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <h4>Total teacher found: {filteredTeachers.length}</h4>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Teachers List
            </h3>
            {filteredTeachers.length > 0 ? (
              <div className="space-y-6">
                {/* Scrollable Section */}
                {filteredTeachers.map((teacher) => (
                  <div
                    key={teacher._id}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <p className="text-lg font-semibold text-gray-800">
                      {teacher.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Email: {teacher.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      Contact: {teacher.contactNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      Class: {teacher.class}
                    </p>
                    <p className="text-sm text-gray-600">
                      Section:{" "}
                      {teacher.sectionName ? teacher.sectionName : "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Subject: {teacher.subject}
                    </p>
                    <p className="text-sm text-gray-600">
                      Assigned Days: {teacher.assignedDays}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No teachers found for the selected filters.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TeacherList
