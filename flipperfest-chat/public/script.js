const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const mensagens = document.getElementById('mensagens');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim() !== '') {
    socket.emit('mensagem', input.value);
    input.value = '';
  }
});

socket.on('mensagem', (msg) => {
  const item = document.createElement('div');
  item.classList.add('mensagem');
  item.textContent = msg;
  mensagens.appendChild(item);
  mensagens.scrollTop = mensagens.scrollHeight;
});
