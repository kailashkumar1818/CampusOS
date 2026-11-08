import React, { useState } from 'react';
import { Download, Printer, Upload, CheckCircle2, Award, FileText, Camera } from 'lucide-react';

const StudentExams = () => {
  const [activeTab, setActiveTab] = useState('internal'); // 'internal' | 'earlier' | 'results' | 'mark-details' | 'registration' | 'photo'
  const [earlierSem, setEarlierSem] = useState(4);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [photoSaved, setPhotoSaved] = useState(false);

  // Sem 5 Internal Continuous Assessment Marks
  const currentInternals = [
    { code: 'CSE 302', name: 'OPERATING SYSTEMS', ct1: 23, ct2: 24, model: 47, lab: 48, totalInternal: '47.50', max: 50 },
    { code: 'CSE 303', name: 'MACHINE LEARNING', ct1: 22, ct2: 23, model: 44, lab: 46, totalInternal: '45.00', max: 50 },
    { code: 'CSE 305', name: 'COMPUTER ORGANIZATION AND ARCHITECTURE', ct1: 24, ct2: 24, model: 48, lab: 49, totalInternal: '48.50', max: 50 },
    { code: 'CSE 309', name: 'ADVANCED JAVA PROGRAMMING', ct1: 25, ct2: 25, model: 49, lab: 50, totalInternal: '49.50', max: 50 },
    { code: 'EGL 256', name: 'DECODING LANGUAGE', ct1: 21, ct2: 22, model: 43, lab: 45, totalInternal: '43.00', max: 50 },
    { code: 'SEC 303', name: 'DEVOPS - RHCSA', ct1: 24, ct2: 23, model: 46, lab: 48, totalInternal: '47.00', max: 50 },
  ];

  // Earlier Semesters Internal Records
  const pastInternals = {
    4: [
      { code: 'CSE 204', name: 'DESIGN AND ANALYSIS OF ALGORITHMS', ct1: 23, ct2: 24, model: 47, lab: 48, total: '47.50' },
      { code: 'CSE 205', name: 'DATABASE MANAGEMENT SYSTEMS', ct1: 24, ct2: 23, model: 46, lab: 47, total: '46.50' },
      { code: 'MAT 202', name: 'PROBABILITY AND QUEUEING THEORY', ct1: 22, ct2: 24, model: 45, lab: 46, total: '45.00' },
    ],
    3: [
      { code: 'CSE 201', name: 'DATA STRUCTURES USING C++', ct1: 24, ct2: 25, model: 48, lab: 50, total: '49.00' },
      { code: 'MAT 201', name: 'DISCRETE MATHEMATICAL STRUCTURES', ct1: 23, ct2: 23, model: 46, lab: 46, total: '46.00' },
    ],
  };

  // Grade Card Results
  const currentResults = [
    { code: 'CSE 204', name: 'DESIGN AND ANALYSIS OF ALGORITHMS', credits: 4, grade: 'O', points: 10, result: 'PASS' },
    { code: 'CSE 205', name: 'DATABASE MANAGEMENT SYSTEMS', credits: 4, grade: 'A+', points: 9, result: 'PASS' },
    { code: 'MAT 202', name: 'PROBABILITY AND QUEUEING THEORY', credits: 4, grade: 'A+', points: 9, result: 'PASS' },
    { code: 'CSE 206', name: 'MICROPROCESSORS AND INTERFACING', credits: 4, grade: 'O', points: 10, result: 'PASS' },
    { code: 'CSE 207', name: 'SOFTWARE ENGINEERING PRACTICES', credits: 4, grade: 'A+', points: 9, result: 'PASS' },
    { code: 'EGL 201', name: 'PROFESSIONAL COMMUNICATION', credits: 3, grade: 'O', points: 10, result: 'PASS' },
  ];

  // Exam Schedule / Hall Ticket
  const examSchedule = [
    { code: 'CSE 302', name: 'OPERATING SYSTEMS', date: '01-Dec-2026', session: 'FN (09:30 AM - 12:30 PM)', hall: 'Hall-302', seat: 'C-14' },
    { code: 'CSE 303', name: 'MACHINE LEARNING', date: '03-Dec-2026', session: 'FN (09:30 AM - 12:30 PM)', hall: 'Hall-302', seat: 'C-14' },
    { code: 'CSE 305', name: 'COMPUTER ORGANIZATION AND ARCHITECTURE', date: '05-Dec-2026', session: 'FN (09:30 AM - 12:30 PM)', hall: 'Hall-302', seat: 'C-14' },
    { code: 'CSE 309', name: 'ADVANCED JAVA PROGRAMMING', date: '08-Dec-2026', session: 'FN (09:30 AM - 12:30 PM)', hall: 'Hall-302', seat: 'C-14' },
    { code: 'EGL 256', name: 'DECODING LANGUAGE', date: '10-Dec-2026', session: 'FN (09:30 AM - 12:30 PM)', hall: 'Hall-302', seat: 'C-14' },
    { code: 'SEC 303', name: 'DEVOPS - RHCSA', date: '12-Dec-2026', session: 'FN (09:30 AM - 12:30 PM)', hall: 'Lab Complex 4', seat: 'WS-08' },
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedPhoto(URL.createObjectURL(file));
      setPhotoSaved(true);
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          EXAMINATION
        </h1>
      </div>

      {/* 2. Gray Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Office of the Controller of Examinations (CoE) • Continuous Assessment & Grading Portal
        </p>
      </div>

      {/* 3. Sub-tabs matching the Sidebar Examination items */}
      <div className="flex flex-wrap gap-2 border-b border-slate-300 dark:border-surface-700 pb-1">
        {[
          { id: 'internal', label: 'Internal Mark Details' },
          { id: 'earlier', label: 'Earlier Internal Marks' },
          { id: 'results', label: 'Current Semester Results' },
          { id: 'mark-details', label: 'Exam Mark Details' },
          { id: 'registration', label: 'Exam Registration' },
          { id: 'photo', label: 'Degree Photo Upload' },
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

      {/* TAB 1: Internal Mark Details */}
      {activeTab === 'internal' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Subject Code</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Subject Description</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">CT-1 (25)</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">CT-2 (25)</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">Model Exam (50)</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">Lab CA (50)</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32 text-center">Total Internal (50)</th>
                  <th className="py-2.5 px-3 w-24 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {currentInternals.map((row) => (
                  <tr key={row.code} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {row.code}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {row.name}
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800 font-medium">
                      {row.ct1}
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800 font-medium">
                      {row.ct2}
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800 font-medium">
                      {row.model}
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800 font-medium">
                      {row.lab}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {row.totalInternal}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                        ENTERED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Earlier Internal Marks */}
      {activeTab === 'earlier' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Previous Semester:</span>
            {[4, 3].map((s) => (
              <button
                key={s}
                onClick={() => setEarlierSem(s)}
                className={`px-3 py-1 text-xs font-bold rounded ${
                  earlierSem === s ? 'bg-[#1f3a52] text-white' : 'bg-slate-200 dark:bg-surface-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Semester {s}
              </button>
            ))}
          </div>

          <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                    <th className="py-2.5 px-3 border-r border-slate-400 w-28">Subject Code</th>
                    <th className="py-2.5 px-4 border-r border-slate-400">Subject Description</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">CT-1 (25)</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">CT-2 (25)</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">Model Exam (50)</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">Lab CA (50)</th>
                    <th className="py-2.5 px-3 w-32 text-center">Total Internal (50)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                  {(pastInternals[earlierSem] || []).map((row) => (
                    <tr key={row.code} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {row.code}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {row.name}
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                        {row.ct1}
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                        {row.ct2}
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                        {row.model}
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                        {row.lab}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-900 dark:text-white">
                        {row.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Current Semester Results */}
      {activeTab === 'results' && (
        <div className="space-y-4">
          <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                    <th className="py-2.5 px-3 border-r border-slate-400 w-28">Subject Code</th>
                    <th className="py-2.5 px-4 border-r border-slate-400">Subject Description</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-20 text-center">Credits</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">Grade</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">Grade Points</th>
                    <th className="py-2.5 px-3 w-28 text-center">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                  {currentResults.map((row) => (
                    <tr key={row.code} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {row.code}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {row.name}
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800 font-bold">
                        {row.credits}
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                        {row.grade}
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800 font-bold">
                        {row.points}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-emerald-700 dark:text-emerald-400">
                        {row.result}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between p-3 bg-slate-50 dark:bg-surface-800 border border-slate-300 dark:border-surface-700 rounded-sm text-xs font-bold">
            <span>Semester GPA (SGPA): <strong className="text-emerald-700 dark:text-emerald-400 text-sm font-mono">9.14 / 10.00</strong></span>
            <span>Cumulative GPA (CGPA): <strong className="text-brand-700 dark:text-brand-300 text-sm font-mono">8.98 / 10.00</strong></span>
            <span>Overall Classification: <strong className="text-slate-900 dark:text-white">FIRST CLASS WITH DISTINCTION</strong></span>
          </div>
        </div>
      )}

      {/* TAB 4: Exam Mark Details */}
      {activeTab === 'mark-details' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="bg-[#1f3a52] text-white py-2 px-4">
            <h2 className="text-xs font-bold tracking-wide">
              Cumulative Academic Progression & GPA History
            </h2>
          </div>
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-surface-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-300 dark:border-surface-700">
                <th className="py-2 px-4 border-r border-slate-200 dark:border-surface-700">Semester</th>
                <th className="py-2 px-4 border-r border-slate-200 dark:border-surface-700 text-center">Registered Credits</th>
                <th className="py-2 px-4 border-r border-slate-200 dark:border-surface-700 text-center">Earned Credits</th>
                <th className="py-2 px-4 border-r border-slate-200 dark:border-surface-700 text-center">SGPA</th>
                <th className="py-2 px-4 text-center">Result Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px]">
              <tr className="hover:bg-slate-50">
                <td className="py-2 px-4 font-bold border-r">Semester 1 (Autumn 2024)</td>
                <td className="py-2 px-4 text-center border-r">24</td>
                <td className="py-2 px-4 text-center border-r">24</td>
                <td className="py-2 px-4 text-center font-bold font-mono border-r">8.92</td>
                <td className="py-2 px-4 text-center font-bold text-emerald-700">PASSED</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2 px-4 font-bold border-r">Semester 2 (Spring 2025)</td>
                <td className="py-2 px-4 text-center border-r">24</td>
                <td className="py-2 px-4 text-center border-r">24</td>
                <td className="py-2 px-4 text-center font-bold font-mono border-r">8.85</td>
                <td className="py-2 px-4 text-center font-bold text-emerald-700">PASSED</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2 px-4 font-bold border-r">Semester 3 (Autumn 2025)</td>
                <td className="py-2 px-4 text-center border-r">23</td>
                <td className="py-2 px-4 text-center border-r">23</td>
                <td className="py-2 px-4 text-center font-bold font-mono border-r">9.10</td>
                <td className="py-2 px-4 text-center font-bold text-emerald-700">PASSED</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2 px-4 font-bold border-r">Semester 4 (Spring 2026)</td>
                <td className="py-2 px-4 text-center border-r">24</td>
                <td className="py-2 px-4 text-center border-r">24</td>
                <td className="py-2 px-4 text-center font-bold font-mono border-r">9.04</td>
                <td className="py-2 px-4 text-center font-bold text-emerald-700">PASSED</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 5: Exam Registration & Hall Ticket */}
      {activeTab === 'registration' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
              End-Semester Theory & Practical Examination Hall Ticket
            </span>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-bold shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" /> Print Official Hall Ticket
            </button>
          </div>

          <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                    <th className="py-2.5 px-3 border-r border-slate-400 w-28">Subject Code</th>
                    <th className="py-2.5 px-4 border-r border-slate-400">Subject Title</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-28">Exam Date</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-48">Session</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-28">Hall Number</th>
                    <th className="py-2.5 px-3 w-24 text-center">Seat Number</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                  {examSchedule.map((row) => (
                    <tr key={row.code} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {row.code}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {row.name}
                      </td>
                      <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                        {row.date}
                      </td>
                      <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                        {row.session}
                      </td>
                      <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                        {row.hall}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900 dark:text-white">
                        {row.seat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Degree Photo Upload */}
      {activeTab === 'photo' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 p-6 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
            Official Degree Certificate & Convocation Photo Upload
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-bold">Guidelines for Degree Certificate Photograph:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                <li>Formal attire with plain white or off-white background.</li>
                <li>Clear frontal face view with neutral expression (No sunglasses/hats).</li>
                <li>Image size must be 35mm x 45mm, JPEG/PNG format, between 50KB and 500KB.</li>
                <li>This photograph will be printed on your final Degree Scroll and Consolidated Grade Card.</li>
              </ul>

              <div className="pt-3">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-bold shadow-sm cursor-pointer">
                  <Upload className="w-3.5 h-3.5" /> Choose Passport Photo
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {photoSaved && (
                <p className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5 pt-2">
                  <CheckCircle2 className="w-4 h-4" /> Degree photo uploaded and verified with Registry!
                </p>
              )}
            </div>

            <div className="flex flex-col items-center justify-center p-4 border border-dashed border-slate-300 dark:border-surface-700 rounded bg-slate-50 dark:bg-surface-800">
              {uploadedPhoto ? (
                <div className="space-y-2 text-center">
                  <img
                    src={uploadedPhoto}
                    alt="Degree Preview"
                    className="w-32 h-40 object-cover rounded border border-slate-400 shadow-md mx-auto"
                  />
                  <span className="text-[11px] text-slate-500 font-mono">35mm x 45mm Preview</span>
                </div>
              ) : (
                <div className="text-center text-slate-400 space-y-2">
                  <Camera className="w-12 h-12 mx-auto stroke-1" />
                  <p className="text-xs">No photograph selected yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentExams;
