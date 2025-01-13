import React, { useState, useEffect } from "react"
import axios from "axios"
import "./AttendanceStatus.css"

const AttendanceStatus = () => {
  const [attendanceData, setAttendanceData] = useState([])
  const [holidays, setHolidays] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [filters, setFilters] = useState({
    class: "9",
    sectionName: "A",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  })
  const [detailShown, setDetailShown] = useState({
    month: "",
    year: "",
    class: "",
    section: "",
  })
  const [daysInMonth, setDaysInMonth] = useState([])
  const [totalWorkingDays, setTotalWorkingDays] = useState(0)
  const [totalDaysPresent, setTotalDaysPresent] = useState(0)

  //   useEffect(() => {

  //   }, [filters])

  useEffect(() => {
    calculateTotals()
  }, [attendanceData, daysInMonth, holidays])

  const calculateDaysInMonth = () => {
    const { month, year } = filters
    const today = new Date()
    let date = new Date(year, month - 1, 1)
    const days = []

    while (date.getMonth() === month - 1) {
      if (date <= today) {
        const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000) // Convert UTC to IST
        const formattedDate = istDate.toISOString().split("T")[0]
        days.push({
          date: formattedDate,
          day: istDate.toLocaleDateString("en-US", { weekday: "short" }),
        })
      }
      date = new Date(date.setDate(date.getDate() + 1))
    }

    setDaysInMonth(days)
  }

  const fetchAttendance = async () => {
    try {
      setLoading(true)
      setError("")
      const { class: className, sectionName, month, year } = filters
      const response = await axios.get(
        `http://localhost:4000/api/attendance/report/${className}/${sectionName}/${month}/${year}`
      )
      const obj = {
        month,
        year,
        class: className,
        section: sectionName,
      }
      setDetailShown(obj)
      setAttendanceData(response.data.data)
    } catch (err) {
      setError("Failed to fetch attendance data. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchHolidays = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `http://localhost:4000/api/attendance/holiday`
      )
      const holidayList = response.data.holidays.flatMap((holiday) => {
        const startDate = new Date(
          new Date(holiday.startDate).getTime() + 5.5 * 60 * 60 * 1000
        ) // UTC to IST
        const endDate = new Date(
          new Date(holiday.endDate).getTime() + 5.5 * 60 * 60 * 1000
        ) // UTC to IST
        const dates = []
        while (startDate <= endDate) {
          dates.push(startDate.toISOString().split("T")[0])
          startDate.setDate(startDate.getDate() + 1)
        }
        return dates
      })

      // Add Sundays to the holiday list
      const sundayDates = daysInMonth
        .filter(({ date }) => {
          const dayOfWeek = new Date(date).getDay()
          return dayOfWeek === 0 // Sunday
        })
        .map(({ date }) => date)

      setHolidays([...holidayList, ...sundayDates])
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch holiday data:", err)
    }
  }

  const calculateTotals = () => {
    let totalWorkingDays = daysInMonth.length
    let totalDaysPresent = 0

    // Exclude holidays (including Sundays) from working days
    totalWorkingDays -= holidays.filter((holidayDate) =>
      daysInMonth.some((day) => day.date === holidayDate)
    ).length

    // Calculate total days present
    attendanceData.forEach((student) => {
      student.attendance.forEach((att) => {
        const date = new Date(
          new Date(att.date).getTime() + 5.5 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0] // Convert UTC to IST
        if (
          daysInMonth.some((day) => day.date === date) &&
          !holidays.includes(date)
        ) {
          if (att.status === "present") {
            totalDaysPresent++
          }
        }
      })
    })

    setTotalWorkingDays(totalWorkingDays)
    setTotalDaysPresent(totalDaysPresent)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const getAttendanceForDay = (attendance, date) => {
    const record = attendance.find(
      (att) =>
        new Date(new Date(att.date).getTime() + 5.5 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0] === date
    )
    if (holidays.includes(date)) {
      return "Holiday"
    }
    return record ? record.status : "NA"
  }

  return (
    <div className="attendance-container ">
      <h1 className="attendance-title">Attendance Status</h1>

      {/* Filter Section */}
      <div className="filters">
        <div className="filter-group">
          <label>Class:</label>
          <input
            type="text"
            name="class"
            value={filters.class}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <label>Section:</label>
          <input
            type="text"
            name="sectionName"
            value={filters.sectionName}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <label>Month:</label>
          <input
            type="number"
            name="month"
            value={filters.month}
            onChange={handleFilterChange}
            className="filter-input"
            min="1"
            max="12"
          />
        </div>
        <div className="filter-group">
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="filter-input"
            min="2000"
            max="2100"
          />
        </div>
        <button
          onClick={() => {
            fetchAttendance()
            calculateDaysInMonth()
            calculateTotals()
            fetchHolidays()
          }}
          className="fetch-button"
        >
          Fetch
        </button>
      </div>

      {/* Display Section */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        attendanceData.length > 0 && (
          <div className="table-container">
            <h2 className="text-xl font-bold underline">
              Attendance Report of {detailShown.month}/{detailShown.year} for
              class {detailShown.class} {detailShown.section}
            </h2>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Adm No</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  {daysInMonth.map(({ date, day }) => (
                    <th key={date}>
                      {date.split("-")[2]} <br /> {day}
                    </th>
                  ))}
                  <th>Total Working Days</th>
                  <th>Total Days Present</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((student) => (
                  <tr key={student._id}>
                    <td>{student.admNo}</td>
                    <td>{student.name}</td>
                    <td>{student.class}</td>
                    <td>{student.sectionName}</td>
                    {daysInMonth.map(({ date }) => {
                      const status = getAttendanceForDay(
                        student.attendance,
                        date
                      )
                      return (
                        <td
                          key={date}
                          className={`status-${status.toLowerCase()}`}
                        >
                          {status === "present"
                            ? "✔️"
                            : status === "absent"
                              ? "❌"
                              : status === "Holiday"
                                ? "🌟"
                                : "NA"}
                        </td>
                      )
                    })}
                    <td>{totalWorkingDays}</td>
                    <td>{totalDaysPresent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  )
}

export default AttendanceStatus
