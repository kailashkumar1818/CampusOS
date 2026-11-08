import React, { useState } from 'react';
import Modal from '../../components/common/Modal';

const StudentODML = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [activityType, setActivityType] = useState('OD with Present');
  const [description, setDescription] = useState('');

  const [records, setRecords] = useState([
    {
      fromDate: '29-09-2026',
      toDate: '29-09-2026',
      activityType: 'OD with Present',
      noOfDays: 1,
      description: 'ISC - Player',
    },
    {
      fromDate: '12-08-2026',
      toDate: '12-08-2026',
      activityType: 'OD with Present',
      noOfDays: 1,
      description: 'Microsoft',
    },
  ]);

  const handleApply = (e) => {
    e.preventDefault();
    if (!fromDate || !description) return;
    const newEntry = {
      fromDate,
      toDate: toDate || fromDate,
      activityType,
      noOfDays: 1,
      description,
    };
    setRecords([newEntry, ...records]);
    setShowApplyModal(false);
    setDescription('');
    setFromDate('');
    setToDate('');
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* Title strictly matching reference Image 4 */}
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-[17px] font-bold text-[#1b2b4d] dark:text-sky-300 tracking-wide uppercase">
          OD / ML DETAILS
        </h1>
        <button
          onClick={() => setShowApplyModal(true)}
          className="px-3.5 py-1.5 rounded-md bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-semibold shadow-sm transition-colors"
        >
          + Apply for OD / ML
        </button>
      </div>

      {/* Table matching reference Image 4 */}
      <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                <th className="py-2.5 px-4 border-r border-slate-400 w-36">
                  From Date
                </th>
                <th className="py-2.5 px-4 border-r border-slate-400 w-36">
                  To Date
                </th>
                <th className="py-2.5 px-4 border-r border-slate-400 w-48">
                  Activity Type
                </th>
                <th className="py-2.5 px-4 border-r border-slate-400 w-28 text-center">
                  No.of Days
                </th>
                <th className="py-2.5 px-4">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
              {records.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors"
                >
                  <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800">
                    {row.fromDate}
                  </td>
                  <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800">
                    {row.toDate}
                  </td>
                  <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800 text-slate-900 dark:text-white">
                    {row.activityType}
                  </td>
                  <td className="py-2.5 px-4 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                    {row.noOfDays}
                  </td>
                  <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <Modal
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
          title="Apply for OD / ML Requisition"
        >
          <form onSubmit={handleApply} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Activity Type
              </label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-surface-700 rounded-md bg-white dark:bg-surface-800"
              >
                <option value="OD with Present">OD with Present (On-Duty Attendance Credit)</option>
                <option value="Medical Leave (ML)">Medical Leave (ML Approval)</option>
                <option value="Inter-Collegiate Symposium">Inter-Collegiate Symposium / Hackathon</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  required
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-surface-700 rounded-md bg-white dark:bg-surface-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  required
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-surface-700 rounded-md bg-white dark:bg-surface-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Event / Medical Description
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Smart India Hackathon participation / Hospital prescription reference"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-surface-700 rounded-md bg-white dark:bg-surface-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="px-3 py-1.5 text-xs rounded border border-slate-300 text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white font-semibold"
              >
                Submit Requisition
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default StudentODML;
