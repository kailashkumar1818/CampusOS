import React, { useState } from 'react';
import { Bell, Plus, Calendar, Tag, CheckCircle2, Megaphone } from 'lucide-react';
import Modal from '../../components/common/Modal';

const FacultyAnnouncements = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('DEPARTMENT');
  const [content, setContent] = useState('');

  const [announcements, setAnnouncements] = useState([
    {
      id: 'ANN-001',
      title: 'Lab Internal Exam Schedule for B.Tech CSE Semester 5',
      category: 'CLASS_ACADEMIC',
      target: '5th Sem Section A & B',
      author: 'Dr. Robert Johnson (HoD In-Charge)',
      date: '04-Nov-2026',
      priority: 'HIGH',
    },
    {
      id: 'ANN-002',
      title: 'Submission of Model Question Paper Sets to CoE Office',
      category: 'FACULTY_INTERNAL',
      target: 'All CSE Faculty Members',
      author: 'Dr. Robert Johnson (HoD In-Charge)',
      date: '01-Nov-2026',
      priority: 'CRITICAL',
    },
    {
      id: 'ANN-003',
      title: 'Smart India Hackathon 2026 Department Internal Screening',
      category: 'DEPARTMENT',
      target: 'All Registered Student Batches',
      author: 'Dr. Robert Johnson (HoD In-Charge)',
      date: '28-Oct-2026',
      priority: 'NORMAL',
    },
  ]);

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    const newAnn = {
      id: `ANN-${Math.floor(100 + Math.random() * 900)}`,
      title,
      category,
      target: 'Department of Computer Science',
      author: 'Dr. Robert Johnson',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      priority: 'NORMAL',
    };
    setAnnouncements([newAnn, ...announcements]);
    setSuccessMsg('Announcement published and dispatched to student and faculty feeds!');
    setShowCreateModal(false);
    setTitle('');
    setContent('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          FACULTY ANNOUNCEMENTS & CIRCULAR DISPATCH
        </h1>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Institutional Circulars, Class Notifications & Official Departmental Gazettes
        </p>
      </div>

      {successMsg && (
        <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          {successMsg}
        </div>
      )}

      {/* Action Header */}
      <div className="flex items-center justify-between pb-1">
        <span className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
          Active Bulletins & Announcements ({announcements.length})
        </span>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-bold shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Broadcast New Circular
        </button>
      </div>

      {/* Table */}
      <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                <th className="py-2.5 px-3 border-r border-slate-400 w-28">Ref No.</th>
                <th className="py-2.5 px-4 border-r border-slate-400">Circular Subject / Title</th>
                <th className="py-2.5 px-3 border-r border-slate-400 w-36">Category</th>
                <th className="py-2.5 px-4 border-r border-slate-400">Target Audience</th>
                <th className="py-2.5 px-3 border-r border-slate-400 w-28">Date</th>
                <th className="py-2.5 px-3 border-r border-slate-400 w-24 text-center">Priority</th>
                <th className="py-2.5 px-4">Published By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
              {announcements.map((a) => (
                <tr key={a.id} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                    {a.id}
                  </td>
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                    {a.title}
                  </td>
                  <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                    {a.category}
                  </td>
                  <td className="py-2.5 px-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-surface-800">
                    {a.target}
                  </td>
                  <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                    {a.date}
                  </td>
                  <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        a.priority === 'CRITICAL'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : a.priority === 'HIGH'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {a.priority}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-medium text-slate-600 dark:text-slate-400">
                    {a.author}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Broadcast Modal */}
      {showCreateModal && (
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Publish Official Department Circular"
        >
          <form onSubmit={handleCreateAnnouncement} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Announcement Subject
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Schedule of Remedial Classes for 5th Sem Students"
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
                >
                  <option value="DEPARTMENT">Departmental Circular</option>
                  <option value="CLASS_ACADEMIC">Class Lecture Notice</option>
                  <option value="EXAMINATION">Exam Notification</option>
                  <option value="FACULTY_INTERNAL">Faculty Internal Memo</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Audience
                </label>
                <select className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800">
                  <option>All Students in Assigned Batches</option>
                  <option>5th Semester (Section A & B)</option>
                  <option>7th Semester Elective Students</option>
                  <option>Department Faculty Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Detailed Body & Instructions
              </label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter complete notification text and instructions..."
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-3 py-1.5 rounded border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white font-bold"
              >
                Broadcast Now
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default FacultyAnnouncements;

