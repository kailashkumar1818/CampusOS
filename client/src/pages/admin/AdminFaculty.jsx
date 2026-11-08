import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Skeleton from '../../components/common/Skeleton';
import { Users, Plus, BookOpen, Search } from 'lucide-react';

const AdminFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [targetSubjectId, setTargetSubjectId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  const fetchFaculties = async () => {
    try {
      setLoading(true);
      const [facRes, subRes] = await Promise.all([
        api.get(`/users/faculties?search=${search}`),
        api.get('/academic/subjects'),
      ]);
      setFaculties(facRes.data || []);
      setSubjects(subRes.data || []);
      if (subRes.data?.length > 0) setTargetSubjectId(subRes.data[0].id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const handleAllocate = async (e) => {
    e.preventDefault();
    if (!selectedFaculty || !targetSubjectId) return;
    setSubmitting(true);
    try {
      await api.post('/academic/allocations', {
        facultyId: selectedFaculty.id,
        subjectId: targetSubjectId,
      });
      setSuccess('Faculty member successfully allocated to subject!');
      setShowAllocateModal(false);
      fetchFaculties();
    } catch (err) {
      alert(err.message || 'Allocation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeallocate = async (subjectId, facultyId) => {
    if (!window.confirm('Remove this subject assignment?')) return;
    try {
      await api.delete(`/academic/allocations/${subjectId}/${facultyId}`);
      fetchFaculties();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Faculty & Academic Staff Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage professorial roster, departmental assignments, and subject allocations
          </p>
        </div>
      </div>

      <Card>
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : faculties.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center">No faculty records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-surface-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3 px-3">Employee ID</th>
                  <th className="pb-3 px-3">Faculty Name</th>
                  <th className="pb-3 px-3">Department</th>
                  <th className="pb-3 px-3">Designation</th>
                  <th className="pb-3 px-3">Allocated Subjects</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-surface-800">
                {faculties.map((fac) => (
                  <tr key={fac.id} className="hover:bg-slate-50/50 dark:hover:bg-surface-800/30">
                    <td className="py-3 px-3 font-mono font-medium text-slate-700 dark:text-slate-300">
                      {fac.employeeId}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">
                      {fac.user?.firstName} {fac.user?.lastName}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                      {fac.department?.code} - {fac.department?.name}
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {fac.designation}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1.5">
                        {fac.subjectAllocations?.length === 0 ? (
                          <span className="text-slate-400 italic">No subjects allocated</span>
                        ) : (
                          fac.subjectAllocations.map((alloc) => (
                            <span
                              key={alloc.id}
                              className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-900"
                            >
                              {alloc.subject?.code}
                              <button
                                type="button"
                                onClick={() => handleDeallocate(alloc.subjectId, fac.id)}
                                className="text-slate-400 hover:text-red-500 font-bold ml-1"
                              >
                                ×
                              </button>
                            </span>
                          ))
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedFaculty(fac);
                          setShowAllocateModal(true);
                        }}
                      >
                        <Plus className="w-3 h-3" /> Allocate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Allocate Subject Modal */}
      <Modal
        isOpen={showAllocateModal}
        onClose={() => setShowAllocateModal(false)}
        title={`Allocate Subject to ${selectedFaculty?.user?.firstName} ${selectedFaculty?.user?.lastName}`}
      >
        <form onSubmit={handleAllocate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Curriculum Subject
            </label>
            <select
              value={targetSubjectId}
              onChange={(e) => setTargetSubjectId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} - {s.name} ({s.department?.code})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="outline" size="sm" onClick={() => setShowAllocateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={submitting}>
              Confirm Allocation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminFaculty;

