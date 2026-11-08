import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Maximize2,
  Minimize2,
  ExternalLink,
  BookOpen,
  Code,
  GraduationCap,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const FloatingAIAssistant = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const role = user?.role || 'STUDENT';
  const isFaculty = role === 'FACULTY';

  const defaultWelcome = isFaculty
    ? `Hello Dr. ${user?.firstName || 'Professor'}! I am your CampusOS Faculty AI Copilot. I can help you draft question papers (Bloom's Taxonomy), prepare lesson plans, design assignments, or outline research proposals. What would you like to work on?`
    : `Hello ${user?.firstName || 'Student'}! I am your CampusOS Academic AI Mentor. Ask me any doubt about your subjects (OS, Machine Learning, Java, DevOps), exam preparation tips, or university rules (Attendance & OD/ML)!`;

  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: defaultWelcome,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && suggestions.length === 0) {
      api.get('/ai/suggestions')
        .then((res) => {
          const fetched = res?.data?.suggestions || res?.suggestions || res?.data?.data?.suggestions;
          if (Array.isArray(fetched) && fetched.length > 0) {
            setSuggestions(fetched);
          }
        })
        .catch(() => {
          setSuggestions(
            isFaculty
              ? [
                  'Draft a 5-question quiz for OS (Deadlocks)',
                  'Formulate Bloom\'s questions for ML Unit 3',
                  'Draft a lesson plan for Cloud DevOps',
                ]
              : [
                  'Explain Virtual Memory paging in 2 sentences',
                  'What are differences between Process and Thread?',
                  'How does OD/ML attendance calculation work?',
                  'Java code snippet for Thread pool',
                ]
          );
        });
    }
  }, [isOpen, isFaculty]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || message).trim();
    if (!query || loading) return;

    const userMsg = {
      role: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage('');
    setLoading(true);

    try {
      // Build previous history payload
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await api.post('/ai/chat', {
        message: query,
        history: historyPayload,
      });

      const aiReply = res?.data?.reply || res?.reply || res?.data?.data?.reply;
      if (!aiReply) {
        throw new Error('AI returned an empty response. Please try asking again.');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: aiReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Unable to connect to AI server. Please verify network.';
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: `⚠️ **AI Service Notice**: ${errMsg}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'model',
        text: defaultWelcome,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans no-print">
      {/* 1. FLOATING ACTION TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#1f3a52] via-[#23425d] to-[#122332] text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-cyan-500/30 border border-cyan-400/30 transition-all duration-300 hover:scale-105 active:scale-95"
          title="Open CampusOS AI Academic Assistant"
        >
          {/* Subtle glowing ring indicator */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border-2 border-white"></span>
          </span>

          <div className="p-1 rounded-full bg-cyan-500/20 text-cyan-300 group-hover:rotate-12 transition-transform">
            <Sparkles className="w-5 h-5 text-cyan-300" />
          </div>

          <div className="text-left leading-tight hidden sm:block">
            <span className="text-xs font-bold block text-white tracking-wide">
              {isFaculty ? 'Faculty AI Copilot' : 'Ask Academic AI'}
            </span>
            <span className="text-[10px] text-cyan-300 font-mono block">
              Gemini Powered
            </span>
          </div>
        </button>
      )}

      {/* 2. CHAT DRAWER / POPUP MODAL */}
      {isOpen && (
        <div
          className={`flex flex-col bg-white dark:bg-surface-900 border border-slate-300 dark:border-surface-700 rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 ${
            isExpanded
              ? 'w-[92vw] sm:w-[680px] h-[85vh] max-h-[800px]'
              : 'w-[92vw] sm:w-[430px] h-[580px] max-h-[90vh]'
          }`}
        >
          {/* Drawer Header */}
          <div className="bg-[#1f3a52] text-white px-4 py-3 flex items-center justify-between border-b border-[#162a3c] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-wide flex items-center gap-1.5 text-white">
                  CampusOS AI Assistant
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-cyan-500 text-slate-900">
                    GEMINI
                  </span>
                </h3>
                <p className="text-[10px] text-slate-300 truncate max-w-[200px]">
                  {isFaculty ? 'Faculty Academic & Research Copilot' : 'Student Academic Mentor'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <Link
                to={isFaculty ? '/faculty/ai-assistant' : '/student/ai-assistant'}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Fullscreen Workspace"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Collapse' : 'Expand'}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors hidden sm:inline-flex"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={clearChat}
                title="Reset Conversation"
                className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1.5 hover:text-white hover:bg-rose-500/30 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Strip */}
          {suggestions.length > 0 && (
            <div className="bg-sky-50/70 dark:bg-surface-800/60 border-b border-sky-100 dark:border-surface-700 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none shrink-0">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-600" /> Try:
              </span>
              {suggestions.slice(0, 4).map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  disabled={loading}
                  className="px-2 py-0.5 rounded-full bg-white dark:bg-surface-700 hover:bg-cyan-50 dark:hover:bg-surface-600 text-[#1f3a52] dark:text-cyan-200 border border-slate-200 dark:border-surface-600 text-[10px] font-medium transition-colors shrink-0"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Messages Thread Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-[#f8fafc] dark:bg-surface-950">
            {messages.map((msg, idx) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#1f3a52] text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`relative max-w-[85%] rounded-xl p-3 shadow-xs ${
                      isUser
                        ? 'bg-[#1f3a52] text-white rounded-br-xs'
                        : msg.isError
                        ? 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/30 dark:text-rose-200 dark:border-rose-900 rounded-bl-xs'
                        : 'bg-white dark:bg-surface-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-surface-800 rounded-bl-xs'
                    }`}
                  >
                    {/* Copy action for assistant responses */}
                    {!isUser && !msg.isError && (
                      <button
                        onClick={() => copyToClipboard(msg.text, idx)}
                        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded"
                        title="Copy answer"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}

                    {/* Formatted Text Content */}
                    <div className="whitespace-pre-wrap leading-relaxed pr-5 break-words">
                      {msg.text}
                    </div>

                    <div
                      className={`text-[9px] mt-1.5 font-mono ${
                        isUser ? 'text-slate-300 text-right' : 'text-slate-400 text-left'
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                      {user?.firstName ? user.firstName.charAt(0) : 'U'}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking / Generating status indicator */}
            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-[#1f3a52] text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white dark:bg-surface-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-surface-800 rounded-xl rounded-bl-xs p-3 shadow-xs flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    Consulting CampusOS AI Knowledge Base...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-surface-900 border-t border-slate-200 dark:border-surface-800 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                isFaculty
                  ? "Ask about question papers, lesson plans, or research..."
                  : "Ask doubts on OS, ML, Java, assignments, or OD/ML..."
              }
              className="flex-1 bg-slate-100 dark:bg-surface-800 border border-slate-200 dark:border-surface-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="p-2 rounded-lg bg-[#1f3a52] hover:bg-[#284966] disabled:opacity-50 text-cyan-300 font-bold transition-colors shadow-xs"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FloatingAIAssistant;

