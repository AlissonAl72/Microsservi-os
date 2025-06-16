const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
  const task = { id: Date.now(), text: req.body.text };
  tasks.push(task);
  res.status(201).json(task);
});

app.get('/', (req, res) => {
  res.send('✅ Serviço de Tarefas Funcionando');
});


module.exports = app;
