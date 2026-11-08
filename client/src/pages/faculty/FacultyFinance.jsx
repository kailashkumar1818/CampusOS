import React, { useState } from 'react';
import { Download, Printer, Plus, DollarSign, CheckCircle2, FileText } from 'lucide-react';
import Modal from '../../components/common/Modal';

const FacultyFinance = () => {
  const [activeTab, setActiveTab] = useState('slips'); // 'slips' | 'reimbursements' | 'salary-structure'
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState('');

  const salarySlips = [
    { slipNo: 'PAY-2026-10', month: 'October 2026', gross: '₹ 1,35,000.00', deductions: '₹ 14,200.00', net: '₹ 1,20,800.00', bankRef: 'SBI-SAL-902194', status: 'CREDITED' },
    { slipNo: 'PAY-2026-09', month: 'September 2026', gross: '₹ 1,35,000.00', deductions: '₹ 14,200.00', net: '₹ 1,20,800.00', bankRef: 'SBI-SAL-884012', status: 'CREDITED' },
    { slipNo: 'PAY-2026-08', month: 'August 2026', gross: '₹ 1,35,000.00', deductions: '₹ 14,200.00', net: '₹ 1,20,800.00', bankRef: 'SBI-SAL-719203', status: 'CREDITED' },
  ];

  const reimbursements = [
    { claimId: 'CLM-2026-018', category: 'IEEE International Conference Travel Grant', amount: '₹ 18,500.00', date: '15-Oct-2026', status: 'SANCTIONED & DISBURSED' },
    { claimId: 'CLM-2026-031', category: 'Doctoral Viva-Voce External Refreshments & Contingency', amount: '₹ 3,450.00', date: '28-Oct-2026', status: 'UNDER AUDIT REVIEW' },
  ];

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    setClaimSuccess('Reimbursement claim lodged with Finance Accounts Branch!');
    setShowClaimModal(false);
    setTimeout(() => setClaimSuccess(''), 4000);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          FACULTY PAYROLL & FINANCIAL REIMBURSEMENT
        </h1>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Office of Finance Officer & Payroll Branch • Salary Payslips, Form 16 & Institutional Grants
        </p>
      </div>

      {claimSuccess && (
        <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          {claimSuccess}
        </div>
      )}

      {/* 3. Sub-tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 dark:border-surface-700 pb-1">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('slips')}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === 'slips'
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Salary Slips ({salarySlips.length})
          </button>
          <button
            onClick={() => setActiveTab('reimbursements')}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === 'reimbursements'
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Reimbursement Claims ({reimbursements.length})
          </button>
          <button
            onClick={() => setActiveTab('salary-structure')}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === 'salary-structure'
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            7th CPC Pay Matrix Scale
          </button>
        </div>

        <button
          onClick={() => setShowClaimModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-bold shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Submit Reimbursement Claim
        </button>
      </div>

      {/* TAB 1: Salary Slips */}
      {activeTab === 'slips' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32">Payslip Ref No.</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Pay Period Month</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-right font-mono">Gross Pay</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-right font-mono">Total Deductions</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32 text-right font-mono">Net Disbursed</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Bank Disbursement Ref</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">Status</th>
                  <th className="py-2.5 px-3 w-28 text-center">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {salarySlips.map((sl) => (
                  <tr key={sl.slipNo} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {sl.slipNo}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {sl.month}
                    </td>
                    <td className="py-2.5 px-3 text-right border-r border-slate-200 dark:border-surface-800 font-mono">
                      {sl.gross}
                    </td>
                    <td className="py-2.5 px-3 text-right text-rose-600 border-r border-slate-200 dark:border-surface-800 font-mono">
                      {sl.deductions}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700 dark:text-emerald-400 border-r border-slate-200 dark:border-surface-800 font-mono text-xs">
                      {sl.net}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-[10px] text-slate-500 border-r border-slate-200 dark:border-surface-800">
                      {sl.bankRef}
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {sl.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => alert(`Downloading verified institutional payslip PDF: ${sl.slipNo}`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-[10px] font-bold shadow-sm"
                      >
                        <Download className="w-3 h-3" /> Payslip PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Reimbursements */}
      {activeTab === 'reimbursements' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32">Claim ID</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Reimbursement Component</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32 text-right font-mono">Claimed Amount</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Submission Date</th>
                  <th className="py-2.5 px-3 w-44 text-center">Finance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {reimbursements.map((r) => (
                  <tr key={r.claimId} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {r.claimId}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {r.category}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700 border-r border-slate-200 dark:border-surface-800 font-mono">
                      {r.amount}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {r.date}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Salary Structure */}
      {activeTab === 'salary-structure' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
            Faculty Compensation & UGC 7th Pay Matrix Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="border rounded p-3 space-y-1">
              <span className="font-bold text-emerald-700">Earnings Components (Monthly):</span>
              <div className="flex justify-between py-1 border-b"><span>Basic Pay (Academic Level 13A):</span><strong>₹ 1,02,800.00</strong></div>
              <div className="flex justify-between py-1 border-b"><span>Dearness Allowance (DA @ 50%):</span><strong>₹ 51,400.00</strong></div>
              <div className="flex justify-between py-1 border-b"><span>House Rent Allowance (HRA @ 27%):</span><strong>₹ 27,756.00</strong></div>
              <div className="flex justify-between py-1"><span>Transport Allowance (TA + DA):</span><strong>₹ 10,800.00</strong></div>
            </div>
            <div className="border rounded p-3 space-y-1">
              <span className="font-bold text-rose-700">Statutory Deductions:</span>
              <div className="flex justify-between py-1 border-b"><span>National Pension Scheme (NPS Tier 1):</span><strong>₹ 15,420.00</strong></div>
              <div className="flex justify-between py-1 border-b"><span>Income Tax (TDS Deduction):</span><strong>₹ 12,000.00</strong></div>
              <div className="flex justify-between py-1 border-b"><span>University Health Scheme:</span><strong>₹ 1,500.00</strong></div>
              <div className="flex justify-between py-1"><span>Professional Tax:</span><strong>₹ 200.00</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* Reimbursement Modal */}
      {showClaimModal && (
        <Modal
          isOpen={showClaimModal}
          onClose={() => setShowClaimModal(false)}
          title="Submit Academic Reimbursement Claim"
        >
          <form onSubmit={handleClaimSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Claim Category
              </label>
              <select className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800">
                <option>Conference Registration / Travel Grant</option>
                <option>Doctoral Viva-Voce Hospitality Expenses</option>
                <option>Book Publication / Patent Filing Reimbursement</option>
                <option>Software Tool Subscription / Cloud Credits</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Amount Claimed (₹)
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 15000"
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Attach Bill Vouchers & Invoices (PDF)
              </label>
              <input
                type="file"
                required
                accept=".pdf,.zip"
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowClaimModal(false)}
                className="px-3 py-1.5 rounded border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white font-bold"
              >
                Submit Voucher to Accounts
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default FacultyFinance;

