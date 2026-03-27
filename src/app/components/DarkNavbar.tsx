import {Bell, Menu, Sun, Moon} from 'lucide-react';
import {Button} from './ui/button';
import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar';
import {NavLink} from 'react-router';
import {useState} from 'react';

interface DarkNavbarProps {
    isDark: boolean;
    toggleTheme: () => void;
}

export function DarkNavbar({isDark, toggleTheme}: DarkNavbarProps) {
    const [open, setOpen] = useState(false);

    const tabs = [
        {name: 'Танилцуулга', path: '/'},
        {name: 'Зорилго зорилт', path: '/logistics'},
        {name: 'Түүхэн замнал', path: '/production'},
        {name: 'Үйл ажиллагааны чиглэл', path: '/sales'},
        {name: 'Цаашдын зорилт', path: '/pov'},
    ];

    return (
        <nav
            className={`fixed top-0 left-0 z-50 w-full backdrop-blur-2xl border-b transition-all
      ${isDark
                ? 'bg-black/30 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
                : 'bg-white/20 border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.05)]'
            }`}
        >
            <div className="mx-auto flex h-16 md:h-20 max-w-[1400px] items-center justify-between px-4 md:px-8">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                    <button onClick={() => setOpen(!open)} className="md:hidden">
                        <Menu className={`h-6 w-6 ${isDark ? 'text-white' : 'text-black'}`}/>
                    </button>

            {/*        <div className="flex items-center gap-3">*/}

            {/*            /!*<div className={`p-0.5 rounded-full ${*!/*/}
            {/*            /!*    isDark ? 'bg-gray-600' : 'bg-gray-800'*!/*/}
            {/*            /!*}`}>*!/*/}
            {/*            /!*    <img*!/*/}
            {/*            /!*        src={"/src/app/components/assets/mtan.png"}*!/*/}
            {/*            /!*        alt="mtan"*!/*/}
            {/*            /!*        className="w-[48px] h-[48px] rounded-full object-cover"*!/*/}
            {/*            /!*        style={{ imageRendering: 'auto' }}*!/*/}
            {/*            /!*    />*!/*/}
            {/*            /!*</div>*!/*/}

            {/*            <span className={`text-lg md:text-xl font-medium ${*/}
            {/*                isDark ? 'text-white' : 'text-gray-900'*/}
            {/*            }`}>*/}
            {/*  МТАА*/}
            {/*</span>*/}
            {/*        </div>*/}
                </div>

                {/* CENTER */}
                <div
                    className={`hidden md:flex items-center gap-2 rounded-full p-1.5
          ${isDark ? 'bg-white/10' : 'bg-white/40 backdrop-blur-md'}`}
                >
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            end={tab.path === '/'}
                            className={({isActive}) =>
                                `rounded-full px-5 py-2 text-sm transition-all ${
                                    isActive
                                        ? isDark
                                            ? 'bg-white text-black'
                                            : 'bg-black text-white shadow'
                                        : isDark
                                            ? 'text-gray-400 hover:text-white'
                                            : 'text-gray-600 hover:text-black'
                                }`
                            }
                        >
                            {tab.name}
                        </NavLink>
                    ))}
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2 md:gap-4">

                    {/* 🌙 MOBILE ICON */}
                    <button
                        onClick={toggleTheme}
                        className={`sm:hidden h-9 w-9 rounded-full flex items-center justify-center transition active:scale-90
            ${isDark
                            ? 'bg-white/10 hover:bg-white/20'
                            : 'bg-white/40 backdrop-blur-md hover:bg-white/60'
                        }`}
                    >
                        {isDark ? (
                            <Sun className="h-5 w-5 text-yellow-300"/>
                        ) : (
                            <Moon className="h-5 w-5 text-gray-800"/>
                        )}
                    </button>

                    {/* 💻 DESKTOP BUTTON */}
                    <div
                        className={`hidden sm:flex items-center gap-2 rounded-full p-1.5
            ${isDark ? 'bg-white/10' : 'bg-white/40 backdrop-blur-md'}`}
                    >
                        <button
                            onClick={toggleTheme}
                            className={`px-3 py-1.5 rounded-full text-sm transition ${
                                !isDark
                                    ? 'bg-black text-white shadow'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <Sun className="h-5 w-5 text-yellow-300"/>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className={`px-3 py-1.5 rounded-full text-sm transition ${
                                isDark
                                    ? 'bg-lime-400 text-black shadow'
                                    : 'text-gray-600'
                            }`}
                        >
                            <Moon className="h-5 w-5 text-gray-800"/>
                        </button>
                    </div>

                    {/* 🔔 Notification */}
                </div>
            </div>

            {/* 📱 MOBILE MENU */}
            {open && (
                <div
                    className={`md:hidden px-4 pb-4 backdrop-blur-xl
          ${isDark ? 'bg-black/40 text-white' : 'bg-white/60 text-black'}`}
                >
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            onClick={() => setOpen(false)}
                            className="block py-2 border-b border-white/20"
                        >
                            {tab.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}