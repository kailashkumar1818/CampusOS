import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Skeleton from '../../components/common/Skeleton';
import { GraduationCap, Search, CheckCircle, XCircle } from 'lucide-react';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page,
        limit: 10,
        ...(search && { search }),
      });
      const res = await api.get(`/users/students?${queryParams.toString()}`);
      setStudents(res.data || []);
      setPagination(res.pagination || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchStudents();
  };

  const handleToggleStatus = async (userId) => {
    try {
      await api.patch(`/users/${userId}/toggle-status`);
      fetchStudents();
    } catch (err) {
      alert(err.message || 'Status update failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Student Cohort Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit matriculation data, monitor active degree enrollments, and toggle access permissions
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, enrollment no, or email..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-surface-900 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <Button variant="primary" size="sm" type="submit">
          Search
        </Button>
      </form>

      <Card>
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : students.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center">No student records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-surface-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3 px-3">Enrollment</th>
                  <th className="pb-3 px-3">Student Name</th>
                  <th className="pb-3 px-3">Email</th>
                  <th className="pb-3 px-3">Degree Course</th>
                  <th className="pb-3 px-3">Semester</th>
                  <th className="pb-3 px-3">Hostel</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-surface-800">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/50 dark:hover:bg-surface-800/30">
                    <td className="py-3 px-3 font-mono font-medium text-slate-700 dark:text-slate-300">
                      {st.enrollmentNo}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">
                      {st.user?.firstName} {st.user?.lastName}
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-mono">
                      {st.user?.email}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">
                      {st.course?.code}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                      Sem {st.semester?.semesterNo}
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {st.hostelRoom || 'Day Scholar'}
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant={st.user?.isActive ? 'success' : 'danger'} size="xs">
                        {st.user?.isActive ? 'Active' : 'Suspended'}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Button
                        variant={st.user?.isActive ? 'ghost' : 'outline'}
                        size="sm"
                        onClick={() => handleToggleStatus(st.user?.id)}
                      >
                        {st.user?.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-surface-800 text-xs">
            <span className="text-slate-400">
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} students)
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminStudents;

