import React, { useState } from 'react';
import { Users, AlertTriangle, CheckCircle2, MessageSquare, Search, Award } from 'lucide-react';

const FacultyStudents = () => {
  const [activeTab, setActiveTab] = useState('directory'); // 'directory' | 'weak-students' | 'queries'
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replySuccess, setReplySuccess] = useState('');

  const students = [
    { regNo: 'EN2024CS042', name: 'Rahul Kumar', sem: 5, section: 'A', cgpa: 8.98, attendance: 86.93, status: 'EXCELLENT', mentor: 'Dr. Robert Johnson' },
    { regNo: 'EN2024CS019', name: 'Ananya Deshmukh', sem: 5, section: 'A', cgpa: 9.42, attendance: 94.20, status: 'TOPPER', mentor: 'Dr. Robert Johnson' },
    { regNo: 'EN2024CS055', name: 'Rohan Gupta', sem: 5, section: 'A', cgpa: 7.20, attendance: 78.50, status: 'SATISFACTORY', mentor: 'Dr. Robert Johnson' },
    { regNo: 'EN2024CS104', name: 'Siddharth Verma', sem: 5, section: 'A', cgpa: 6.12, attendance: 64.80, status: 'CRITICAL_SHORTAGE', mentor: 'Dr. Robert Johnson' },
    { regNo: 'EN2024CS112', name: 'Kavita Nair', sem: 5, section: 'A', cgpa: 6.40, attendance: 68.20, status: 'ACADEMIC_ALERT', mentor: 'Dr. Robert Johnson' },
  ];

  const studentQueries = [
    { id: 'QRY-101', student: 'Rahul Kumar (EN2024CS042)', topic: 'Distributed Deadlock Detection Algorithm clarification in Unit 4', date: '04-Nov-2026', status: 'ANSWERED' },
    { id: 'QRY-102', student: 'Siddharth Verma (EN2024CS104)', topic: 'Requisition for attendance waiver adjustment due to hospital admission', date: '05-Nov-2026', status: 'PENDING REVIEW' },
  ];

  const filteredStudents = students.filter(
    (s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const weakStudents = students.filter((s) => s.attendance < 75 || s.cgpa < 6.5);

  const handleSendReply = (e) => {
    e.preventDefault();
    setReplySuccess('Response delivered directly to student portal notifications!');
    setReplyText('');
    setTimeout(() => setReplySuccess(''), 4000);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          STUDENT MENTORSHIP & ACADEMIC MONITORING
        </h1>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Faculty Advisor Ward Directory • Attendance Vigilance & Mentorship Counseling
        </p>
      </div>

      {replySuccess && (
        <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          {replySuccess}
        </div>
      )}

      {/* 3. Sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-300 dark:border-surface-700 pb-1">
        <button
          onClick={() => setActiveTab('directory')}
          className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
            activeTab === 'directory'
              ? 'bg-[#1f3a52] text-white'
              : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          My Students Directory ({students.length})
        </button>
        <button
          onClick={() => setActiveTab('weak-students')}
          className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
            activeTab === 'weak-students'
              ? 'bg-[#1f3a52] text-white'
              : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Identify Weak Students ({weakStudents.length})
        </button>
        <button
          onClick={() => setActiveTab('queries')}
          className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
            activeTab === 'queries'
              ? 'bg-[#1f3a52] text-white'
              : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Student Queries & Mentoring ({studentQueries.length})
        </button>
      </div>

      {/* TAB 1: Directory */}
      {activeTab === 'directory' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 max-w-sm">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student name or register no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>
          </div>

          <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                    <th className="py-2.5 px-3 border-r border-slate-400 w-32">Register No.</th>
                    <th className="py-2.5 px-4 border-r border-slate-400">Student Name</th>
                    <th className="py-2.5 px-2 border-r border-slate-400 w-16 text-center">Sem</th>
                    <th className="py-2.5 px-2 border-r border-slate-400 w-16 text-center">Sec</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">CGPA</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">Attendance %</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-36 text-center">Academic Standing</th>
                    <th className="py-2.5 px-4">Mentor In-Charge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                  {filteredStudents.map((s) => (
                    <tr key={s.regNo} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {s.regNo}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {s.name}
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                        {s.sem}
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                        {s.section}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold font-mono border-r border-slate-200 dark:border-surface-800">
                        {s.cgpa.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                        <span className={s.attendance < 75 ? 'text-rose-600 font-extrabold' : 'text-emerald-700'}>
                          {s.attendance.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.status === 'EXCELLENT' || s.status === 'TOPPER'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : s.status === 'SATISFACTORY'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-medium">
                        {s.mentor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Weak Students Alert */}
      {activeTab === 'weak-students' && (
        <div className="space-y-3">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-amber-900 dark:text-amber-200 text-xs rounded">
            <strong>Mandatory Remedial Action:</strong> Students with attendance under the statutory 75% limit or CGPA below 6.50 must be scheduled for parent-counseling and bridge classes.
          </div>

          <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                    <th className="py-2.5 px-3 border-r border-slate-400 w-32">Register No.</th>
                    <th className="py-2.5 px-4 border-r border-slate-400">Student Name</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">Attendance %</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">CGPA</th>
                    <th className="py-2.5 px-4 border-r border-slate-400">Critical Shortage Deficiency</th>
                    <th className="py-2.5 px-3 w-36 text-center">Remedial Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                  {weakStudents.map((ws) => (
                    <tr key={ws.regNo} className="hover:bg-rose-50/40 dark:hover:bg-rose-950/20 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {ws.regNo}
                      </td>
                      <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {ws.name}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-rose-600 border-r border-slate-200 dark:border-surface-800">
                        {ws.attendance}%
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold font-mono border-r border-slate-200 dark:border-surface-800">
                        {ws.cgpa}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-rose-700 dark:text-rose-400 border-r border-slate-200 dark:border-surface-800">
                        {ws.attendance < 75 ? 'Barred from End-Sem Exam if uncorrected' : 'Academic Probationary Review'}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => alert(`Official notice and SMS summon issued to parents of ${ws.name}`)}
                          className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold shadow-sm"
                        >
                          Issue Warning Letter
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Queries */}
      {activeTab === 'queries' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
            Active Student Inquiries & Advising Threads
          </h2>

          <div className="space-y-3">
            {studentQueries.map((q) => (
              <div key={q.id} className="p-3 bg-slate-50 dark:bg-surface-800 border rounded space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{q.student}</span>
                  <span className="text-[10px] text-slate-500">{q.date}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">{q.topic}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-bold text-emerald-700">{q.status}</span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendReply} className="pt-2 space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Post Advising Response / Mentor Guidance
            </label>
            <textarea
              required
              rows={3}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your academic reply to the student ward..."
              className="w-full p-2.5 text-xs border border-slate-300 dark:border-surface-700 rounded bg-white dark:bg-surface-800"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-bold shadow-sm"
            >
              Send Mentor Response
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FacultyStudents;

