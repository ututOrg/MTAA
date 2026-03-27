import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
    FaBuilding,
    FaDatabase,
    FaCode,
    FaChartLine,
    FaWater,
    FaRecycle,
    FaShieldAlt,
} from "react-icons/fa";

const menu = [
    { id: "office", label: "Оффис", icon: FaBuilding },
    { id: "data", label: "Дата", icon: FaDatabase },
    { id: "program", label: "Программ", icon: FaCode },
    { id: "monitoring", label: "Хяналт", icon: FaChartLine },
    { id: "water", label: "Цэвэр ус", icon: FaWater },
    { id: "waste", label: "Бохир ус", icon: FaRecycle },
    { id: "habea", label: "ХАБЭА", icon: FaShieldAlt },
];

export default function BottomNav() {
    const [active, setActive] = useState("office");

    // 👉 manual scroll detect
    const isManual = useRef(false);

    useEffect(() => {
        const sections = document.querySelectorAll("section");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isManual.current) {
                        setActive(entry.target.id);
                    }
                });
            },
            { threshold: 0.6 }
        );

        sections.forEach((sec) => observer.observe(sec));
        return () => observer.disconnect();
    }, []);

    // ✅ FIXED SCROLL
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;

        isManual.current = true;

        const y =
            el.getBoundingClientRect().top + window.scrollY - 80; // navbar offset

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });

        setActive(id);

        // delay дараа observer буцааж идэвхжүүлнэ
        setTimeout(() => {
            isManual.current = false;
        }, 800);
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-4">

            <div className="flex gap-2 overflow-x-auto bg-white/80 backdrop-blur-xl border border-gray-200 rounded-full px-3 py-2 shadow-2xl">

                {menu.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.id;

                    return (
                        <motion.div
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative cursor-pointer"
                        >
                            {/* ACTIVE BACKGROUND */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-blue-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                />
                            )}

                            <div
                                className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full transition whitespace-nowrap ${
                                    isActive
                                        ? "text-white"
                                        : "text-gray-600 hover:text-black"
                                }`}
                            >
                                <Icon className="text-sm" />
                                <span className="text-sm font-medium">
                  {item.label}
                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}