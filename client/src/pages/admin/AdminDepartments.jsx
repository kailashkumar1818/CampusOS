import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Skeleton from '../../components/common/Skeleton';
import { Layers, Plus, BookOpen } from 'lucide-react';

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal controls
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);

  // Form states
  const [deptCode, setDeptCode] = useState('');
  const [deptName, setDeptName] = useState('');
  const [deptDesc, setDeptDesc] = useState('');

  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseDeptId, setCourseDeptId] = useState('');
  const [courseDuration, setCourseDuration] = useState(4);

  const [subCode, setSubCode] = useState('');
  const [subName, setSubName] = useState('');
  const [subCredits, setSubCredits] = useState(3);
  const [subDeptId, setSubDeptId] = useState('');
  const [subSemId, setSubSemId] = useState('');
  const [semesters, setSemesters] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [deptRes, courseRes, subRes, semRes] = await Promise.all([
        api.get('/academic/departments'),
        api.get('/academic/courses'),
        api.get('/academic/subjects'),
        api.get('/academic/semesters'),
      ]);
      setDepartments(deptRes.data || []);
      setCourses(courseRes.data || []);
      setSubjects(subRes.data || []);
      setSemesters(semRes.data || []);

      if (deptRes.data?.length > 0) {
        setCourseDeptId(deptRes.data[0].id);
        setSubDeptId(deptRes.data[0].id);
      }
      if (semRes.data?.length > 0) {
        setSubSemId(semRes.data[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateDept = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api.post('/academic/departments', {
        code: deptCode,
        name: deptName,
        description: deptDesc,
      });
      setShowDeptModal(false);
      setDeptCode('');
      setDeptName('');
      setDeptDesc('');
      fetchData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api.post('/academic/courses', {
        code: courseCode,
        name: courseName,
        departmentId: courseDeptId,
        durationYears: Number(courseDuration),
      });
      setShowCourseModal(false);
      setCourseCode('');
      setCourseName('');
      fetchData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api.post('/academic/subjects', {
        code: subCode,
        name: subName,
        credits: Number(subCredits),
        departmentId: subDeptId,
        semesterId: subSemId,
      });
      setShowSubjectModal(false);
      setSubCode('');
      setSubName('');
      fetchData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Departments, Degree Programs & Curriculum
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Institutional academic structure configuration and course catalog
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShowDeptModal(true)}>
            <Plus className="w-4 h-4" /> Add Department
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setShowCourseModal(true)}>
            <Plus className="w-4 h-4" /> Add Course
          </Button>
          <Button variant="primary" size="sm" onClick={() => setShowSubjectModal(true)}>
            <Plus className="w-4 h-4" /> Add Subject
          </Button>
        </div>
      </div>

      {/* Departments Section */}
      <Card title="University Departments" subtitle="Colleges and research divisions">
        {loading ? (
          <Skeleton className="h-28 w-full" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map((d) => (
              <div
                key={d.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-surface-950/60 border border-slate-200/80 dark:border-surface-800/80 flex items-start justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-900">
                    {d.code}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">
                    {d.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {d.description || 'No description provided.'}
                  </p>
                </div>
                <div className="text-right text-[11px] text-slate-400 space-y-0.5">
                  <p>{d._count?.courses || 0} Degree Courses</p>
                  <p>{d._count?.faculties || 0} Faculty Members</p>
                  <p>{d._count?.subjects || 0} Subjects</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Subjects Catalog */}
      <Card title="Course Subjects Catalog" subtitle="Active academic subjects with credit ratings">
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-surface-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3 px-3">Subject Code</th>
                  <th className="pb-3 px-3">Subject Title</th>
                  <th className="pb-3 px-3">Department</th>
                  <th className="pb-3 px-3">Semester</th>
                  <th className="pb-3 px-3">Credits</th>
                  <th className="pb-3 px-3">Allocated Faculty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-surface-800">
                {subjects.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 dark:hover:bg-surface-800/30">
                    <td className="py-3 px-3 font-mono font-bold text-brand-600 dark:text-brand-400">
                      {sub.code}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">
                      {sub.name}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                      {sub.department?.code}
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      Sem {sub.semester?.semesterNo}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                      {sub.credits}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                      {sub.facultyAlloc?.length > 0
                        ? sub.facultyAlloc.map((f) => `${f.faculty?.user?.firstName} ${f.faculty?.user?.lastName}`).join(', ')
                        : 'Unassigned'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Create Department Modal */}
      <Modal isOpen={showDeptModal} onClose={() => setShowDeptModal(false)} title="Create Academic Department">
        <form onSubmit={handleCreateDept} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Department Code (e.g. CSE, ECE)
            </label>
            <input
              type="text"
              required
              value={deptCode}
              onChange={(e) => setDeptCode(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Department Name
            </label>
            <input
              type="text"
              required
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={deptDesc}
              onChange={(e) => setDeptDesc(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowDeptModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={submitting}>
              Save Department
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Course Modal */}
      <Modal isOpen={showCourseModal} onClose={() => setShowCourseModal(false)} title="Create Degree Course">
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Host Department
            </label>
            <select
              value={courseDeptId}
              onChange={(e) => setCourseDeptId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            >
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Course Code (e.g. BTECH-CSE)
            </label>
            <input
              type="text"
              required
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Degree Program Name
            </label>
            <input
              type="text"
              required
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Duration (Years)
            </label>
            <input
              type="number"
              min={1}
              max={6}
              value={courseDuration}
              onChange={(e) => setCourseDuration(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowCourseModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={submitting}>
              Save Course
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Subject Modal */}
      <Modal isOpen={showSubjectModal} onClose={() => setShowSubjectModal(false)} title="Add Curriculum Subject">
        <form onSubmit={handleCreateSubject} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Department
              </label>
              <select
                value={subDeptId}
                onChange={(e) => setSubDeptId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.code}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Semester
              </label>
              <select
                value={subSemId}
                onChange={(e) => setSubSemId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
              >
                {semesters.map((s) => (
                  <option key={s.id} value={s.id}>Sem {s.semesterNo} ({s.academicYear})</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Subject Code (e.g. CS401)
            </label>
            <input
              type="text"
              required
              value={subCode}
              onChange={(e) => setSubCode(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Subject Title
            </label>
            <input
              type="text"
              required
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Credits
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={subCredits}
              onChange={(e) => setSubCredits(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowSubjectModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={submitting}>
              Save Subject
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDepartments;

