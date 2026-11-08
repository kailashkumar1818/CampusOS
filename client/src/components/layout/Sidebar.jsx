import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ChevronDown,
  BookOpen,
  Book,
  Calendar,
  CreditCard,
  DollarSign,
  Edit,
  Building2,
  Home,
  Bus,
  FileText,
  ClipboardList,
  User,
  Settings,
  Power,
  Layers,
  MessageSquare,
  Users,
  GraduationCap,
  Bell,
  Award,
  CheckSquare,
  Bot,
  Sparkles,
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const role = user?.role;
  const navigate = useNavigate();
  const location = useLocation();

  // Expanded accordions state for Student Portal
  const [openSections, setOpenSections] = useState({
    academic: true,
    events: false,
    sap: false,
    finance: false,
    examination: false,
    hostel: false,
    transport: false,
    feedback: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Expanded accordions state for Faculty Portal (15 modules)
  const [openFacultySections, setOpenFacultySections] = useState({
    dashboard: false,
    academic: true,
    attendance: false,
    assignment: false,
    examination: false,
    students: false,
    events: false,
    sap: false,
    research: false,
    leaves: false,
    feedback: false,
    announcements: false,
    communication: false,
    finance: false,
    profile: false,
  });

  const toggleFacultySection = (section) => {
    setOpenFacultySections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const studentFullName = `${user?.firstName || 'RAHUL'} ${user?.lastName || 'KUMAR'}`.toUpperCase();

  // 15 Modules Specification for Faculty Portal
  const facultyAccordionModules = [
    {
      id: 'dashboard',
      label: '1. Dashboard',
      icon: Layers,
      color: 'text-slate-100',
      to: '/faculty/dashboard',
      subLinks: [
        { label: 'Overview', to: '/faculty/dashboard' },
        { label: "Today's Schedule", to: '/faculty/dashboard' },
        { label: 'Total Assigned Students', to: '/faculty/dashboard' },
        { label: 'Total Subjects', to: '/faculty/dashboard' },
        { label: 'Pending Assignments', to: '/faculty/dashboard' },
        { label: 'Attendance Summary', to: '/faculty/dashboard' },
        { label: 'Recent Notifications', to: '/faculty/dashboard' },
      ],
    },
    {
      id: 'academic',
      label: '2. Academic',
      icon: BookOpen,
      color: 'text-slate-100',
      to: '/faculty/academic',
      subLinks: [
        { label: 'My Subjects', to: '/faculty/academic' },
        { label: 'My Classes', to: '/faculty/academic' },
        { label: 'Course Materials', to: '/faculty/academic' },
        { label: 'Lecture Notes', to: '/faculty/academic' },
        { label: 'Upload Study Materials', to: '/faculty/academic' },
        { label: 'Academic Calendar', to: '/faculty/academic' },
        { label: 'Lesson Plans', to: '/faculty/academic' },
        { label: 'Class Timetable', to: '/faculty/academic' },
      ],
    },
    {
      id: 'attendance',
      label: '3. Attendance',
      icon: CheckSquare,
      color: 'text-slate-100',
      to: '/faculty/attendance',
      subLinks: [
        { label: 'Mark Attendance', to: '/faculty/attendance' },
        { label: 'View Attendance', to: '/faculty/attendance' },
        { label: 'Attendance History', to: '/faculty/attendance' },
        { label: 'Subject-wise Attendance', to: '/faculty/attendance' },
        { label: 'Student Attendance Reports', to: '/faculty/attendance' },
        { label: 'Low Attendance Students', to: '/faculty/attendance' },
        { label: 'Attendance Correction Requests', to: '/faculty/attendance' },
      ],
    },
    {
      id: 'assignment',
      label: '4. Assignment',
      icon: FileText,
      color: 'text-slate-100',
      to: '/faculty/assignments',
      subLinks: [
        { label: 'Create Assignment', to: '/faculty/assignments' },
        { label: 'Manage Assignments', to: '/faculty/assignments' },
        { label: 'View Submissions', to: '/faculty/assignments' },
        { label: 'Evaluate Assignments', to: '/faculty/assignments' },
        { label: 'Upload Marks', to: '/faculty/assignments' },
        { label: 'Provide Feedback', to: '/faculty/assignments' },
        { label: 'Pending Evaluations', to: '/faculty/assignments' },
        { label: 'Assignment Deadlines', to: '/faculty/assignments' },
      ],
    },
    {
      id: 'examination',
      label: '5. Examination',
      icon: Edit,
      color: 'text-slate-100',
      to: '/faculty/exams',
      subLinks: [
        { label: 'Examination Schedule', to: '/faculty/exams' },
        { label: 'Create Question Papers', to: '/faculty/exams' },
        { label: 'Upload Question Papers', to: '/faculty/exams' },
        { label: 'Internal Assessment', to: '/faculty/exams' },
        { label: 'Enter Student Marks', to: '/faculty/exams' },
        { label: 'Evaluate Answer Sheets', to: '/faculty/exams' },
        { label: 'Publish Results', to: '/faculty/exams' },
        { label: 'Result Analysis', to: '/faculty/exams' },
      ],
    },
    {
      id: 'students',
      label: '6. Student Management',
      icon: Users,
      color: 'text-slate-100',
      to: '/faculty/students',
      subLinks: [
        { label: 'My Students', to: '/faculty/students' },
        { label: 'Student Profiles', to: '/faculty/students' },
        { label: 'Student Academic Records', to: '/faculty/students' },
        { label: 'Student Performance', to: '/faculty/students' },
        { label: 'Identify Weak Students', to: '/faculty/students' },
        { label: 'Student Attendance Reports', to: '/faculty/students' },
        { label: 'Student Queries', to: '/faculty/students' },
      ],
    },
    {
      id: 'events',
      label: '7. Events',
      icon: Calendar,
      color: 'text-slate-100',
      to: '/faculty/events',
      subLinks: [
        { label: 'Upcoming Events', to: '/faculty/events' },
        { label: 'University Events', to: '/faculty/events' },
        { label: 'Department Events', to: '/faculty/events' },
        { label: 'Create Event Requests', to: '/faculty/events' },
        { label: 'Event Participation', to: '/faculty/events' },
        { label: 'Event Calendar', to: '/faculty/events' },
      ],
    },
    {
      id: 'sap',
      label: '8. SAP / Academic Records',
      icon: CreditCard,
      color: 'text-slate-100',
      to: '/faculty/sap',
      subLinks: [
        { label: 'Student Academic Records', to: '/faculty/sap' },
        { label: 'Course Registration', to: '/faculty/sap' },
        { label: 'Subject Allocation', to: '/faculty/sap' },
        { label: 'Academic Progress', to: '/faculty/sap' },
        { label: 'Semester Records', to: '/faculty/sap' },
        { label: 'Grade Management', to: '/faculty/sap' },
      ],
    },
    {
      id: 'research',
      label: '9. Research & Projects',
      icon: BookOpen,
      color: 'text-slate-100',
      to: '/faculty/research',
      subLinks: [
        { label: 'Research Projects', to: '/faculty/research' },
        { label: 'Student Project Groups', to: '/faculty/research' },
        { label: 'Project Evaluation', to: '/faculty/research' },
        { label: 'Research Publications', to: '/faculty/research' },
        { label: 'Project Progress Tracking', to: '/faculty/research' },
        { label: 'Internship Supervision', to: '/faculty/research' },
      ],
    },
    {
      id: 'leaves',
      label: '10. Leave Management',
      icon: Calendar,
      color: 'text-slate-100',
      to: '/faculty/leaves',
      subLinks: [
        { label: 'Apply for Leave', to: '/faculty/leaves' },
        { label: 'Leave History', to: '/faculty/leaves' },
        { label: 'Leave Balance', to: '/faculty/leaves' },
        { label: 'Leave Approval Status', to: '/faculty/leaves' },
        { label: 'Faculty Attendance', to: '/faculty/leaves' },
      ],
    },
    {
      id: 'feedback',
      label: '11. Feedback',
      icon: MessageSquare,
      color: 'text-slate-100',
      to: '/faculty/feedback',
      subLinks: [
        { label: 'Student Feedback', to: '/faculty/feedback' },
        { label: 'Course Feedback', to: '/faculty/feedback' },
        { label: 'Faculty Performance', to: '/faculty/feedback' },
        { label: 'View Feedback Reports', to: '/faculty/feedback' },
      ],
    },
    {
      id: 'announcements',
      label: '12. Announcements',
      icon: Bell,
      color: 'text-slate-100',
      to: '/faculty/announcements',
      subLinks: [
        { label: 'Create Announcements', to: '/faculty/announcements' },
        { label: 'Department Announcements', to: '/faculty/announcements' },
        { label: 'Class Announcements', to: '/faculty/announcements' },
        { label: 'Important Notifications', to: '/faculty/announcements' },
        { label: 'Announcement History', to: '/faculty/announcements' },
      ],
    },
    {
      id: 'communication',
      label: '13. Communication',
      icon: MessageSquare,
      color: 'text-slate-100',
      to: '/faculty/communication',
      subLinks: [
        { label: 'Student Messages', to: '/faculty/communication' },
        { label: 'Faculty Discussion Forum', to: '/forum' },
        { label: 'Department Communication', to: '/faculty/communication' },
        { label: 'Admin Messages', to: '/faculty/communication' },
      ],
    },
    {
      id: 'finance',
      label: '14. Finance',
      icon: DollarSign,
      color: 'text-slate-100',
      to: '/faculty/finance',
      subLinks: [
        { label: 'Faculty Salary Details', to: '/faculty/finance' },
        { label: 'Salary Slips', to: '/faculty/finance' },
        { label: 'Payment History', to: '/faculty/finance' },
        { label: 'Reimbursement Requests', to: '/faculty/finance' },
      ],
    },
    {
      id: 'profile',
      label: '15. Profile & Settings',
      icon: User,
      color: 'text-slate-100',
      to: '/faculty/profile',
      subLinks: [
        { label: 'My Profile', to: '/faculty/profile' },
        { label: 'Change Password', to: '/faculty/profile' },
        { label: 'Account Settings', to: '/faculty/profile' },
        { label: 'Notification Preferences', to: '/faculty/profile' },
        { label: 'Logout', action: 'logout' },
      ],
    },
  ];

  const adminLinks = [
    { label: 'Analytics Dashboard', to: '/admin/dashboard', icon: Layers },
    { label: 'Students Directory', to: '/admin/students', icon: GraduationCap },
    { label: 'Faculty Management', to: '/admin/faculty', icon: Users },
    { label: 'Departments & Courses', to: '/admin/departments', icon: Layers },
    { label: 'Timetable Scheduling', to: '/admin/timetable', icon: Calendar },
    { label: 'Hostel Grievances', to: '/admin/complaints', icon: Home },
    { label: 'Announcements', to: '/admin/announcements', icon: Bell },
    { label: 'Campus Forum', to: '/forum', icon: MessageSquare },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-[#233848] text-slate-200 border-r border-[#1b2b38] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* PORTAL HEADER (Matching Institutional ERP) */}
        {role === 'STUDENT' ? (
          <div className="p-4 bg-[#1e2f3d] border-b border-[#172531] flex items-center gap-3">
            <div className="relative">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt="Student"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white/90 shadow-md"
              />
            </div>
            <div className="overflow-hidden">
              <span className="text-[11px] text-slate-400 font-medium block">Welcome,</span>
              <h2 className="text-xs font-black text-white tracking-wide truncate">
                {studentFullName}
              </h2>
              <span className="text-[10px] text-emerald-400 font-mono block">
                {user?.studentProfile?.enrollmentNo || 'EN2024CS042'}
              </span>
            </div>
          </div>
        ) : role === 'FACULTY' ? (
          <div className="p-4 bg-[#1e2f3d] border-b border-[#172531] flex items-center gap-3">
            <div className="relative">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt="Faculty"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-400 shadow-md"
              />
            </div>
            <div className="overflow-hidden">
              <span className="text-[11px] text-slate-400 font-medium block">Welcome,</span>
              <h2 className="text-xs font-black text-white tracking-wide truncate">
                {user?.firstName ? `DR. ${user.firstName} ${user.lastName}`.toUpperCase() : 'DR. ROBERT JOHNSON'}
              </h2>
              <span className="text-[10px] text-cyan-400 font-mono block">
                {user?.facultyProfile?.employeeId || 'FAC-CSE-101'} • Dept of CSE
              </span>
            </div>
          </div>
        ) : (
          <div className="h-16 px-6 flex items-center gap-3 bg-[#1e2f3d] border-b border-[#172531]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-700 to-rose-900 flex items-center justify-center text-white font-bold shadow-md">
              C
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                CampusOS <span className="text-[9px] px-1 bg-brand-900 text-brand-300 rounded font-mono">PRO</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">{role} Workspace</p>
            </div>
          </div>
        )}

        {/* NAVIGATION LIST WITH ACCORDIONS */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 select-none text-xs">
          {role === 'STUDENT' ? (
            <>
              {/* Profile Link */}
              <NavLink
                to="/student/profile"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive ? 'bg-[#2d475c] text-white font-bold' : 'text-slate-200 hover:bg-[#1d2f3d] hover:text-white'
                  }`
                }
              >
                <User className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.2} />
                <span className="font-semibold text-xs text-white">Student Profile Specification</span>
              </NavLink>

              {/* Overview / Dashboard */}
              <NavLink
                to="/student/dashboard"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive ? 'bg-[#2d475c] text-white font-bold' : 'text-slate-200 hover:bg-[#1d2f3d] hover:text-white'
                  }`
                }
              >
                <Layers className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.2} />
                <span className="font-semibold text-xs text-white">Overview Dashboard</span>
              </NavLink>

              {/* AI Academic Mentor Link */}
              <NavLink
                to="/student/ai-assistant"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-md transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-900/60 to-[#2d475c] text-white font-bold border-l-2 border-cyan-400'
                      : 'text-cyan-200 hover:bg-[#1d2f3d] hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5 text-cyan-300 shrink-0" strokeWidth={2.2} />
                  <span className="font-bold text-xs">AI Academic Mentor</span>
                </div>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-cyan-400 text-slate-950 uppercase tracking-wider">
                  AI
                </span>
              </NavLink>

              {/* 1. ACADEMIC ACCORDION (Matching Image 1 & 2) */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('academic')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-[#1d2f3d] text-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Book className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.2} />
                    <span className="font-bold text-xs tracking-wide text-white">Academic</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${
                      openSections.academic ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openSections.academic && (
                  <div className="relative pl-6 pr-2 py-1 space-y-1">
                    {/* Vertical Connecting Tree Line */}
                    <div className="absolute left-6 top-1 bottom-2 w-px bg-slate-500/50" />

                    <NavLink
                      to="/student/academic/subjects"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] transition-colors ${
                          isActive ? 'text-white font-bold bg-[#2d475c]' : 'text-slate-300 hover:text-white hover:bg-[#1d2f3d]'
                        }`
                      }
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>Student Wise Subjects</span>
                    </NavLink>

                    <NavLink
                      to="/student/academic/timetable"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] transition-colors ${
                          isActive ? 'text-white font-bold bg-[#2d475c]' : 'text-slate-300 hover:text-white hover:bg-[#1d2f3d]'
                        }`
                      }
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>Time Table</span>
                    </NavLink>

                    <NavLink
                      to="/student/academic/attendance-details"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] transition-colors ${
                          isActive ? 'text-white font-bold bg-[#2d475c]' : 'text-slate-300 hover:text-white hover:bg-[#1d2f3d]'
                        }`
                      }
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>Attendance Details</span>
                    </NavLink>

                    <NavLink
                      to="/student/academic/od-ml"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] transition-colors ${
                          isActive ? 'text-white font-bold bg-[#2d475c]' : 'text-slate-300 hover:text-white hover:bg-[#1d2f3d]'
                        }`
                      }
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>OD/ML Details</span>
                    </NavLink>

                    <NavLink
                      to="/student/academic/student-attendance"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-1.5 rounded relative text-[11px] transition-colors ${
                          isActive ? 'text-white font-bold bg-[#2d475c]' : 'text-slate-300 hover:text-white hover:bg-[#1d2f3d]'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                        <span>Student Attendance</span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-500 text-slate-900">
                        New
                      </span>
                    </NavLink>

                    <NavLink
                      to="/student/academic/registration"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] transition-colors ${
                          isActive ? 'text-white font-bold bg-[#2d475c]' : 'text-slate-300 hover:text-white hover:bg-[#1d2f3d]'
                        }`
                      }
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>Course Registration</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* 2. EVENTS ACCORDION */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('events')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-[#1d2f3d] text-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.2} />
                    <span className="font-bold text-xs tracking-wide text-white">Events</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${
                      openSections.events ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openSections.events && (
                  <div className="relative pl-6 pr-2 py-1 space-y-1">
                    <div className="absolute left-6 top-1 bottom-2 w-px bg-slate-500/50" />
                    {['Event Registration', 'My Registered Events', 'Certificate Download'].map((label) => (
                      <NavLink
                        key={label}
                        to="/student/events"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] transition-colors ${
                            isActive ? 'text-white font-bold bg-[#2d475c]' : 'text-slate-300 hover:text-white hover:bg-[#1d2f3d]'
                          }`
                        }
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                        <span>{label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. SAP ACCORDION (Matching Image 3) */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('sap')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-[#1d2f3d] text-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-1.5 py-0.5 bg-[#dbe4ec] text-[#1a2d3c] font-black italic tracking-tighter text-[9px] rounded-xs font-sans leading-none shadow-xs border border-white/60">
                      VISA
                    </span>
                    <span className="font-bold text-xs tracking-wide text-white">SAP</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${
                      openSections.sap ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openSections.sap && (
                  <div className="relative pl-6 pr-2 py-1 space-y-1">
                    <div className="absolute left-6 top-1 bottom-2 w-px bg-slate-500/50" />
                    {['SAP Process', 'Withdraw', 'Details', 'Attachments', 'Feedback'].map((label) => (
                      <NavLink
                        key={label}
                        to="/student/sap"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                        <span>{label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. FINANCE ACCORDION (Matching Image 4) */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('finance')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-[#1d2f3d] text-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.4} />
                    <span className="font-bold text-xs tracking-wide text-white">Finance</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${
                      openSections.finance ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openSections.finance && (
                  <div className="relative pl-6 pr-2 py-1 space-y-1">
                    <div className="absolute left-6 top-1 bottom-2 w-px bg-slate-500/50" />
                    <NavLink
                      to="/student/finance"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>₹ Fee Paid Details</span>
                    </NavLink>
                    <NavLink
                      to="/student/finance"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>$ Fee Due Details</span>
                    </NavLink>
                    <NavLink
                      to="/student/finance"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>$ Online Payment Verification</span>
                    </NavLink>
                    <NavLink
                      to="/student/finance"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>$ Payment Acknowledgment</span>
                    </NavLink>
                    <NavLink
                      to="/student/finance"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>📄 Bank Account Details</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* 5. EXAMINATION ACCORDION (Matching Image 5) */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('examination')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-[#1d2f3d] text-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Edit className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.2} />
                    <span className="font-bold text-xs tracking-wide text-white">Examination</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${
                      openSections.examination ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openSections.examination && (
                  <div className="relative pl-6 pr-2 py-1 space-y-1">
                    <div className="absolute left-6 top-1 bottom-2 w-px bg-slate-500/50" />
                    <NavLink
                      to="/student/exams"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>Internal Mark Details</span>
                    </NavLink>
                    <NavLink
                      to="/student/exams"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>Earlier Internal Marks</span>
                    </NavLink>
                    <NavLink
                      to="/student/exams"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>Current Semester Results</span>
                    </NavLink>
                    <NavLink
                      to="/student/exams"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>Exam Mark Details</span>
                    </NavLink>
                    <NavLink
                      to="/student/exams"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>Exam Registration</span>
                    </NavLink>
                    <NavLink
                      to="/student/exams"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>Degree Photo Upload</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* 6. HOSTEL ACCORDION */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('hostel')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-[#1d2f3d] text-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.2} />
                    <span className="font-bold text-xs tracking-wide text-white">Hostel</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${
                      openSections.hostel ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openSections.hostel && (
                  <div className="relative pl-6 pr-2 py-1 space-y-1">
                    <div className="absolute left-6 top-1 bottom-2 w-px bg-slate-500/50" />
                    <NavLink
                      to="/student/hostel"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>Room Details & Grievance</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* 7. TRANSPORT ACCORDION */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('transport')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-[#1d2f3d] text-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Bus className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.2} />
                    <span className="font-bold text-xs tracking-wide text-white">Transport</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${
                      openSections.transport ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openSections.transport && (
                  <div className="relative pl-6 pr-2 py-1 space-y-1">
                    <div className="absolute left-6 top-1 bottom-2 w-px bg-slate-500/50" />
                    <NavLink
                      to="/student/transport"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>Bus Route Details & Pass</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* 8. FEEDBACK ACCORDION */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('feedback')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-[#1d2f3d] text-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ClipboardList className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.2} />
                    <span className="font-bold text-xs tracking-wide text-white">Feedback</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${
                      openSections.feedback ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openSections.feedback && (
                  <div className="relative pl-6 pr-2 py-1 space-y-1">
                    <div className="absolute left-6 top-1 bottom-2 w-px bg-slate-500/50" />
                    <NavLink
                      to="/student/feedback"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-slate-300 hover:text-white hover:bg-[#1d2f3d]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                      <span>Faculty & Course Evaluation</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Forum & Coursework Direct Links */}
              <div className="pt-2 border-t border-[#1b2b38] mt-2 space-y-1">
                <NavLink
                  to="/student/assignments"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-200 hover:bg-[#1d2f3d] hover:text-white"
                >
                  <Book className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.2} />
                  <span className="font-semibold text-xs">Assignments & Submissions</span>
                </NavLink>

                <NavLink
                  to="/forum"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-200 hover:bg-[#1d2f3d] hover:text-white"
                >
                  <MessageSquare className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.2} />
                  <span className="font-semibold text-xs">Campus Discussion Forum</span>
                </NavLink>
              </div>
            </>
          ) : role === 'FACULTY' ? (
            // 15 MODULES FACULTY WORKSPACE ACCORDIONS
            <>
              {/* Faculty AI Copilot NavLink */}
              <div className="mb-2">
                <NavLink
                  to="/faculty/ai-assistant"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-md transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-900/60 to-[#2d475c] text-white font-bold border-l-2 border-cyan-400'
                        : 'text-cyan-200 hover:bg-[#1d2f3d] hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-cyan-300 shrink-0" strokeWidth={2.2} />
                    <span className="font-bold text-xs">AI Research & Teaching Copilot</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-cyan-400 text-slate-950 uppercase tracking-wider">
                    AI
                  </span>
                </NavLink>
              </div>

              {facultyAccordionModules.map((mod) => {
                const Icon = mod.icon;
                const isSectionOpen = !!openFacultySections[mod.id];
                const isPathActive = location.pathname === mod.to;

                return (
                  <div key={mod.id} className="mb-0.5">
                    <div className="flex items-center justify-between rounded-md hover:bg-[#1d2f3d] text-slate-200 transition-colors">
                      <NavLink
                        to={mod.to}
                        onClick={() => setIsOpen(false)}
                        className={`flex-1 flex items-center gap-3 px-3 py-2.5 transition-colors ${
                          isPathActive ? 'text-white font-bold bg-[#2d475c]' : 'text-slate-100'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.2} />
                        <span className="font-bold text-xs tracking-wide">{mod.label}</span>
                      </NavLink>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFacultySection(mod.id);
                        }}
                        className="px-2.5 py-2.5 text-slate-300 hover:text-white"
                        title="Toggle section"
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isSectionOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {isSectionOpen && mod.subLinks && (
                      <div className="relative pl-6 pr-2 py-1 space-y-1">
                        {/* Vertical Connecting Tree Line */}
                        <div className="absolute left-6 top-1 bottom-2 w-px bg-slate-500/50" />

                        {mod.subLinks.map((sub, idx) => {
                          if (sub.action === 'logout') {
                            return (
                              <button
                                key={idx}
                                onClick={logout}
                                className="w-full text-left flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] text-rose-300 hover:text-rose-200 hover:bg-[#1d2f3d] transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 -ml-[19px] mr-2"></span>
                                <span>{sub.label}</span>
                              </button>
                            );
                          }

                          return (
                            <NavLink
                              key={idx}
                              to={sub.to}
                              onClick={() => setIsOpen(false)}
                              className={({ isActive }) =>
                                `flex items-center gap-2.5 px-3 py-1.5 rounded relative text-[11px] transition-colors ${
                                  isActive && location.pathname === sub.to
                                    ? 'text-white font-bold bg-[#2d475c]'
                                    : 'text-slate-300 hover:text-white hover:bg-[#1d2f3d]'
                                }`
                              }
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 -ml-[19px] mr-2"></span>
                              <span>{sub.label}</span>
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Universal Campus Forum Link */}
              <div className="pt-2 border-t border-[#1b2b38] mt-2">
                <NavLink
                  to="/forum"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-200 hover:bg-[#1d2f3d] hover:text-white"
                >
                  <MessageSquare className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.2} />
                  <span className="font-semibold text-xs">Faculty Discussion Forum</span>
                </NavLink>
              </div>
            </>
          ) : (
            // ADMIN STANDARD NAVIGATION
            adminLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive ? 'bg-[#2d475c] text-white font-bold' : 'text-slate-200 hover:bg-[#1d2f3d] hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 text-slate-100 shrink-0" strokeWidth={2.2} />
                  <span>{link.label}</span>
                </NavLink>
              );
            })
          )}
        </div>

        {/* BOTTOM UTILITY BAR (Matching Image 1: Profile, Settings, Power Logout) */}
        <div className="h-12 bg-[#1a2834] border-t border-[#172531] flex items-center justify-around px-4">
          <button
            onClick={() => navigate(role === 'FACULTY' ? '/faculty/profile' : role === 'ADMIN' ? '/admin/dashboard' : '/student/profile')}
            title={role === 'FACULTY' ? 'Faculty Profile' : 'Student Profile'}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-[#1d2f3d] rounded transition-colors"
          >
            <User className="w-4 h-4 text-slate-200" strokeWidth={2.2} />
          </button>
          <button
            onClick={() => navigate(role === 'FACULTY' ? '/faculty/profile' : role === 'ADMIN' ? '/admin/dashboard' : '/student/profile')}
            title="Account Settings"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-[#1d2f3d] rounded transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-200" strokeWidth={2.2} />
          </button>
          <button
            onClick={logout}
            title="Log Out"
            className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-[#1d2f3d] rounded transition-colors"
          >
            <Power className="w-4 h-4 text-slate-200" strokeWidth={2.2} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
