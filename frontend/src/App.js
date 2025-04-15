import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <h1 className="text-center my-4">✅ Task Manager</h1>
      <TaskList />
    </div>
  );
}

export default App;

