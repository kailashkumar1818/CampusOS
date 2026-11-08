import React, { useState } from 'react';
import { Calendar, Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Modal from '../../components/common/Modal';

const FacultyLeaves = () => {
  const [activeTab, setActiveTab] = useState('apply'); // 'apply' | 'history' | 'biometric'
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [leaveSuccess, setLeaveSuccess] = useState('');

  const leaveBalances = [
    { type: 'Casual Leave (CL)', allocated: 12, consumed: 4, balance: 8 },
    { type: 'Medical Leave (ML)', allocated: 15, consumed: 2, balance: 13 },
    { type: 'On-Duty Leave (OD - Conference/Evaluation)', allocated: 14, consumed: 6, balance: 8 },
    { type: 'Earned Leave (EL)', allocated: 30, consumed: 5, balance: 25 },
  ];

  const leaveHistory = [
    { reqId: 'LV-2026-091', type: 'Casual Leave (CL)', from: '14-Oct-2026', to: '15-Oct-2026', days: 2, reason: 'Family Function & Personal Work', substitute: 'Dr. Anirban Bhar (Handled CSE 302)', status: 'APPROVED' },
    { reqId: 'LV-2026-042', type: 'On-Duty (OD)', from: '25-Sep-2026', to: '26-Sep-2026', days: 2, reason: 'Doctoral Defense External Examiner at Anna University', substitute: 'Self Pre-scheduled', status: 'APPROVED' },
    { reqId: 'LV-2026-011', type: 'Medical Leave (ML)', from: '10-Aug-2026', to: '11-Aug-2026', days: 2, reason: 'Viral Flu Treatment', substitute: 'Ms. Chintalapudi V N U', status: 'APPROVED' },
  ];

  const biometricAttendance = [
    { date: '05-Nov-2026', day: 'Thursday', inTime: '08:48 AM', outTime: '04:55 PM', hours: '8h 07m', status: 'PRESENT' },
    { date: '04-Nov-2026', day: 'Wednesday', inTime: '08:52 AM', outTime: '05:10 PM', hours: '8h 18m', status: 'PRESENT' },
    { date: '03-Nov-2026', day: 'Tuesday', inTime: '08:45 AM', outTime: '04:45 PM', hours: '8h 00m', status: 'PRESENT' },
    { date: '02-Nov-2026', day: 'Monday', inTime: '08:50 AM', outTime: '05:02 PM', hours: '8h 12m', status: 'PRESENT' },
  ];

  const handleApply = (e) => {
    e.preventDefault();
    setLeaveSuccess('Leave application lodged with Head of Department for formal endorsement!');
    setShowApplyModal(false);
    setTimeout(() => setLeaveSuccess(''), 4000);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          FACULTY LEAVE MANAGEMENT & BIOMETRIC ATTENDANCE
        </h1>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Office of Registrar & Human Resource Division • Statutory Leave Quotas & Punch Logs
        </p>
      </div>

      {leaveSuccess && (
        <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          {leaveSuccess}
        </div>
      )}

      {/* Leave Balances Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {leaveBalances.map((b) => (
          <div key={b.type} className="p-3 bg-white dark:bg-surface-900 border border-slate-300 dark:border-surface-700 rounded shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">{b.type}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-bold font-mono text-[#1f3a52] dark:text-sky-300">{b.balance} Days Left</span>
              <span className="text-[10px] text-slate-500 font-medium">({b.consumed} Consumed / {b.allocated})</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Sub-tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 dark:border-surface-700 pb-1">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('apply')}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === 'apply'
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Leave History & Status ({leaveHistory.length})
          </button>
          <button
            onClick={() => setActiveTab('biometric')}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === 'biometric'
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Biometric Punch Logs
          </button>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-bold shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Apply for Leave
        </button>
      </div>

      {/* TAB 1: Leave History */}
      {activeTab === 'apply' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32">Requisition ID</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-36">Leave Category</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">From Date</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">To Date</th>
                  <th className="py-2.5 px-2 border-r border-slate-400 w-16 text-center">Days</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Reason Description</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Class Substitute Arrangement</th>
                  <th className="py-2.5 px-3 w-28 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {leaveHistory.map((lh) => (
                  <tr key={lh.reqId} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {lh.reqId}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-brand-700 dark:text-brand-300 border-r border-slate-200 dark:border-surface-800">
                      {lh.type}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {lh.from}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {lh.to}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                      {lh.days}
                    </td>
                    <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800">
                      {lh.reason}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {lh.substitute}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                        {lh.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Biometric */}
      {activeTab === 'biometric' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Date</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Day</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32 font-mono">In Punch</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32 font-mono">Out Punch</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32 font-mono text-center">Total Working Hours</th>
                  <th className="py-2.5 px-3 w-28 text-center">Biometric Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {biometricAttendance.map((b, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {b.date}
                    </td>
                    <td className="py-2.5 px-3 font-semibold border-r border-slate-200 dark:border-surface-800">
                      {b.day}
                    </td>
                    <td className="py-2.5 px-3 font-bold border-r border-slate-200 dark:border-surface-800 text-emerald-700">
                      {b.inTime}
                    </td>
                    <td className="py-2.5 px-3 font-bold border-r border-slate-200 dark:border-surface-800 text-slate-900 dark:text-white">
                      {b.outTime}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold font-mono border-r border-slate-200 dark:border-surface-800">
                      {b.hours}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <Modal
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
          title="Faculty Leave Application"
        >
          <form onSubmit={handleApply} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Leave Type
              </label>
              <select className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800">
                <option>Casual Leave (CL)</option>
                <option>Medical Leave (ML)</option>
                <option>On-Duty Leave (OD - Conference / University Duty)</option>
                <option>Earned Leave (EL)</option>
                <option>Sabbatical Research Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Class Substitute Faculty Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Anirban Bhar (agreed to take 5th Sem OS lecture)"
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Reason / Justification
              </label>
              <textarea
                required
                rows={2}
                placeholder="Provide reasons for statutory approval..."
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="px-3 py-1.5 rounded border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white font-bold"
              >
                Submit to HoD
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default FacultyLeaves;

