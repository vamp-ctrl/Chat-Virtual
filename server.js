const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve arquivos da pasta public
app.use(express.static('public'));

io.on('connection', socket => {
  console.log('Novo usuário conectado');

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
