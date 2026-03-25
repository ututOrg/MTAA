import { Bell, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { NavLink } from 'react-router';

interface DarkNavbarProps {
    isDark: boolean;
    toggleTheme: () => void;
}

export function DarkNavbar({ isDark, toggleTheme }: DarkNavbarProps) {
    const tabs = [
        { name: 'Dashboard', path: '/' },
        { name: 'Production', path: '/production' },
        { name: 'Logistics', path: '/logistics' },
        { name: 'Sales', path: '/sales' },
    ];

    return (
        <nav className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl ${
            isDark
                ? 'border-white/10 bg-black/50'
                : 'border-gray-200 bg-white/80'
        }`}>
            <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-6 px-8">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isDark ? 'bg-white' : 'bg-gray-900'
                    }`}>
                        <div className={`h-6 w-6 rounded-lg ${
                            isDark ? 'bg-black' : 'bg-white'
                        }`}></div>
                    </div>
                    <span className={`text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Stockly</span>
                </div>

                {/* Navigation Tabs */}
                <div className={`flex items-center gap-2 rounded-full p-1.5 ${
                    isDark ? 'bg-white/5' : 'bg-gray-100'
                }`}>
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            end={tab.path === '/'}
                            className={({ isActive }) =>
                                `rounded-full px-5 py-2 text-sm transition-all ${
                                    isActive
                                        ? isDark
                                            ? 'bg-white text-black'
                                            : 'bg-gray-900 text-white'
                                        : isDark
                                            ? 'text-gray-400 hover:text-white'
                                            : 'text-gray-600 hover:text-gray-900'
                                }`
                            }
                        >
                            {tab.name}
                        </NavLink>
                    ))}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <div className={`flex items-center gap-2 rounded-full p-1.5 ${
                        isDark ? 'bg-white/5' : 'bg-gray-100'
                    }`}>
                        <button
                            onClick={toggleTheme}
                            className={`rounded-full px-3 py-1.5 text-sm transition-all ${
                                !isDark
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-transparent text-gray-400'
                            }`}
                        >
                            Light
                        </button>
                        <button
                            onClick={toggleTheme}
                            className={`rounded-full px-3 py-1.5 text-sm transition-all ${
                                isDark
                                    ? 'bg-lime-500 text-black'
                                    : 'bg-transparent text-gray-600'
                            }`}
                        >
                            Dark
                        </button>
                    </div>

                    {/* Notification */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`relative h-10 w-10 rounded-full ${
                            isDark
                                ? 'bg-white/5 hover:bg-white/10'
                                : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                        <Bell className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-lime-500"></span>
                    </Button>

                    {/* User Avatar */}
                    <div className={`flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 ${
                        isDark ? 'bg-white/5' : 'bg-gray-100'
                    }`}>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                            <AvatarFallback>TR</AvatarFallback>
                        </Avatar>
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Terry</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}