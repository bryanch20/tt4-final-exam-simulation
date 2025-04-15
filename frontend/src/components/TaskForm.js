import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      completed: false
    };

    try {
      await axios.post('http://localhost:5000/api/tasks', newTask);
      setTitle('');
      setDescription('');
      onTaskCreated(); // refresh task list
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Add Task</h4>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="form-control"
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Create</button>
    </form>
  );
}

export default TaskForm;
