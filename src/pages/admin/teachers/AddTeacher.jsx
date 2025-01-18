import React, { useState } from "react"
import axios from "axios"
import { backendUrl } from "../../../utils/constants"

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    class: "",
    subject: "",
    assignedDays: "",
    year: "",
  })
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage("")
    setErrorMessage("")

    try {
      const response = await axios.post(
        `${backendUrl}/api/admins/create-teacher`,
        formData
      )
      setSuccessMessage("Teacher added successfully!")
      setFormData({
        rollNo: "",
        name: "",
        email: "",
        password: "",
        contactNumber: "",
        class: "",
        subject: "",
        assignedDays: "",
        year: "",
      })
    } catch (error) {
      setErrorMessage("There was an error adding the teacher.")
    } finally {
      setLoading(false)
    }
  }
  const classes = []
  for (let i = 1; i <= 12; i++) {
    classes.push(i.toString())
  }
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-xl mx-auto">
      <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Add New Teacher
      </h3>

      {successMessage && (
        <p className="text-green-600 text-center">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 text-center">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Roll No:</label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700">Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700">Class:</label>
          {/* <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          /> */}
          <select
            name="class"
            id=""
            value={formData.class}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Subject:</label>
          {/* <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          /> */}
          <select
            name="subject"
            id=""
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Subject</option>
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Days Pref:</label>
          {/* <input
            type="number"
            name="assignedDays"
            value={formData.assignedDays}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          /> */}
          <select
            name="assignedDays"
            id=""
            value={formData.assignedDays}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select day Pref</option>
            <option value="0">Mon-Wed</option>
            <option value="1">Thu-Sat</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Year:</label>
          {/* <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          /> */}
          <select
            name="year"
            id=""
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {loading ? "Adding Teacher..." : "Add Teacher"}
        </button>
      </form>
    </div>
  )
}

export default AddTeacher
