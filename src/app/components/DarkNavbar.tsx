import { Bell, Menu, Sun, Moon, X } from 'lucide-react';
import { NavLink } from 'react-router';
import { useState } from 'react';

interface DarkNavbarProps {
    isDark: boolean;
    toggleTheme: () => void;
}

export function DarkNavbar({ isDark, toggleTheme }: DarkNavbarProps) {
    const [open, setOpen] = useState(false);

    const tabs = [
        { name: 'Танилцуулга', path: '/' },
        { name: 'Зорилго зорилт', path: '/logistics' },
        { name: 'Түүхэн замнал', path: '/production' },
        { name: 'Үйл ажиллагааны чиглэл', path: '/sales' },
        { name: 'Цаашдын зорилт', path: '/pov' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 z-[100] w-full backdrop-blur-md transition-all duration-500
            ${isDark
                ? 'bg-black/20 border-b border-white/5 shadow-2xl'
                : 'bg-white/40 border-b border-black/5 shadow-sm'
            }`}
        >
            <div className="mx-auto flex h-14 md:h-16 max-w-[1400px] items-center justify-between px-6 md:px-12">

                {/* LEFT: Logo area or Mobile Menu */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setOpen(!open)}
                        className={`md:hidden p-1 rounded-full transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                    <span className={`text-[15px] font-bold tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>
                        МТАА
                    </span>
                </div>

                {/* CENTER: Navigation Tabs (More Refined) */}
                <div className={`hidden md:flex items-center gap-1 p-1 rounded-full border transition-all duration-500
                    ${isDark ? 'bg-black/40 border-white/10' : 'bg-white/60 border-black/5'}`}
                >
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            end={tab.path === '/'}
                            className={({ isActive }) =>
                                `rounded-full px-5 py-1.5 text-[13px] font-medium transition-all duration-300 ${
                                    isActive
                                        ? isDark
                                            ? 'bg-white text-black shadow-lg shadow-white/10'
                                            : 'bg-black text-white shadow-lg shadow-black/10'
                                        : isDark
                                            ? 'text-gray-400 hover:text-white hover:bg-white/5'
                                            : 'text-gray-500 hover:text-black hover:bg-black/5'
                                }`
                            }
                        >
                            {tab.name}
                        </NavLink>
                    ))}
                </div>

                {/* RIGHT: Action area */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle Button (Compact) */}
                    <button
                        onClick={toggleTheme}
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition-all active:scale-90 border
                        ${isDark
                            ? 'bg-white/5 border-white/10 hover:bg-white/10 text-yellow-400'
                            : 'bg-black/5 border-black/5 hover:bg-black/10 text-gray-700'
                        }`}
                    >
                        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>

                    {/* Notification or Profile could go here */}
                    <button className={`p-1.5 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-black/5 text-gray-600'}`}>
                        <Bell className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* 📱 MOBILE MENU (Refined) */}
            {open && (
                <div className={`md:hidden absolute top-full left-0 w-full border-t transition-all duration-300 backdrop-blur-2xl
                    ${isDark ? 'bg-black/80 border-white/5' : 'bg-white/90 border-black/5'}`}
                >
                    <div className="flex flex-col p-4 gap-2">
                        {tabs.map((tab) => (
                            <NavLink
                                key={tab.path}
                                to={tab.path}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) => `px-4 py-3 rounded-xl text-sm transition-all ${
                                    isActive
                                        ? (isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black')
                                        : 'text-gray-500'
                                }`}
                            >
                                {tab.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}