import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Skeleton from '../../components/common/Skeleton';
import { BookOpen, Plus, Download, CheckCircle2, Award, Users } from 'lucide-react';

const FacultyAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionsData, setSubmissionsData] = useState(null);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  // Create form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [deadline, setDeadline] = useState('');
  const [maxMarks, setMaxMarks] = useState(100);
  const [attachment, setAttachment] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Grading form state
  const [gradingSubmissionId, setGradingSubmissionId] = useState(null);
  const [gradeMarks, setGradeMarks] = useState('');
  const [gradeFeedback, setGradeFeedback] = useState('');
  const [savingGrade, setSavingGrade] = useState(false);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const [assRes, subRes] = await Promise.all([
        api.get('/assignments'),
        api.get('/academic/subjects'),
      ]);
      setAssignments(assRes.data || []);
      setSubjects(subRes.data || []);
      if (subRes.data?.length > 0) setSubjectId(subRes.data[0].id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('subjectId', subjectId);
      formData.append('deadline', new Date(deadline).toISOString());
      formData.append('maxMarks', maxMarks);
      if (attachment) {
        formData.append('attachment', attachment);
      }

      await api.post('/assignments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Assignment published successfully!');
      setShowCreateModal(false);
      setTitle('');
      setDescription('');
      setAttachment(null);
      fetchAssignments();
    } catch (err) {
      setError(err.message || 'Failed to create assignment');
    } finally {
      setSubmitting(false);
    }
  };

  const openSubmissions = async (assignment) => {
    setSelectedAssignment(assignment);
    try {
      setLoadingSubmissions(true);
      const res = await api.get(`/assignments/${assignment.id}/submissions`);
      setSubmissionsData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const handleSaveGrade = async (e) => {
    e.preventDefault();
    if (!gradingSubmissionId) return;
    setSavingGrade(true);
    try {
      await api.patch(`/assignments/submissions/${gradingSubmissionId}/grade`, {
        marks: Number(gradeMarks),
        feedback: gradeFeedback,
      });

      // Refresh submissions
      const res = await api.get(`/assignments/${selectedAssignment.id}/submissions`);
      setSubmissionsData(res.data);
      setGradingSubmissionId(null);
      setGradeMarks('');
      setGradeFeedback('');
    } catch (err) {
      alert(err.message || 'Failed to save grade');
    } finally {
      setSavingGrade(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Assignments & Coursework Manager
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Publish coursework, inspect uploaded student work, and submit grades with feedback
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4" /> Create New Assignment
        </Button>
      </div>

      {success && (
        <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {loading ? (
        <Skeleton className="h-40 w-full" count={2} />
      ) : assignments.length === 0 ? (
        <Card>
          <div className="text-center py-10">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No assignments published yet
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Click 'Create New Assignment' to post coursework to your students.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {assignments.map((item) => (
            <Card key={item.id} className="hover:border-brand-500/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-semibold border border-brand-200 dark:border-brand-900">
                      {item.subject?.code}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span>Subject: <strong className="text-slate-700 dark:text-slate-300">{item.subject?.name}</strong></span>
                    <span>Deadline: <strong className="text-slate-700 dark:text-slate-300">{new Date(item.deadline).toLocaleString()}</strong></span>
                    <span>Max Marks: <strong className="text-slate-700 dark:text-slate-300">{item.maxMarks}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" onClick={() => openSubmissions(item)}>
                    <Users className="w-3.5 h-3.5" />
                    Review Submissions ({item._count?.submissions || 0})
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Review Submissions Modal */}
      <Modal
        isOpen={Boolean(selectedAssignment)}
        onClose={() => {
          setSelectedAssignment(null);
          setSubmissionsData(null);
        }}
        title={`Submissions: ${selectedAssignment?.title}`}
        maxWidth="max-w-3xl"
      >
        {loadingSubmissions ? (
          <Skeleton className="h-40 w-full" />
        ) : !submissionsData?.submissions || submissionsData.submissions.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">No student has submitted work for this task yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-surface-800 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="pb-2 px-2">Student</th>
                    <th className="pb-2 px-2">Submitted File</th>
                    <th className="pb-2 px-2">Date</th>
                    <th className="pb-2 px-2">Status</th>
                    <th className="pb-2 px-2">Score</th>
                    <th className="pb-2 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-surface-800">
                  {submissionsData.submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 dark:hover:bg-surface-800/30">
                      <td className="py-2.5 px-2 font-medium text-slate-900 dark:text-slate-100">
                        {sub.student?.user?.firstName} {sub.student?.user?.lastName}
                      </td>
                      <td className="py-2.5 px-2">
                        <a
                          href={`http://localhost:5000${sub.fileUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" /> {sub.fileName || 'Download'}
                        </a>
                      </td>
                      <td className="py-2.5 px-2 text-slate-500 font-mono">
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="py-2.5 px-2">
                        <Badge variant={sub.status === 'GRADED' ? 'success' : 'warning'} size="xs">
                          {sub.status}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-2 font-bold text-slate-900 dark:text-slate-100">
                        {sub.marks !== null ? `${sub.marks} / ${selectedAssignment.maxMarks}` : '—'}
                      </td>
                      <td className="py-2.5 px-2 text-right">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setGradingSubmissionId(sub.id);
                            setGradeMarks(sub.marks || '');
                            setGradeFeedback(sub.feedback || '');
                          }}
                        >
                          Grade
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Inline Grade Editor Drawer */}
            {gradingSubmissionId && (
              <form onSubmit={handleSaveGrade} className="p-4 rounded-xl bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Evaluate Submission
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Score (Max {selectedAssignment.maxMarks})
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      max={selectedAssignment.maxMarks}
                      value={gradeMarks}
                      onChange={(e) => setGradeMarks(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-surface-900 border border-slate-200 dark:border-surface-800"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Feedback & Constructive Remarks
                    </label>
                    <input
                      type="text"
                      value={gradeFeedback}
                      onChange={(e) => setGradeFeedback(e.target.value)}
                      placeholder="e.g. Clean proof, check edge condition on Line 42"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-surface-900 border border-slate-200 dark:border-surface-800"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <Button variant="outline" size="sm" onClick={() => setGradingSubmissionId(null)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit" isLoading={savingGrade}>
                    Publish Grade & Notify Student
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </Modal>

      {/* Create Assignment Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setError('');
        }}
        title="Publish New Assignment"
      >
        <form onSubmit={handleCreateAssignment} className="space-y-4">
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
              Assignment Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Distributed Consensus Lab"
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Instructions & Problem Statement
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed instructions for the students..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Deadline Date & Time
              </label>
              <input
                type="datetime-local"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Maximum Score
              </label>
              <input
                type="number"
                required
                min={1}
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Reference Material / Attachment (Optional)
            </label>
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
              className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 dark:file:bg-brand-950 dark:file:text-brand-300"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="outline" size="sm" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={submitting}>
              Publish Coursework
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FacultyAssignments;

