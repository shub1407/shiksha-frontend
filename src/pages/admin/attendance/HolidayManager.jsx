import React, { useState, useEffect } from "react"
import axios from "axios"
import "./HolidayManager.css"

const HolidayManager = () => {
  const [holidays, setHolidays] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newHoliday, setNewHoliday] = useState({
    startDate: "",
    endDate: "",
    description: "",
  })
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" }
    const formattedDate = new Date(date).toLocaleDateString("en-GB", options)
    return formattedDate.split("/").join("-") // Formats to dd-mm-yyyy
  }

  useEffect(() => {
    fetchHolidays()
  }, [])

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/attendance/holiday"
      )
      setHolidays(response.data.holidays)
    } catch (error) {
      console.error("Failed to fetch holidays", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewHoliday((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddHoliday = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/attendance/add-holiday",
        newHoliday
      )
      fetchHolidays()
      setNewHoliday({ startDate: "", endDate: "", description: "" })
      setShowModal(false)
    } catch (error) {
      console.error("Failed to add holiday", error)
    }
  }

  return (
    <div className="container">
      <h1 className="header">Holiday Manager</h1>

      <div className="holiday-list">
        {holidays.map((holiday) => (
          <div key={holiday._id} className="holiday-item">
            <div className="holiday-details">
              <span className="holiday-title">
                {formatDate(holiday.startDate)} - {formatDate(holiday.endDate)}
              </span>
              <span className="holiday-description">{holiday.description}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="add-holiday">
        <button className="add-button" onClick={() => setShowModal(true)}>
          + Add Holiday
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="modal-header">Add New Holiday</h2>

            <div className="input-container">
              <label className="input-label">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={newHoliday.startDate}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div className="input-container">
              <label className="input-label">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={newHoliday.endDate}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div className="input-container">
              <label className="input-label">Description:</label>
              <textarea
                name="description"
                value={newHoliday.description}
                onChange={handleInputChange}
                className="input-field"
                rows="3"
              ></textarea>
            </div>

            <button className="submit-button" onClick={handleAddHoliday}>
              Add Holiday
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default HolidayManager
