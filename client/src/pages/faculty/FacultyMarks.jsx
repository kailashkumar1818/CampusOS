import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Skeleton from '../../components/common/Skeleton';
import { Award, CheckCircle2, Save, FileText } from 'lucide-react';

const FacultyMarks = () => {
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [remarksData, setRemarksData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const res = await api.get('/examinations');
        setExams(res.data || []);
        if (res.data?.length > 0) {
          setSelectedExamId(res.data[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  const selectedExam = exams.find((e) => e.id === selectedExamId);

  useEffect(() => {
    if (!selectedExam) return;
    const fetchStudentsForExam = async () => {
      try {
        const res = await api.get(`/users/students?semesterId=${selectedExam.semesterId}`);
        const studentList = res.data?.data || res.data || [];
        setStudents(studentList);

        // Prepopulate if exists
        const initialMarks = {};
        const initialRemarks = {};
        studentList.forEach((s) => {
          initialMarks[s.id] = '';
          initialRemarks[s.id] = '';
        });
        setMarksData(initialMarks);
        setRemarksData(initialRemarks);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudentsForExam();
  }, [selectedExamId]);

  const handlePublishMarks = async () => {
    if (students.length === 0) return;
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const marksRecords = students
        .filter((s) => marksData[s.id] !== '' && marksData[s.id] !== undefined)
        .map((s) => ({
          studentId: s.id,
          marksObtained: Number(marksData[s.id]),
          remarks: remarksData[s.id] || '',
        }));

      if (marksRecords.length === 0) {
        setError('Please enter marks for at least one student.');
        setSaving(false);
        return;
      }

      await api.post('/examinations/marks/upload', {
        examinationId: selectedExamId,
        marksRecords,
      });

      setSuccess(`Grades published for ${marksRecords.length} students. Real-time notifications dispatched!`);
    } catch (err) {
      setError(err.message || 'Failed to upload examination marks');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Examination Grade Uploader
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Submit formal assessment scores and evaluate student course performance
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handlePublishMarks}
          isLoading={saving}
          disabled={students.length === 0}
        >
          <Save className="w-4 h-4" /> Publish Marks & Notify
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

      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Examination Sitting
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {exams.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} — {e.subject?.name} (Max: {e.totalMarks} pts)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
            {selectedExam && (
              <div className="space-y-1">
                <p>Date: <strong className="text-slate-800 dark:text-slate-200">{new Date(selectedExam.examDate).toLocaleDateString()}</strong></p>
                <p>Timing: <strong className="text-slate-800 dark:text-slate-200">{selectedExam.startTime} - {selectedExam.endTime}</strong> (Room: {selectedExam.roomNo})</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card title="Student Grade Sheet" subtitle={`Enrolled class candidates (${students.length} students)`}>
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : students.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center">No enrolled students found for this examination.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-surface-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3 px-3">Enrollment No</th>
                  <th className="pb-3 px-3">Student Full Name</th>
                  <th className="pb-3 px-3">Score (Out of {selectedExam?.totalMarks || 100})</th>
                  <th className="pb-3 px-3">Feedback / Performance Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-surface-800">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/50 dark:hover:bg-surface-800/30">
                    <td className="py-3 px-3 font-mono font-medium text-slate-700 dark:text-slate-300">
                      {st.enrollmentNo}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-100">
                      {st.user?.firstName} {st.user?.lastName}
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="number"
                        min={0}
                        max={selectedExam?.totalMarks || 100}
                        value={marksData[st.id] ?? ''}
                        onChange={(e) => setMarksData({ ...marksData, [st.id]: e.target.value })}
                        placeholder="e.g. 85"
                        className="w-24 px-3 py-1.5 text-xs rounded bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-1 focus:ring-brand-500 font-semibold"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        value={remarksData[st.id] ?? ''}
                        onChange={(e) => setRemarksData({ ...remarksData, [st.id]: e.target.value })}
                        placeholder="Evaluation comments..."
                        className="w-full max-w-sm px-3 py-1.5 text-xs rounded bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
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

export default FacultyMarks;

