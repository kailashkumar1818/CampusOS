import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Skeleton from '../../components/common/Skeleton';
import { Home, CheckCircle2, Wrench, Clock, AlertCircle } from 'lucide-react';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newStatus, setNewStatus] = useState('IN_PROGRESS');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const queryParams = statusFilter ? `?status=${statusFilter}` : '';
      const res = await api.get(`/complaints${queryParams}`);
      setComplaints(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [statusFilter]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    setSubmitting(true);
    setSuccess('');

    try {
      await api.patch(`/complaints/${selectedComplaint.id}/status`, {
        status: newStatus,
        resolutionNotes,
      });

      setSuccess('Grievance ticket status updated. Student notified via real-time bus.');
      setSelectedComplaint(null);
      setResolutionNotes('');
      fetchComplaints();
    } catch (err) {
      alert(err.message || 'Status update failed');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="warning">Pending</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="primary">In Progress</Badge>;
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
            Hostel Facilities & Maintenance Triage
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Resolve living quarter grievances, assign facilities contractors, and log resolution audit notes
          </p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-surface-900 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending Review</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {success && (
        <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <Card>
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : complaints.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center">No maintenance complaints in this status.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-surface-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3 px-3">Room</th>
                  <th className="pb-3 px-3">Student Name</th>
                  <th className="pb-3 px-3">Category</th>
                  <th className="pb-3 px-3">Issue Title</th>
                  <th className="pb-3 px-3">Filed On</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-surface-800">
                {complaints.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-surface-800/30">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-slate-100">
                      {c.roomNo}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">
                      {c.student?.user?.firstName} {c.student?.user?.lastName}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-500">
                      {c.category}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100 max-w-xs truncate">
                      {c.title}
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-mono">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3">{getStatusBadge(c.status)}</td>
                    <td className="py-3 px-3 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedComplaint(c);
                          setNewStatus(c.status);
                          setResolutionNotes(c.resolutionNotes || '');
                        }}
                      >
                        Triage Ticket
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Triage Modal */}
      <Modal
        isOpen={Boolean(selectedComplaint)}
        onClose={() => setSelectedComplaint(null)}
        title={`Triage Grievance: Room ${selectedComplaint?.roomNo}`}
      >
        <form onSubmit={handleUpdateStatus} className="space-y-4">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface-950 border border-slate-200/60 dark:border-surface-800/60 text-xs space-y-1">
            <p><strong>Title:</strong> {selectedComplaint?.title}</p>
            <p className="text-slate-500"><strong>Description:</strong> {selectedComplaint?.description}</p>
            <p className="text-slate-500"><strong>Filed By:</strong> {selectedComplaint?.student?.user?.firstName} {selectedComplaint?.student?.user?.lastName} ({selectedComplaint?.student?.user?.email})</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Update Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            >
              <option value="PENDING">Pending Review</option>
              <option value="IN_PROGRESS">In Progress / Technician Dispatched</option>
              <option value="RESOLVED">Resolved / Completed</option>
              <option value="REJECTED">Rejected / Duplicate</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Facilities Resolution Note (Visible to Student)
            </label>
            <textarea
              rows={3}
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              placeholder="e.g. Electrician replaced bathroom fuse and verified circuit at 3:30 PM"
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedComplaint(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={submitting}>
              Update & Dispatch Notification
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminComplaints;

