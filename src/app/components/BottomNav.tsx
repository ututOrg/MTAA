import { motion } from "framer-motion";
import {
    FaBuilding,
    FaCamera,
    FaDatabase,
    FaCode,
    FaChartLine,
    FaWater,
    FaRecycle,
} from "react-icons/fa";

interface BottomNavProps {
    isDark: boolean;
    activeIndex: number;
    onNavigate: (index: number) => void;
}

const menu = [
    { id: "camera", label: "Камер", icon: FaCamera },
    { id: "office", label: "Оффис хэсэг", icon: FaBuilding },
    { id: "data", label: "Дата хяналт хэсэг", icon: FaDatabase },
    { id: "program", label: "Программ хэсэг", icon: FaCode },
    { id: "hynalt", label: "Хяналт удирдлага", icon: FaChartLine },
    { id: "water", label: "Цэвэр ус хэсэг", icon: FaWater },
    { id: "waste", label: "Бохир ус хэсэг", icon: FaRecycle },
];

export default function BottomNav({ isDark, activeIndex, onNavigate }: BottomNavProps) {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] w-full px-4 flex justify-center pointer-events-none">
            <div
                className={`flex gap-1 overflow-x-auto no-scrollbar backdrop-blur-xl border rounded-full p-1.5 shadow-2xl max-w-full md:max-w-max transition-colors duration-500 pointer-events-auto ${
                    isDark
                        ? "bg-slate-900/90 border-white/10"
                        : "bg-white/90 border-slate-200"
                }`}
            >
                {menu.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = activeIndex === idx;

                    return (
                        <button
                            key={item.id}
                            type="button"
                            // onClick-ийг илүү хүчтэй болгов
                            onClick={(e) => {
                                e.stopPropagation();
                                onNavigate(idx);
                            }}
                            className="relative flex items-center justify-center shrink-0 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer active:scale-95 touch-manipulation"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-blue-600 rounded-full shadow-lg shadow-blue-500/40"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}

                            <div className={`relative z-10 flex items-center gap-2 transition-colors duration-300 pointer-events-none ${
                                isActive ? "text-white" : "text-slate-500 hover:text-blue-500"
                            }`}>
                                <Icon size={14} />
                                <span className={`text-[10px] font-bold uppercase tracking-tight whitespace-nowrap ${
                                    isActive ? "block" : "hidden md:block"
                                }`}>
                                    {item.label}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
