import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Skeleton from '../../components/common/Skeleton';
import {
  MessageSquare,
  ThumbsUp,
  Search,
  Plus,
  Send,
  User,
  Filter,
} from 'lucide-react';

const StudentForum = () => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postCategory, setPostCategory] = useState('Algorithms');
  const [submittingPost, setSubmittingPost] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (category) queryParams.append('category', category);

      const res = await api.get(`/forum/posts?${queryParams.toString()}`);
      setPosts(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [category]);

  // Real-time forum updates
  useEffect(() => {
    if (!socket) return;
    socket.on('forum:new_post', (newPost) => {
      setPosts((prev) => [newPost, ...prev]);
    });
    return () => {
      socket.off('forum:new_post');
    };
  }, [socket]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPosts();
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setSubmittingPost(true);
    setError('');
    try {
      await api.post('/forum/posts', {
        title,
        content,
        category: postCategory,
      });
      setShowModal(false);
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (err) {
      setError(err.message || 'Failed to publish post');
    } finally {
      setSubmittingPost(false);
    }
  };

  const handleToggleLike = async (postId) => {
    try {
      const res = await api.post(`/forum/posts/${postId}/like`);
      const { liked } = res.data;

      setPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              isLiked: liked,
              _count: {
                ...p._count,
                likes: liked ? p._count.likes + 1 : Math.max(0, p._count.likes - 1),
              },
            };
          }
          return p;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const openThread = async (postId) => {
    try {
      const res = await api.get(`/forum/posts/${postId}`);
      setSelectedPost(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmittingComment(true);
    try {
      const res = await api.post(`/forum/posts/${selectedPost.id}/comments`, {
        content: newComment,
      });
      setSelectedPost((prev) => ({
        ...prev,
        comments: [...prev.comments, res.data],
        _count: { ...prev._count, comments: prev._count.comments + 1 },
      }));
      setNewComment('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Campus Discussion Forum
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Engage with classmates and professors on coursework and technical questions
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" /> Start Discussion
        </Button>
      </div>

      {/* Search & Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search discussion topics, algorithms, or course questions..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-surface-900 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </form>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-surface-900 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">All Categories</option>
          <option value="Algorithms">Algorithms & DS</option>
          <option value="Web Development">Web Development</option>
          <option value="Database">Database Systems</option>
          <option value="Operating Systems">Operating Systems</option>
          <option value="General">General Campus Life</option>
        </select>
      </div>

      {/* Main Grid: Posts List & Thread Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Posts List */}
        <div className={selectedPost ? 'lg:col-span-6 space-y-4' : 'lg:col-span-12 space-y-4'}>
          {loading ? (
            <Skeleton className="h-32 w-full" count={3} />
          ) : posts.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <MessageSquare className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  No discussions found
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Be the first to start a discussion in this topic!
                </p>
              </div>
            </Card>
          ) : (
            posts.map((post) => (
              <Card
                key={post.id}
                className={`cursor-pointer transition-all hover:border-brand-500/50 ${
                  selectedPost?.id === post.id ? 'ring-2 ring-brand-500/50 border-brand-500' : ''
                }`}
              >
                <div onClick={() => openThread(post.id)}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-900">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Posted by <strong>{post.author?.firstName} {post.author?.lastName}</strong> ({post.author?.role})
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2">
                    {post.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-surface-800 text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleLike(post.id);
                      }}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                        post.isLiked
                          ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400 font-semibold'
                          : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-800'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post._count?.likes || 0}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openThread(post.id)}
                      className="flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post._count?.comments || 0} answers</span>
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Selected Post Thread & Comments */}
        {selectedPost && (
          <div className="lg:col-span-6 space-y-4">
            <Card
              title={selectedPost.title}
              subtitle={`Discussion in ${selectedPost.category}`}
              action={
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Close Thread
                </button>
              }
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300 font-bold text-xs flex items-center justify-center">
                  {selectedPost.author?.firstName?.[0]}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {selectedPost.author?.firstName} {selectedPost.author?.lastName}
                  </p>
                  <span className="text-[10px] text-slate-400">
                    {selectedPost.author?.role} • {new Date(selectedPost.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed pb-4 border-b border-slate-100 dark:border-surface-800">
                {selectedPost.content}
              </div>

              {/* Comments Thread */}
              <div className="mt-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Responses ({selectedPost.comments?.length || 0})
                </h4>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {selectedPost.comments?.length === 0 ? (
                    <p className="text-xs text-slate-400 py-3 italic">
                      No responses yet. Share your answer below!
                    </p>
                  ) : (
                    selectedPost.comments.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 rounded-lg bg-slate-50 dark:bg-surface-950/60 border border-slate-100 dark:border-surface-800"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                            {c.author?.firstName} {c.author?.lastName}
                            {c.author?.role === 'FACULTY' && (
                              <Badge variant="primary" size="xs" className="ml-1.5">Faculty</Badge>
                            )}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{c.content}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleAddComment} className="pt-3 flex gap-2">
                  <input
                    type="text"
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a constructive response..."
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <Button type="submit" variant="primary" size="sm" isLoading={submittingComment}>
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Start Discussion Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setError('');
        }}
        title="Start a Campus Discussion Topic"
      >
        <form onSubmit={handleCreatePost} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="Algorithms">Algorithms & Data Structures</option>
              <option value="Web Development">Full-Stack Web Development</option>
              <option value="Database">Database Management</option>
              <option value="Operating Systems">Operating Systems</option>
              <option value="General">General Campus Life</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Discussion Topic / Question
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to handle concurrent writes in PostgreSQL with Prisma?"
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description & Code Snippet
            </label>
            <textarea
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide background context or code snippets so others can reply effectively..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-surface-950 border border-slate-200 dark:border-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={submittingPost}>
              Publish Post
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentForum;

