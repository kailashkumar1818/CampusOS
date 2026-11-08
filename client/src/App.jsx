import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout & Common
import DashboardLayout from './components/layout/DashboardLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentExams from './pages/student/StudentExams';
import StudentHostel from './pages/student/StudentHostel';
import StudentForum from './pages/student/StudentForum';
import StudentWiseSubjects from './pages/student/StudentWiseSubjects';
import StudentTimetable from './pages/student/StudentTimetable';
import StudentODML from './pages/student/StudentODML';
import StudentCourseRegistration from './pages/student/StudentCourseRegistration';
import StudentSAP from './pages/student/StudentSAP';
import StudentFinance from './pages/student/StudentFinance';
import StudentTransport from './pages/student/StudentTransport';
import StudentFeedback from './pages/student/StudentFeedback';
import StudentNewAttendance from './pages/student/StudentNewAttendance';
import StudentEvents from './pages/student/StudentEvents';

// Faculty Pages
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import FacultyAttendance from './pages/faculty/FacultyAttendance';
import FacultyAssignments from './pages/faculty/FacultyAssignments';
import FacultyMarks from './pages/faculty/FacultyMarks';
import FacultyAcademic from './pages/faculty/FacultyAcademic';
import FacultyExams from './pages/faculty/FacultyExams';
import FacultyStudents from './pages/faculty/FacultyStudents';
import FacultyEvents from './pages/faculty/FacultyEvents';
import FacultySAP from './pages/faculty/FacultySAP';
import FacultyResearch from './pages/faculty/FacultyResearch';
import FacultyLeaves from './pages/faculty/FacultyLeaves';
import FacultyFeedback from './pages/faculty/FacultyFeedback';
import FacultyAnnouncements from './pages/faculty/FacultyAnnouncements';
import FacultyCommunication from './pages/faculty/FacultyCommunication';
import FacultyFinance from './pages/faculty/FacultyFinance';
import FacultyProfile from './pages/faculty/FacultyProfile';
import AIAssistant from './pages/ai/AIAssistant';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminFaculty from './pages/admin/AdminFaculty';
import AdminDepartments from './pages/admin/AdminDepartments';
import AdminTimetable from './pages/admin/AdminTimetable';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';

// Protected Route Guard
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-surface-950">
        <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to permitted dashboard
    if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'FACULTY') return <Navigate to="/faculty/dashboard" replace />;
    return <Navigate to="/student/dashboard" replace />;
  }

  return children;
};

// Root redirector based on authenticated role
const RootRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
  if (user.role === 'FACULTY') return <Navigate to="/faculty/dashboard" replace />;
  return <Navigate to="/student/dashboard" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<RootRedirect />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ForgotPassword />} />

              {/* Protected Workspace Layout */}
              <Route
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                {/* Universal Forum */}
                <Route path="/forum" element={<StudentForum />} />

                {/* Student Routes */}
                <Route
                  path="/student/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/profile"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/attendance"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentAttendance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/academic/attendance-details"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentAttendance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/academic/student-attendance"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentNewAttendance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/assignments"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentAssignments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/academic/subjects"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentWiseSubjects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/academic/timetable"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentTimetable />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/academic/od-ml"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentODML />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/academic/registration"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentCourseRegistration />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/events"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentEvents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/sap"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentSAP />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/finance"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentFinance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/transport"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentTransport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/feedback"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentFeedback />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/ai-assistant"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'FACULTY', 'ADMIN']}>
                      <AIAssistant />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/ai-assistant"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <AIAssistant />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-assistant"
                  element={
                    <ProtectedRoute>
                      <AIAssistant />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/exams"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentExams />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/hostel"
                  element={
                    <ProtectedRoute allowedRoles={['STUDENT', 'ADMIN']}>
                      <StudentHostel />
                    </ProtectedRoute>
                  }
                />

                {/* Faculty Routes */}
                <Route
                  path="/faculty/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/academic"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyAcademic />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/attendance"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyAttendance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/assignments"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyAssignments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/exams"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyExams />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/marks"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyMarks />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/students"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyStudents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/events"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyEvents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/sap"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultySAP />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/research"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyResearch />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/leaves"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyLeaves />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/feedback"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyFeedback />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/announcements"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyAnnouncements />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/communication"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyCommunication />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/finance"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyFinance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/faculty/profile"
                  element={
                    <ProtectedRoute allowedRoles={['FACULTY', 'ADMIN']}>
                      <FacultyProfile />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/students"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminStudents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/faculty"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminFaculty />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/departments"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminDepartments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/timetable"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminTimetable />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/complaints"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminComplaints />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/announcements"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminAnnouncements />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Fallback 404 */}
              <Route path="*" element={<RootRedirect />} />
            </Routes>
          </BrowserRouter>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

