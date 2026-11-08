import React, { useState } from 'react';
import { Calendar, Plus, Award, MapPin, Clock, Users, CheckCircle2 } from 'lucide-react';
import Modal from '../../components/common/Modal';

const FacultyEvents = () => {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'department' | 'create-request'
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState('');

  const [events, setEvents] = useState([
    {
      code: 'FAC-EV-01',
      title: 'FACULTY DEVELOPMENT PROGRAM (FDP) ON DEEP LEARNING ARCHITECTURES',
      type: 'Departmental FDP',
      date: '18-Nov-2026 To 22-Nov-2026',
      venue: 'CSE Seminar Hall 2',
      coordinator: 'Dr. Robert Johnson',
      status: 'APPROVED',
    },
    {
      code: 'FAC-EV-02',
      title: 'INTERNATIONAL SYMPOSIUM ON DISTRIBUTED LEDGER & CLOUD SYSTEMS',
      type: 'International Conference',
      date: '10-Dec-2026',
      venue: 'Main University Auditorium',
      coordinator: 'Dr. Robert Johnson',
      status: 'REGISTRATIONS_OPEN',
    },
    {
      code: 'FAC-EV-03',
      title: 'INDUSTRY-ACADEMIA CONCLAVE: AUTONOMOUS VEHICLES & EMBEDDED AI',
      type: 'Industry Conclave',
      date: '15-Dec-2026',
      venue: 'Tech Park Convention Center',
      coordinator: 'Dr. Robert Johnson',
      status: 'SCHEDULED',
    },
  ]);

  const handleCreateEvent = (e) => {
    e.preventDefault();
    setRequestSuccess('Event approval requisition submitted to Dean of Academics!');
    setShowRequestModal(false);
    setTimeout(() => setRequestSuccess(''), 4000);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          FACULTY EVENTS & WORKSHOP COORDINATION
        </h1>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Institutional Development Programs, Conferences, Symposia & Guest Lectures
        </p>
      </div>

      {requestSuccess && (
        <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          {requestSuccess}
        </div>
      )}

      {/* 3. Sub-tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 dark:border-surface-700 pb-1">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Upcoming Events ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('department')}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === 'department'
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Departmental FDPs
          </button>
        </div>

        <button
          onClick={() => setShowRequestModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-bold shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Propose New Event
        </button>
      </div>

      {/* TAB 1: Events Table */}
      <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                <th className="py-2.5 px-3 border-r border-slate-400 w-28">Event Code</th>
                <th className="py-2.5 px-4 border-r border-slate-400">Event Title & Scope</th>
                <th className="py-2.5 px-3 border-r border-slate-400 w-36">Category</th>
                <th className="py-2.5 px-3 border-r border-slate-400 w-44">Date & Schedule</th>
                <th className="py-2.5 px-3 border-r border-slate-400">Venue / Platform</th>
                <th className="py-2.5 px-3 border-r border-slate-400 w-40">Coordinator</th>
                <th className="py-2.5 px-3 w-28 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
              {events.map((evt) => (
                <tr key={evt.code} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                    {evt.code}
                  </td>
                  <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                    {evt.title}
                  </td>
                  <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                    {evt.type}
                  </td>
                  <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                    {evt.date}
                  </td>
                  <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                    {evt.venue}
                  </td>
                  <td className="py-2.5 px-3 font-semibold border-r border-slate-200 dark:border-surface-800">
                    {evt.coordinator}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                      {evt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Propose Event Modal */}
      {showRequestModal && (
        <Modal
          isOpen={showRequestModal}
          onClose={() => setShowRequestModal(false)}
          title="Propose Faculty Workshop / Event"
        >
          <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Event Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. National Workshop on Quantum Computing & Cryptography"
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Event Category
                </label>
                <select className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800">
                  <option>Faculty Development Program (FDP)</option>
                  <option>Guest Lecture</option>
                  <option>National Symposium</option>
                  <option>Hands-on Student Hackathon</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Proposed Date
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
                Expected Budget & Funding Source
              </label>
              <input
                type="text"
                placeholder="e.g. ₹ 25,000 (Departmental Academic Contingency Fund)"
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRequestModal(false)}
                className="px-3 py-1.5 rounded border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white font-bold"
              >
                Submit Proposal to HoD
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default FacultyEvents;

