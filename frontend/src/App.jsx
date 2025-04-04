import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('/api/tasks').then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    axios.post('/api/tasks', { text: newTask }).then(res => {
      setTasks([...tasks, res.data]);
      setNewTask('');
    });
  };

  const deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`).then(() => {
      setTasks(tasks.filter(task => task._id !== id));
    });
  };

  return (
    <div className="app-container">
      <div className="task-manager">
        <h1 className="app-title">Task Manager</h1>
        
        <div className="task-input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            className="task-input"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask} className="add-button">
            Add Task
          </button>
        </div>
        
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task._id} className="task-item">
              <span className="task-text">{task.text}</span>
              <button 
                onClick={() => deleteTask(task._id)} 
                className="delete-button"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
