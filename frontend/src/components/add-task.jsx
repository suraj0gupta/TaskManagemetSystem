import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ id: '', taskname: '', taskdescription: '', priority: '', duedate: '', isdone: false });
    const [errors, setErrors] = useState({ taskname: '', taskdescription: '', priority: '', duedate: '' });

    const validate = () => {
        const newErrors = {};
        if (!formData.taskname.trim()) newErrors.taskname = 'Task name is required';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const taskExists = tasks.some(task => task.taskname.trim().toLowerCase() === formData.taskname.trim().toLowerCase());
                if (taskExists) {
                    setErrors(prevErrors => ({
                        ...prevErrors, taskname: 'Task name already exists'
                    }));
                    return;
                }
                const newTask = { ...formData, id: Date.now() };
                tasks.push(newTask);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                setFormData({ id: '', taskname: '', taskdescription: '', priority: '', duedate: '', isdone: false });
                navigate('/');
            } catch (err) {
                console.error('Error adding task:', err);
            }
        }
    };

    return (
        <div>
            <form className='space-y-4 p-4' onSubmit={handleSubmit}>
                <div className='flex justify-center items-center mt-4 mb-2'>
                    <h2 className='text-2xl sm:text-3xl lg:text-4xl text-center font-bold font-serif text-green-600'>Add Task</h2>
                </div>
                <div>
                    <input type='text' name='taskname' placeholder='Task Name' value={formData.taskname} onChange={handleChange} className={`w-full p-2 border ${errors.taskname ? 'border-red-500' : 'border-gray-300'} text-black rounded`} />
                    {errors.taskname && <p className='text-red-500 text-sm'>{errors.taskname}</p>}
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
                    <button type='submit' className='w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded' > Add Task </button>
                    <button onClick={() => navigate('/')} type='button' className='w-full bg-neutral-500 hover:bg-neutral-600 text-white p-2 rounded'> Cancel </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;

