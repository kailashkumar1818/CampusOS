import React from 'react';
import { Printer, Download } from 'lucide-react';

const StudentCourseRegistration = () => {
  const registeredCourses = [
    {
      sno: 1,
      semester: 5,
      subjectPart: 'Core Course',
      code: 'CSE 309',
      desc: 'ADVANCED JAVA PROGRAMMING',
      credit: 4,
      group: '',
    },
    {
      sno: 2,
      semester: 5,
      subjectPart: 'Core Course',
      code: 'CSE 305',
      desc: 'COMPUTER ORGANIZATION AND ARCHITECTURE',
      credit: 4,
      group: '',
    },
    {
      sno: 3,
      semester: 5,
      subjectPart: 'Core Course',
      code: 'CSE 303',
      desc: 'MACHINE LEARNING',
      credit: 4,
      group: '',
    },
    {
      sno: 4,
      semester: 5,
      subjectPart: 'Core Course',
      code: 'CSE 302',
      desc: 'OPERATING SYSTEMS',
      credit: 4,
      group: '',
    },
    {
      sno: 5,
      semester: 5,
      subjectPart: 'Open Elective',
      code: 'EGL 256',
      desc: 'DECODING LANGUAGE',
      credit: 3,
      group: 'Group 2',
    },
    {
      sno: 6,
      semester: 5,
      subjectPart: 'Research Design and Industry Practice',
      code: 'CSE 308',
      desc: 'SUMMER INTERNSHIP',
      credit: 4,
      group: '',
    },
    {
      sno: 7,
      semester: 5,
      subjectPart: 'Skill Enhanced Courses',
      code: 'SEC 303',
      desc: 'DEVOPS - RHCSA',
      credit: 2,
      group: 'Group 5',
    },
    {
      sno: 8,
      semester: 5,
      subjectPart: 'Value Added Courses',
      code: 'VAC 108J',
      desc: 'CO-CURRICULAR - CARROM',
      credit: 0,
      group: 'Group 1',
    },
  ];

  const totalCredits = registeredCourses.reduce((acc, c) => acc + c.credit, 0);

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Light Sky Blue Banner matching Image */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          COURSE REGISTRATION
        </h1>
      </div>

      {/* 2. Notification Banner matching Image: "Course Registered successfully" */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Course Registered successfully
        </p>
      </div>

      {/* 3. Formal Course Registration Table matching Image */}
      <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-[#e4f3e6] dark:bg-emerald-950/40 text-[#2c6e49] dark:text-emerald-300 font-bold border-b border-slate-300 dark:border-surface-700">
                <th className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-700 w-16">
                  Sl.No.
                </th>
                <th className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-700 w-20">
                  Semester
                </th>
                <th className="py-2.5 px-4 border-r border-slate-200 dark:border-surface-700 w-56">
                  Subject Part
                </th>
                <th className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-700 w-28">
                  Subject Code
                </th>
                <th className="py-2.5 px-4 border-r border-slate-200 dark:border-surface-700">
                  Subject Desc
                </th>
                <th className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-700 w-16">
                  Credit
                </th>
                <th className="py-2.5 px-3 w-24">
                  Group
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-700 dark:text-slate-200">
              {registeredCourses.map((row) => (
                <tr
                  key={row.sno}
                  className="hover:bg-slate-50 dark:hover:bg-surface-800/40 transition-colors"
                >
                  <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800 text-slate-600 dark:text-slate-400">
                    {row.sno}
                  </td>
                  <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                    {row.semester}
                  </td>
                  <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800">
                    {row.subjectPart}
                  </td>
                  <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800 text-slate-900 dark:text-white">
                    {row.code}
                  </td>
                  <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800 uppercase text-slate-900 dark:text-white">
                    {row.desc}
                  </td>
                  <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                    {row.credit}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-600 dark:text-slate-400">
                    {row.group}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Details & Utility Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-2">
        <span className="font-semibold">
          Total Registered Credits for Semester 5: <strong className="text-slate-900 dark:text-white">{totalCredits}</strong>
        </span>
        <button
          onClick={() => window.print()}
          className="mt-2 sm:mt-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-semibold shadow-sm transition-colors"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" /> Print Registration Slip
        </button>
      </div>
    </div>
  );
};

export default StudentCourseRegistration;
