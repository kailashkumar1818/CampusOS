import React, { useState } from 'react';
import { Award, FileText, Upload, Download, CheckCircle2, AlertCircle, BarChart3, Edit3 } from 'lucide-react';
import Modal from '../../components/common/Modal';

const FacultyExams = () => {
  const [activeTab, setActiveTab] = useState('internal-entry'); // 'internal-entry' | 'schedule' | 'papers' | 'publish' | 'analysis'
  const [selectedSubject, setSelectedSubject] = useState('CSE 302');
  const [saveSuccess, setSaveSuccess] = useState('');

  const [studentMarks, setStudentMarks] = useState([
    { regNo: 'EN2024CS042', name: 'Rahul Kumar', ct1: 23, ct2: 24, model: 47, lab: 48, status: 'VERIFIED' },
    { regNo: 'EN2024CS019', name: 'Ananya Deshmukh', ct1: 24, ct2: 25, model: 48, lab: 49, status: 'VERIFIED' },
    { regNo: 'EN2024CS055', name: 'Rohan Gupta', ct1: 18, ct2: 20, model: 38, lab: 42, status: 'ENTERED' },
    { regNo: 'EN2024CS089', name: 'Pooja Iyer', ct1: 22, ct2: 23, model: 45, lab: 47, status: 'VERIFIED' },
    { regNo: 'EN2024CS104', name: 'Siddharth Verma', ct1: 16, ct2: 17, model: 32, lab: 38, status: 'RETEST_RECOMMENDED' },
  ]);

  const examSchedules = [
    { code: 'CSE 302', name: 'OPERATING SYSTEMS', date: '01-Dec-2026', time: 'FN 09:30 AM - 12:30 PM', students: 68, hall: 'Hall-302, 303', invigilator: 'Dr. Robert Johnson' },
    { code: 'CSE 305', name: 'COMPUTER ORGANIZATION AND ARCHITECTURE', date: '05-Dec-2026', time: 'FN 09:30 AM - 12:30 PM', students: 64, hall: 'Hall-201, 202', invigilator: 'Dr. Robert Johnson' },
    { code: 'CSE 401', name: 'DISTRIBUTED CLOUD ARCHITECTURE', date: '12-Dec-2026', time: 'AN 01:30 PM - 04:30 PM', students: 52, hall: 'Seminar Hall 3', invigilator: 'Dr. Robert Johnson' },
  ];

  const questionPapers = [
    { code: 'CSE 302', exam: 'Cycle Test - 1', units: 'Unit 1 & 2', status: 'APPROVED BY HOD', deadline: 'Completed', file: 'qp_cse302_ct1.pdf' },
    { code: 'CSE 302', exam: 'Cycle Test - 2', units: 'Unit 3 & 4', status: 'APPROVED BY HOD', deadline: 'Completed', file: 'qp_cse302_ct2.pdf' },
    { code: 'CSE 302', exam: 'Model Examination', units: 'Full Syllabus (Unit 1 to 5)', status: 'SUBMITTED TO COE', deadline: '10-Nov-2026', file: 'qp_cse302_model.pdf' },
    { code: 'CSE 305', exam: 'Model Examination', units: 'Full Syllabus (Unit 1 to 5)', status: 'DRAFT IN PROGRESS', deadline: '15-Nov-2026', file: 'qp_cse305_draft.docx' },
  ];

  const handleMarkChange = (index, field, value) => {
    const updated = [...studentMarks];
    updated[index][field] = Number(value) || 0;
    setStudentMarks(updated);
  };

  const handleSaveMarks = () => {
    setSaveSuccess('Continuous assessment internal marks saved and submitted to Registry!');
    setTimeout(() => setSaveSuccess(''), 4000);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          FACULTY EXAMINATION & EVALUATION PORTAL
        </h1>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Office of Controller of Examinations (CoE) • Marks Entry, Paper Setting & Result Analytics
        </p>
      </div>

      {saveSuccess && (
        <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          {saveSuccess}
        </div>
      )}

      {/* 3. Sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-300 dark:border-surface-700 pb-1">
        {[
          { id: 'internal-entry', label: 'Enter Student Marks' },
          { id: 'schedule', label: 'Examination Schedule' },
          { id: 'papers', label: 'Question Papers Management' },
          { id: 'publish', label: 'Publish Results' },
          { id: 'analysis', label: 'Result Analysis' },
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

      {/* TAB 1: Enter Student Marks */}
      {activeTab === 'internal-entry' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">Select Subject:</span>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="p-1.5 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800 font-bold"
              >
                <option value="CSE 302">CSE 302 - OPERATING SYSTEMS (Section A)</option>
                <option value="CSE 305">CSE 305 - COMPUTER ORGANIZATION AND ARCHITECTURE</option>
                <option value="CSE 401">CSE 401 - DISTRIBUTED CLOUD ARCHITECTURE</option>
              </select>
            </div>
            <button
              onClick={handleSaveMarks}
              className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
            >
              Save & Lock Internal Marks
            </button>
          </div>

          <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                    <th className="py-2.5 px-3 border-r border-slate-400 w-32">Register No.</th>
                    <th className="py-2.5 px-4 border-r border-slate-400">Student Name</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">CT-1 (Max 25)</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">CT-2 (Max 25)</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-32 text-center">Model Exam (50)</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">Lab CA (50)</th>
                    <th className="py-2.5 px-3 border-r border-slate-400 w-32 text-center">Calculated (50)</th>
                    <th className="py-2.5 px-3 w-32 text-center">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                  {studentMarks.map((row, idx) => {
                    const total50 = (((row.ct1 + row.ct2) / 50) * 20 + (row.model / 50) * 20 + (row.lab / 50) * 10).toFixed(2);
                    return (
                      <tr key={row.regNo} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                          {row.regNo}
                        </td>
                        <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                          {row.name}
                        </td>
                        <td className="py-1.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                          <input
                            type="number"
                            min="0"
                            max="25"
                            value={row.ct1}
                            onChange={(e) => handleMarkChange(idx, 'ct1', e.target.value)}
                            className="w-16 p-1 text-center font-bold border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
                          />
                        </td>
                        <td className="py-1.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                          <input
                            type="number"
                            min="0"
                            max="25"
                            value={row.ct2}
                            onChange={(e) => handleMarkChange(idx, 'ct2', e.target.value)}
                            className="w-16 p-1 text-center font-bold border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
                          />
                        </td>
                        <td className="py-1.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                          <input
                            type="number"
                            min="0"
                            max="50"
                            value={row.model}
                            onChange={(e) => handleMarkChange(idx, 'model', e.target.value)}
                            className="w-16 p-1 text-center font-bold border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
                          />
                        </td>
                        <td className="py-1.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                          <input
                            type="number"
                            min="0"
                            max="50"
                            value={row.lab}
                            onChange={(e) => handleMarkChange(idx, 'lab', e.target.value)}
                            className="w-16 p-1 text-center font-bold border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-center font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800 text-xs font-mono">
                          {total50}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.status === 'VERIFIED'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                                : row.status === 'ENTERED'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300'
                                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Examination Schedule */}
      {activeTab === 'schedule' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Subject Code</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Subject Description</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Exam Date</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-48">Session & Timing</th>
                  <th className="py-2.5 px-2 border-r border-slate-400 w-20 text-center">Students</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-36">Assigned Halls</th>
                  <th className="py-2.5 px-4">Chief / Hall Invigilator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {examSchedules.map((sch) => (
                  <tr key={sch.code} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {sch.code}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {sch.name}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {sch.date}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {sch.time}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                      {sch.students}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {sch.hall}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white">
                      {sch.invigilator}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Question Papers */}
      {activeTab === 'papers' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Subject Code</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-44">Examination Head</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Syllabus Coverage</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-44">CoE Approval Status</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Submission Deadline</th>
                  <th className="py-2.5 px-3 w-32 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {questionPapers.map((qp, idx) => (
                  <tr key={idx} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {qp.code}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {qp.exam}
                    </td>
                    <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800">
                      {qp.units}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700 dark:text-emerald-400 border-r border-slate-200 dark:border-surface-800">
                      {qp.status}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {qp.deadline}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => alert(`Uploading question paper template for ${qp.code} ${qp.exam}...`)}
                        className="px-2.5 py-1 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-[10px] font-bold shadow-sm"
                      >
                        Upload / Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Publish Results */}
      {activeTab === 'publish' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
            Controller of Examinations Result Publication Sign-Off
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Publishing results transmits official grade transcripts to student dashboards and freezes continuous assessment adjustments.
          </p>

          <div className="p-3 bg-slate-50 dark:bg-surface-800 border rounded flex items-center justify-between">
            <div>
              <p className="font-bold text-xs text-slate-900 dark:text-white">CSE 302 - OPERATING SYSTEMS (Section A)</p>
              <span className="text-[11px] text-slate-500">68 Students Evaluated • Mean Score: 84.2%</span>
            </div>
            <button
              onClick={() => alert('Results for CSE 302 published to Student Portals & Dean Office!')}
              className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
            >
              Authorize & Publish Results
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: Result Analysis */}
      {activeTab === 'analysis' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 p-5 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
            Academic Performance & Pass Percentage Distribution
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 dark:bg-surface-800 border rounded text-center">
              <span className="text-[11px] text-slate-500 font-bold block">TOTAL APPEARED</span>
              <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">68</span>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center">
              <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold block">PASS PERCENTAGE</span>
              <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">97.05%</span>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 text-center">
              <span className="text-[11px] text-blue-800 dark:text-blue-300 font-bold block">DISTINCTION (O / A+)</span>
              <span className="text-xl font-bold font-mono text-blue-700 dark:text-blue-400">42 Students</span>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-center">
              <span className="text-[11px] text-amber-800 dark:text-amber-300 font-bold block">ARREARS / REMEDIAL</span>
              <span className="text-xl font-bold font-mono text-amber-700 dark:text-amber-400">2 Students</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyExams;

