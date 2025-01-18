import React, { useState, useEffect } from "react"
import axios from "axios"
import { backendUrl } from "../../../utils/constants"

const TeacherList = () => {
  const [teachers, setTeachers] = useState([])
  const [filteredTeachers, setFilteredTeachers] = useState([])

  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedDay, setSelectedDay] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedSections, setSelectedSections] = useState("all")

  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState([])
  const [sections, setSections] = useState([])
  useEffect(() => {
    // Fetch teacher data from API
    const fetchTeachers = async () => {
      try {
        let response
        if (selectedClass === "all") {
          response = await axios.get(`${backendUrl}/api/admins/view-teachers`)
        } else
          response = await axios.get(
            `${backendUrl}/api/admins/view-teachers/${selectedClass}?section=all&day=all`
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
  useEffect(() => {
    const fetchClass = async (req, res) => {
      const response = await axios.get(`${backendUrl}/api/admins/all-classes`)
      //const availableClasses = response.data.data.classes
      const availableSections = response.data.data.sections
      console.log(availableSections[9])
      setLoading(false)
      const a = []
      for (let i = 1; i <= 12; i++) {
        a.push(i.toString())
      }
      setClasses(a)
      setSections(availableSections)
    }

    fetchClass()
  }, [])

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
      if (selectedSections === "none") {
        filtered = filtered.filter((teacher) => teacher.section == null)
      } else
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
                onChange={(e) => {
                  setSelectedClass(e.target.value)
                  setSelectedSections("all")
                }}
                value={selectedClass}
                className="px-4 py-2 border rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All</option>
                {classes.map((classLevel) => (
                  <option key={classLevel} value={classLevel}>
                    {classLevel}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-700">Section:</label>
              <select
                onChange={(e) => setSelectedSections(e.target.value)}
                value={selectedSections}
                disabled={selectedClass === "all" ? true : false}
                className="px-4 py-2 border rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All</option>
                {selectedClass !== "all" &&
                  sections[selectedClass] &&
                  sections[selectedClass].map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                <option value="none">None</option>
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
                <option value="0">Mon-Wed</option>
                <option value="1">Thurs-Sat</option>
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
                      Assigned Days:{" "}
                      {teacher.assignedDays === "0" ? "Mon-Wed" : "Thurs-Sat"}
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
