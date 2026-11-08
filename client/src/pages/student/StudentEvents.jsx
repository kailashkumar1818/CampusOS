import React, { useState } from 'react';
import { Calendar, Award, Download, CheckCircle, Clock, MapPin, Tag } from 'lucide-react';

const StudentEvents = () => {
  const [activeTab, setActiveTab] = useState('registration'); // 'registration' | 'my-events' | 'certificates'
  const [registeredIds, setRegisteredIds] = useState(['EV-002']);
  const [successMsg, setSuccessMsg] = useState('');

  const availableEvents = [
    {
      code: 'EV-001',
      title: 'HACK-CAMPUS 2026: 36-HOUR NATIONAL HACKATHON',
      category: 'Technical Hackathon',
      date: '18-Nov-2026 To 20-Nov-2026',
      venue: 'Main Auditorium & Innovation Lab',
      fee: 'Free (Institutional)',
      deadline: '14-Nov-2026',
    },
    {
      code: 'EV-002',
      title: 'INTERNATIONAL CONFERENCE ON DISTRIBUTED SYSTEMS (ICDS)',
      category: 'Paper Presentation',
      date: '25-Nov-2026',
      venue: 'Seminar Hall 3 - Tech Park',
      fee: '₹ 500',
      deadline: '20-Nov-2026',
    },
    {
      code: 'EV-003',
      title: 'ROBOSOCCER & AUTONOMOUS BOT GRAND PRIX',
      category: 'Robotics Workshop',
      date: '02-Dec-2026',
      venue: 'Indoor Sports Complex',
      fee: '₹ 250',
      deadline: '28-Nov-2026',
    },
    {
      code: 'EV-004',
      title: 'CAMPUS-FIESTA 2026: ANNUAL CULTURAL GALA',
      category: 'Cultural Extravaganza',
      date: '10-Dec-2026 To 12-Dec-2026',
      venue: 'Open Air Theatre (OAT)',
      fee: 'Free (All Students)',
      deadline: '05-Dec-2026',
    },
  ];

  const myRegistrations = [
    {
      regId: 'REG-2026-8941',
      code: 'EV-002',
      title: 'INTERNATIONAL CONFERENCE ON DISTRIBUTED SYSTEMS (ICDS)',
      type: 'Participant / Presenter',
      regDate: '01-Nov-2026',
      attendance: 'Confirmed (Slot 12)',
      status: 'APPROVED',
    },
    {
      regId: 'REG-2026-6710',
      code: 'EV-091',
      title: 'INTER-COLLEGIATE CODING RELAY 2026',
      type: 'Team Captain (Binary Beasts)',
      regDate: '15-Oct-2026',
      attendance: 'Attended (Winner - 2nd Place)',
      status: 'COMPLETED',
    },
  ];

  const certificates = [
    {
      certId: 'CERT-2026-0924',
      eventName: 'INTER-COLLEGIATE CODING RELAY 2026',
      achievement: 'Runner-Up (Cash Prize ₹10,000)',
      issueDate: '20-Oct-2026',
      hash: 'SHA256:7a9f...e021',
    },
    {
      certId: 'CERT-2026-0112',
      eventName: 'SMART INDIA WORKSHOP ON CLOUD ARCHITECTURE',
      achievement: 'Certificate of Excellence & Completion',
      issueDate: '05-Sep-2026',
      hash: 'SHA256:4b11...9c82',
    },
  ];

  const handleRegister = (code, title) => {
    if (registeredIds.includes(code)) return;
    setRegisteredIds([...registeredIds, code]);
    setSuccessMsg(`Successfully registered for "${title}"! Requisition token issued.`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          EVENTS & INSTITUTIONAL SYMPOSIA
        </h1>
      </div>

      {/* 2. Gray Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          University Co-Curricular & Technical Symposium Management
        </p>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          {successMsg}
        </div>
      )}

      {/* 3. Sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-300 dark:border-surface-700 pb-1">
        <button
          onClick={() => setActiveTab('registration')}
          className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
            activeTab === 'registration'
              ? 'bg-[#1f3a52] text-white'
              : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Event Registration
        </button>
        <button
          onClick={() => setActiveTab('my-events')}
          className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
            activeTab === 'my-events'
              ? 'bg-[#1f3a52] text-white'
              : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          My Registered Events ({myRegistrations.length})
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
            activeTab === 'certificates'
              ? 'bg-[#1f3a52] text-white'
              : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Certificate Download
        </button>
      </div>

      {/* TAB 1: Event Registration */}
      {activeTab === 'registration' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-24">Code</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Event Title</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-36">Category</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-44">Date & Duration</th>
                  <th className="py-2.5 px-3 border-r border-slate-400">Venue</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">Fee</th>
                  <th className="py-2.5 px-3 w-28 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {availableEvents.map((evt) => {
                  const isRegistered = registeredIds.includes(evt.code);
                  return (
                    <tr key={evt.code} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {evt.code}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                        {evt.title}
                        <span className="block text-[10px] text-slate-500 font-normal">Last Date to Enroll: {evt.deadline}</span>
                      </td>
                      <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                        {evt.category}
                      </td>
                      <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                        {evt.date}
                      </td>
                      <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                        {evt.venue}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-center border-r border-slate-200 dark:border-surface-800 text-slate-900 dark:text-white">
                        {evt.fee}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {isRegistered ? (
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                            Registered
                          </span>
                        ) : (
                          <button
                            onClick={() => handleRegister(evt.code, evt.title)}
                            className="px-3 py-1 rounded bg-[#2ba2c5] hover:bg-[#258fae] active:bg-[#1f7c97] text-white text-[10px] font-bold shadow-sm transition-colors"
                          >
                            Register
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: My Registered Events */}
      {activeTab === 'my-events' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32">Registration ID</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-24">Event Code</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Event Title</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-40">Role / Designation</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Reg. Date</th>
                  <th className="py-2.5 px-3 border-r border-slate-400">Attendance Status</th>
                  <th className="py-2.5 px-3 w-28 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {myRegistrations.map((reg) => (
                  <tr key={reg.regId} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-brand-700 dark:text-brand-300 border-r border-slate-200 dark:border-surface-800">
                      {reg.regId}
                    </td>
                    <td className="py-2.5 px-3 font-mono border-r border-slate-200 dark:border-surface-800">
                      {reg.code}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {reg.title}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {reg.type}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {reg.regDate}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {reg.attendance}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                        {reg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Certificates */}
      {activeTab === 'certificates' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-36">Certificate ID</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Event Title</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Achievement / Level</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Issue Date</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-44 font-mono">Verification Hash</th>
                  <th className="py-2.5 px-3 w-28 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {certificates.map((cert) => (
                  <tr key={cert.certId} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {cert.certId}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {cert.eventName}
                    </td>
                    <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800">
                      {cert.achievement}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {cert.issueDate}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[10px] text-slate-500 border-r border-slate-200 dark:border-surface-800">
                      {cert.hash}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => alert(`Downloading verified institutional PDF certificate: ${cert.certId}`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-[10px] font-bold shadow-sm"
                      >
                        <Download className="w-3 h-3" /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEvents;

