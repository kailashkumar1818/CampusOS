import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import Button from '../../components/common/Button';
import { Mail, Lock, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token');

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.message || 'If an account exists, a reset link has been dispatched.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await api.post('/auth/reset-password', { token: resetToken, newPassword });
      setMessage(res.message || 'Password updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-surface-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {resetToken ? 'Set New Password' : 'Reset Password'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {resetToken ? 'Enter your new secure password below' : 'Enter your registered email to receive recovery instructions'}
          </p>
        </div>

        <div className="bg-white dark:bg-surface-900 rounded-2xl p-8 border border-slate-200 dark:border-surface-800 shadow-xl">
          {message && (
            <div className="mb-5 p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="mb-5 p-3.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 dark:text-red-400 font-medium">
              {error}
            </div>
          )}

          {!resetToken ? (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  University Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@campusos.edu"
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
                Send Password Reset Link
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSetNewPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
                Update Password
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

