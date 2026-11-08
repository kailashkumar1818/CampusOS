import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Sun, Moon, Check, Printer, Shield, Clock, Sparkles, Bot } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const { notifications, unreadCount, markAllAsRead, socket } = useSocket();
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const notifRef = useRef(null);

  // Digital Live Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format current breadcrumb
  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumb = pathParts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('  ›  ') || 'Dashboard';

  const userRole = user?.role || 'STUDENT';
  const displayName = userRole === 'FACULTY' 
    ? (user?.firstName ? `Dr. ${user.firstName} ${user.lastName}` : 'Dr. Robert Johnson')
    : userRole === 'STUDENT'
    ? (user?.firstName ? `${user.firstName} ${user.lastName}` : 'Rahul Kumar')
    : 'System Administrator';

  const userCode = userRole === 'FACULTY'
    ? (user?.facultyProfile?.employeeId || 'FAC-CSE-101')
    : userRole === 'STUDENT'
    ? (user?.studentProfile?.enrollmentNo || 'EN2024CS042')
    : 'ADMIN-ROOT';

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-surface-900 border-b border-slate-200 dark:border-surface-800 shadow-xs transition-colors no-print">
      <div className="h-13 px-3 sm:px-5 flex items-center justify-between gap-3">
        {/* Left: Hamburger & Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-surface-800 lg:hidden"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-extrabold text-[#1f3a52] dark:text-sky-400 text-xs tracking-wider uppercase flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              CampusOS ERP
            </span>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
          </div>

          {/* Breadcrumb Trail */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 truncate">
            <span className="font-semibold text-[#1f3a52] dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 px-2.5 py-0.5 rounded border border-sky-200 dark:border-sky-800/50 truncate">
              {breadcrumb}
            </span>
          </div>
        </div>

        {/* Center: Sleek Live Notice Ticker on Desktop */}
        <div className="hidden xl:flex items-center gap-2 max-w-md overflow-hidden bg-sky-50/70 dark:bg-surface-800/60 border border-sky-200/70 dark:border-surface-700 rounded-full px-3 py-1 text-[11px] text-slate-700 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0"></span>
          <span className="font-bold text-[#1f3a52] dark:text-sky-300 shrink-0">Notice:</span>
          <div className="truncate font-medium text-slate-600 dark:text-slate-400">
            Odd Sem AY 2026-27 • Minimum 75% attendance mandatory for exam hall ticket
          </div>
        </div>

        {/* Right: Actions & User Info */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Digital Clock */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-surface-800 px-2.5 py-1 rounded border border-slate-200 dark:border-surface-700">
            <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>
              {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' })},{' '}
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* Ask AI Shortcut */}
          <Link
            to={userRole === 'FACULTY' ? '/faculty/ai-assistant' : '/student/ai-assistant'}
            title="Open CampusOS AI Academic Assistant"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold bg-gradient-to-r from-cyan-600 to-[#1f3a52] hover:from-cyan-500 hover:to-[#284a68] text-white shadow-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
            <span className="hidden sm:inline">Ask AI</span>
          </Link>

          {/* Quick Print Page Button */}
          <button
            onClick={() => window.print()}
            title="Print Page"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-surface-800 border border-slate-200 dark:border-surface-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Print</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Color Theme"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-surface-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Real-time Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              title="Circulars & Alerts"
              className="p-1.5 relative rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-surface-800 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-surface-900">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Drawer */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-surface-900 rounded-lg shadow-xl border border-slate-300 dark:border-surface-700 py-2 z-50 overflow-hidden">
                <div className="px-4 py-2 bg-slate-50 dark:bg-surface-800/50 border-b border-slate-200 dark:border-surface-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1f3a52] dark:text-sky-300 uppercase tracking-wide">
                    Official Circulars & Alerts
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] text-[#2ba2c5] hover:underline font-bold flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Mark read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-surface-800">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400">
                      No unread institutional notices right now.
                    </div>
                  ) : (
                    notifications.map((n, i) => (
                      <div
                        key={n.id || i}
                        className={`p-3 hover:bg-slate-50/80 dark:hover:bg-surface-800/40 transition-colors ${
                          !n.isRead ? 'bg-sky-50/40 dark:bg-sky-950/20' : ''
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{n.title}</p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                          {new Date(n.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Identity Pill */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200 dark:border-surface-800">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={displayName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/80 shadow-xs"
            />
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight truncate max-w-[140px]">
                {displayName}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block leading-tight">
                {userCode}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
