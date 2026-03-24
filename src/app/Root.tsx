import { Outlet } from 'react-router';
import { DarkNavbar } from './components/DarkNavbar';
import { useState, useEffect } from 'react';

export default function Root() {
  const [isDark, setIsDark] = useState(true);

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
      {/* Background blur effects */}
      {isDark && (
        <>
          <div className="fixed left-1/4 top-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="fixed bottom-20 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        </>
      )}

      <DarkNavbar isDark={isDark} toggleTheme={toggleTheme} />

      <main className="relative mx-auto max-w-[1400px] space-y-8 px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
