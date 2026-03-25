import { Outlet } from 'react-router';
import { DarkNavbar } from './components/DarkNavbar';
import { useState, useEffect } from 'react';
import { DataSystemBackground } from "./components/DataSystemBackground";

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
        <div className="min-h-screen relative overflow-hidden">

            {/* 🔥 LIGHT MODE BACKGROUND */}
            {!isDark && (
                <>
                    {/* BASE */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f1f3f7] via-[#e9edf5] to-[#dde3ee]" />

                    {/* GLOW */}
                    <div className="absolute top-[-120px] left-1/3 w-[500px] h-[500px] bg-orange-900/30 blur-[190px] rounded-full" />
                    <div className="absolute bottom-[-120px] left-[-100px] w-[400px] h-[400px] bg-blue-400/30 blur-[140px] rounded-full" />
                    <div className="absolute top-1/2 right-[-120px] w-[400px] h-[400px] bg-purple-400/30 blur-[140px] rounded-full" />

                    {/* GLASS (FIXED ✅) */}
                    <div className="absolute inset-0 backdrop-blur-[40px] bg-white/10" />

                    {/* NOISE */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />
                </>
            )}

            {/* 🌙 DARK MODE */}
            {isDark && (
                <>
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

                    <div className="absolute top-[-120px] left-1/3 w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full" />
                    <div className="absolute bottom-[-120px] left-[-100px] w-[400px] h-[400px] bg-blue-500/20 blur-[140px] rounded-full" />
                    <div className="absolute top-1/2 right-[-120px] w-[400px] h-[400px] bg-pink-500/20 blur-[140px] rounded-full" />
                </>
            )}

            {/* 🔥 CONTENT */}
            <div className="relative z-10">

                {/*<DataSystemBackground />*/}

                <DarkNavbar isDark={isDark} toggleTheme={toggleTheme} />

                <main className="relative mx-auto max-w-[1400px] px-4 md:px-8 pt-16 md:pt-20 pb-8 space-y-8">
                    <Outlet context={{ isDark }} />
                </main>

            </div>
        </div>
    );
}