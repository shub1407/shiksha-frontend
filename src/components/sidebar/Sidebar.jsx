import { useState } from "react"
import "./Sidebar.css"
import {
  FaBars,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaPlus,
  FaList,
} from "react-icons/fa"
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom"

const Sidebar = () => {
  const [selected, setSelected] = useState("")
  const [showStudentsOptions, setShowStudentsOptions] = useState(false)
  const [showTeacherOptions, setShowTeacherOptions] = useState(false)
  const [showModeratorOptions, setShowModeratorOptions] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true) // Controls menu expansion

  const handleSelection = (section) => {
    setSelected(section)
  }

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      {/* logo & hamburger */}
      <div
        className="toggle-button items-center flex justify-between"
        onClick={toggleSidebar}
      >
        <div className="h-12 w-12 overflow-hidden bg-inherit rounded-xl">
          <img src={logo} alt="" />
        </div>
        <div>
          <FaBars />
        </div>
      </div>

      <ul className="select-none">
        <li
          className={selected === "students" ? "active" : ""}
          onClick={() => {
            selected === "students"
              ? handleSelection("")
              : handleSelection("students")
            setShowModeratorOptions(false)
            setShowTeacherOptions(false)
            setShowStudentsOptions(!showStudentsOptions)
          }}
        >
          <FaUserGraduate className="icon" />
          {isExpanded && "Students"}
        </li>
        {showStudentsOptions && isExpanded && (
          <ul className="submenu">
            <Link to="/admin/add-student">
              <li>
                <FaPlus className="icon" /> Add Student
              </li>
            </Link>
            <Link to="/admin/students">
              <li>
                <FaList className="icon" /> All Students
              </li>
            </Link>
          </ul>
        )}
        <li
          className={selected === "teacher" ? "active" : ""}
          onClick={() => {
            selected === "teacher"
              ? handleSelection("")
              : handleSelection("teacher")
            setShowModeratorOptions(false)
            setShowStudentsOptions(false)
            setShowTeacherOptions(!showTeacherOptions)
          }}
        >
          <FaChalkboardTeacher className="icon" />
          {isExpanded && "Teacher"}
        </li>
        {showTeacherOptions && isExpanded && (
          <ul className="submenu">
            <Link to="/admin/add-teacher">
              <li>
                <FaPlus className="icon" /> Add Teacher
              </li>
            </Link>
            <Link to="/admin/teacher">
              <li>
                <FaList className="icon" /> All Teachers
              </li>
            </Link>
          </ul>
        )}
        <li
          className={selected === "moderator" ? "active" : ""}
          onClick={() => {
            selected === "moderator"
              ? handleSelection("")
              : handleSelection("moderator")
            setShowStudentsOptions(false)
            setShowTeacherOptions(false)
            setShowModeratorOptions(!showModeratorOptions)
          }}
        >
          <FaUserShield className="icon" />
          {isExpanded && "Moderator"}
        </li>
        {showModeratorOptions && isExpanded && (
          <ul className="submenu">
            <Link to="/admin/add-moderator">
              <li>
                <FaPlus className="icon" /> Add Moderator
              </li>
            </Link>
            <Link to="/admin/moderators">
              <li>
                <FaList className="icon" /> All Moderators
              </li>
            </Link>
          </ul>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
