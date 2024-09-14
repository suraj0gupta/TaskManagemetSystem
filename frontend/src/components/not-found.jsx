import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <main class="grid min-h-full place-items-center px-6 py-18 sm:py-24 lg:px-8">
                <div class="text-center">
                    <h1 class="mt-4 text-3xl font-bold tracking-tight  sm:text-5xl">404 Page not found</h1>
                    <p class="mt-6 text-base leading-7 text-gray-500">This page can't be found</p>
                    <div class="mt-4 flex items-center justify-center gap-x-6">
                        <button onClick={() => navigate('/')} class="rounded-md bg-green-600 w-40 py-2.5 text-base text-white">Go To Home</button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NotFound