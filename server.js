const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server up on http://localhost:${PORT}`);
});