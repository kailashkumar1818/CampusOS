import React from 'react';

const StudentTimetable = () => {
  const timeSlots = [
    { num: 1, time: '09:00 To 09:50' },
    { num: 2, time: '10:00 To 10:50' },
    { num: 3, time: '11:00 To 11:50' },
    { num: 4, time: '12:00 To 12:50' },
    { num: 5, time: '01:00 To 01:50' },
    { num: 6, time: '02:00 To 02:50' },
    { num: 7, time: '03:00 To 03:50' },
    { num: 8, time: '04:00 To 05:30' },
  ];

  const schedule = [
    {
      day: 'Monday',
      slots: {
        1: 'CSE 305(C 903)',
        2: 'CSE 305(C 903)',
        3: 'CSE 303(C 801)',
        4: 'CSE 303(C 801)',
        5: '',
        6: '',
        7: '',
        8: 'EGL 256(S 505)',
      },
    },
    {
      day: 'Tuesday',
      slots: {
        1: '',
        2: '',
        3: 'SEC 303(C 903)',
        4: 'SEC 303(C 903)',
        5: '',
        6: 'CSE 305(S 610)',
        7: 'CSE 305(S 610)',
        8: 'EGL 256(S 505)',
      },
    },
    {
      day: 'Wednesday',
      slots: {
        1: 'CSE 302(C 903)',
        2: '',
        3: 'CSE 303(C 903)',
        4: 'CSE 303(C 903)',
        5: '',
        6: '',
        7: '',
        8: '',
      },
    },
    {
      day: 'Thursday',
      slots: {
        1: 'CSE 302(C 903)',
        2: 'CSE 302(C 903)',
        3: '',
        4: '',
        5: 'SEC 303(C 903)',
        6: 'SEC 303(C 903)',
        7: 'CSE 303(C 903)',
        8: 'CSE 309(C 903)',
      },
    },
    {
      day: 'Friday',
      slots: {
        1: 'CSE 309(S 412)',
        2: 'CSE 309(S 412)',
        3: 'CSE 305(C 903)',
        4: '',
        5: 'CSE 302(V 604)',
        6: 'CSE 302(V 604)',
        7: 'CSE 309(C 903)',
        8: 'CSE 309(C 903)',
      },
    },
    {
      day: 'Saturday',
      slots: {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
      },
    },
  ];

  const subjectDetails = [
    {
      code: 'CSE 302',
      name: 'OPERATING SYSTEMS',
      ltpc: '3-0-1-4',
      faculty: 'Dr. Yandrapi Prakash Babu ( 25257 ), Ms. Chintalapudi V N U Bharathi Murthy ( 25234 )',
      room: '(C 903),(V 604)',
    },
    {
      code: 'CSE 303',
      name: 'MACHINE LEARNING',
      ltpc: '3-0-1-4',
      faculty: 'Dr. Boddu L V Siva Rama Krishna ( 23150 ), Dr. Prasanthi Boyapati ( 22248 )',
      room: '(C 801),(C 903)',
    },
    {
      code: 'CSE 305',
      name: 'COMPUTER ORGANIZATION AND ARCHITECTURE',
      ltpc: '3-0-1-4',
      faculty: 'Dr. Anirban Bhar ( 23082 ), Dr. Kakumani K C Deepthi ( 22226 )',
      room: '(C 903),(S 610)',
    },
    {
      code: 'CSE 309',
      name: 'ADVANCED JAVA PROGRAMMING',
      ltpc: '3-0-1-4',
      faculty: 'Dr. Koyel Mandal ( 26095 ), Mr. Krishnendu Saha ( 26396 )',
      room: '(C 903),(S 412)',
    },
    {
      code: 'EGL 256',
      name: 'DECODING LANGUAGE',
      ltpc: '3-0-0-3',
      faculty: 'Dr. Srabani Basu ( 18007 )',
      room: '(S 505)',
    },
    {
      code: 'SEC 303',
      name: 'DEVOPS - RHCSA',
      ltpc: '0-0-2-2',
      faculty: 'Mr. ISES00009 ( V00009 )',
      room: '(C 903)',
    },
  ];

  return (
    <div className="space-y-6 font-sans text-slate-800 dark:text-slate-100">
      {/* Title */}
      <div className="pt-1">
        <h1 className="text-[17px] font-bold text-[#1b2b4d] dark:text-sky-300 tracking-wide uppercase">
          TIME TABLE
        </h1>
      </div>

      {/* 1. Schedule Matrix Table (Matching Image 2) */}
      <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse text-[11px]">
            <thead>
              {/* Row 1: Slot Numbers */}
              <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                <th className="py-2 px-3 border-r border-slate-400 w-24"></th>
                {timeSlots.map((slot) => (
                  <th key={slot.num} className="py-1 px-2 border-r border-slate-400 font-bold">
                    {slot.num}
                  </th>
                ))}
              </tr>
              {/* Row 2: Slot Timings */}
              <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                <th className="py-2 px-3 border-r border-slate-400"></th>
                {timeSlots.map((slot) => (
                  <th key={slot.num} className="py-2 px-2 border-r border-slate-400 font-bold whitespace-nowrap text-[10px]">
                    {slot.time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.day} className="border-b border-slate-200 dark:border-surface-800">
                  <td className="py-2.5 px-3 font-bold bg-[#1f3a52] text-white text-left text-xs border-r border-slate-400">
                    {row.day}
                  </td>
                  {timeSlots.map((slot) => {
                    const content = row.slots[slot.num];
                    return (
                      <td
                        key={slot.num}
                        className={`py-2 px-1 border-r border-slate-200 dark:border-surface-800 font-bold text-[10px] ${
                          content
                            ? 'bg-[#e7f5fb] text-[#113149] dark:bg-sky-950/40 dark:text-sky-200'
                            : 'bg-white dark:bg-surface-900'
                        }`}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Subject Description Table (Matching Image 2) */}
      <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400 text-xs">
                <th className="py-2.5 px-4 border-r border-slate-400">
                  Subjects Description
                </th>
                <th className="py-2.5 px-4 border-r border-slate-400 w-24 text-center">
                  L-T-P-C
                </th>
                <th className="py-2.5 px-4 border-r border-slate-400">
                  Faculty Name
                </th>
                <th className="py-2.5 px-4 w-40">
                  Class Room Name
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
              {subjectDetails.map((sub, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50 dark:hover:bg-surface-800/40 transition-colors"
                >
                  <td className="py-2.5 px-4 font-semibold border-r border-slate-200 dark:border-surface-800 text-slate-900 dark:text-white">
                    <span className="font-bold text-[#1f3a52] dark:text-sky-300 mr-2">{sub.code}</span>
                    {sub.name}
                  </td>
                  <td className="py-2.5 px-4 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                    {sub.ltpc}
                  </td>
                  <td className="py-2.5 px-4 border-r border-slate-200 dark:border-surface-800">
                    {sub.faculty}
                  </td>
                  <td className="py-2.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                    {sub.room}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentTimetable;
