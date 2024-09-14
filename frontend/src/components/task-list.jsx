import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const TaskList = ({ tasks }) => {

    const [active, setActive] = useState(null);

    const toggleAccordion = (id) => {
        setActive(active === id ? null : id);
    };

    return (
        <div className='mt-4'>
            <div className='mb-6 flex justify-start'>
                <NavLink to='/add-task' className='rounded-full text-white bg-green-600 py-1.5 px-3'>
                    <span className=''>Add Task</span>
                </NavLink>
            </div>
            <div className='mb-4'>
                <div className='grid grid-cols-5 gap-x-1 sm:gap-x-4'>
                    <div className='text-center'>
                        <NavLink to='/' className={({ isActive }) => (`block w-full text-sm sm:text-base text-center py-2 rounded ${isActive ? 'bg-green-600 text-white rounded-lg' : 'bg-green-100 text-black rounded-lg'}`)}>All</NavLink>
                    </div>
                    <div className='text-center'>
                        <NavLink to='/high' className={({ isActive }) => (`block w-full text-sm sm:text-base text-center py-2 rounded ${isActive ? 'bg-green-600 text-white rounded-lg' : 'bg-green-100 text-black rounded-lg'}`)}>High</NavLink>
                    </div>
                    <div className='text-center'>
                        <NavLink to='/medium' className={({ isActive }) => (`block w-full text-sm sm:text-base text-center py-2 rounded ${isActive ? 'bg-green-600 text-white rounded-lg' : 'bg-green-100 text-black rounded-lg'}`)}>Medium</NavLink>
                    </div>
                    <div className='text-center'>
                        <NavLink to='/low' className={({ isActive }) => (`block w-full text-sm sm:text-base text-center py-2 rounded ${isActive ? 'bg-green-600 text-white rounded-lg' : 'bg-green-100 text-black rounded-lg'}`)}>Low</NavLink>
                    </div>
                    <div className='text-center'>
                        <NavLink to='/done' className={({ isActive }) => (`block w-full text-sm sm:text-base text-center py-2 rounded ${isActive ? 'bg-green-600 text-white rounded-lg' : 'bg-green-100 text-black rounded-lg'}`)}>Done</NavLink>
                    </div>
                </div>
            </div>
            <div className='space-y-4 dark:text-black'>
                {tasks.map((task) => (
                    <div key={task.id} className='border my-4 rounded-lg shadow-md '>
                        <div className='flex justify-between items-center cursor-pointer bg-green-100 p-2 sm:px-5' onClick={() => toggleAccordion(task.id, task.isdone)}>
                            <div>
                                <h3 className='text-lg font-bold font-serif'>{task.taskname}</h3>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <p className='font-bold'>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
                                <span className={`w-4 h-4 rounded-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                            </div>
                        </div>

                        {active === task.id && (
                            <div className='p-4 bg-green-50'>
                                <span className='text-sm mb-2 font-semibold font-serif'>Description:</span>
                                <span className='text-sm mb-2 ps-4'>{task.taskdescription}</span> <br />
                                <span className='text-sm mb-2 font-semibold font-serif'>Due Date: </span>
                                <span className='text-sm mb-2 ps-4'>{task.duedate}</span> <br />
                                {
                                    !task.isdone && (
                                        <div className='flex justify-between px-2 sm:px-0 mt-4'>
                                            <NavLink to={`/edit-task/${task.id}`} className='bg-orange-500 hover:bg-orange-600 text-white text-center w-24 py-2 text-sm rounded-lg sm:w-32 sm:px-4 sm:text-base'>Edit</NavLink>
                                            <NavLink to={`/delete-task/${task.id}`} className='bg-red-500 hover:bg-red-600 text-white text-center w-24 py-2 text-sm rounded-lg sm:w-32 sm:px-4 sm:text-base'>Delete</NavLink>
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;