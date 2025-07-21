const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

// Objeto para guardar os usuários conectados
const usuarios = {};

io.on('connection', (socket) => {
  console.log('Um usuário se conectou:', socket.id);

  // Nome padrão inicial
  usuarios[socket.id] = 'Usuário';

  // Envia a lista de usuários atualizada para todos
  io.emit('usuarios online', Object.values(usuarios));

  // Atualiza o nome do usuário
  socket.on('atualizar nome', (nome) => {
    usuarios[socket.id] = nome || 'Usuário';
    io.emit('usuarios online', Object.values(usuarios));
  });

  // Quando receber uma mensagem
  socket.on('mensagem', (msg) => {
    const nome = usuarios[socket.id] || 'Usuário';
    io.emit('mensagem', { nome, texto: msg.texto });
  });

  // Quando o usuário se desconecta
  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
    delete usuarios[socket.id];
    io.emit('usuarios online', Object.values(usuarios));
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
