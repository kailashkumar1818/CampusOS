import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Skeleton from '../../components/common/Skeleton';
import { CheckSquare, Calendar, CheckCircle2, User, Save } from 'lucide-react';

const FacultyAttendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [roster, setRoster] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingRoster, setLoadingRoster] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // 1. Fetch allocated subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoadingSubjects(true);
        const res = await api.get('/academic/subjects');
        setSubjects(res.data || []);
        if (res.data?.length > 0) {
          setSelectedSubject(res.data[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSubjects(false);
      }
    };
    fetchSubjects();
  }, []);

  // 2. Fetch class roster for selected subject & date
  const fetchRoster = async () => {
    if (!selectedSubject) return;
    try {
      setLoadingRoster(true);
      setError('');
      const res = await api.get(`/attendance/class-roster?subjectId=${selectedSubject}&date=${selectedDate}`);
      setRoster(res.data?.students || []);
    } catch (err) {
      setError(err.message || 'Could not fetch class roster');
    } finally {
      setLoadingRoster(false);
    }
  };

  useEffect(() => {
    fetchRoster();
  }, [selectedSubject, selectedDate]);

  const updateStudentStatus = (studentId, status) => {
    setRoster((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, status } : s))
    );
  };

  const updateStudentRemarks = (studentId, remarks) => {
    setRoster((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, remarks } : s))
    );
  };

  const markAll = (status) => {
    setRoster((prev) => prev.map((s) => ({ ...s, status })));
  };

  const handleSaveAttendance = async () => {
    if (roster.length === 0) return;
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const records = roster.map((s) => ({
        studentId: s.studentId,
        status: s.status,
        remarks: s.remarks,
      }));

      await api.post('/attendance/mark', {
        subjectId: selectedSubject,
        date: selectedDate,
        records,
      });

      setSuccess(`Roll-call successfully recorded for ${records.length} students.`);
    } catch (err) {
      setError(err.message || 'Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Roll-Call Attendance
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Record and update lecture attendance records for your assigned subjects
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleSaveAttendance}
          isLoading={saving}
          disabled={roster.length === 0}
        >
          <Save className="w-4 h-4" /> Save & Submit Attendance
        </Button>
      </div>

      {success && (
        <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 dark:text-red-400 font-medium">
          {error}
        </div>
      )}

      {/* Selectors Bar */}
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Course Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Lecture Session Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => markAll('PRESENT')} className="flex-1">
              Mark All Present
            </Button>
            <Button variant="outline" size="sm" onClick={() => markAll('ABSENT')} className="flex-1">
              Mark All Absent
            </Button>
          </div>
        </div>
      </Card>

      {/* Roster Table */}
      <Card title="Student Enrollment Roster" subtitle={`Enrolled students for this batch (${roster.length} registered)`}>
        {loadingRoster ? (
          <Skeleton className="h-40 w-full" />
        ) : roster.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center">
            No students found enrolled in this subject's semester.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-surface-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3 px-3">Enrollment No</th>
                  <th className="pb-3 px-3">Student Name</th>
                  <th className="pb-3 px-3">Attendance Status</th>
                  <th className="pb-3 px-3">Faculty Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-surface-800">
                {roster.map((student) => (
                  <tr key={student.studentId} className="hover:bg-slate-50/50 dark:hover:bg-surface-800/30">
                    <td className="py-3 px-3 font-mono font-medium text-slate-700 dark:text-slate-300">
                      {student.enrollmentNo}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">
                      {student.name}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        {['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'].map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => updateStudentStatus(student.studentId, st)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                              student.status === st
                                ? st === 'PRESENT'
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : st === 'ABSENT'
                                  ? 'bg-rose-600 text-white shadow-sm'
                                  : st === 'LATE'
                                  ? 'bg-amber-600 text-white shadow-sm'
                                  : 'bg-sky-600 text-white shadow-sm'
                                : 'bg-slate-100 dark:bg-surface-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        value={student.remarks || ''}
                        onChange={(e) => updateStudentRemarks(student.studentId, e.target.value)}
                        placeholder="Optional note..."
                        className="w-full max-w-xs px-2.5 py-1 text-xs rounded bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FacultyAttendance;

