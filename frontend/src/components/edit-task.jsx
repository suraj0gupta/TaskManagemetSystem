import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const UpdateTaskPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: '',
        taskname: '',
        taskdescription: '',
        priority: '',
        duedate: '',
        isdone: false
    });

    const [errors, setErrors] = useState({
        taskdescription: '',
        priority: '',
        duedate: ''
    });

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks.find(task => task.id === parseInt(id));

        if (task) {
            setFormData({
                id: task.id,
                taskname: task.taskname,
                taskdescription: task.taskdescription,
                priority: task.priority,
                duedate: task.duedate,
                isdone: task.isdone
            });
        } else {
            console.error('Task not found');
            navigate('/');
        }
    }, [id, navigate]);

    const validate = () => {
        const newErrors = {};
        if (!formData.taskdescription.trim()) newErrors.taskdescription = 'Task description is required';
        if (!formData.priority) newErrors.priority = 'Priority is required';
        if (!formData.duedate) newErrors.duedate = 'Due date is required';
        else if (new Date(formData.duedate) < new Date()) newErrors.duedate = 'Due date cannot be in the past';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData, [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors, [name]: ''
            }));
        }
    };

    const handleEdit = (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const updatedTasks = tasks.map(task =>
                    task.id === formData.id ? { ...formData } : task
                );
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));

                setFormData({ id: '', taskname: '', taskdescription: '', priority: '', duedate: '', isdone: false });

                navigate('/');
            } catch (err) {
                console.error('Error updating task:', err);
            }
        }
    };

    const handleMarkAsDone = (e) => {
        e.preventDefault();
        try {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.map(task =>
                task.id === formData.id ? { ...task, isdone: true } : task
            );
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

            setFormData(prevData => ({ ...prevData, isdone: true }));
            navigate('/');
        } catch (err) {
            console.error('Error marking task as done:', err);
        }
    };

    return (
        <div>
            <div className='space-y-4 p-4'>
                <div className="flex justify-end">
                    <NavLink to={`/delete-task/${formData.id}`} className='bg-red-500 hover:bg-red-600 text-white text-center w-20 sm:w-28 h-10 py-2 text-base rounded-lg'>Delete</NavLink>
                </div>

                <div className='mt-4 mb-2'>
                    <h2 className='text-2xl sm:text-3xl lg:text-4xl text-center font-bold text-green-600 font-serif'>Edit Task</h2>
                </div>
                <div>
                    <input type='text' name='taskname' value={formData.taskname} className='w-full p-2 border text-black rounded' readOnly />
                </div>
                <div>
                    <textarea name='taskdescription' placeholder='Description' value={formData.taskdescription} onChange={handleChange} className={`w-full p-2 border ${errors.taskdescription ? 'border-red-500' : 'border-gray-300'} text-black rounded`} />
                    {errors.taskdescription && <p className='text-red-500 text-sm'>{errors.taskdescription}</p>}
                </div>
                <div>
                    <select name='priority' value={formData.priority} onChange={handleChange} className={`w-full p-2 border ${errors.priority ? 'border-red-500' : 'border-gray-300'} text-black rounded`} >
                        <option value=''>Choose Priority</option>
                        <option value='high'>High</option>
                        <option value='medium'>Medium</option>
                        <option value='low'>Low</option>
                    </select>
                    {errors.priority && <p className='text-red-500 text-sm'>{errors.priority}</p>}
                </div>
                <div>
                    <input type='date' name='duedate' placeholder='Due Date' value={formData.duedate} onChange={handleChange} className={`w-full p-2 border ${errors.duedate ? 'border-red-500' : 'border-gray-300'} rounded text-black`} />
                    {errors.duedate && <p className='text-red-500 text-sm'>{errors.duedate}</p>}
                </div>
                <div className='flex justify-around space-x-5'>
                    <button onClick={handleEdit} type='button' className='w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded' >
                        Save Update
                    </button>
                    <button onClick={handleMarkAsDone} type='button' className='w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded'>
                        Mark Done
                    </button>
                </div>
                <button onClick={() => navigate('/')} type='button' className='block w-full mx-auto bg-gray-400 hover:bg-gray-500 text-white p-2 rounded' >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default UpdateTaskPage;