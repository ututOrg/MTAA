import { Outlet } from 'react-router';
import { DarkNavbar } from './components/DarkNavbar';
import { useState, useEffect } from 'react';

export default function Root() {
    const [isDark, setIsDark] = useState(false);
    const toggleTheme = () => setIsDark(!isDark);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div >

            {/* 🚀 CONTENT LAYER */}
            <div className="relative z-10 ">
                <DarkNavbar isDark={isDark} toggleTheme={toggleTheme}/>
                <main className="w-full pt-16 md:pt-20 ">
                    <Outlet context={{isDark}}/>
                </main>
            </div>
        </div>
    );
}