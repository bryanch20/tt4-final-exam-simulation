import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div className="container mt-4">
      <h2>📝 Task List</h2>
      <ul className="list-group">
        {tasks.map(task => (
          <li className="list-group-item" key={task.id}>
            <strong>{task.title}</strong> — {task.description}  
            <span className={`badge ms-2 ${task.completed ? "bg-success" : "bg-secondary"}`}>
              {task.completed ? "Done" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
