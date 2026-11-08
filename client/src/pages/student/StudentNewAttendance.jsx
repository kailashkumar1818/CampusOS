import React, { useState } from 'react';

const StudentNewAttendance = () => {
  const [dayOrder] = useState('Thursday');
  const [attendanceCode, setAttendanceCode] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const [todayRecords, setTodayRecords] = useState([
    {
      date: '05-11-2026',
      dayOrder: 'Thursday',
      hour: 8,
      subject: 'CSE 309 ADVANCED JAVA PROGRAMMING',
      status: 'P',
    },
    {
      date: '05-11-2026',
      dayOrder: 'Thursday',
      hour: 7,
      subject: 'CSE 303 MACHINE LEARNING',
      status: 'P',
    },
    {
      date: '05-11-2026',
      dayOrder: 'Thursday',
      hour: 6,
      subject: 'SEC 303 DEVOPS - RHCSA',
      status: 'P',
    },
    {
      date: '05-11-2026',
      dayOrder: 'Thursday',
      hour: 5,
      subject: 'SEC 303 DEVOPS - RHCSA',
      status: 'P',
    },
    {
      date: '05-11-2026',
      dayOrder: 'Thursday',
      hour: 2,
      subject: 'CSE 302 OPERATING SYSTEMS',
      status: 'P',
    },
    {
      date: '05-11-2026',
      dayOrder: 'Thursday',
      hour: 1,
      subject: 'CSE 302 OPERATING SYSTEMS',
      status: 'P',
    },
  ]);

  const handleSubmitCode = (e) => {
    e.preventDefault();
    const trimmed = attendanceCode.trim().toUpperCase();

    // Format validation: First Alphabet and next Six Numbers (e.g., A123456)
    const codeRegex = /^[A-Z][0-9]{6}$/;
    if (!codeRegex.test(trimmed)) {
      setMessage({
        text: 'Invalid Code format. Must be First Alphabet and next Six Numbers (e.g. A123456).',
        type: 'error',
      });
      return;
    }

    setMessage({
      text: `Attendance successfully marked for slot with code ${trimmed}!`,
      type: 'success',
    });
    setAttendanceCode('');
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Top Input Card matching Image 5 */}
      <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
        <form onSubmit={handleSubmitCode} className="divide-y divide-slate-200 dark:divide-surface-800 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 py-3 px-4 items-center">
            <div className="md:col-span-3 font-semibold text-slate-800 dark:text-slate-200">
              Day Order
            </div>
            <div className="md:col-span-9 font-medium text-slate-900 dark:text-white">
              {dayOrder}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 py-3 px-4 items-center">
            <div className="md:col-span-3 font-semibold text-slate-800 dark:text-slate-200">
              Attendance Code
            </div>
            <div className="md:col-span-9 flex flex-wrap items-center gap-2">
              <input
                type="text"
                maxLength={7}
                placeholder="e.g. A123456"
                value={attendanceCode}
                onChange={(e) => setAttendanceCode(e.target.value.toUpperCase())}
                className="w-48 px-2.5 py-1 text-xs border border-slate-400 dark:border-surface-600 rounded bg-white dark:bg-surface-800 font-mono focus:outline-none focus:ring-1 focus:ring-[#2ba2c5]"
              />
              <span className="text-[11px] text-slate-600 dark:text-slate-400">
                (First Alphabet and next Six Numbers)
              </span>
            </div>
          </div>

          <div className="py-2.5 px-4 bg-slate-50/50 dark:bg-surface-800/30">
            <button
              type="submit"
              className="px-4 py-1.5 rounded-md bg-[#2ba2c5] hover:bg-[#258fae] active:bg-[#1f7c97] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {message.text && (
        <div
          className={`p-3 rounded text-xs font-semibold ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300'
              : 'bg-rose-50 text-rose-800 border border-rose-300 dark:bg-rose-950/40 dark:text-rose-300'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* 2. Navy Bar Header: Online Attendance */}
      <div className="bg-[#1f3a52] text-white py-2 px-4 rounded-t-sm shadow-sm">
        <h2 className="text-xs font-bold tracking-wide">
          Online Attendance
        </h2>
      </div>

      {/* 3. Navy Bar Header: Today Attendance */}
      <div className="bg-[#1f3a52] text-white py-2 px-4 shadow-sm -mt-2 border-t border-slate-500">
        <h3 className="text-xs font-bold tracking-wide">
          Today Attendance
        </h3>
      </div>

      {/* 4. Table matching Image 5 */}
      <div className="border border-slate-300 dark:border-surface-700 rounded-b-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm -mt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                <th className="py-2.5 px-4 border-r border-slate-400 w-36">
                  Date
                </th>
                <th className="py-2.5 px-4 border-r border-slate-400 w-36">
                  Day Order
                </th>
                <th className="py-2.5 px-4 border-r border-slate-400 w-24 text-center">
                  Hour
                </th>
                <th className="py-2.5 px-4 border-r border-slate-400">
                  Subject
                </th>
                <th className="py-2.5 px-4 w-20 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
              {todayRecords.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors"
                >
                  <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800">
                    {item.date}
                  </td>
                  <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800">
                    {item.dayOrder}
                  </td>
                  <td className="py-2.5 px-4 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                    {item.hour}
                  </td>
                  <td className="py-2.5 px-4 font-semibold border-r border-slate-200 dark:border-surface-800 text-slate-900 dark:text-white">
                    {item.subject}
                  </td>
                  <td className="py-2.5 px-4 text-center font-bold text-slate-900 dark:text-white">
                    {item.status}
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

export default StudentNewAttendance;

