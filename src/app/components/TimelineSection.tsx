import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import img from "@/app/components/assets/file.png";
export default function TimelineSection({ year, title, work, desc, isDark }: any) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax & Opacity effects
    const yWatermark = useTransform(scrollYProgress, [0, 1], [-80, 80]);
    const opacityWatermark = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0.07, 0.07, 0]);

    return (
        <div ref={sectionRef}
             className={`relative w-full h-screen ${isDark ? "bg-[#0a0a0a]" : "bg-[#F2F5F5]"} overflow-hidden transition-colors duration-700`}>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-400/15 blur-[80px] md:blur-[120px] pointer-events-none"/>
            <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-blue-400/15 blur-[80px] md:blur-[120px] pointer-events-none"/>

            {/* 1. Background Watermark - Responsive Size */}
            <motion.div
                style={{ y: yWatermark, opacity: opacityWatermark }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
            >
                <span className={`text-[65vw] lg:text-[45vw] font-black transition-colors duration-700 ${
                    isDark ? "text-white" : "text-slate-900"
                }`}>
                    {year}
                </span>
            </motion.div>

            {/* 2. Main Content Container */}
            <div className="relative z-10 w-full h-full overflow-y-auto no-scrollbar lg:overflow-hidden">
                <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-full w-full items-center px-6 sm:px-12 lg:px-24 py-20 lg:py-0 gap-8 lg:gap-0">

                    {/* Visual Side (Top on Mobile, Right on Desktop) */}
                    <div className="col-span-12 lg:col-span-5 flex justify-center items-center relative order-1 lg:order-2">
                        <div className={`absolute w-[180px] md:w-[320px] h-[180px] md:h-[320px] blur-[70px] rounded-full opacity-20 ${isDark ? "bg-blue-600" : "bg-blue-400"}`}/>

                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="w-full max-w-[220px] sm:max-w-[320px] lg:max-w-[480px] perspective-1000"
                        >
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                            >
                                <img
                                    src={img}
                                    alt="3D Visualization"
                                    className="w-full h-auto object-contain"
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Typography Side (Bottom on Mobile, Left on Desktop) */}
                    <div className="col-span-12 lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className={`font-mono block mb-3 ${isDark ? "text-pink-400" : "text-pink-600"}`}
                                  style={{ fontWeight: "900", fontSize: "clamp(28px, 6vw, 48px)" }}>
                                {year}
                            </span>

                            <div className={`h-[3px] w-14 mx-auto lg:mx-0 ${isDark ? "bg-blue-500" : "bg-blue-600"} mb-8`}/>

                            <h1 className="text-[8vw] sm:text-5xl lg:text-[4vw] font-black leading-[1.05] uppercase tracking-tighter mb-8">
                                <span className={isDark ? "text-white" : "text-slate-950"}>
                                    {title.split("\n")[0]}
                                </span>
                                <br/>
                                <span
                                    className="block mt-2 font-[1000] uppercase tracking-tighter leading-[0.85] select-none"
                                    style={{
                                        fontSize: 'clamp(3rem, 1vw, 8rem)',
                                        // Текстийг өөрийг нь тунгалаг болгож арын градиентыг гаргаж ирнэ
                                        color: 'transparent',
                                        // Танд байгаа өнгөнүүд (W.from, W.to) эсвэл шууд тод өнгө:
                                        backgroundImage: `linear-gradient(135deg, #4CAF50 0%, #6094ea 100%)`,
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        // Тод байдлыг нэмэгдүүлэх Glow эффект
                                        filter: isDark ? 'drop-shadow(0 0 15px rgba(76, 175, 240, 0.3))' : 'none',
                                    }}
                                >
    {title.split("\n")[1]}
</span>

                        </h1>

                        <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
                            <div
                                className={`inline-block px-3 py-1 rounded-md text-[10px] font-bold tracking-[0.25em] uppercase border ${
                                    isDark ? "text-blue-400 border-blue-400/20 bg-blue-400/5" : "text-blue-600 border-blue-600/20 bg-blue-600/5"
                                }`}>
                                {work}
                            </div>
                            <p className={`text-sm sm:text-base lg:text-lg whitespace-pre-line leading-relaxed font-medium ${
                                    isDark ? "text-slate-400" : "text-slate-600"
                                }`}>
                                {desc}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 3. Progress UI - Hidden on Mobile to reduce clutter */}
            <div className="absolute bottom-10 left-10 right-10 z-20 hidden lg:block">
                <div className="flex items-center gap-6">
                    <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${isDark ? "text-white/20" : "text-black/20"}`}>
                        Project Timeline
                    </span>
                    <div className={`flex-1 h-[1px] ${isDark ? "bg-white/10" : "bg-black/5"}`}>
                        <motion.div
                            style={{ scaleX: scrollYProgress, originX: 0 }}
                            className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        />
                    </div>
                    <span className={`text-xs font-mono font-bold ${isDark ? "text-blue-400" : "text-blue-500"}`}>
                        {year}
                    </span>
                </div>
            </div>

            {/* Scroll Hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 lg:hidden opacity-50">
                <div className={`w-5 h-8 rounded-full border-2 ${isDark ? "border-white/20" : "border-black/10"} flex justify-center p-1`}>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`w-1 h-1.5 rounded-full ${isDark ? "bg-blue-400" : "bg-blue-500"}`}
                    />
                </div>
            </div>
        </div>
    );
}