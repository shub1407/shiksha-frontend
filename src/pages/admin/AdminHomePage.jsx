import Sidebar from "../../components/sidebar/Sidebar"
import { Outlet, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import LogoutBtn from "../../components/sidebar/LogoutBtn"
// Students components
import AddStudent from "./students/AddStudent"
import AllStudent from "./students/AllStudents"
//teacher component
import TeacherList from "./teachers/TeacherList"
//class componnents
import AllSections from "./classes/AllSections"
import AddSection from "./classes/AddSection"
import NotFound from "../notFound/NotFound"
import { SectionDetail } from "./classes/SectionDetail"
import AddTeacher from "./teachers/AddTeacher"
//attendance
import AttendanceReport from "./attendance/AttendanceReport"
import TakeAttendance from "./attendance/TakeAttendance"
import HolidayManager from "./attendance/HolidayManager"
import DashboardTopBar from "./DashboardTopBar"
import TakeTeacherAttendance from "./attendance/TakeTeacherAttendance"
export default function AdminHomePage() {
  return (
    <div className="flex box-border h-full w-full">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <div>
          <DashboardTopBar />
        </div>
        <Outlet />
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          {/* Routes for teachers */}
          <Route path="teacher" element={<TeacherList />} />
          <Route path="teacher/:id" element={<h1>Teacher Details</h1>} />
          <Route path="add-teacher" element={<AddTeacher />} />
          {/* Routes for students */}
          <Route path="students" element={<AllStudent />} />
          <Route path="student/:id" element={<h1>Student Details</h1>} />
          <Route path="add-student" element={<AddStudent />} />
          {/* Routes for classes */}
          <Route path="sections" element={<AllSections />} />
          <Route path="sections/:sectionId" element={<SectionDetail />} />
          <Route path="add-section" element={<AddSection />} />

          {/* Routes for moderators */}
          <Route path="moderators" element={<h1>All Moderators</h1>} />
          <Route path="moderator/:id" element={<h1>Moderator Details</h1>} />
          <Route path="add-moderator" element={<h1>Add Moderator</h1>} />

          {/* Routes for attendance */}
          <Route path="attendance" element={<TakeAttendance />} />
          <Route
            path="teacher-attendance"
            element={<TakeTeacherAttendance />}
          />
          <Route path="attendance-report" element={<AttendanceReport />} />
          <Route path="holiday-manager" element={<HolidayManager />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}
