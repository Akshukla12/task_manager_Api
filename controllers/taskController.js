let tasks = [];
let nextId = 1;

function findById(paramId) {
  const id = Number(paramId);
  return tasks.find((t) => t.id === id);
}

const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required and must be a non-empty string' });
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  return res.status(201).json(task);
};

const getAllTasks = (req, res) => {
  const { status, sort } = req.query;

  let result = [...tasks];

  if (status) {
    const valid = ['pending', 'done'];
    if (!valid.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Use one of: ${valid.join(', ')}` });
    }
    result = result.filter((t) => t.status === status);
  }

  if (sort === 'createdAt') {
    result.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  return res.status(200).json(result);
};

const getTaskById = (req, res) => {
  const task = findById(req.params.id);
  if (!task) return res.status(404).json({ error: `Task ${req.params.id} not found` });
  return res.status(200).json(task);
};

const updateTask = (req, res) => {
  const { title, description } = req.body;

  if (!title && !description) {
    return res.status(400).json({ error: 'Send at least one field to update: title or description' });
  }

  const task = findById(req.params.id);
  if (!task) return res.status(404).json({ error: `Task ${req.params.id} not found` });

  if (title) task.title = title.trim();
  if (description) task.description = description.trim();

  return res.status(200).json(task);
};

const markDone = (req, res) => {
  const task = findById(req.params.id);
  if (!task) return res.status(404).json({ error: `Task ${req.params.id} not found` });

  task.status = 'done';
  return res.status(200).json(task);
};

const deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return res.status(404).json({ error: `Task ${req.params.id} not found` });

  const deleted = tasks.splice(index, 1)[0];
  return res.status(200).json({ message: 'Task deleted', task: deleted });
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, markDone, deleteTask };
