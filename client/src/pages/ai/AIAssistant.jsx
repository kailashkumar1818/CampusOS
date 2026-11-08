import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  User,
  Send,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Code,
  GraduationCap,
  FileQuestion,
  Lightbulb,
  Shield,
  Layers,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const AIAssistant = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');

  const role = user?.role || 'STUDENT';
  const isFaculty = role === 'FACULTY';
  const displayName = user?.firstName
    ? (isFaculty ? `Dr. ${user.firstName} ${user.lastName || ''}` : `${user.firstName} ${user.lastName || ''}`)
    : (isFaculty ? 'Professor' : 'Rahul Kumar');

  const defaultGreeting = isFaculty
    ? `Welcome Dr. ${user?.lastName || 'Professor'}! I am your CampusOS Faculty AI Copilot. How can I assist your teaching, research, or course management today? Select a mode below or ask directly.`
    : `Welcome ${user?.firstName || 'Rahul'}! I am your CampusOS Academic AI Mentor. What subject or concept would you like to explore today? You can ask coding questions, exam problem solving, or university rule clarifications.`;

  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: defaultGreeting,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Categories tailored for Student vs Faculty
  const categories = isFaculty
    ? [
        { id: 'ALL', label: 'All Modes', icon: Sparkles },
        { id: 'QUESTIONS', label: 'Exam Papers & Quizzes', icon: FileQuestion },
        { id: 'LESSON', label: 'Lesson Plans & Notes', icon: BookOpen },
        { id: 'RESEARCH', label: 'Research & Publications', icon: GraduationCap },
        { id: 'RUBRICS', label: 'Grading Rubrics & Evaluation', icon: Code },
      ]
    : [
        { id: 'ALL', label: 'All Subjects', icon: Sparkles },
        { id: 'OS', label: 'Operating Systems (CSE 302)', icon: Layers },
        { id: 'ML', label: 'Machine Learning (CSE 303)', icon: Lightbulb },
        { id: 'JAVA', label: 'Advanced Java (CSE 309)', icon: Code },
        { id: 'CAMPUS', label: 'Attendance & OD/ML Rules', icon: Shield },
      ];

  const suggestedPrompts = isFaculty
    ? [
        { cat: 'QUESTIONS', text: 'Generate 5 Bloom\'s Taxonomy questions for Operating Systems (Deadlocks and Semaphores)' },
        { cat: 'QUESTIONS', text: 'Draft a Mid-Semester question paper for Machine Learning (Supervised vs Unsupervised)' },
        { cat: 'LESSON', text: 'Outline an 8-week lesson plan for Cloud DevOps (SEC 303 - RHCSA)' },
        { cat: 'RESEARCH', text: 'Structure an IEEE format research paper abstract on Edge AI optimization' },
        { cat: 'RUBRICS', text: 'Create an evaluation rubric for 5th semester Student Mini-Projects (Scale 1-10)' },
      ]
    : [
        { cat: 'OS', text: 'Explain Virtual Memory paging and page faults with a clear diagrammatic explanation' },
        { cat: 'OS', text: 'What is Banker\'s Algorithm in Deadlock Avoidance? Explain with an allocation table' },
        { cat: 'ML', text: 'Explain the difference between Overfitting and Underfitting in Machine Learning' },
        { cat: 'JAVA', text: 'Provide a working Java example of ThreadPoolExecutor with 4 worker threads' },
        { cat: 'CAMPUS', text: 'What are the official SRM/CampusOS rules for OD/ML duty leave and exam hall ticket eligibility?' },
      ];

  const filteredPrompts = activeCategory === 'ALL'
    ? suggestedPrompts
    : suggestedPrompts.filter((p) => p.cat === activeCategory);

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
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await api.post('/ai/chat', {
        message: query,
        history: historyPayload,
      });

      const reply = res?.data?.reply || res?.reply || res?.data?.data?.reply;
      if (!reply) {
        throw new Error('AI returned an empty response. Please try asking again.');
      }
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Unable to contact AI server.';
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: `⚠️ **Notice**: ${errMsg}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (txt, i) => {
    navigator.clipboard.writeText(txt);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'model',
        text: defaultGreeting,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100 max-w-full">
      {/* 1. INSTITUTIONAL AI HEADER BANNER */}
      <div className="bg-[#1f3a52] text-white p-4 sm:p-5 rounded-lg shadow-xs border border-[#162a3c] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2ba2c5] text-white uppercase tracking-wider">
              AI Academic Ecosystem
            </span>
            <span className="text-slate-300 text-xs font-mono">
              Powered by Google Gemini 3.5
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-cyan-400" />
            {isFaculty ? 'Faculty Academic & Research Copilot' : 'Student Academic Mentor'}
          </h1>
          <p className="text-xs text-slate-300">
            Dedicated 24/7 AI intelligent tutor for curriculum doubt solving, coding practice, and academic workflow.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        </div>
      </div>

      {/* 2. MODE / CATEGORY TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#1f3a52] text-white shadow-xs'
                  : 'bg-white dark:bg-surface-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-surface-700 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. SUGGESTED PROMPT CHIPS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {filteredPrompts.slice(0, 3).map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt.text)}
            disabled={loading}
            className="text-left p-3 rounded-lg bg-white dark:bg-surface-900 border border-slate-200 dark:border-surface-800 hover:border-cyan-500 hover:bg-sky-50/40 dark:hover:bg-surface-800/60 shadow-xs transition-all group flex items-start justify-between gap-2"
          >
            <span className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-2">
              "{prompt.text}"
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
          </button>
        ))}
      </div>

      {/* 4. MAIN CHAT CONVERSATION CONTAINER */}
      <div className="bg-white dark:bg-surface-900 rounded-lg border border-slate-200 dark:border-surface-800 shadow-xs overflow-hidden flex flex-col h-[560px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#f8fafc] dark:bg-surface-950">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={idx}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-[#1f3a52] text-cyan-300 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`relative max-w-[85%] rounded-xl p-4 shadow-xs text-xs sm:text-[13px] ${
                    isUser
                      ? 'bg-[#1f3a52] text-white rounded-br-xs'
                      : msg.isError
                      ? 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/30 dark:text-rose-200 dark:border-rose-900 rounded-bl-xs'
                      : 'bg-white dark:bg-surface-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-surface-800 rounded-bl-xs'
                  }`}
                >
                  {/* Copy Button for Assistant */}
                  {!isUser && !msg.isError && (
                    <button
                      onClick={() => copyText(msg.text, idx)}
                      className="absolute top-3 right-3 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded"
                      title="Copy response"
                    >
                      {copiedIdx === idx ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}

                  <div className="whitespace-pre-wrap leading-relaxed pr-6 break-words">
                    {msg.text}
                  </div>

                  <div
                    className={`text-[10px] mt-2 font-mono ${
                      isUser ? 'text-slate-300 text-right' : 'text-slate-400 text-left'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-xs">
                    {displayName.charAt(0)}
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-[#1f3a52] text-cyan-300 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-surface-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-surface-800 rounded-xl rounded-bl-xs p-4 shadow-xs flex items-center gap-3 text-xs">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
                <span className="font-medium">
                  CampusOS AI is thinking and structuring the response...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white dark:bg-surface-900 border-t border-slate-200 dark:border-surface-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              isFaculty
                ? "Type your query: question papers, lesson plan, research abstracts, or grading guidelines..."
                : "Type your query: explain concepts, debug code, ask timetable or attendance doubts..."
            }
            className="flex-1 bg-slate-100 dark:bg-surface-800 border border-slate-200 dark:border-surface-700 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="px-4 py-2.5 rounded-lg bg-[#1f3a52] hover:bg-[#284966] disabled:opacity-50 text-cyan-300 font-bold transition-colors shadow-xs flex items-center gap-1.5 text-xs sm:text-sm"
          >
            <span>Ask AI</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;

