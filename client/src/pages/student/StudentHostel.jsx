import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Skeleton from '../../components/common/Skeleton';
import { Home, Plus, CheckCircle2, Clock, Wrench, Shield } from 'lucide-react';

const StudentHostel = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('INTERNET');
  const [roomNo, setRoomNo] = useState(user?.studentProfile?.hostelRoom || '');

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await api.get('/complaints');
      setComplaints(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleCreateComplaint = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/complaints', {
        title,
        description,
        category,
        roomNo: roomNo || user?.studentProfile?.hostelRoom || 'General',
      });
      setSuccess('Hostel grievance logged successfully! Facilities team has been notified.');
      setShowModal(false);
      setTitle('');
      setDescription('');
      fetchComplaints();
    } catch (err) {
      setError(err.message || 'Failed to submit complaint');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="warning">Pending Review</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="primary">In Progress / Assigned</Badge>;
      case 'RESOLVED':
        return <Badge variant="success">Resolved</Badge>;
      case 'REJECTED':
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Hostel Grievance & Facilities Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Log maintenance requests, track real-time technician progress, and verify resolution
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" /> Log New Grievance
        </Button>
      </div>

      {success && (
        <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Room allocation card */}
      <Card className="bg-gradient-to-r from-slate-900 to-surface-900 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md">
              <Home className="w-6 h-6 text-brand-300" />
            </div>
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Allocated Quarters</span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                {user?.studentProfile?.hostelRoom || 'No Hostel Assigned (Day Scholar)'}
              </h3>
            </div>
          </div>
          <div className="text-xs text-slate-300">
            24/7 Hostel Warden Hotline: <span className="font-mono font-bold text-white">+1-800-CAMPUS-HOSTEL</span>
          </div>
        </div>
      </Card>

      {/* Complaints List */}
      <Card title="Grievance History & Status Tracker" subtitle="All requests filed by your room">
        {loading ? (
          <Skeleton className="h-32 w-full" />
        ) : complaints.length === 0 ? (
          <div className="text-center py-10">
            <Wrench className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No hostel grievances reported
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Any maintenance issues you log will show up here with live status updates.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-surface-950/60 border border-slate-200/80 dark:border-surface-800/80 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-surface-800 font-semibold">
                      {c.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {c.title}
                    </h4>
                  </div>
                  <div>{getStatusBadge(c.status)}</div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {c.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1 border-t border-slate-200/40 dark:border-surface-800/40">
                  <span>Room: <strong className="text-slate-600 dark:text-slate-300">{c.roomNo}</strong></span>
                  <span>Logged: <strong className="text-slate-600 dark:text-slate-300">{new Date(c.createdAt).toLocaleString()}</strong></span>
                </div>

                {c.resolutionNotes && (
                  <div className="mt-2 p-2.5 rounded-lg bg-white dark:bg-surface-900 border border-slate-200 dark:border-surface-800 text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-brand-600 dark:text-brand-400">Facilities Note:</strong> {c.resolutionNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Create Complaint Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setError('');
        }}
        title="File a Hostel Maintenance Request"
      >
        <form onSubmit={handleCreateComplaint} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Issue Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="INTERNET">Internet / Wi-Fi Connectivity</option>
              <option value="ELECTRICAL">Electrical (Fan, Light, Sockets)</option>
              <option value="PLUMBING">Plumbing & Water Supply</option>
              <option value="CLEANLINESS">Housekeeping & Hygiene</option>
              <option value="FURNITURE">Carpentry / Broken Furniture</option>
              <option value="SECURITY">Lock & Security</option>
              <option value="OTHER">Other Issues</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Room / Block Number
            </label>
            <input
              type="text"
              required
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              placeholder="e.g. Block B - 402"
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Brief Summary Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken bathroom pipe leaking on 4th floor"
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Detailed Description
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide exact details so technicians can bring appropriate tools..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={submitting}>
              Submit Ticket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentHostel;

