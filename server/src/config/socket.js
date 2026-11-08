const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

let io = null;

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    },
  });

  // Socket Authentication & Room Routing
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];

    if (!token) {
      // Allow anonymous connection if needed, or reject
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'campusos_super_secret_jwt_key_2026_production_grade');
      socket.user = decoded;
      return next();
    } catch (err) {
      console.warn('Socket authentication warning:', err.message);
      return next();
    }
  });

  io.on('connection', (socket) => {
    if (socket.user) {
      const userId = socket.user.id;
      const role = socket.user.role;

      // Join individual user room and role broadcast room
      socket.join(`user:${userId}`);
      socket.join(`role:${role}`);
      console.log(`[Socket.io] User connected: ${userId} (Role: ${role})`);

      socket.on('join:room', (room) => {
        socket.join(room);
      });

      socket.on('leave:room', (room) => {
        socket.leave(room);
      });
    }

    socket.on('disconnect', () => {
      // Disconnect cleanly
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io has not been initialized. Call initSocket(server) first.');
  }
  return io;
};

// Dispatch helpers
const emitToUser = (userId, event, payload) => {
  if (io) {
    io.to(`user:${userId}`).emit(event, payload);
  }
};

const emitToRole = (role, event, payload) => {
  if (io) {
    io.to(`role:${role}`).emit(event, payload);
  }
};

const emitToRoom = (room, event, payload) => {
  if (io) {
    io.to(room).emit(event, payload);
  }
};

const broadcastEvent = (event, payload) => {
  if (io) {
    io.emit(event, payload);
  }
};

module.exports = {
  initSocket,
  getIO,
  emitToUser,
  emitToRole,
  emitToRoom,
  broadcastEvent,
};

