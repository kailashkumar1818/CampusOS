import React, { useState } from 'react';
import { BookOpen, Upload, Download, Calendar, Clock, FileText, CheckCircle2, Plus } from 'lucide-react';
import Modal from '../../components/common/Modal';

const FacultyAcademic = () => {
  const [activeTab, setActiveTab] = useState('subjects'); // 'subjects' | 'classes' | 'materials' | 'calendar' | 'lesson-plans' | 'timetable'
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');

  const mySubjects = [
    { code: 'CSE 302', name: 'OPERATING SYSTEMS', type: 'Core Theory & Practical', credits: 4, sem: 5, enrolledStudents: 68, hoursPerWeek: 4 },
    { code: 'CSE 305', name: 'COMPUTER ORGANIZATION AND ARCHITECTURE', type: 'Core Theory', credits: 4, sem: 5, enrolledStudents: 64, hoursPerWeek: 4 },
    { code: 'CSE 401', name: 'DISTRIBUTED CLOUD ARCHITECTURE', type: 'Professional Elective', credits: 3, sem: 7, enrolledStudents: 52, hoursPerWeek: 3 },
  ];

  const myClasses = [
    { section: 'B.Tech CSE - 5th Sem (Section A)', room: 'Lecture Hall C-903', totalStudents: 68, repName: 'Rahul Kumar (EN2024CS042)', slot: 'Mon, Wed, Thu, Fri' },
    { section: 'B.Tech CSE - 5th Sem (Section B)', room: 'Lecture Hall S-610', totalStudents: 64, repName: 'Sneha Patel (EN2024CS078)', slot: 'Tue, Wed, Fri' },
    { section: 'B.Tech CSE - 7th Sem (Elective Batch)', room: 'Seminar Hall 3', totalStudents: 52, repName: 'Vikas Sharma (EN2022CS011)', slot: 'Mon, Thu' },
  ];

  const courseMaterials = [
    { id: 'MAT-01', subject: 'CSE 302', title: 'Unit 1: Process Synchronization & Semaphores', type: 'Lecture Notes (PDF)', uploadedOn: '15-Aug-2026', size: '3.4 MB', downloads: 142 },
    { id: 'MAT-02', subject: 'CSE 302', title: 'Unit 2: Virtual Memory & Page Replacement Algorithms', type: 'Presentation Slides', uploadedOn: '02-Sep-2026', size: '5.8 MB', downloads: 130 },
    { id: 'MAT-03', subject: 'CSE 305', title: 'Pipelining & Hazard Resolution Reference Guide', type: 'Handout (PDF)', uploadedOn: '20-Sep-2026', size: '2.1 MB', downloads: 98 },
    { id: 'MAT-04', subject: 'CSE 401', title: 'Raft Consensus & Distributed Key-Value Store Lab Manual', type: 'Lab Manual', uploadedOn: '10-Oct-2026', size: '4.2 MB', downloads: 52 },
  ];

  const lessonPlans = [
    { week: 'Week 1', subject: 'CSE 302', topics: 'Operating System Structures, System Calls, Dual-Mode Operation', status: 'COMPLETED', hours: 4 },
    { week: 'Week 2', subject: 'CSE 302', topics: 'Process Management, PCB, Context Switch, CPU Scheduling', status: 'COMPLETED', hours: 4 },
    { week: 'Week 3', subject: 'CSE 302', topics: 'Inter-process Communication, Classical Synchronization Problems', status: 'COMPLETED', hours: 4 },
    { week: 'Week 4', subject: 'CSE 302', topics: 'Deadlock Detection, Prevention & Banker\'s Algorithm', status: 'IN PROGRESS', hours: 4 },
    { week: 'Week 5', subject: 'CSE 302', topics: 'Memory Management, Paging, Segmentation, TLB Performance', status: 'UPCOMING', hours: 4 },
  ];

  const weeklySchedule = [
    { day: 'Monday', time: '09:00 - 10:50 AM', subject: 'CSE 305 (COA)', section: 'Sec A', room: 'C-903' },
    { day: 'Tuesday', time: '02:00 - 03:50 PM', subject: 'CSE 305 (COA)', section: 'Sec B', room: 'S-610' },
    { day: 'Wednesday', time: '09:00 - 09:50 AM', subject: 'CSE 302 (OS)', section: 'Sec A', room: 'C-903' },
    { day: 'Thursday', time: '09:00 - 10:50 AM', subject: 'CSE 302 (OS)', section: 'Sec A', room: 'C-903' },
    { day: 'Friday', time: '01:00 - 02:50 PM', subject: 'CSE 302 (OS Lab)', section: 'Sec A', room: 'V-604' },
  ];

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setUploadSuccess('Study material uploaded and published to student portals!');
    setShowUploadModal(false);
    setTimeout(() => setUploadSuccess(''), 4000);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          FACULTY ACADEMIC & COURSEWORK MANAGEMENT
        </h1>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Department of Computer Science & Engineering • Academic Session 2026-2027
        </p>
      </div>

      {uploadSuccess && (
        <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          {uploadSuccess}
        </div>
      )}

      {/* 3. Sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-300 dark:border-surface-700 pb-1">
        {[
          { id: 'subjects', label: 'My Subjects' },
          { id: 'classes', label: 'My Classes' },
          { id: 'materials', label: 'Course Materials & Notes' },
          { id: 'lesson-plans', label: 'Lesson Plans' },
          { id: 'timetable', label: 'Class Timetable' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === tab.id
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: My Subjects */}
      {activeTab === 'subjects' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Subject Code</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Course Title</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-36">Course Category</th>
                  <th className="py-2.5 px-2 border-r border-slate-400 w-16 text-center">Sem</th>
                  <th className="py-2.5 px-2 border-r border-slate-400 w-20 text-center">Credits</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">Enrolled</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">Hrs / Wk</th>
                  <th className="py-2.5 px-3 w-32 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {mySubjects.map((sub) => (
                  <tr key={sub.code} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {sub.code}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {sub.name}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-800">
                      {sub.type}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                      {sub.sem}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                      {sub.credits}
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{sub.enrolledStudents} Students</span>
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                      {sub.hoursPerWeek} hrs
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => setActiveTab('materials')}
                        className="px-2.5 py-1 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-[10px] font-bold shadow-sm"
                      >
                        Manage Materials
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: My Classes */}
      {activeTab === 'classes' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-4 border-r border-slate-400">Class & Section</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-36">Lecture Room</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">Strength</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Class Representative (CR)</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Weekly Schedule</th>
                  <th className="py-2.5 px-3 w-32 text-center">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {myClasses.map((cls, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {cls.section}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {cls.room}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold border-r border-slate-200 dark:border-surface-800 text-slate-900 dark:text-white">
                      {cls.totalStudents}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {cls.repName}
                    </td>
                    <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800">
                      {cls.slot}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => alert(`Taking roll-call attendance for ${cls.section}...`)}
                        className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow-sm"
                      >
                        Roll Call
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Course Materials */}
      {activeTab === 'materials' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
              Published Course Materials & Syllabus Notes
            </span>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-bold shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" /> Upload Study Material
            </button>
          </div>

          <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                    <th className="py-2.5 px-3 border-r border-slate-400 w-24">Doc ID</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-24">Subject</th>
                    <th className="py-2.5 px-4 border-r border-slate-400">Material Title</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-36">Document Type</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-28">Uploaded Date</th>
                    <th className="py-2.5 px-2 border-r border-slate-400 w-20 text-center">File Size</th>
                    <th className="py-2.5 px-2 border-r border-slate-400 w-24 text-center">Downloads</th>
                    <th className="py-2.5 px-3 w-24 text-center">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                  {courseMaterials.map((mat) => (
                    <tr key={mat.id} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {mat.id}
                      </td>
                      <td className="py-2.5 px-3 font-mono border-r border-slate-200 dark:border-surface-800 font-bold text-brand-700 dark:text-brand-300">
                        {mat.subject}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {mat.title}
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-800">
                        {mat.type}
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-800">
                        {mat.uploadedOn}
                      </td>
                      <td className="py-2.5 px-2 text-center border-r border-slate-200 dark:border-surface-800 font-mono">
                        {mat.size}
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold border-r border-slate-200 dark:border-surface-800 text-emerald-700 dark:text-emerald-400">
                        {mat.downloads}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => alert(`Downloading verified institutional PDF: ${mat.title}`)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-[10px] font-bold shadow-sm"
                        >
                          <Download className="w-3 h-3" /> PDF
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

      {/* TAB 4: Lesson Plans */}
      {activeTab === 'lesson-plans' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-24">Week</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Subject</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Planned Topics & Curriculum Modules</th>
                  <th className="py-2.5 px-2 border-r border-slate-400 w-24 text-center">Hours</th>
                  <th className="py-2.5 px-3 w-32 text-center">Coverage Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {lessonPlans.map((lp, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-bold border-r border-slate-200 dark:border-surface-800">
                      {lp.week}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-brand-700 dark:text-brand-300 border-r border-slate-200 dark:border-surface-800">
                      {lp.subject}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {lp.topics}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                      {lp.hours} hrs
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          lp.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                            : lp.status === 'IN PROGRESS'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-surface-800 dark:text-slate-300'
                        }`}
                      >
                        {lp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: Class Timetable */}
      {activeTab === 'timetable' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Day</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-44">Time Slot</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Course / Lecture</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">Section</th>
                  <th className="py-2.5 px-3 w-36">Room / Lab</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {weeklySchedule.map((slot, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-bold border-r border-slate-200 dark:border-surface-800">
                      {slot.day}
                    </td>
                    <td className="py-2.5 px-3 font-mono border-r border-slate-200 dark:border-surface-800 font-semibold">
                      {slot.time}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {slot.subject}
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800 font-bold">
                      {slot.section}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                      {slot.room}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Study Material Modal */}
      {showUploadModal && (
        <Modal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          title="Publish Study Material / Lecture Notes"
        >
          <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Select Course / Subject
              </label>
              <select className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800">
                <option>CSE 302 - OPERATING SYSTEMS</option>
                <option>CSE 305 - COMPUTER ORGANIZATION AND ARCHITECTURE</option>
                <option>CSE 401 - DISTRIBUTED CLOUD ARCHITECTURE</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Document Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Unit 3: CPU Scheduling Algorithms & Gantt Chart Case Studies"
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Select PDF / PPT File
              </label>
              <input
                type="file"
                required
                accept=".pdf,.ppt,.pptx,.doc,.docx"
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-3 py-1.5 rounded border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white font-bold"
              >
                Upload & Notify Students
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default FacultyAcademic;

