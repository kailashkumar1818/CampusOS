import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Skeleton from '../../components/common/Skeleton';
import {
  CheckSquare,
  BookOpen,
  Calendar,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  FileText,
  UserCheck,
  Building,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [attRes, ttRes, assRes, annRes] = await Promise.all([
          api.get('/attendance/analytics').catch(() => ({ data: null })),
          api.get('/timetable').catch(() => ({ data: [] })),
          api.get('/assignments').catch(() => ({ data: [] })),
          api.get('/announcements?limit=4').catch(() => ({ data: [] })),
        ]);

        setAttendance(attRes.data);
        setTimetable(ttRes.data || []);
        setAssignments(assRes.data || []);
        setAnnouncements(annRes.data || []);
      } catch (err) {
        console.error('Student dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-28 w-full rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
        </div>
      </div>
    );
  }

  const overallAtt = attendance?.overallPercentage || 84.2;
  const isShortage = overallAtt < 75;
  const pendingAssignments = assignments.filter((a) => !a.isSubmitted);

  // Today's classes matching Image 2 & 5 (Thursday schedule)
  const todayClasses = [
    { hour: 1, time: '09:00 - 09:50', code: 'CSE 302', name: 'OPERATING SYSTEMS', room: 'C 903', faculty: 'Dr. Yandrapi Prakash Babu', status: 'P' },
    { hour: 2, time: '10:00 - 10:50', code: 'CSE 302', name: 'OPERATING SYSTEMS', room: 'C 903', faculty: 'Dr. Yandrapi Prakash Babu', status: 'P' },
    { hour: 5, time: '01:00 - 01:50', code: 'SEC 303', name: 'DEVOPS - RHCSA', room: 'C 903', faculty: 'Mr. ISES00009', status: 'P' },
    { hour: 6, time: '02:00 - 02:50', code: 'SEC 303', name: 'DEVOPS - RHCSA', room: 'C 903', faculty: 'Mr. ISES00009', status: 'P' },
    { hour: 7, time: '03:00 - 03:50', code: 'CSE 303', name: 'MACHINE LEARNING', room: 'C 903', faculty: 'Dr. Boddu L V Siva Rama Krishna', status: 'P' },
    { hour: 8, time: '04:00 - 05:30', code: 'CSE 309', name: 'ADVANCED JAVA PROGRAMMING', room: 'C 903', faculty: 'Dr. Koyel Mandal', status: 'P' },
  ];

  // Subjects overview matching Image 1 & 3
  const registeredSubjects = [
    { code: 'CSE 302', name: 'OPERATING SYSTEMS', credits: 4, conducted: 54, present: 44, absent: 10, att: 81.48 },
    { code: 'CSE 303', name: 'MACHINE LEARNING', credits: 4, conducted: 53, present: 42, absent: 11, att: 79.25 },
    { code: 'CSE 305', name: 'COMPUTER ORGANIZATION AND ARCHITECTURE', credits: 4, conducted: 56, present: 47, absent: 7, att: 86.93 },
    { code: 'CSE 309', name: 'ADVANCED JAVA PROGRAMMING', credits: 4, conducted: 51, present: 48, absent: 3, att: 94.12 },
    { code: 'EGL 256', name: 'DECODING LANGUAGE', credits: 3, conducted: 23, present: 19, absent: 4, att: 82.61 },
    { code: 'SEC 303', name: 'DEVOPS - RHCSA', credits: 2, conducted: 46, present: 36, absent: 10, att: 78.26 },
  ];

  return (
    <div className="space-y-4 max-w-full font-sans">
      {/* 1. INSTITUTIONAL STUDENT SPECIFICATION HEADER BANNER */}
      <div className="bg-[#1f3a52] text-white rounded-lg p-4 sm:p-5 shadow-xs border border-[#162a3c]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2ba2c5] text-white uppercase tracking-wider">
                Active Student
              </span>
              <span className="text-slate-300 text-xs font-mono">
                AY 2026-2027 • Semester 5
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              RAHUL KUMAR
              <span className="text-xs font-normal text-slate-300 font-mono">
                (EN2024CS042)
              </span>
            </h1>
            <p className="text-xs text-slate-300 font-medium">
              B.Tech • Computer Science and Engineering | Section: <span className="font-semibold text-white">CSE-3A</span> | Mentor: <span className="text-white">Dr. Robert Johnson</span>
            </p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/student/academic/subjects"
              className="px-3 py-1.5 rounded text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              My Subjects
            </Link>
            <Link
              to="/student/academic/timetable"
              className="px-3 py-1.5 rounded text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              Time Table
            </Link>
            <Link
              to="/student/academic/attendance-details"
              className="px-3 py-1.5 rounded text-xs font-bold bg-[#2ba2c5] hover:bg-[#218aa9] text-white shadow-xs transition-colors"
            >
              Attendance Details
            </Link>
          </div>
        </div>
      </div>

      {/* 2. STATISTIC METRIC TILES (Compact & Clear on PC) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Attendance */}
        <div className="bg-white dark:bg-surface-900 rounded-lg p-3.5 border border-slate-200 dark:border-surface-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Overall Attendance</span>
            <CheckSquare className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{overallAtt}%</span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
              Eligible (≥75%)
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-surface-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.min(overallAtt, 100)}%` }} />
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 font-mono">
            208 / 247 Slots Present
          </p>
        </div>

        {/* Registered Courses */}
        <div className="bg-white dark:bg-surface-900 rounded-lg p-3.5 border border-slate-200 dark:border-surface-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Enrolled Courses</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">8 Subjects</span>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              23 Credits
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3">
            Odd Semester 2026-2027 Registered
          </p>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white dark:bg-surface-900 rounded-lg p-3.5 border border-slate-200 dark:border-surface-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Today's Schedule</span>
            <Calendar className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#1f3a52] dark:text-cyan-400">Thursday</span>
            <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-50 dark:bg-cyan-950/40 px-1.5 py-0.5 rounded">
              Day Order 4
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 font-medium">
            6 Lecture Slots (09:00 - 17:30)
          </p>
        </div>

        {/* Pending Assignments */}
        <div className="bg-white dark:bg-surface-900 rounded-lg p-3.5 border border-slate-200 dark:border-surface-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Submissions</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {pendingAssignments.length}
            </span>
            <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded">
              Due this week
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3">
            OS Lab 4 & ML Quiz 2
          </p>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE GRID: TODAY'S TIMETABLE & SUBJECT ATTENDANCE */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Left Column (7 cols): Today's Class Matrix */}
        <div className="xl:col-span-7 bg-white dark:bg-surface-900 rounded-lg border border-slate-200 dark:border-surface-800 shadow-xs overflow-hidden">
          <div className="bg-[#1f3a52] text-white px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-300" />
              <h2 className="text-xs font-bold uppercase tracking-wider">
                Today's Lectures & Attendance Status (Thursday)
              </h2>
            </div>
            <Link
              to="/student/academic/timetable"
              className="text-[11px] text-cyan-300 hover:text-white font-medium flex items-center gap-1"
            >
              Full Timetable <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-surface-800/60 border-b border-slate-200 dark:border-surface-700 text-slate-600 dark:text-slate-300 font-bold text-[11px]">
                  <th className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 w-12 text-center">Slot</th>
                  <th className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 w-28">Timing</th>
                  <th className="py-2 px-3 border-r border-slate-200 dark:border-surface-700">Course & Room</th>
                  <th className="py-2 px-3 border-r border-slate-200 dark:border-surface-700">Faculty</th>
                  <th className="py-2 px-3 text-center w-16">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-surface-800 text-[11px]">
                {todayClasses.map((item, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 text-center font-bold text-slate-700 dark:text-slate-300">
                      {item.hour}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 font-mono text-slate-600 dark:text-slate-400 text-[10px]">
                      {item.time}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 dark:border-surface-700">
                      <span className="font-bold text-[#1f3a52] dark:text-sky-300">{item.code}</span> - {item.name}{' '}
                      <span className="font-semibold text-slate-500 font-mono text-[10px]">({item.room})</span>
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 text-slate-600 dark:text-slate-300 truncate max-w-[150px]">
                      {item.faculty}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (5 cols): Subject Attendance Summary */}
        <div className="xl:col-span-5 bg-white dark:bg-surface-900 rounded-lg border border-slate-200 dark:border-surface-800 shadow-xs overflow-hidden">
          <div className="bg-[#1f3a52] text-white px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider">
                Subject-Wise Attendance Summary
              </h2>
            </div>
            <Link
              to="/student/academic/attendance-details"
              className="text-[11px] text-cyan-300 hover:text-white font-medium flex items-center gap-1"
            >
              Full Details <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-surface-800/60 border-b border-slate-200 dark:border-surface-700 text-slate-600 dark:text-slate-300 font-bold text-[11px]">
                  <th className="py-2 px-3 border-r border-slate-200 dark:border-surface-700">Course</th>
                  <th className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 text-center w-16">P / Total</th>
                  <th className="py-2 px-3 text-center w-20">Att. %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-surface-800 text-[11px]">
                {registeredSubjects.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2 px-3 border-r border-slate-200 dark:border-surface-700">
                      <span className="font-bold text-[#1f3a52] dark:text-sky-300">{sub.code}</span>
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] truncate max-w-[180px]">
                        {sub.name}
                      </span>
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 text-center font-mono">
                      {sub.present}/{sub.conducted}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span
                        className={`font-black ${
                          sub.att < 75
                            ? 'text-rose-600 dark:text-rose-400'
                            : sub.att < 80
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {sub.att}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. FAST ACCESSIBLE ACADEMIC MODULE SHORTCUTS (Matching User ERP Workflow) */}
      <div className="bg-white dark:bg-surface-900 rounded-lg border border-slate-200 dark:border-surface-800 p-4 shadow-xs">
        <h3 className="text-xs font-bold text-[#1f3a52] dark:text-sky-300 uppercase tracking-wider mb-3">
          Academic Portal Quick Access
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            to="/student/academic/subjects"
            className="p-3 rounded-lg border border-slate-200 dark:border-surface-700 hover:border-cyan-500 hover:bg-sky-50/50 dark:hover:bg-surface-800 transition-all text-center group"
          >
            <BookOpen className="w-5 h-5 mx-auto text-cyan-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-2">
              Wise Subjects
            </span>
            <span className="text-[10px] text-slate-400 block">Semester 5 list</span>
          </Link>

          <Link
            to="/student/academic/timetable"
            className="p-3 rounded-lg border border-slate-200 dark:border-surface-700 hover:border-cyan-500 hover:bg-sky-50/50 dark:hover:bg-surface-800 transition-all text-center group"
          >
            <Calendar className="w-5 h-5 mx-auto text-indigo-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-2">
              Time Table
            </span>
            <span className="text-[10px] text-slate-400 block">8 slot schedule</span>
          </Link>

          <Link
            to="/student/academic/attendance-details"
            className="p-3 rounded-lg border border-slate-200 dark:border-surface-700 hover:border-cyan-500 hover:bg-sky-50/50 dark:hover:bg-surface-800 transition-all text-center group"
          >
            <CheckSquare className="w-5 h-5 mx-auto text-emerald-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-2">
              Attendance
            </span>
            <span className="text-[10px] text-slate-400 block">Slot calculations</span>
          </Link>

          <Link
            to="/student/academic/od-ml"
            className="p-3 rounded-lg border border-slate-200 dark:border-surface-700 hover:border-cyan-500 hover:bg-sky-50/50 dark:hover:bg-surface-800 transition-all text-center group"
          >
            <Award className="w-5 h-5 mx-auto text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-2">
              OD / ML Details
            </span>
            <span className="text-[10px] text-slate-400 block">Approved duties</span>
          </Link>

          <Link
            to="/student/academic/student-attendance"
            className="p-3 rounded-lg border border-slate-200 dark:border-surface-700 hover:border-cyan-500 hover:bg-sky-50/50 dark:hover:bg-surface-800 transition-all text-center group"
          >
            <UserCheck className="w-5 h-5 mx-auto text-cyan-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-2">
              Mark Attendance
            </span>
            <span className="text-[10px] text-cyan-600 font-bold block">Online code</span>
          </Link>

          <Link
            to="/student/academic/registration"
            className="p-3 rounded-lg border border-slate-200 dark:border-surface-700 hover:border-cyan-500 hover:bg-sky-50/50 dark:hover:bg-surface-800 transition-all text-center group"
          >
            <FileText className="w-5 h-5 mx-auto text-violet-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-2">
              Registration
            </span>
            <span className="text-[10px] text-slate-400 block">Course allotment</span>
          </Link>
        </div>
      </div>

      {/* 5. CAMPUSOS AI ACADEMIC ASSISTANT CALLOUT */}
      <div className="bg-gradient-to-r from-[#1f3a52] via-[#244663] to-[#162a3c] rounded-lg p-4 text-white border border-cyan-500/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
            <Sparkles className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              Have doubts in OS, ML, Java, or Exam Preparation?
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-black bg-cyan-400 text-slate-900">
                AI ACTIVE
              </span>
            </h4>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Ask your 24/7 Academic Mentor powered by Google Gemini. Instant conceptual explanations and coding help.
            </p>
          </div>
        </div>

        <Link
          to="/student/ai-assistant"
          className="px-3.5 py-2 rounded-lg bg-[#2ba2c5] hover:bg-[#218aa9] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0"
        >
          <span>Open AI Mentor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
