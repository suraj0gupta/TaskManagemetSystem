import React, { useEffect, useState } from 'react';
import { IoSunnySharp } from "react-icons/io5";

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefer-color-scheme:dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }

    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <>
            <div className="relative w-16 h-8 bg-green-100 ring-2 ring-green-300 dark:bg-green-800 dark:ring-green-700 rounded-full p-1 cursor-pointer" onClick={toggleTheme}>
                <div className={`absolute top-1 transition-transform duration-300 ease-in-out transform ${isDarkMode ? 'translate-x-7' : 'translate-x-0'}`}>
                    {isDarkMode ? <IoSunnySharp className="text-green-300 w-6 h-6" /> : <IoSunnySharp className="text-green-500 w-6 h-6" />}
                </div>
            </div>
        </>
    )
}

export default ThemeToggle