import React, { useState } from 'react';
import { Award, CheckCircle2, FileText, Check, X, Search } from 'lucide-react';

const FacultySAP = () => {
  const [activeTab, setActiveTab] = useState('registration-approvals'); // 'registration-approvals' | 'allocation' | 'grade-management'
  const [successMsg, setSuccessMsg] = useState('');

  const [registrations, setRegistrations] = useState([
    { id: 'REG-001', student: 'Rahul Kumar', regNo: 'EN2024CS042', course: 'CSE 401 - DISTRIBUTED CLOUD ARCHITECTURE', type: 'Professional Elective', credits: 3, cgpa: 8.98, status: 'PENDING' },
    { id: 'REG-002', student: 'Ananya Deshmukh', regNo: 'EN2024CS019', course: 'CSE 401 - DISTRIBUTED CLOUD ARCHITECTURE', type: 'Professional Elective', credits: 3, cgpa: 9.42, status: 'APPROVED' },
    { id: 'REG-003', student: 'Rohan Gupta', regNo: 'EN2024CS055', course: 'EGL 256 - DECODING LANGUAGE', type: 'Open Elective', credits: 3, cgpa: 7.20, status: 'PENDING' },
    { id: 'REG-004', student: 'Siddharth Verma', regNo: 'EN2024CS104', course: 'CSE 401 - DISTRIBUTED CLOUD ARCHITECTURE', type: 'Professional Elective', credits: 3, cgpa: 6.12, status: 'PENDING' },
  ]);

  const handleApprove = (id) => {
    setRegistrations(registrations.map((r) => (r.id === id ? { ...r, status: 'APPROVED' } : r)));
    setSuccessMsg('Course registration approved and credits validated!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleReject = (id) => {
    setRegistrations(registrations.map((r) => (r.id === id ? { ...r, status: 'REJECTED' } : r)));
    setSuccessMsg('Course registration rejected with advisory note.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          SAP & ACADEMIC RECORDS ADVISORY
        </h1>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Student Course Registration Verification, Elective Endorsement & Academic Progression
        </p>
      </div>

      {successMsg && (
        <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          {successMsg}
        </div>
      )}

      {/* 3. Sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-300 dark:border-surface-700 pb-1">
        <button
          onClick={() => setActiveTab('registration-approvals')}
          className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
            activeTab === 'registration-approvals'
              ? 'bg-[#1f3a52] text-white'
              : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Course Registration Approvals ({registrations.filter((r) => r.status === 'PENDING').length} Pending)
        </button>
        <button
          onClick={() => setActiveTab('allocation')}
          className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
            activeTab === 'allocation'
              ? 'bg-[#1f3a52] text-white'
              : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Subject Allocation Summary
        </button>
      </div>

      {/* TAB 1: Registration Approvals */}
      {activeTab === 'registration-approvals' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32">Register No.</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Student Name</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Requested Elective / Course</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-36">Category</th>
                  <th className="py-2.5 px-2 border-r border-slate-400 w-16 text-center">Credits</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">CGPA</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">Status</th>
                  <th className="py-2.5 px-3 w-36 text-center">Advisory Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {reg.regNo}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {reg.student}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-brand-700 dark:text-brand-300 border-r border-slate-200 dark:border-surface-800">
                      {reg.course}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {reg.type}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                      {reg.credits}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold border-r border-slate-200 dark:border-surface-800">
                      {reg.cgpa}
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          reg.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : reg.status === 'REJECTED'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {reg.status === 'PENDING' ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleApprove(reg.id)}
                            className="p-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white"
                            title="Approve Course"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleReject(reg.id)}
                            className="p-1 rounded bg-rose-600 hover:bg-rose-700 text-white"
                            title="Reject Course"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-medium">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Allocation */}
      {activeTab === 'allocation' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 p-5 shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
            Department Faculty Teaching Allocation Matrix
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Total Teaching Load: 12 Contact Hours / Week • Dean Approved Ratio: 1:15 Faculty-Student ratio.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-surface-800 border rounded space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b">
              <span className="font-bold">CSE 302 - OPERATING SYSTEMS</span>
              <span className="font-mono text-emerald-700 font-bold">4 Hours/Wk • 68 Students</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="font-bold">CSE 305 - COMPUTER ORGANIZATION AND ARCHITECTURE</span>
              <span className="font-mono text-emerald-700 font-bold">4 Hours/Wk • 64 Students</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-bold">CSE 401 - DISTRIBUTED CLOUD ARCHITECTURE</span>
              <span className="font-mono text-emerald-700 font-bold">3 Hours/Wk • 52 Students</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultySAP;

