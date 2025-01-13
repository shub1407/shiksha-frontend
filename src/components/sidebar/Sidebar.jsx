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
import { FaNoteSticky } from "react-icons/fa6"
import logo from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"

const Sidebar = () => {
  const [selected, setSelected] = useState("")
  const [showStudentsOptions, setShowStudentsOptions] = useState(false)
  const [showClassesOptions, setShowClassesOptions] = useState(false)
  const [showTeacherOptions, setShowTeacherOptions] = useState(false)
  const [showModeratorOptions, setShowModeratorOptions] = useState(false)
  const [showAttendance, setShowAttendanceOptions] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true) // Controls menu expansion
  const navigate = useNavigate()
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
            setShowAttendanceOptions(false)
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
          className={selected === "classes" ? "active" : ""}
          onClick={() => {
            selected === "classes"
              ? handleSelection("")
              : handleSelection("classes")
            setShowStudentsOptions(false)
            setShowTeacherOptions(false)
            setShowModeratorOptions(false)
            setShowAttendanceOptions(false)
            setShowClassesOptions(!showClassesOptions)
          }}
        >
          <FaChalkboardTeacher className="icon" />
          {isExpanded && "Classes"}
        </li>
        {showClassesOptions && isExpanded && (
          <ul className="submenu">
            <Link to="/admin/add-section">
              <li>
                <FaPlus className="icon" /> Add Section
              </li>
            </Link>
            <Link to="/admin/sections">
              <li>
                <FaList className="icon" /> Sections
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
            setShowClassesOptions(false)
            setShowAttendanceOptions(false)
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
            setShowClassesOptions(false)
            setShowAttendanceOptions(false)
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

        <li
          className={selected === "attendance" ? "active" : ""}
          onClick={() => {
            selected === "attendance"
              ? handleSelection("")
              : handleSelection("attendance")
            setShowStudentsOptions(false)
            setShowTeacherOptions(false)
            setShowClassesOptions(false)
            setShowModeratorOptions(false)
            setShowAttendanceOptions(!showAttendance)
            navigate("/admin/attendance")
          }}
        >
          <FaNoteSticky className="icon" /> {isExpanded && "Attendance"}
        </li>
        {showAttendance && isExpanded && (
          <ul className="submenu">
            <Link to="/admin/attendance">
              <li>
                <FaPlus className="icon" /> Student Attendnce
              </li>
            </Link>
            <Link to="/admin/teacher-attendance">
              <li>
                <FaPlus className="icon" /> Teacher Attendnce
              </li>
            </Link>
            <Link to="/admin/attendance-report">
              <li>
                <FaList className="icon" /> Attendance Report
              </li>
            </Link>
            <Link to="/admin/holiday-manager">
              <li>
                <FaList className="icon" /> Holiday Manager
              </li>
            </Link>
          </ul>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
