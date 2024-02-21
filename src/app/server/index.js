const Server = require('socket.io');

// Create a socket.io server
const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting Socket.IO');
    const io = new Server(res.socket.server);

    // Listen for connection events
    io.on('connection', (socket) => {
      console.log(`Socket ${socket.id} connected.`);

      // Listen for incoming messages and broadcast to all clients
      socket.on('message', (message) => {
        io.emit('message', message);
      });

      // Clean up the socket on disconnect
      socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

module.exports = ioHandler;
