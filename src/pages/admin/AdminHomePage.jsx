import Sidebar from "../../components/sidebar/Sidebar"
import { Outlet, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import LogoutBtn from "../../components/sidebar/LogoutBtn"
import AddStudent from "./students/AddStudent"
import AllStudent from "./students/AllStudents"
import NotFound from "../notFound/NotFound"
export default function AdminHomePage() {
  return (
    <div className="flex box-border h-full w-full">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <div className="h-[3rem] items-end bg-red-400 w-full px-0 py-0 mx-0 my-0">
          <div className="items-end">
            <LogoutBtn />
          </div>
        </div>
        <div className="justify-start">
          <Outlet />
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            {/* Routes for teachers */}
            <Route path="teacher" element={<h1>All Teachers</h1>} />
            <Route path="teacher/:id" element={<h1>Teacher Details</h1>} />
            <Route path="add-teacher" element={<h1>add teacher</h1>} />
            {/* Routes for students */}
            <Route path="students" element={<AllStudent />} />
            <Route path="student/:id" element={<h1>Student Details</h1>} />
            <Route path="add-student" element={<AddStudent />} />
            {/* Routes for moderators */}
            <Route path="moderators" element={<h1>All Moderators</h1>} />
            <Route path="moderator/:id" element={<h1>Moderator Details</h1>} />
            <Route path="add-moderator" element={<h1>Add Moderator</h1>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
