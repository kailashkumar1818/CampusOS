import React from 'react';

const StudentAttendance = () => {
  const attendanceRows = [
    {
      code: 'CSE 302',
      description: 'OPERATING SYSTEMS',
      conducted: 54,
      present: 44,
      absent: 10,
      odml: 0,
      presentPct: '81.48',
      odmlPct: '0.00',
      totalPct: '81.48',
    },
    {
      code: 'CSE 303',
      description: 'MACHINE LEARNING',
      conducted: 53,
      present: 42,
      absent: 11,
      odml: 0,
      presentPct: '79.25',
      odmlPct: '0.00',
      totalPct: '79.25',
    },
    {
      code: 'CSE 305',
      description: 'COMPUTER ORGANIZATION AND ARCHITECTURE',
      conducted: 56,
      present: 47,
      absent: 7,
      odml: 2,
      presentPct: '83.93',
      odmlPct: '3.00',
      totalPct: '86.93',
    },
    {
      code: 'CSE 309',
      description: 'ADVANCED JAVA PROGRAMMING',
      conducted: 51,
      present: 48,
      absent: 3,
      odml: 0,
      presentPct: '94.12',
      odmlPct: '0.00',
      totalPct: '94.12',
    },
    {
      code: 'EGL 256',
      description: 'DECODING LANGUAGE',
      conducted: 23,
      present: 19,
      absent: 4,
      odml: 0,
      presentPct: '82.61',
      odmlPct: '0.00',
      totalPct: '82.61',
    },
    {
      code: 'SEC 303',
      description: 'DEVOPS - RHCSA',
      conducted: 46,
      present: 36,
      absent: 10,
      odml: 0,
      presentPct: '78.26',
      odmlPct: '0.00',
      totalPct: '78.26',
    },
  ];

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* Title strictly matching reference Image 3 */}
      <div className="pt-1">
        <h1 className="text-[17px] font-bold text-[#1b2b4d] dark:text-sky-300 tracking-wide uppercase">
          ATTENDANCE DETAILS
        </h1>
      </div>

      {/* Navy Header Banner: During the Period */}
      <div className="bg-[#1f3a52] text-white py-2 px-4 text-center rounded-t-sm shadow-sm">
        <p className="text-xs font-semibold tracking-wide">
          During the Period : 03/Aug/2026 To 04/Nov/2026
        </p>
      </div>

      {/* Main Attendance Table */}
      <div className="border border-slate-300 dark:border-surface-700 rounded-b-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm -mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                <th rowSpan={2} className="py-2.5 px-3 border-r border-slate-400 text-left">
                  Subject Code
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-slate-400 text-left">
                  Subject Description
                </th>
                <th rowSpan={2} className="py-2.5 px-2 border-r border-slate-400 text-center">
                  Classes<br />Conducted
                </th>
                <th colSpan={2} className="py-1 px-2 border-r border-slate-400 text-center">
                  Attendance Entered (Slots)
                </th>
                <th rowSpan={2} className="py-2.5 px-2 border-r border-slate-400 text-center">
                  OD/ML Taken
                </th>
                <th rowSpan={2} className="py-2.5 px-2 border-r border-slate-400 text-center">
                  Present<br />%<br />P / (P+A+OD)
                </th>
                <th rowSpan={2} className="py-2.5 px-2 border-r border-slate-400 text-center">
                  OD ML<br />% approved
                </th>
                <th rowSpan={2} className="py-2.5 px-2 text-center">
                  Attendance<br />%
                </th>
              </tr>
              <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400 text-[10px]">
                <th className="py-1 px-2 border-r border-slate-400 text-center">Present(P)</th>
                <th className="py-1 px-2 border-r border-slate-400 text-center">Absent(A)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
              {attendanceRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors"
                >
                  <td className="py-2 px-3 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                    {row.code}
                  </td>
                  <td className="py-2 px-3 font-medium border-r border-slate-200 dark:border-surface-800 uppercase">
                    {row.description}
                  </td>
                  <td className="py-2 px-2 text-center border-r border-slate-200 dark:border-surface-800 font-medium">
                    {row.conducted}
                  </td>
                  <td className="py-2 px-2 text-center border-r border-slate-200 dark:border-surface-800 font-medium">
                    {row.present}
                  </td>
                  <td className="py-2 px-2 text-center border-r border-slate-200 dark:border-surface-800 font-medium">
                    {row.absent}
                  </td>
                  <td className="py-2 px-2 text-center border-r border-slate-200 dark:border-surface-800 font-medium">
                    {row.odml}
                  </td>
                  <td className="py-2 px-2 text-center border-r border-slate-200 dark:border-surface-800 font-medium">
                    {row.presentPct}
                  </td>
                  <td className="py-2 px-2 text-center border-r border-slate-200 dark:border-surface-800 font-medium">
                    {row.odmlPct}
                  </td>
                  <td className="py-2 px-2 text-center font-bold text-slate-900 dark:text-white">
                    {row.totalPct}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footnote matching Image 3 */}
      <p className="text-[#c2410c] dark:text-amber-400 text-[11px] font-medium">
        For any discrepancy in attendance/not entered attendance please contact the course teacher.
      </p>

      {/* Rules and Formulas matching Image 3 */}
      <div className="space-y-3 pt-2 text-[11px] text-slate-700 dark:text-slate-300 font-sans border-t border-slate-200 dark:border-surface-800">
        <div>
          <h3 className="font-bold text-[#1b2b4d] dark:text-sky-300">
            Attendance Percentage Calculation:
          </h3>
          <p className="mt-0.5">
            Attendance Percentage(%) = Student Present Slots / Faculty Attendance Entered Slots &times; 100
          </p>
        </div>

        <div>
          <h3 className="font-bold text-[#1b2b4d] dark:text-sky-300">
            OD/ML Calculation:
          </h3>
          <p className="mt-0.5">
            1. OD/ML is allowed for a maximum of 15% of the scheduled Slots in a given course.
          </p>
          <p className="mt-0.5">
            2. To consider OD/ML student should maintain a minimum of 60% attendance in a given course
          </p>
          <p className="mt-0.5">
            OD/ML Percentage(%) per course = OD/ML Submitted / Total Slots scheduled for the course for entire semester &times; 100
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
