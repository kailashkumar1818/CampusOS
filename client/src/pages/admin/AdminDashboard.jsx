import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Skeleton from '../../components/common/Skeleton';
import {
  Users,
  GraduationCap,
  Layers,
  BookOpen,
  Home,
  CheckSquare,
  TrendingUp,
  Activity,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#8a122e', '#10b981', '#f59e0b', '#be2748', '#d97706'];

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminAnalytics = async () => {
      try {
        setLoading(true);
        const res = await api.get('/analytics/admin');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Skeleton className="h-28" count={4} />
        </div>
      </div>
    );
  }

  const { stats, departmentDistribution, complaintBreakdown, attendanceBreakdown, recentAnnouncements } = data || {};

  const complaintChartData = Object.entries(complaintBreakdown || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const attendanceChartData = Object.entries(attendanceBreakdown || {}).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-surface-900 to-brand-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-brand-200 mb-3">
              <Activity className="w-3.5 h-3.5 text-emerald-400" /> Live University Telemetry
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              CampusOS Institutional Command Center
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Centralized oversight across academic faculties, student cohorts, and campus facilities.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="hover:border-brand-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Students
            </span>
            <span className="p-2 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
              <GraduationCap className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {stats?.totalStudents || 0}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Active matriculated students
            </p>
          </div>
        </Card>

        <Card className="hover:border-brand-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Faculty Members
            </span>
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Users className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {stats?.totalFaculties || 0}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Professors & researchers
            </p>
          </div>
        </Card>

        <Card className="hover:border-brand-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Academic Depts
            </span>
            <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Layers className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {stats?.totalDepartments || 0}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Across engineering & science
            </p>
          </div>
        </Card>

        <Card className="hover:border-brand-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Degree Courses
            </span>
            <span className="p-2 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <BookOpen className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {stats?.totalCourses || 0}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Accredited programs
            </p>
          </div>
        </Card>
      </div>

      {/* Recharts Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Department Distribution Bar Chart */}
        <div className="lg:col-span-8">
          <Card title="Student Enrollment by Department" subtitle="Demographic distribution across faculties">
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentDistribution || []}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '8px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="students" fill="#8a122e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Complaints Breakdown Pie Chart */}
        <div className="lg:col-span-4">
          <Card title="Hostel Grievances" subtitle="Resolution pipeline">
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complaintChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {complaintChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '8px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 pt-2 text-xs">
              {complaintChartData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-slate-600 dark:text-slate-400 text-[11px] font-medium">
                    {entry.name}: {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Announcements Feed */}
      <Card title="Broadcast Log" subtitle="Recent campus-wide announcements">
        <div className="divide-y divide-slate-100 dark:divide-surface-800">
          {recentAnnouncements?.map((ann) => (
            <div key={ann.id} className="py-3 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{ann.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{ann.content}</p>
              </div>
              <Badge variant={ann.priority === 'HIGH' ? 'danger' : 'primary'} size="xs">
                {ann.targetRole}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;

