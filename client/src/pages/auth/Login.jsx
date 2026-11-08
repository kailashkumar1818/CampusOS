import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RotateCw, GraduationCap, UserCheck, ShieldCheck, CheckCircle } from 'lucide-react';

const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [activePortal, setActivePortal] = useState('STUDENT'); // 'STUDENT' | 'FACULTY' | 'ADMIN'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRefreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setCaptchaInput('');
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');

    // Verify Captcha
    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setError('Invalid Captcha text. Please enter the characters shown.');
      handleRefreshCaptcha();
      return;
    }

    setLoading(true);
    try {
      const user = await login(identifier, password);
      if (user.role === 'ADMIN') navigate('/admin/dashboard');
      else if (user.role === 'FACULTY') navigate('/faculty/dashboard');
      else navigate('/student/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid Register Number or Password');
      handleRefreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoId, demoPass, portalType) => {
    setIdentifier(demoId);
    setPassword(demoPass);
    setCaptchaInput(captchaCode);
    setActivePortal(portalType);
    setError('');
  };

  const portalTitles = {
    STUDENT: 'Portal for Freshers and Senior Students',
    FACULTY: 'University Faculty & Staff Academic Portal',
    ADMIN: 'Centralized Administrative Command Center',
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.70)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=80')`,
      }}
    >
      <div className="w-full max-w-[460px] relative z-10">
        {/* Main University Portal Card */}
        <div className="bg-white rounded-md shadow-2xl overflow-hidden border border-slate-300">
          {/* Header Bar (Maroon Banner as requested) */}
          <div className="bg-[#6b1328] px-4 py-3 flex items-center justify-between border-b border-[#540d1e]">
            <h2 className="text-white text-sm font-bold tracking-wide">
              {portalTitles[activePortal]}
            </h2>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] text-white/80 font-mono">SECURE</span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-2.5 rounded bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Application / Register Number */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {activePortal === 'STUDENT'
                    ? 'Application Number / Register Number'
                    : activePortal === 'FACULTY'
                    ? 'Employee ID / Faculty Register Number'
                    : 'Administrator Email / Username'}
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    activePortal === 'STUDENT'
                      ? 'Enter Application Number / Register Number'
                      : activePortal === 'FACULTY'
                      ? 'Enter Employee ID (e.g. FAC-CSE-101)'
                      : 'Enter Administrator Email'
                  }
                  className="w-full px-3 py-2 text-sm rounded border border-slate-300 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400 placeholder:text-xs"
                />
              </div>

              {/* Field 2: Password */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-3 py-2 text-sm rounded border border-slate-300 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400 placeholder:text-xs"
                />
              </div>

              {/* Field 3: Captcha Box */}
              <div>
                <div className="flex items-center gap-3 my-2">
                  <div className="px-4 py-1.5 bg-slate-100 border border-slate-300 rounded font-mono font-extrabold text-2xl tracking-widest text-slate-800 select-none shadow-inner">
                    {captchaCode}
                  </div>
                  <button
                    type="button"
                    onClick={handleRefreshCaptcha}
                    title="Generate new Captcha"
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>

                <input
                  type="text"
                  required
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter Captcha Text"
                  className="w-full px-3 py-2 text-sm rounded border border-slate-300 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400 placeholder:text-xs uppercase"
                />
              </div>

              {/* Field 4: Login Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded bg-[#5bb75b] hover:bg-[#4ea64e] text-white font-bold text-sm tracking-wide shadow transition-colors duration-150 disabled:opacity-60"
              >
                {loading ? 'Authenticating...' : 'Login'}
              </button>

              {/* Bottom Forgot Password Link */}
              <div className="flex justify-end pt-1">
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#2b4c8a] hover:underline font-normal"
                >
                  Forgot Password
                </Link>
              </div>
            </form>
          </div>

          {/* Quick-Fill Demo Personas Bar */}
          <div className="bg-slate-50 border-t border-slate-200 px-4 py-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block text-center mb-2">
              Instant One-Click Login for Demo:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('EN2024CS042', 'Student@123456', 'STUDENT')}
                className={`py-1.5 px-2 rounded border text-center transition-all ${
                  activePortal === 'STUDENT'
                    ? 'border-[#6b1328] bg-rose-50/50 text-[#6b1328] font-bold'
                    : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 mx-auto mb-0.5" />
                <span className="text-[11px] block">Student</span>
                <span className="text-[9px] text-slate-400 font-mono">EN2024CS042</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('FAC-CSE-101', 'Faculty@123456', 'FACULTY')}
                className={`py-1.5 px-2 rounded border text-center transition-all ${
                  activePortal === 'FACULTY'
                    ? 'border-[#6b1328] bg-rose-50/50 text-[#6b1328] font-bold'
                    : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 mx-auto mb-0.5" />
                <span className="text-[11px] block">Faculty</span>
                <span className="text-[9px] text-slate-400 font-mono">FAC-CSE-101</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('admin@campusos.edu', 'Admin@123456', 'ADMIN')}
                className={`py-1.5 px-2 rounded border text-center transition-all ${
                  activePortal === 'ADMIN'
                    ? 'border-[#6b1328] bg-rose-50/50 text-[#6b1328] font-bold'
                    : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 mx-auto mb-0.5" />
                <span className="text-[11px] block">Admin</span>
                <span className="text-[9px] text-slate-400 font-mono">admin@campusos.edu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Registration Link */}
        <p className="text-center text-xs text-white/90 mt-4 drop-shadow">
          New Student or Staff Registration?{' '}
          <Link to="/register" className="font-bold underline text-white hover:text-rose-200">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
