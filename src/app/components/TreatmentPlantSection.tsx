import React from 'react';
import { motion } from 'framer-motion';

export default function TreatmentPlantSection({ isDark }: { isDark: boolean }) {
    // Интернэтээс авсан бодит 3D дүрсүүдийн линк
    const icons = {
        inflow: "/src/app/components/assets/25007.jpg", // Хоолой
        process: "/src/app/components/assets/21799.jpg", // Эргэлт
        outflow: "/src/app/components/assets/21799.jpg" // Цорго
    };

    const cardVariants = {
        initial: { y: 30, opacity: 0 },
        animate: { y: 0, opacity: 1 }
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-12">
            {/* Арын гэрэлтэлт (Ambient Glow) */}
            <div className={`absolute w-[80%] h-1/2 blur-[120px] opacity-20 ${isDark ? 'bg-blue-600' : 'bg-blue-400'}`} />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">

                {/* 1. ОРОЛТ - Preliminary Treatment */}
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    whileInView="animate"
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                    className={`group relative p-8 rounded-[3rem] border transition-all duration-500 ${
                        isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/70 border-slate-200 hover:bg-white/90 shadow-xl'
                    } backdrop-blur-2xl`}
                >
                    <div className="relative w-32 h-32 mx-auto mb-6">
                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-500/40 transition-colors" />
                        <img src={icons.inflow} alt="Inflow" className="w-full h-full object-contain relative z-10 drop-shadow-2xl" />
                    </div>
                    <div className="text-center">
                        <p className={`text-[10px] uppercase font-black tracking-[0.2em] mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Phase 01: Inflow</p>
                        <h4 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>1,240 <span className="text-sm font-medium opacity-50">m³/h</span></h4>
                        <div className={`h-1 w-12 mx-auto rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
                    </div>
                </motion.div>

                {/* 2. БОЛОВСРУУЛАЛТ - Secondary Treatment */}
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    whileInView="animate"
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                    className={`group relative p-8 rounded-[3rem] border transition-all duration-500 ${
                        isDark ? 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20' : 'bg-blue-50 border-blue-200 hover:bg-blue-100 shadow-xl'
                    } backdrop-blur-2xl`}
                >
                    <div className="relative w-32 h-32 mx-auto mb-6">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-full h-full"
                        >
                            <img src={icons.process} alt="Process" className="w-full h-full object-contain drop-shadow-2xl" />
                        </motion.div>
                        <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full" />
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] uppercase font-black tracking-[0.2em] mb-2 text-green-500">Phase 02: Purification</p>
                        <h4 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>98.2 <span className="text-sm font-medium opacity-50">%</span></h4>
                        <div className="h-1 w-12 mx-auto rounded-full bg-green-500/20" />
                    </div>
                </motion.div>

                {/* 3. ГАРАЛТ - Tertiary Treatment */}
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    whileInView="animate"
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                    className={`group relative p-8 rounded-[3rem] border transition-all duration-500 ${
                        isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/70 border-slate-200 hover:bg-white/90 shadow-xl'
                    } backdrop-blur-2xl`}
                >
                    <div className="relative w-32 h-32 mx-auto mb-6">
                        <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
                        <img src={icons.outflow} alt="Outflow" className="w-full h-full object-contain relative z-10 drop-shadow-2xl" />
                    </div>
                    <div className="text-center">
                        <p className={`text-[10px] uppercase font-black tracking-[0.2em] mb-2 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Phase 03: Outflow</p>
                        <h4 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>1,215 <span className="text-sm font-medium opacity-50">m³/h</span></h4>
                        <div className={`h-1 w-12 mx-auto rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
                    </div>
                </motion.div>

            </div>
        </div>
    );
}