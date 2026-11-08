require('dotenv').config();
const http = require('http');
const app = require('./app');
const { initSocket } = require('./config/socket');

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

// Initialize Socket.io real-time broker
initSocket(httpServer);

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🚀 CampusOS API & Real-Time Engine Active`);
  console.log(`📡 URL: http://localhost:${PORT}/api/v1`);
  console.log(`🔒 Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`====================================================`);
});

// Process signal safety
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  httpServer.close(() => {
    console.log('HTTP server closed');
  });
});

