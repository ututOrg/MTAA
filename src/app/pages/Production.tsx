import { useState, useRef } from 'react';
import { useOutletContext } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import TimelineSection from "../components/TimelineSection";

const TIMELINE_DATA = [
    { year: "2006", title: "Шуурхай зохицуулалтын албаны \nМэдээллийн технологи хэсэг",work:"Хийгдсэн ажил", desc: "2009 онд Баянголын насос станцыг автоматжуулалт \n 2010 Махын насос станцын автоматжуулалт" },
    { year: "2011", title: "Хангамж үйлчилгээний албаны \nАвтоматжуулалтын хэсэг",work:"Хийгдсэн ажил", desc: "2011 Баруун дүүргийн насос станцыг автоматжуулалт\n" + "\n" },
    { year: "2013", title: "Мэдээллийн технологи \nавтоматжуулалтын нэгж",work:"Өргөжсөн үе", desc: "Бүтэц зохион байгуулалтын өөрчлөлтөөр бие даасан нэгж болон өргөжсөн үе." },
    { year: "2014", title: "Үйл ажиллагааны зохицуулалтыг албаны \n Мэдээллийн технологи автоматжуулалтын нэгж", desc: "" },
    { year: "2015", title: "Засварын нэгдсэн албаны \n Цахилгаан автоматикийн хэсэг",work:"Хийгдсэн ажил", desc: "2015 Зүүн хойд бүсийн усан сангийн автомат систем, 500мм цахилгаан хаалтны автоматжуулалт \n 2016 Хайлаастын насос станцын автоматжуулалт\n" + "\n"},
    { year: "2017", title: "Мэдээллийн технологи  \nавтоматжуулалтын нэгж\n",work:"Хийгдсэн ажил", desc: "2017 Багахангай УСАТ гүний худгийн алсын удирдлагын систем ашиглалтанд оруулсан\n"+"2019 Хяналт удирдлагын төвийн Скада системийг ашиглалтанд оруулсан  \n" + "2022 Үйлдвэр, Мах, Яармаг, Буянт-Ухаа эх үүсвэрүүдийг  СКАДА системд холбож хянах удирдах боломжтой болгосон\n" + "2022 Дамбын насос станцыг ХУТ-тэй холбож  СКАДА системд нэгтгэн хянах удирдах боломжтой болгосон\n" + "2023 Чингэлтэй, Хайлааст, Сэлбэ, Шархад насос станцыг бүрэн автоматжуулсан\n" + "2022 Баянголын насос станцыг алсын удирдлагын систем ашиглалтанд оруулсан\n" + "\n" },
    { year: "2025", title: "Мэдээллийн технологи \nавтоматжуулалтын алба",work:"Өргөжсөн үе", desc: "" }
];

export default function Production() {
    const { isDark } = useOutletContext<{ isDark: boolean }>();
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight } = e.currentTarget;
        // Scroll хэмжээг илүү нарийвчлалтай тооцох
        const index = Math.round(scrollTop / clientHeight);
        if (index !== activeIndex && index >= 0 && index < TIMELINE_DATA.length) {
            setActiveIndex(index);
        }
    };

    const scrollToSection = (index: number) => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: index * containerRef.current.clientHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className={`fixed inset-0 overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth outline-none ${
                isDark ? "bg-[#0a0a0a]" : "bg-[#f8f9fa]"
            }`}
        >
            {/* RIGHT SIDE NAVIGATION */}
            <div className="fixed right-2 sm:right-4 md:right-8 lg:right-12 top-0 h-full flex items-center z-50 pointer-events-none">
                <div className="flex flex-col items-end gap-4 sm:gap-6 md:gap-12 pointer-events-auto">

                    {/* BIG INDEX */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="text-right pr-1"
                        >
                            <span className={`text-3xl sm:text-5xl md:text-7xl font-black leading-none block transition-colors duration-500 ${
                                isDark ? "text-white/90" : "text-slate-900/90"
                            }`}>
                                {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1}
                            </span>
                            <div className={`text-[8px] sm:text-[9px] mt-1 font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-colors duration-500 ${
                                isDark ? "text-blue-500" : "text-blue-600"
                            }`}>
                                {TIMELINE_DATA[activeIndex].year}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* DOTS NAVIGATION */}
                    <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 border-l border-current/10 pl-3 sm:pl-4 md:pl-6 transition-colors duration-500">
                        {TIMELINE_DATA.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => scrollToSection(idx)}
                                aria-label={`Go to year ${TIMELINE_DATA[idx].year}`}
                                className={`group relative transition-all duration-500 rounded-full ${
                                    idx === activeIndex
                                        ? "h-6 sm:h-8 md:h-12 w-1 sm:w-1.5 bg-blue-500"
                                        : `h-1 sm:h-1.5 w-1 sm:w-1.5 ${isDark ? "bg-white/20 hover:bg-white/40" : "bg-black/10 hover:bg-black/20"}`
                                }`}
                            >
                                {/* Hover tooltip for desktop */}
                                <span className={`absolute right-full mr-4 px-2 py-1 rounded bg-blue-500 text-white text-[10px] font-bold opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 hidden lg:block`}>
                                    {TIMELINE_DATA[idx].year}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTIONS */}
            {TIMELINE_DATA.map((item, index) => (
                <section
                    key={index}
                    className="h-screen w-full snap-start snap-always overflow-hidden"
                >
                    <TimelineSection
                        {...item}
                        isDark={isDark}
                        index={index}
                        total={TIMELINE_DATA.length}
                    />
                </section>
            ))}
        </div>
    );
}