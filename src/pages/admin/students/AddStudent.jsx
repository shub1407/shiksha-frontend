import React, { useState } from "react"
import { backendUrl } from "../../../utils/constants"

const AddStudent = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [classLevel, setClassLevel] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const classes = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const studentData = {
      name,
      email,
      contactNumber,
      class: classLevel,
    }

    try {
      const response = await fetch(`${backendUrl}/api/admins/create-student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      })

      const data = await response.json()

      if (data.error) {
        setMessage(`Error: ${data.message}`)
      } else {
        setMessage("Student added successfully!")
        setName("")
        setEmail("")
        setContactNumber("")
        setClassLevel("")
      }
    } catch (error) {
      setMessage("Error: Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-[#04517d] mb-6">
        Add New Student
      </h2>

      {message && (
        <p
          className={`text-center mb-4 ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#04517d] focus:border-[#04517d] transition ease-in-out"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#04517d] focus:border-[#04517d] transition ease-in-out"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="contactNumber"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#04517d] focus:border-[#04517d] transition ease-in-out"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="class"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Class
          </label>
          <select
            id="class"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#04517d] focus:border-[#04517d] transition ease-in-out"
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            {classes.map((classLevel) => (
              <option key={classLevel} value={classLevel}>
                {classLevel}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-[#04517d] text-white py-3 px-6 rounded-md hover:bg-[#034a63] focus:outline-none focus:ring-2 focus:ring-[#04517d] transition-colors duration-300"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddStudent
