import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Skeleton from '../../components/common/Skeleton';
import { BookOpen, UploadCloud, Download, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/assignments');
      setAssignments(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a document file to upload');
      return;
    }
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      await api.post(`/assignments/${selectedAssignment.id}/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Assignment submitted successfully!');
      setSelectedAssignment(null);
      setFile(null);
      fetchAssignments();
    } catch (err) {
      setError(err.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Coursework & Assignments
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Submit solutions, track deadlines, and view faculty assessment feedback
          </p>
        </div>
      </div>

      {success && (
        <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      ) : assignments.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No assignments posted yet
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Your professors have not published any assignments for this semester.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {assignments.map((item) => (
            <Card key={item.id} className="hover:border-brand-500/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-semibold border border-brand-200 dark:border-brand-900">
                      {item.subject?.code}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 max-w-2xl">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span>Subject: <strong className="text-slate-700 dark:text-slate-300">{item.subject?.name}</strong></span>
                    <span>Deadline: <strong className="text-slate-700 dark:text-slate-300">{new Date(item.deadline).toLocaleString()}</strong></span>
                    <span>Max Score: <strong className="text-slate-700 dark:text-slate-300">{item.maxMarks} pts</strong></span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  {item.attachmentUrl && (
                    <a
                      href={`http://localhost:5000${item.attachmentUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-surface-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-surface-800"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Attachment
                    </a>
                  )}

                  {item.isSubmitted ? (
                    <div className="flex items-center gap-2">
                      <Badge variant="success">Submitted</Badge>
                      {item.submission?.marks !== null && item.submission?.marks !== undefined ? (
                        <div className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                          {item.submission.marks} / {item.maxMarks}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">Grading Pending</span>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant={item.isPastDeadline ? 'danger' : 'primary'}
                      size="sm"
                      onClick={() => setSelectedAssignment(item)}
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      {item.isPastDeadline ? 'Submit (Late)' : 'Submit Work'}
                    </Button>
                  )}
                </div>
              </div>

              {/* Show feedback if graded */}
              {item.submission?.feedback && (
                <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-surface-950/60 border border-slate-200/60 dark:border-surface-800/60 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">Faculty Feedback:</span>
                  <p className="text-slate-600 dark:text-slate-400 italic">"{item.submission.feedback}"</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Upload Submission Modal */}
      <Modal
        isOpen={Boolean(selectedAssignment)}
        onClose={() => {
          setSelectedAssignment(null);
          setFile(null);
          setError('');
        }}
        title={`Submit: ${selectedAssignment?.title}`}
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-surface-700 text-center hover:bg-slate-50 dark:hover:bg-surface-950 transition-colors">
            <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Upload solution document
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Supported formats: PDF, DOCX, ZIP, TXT (Up to 15MB)
            </p>
            <input
              type="file"
              required
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-3 text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 dark:file:bg-brand-950 dark:file:text-brand-300"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedAssignment(null);
                setFile(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={submitting}>
              Upload & Submit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentAssignments;

