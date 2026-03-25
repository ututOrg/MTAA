import { Outlet } from 'react-router';
import { DarkNavbar } from './components/DarkNavbar';
import { useState, useEffect } from 'react';
import { DataSystemBackground } from "./components/DataSystemBackground";

export default function Root() {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${
                isDark
                    ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
                    : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
            }`}
        >
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
                {/* Background */}
                {/*<div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100">*/}

                    {/* soft glow */}
                    {/*<div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>*/}
                    {/*<div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 blur-3xl rounded-full"></div>*/}
            {/* Background blur effects */}
            {isDark && (
                <>
                    <div className="fixed left-1/4 top-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"></div>
                    <div className="fixed bottom-20 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
                </>
            )}
            <DataSystemBackground/>
            <DarkNavbar isDark={isDark} toggleTheme={toggleTheme} />

            <main className="relative mx-auto max-w-[1400px] space-y-8 px-8 py-8">
                <Outlet context={{ isDark }} />
            </main>
                {/*</div>*/}
            </div>
        </div>
    );
}