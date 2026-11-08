import React, { useState } from 'react';
import { Award, Star, BarChart3, CheckCircle2, Download } from 'lucide-react';

const FacultyFeedback = () => {
  const [selectedSem] = useState('Odd Semester 2026-2027');

  const courseFeedback = [
    {
      code: 'CSE 302',
      name: 'OPERATING SYSTEMS',
      responses: 64,
      punctuality: '4.8 / 5.0',
      subjectKnowledge: '4.9 / 5.0',
      clarity: '4.7 / 5.0',
      courseMaterials: '4.8 / 5.0',
      overallScore: '96.2%',
      grade: 'EXCELLENT (A+)',
    },
    {
      code: 'CSE 305',
      name: 'COMPUTER ORGANIZATION AND ARCHITECTURE',
      responses: 60,
      punctuality: '4.7 / 5.0',
      subjectKnowledge: '4.9 / 5.0',
      clarity: '4.6 / 5.0',
      courseMaterials: '4.7 / 5.0',
      overallScore: '94.5%',
      grade: 'EXCELLENT (A+)',
    },
    {
      code: 'CSE 401',
      name: 'DISTRIBUTED CLOUD ARCHITECTURE',
      responses: 50,
      punctuality: '4.9 / 5.0',
      subjectKnowledge: '5.0 / 5.0',
      clarity: '4.8 / 5.0',
      courseMaterials: '4.9 / 5.0',
      overallScore: '98.0%',
      grade: 'OUTSTANDING (O)',
    },
  ];

  const studentComments = [
    { subject: 'CSE 302', comment: 'Dr. Johnson makes process scheduling and deadlock algorithms exceptionally easy to grasp with hands-on Linux kernel tracing examples.', date: '01-Nov-2026' },
    { subject: 'CSE 401', comment: 'Best course in distributed computing. Clear coverage of Paxos, Raft and Amazon DynamoDB design choices.', date: '28-Oct-2026' },
  ];

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          STUDENT EVALUATION & FACULTY TEACHING FEEDBACK
        </h1>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Internal Quality Assurance Cell (IQAC) • End-Semester Anonymous Feedback Index
        </p>
      </div>

      {/* Summary Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-white dark:bg-surface-900 border rounded shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Cumulative Teaching Rating</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-emerald-700 dark:text-emerald-400">4.84 / 5.00</span>
            <span className="text-xs text-slate-500">(96.8% Aggregate)</span>
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-surface-900 border rounded shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Student Responses</span>
          <span className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1 block">174 Students</span>
        </div>
        <div className="p-4 bg-white dark:bg-surface-900 border rounded shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">IQAC Performance Band</span>
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mt-1 block">TIER-1 (DISTINGUISHED FACULTY)</span>
        </div>
      </div>

      {/* Course Evaluation Table */}
      <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
        <div className="bg-[#1f3a52] text-white py-2 px-4 flex items-center justify-between">
          <h2 className="text-xs font-bold tracking-wide">Subject-wise Evaluation Index ({selectedSem})</h2>
          <button
            onClick={() => alert('Downloading official IQAC faculty evaluation report (PDF)...')}
            className="inline-flex items-center gap-1 text-[10px] bg-[#2ba2c5] hover:bg-[#258fae] px-2 py-0.5 rounded font-bold"
          >
            <Download className="w-3 h-3" /> Export IQAC Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-surface-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-300 dark:border-surface-700">
                <th className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-700 w-24">Code</th>
                <th className="py-2.5 px-4 border-r border-slate-200 dark:border-surface-700">Course Name</th>
                <th className="py-2.5 px-2 border-r border-slate-200 dark:border-surface-700 w-20 text-center">Evaluations</th>
                <th className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-700 w-24 text-center">Punctuality</th>
                <th className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-700 w-28 text-center">Knowledge</th>
                <th className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-700 w-24 text-center">Clarity</th>
                <th className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-700 w-28 text-center">Score %</th>
                <th className="py-2.5 px-3 text-center">IQAC Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
              {courseFeedback.map((cf) => (
                <tr key={cf.code} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-700">
                    {cf.code}
                  </td>
                  <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-700">
                    {cf.name}
                  </td>
                  <td className="py-2.5 px-2 text-center font-bold border-r border-slate-200 dark:border-surface-700">
                    {cf.responses}
                  </td>
                  <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-700 font-mono">
                    {cf.punctuality}
                  </td>
                  <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-700 font-mono">
                    {cf.subjectKnowledge}
                  </td>
                  <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-700 font-mono">
                    {cf.clarity}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-emerald-700 dark:text-emerald-400 font-mono border-r border-slate-200 dark:border-surface-700">
                    {cf.overallScore}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-900 dark:text-white">
                    {cf.grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Anonymous Feedback Highlights */}
      <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 p-5 shadow-sm space-y-3">
        <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
          Selected Student Qualitative Commendations
        </h2>
        <div className="space-y-2 text-xs">
          {studentComments.map((sc, idx) => (
            <div key={idx} className="p-3 bg-slate-50 dark:bg-surface-800 border rounded">
              <span className="font-bold text-[#1f3a52] dark:text-sky-300 mr-2">[{sc.subject}]</span>
              <span className="italic text-slate-700 dark:text-slate-300">"{sc.comment}"</span>
              <span className="block text-[10px] text-slate-400 mt-1">{sc.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyFeedback;

