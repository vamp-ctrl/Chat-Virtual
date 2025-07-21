const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Um usuário se conectou');

  // Quando receber uma mensagem do cliente
  socket.on('mensagem', (msg) => {
    console.log('Mensagem recebida:', msg);
    // Envia para todos os clientes conectados (broadcast geral)
    io.emit('mensagem', msg);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
