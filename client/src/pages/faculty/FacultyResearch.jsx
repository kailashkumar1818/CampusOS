import React, { useState } from 'react';
import { Award, BookOpen, Users, FileText, Download, CheckCircle2, Plus } from 'lucide-react';
import Modal from '../../components/common/Modal';

const FacultyResearch = () => {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'capstone' | 'publications'
  const [showAddPubModal, setShowAddPubModal] = useState(false);
  const [pubSuccess, setPubSuccess] = useState('');

  const sponsoredProjects = [
    {
      code: 'DST-SERB-2025',
      title: 'Decentralized Edge-Cloud Orchestration for Autonomous Drone Fleets',
      agency: 'DST - Science and Engineering Research Board (Govt. of India)',
      grant: '₹ 28,50,000',
      duration: '2025 - 2028 (3 Years)',
      pi: 'Dr. Robert Johnson (Principal Investigator)',
      status: 'ONGOING',
    },
    {
      code: 'ISRO-RESPOND-2024',
      title: 'Low-Latency Fault Tolerant Protocols for CubeSat Mesh Networks',
      agency: 'ISRO RESPOND Research Grant',
      grant: '₹ 18,00,000',
      duration: '2024 - 2026 (2 Years)',
      pi: 'Dr. Robert Johnson (Co-PI)',
      status: 'ONGOING',
    },
  ];

  const capstoneGroups = [
    {
      groupId: 'CAP-2026-08',
      title: 'High-Throughput Byzantine Fault Tolerant Consensus for Micro-transactions',
      members: 'Rahul Kumar (Lead), Ananya Deshmukh, Rohan Gupta',
      guide: 'Dr. Robert Johnson',
      phase1Score: '48 / 50',
      phase2Score: 'Pending',
      status: 'PHASE 2 REVIEW SCHEDULED',
    },
    {
      groupId: 'CAP-2026-14',
      title: 'Federated Learning Framework with Differential Privacy on Mobile Edge',
      members: 'Vikas Sharma, Pooja Iyer, Sneha Patel',
      guide: 'Dr. Robert Johnson',
      phase1Score: '46 / 50',
      phase2Score: 'Pending',
      status: 'MODEL IMPLEMENTATION',
    },
  ];

  const publications = [
    {
      doi: '10.1109/TSC.2026.9021',
      title: 'Adaptive Load Balancing in Heterogeneous Fog-Cloud Architecture',
      journal: 'IEEE Transactions on Services Computing (Impact Factor: 8.21)',
      year: '2026',
      citations: 18,
      indexing: 'SCI / Scopus Q1',
    },
    {
      doi: '10.1016/j.future.2025.109',
      title: 'Fault-Tolerant Distributed Storage using Dynamic Reed-Solomon Erasure Coding',
      journal: 'Future Generation Computer Systems (Elsevier, IF: 7.30)',
      year: '2025',
      citations: 34,
      indexing: 'SCI / Scopus Q1',
    },
  ];

  const handleAddPub = (e) => {
    e.preventDefault();
    setPubSuccess('Research publication indexed in faculty academic profile!');
    setShowAddPubModal(false);
    setTimeout(() => setPubSuccess(''), 4000);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          RESEARCH, SPONSORED GRANTS & CAPSTONE PROJECTS
        </h1>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Dean of Research & Development • Sponsored Schemes, Patents & Undergraduate Capstone Mentorship
        </p>
      </div>

      {pubSuccess && (
        <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
          {pubSuccess}
        </div>
      )}

      {/* 3. Sub-tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 dark:border-surface-700 pb-1">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === 'projects'
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Sponsored Grants ({sponsoredProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('capstone')}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === 'capstone'
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Student Capstone Groups ({capstoneGroups.length})
          </button>
          <button
            onClick={() => setActiveTab('publications')}
            className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
              activeTab === 'publications'
                ? 'bg-[#1f3a52] text-white'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Research Publications ({publications.length})
          </button>
        </div>

        <button
          onClick={() => setShowAddPubModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white text-xs font-bold shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Add Publication
        </button>
      </div>

      {/* TAB 1: Sponsored Grants */}
      {activeTab === 'projects' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-36">Project Code</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Project Title & Scope</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Sponsoring Funding Agency</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-32 font-mono text-right">Sanctioned Grant</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-36">Duration</th>
                  <th className="py-2.5 px-3 w-28 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {sponsoredProjects.map((p) => (
                  <tr key={p.code} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {p.code}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {p.title}
                      <span className="block text-[10px] text-slate-500 font-normal">{p.pi}</span>
                    </td>
                    <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800">
                      {p.agency}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700 dark:text-emerald-400 border-r border-slate-200 dark:border-surface-800">
                      {p.grant}
                    </td>
                    <td className="py-2.5 px-3 font-medium border-r border-slate-200 dark:border-surface-800">
                      {p.duration}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Capstone Groups */}
      {activeTab === 'capstone' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28">Group ID</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Capstone Project Title</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Team Members</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">Phase 1 Score</th>
                  <th className="py-2.5 px-3 border-r border-slate-400 w-28 text-center">Phase 2 Score</th>
                  <th className="py-2.5 px-3 w-40 text-center">Progress Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {capstoneGroups.map((cg) => (
                  <tr key={cg.groupId} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {cg.groupId}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {cg.title}
                    </td>
                    <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800">
                      {cg.members}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-emerald-700 border-r border-slate-200 dark:border-surface-800">
                      {cg.phase1Score}
                    </td>
                    <td className="py-2.5 px-3 text-center border-r border-slate-200 dark:border-surface-800 font-medium">
                      {cg.phase2Score}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300">
                        {cg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Publications */}
      {activeTab === 'publications' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#1f3a52] text-white font-bold border-b border-slate-400">
                  <th className="py-2.5 px-3 border-r border-slate-400 w-36">DOI Reference</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Publication Paper Title</th>
                  <th className="py-2.5 px-4 border-r border-slate-400">Journal / Conference</th>
                  <th className="py-2.5 px-2 border-r border-slate-400 w-16 text-center">Year</th>
                  <th className="py-2.5 px-2 border-r border-slate-400 w-20 text-center">Citations</th>
                  <th className="py-2.5 px-3 w-32 text-center">Indexing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-800 text-[11px] text-slate-800 dark:text-slate-200">
                {publications.map((pub) => (
                  <tr key={pub.doi} className="hover:bg-sky-50/40 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {pub.doi}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-surface-800">
                      {pub.title}
                    </td>
                    <td className="py-2.5 px-4 font-medium border-r border-slate-200 dark:border-surface-800">
                      {pub.journal}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold border-r border-slate-200 dark:border-surface-800">
                      {pub.year}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold text-brand-700 dark:text-brand-300 border-r border-slate-200 dark:border-surface-800">
                      {pub.citations}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                        {pub.indexing}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Publication Modal */}
      {showAddPubModal && (
        <Modal
          isOpen={showAddPubModal}
          onClose={() => setShowAddPubModal(false)}
          title="Add Research Publication"
        >
          <form onSubmit={handleAddPub} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Paper Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Robust Consensus in Decentralized Edge Networks"
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Journal / Conference Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. IEEE Transactions on Cloud Computing"
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  DOI / ISBN
                </label>
                <input
                  type="text"
                  required
                  placeholder="10.1109/TCC.2026.0129"
                  className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Indexing Tier
                </label>
                <select className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800">
                  <option>SCI / Scopus Q1</option>
                  <option>Scopus Q2</option>
                  <option>IEEE Xplore Conference</option>
                  <option>UGC-CARE Listed</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddPubModal(false)}
                className="px-3 py-1.5 rounded border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#2ba2c5] hover:bg-[#258fae] text-white font-bold"
              >
                Save Publication
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default FacultyResearch;

