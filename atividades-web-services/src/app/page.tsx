'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface Task {
    id: string;
    title: string;
    completed: boolean;
  }
  
  const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  
    useEffect(() => {
      fetchTasks();
    }, []);
  
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>('http://localhost:3333/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    const handleAddTask = async () => {
      try {
        const response = await axios.post<Task>('http://localhost:3333/tasks', {
          title: newTaskTitle,
          completed: false,
        });
        setTasks([...tasks, response.data]);
        setNewTaskTitle('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };
  
    return (
      <div>
        <h1>Lista de Tarefas</h1>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.title} - {task.completed ? 'Completed' : 'Incomplete'}
            </li>
          ))}
        </ul>
        <input className='input'
          type="text"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
        />
        <button onClick={handleAddTask}> Nova Tarefa</button>
      </div>
    );
  };
  
  export default TasksPage;