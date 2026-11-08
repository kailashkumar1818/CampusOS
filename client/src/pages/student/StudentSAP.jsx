import React, { useState } from 'react';
import { Download, Upload, CheckCircle2, AlertCircle, FileText, Globe } from 'lucide-react';

const StudentSAP = () => {
  const [activeTab, setActiveTab] = useState('process'); // 'process' | 'details' | 'attachments' | 'withdraw' | 'feedback'
  const [withdrawReason, setWithdrawReason] = useState('');
  const [withdrawSubmitted, setWithdrawSubmitted] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const eligibilityCriteria = [
    { param: 'Minimum Cumulative Grade Point Average (CGPA)', requirement: '8.50 on 10.00 scale', studentStatus: '8.98 (Eligible)' },
    { param: 'Standing Arrears / Active Academic Backlogs', requirement: 'NIL (Zero Active Backlogs)', studentStatus: '0 Arrears (Eligible)' },
    { param: 'Statutory Institutional Attendance Minimum', requirement: '>= 80% in all semesters', studentStatus: '84.6% (Eligible)' },
    { param: 'Passport Validity Requirement', requirement: 'Valid for min. 18 months from departure', studentStatus: 'Valid till Nov 2029 (Eligible)' },
    { param: 'English Language Benchmark (IELTS / TOEFL)', requirement: 'IELTS >= 7.0 or TOEFL iBT >= 95', studentStatus: 'IELTS 7.5 (Verified)' },
  ];

  const processStages = [
    { step: '01', stage: 'Institutional Online Registration & Nomination', timeline: '01-Aug To 15-Aug', status: 'COMPLETED' },
    { step: '02', stage: 'Academic Council & HoD Clearance Endorsement', timeline: '20-Aug To 25-Aug', status: 'COMPLETED' },
    { step: '03', stage: 'Partner University Dossier Submission', timeline: '01-Sep To 15-Sep', status: 'SHORTLISTED' },
    { step: '04', stage: 'Host University Interview & Offer Acceptance', timeline: '10-Oct To 20-Oct', status: 'IN PROGRESS' },
    { step: '05', stage: 'Student Exchange Visa (DS-2019 / Tier-4) Clearance', timeline: '15-Nov To 05-Dec', status: 'PENDING' },
    { step: '06', stage: 'Course Equivalence & Credit Transfer Sign-off', timeline: '10-Dec To 20-Dec', status: 'PENDING' },
  ];

  const partnerUniversities = [
    {
      code: 'SAP-NUS-01',
      name: 'NATIONAL UNIVERSITY OF SINGAPORE (NUS)',
      country: 'Singapore',
      rank: '#8 Global (QS)',
      seats: 4,
      waiver: '100% Tuition Waived',
      courses: 'B.Tech CSE / IT / ECE',
    },
    {
      code: 'SAP-UCB-02',
      name: 'UNIVERSITY OF CALIFORNIA, BERKELEY',
      country: 'United States',
      rank: '#10 Global (QS)',
      seats: 3,
      waiver: 'Partial Institutional Bursary',
      courses: 'B.Tech CSE / AI / Robotics',
    },
    {
      code: 'SAP-TUM-03',
      name: 'TECHNICAL UNIVERSITY OF MUNICH (TUM)',
      country: 'Germany',
      rank: '#28 Global (QS)',
      seats: 5,
      waiver: '100% Tuition Waived (DAAD Partner)',
      courses: 'B.Tech All Engineering Branches',
    },
    {
      code: 'SAP-KTH-04',
      name: 'KTH ROYAL INSTITUTE OF TECHNOLOGY',
      country: 'Sweden',
      rank: '#73 Global (QS)',
      seats: 6,
      waiver: '100% Tuition Waived',
      courses: 'B.Tech CSE / Mechanical / EEE',
    },
  ];

  const requiredDocuments = [
    {
      name: 'Official Semester 1-4 Consolidated Grade Transcript',
      mandatory: 'Yes',
      format: 'PDF (Max 5MB)',
      status: 'VERIFIED & SIGNED',
      date: '12-Aug-2026',
    },
    {
      name: 'Statement of Purpose (SOP) & Research Proposal',
      mandatory: 'Yes',
      format: 'PDF (Max 2MB)',
      status: 'APPROVED BY HOD',
      date: '18-Aug-2026',
    },
    {
      name: 'Two Confidential Letters of Recommendation (LoR)',
      mandatory: 'Yes',
      format: 'PDF (Institutional Letterhead)',
      status: 'UPLOADED BY REFEREES',
      date: '22-Aug-2026',
    },
    {
      name: 'Passport First & Last Page Scanned Copy',
      mandatory: 'Yes',
      format: 'Color PDF',
      status: 'VERIFIED',
      date: '10-Aug-2026',
    },
    {
      name: 'Financial Solvency Certificate / Bank Affidavit',
      mandatory: 'Mandatory for US/EU',
      format: 'Bank Attested PDF',
      status: 'PENDING EMBASSY INTERVIEW',
      date: 'Awaiting',
    },
  ];

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          SEMESTER ABROAD PROGRAM (SAP)
        </h1>
      </div>

      {/* 2. Gray Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Directorate of International Relations & Dual-Degree Academic Exchange
        </p>
      </div>

      {/* 3. Sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-300 dark:border-surface-700 pb-1">
        {[
          { id: 'process', label: 'SAP Process' },
          { id: 'details', label: 'Details' },
          { id: 'attachments', label: 'Attachments' },
          { id: 'withdraw', label: 'Withdraw' },
          { id: 'feedback', label: 'Feedback' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === tab.id
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SAP PROCESS */}
      {activeTab === 'process' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase mb-2">
              1. Institutional Eligibility Verification Check
            </h2>
            <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                    <th className="py-2.5 px-4 border-r border-slate-400">Parameter</th>
                    <th className="py-2.5 px-4 border-r border-slate-400">Statutory Benchmark</th>
                    <th className="py-2.5 px-4">Student Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                  {eligibilityCriteria.map((item, idx) => (
                    <tr key={idx} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                      <td className="py-2 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {item.param}
                      </td>
                      <td className="py-2 px-4 border-r border-slate-200 dark:border-surface-800">
                        {item.requirement}
                      </td>
                      <td className="py-2 px-4 font-bold text-emerald-700 dark:text-emerald-400">
                        {item.studentStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase mb-2">
              2. Semester Abroad Progression Roadmap (Academic Cycle 2026-2027)
            </h2>
            <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                    <th className="py-2.5 px-3 border-r border-slate-400 w-16 text-center">Step</th>
                    <th className="py-2.5 px-4 border-r border-slate-400">Stage Description</th>
                    <th className="py-2.5 px-4 border-r border-slate-400 w-44">Target Timeline</th>
                    <th className="py-2.5 px-3 w-36 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                  {processStages.map((st) => (
                    <tr key={st.step} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                      <td className="py-2 px-3 text-center font-mono font-bold border-r border-slate-200 dark:border-surface-800">
                        {st.step}
                      </td>
                      <td className="py-2 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {st.stage}
                      </td>
                      <td className="py-2 px-4 border-r border-slate-200 dark:border-surface-800">
                        {st.timeline}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            st.status === 'COMPLETED'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                              : st.status === 'SHORTLISTED' || st.status === 'IN PROGRESS'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-surface-800 dark:text-slate-300'
                          }`}
                        >
                          {st.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DETAILS */}
      {activeTab === 'details' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Code</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Partner University</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Country</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">QS Rank</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-20 text-center">Seats</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Scholarship / Fee Waiver</th>
                  <th className="py-2.5 px-4">Eligible Departments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {partnerUniversities.map((uni) => (
                  <tr key={uni.code} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {uni.code}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {uni.name}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {uni.country}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-center border-r border-slate-200 dark:border-surface-800 text-brand-700 dark:text-brand-300">
                      {uni.rank}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-center border-r border-slate-200 dark:border-surface-800">
                      {uni.seats}
                    </td>
                    <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800 text-emerald-700 dark:text-emerald-400">
                      {uni.waiver}
                    </td>
                    <td className="py-2.5 px-4 font-medium">
                      {uni.courses}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ATTACHMENTS */}
      {activeTab === 'attachments' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-4 border-r border-slate-400">Document Title</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">Required</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32">Format</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-44">Verification Status</th>
                  <th className="py-2.5 px-3 w-32 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {requiredDocuments.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {doc.name}
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800 font-bold text-slate-700 dark:text-slate-300">
                      {doc.mandatory}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-800">
                      {doc.format}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 dark:border-surface-800 font-medium text-emerald-700 dark:text-emerald-400">
                      {doc.status}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => alert(`Opening document preview for: ${doc.name}`)}
                        className="px-2.5 py-1 rounded bg-[#2ba2c5] hover:bg-[#258fae] active:bg-[#1f7c97] text-white text-[10px] font-bold shadow-sm transition-colors"
                      >
                        View / Upload
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: WITHDRAW */}
      {activeTab === 'withdraw' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
            Official Requisition for Withdrawal from Semester Abroad Nomination
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Please note that withdrawing post-nomination stage requires HoD and Dean endorsement to ensure normal campus semester seat re-allocation.
          </p>

          {withdrawSubmitted ? (
            <div className="p-3 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
              Your withdrawal requisition has been lodged. Ref ID: WTH-2026-0982. Academic coordinator will review within 48 hours.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setWithdrawSubmitted(true);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Reason for Cancellation / Withdrawal
                </label>
                <textarea
                  required
                  rows={3}
                  value={withdrawReason}
                  onChange={(e) => setWithdrawReason(e.target.value)}
                  placeholder="e.g. Inability to meet personal travel expenditure / Preference for domestic summer internship placement..."
                  className="w-full p-2.5 text-xs border border-slate-300 dark:border-surface-700 rounded bg-white dark:bg-surface-800"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-sm"
              >
                Submit Withdrawal Requisition
              </button>
            </form>
          )}
        </div>
      )}

      {/* TAB 5: FEEDBACK */}
      {activeTab === 'feedback' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
            SAP International Coordination Office Feedback
          </h2>
          {feedbackSent ? (
            <div className="p-3 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
              Thank you! Your feedback has been shared with the International Relations Desk.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFeedbackSent(true);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Guidance & Counseling Rating
                </label>
                <select className="w-full p-2 text-xs border border-slate-300 dark:border-surface-700 rounded bg-white dark:bg-surface-800">
                  <option>5 - Exceptional Support & Clear Roadmap</option>
                  <option>4 - Good and Timely Assistance</option>
                  <option>3 - Average Coordination</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Comments & Inquiries
                </label>
                <textarea
                  rows={3}
                  placeholder="Share your experience or query with the exchange counselors..."
                  className="w-full p-2.5 text-xs border border-slate-300 dark:border-surface-700 rounded bg-white dark:bg-surface-800"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-bold shadow-sm"
              >
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentSAP;
