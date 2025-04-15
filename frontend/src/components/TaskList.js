import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        id,
        title: updatedTitle,
        description: updatedDescription,
        completed: false,
      });
      setEditingTaskId(null);
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="container">
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item">
            {editingTaskId === task.id ? (
              <div>
                <input
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className="form-control mb-2"
                />
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="form-control mb-2"
                />
                <button className="btn btn-success me-2" onClick={() => handleUpdate(task.id)}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditingTaskId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{task.title}</strong> — {task.description}
                <div className="mt-2">
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(task)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
