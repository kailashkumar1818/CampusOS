const prisma = require('../config/db');
const { sendSuccess, sendCreated, sendError, sendPaginated } = require('../utils/response.util');
const { broadcastEvent } = require('../config/socket');

const createPost = async (req, res, next) => {
  try {
    const { title, content, subjectId, category } = req.body;
    const authorId = req.user.id;

    const post = await prisma.discussionPost.create({
      data: {
        title,
        content,
        authorId,
        subjectId: subjectId || null,
        category: category || 'General',
      },
      include: {
        author: { select: { id: true, firstName: true, lastName: true, role: true, avatar: true } },
        subject: true,
        _count: { select: { comments: true, likes: true } },
      },
    });

    broadcastEvent('forum:new_post', post);

    return sendCreated(res, 'Discussion post created successfully', post);
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, category, subjectId } = req.query;
    const currentUserId = req.user?.id;
    const skip = (Number(page) - 1) * Number(limit);

    const where = {
      ...(category && { category }),
      ...(subjectId && { subjectId }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [total, posts] = await Promise.all([
      prisma.discussionPost.count({ where }),
      prisma.discussionPost.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          author: { select: { id: true, firstName: true, lastName: true, role: true, avatar: true } },
          subject: true,
          likes: {
            where: { userId: currentUserId },
            select: { id: true },
          },
          _count: {
            select: { comments: true, likes: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const formatted = posts.map((p) => ({
      ...p,
      isLiked: p.likes.length > 0,
      likes: undefined,
    }));

    return sendPaginated(res, 'Posts fetched successfully', formatted, total, page, limit);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user?.id;

    const post = await prisma.discussionPost.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, firstName: true, lastName: true, role: true, avatar: true } },
        subject: true,
        comments: {
          include: {
            author: { select: { id: true, firstName: true, lastName: true, role: true, avatar: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
        likes: {
          where: { userId: currentUserId },
        },
        _count: {
          select: { comments: true, likes: true },
        },
      },
    });

    if (!post) {
      return sendError(res, 'Discussion post not found', 404);
    }

    return sendSuccess(res, 'Post retrieved successfully', {
      ...post,
      isLiked: post.likes.length > 0,
      likes: undefined,
    });
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { content } = req.body;
    const authorId = req.user.id;

    if (!content || !content.trim()) {
      return sendError(res, 'Comment text cannot be blank', 400);
    }

    const comment = await prisma.comment.create({
      data: {
        postId,
        authorId,
        content,
      },
      include: {
        author: { select: { id: true, firstName: true, lastName: true, role: true, avatar: true } },
      },
    });

    broadcastEvent(`forum:post:${postId}:comment`, comment);

    return sendCreated(res, 'Comment posted successfully', comment);
  } catch (error) {
    next(error);
  }
};

const toggleLike = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id;

    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return sendSuccess(res, 'Post unliked', { liked: false });
    } else {
      await prisma.like.create({
        data: { postId, userId },
      });
      return sendSuccess(res, 'Post liked', { liked: true });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  addComment,
  toggleLike,
};

