import React, { useState } from 'react';
import { Download, ChevronRight } from 'lucide-react';

const StudentWiseSubjects = () => {
  const [selectedSem, setSelectedSem] = useState(5);
  const [showEarlierModal, setShowEarlierModal] = useState(false);

  const subjectsSem5 = [
    { sem: 5, code: 'EGL 256', description: 'DECODING LANGUAGE', credit: 3, group: '' },
    { sem: 5, code: 'CSE 302', description: 'OPERATING SYSTEMS', credit: 4, group: '' },
    { sem: 5, code: 'CSE 303', description: 'MACHINE LEARNING', credit: 4, group: '' },
    { sem: 5, code: 'CSE 305', description: 'COMPUTER ORGANIZATION AND ARCHITECTURE', credit: 4, group: '' },
    { sem: 5, code: 'CSE 309', description: 'ADVANCED JAVA PROGRAMMING', credit: 4, group: '' },
    { sem: 5, code: 'VAC 108J', description: 'CO-CURRICULAR - CARROM', credit: 0, group: '' },
    { sem: 5, code: 'CSE 308', description: 'SUMMER INTERNSHIP', credit: 4, group: '' },
    { sem: 5, code: 'SEC 303', description: 'DEVOPS - RHCSA', credit: 2, group: '' },
  ];

  const earlierSubjects = [
    { sem: 4, code: 'CSE 204', description: 'DESIGN AND ANALYSIS OF ALGORITHMS', credit: 4, group: '' },
    { sem: 4, code: 'CSE 205', description: 'DATABASE MANAGEMENT SYSTEMS', credit: 4, group: '' },
    { sem: 4, code: 'MAT 202', description: 'PROBABILITY AND QUEUEING THEORY', credit: 4, group: '' },
    { sem: 3, code: 'CSE 201', description: 'DATA STRUCTURES USING C++', credit: 4, group: '' },
    { sem: 3, code: 'MAT 201', description: 'DISCRETE MATHEMATICAL STRUCTURES', credit: 4, group: '' },
    { sem: 2, code: 'PHY 101', description: 'ENGINEERING PHYSICS', credit: 3, group: '' },
    { sem: 1, code: 'CSE 101', description: 'PROBLEM SOLVING AND PYTHON PROGRAMMING', credit: 4, group: '' },
  ];

  const currentList = selectedSem === 5 ? subjectsSem5 : earlierSubjects;

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* Title strictly matching reference Image 1 */}
      <div className="pt-1">
        <h1 className="text-[17px] font-bold text-[#1b2b4d] dark:text-sky-300 tracking-wide font-sans uppercase">
          STUDENT WISE SUBJECTS
        </h1>
      </div>

      {/* Formal Bordered Table matching Image 1 */}
      <div className="border border-slate-300 dark:border-surface-700 rounded-lg overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800/80 text-[#1b2b4d] dark:text-slate-200 font-bold">
                <th className="py-2.5 px-4 font-bold border-r border-slate-200 dark:border-surface-700 w-24">
                  Semester
                </th>
                <th className="py-2.5 px-4 font-bold border-r border-slate-200 dark:border-surface-700 w-36">
                  Code
                </th>
                <th className="py-2.5 px-4 font-bold border-r border-slate-200 dark:border-surface-700">
                  Description
                </th>
                <th className="py-2.5 px-4 font-bold border-r border-slate-200 dark:border-surface-700 w-24">
                  Credit
                </th>
                <th className="py-2.5 px-4 font-bold w-24">
                  Group
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[12px] text-slate-700 dark:text-slate-200">
              {currentList.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors"
                >
                  <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-700">
                    {item.sem}
                  </td>
                  <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-700 text-slate-900 dark:text-white">
                    {item.code}
                  </td>
                  <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-700 uppercase">
                    {item.description}
                  </td>
                  <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-700">
                    {item.credit}
                  </td>
                  <td className="py-2.5 px-4 font-medium">
                    {item.group}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Button matching the Cyan/Teal button in Image 1 */}
      <div className="pt-2">
        <button
          onClick={() => {
            if (selectedSem === 5) {
              setSelectedSem(0); // View all earlier
            } else {
              setSelectedSem(5);
            }
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#2ba2c5] hover:bg-[#258fae] active:bg-[#1f7c97] text-white text-xs font-semibold shadow-sm transition-colors"
        >
          {selectedSem === 5 ? 'View earlier semester subjects' : 'View current semester (Sem 5) subjects'}
        </button>
      </div>
    </div>
  );
};

export default StudentWiseSubjects;
