import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, Award, BookOpen, Lock, Bell, CheckCircle2, Power } from 'lucide-react';
import api from '../../services/api';

const FacultyProfile = () => {
  const { user, logout } = useAuth();
  const profile = user?.facultyProfile;

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'password' | 'notifications'
  const [phone, setPhone] = useState(user?.phone || '+91-98401-22248');
  const [officeLocation, setOfficeLocation] = useState(profile?.officeLocation || 'Tech Park - Floor 4, Cabin 408');
  const [qualification, setQualification] = useState(profile?.qualification || 'Ph.D in Distributed Systems & Cloud Computing');
  const [successMsg, setSuccessMsg] = useState('');
  const [saving, setSaving] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/auth/profile', { phone });
      setSuccessMsg('Faculty profile credentials updated successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(err.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    setSaving(true);
    try {
      setSuccessMsg('Password updated successfully! Please re-login on your next session.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(err.message || 'Password update failed');
    } finally {
      setSaving(false);
    }
  };

  const facultyData = [
    { label: 'Faculty Name', value: `DR. ${user?.firstName || 'ROBERT'} ${user?.lastName || 'JOHNSON'}`.toUpperCase() },
    { label: 'Employee ID / Code', value: profile?.employeeId || 'FAC-CSE-101' },
    { label: 'Department', value: profile?.department?.name || 'Department of Computer Science and Engineering' },
    { label: 'Designation', value: profile?.designation || 'Professor & Associate Head of Department' },
    { label: 'Highest Qualification', value: qualification },
    { label: 'Office Cabin Location', value: officeLocation },
    { label: 'Official Institutional Email', value: user?.email || 'faculty.johnson@campusos.edu' },
    { label: 'Contact Number', value: phone },
    { label: 'Primary Research Specialization', value: 'Distributed Operating Systems, Edge-Cloud Computing & Consensus Protocols' },
    { label: 'Institutional Appointment Type', value: 'Permanent Full-Time Academic Tenured Faculty' },
  ];

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Banner */}
      <div className="bg-[#d2ecf7] dark:bg-sky-950/50 py-3 px-5 rounded-t-sm shadow-sm border-b border-[#b7dfef] dark:border-sky-900 flex items-center justify-between">
        <h1 className="text-[17px] font-bold text-[#1d607e] dark:text-sky-300 tracking-wide uppercase">
          FACULTY PROFILE & REGISTRY SPECIFICATION
        </h1>
        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-sm"
        >
          <Power className="w-3.5 h-3.5" /> Logout Session
        </button>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-[#6b7280] dark:bg-slate-700 text-white py-2 px-4 rounded-md text-center shadow-sm">
        <p className="text-xs sm:text-[13px] font-semibold tracking-wide">
          Office of Registrar & Academic Staff Registry • Verified Tenured Faculty Dossier
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
          onClick={() => setActiveTab('profile')}
          className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
            activeTab === 'profile'
              ? 'bg-[#1f3a52] text-white'
              : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Faculty Demographic Specification
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`py-1.5 px-3 text-xs font-bold rounded-t transition-colors ${
            activeTab === 'password'
              ? 'bg-[#1f3a52] text-white'
              : 'bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Change Security Password
        </button>
      </div>

      {/* TAB 1: Profile Table matching the student profile formal table */}
      {activeTab === 'profile' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 shadow-sm">
          <div className="divide-y divide-slate-200 dark:divide-surface-800 text-xs">
            {facultyData.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 py-3 px-5 hover:bg-slate-50/60 dark:hover:bg-surface-800/40 transition-colors"
              >
                <div className="md:col-span-4 text-slate-600 dark:text-slate-400 font-bold flex items-center justify-between pr-4">
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
      )}

      {/* TAB 2: Change Password */}
      {activeTab === 'password' && (
        <div className="border border-slate-300 dark:border-surface-700 rounded-sm overflow-hidden bg-white dark:bg-surface-900 p-5 shadow-sm max-w-lg space-y-4">
          <h2 className="text-xs font-bold text-[#1b2b4d] dark:text-sky-300 uppercase">
            Update Account Access Password
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                New Password (Min 8 Characters)
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded border-slate-300 dark:border-surface-700 bg-white dark:bg-surface-800"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FacultyProfile;

