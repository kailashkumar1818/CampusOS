import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import api from '../../services/api';
import { User, Phone, Mail, MapPin, Calendar, Edit3, CheckCircle2 } from 'lucide-react';

const StudentProfile = () => {
  const { user, updateUser } = useAuth();
  const profile = user?.studentProfile;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [phone, setPhone] = useState(user?.phone || '+91-98765-43210');
  const [guardianName, setGuardianName] = useState(profile?.guardianName || 'Rajesh Kumar');
  const [guardianPhone, setGuardianPhone] = useState(profile?.guardianPhone || '+91-98765-00001');
  const [hostelRoom, setHostelRoom] = useState(profile?.hostelRoom || 'Block B - 402');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/auth/profile', {
        phone,
        guardianName,
        guardianPhone,
        hostelRoom,
      });
      updateUser(res.data);
      setSuccess('Profile records updated successfully!');
      setIsEditOpen(false);
    } catch (err) {
      alert(err.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const studentData = [
    { label: 'Student Name', value: `${user?.firstName || 'RAHUL'} ${user?.lastName || 'KUMAR'}`.toUpperCase() },
    { label: 'Register No.', value: profile?.enrollmentNo || 'EN2024CS042' },
    { label: 'Institution', value: 'Faculty of Engineering and Technology (CampusOS Main Campus)' },
    { label: 'Semester', value: `Semester ${profile?.semester?.semesterNo || 5} (${profile?.semester?.academicYear || '2026-2027'})` },
    { label: 'Program / Section', value: `${profile?.course?.name || 'B.Tech Computer Science and Engineering'} / Section A` },
    { label: 'Specialization', value: 'Software Systems & Distributed Architecture' },
    { label: 'D.O.B. / Gender', value: `15-Aug-2004 / ${profile?.gender || 'MALE'}` },
    { label: 'Student Contact Number / Email', value: `${user?.phone || '+91-98765-43210'} / ${user?.email || 'rahul.kumar@campusos.edu'}` },
    { label: 'Father Name / Mother Name', value: `${profile?.guardianName || 'Rajesh Kumar'} / Sunita Kumar` },
    { label: 'Access Through', value: 'CampusOS High-Speed Academic Network (Verified Student Portal)' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 dark:border-surface-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 uppercase font-mono">
            PROFILE
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Institutional Matriculation & Demographic Records
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditOpen(true)}>
            <Edit3 className="w-3.5 h-3.5" /> Edit Contact Info
          </Button>
        </div>
      </div>

      {success && (
        <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Profile Formal Table matching Reference Image 1 */}
      <div className="bg-white dark:bg-surface-900 border border-slate-300 dark:border-surface-800 rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-200 dark:divide-surface-800 text-sm">
          {studentData.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 py-3 px-5 hover:bg-slate-50/60 dark:hover:bg-surface-800/40 transition-colors"
            >
              <div className="md:col-span-4 text-slate-600 dark:text-slate-400 font-medium flex items-center justify-between pr-4">
                <span>{row.label}</span>
                <span className="hidden md:inline text-slate-400">:</span>
              </div>
              <div className="md:col-span-8 text-slate-900 dark:text-slate-100 font-semibold mt-1 md:mt-0">
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic ID Card summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            <User className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Enrollment ID</span>
            <p className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">
              {profile?.enrollmentNo || 'EN2024CS042'}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Hostel Room</span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {profile?.hostelRoom || 'Block B - 402'}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Admission Date</span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              01-Aug-2024
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Update Student Contact Records">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Mobile Contact Number
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded border border-slate-300 dark:border-surface-800 bg-white dark:bg-surface-950 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Guardian / Father Name
            </label>
            <input
              type="text"
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded border border-slate-300 dark:border-surface-800 bg-white dark:bg-surface-950 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Guardian Emergency Phone
            </label>
            <input
              type="text"
              value={guardianPhone}
              onChange={(e) => setGuardianPhone(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded border border-slate-300 dark:border-surface-800 bg-white dark:bg-surface-950 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Hostel Room / Residence
            </label>
            <input
              type="text"
              value={hostelRoom}
              onChange={(e) => setHostelRoom(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded border border-slate-300 dark:border-surface-800 bg-white dark:bg-surface-950 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={saving}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentProfile;

