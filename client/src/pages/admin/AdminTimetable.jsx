import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Skeleton from '../../components/common/Skeleton';
import { Calendar, Plus, Clock, Trash2, CheckCircle2 } from 'lucide-react';

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

const AdminTimetable = () => {
  const [slots, setSlots] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form
  const [subjectId, setSubjectId] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [semesterId, setSemesterId] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('MONDAY');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('10:30 AM');
  const [roomNo, setRoomNo] = useState('Hall-101');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchTimetableData = async () => {
    try {
      setLoading(true);
      const [ttRes, subRes, facRes, semRes] = await Promise.all([
        api.get('/timetable'),
        api.get('/academic/subjects'),
        api.get('/users/faculties'),
        api.get('/academic/semesters'),
      ]);
      setSlots(ttRes.data || []);
      setSubjects(subRes.data || []);
      setFaculties(facRes.data || []);
      setSemesters(semRes.data || []);

      if (subRes.data?.length > 0) setSubjectId(subRes.data[0].id);
      if (facRes.data?.length > 0) setFacultyId(facRes.data[0].id);
      if (semRes.data?.length > 0) setSemesterId(semRes.data[0].id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/timetable', {
        subjectId,
        facultyId,
        semesterId,
        dayOfWeek,
        startTime,
        endTime,
        roomNo,
      });

      setSuccess('Timetable slot scheduled successfully!');
      setShowModal(false);
      fetchTimetableData();
    } catch (err) {
      setError(err.message || 'Scheduling conflict or error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (!window.confirm('Delete this scheduled class?')) return;
    try {
      await api.delete(`/timetable/${slotId}`);
      fetchTimetableData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Institutional Master Timetable
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Classroom scheduling matrix, room allocation, and collision prevention
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" /> Schedule Slot
        </Button>
      </div>

      {success && (
        <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Week Grid */}
      <div className="space-y-6">
        {DAYS.map((day) => {
          const daySlots = slots.filter((s) => s.dayOfWeek === day);
          return (
            <Card key={day} title={day} subtitle={`${daySlots.length} scheduled periods`}>
              {daySlots.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 italic">No lectures scheduled for {day.toLowerCase()}.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {daySlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-surface-950/60 border border-slate-200/80 dark:border-surface-800/80 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-900">
                            {slot.roomNo}
                          </span>
                          <button
                            onClick={() => handleDeleteSlot(slot.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {slot.subject?.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Instructor: {slot.faculty?.user?.firstName} {slot.faculty?.user?.lastName}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-200/50 dark:border-surface-800/50 flex items-center justify-between text-xs text-slate-500">
                        <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {slot.startTime} - {slot.endTime}
                        </span>
                        <span className="text-[11px]">Sem {slot.semester?.semesterNo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Schedule Slot Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Schedule New Timetable Slot">
        <form onSubmit={handleCreateSlot} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Subject
            </label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Assigned Faculty Member
            </label>
            <select
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            >
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.user?.firstName} {f.user?.lastName} ({f.employeeId})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Day of Week
              </label>
              <select
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Classroom / Lab No
              </label>
              <input
                type="text"
                required
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Start Time
              </label>
              <input
                type="text"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="e.g. 09:00 AM"
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                End Time
              </label>
              <input
                type="text"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="e.g. 10:30 AM"
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={submitting}>
              Schedule Lecture
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminTimetable;

