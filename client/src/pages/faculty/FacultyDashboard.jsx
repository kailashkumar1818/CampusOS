import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  BookOpen,
  CheckSquare,
  Users,
  Award,
  ArrowRight,
  Plus,
  Clock,
  Calendar,
  Bell,
  FileText,
  DollarSign,
  Briefcase,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await api.get('/analytics/faculty').catch(() => ({ data: {} }));
        setMetrics(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const todaySchedule = [
    { period: 1, time: '09:00 - 09:50 AM', code: 'CSE 302', name: 'OPERATING SYSTEMS', sec: 'Section A', hall: 'Hall C-903', status: 'COMPLETED' },
    { period: 2, time: '10:00 - 10:50 AM', code: 'CSE 302', name: 'OPERATING SYSTEMS', sec: 'Section A', hall: 'Hall C-903', status: 'COMPLETED' },
    { period: 5, time: '01:00 - 01:50 PM', code: 'CSE 302', name: 'OPERATING SYSTEMS (LAB)', sec: 'Section A', hall: 'Lab V-604', status: 'UPCOMING' },
    { period: 6, time: '02:00 - 02:50 PM', code: 'CSE 302', name: 'OPERATING SYSTEMS (LAB)', sec: 'Section A', hall: 'Lab V-604', status: 'UPCOMING' },
  ];

  const recentNotifications = [
    { id: 1, title: 'Model Examination Question Paper sets deadline: 10-Nov-2026', type: 'COE Directive', date: 'Today' },
    { id: 2, title: 'Rahul Kumar (EN2024CS042) submitted Assignment 3: CPU Scheduling', type: 'Student Submission', date: '1 hour ago' },
    { id: 3, title: 'Department Faculty Meeting scheduled for Friday 03:30 PM in HoD Chamber', type: 'Department', date: 'Yesterday' },
  ];

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
            FACULTY EXECUTIVE DASHBOARD
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Welcome, <strong>Dr. {user?.firstName || 'Robert'} {user?.lastName || 'Johnson'}</strong> • {user?.facultyProfile?.designation || 'Professor'} ({user?.facultyProfile?.employeeId || 'FAC-CSE-101'})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/faculty/attendance"
            className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
          >
            Mark Attendance
          </Link>
          <Link
            to="/faculty/assignments"
            className="px-3 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-bold shadow-sm"
          >
            Create Assignment
          </Link>
        </div>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Academic Session 2026-2027 • Department of Computer Science & Engineering • Odd Semester
        </p>
      </div>

      {/* 3. Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white dark:bg-surface-900 border border-slate-300 dark:border-surface-700 rounded shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Assigned Students</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black font-mono text-[#1f3a52] dark:text-sky-300">184</span>
            <span className="text-[10px] text-slate-500 font-medium">Across 3 Batches</span>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-surface-900 border border-slate-300 dark:border-surface-700 rounded shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Allocated Subjects</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black font-mono text-emerald-700 dark:text-emerald-400">3 Courses</span>
            <span className="text-[10px] text-slate-500 font-medium">12 Contact Hrs/Wk</span>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-surface-900 border border-slate-300 dark:border-surface-700 rounded shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Pending Evaluations</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">14 Submissions</span>
            <span className="text-[10px] text-amber-700 font-bold">Needs Review</span>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-surface-900 border border-slate-300 dark:border-surface-700 rounded shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Cumulative Attendance Rate</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black font-mono text-brand-700 dark:text-brand-300">86.4%</span>
            <span className="text-[10px] text-emerald-700 font-bold">Above Minimum</span>
          </div>
        </div>
      </div>

      {/* 4. Today's Class Schedule Table */}
      <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
        <div className="bg-[#1f3a52] text-white py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs font-bold tracking-wide">Today's Class Lecture Schedule (Thursday)</h2>
          </div>
          <Link to="/faculty/academic" className="text-[10px] text-sky-300 hover:underline">
            View Complete Timetable &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-surface-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-300 dark:border-surface-700">
                <th className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 w-16 text-center">Period</th>
                <th className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 w-36">Time Interval</th>
                <th className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 w-28">Subject Code</th>
                <th className="py-2 px-4 border-r border-slate-200 dark:border-surface-700">Course Description</th>
                <th className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 w-28 text-center">Section</th>
                <th className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 w-32">Classroom / Lab</th>
                <th className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 w-32">Classroom / Lab</th>
                <th className="py-2 px-3 border-r border-slate-200 dark:border-surface-700 w-28 text-center">Status</th>
                <th className="py-2 px-3 w-32 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
              {todaySchedule.map((slot) => (
                <tr key={slot.period} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                  <td className="py-2 px-3 text-center font-bold font-mono border-r border-slate-200 dark:border-surface-700">
                    {slot.period}
                  </td>
                  <td className="py-2 px-3 font-mono border-r border-slate-200 dark:border-surface-700 font-semibold">
                    {slot.time}
                  </td>
                  <td className="py-2 px-3 font-mono font-bold text-brand-700 dark:text-brand-300 border-r border-slate-200 dark:border-surface-700">
                    {slot.code}
                  </td>
                  <td className="py-2 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-700">
                    {slot.name}
                  </td>
                  <td className="py-2 px-3 text-center font-bold border-r border-slate-200 dark:border-surface-700">
                    {slot.sec}
                  </td>
                  <td className="py-2 px-3 font-medium text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-surface-700">
                    {slot.hall}
                  </td>
                  <td className="py-2 px-3 text-center border-r border-slate-200 dark:border-surface-700">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        slot.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-sky-100 text-sky-800 border border-sky-300 dark:bg-sky-950 dark:text-sky-300'
                      }`}
                    >
                      {slot.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <Link
                      to="/faculty/attendance"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-[10px] font-bold shadow-sm transition-colors"
                    >
                      Take Roll-Call
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 dark:bg-surface-800/60 p-2.5 border-t border-slate-200 dark:border-surface-700 flex flex-wrap items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span>Faculty Punch Status: <strong className="text-emerald-700 dark:text-emerald-400">IN (08:42 AM - Biometric Gate 2)</strong></span>
            <span>•</span>
            <span>Scheduled Contact Hours: <strong>4 Hrs</strong></span>
          </div>
          <button
            onClick={() => window.print()}
            className="text-[#2ba2c5] font-bold hover:underline flex items-center gap-1"
          >
            Print Today's Attendance Sheet
          </button>
        </div>
      </div>

      {/* 5. Notifications & Quick Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Notifications */}
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="bg-[#1f3a52] text-white py-2 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <h2 className="text-xs font-bold tracking-wide">Recent Academic Bulletins & Notifications</h2>
            </div>
            <Link to="/faculty/announcements" className="text-[10px] text-sky-300 hover:underline">
              View All &rarr;
            </Link>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-surface-800 text-xs">
            {recentNotifications.map((n) => (
              <div key={n.id} className="p-3 hover:bg-slate-50/60 dark:hover:bg-surface-800/40">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{n.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{n.date}</span>
                </div>
                <span className="text-[10px] text-brand-700 dark:text-brand-300 font-semibold mt-1 block">
                  [{n.type}]
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Portal Navigation Grid */}
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 p-4 shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
            Faculty Core Navigation Desk
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              to="/faculty/attendance"
              className="p-2.5 rounded border border-slate-200 dark:border-surface-700 hover:bg-sky-50 dark:hover:bg-surface-800 font-semibold flex items-center gap-2 transition-colors"
            >
              <CheckSquare className="w-4 h-4 text-emerald-600" /> Roll-Call Attendance
            </Link>
            <Link
              to="/faculty/assignments"
              className="p-2.5 rounded border border-slate-200 dark:border-surface-700 hover:bg-sky-50 dark:hover:bg-surface-800 font-semibold flex items-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4 text-sky-600" /> Assignment Grading
            </Link>
            <Link
              to="/faculty/exams"
              className="p-2.5 rounded border border-slate-200 dark:border-surface-700 hover:bg-sky-50 dark:hover:bg-surface-800 font-semibold flex items-center gap-2 transition-colors"
            >
              <Award className="w-4 h-4 text-amber-600" /> Internal Marks Entry
            </Link>
            <Link
              to="/faculty/students"
              className="p-2.5 rounded border border-slate-200 dark:border-surface-700 hover:bg-sky-50 dark:hover:bg-surface-800 font-semibold flex items-center gap-2 transition-colors"
            >
              <Users className="w-4 h-4 text-indigo-600" /> Ward Mentorship
            </Link>
            <Link
              to="/faculty/research"
              className="p-2.5 rounded border border-slate-200 dark:border-surface-700 hover:bg-sky-50 dark:hover:bg-surface-800 font-semibold flex items-center gap-2 transition-colors"
            >
              <Briefcase className="w-4 h-4 text-purple-600" /> Research & Grants
            </Link>
            <Link
              to="/faculty/finance"
              className="p-2.5 rounded border border-slate-200 dark:border-surface-700 hover:bg-sky-50 dark:hover:bg-surface-800 font-semibold flex items-center gap-2 transition-colors"
            >
              <DollarSign className="w-4 h-4 text-emerald-600" /> Salary Payslips
            </Link>
          </div>
        </div>
      </div>

      {/* 6. Institutional Verification Footprint */}
      <div className="border-t border-slate-300 dark:border-surface-700 pt-3 text-[11px] text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>CAMPUSOS ERP • Enterprise University Management Ecosystem</span>
          <span>•</span>
          <span>Official Faculty Portal Build v2.8</span>
        </div>
        <div className="font-mono text-[10px]">
          Session Token: <span className="font-bold text-slate-700 dark:text-slate-300">AUTH-FAC-2026-X992</span> • Server Node: <span className="text-cyan-600 font-bold">IN-CLUSTER-01</span>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
