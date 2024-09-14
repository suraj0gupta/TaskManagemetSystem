import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteTask = () => {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = savedTasks.find(task => task.id === parseInt(id));
        if (task) {
            setTasks(savedTasks);
        } else {
            console.error('Task not found');
            navigate('/');
        }
    }, [id, navigate]);

    const handleDeleteTask = () => {
        const updatedTasks = tasks.filter((task) => task.id !== parseInt(id));
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        navigate('/');
    };

    return (
        <div className='mt-20 w-4/3 sm:w-2/3 lg:w-1/2  mx-auto rounded-lg pt-8'>
            <h2 className='text-4xl text-center font-semibold text-green-600 font-serif'>Delete Task</h2>
            <p className='mt-2 text-center'>Are you sure you want to delete this task?</p>
            <div className='flex justify-center space-x-10 mt-6'>
                <button className='bg-red-500 text-white text-center w-20 py-2 text-xs px-2 rounded-lg sm:w-24 sm:px-4' onClick={handleDeleteTask}>Yes, Delete</button>
                <button className='bg-green-500 text-white text-center w-20 py-2 text-xs px-2 rounded-lg sm:w-24 sm:px-4' onClick={() => navigate('/')}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteTask;
