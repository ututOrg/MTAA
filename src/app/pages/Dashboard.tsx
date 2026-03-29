
import { DarkMetricsCards } from '../components/DarkMetricsCards';
import { useOutletContext } from 'react-router';
import IntroDashboard from "./IntroDashboard";

export default function Dashboard() {
    const { isDark } = useOutletContext<{ isDark: boolean }>();

    return (
        <div className="space-y-8">
            {/* 🎨 АРЫН ДЭВСГЭР (BACKGROUND LAYER) */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* 1. Суурь өнгө */}
                <div className={`absolute inset-0 transition-colors duration-700 ${
                    isDark ? 'bg-[#050505]' : 'bg-[#fbfbfe]'
                }`}/>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/30 blur-[120px]"/>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/30 blur-[120px]"/>
                {/* 2. Glow Orbs (Таны өнгөнүүд) */}
                <div
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-400/20 blur-[120px] rounded-full animate-pulse"/>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full"/>

                {/* 3. Glass Overlay (Blur) */}
                <div className={`absolute inset-0 backdrop-blur-[80px] ${
                    isDark ? 'bg-black/40' : 'bg-white/20'
                }`}/>

                {/* 4. 🔥 MODERN TECH SVG ELEMENTS */}
                <svg
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isDark ? 'text-white/40' : 'text-blue-600/30'}`}
                    xmlns="http://www.w3.org/2000/svg">

                    {/* А. Grid of Plus Signs (Data Mesh) */}
                    <defs>
                        <pattern id="plusGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 10 10 M 5 10 H 15 M 10 5 V 15" stroke="currentColor" strokeWidth="0.5"
                                  opacity="0.3"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#plusGrid)"/>

                    {/* Б. Abstract Tech Rings (Баруун дээд) */}
                    <g className="origin-[85%_15%] animate-[spin_30s_linear_infinite]">
                        <circle cx="85%" cy="15%" r="120" fill="none" stroke="currentColor" strokeWidth="0.5"
                                strokeDasharray="10 20"/>
                        <circle cx="85%" cy="15%" r="80" fill="none" stroke="currentColor" strokeWidth="1"
                                strokeDasharray="5 15" opacity="0.5"/>
                    </g>

                    {/* В. Connected Data Nodes (Зүүн дунд хэсэг) */}
                    <g stroke="currentColor" strokeWidth="0.8" fill="currentColor">
                        <circle cx="15%" cy="30%" r="2"/>
                        <circle cx="20%" cy="45%" r="2"/>
                        <circle cx="12%" cy="55%" r="2"/>
                        <path d="M 15% 30% L 20% 45% L 12% 55%" fill="none" opacity="0.4"/>

                        {/* Жижиг текст деталь */}
                        <text x="16%" y="30%" fontSize="8" className="font-mono" fill="currentColor" opacity="0.5">ID:
                            0x8773356
                        </text>
                    </g>

                    {/* Г. Scanner Line (Хөндлөн лазер шугам) */}
                    <line x1="0" y1="20%" x2="100%" y2="20%" stroke="currentColor" strokeWidth="0.5" opacity="0.2">
                        <animate attributeName="y1" values="0%; 100%; 0%" dur="20s" repeatCount="indefinite"/>
                        <animate attributeName="y2" values="0%; 100%; 0%" dur="20s" repeatCount="indefinite"/>
                    </line>

                    {/* Д. Баруун доод буланд "System Status" деталь */}
                    <g className="opacity-40">
                        <rect x="85%" y="85%" width="40" height="2"/>
                        <rect x="85%" y="88%" width="20" height="2"/>
                        <rect x="85%" y="91%" width="30" height="2"/>
                    </g>
                </svg>
            </div>

            {/* 🚀 ҮНДСЭН КОНТЕНТ (CONTENT LAYER) */}
            <div className="relative z-10 mx-auto px-4 md:px-8 space-y-12  text-left">
                <IntroDashboard isDark={isDark}/>
                <DarkMetricsCards isDark={isDark}/>
                {/*<DarkHeroPanel isDark={isDark} />*/}
            </div>

        </div>
    );
}