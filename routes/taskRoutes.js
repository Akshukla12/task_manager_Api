const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// base: /api/tasks

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);   // ?status=pending  ?sort=createdAt

router.all('/', (req, res) => {
  res.status(405).json({ error: 'Method not allowed', allowedMethods: ['GET', 'POST'] });
});

// /:id/done has to come before /:id — otherwise "done" gets matched as an id
router.patch('/:id/done', taskController.markDone);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

router.all('/:id', (req, res) => {
  res.status(405).json({ error: 'Method not allowed', allowedMethods: ['GET', 'PUT', 'PATCH', 'DELETE'] });
});

module.exports = router;