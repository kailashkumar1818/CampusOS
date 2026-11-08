import React, { useState } from 'react';
import { MessageSquare, Send, Users, Shield, Bell, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const FacultyCommunication = () => {
  const [activeTab, setActiveTab] = useState('messages'); // 'messages' | 'admin-notices'
  const [messageText, setMessageText] = useState('');
  const [sentSuccess, setSentSuccess] = useState('');

  const [conversations, setConversations] = useState([
    {
      id: 'MSG-01',
      sender: 'Rahul Kumar (EN2024CS042)',
      role: 'Student Ward',
      topic: 'Query on Lab Exercise 4: Inter-process Shared Memory Synchronization',
      time: 'Today 04:15 PM',
      unread: true,
    },
    {
      id: 'MSG-02',
      sender: 'Dr. Anirban Bhar',
      role: 'Faculty Colleague',
      topic: 'COA Question Paper Moderation Meeting in HOD Chamber',
      time: 'Yesterday 11:30 AM',
      unread: false,
    },
    {
      id: 'MSG-03',
      sender: 'Dean of Academic Affairs',
      role: 'Administration',
      topic: 'Submission of Course File and CO-PO Attainment Sheets for NBA Accreditation',
      time: '03-Nov-2026',
      unread: false,
    },
  ]);

  const adminNotices = [
    { id: 'ADM-89', title: 'National Board of Accreditation (NBA) Peer Team Visit Dates', from: 'Registrar Office', date: '04-Nov-2026', status: 'ACTION_REQUIRED' },
    { id: 'ADM-72', title: 'Faculty Annual Research Incentive & Patent Grant Claim Window', from: 'Dean Research', date: '25-Oct-2026', status: 'INFORMATIONAL' },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setSentSuccess('Message dispatched to student/colleague inbox!');
    setMessageText('');
    setTimeout(() => setSentSuccess(''), 4000);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          FACULTY COMMUNICATION & ADVISORY DESK
        </h1>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Student Ward Advising, Colleague Collaboration & Institutional Administrative Dispatch
        </p>
      </div>

      {sentSuccess && (
        <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          {sentSuccess}
        </div>
      )}

      {/* 3. Sub-tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 dark:border-surface-700 pb-1">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === 'messages'
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Direct Messages & Student Queries ({conversations.length})
          </button>
          <button
            onClick={() => setActiveTab('admin-notices')}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === 'admin-notices'
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Administrative Notices ({adminNotices.length})
          </button>
        </div>

        <Link
          to="/forum"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-bold shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5" /> Open Campus Forum
        </Link>
      </div>

      {/* TAB 1: Messages */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm divide-y divide-slate-200 dark:divide-surface-800">
            {conversations.map((msg) => (
              <div key={msg.id} className="p-4 hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{msg.sender}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-100 dark:bg-surface-800 text-slate-600 dark:text-slate-300">
                      {msg.role}
                    </span>
                    {msg.unread && (
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-[#1f3a52] dark:text-sky-300">{msg.topic}</p>
                  <span className="text-[10px] text-slate-400 font-mono block">{msg.time}</span>
                </div>
                <button
                  onClick={() => alert(`Replying to ${msg.sender}...`)}
                  className="px-3 py-1 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-[10px] font-bold shrink-0"
                >
                  Reply
                </button>
              </div>
            ))}
          </div>

          {/* Quick Reply Form */}
          <div className="border border-slate-300 dark:border-surface-700 rounded-sm p-4 bg-white dark:bg-surface-900 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
              Send Official Communication to Student / Batch
            </h3>
            <form onSubmit={handleSendMessage} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Recipient
                  </label>
                  <select className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800">
                    <option>Rahul Kumar (EN2024CS042) - Class Rep</option>
                    <option>All Students - 5th Sem Section A</option>
                    <option>Capstone Group CAP-2026-08</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject Head
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Guidance on Assignment 3 Deadlock Resolution"
                    className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Message Body
                </label>
                <textarea
                  required
                  rows={3}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type message content..."
                  className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                <Send className="w-3.5 h-3.5" /> Dispatch Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: Admin Notices */}
      {activeTab === 'admin-notices' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Notice ID</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Directives / Directive Subject</th>
                  <th className="py-2.5 px-4 border-r border-slate-400 w-44">Issuing Authority</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Date</th>
                  <th className="py-2.5 px-3 w-36 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {adminNotices.map((n) => (
                  <tr key={n.id} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {n.id}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {n.title}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-surface-800">
                      {n.from}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {n.date}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          n.status === 'ACTION_REQUIRED'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 text-slate-800 dark:bg-surface-800 dark:text-slate-300'
                        }`}
                      >
                        {n.status}
                      </span>
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

export default FacultyCommunication;

