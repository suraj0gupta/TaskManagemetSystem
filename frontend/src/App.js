import './App.css';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import AddTask from './components/add-task'
import ThemeToggle from './components/theme-toggle';
import TaskList from './components/task-list';
import EditTask from './components/edit-task';
import DeleteTask from './components/delete-task';
import { useEffect, useState } from 'react';
import NotFound from './components/not-found';

function App() {

  const [tasks, setTasks] = useState([]);

  const filterTasks = (priority, doneStatus = false) => {
    return tasks.filter(task => task.priority === priority && task.isdone === doneStatus);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [tasks]);

  return (
    <>
      <Router>
        <div className='bg-white text-black dark:bg-black min-h-screen'>
          <div className='dark:text-white w-5/6 sm:w-3/4 mx-auto py-6 items-center'>
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
            <header className='py-6'>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 font-serif"> Task List View</h1>
              </div>
            </header>
            <Routes>
              <Route index path="/" element={<TaskList tasks={tasks.filter(task => !task.isdone)} />} />
              <Route path='/all' element={<Navigate to='/' />} />
              <Route path="/high" element={<TaskList tasks={filterTasks("high")} />} />
              <Route path="/medium" element={<TaskList tasks={filterTasks("medium")} />} />
              <Route path="/low" element={<TaskList tasks={filterTasks("low")} />} />
              <Route path="/done" element={<TaskList tasks={tasks.filter(task => task.isdone)} />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/edit-task/:id" element={<EditTask />} />
              <Route path="/delete-task/:id" element={<DeleteTask />} />
              <Route path="/not-found" element={<NotFound />} />
              <Route path='*' element={<Navigate to='/not-found' />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
