const socket = io();

// Elementos da interface
const form = document.getElementById('form');
const input = document.getElementById('input');
const mensagens = document.getElementById('mensagens');
const header = document.getElementById('chat-header');
const userPanel = document.getElementById('user-panel');
const usernameInput = document.getElementById('username');
const userList = document.getElementById('user-list');

// Nome do usuário
let nomeUsuario = localStorage.getItem('nome') || 'Usuário';
usernameInput.value = nomeUsuario;

// Atualiza nome e salva
usernameInput.addEventListener('input', () => {
  nomeUsuario = usernameInput.value.trim() || 'Usuário';
  localStorage.setItem('nome', nomeUsuario);
  socket.emit('atualizar nome', nomeUsuario);
});

// Abre/fecha o painel de usuários
header.addEventListener('click', () => {
  userPanel.classList.toggle('hidden');
});

// Envia mensagem
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if (texto !== '') {
    socket.emit('mensagem', { nome: nomeUsuario, texto });
    input.value = '';
  }
});

// Recebe mensagem
socket.on('mensagem', (msg) => {
  const item = document.createElement('div');
  item.classList.add('mensagem');
  item.innerHTML = `<strong>${msg.nome}:</strong> ${msg.texto}`;
  mensagens.appendChild(item);
  mensagens.scrollTop = mensagens.scrollHeight;
});

// Atualiza lista de usuários online
socket.on('usuarios online', (usuarios) => {
  userList.innerHTML = '';
  usuarios.forEach((nome) => {
    const li = document.createElement('li');
    li.textContent = nome;
    userList.appendChild(li);
  });
});
