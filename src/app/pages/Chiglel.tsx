import { useEffect, useRef, useState } from "react";
import BottomNav from "../components/BottomNav";
import DataSection from "../components/uil/DataSection";
import OfficeSec from "../components/uil/OfficeSec";
import SystemSection from "../components/uil/SystemSection";
import Hynalt from "../components/uil/Hynalt";
import Tsewer from "../components/uil/Tsewer";
import Bohir from "../components/uil/Bohir";
import { useOutletContext } from "react-router";

export default function Chiglel() {
    // Outlet-ээс ирж буй Dark mode төлөв
    const { isDark } = useOutletContext<{ isDark: boolean }>();
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const SECTIONS = [
        { id: "office", label: "Оффис" },
        { id: "data", label: "Дата" },
        { id: "program", label: "Программ" },
        { id: "hynalt", label: "Хяналт" },
        { id: "water", label: "Цэвэр ус" },
        { id: "waste", label: "Бохир ус" }
    ];

    const scrollToSection = (index: number) => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollTo({
                top: index * container.clientHeight,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        const handleScroll = () => {
            if (container) {
                const index = Math.round(container.scrollTop / container.clientHeight);
                if (index !== activeIndex) setActiveIndex(index);
            }
        };

        container?.addEventListener("scroll", handleScroll, { passive: true });
        return () => container?.removeEventListener("scroll", handleScroll);
    }, [activeIndex]);

    return (
        <main
            className={`fixed inset-0 transition-colors duration-700 overflow-hidden flex flex-col ${
                isDark ? "bg-[#0B0F1A]" : "bg-[#F8FAFC]"
            }`}
            style={{
                fontFamily: "'Inter', sans-serif",
                backgroundImage: isDark
                    ? "radial-gradient(circle at 50% -20%, #1E293B, #0B0F1A)"
                    : "linear-gradient(135deg, rgba(33,150,243,0.05) 0%, rgba(33,150,243,0.1) 100%)"
            }}
        >
            {/* Timeline Navigation */}
            <div className={`fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 border-l pl-4 md:pl-6 transition-colors duration-500 ${
                isDark ? "border-white/10" : "border-blue-500/10"
            }`}>
                {SECTIONS.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => scrollToSection(idx)}
                        className={`group relative w-1.5 transition-all duration-700 rounded-full ${
                            idx === activeIndex
                                ? "h-12 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                                : isDark ? "h-2 bg-slate-700 hover:bg-slate-500" : "h-2 bg-slate-300 hover:bg-blue-300"
                        }`}
                    >
                        {/* Hover хийхэд хэсгийн нэр харагдах Glassmorphism style */}
                        <span className={`absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all px-3 py-1 rounded-lg shadow-xl text-[10px] font-black whitespace-nowrap border ${
                            isDark
                                ? "bg-slate-800/90 text-white border-white/10 backdrop-blur-md"
                                : "bg-white text-blue-600 border-blue-50"
                        }`}>
                            {SECTIONS[idx].label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Үндсэн Скролл Контейнер */}
            <div
                ref={scrollContainerRef}
                className="w-full h-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar"
            >
                {/* Дэд компонентууд руу isDark-ийг дамжуулснаар доторх Bento картууд өнгөө солино */}
                <section className="h-screen w-full snap-start snap-always shrink-0 flex items-center justify-center p-6">
                    <div className="w-full max-w-7xl"> <OfficeSec /> </div>
                </section>

                <section className="h-screen w-full snap-start snap-always shrink-0 flex items-center justify-center p-6">
                    <div className="w-full max-w-7xl"> <DataSection /> </div>
                </section>

                <section className="h-screen w-full snap-start snap-always shrink-0 flex items-center justify-center p-6">
                    <div className="w-full max-w-7xl"> <SystemSection /> </div>
                </section>

                <section className="h-screen w-full snap-start snap-always shrink-0 flex items-center justify-center p-6">
                    <div className="w-full max-w-7xl"> <Hynalt /> </div>
                </section>

                <section className="h-screen w-full snap-start snap-always shrink-0 flex items-center justify-center p-6">
                    <div className="w-full max-w-7xl"> <Tsewer /> </div>
                </section>

                <section className="h-screen w-full snap-start snap-always shrink-0 flex items-center justify-center p-6">
                    <div className="w-full max-w-7xl"> <Bohir /> </div>
                </section>
            </div>

            <div className="fixed bottom-0 left-0 w-full z-[60]">
                <BottomNav isDark={isDark} activeIndex={activeIndex} onNavigate={scrollToSection} />
            </div>
        </main>
    );
}