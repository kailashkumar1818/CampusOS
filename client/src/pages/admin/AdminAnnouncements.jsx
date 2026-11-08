import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Skeleton from '../../components/common/Skeleton';
import { Bell, Plus, CheckCircle2, Megaphone, AlertCircle } from 'lucide-react';

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetRole, setTargetRole] = useState('ALL');
  const [priority, setPriority] = useState('NORMAL');
  const [category, setCategory] = useState('General');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await api.get('/announcements');
      setAnnouncements(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/announcements', {
        title,
        content,
        targetRole,
        priority,
        category,
      });

      setSuccess('Announcement broadcasted campus-wide in real-time!');
      setShowModal(false);
      setTitle('');
      setContent('');
      fetchAnnouncements();
    } catch (err) {
      setError(err.message || 'Failed to publish announcement');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            University Announcements & Bulletins
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Broadcast emergency alerts, academic schedules, and institutional notices in real-time
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" /> Publish Announcement
        </Button>
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
        ) : announcements.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center">No announcements published yet.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-surface-800">
            {announcements.map((ann) => (
              <div key={ann.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={ann.priority === 'HIGH' || ann.priority === 'URGENT' ? 'danger' : 'primary'} size="xs">
                      {ann.priority}
                    </Badge>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-surface-800 font-semibold">
                      {ann.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {ann.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">Audience:</span>
                    <Badge variant="default" size="xs">{ann.targetRole}</Badge>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ann.content}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span>Author: <strong>{ann.author?.firstName} {ann.author?.lastName}</strong> ({ann.author?.role})</span>
                  <span>•</span>
                  <span>Published on {new Date(ann.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Publish Announcement Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Publish Institutional Bulletin">
        <form onSubmit={handleCreateAnnouncement} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Audience
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
              >
                <option value="ALL">Entire Campus (All Users)</option>
                <option value="STUDENT">Students Only</option>
                <option value="FACULTY">Faculty & Staff Only</option>
                <option value="ADMIN">Administrators Only</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
              >
                <option value="LOW">Low</option>
                <option value="NORMAL">Normal</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent / Emergency</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Examinations, Events, Hostel, General"
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mid-Semester Examination Schedule Published"
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Announcement Message Body
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter comprehensive announcement details..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={submitting}>
              Broadcast Announcement
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminAnnouncements;

