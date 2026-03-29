import React from 'react';
import { motion } from 'framer-motion';

export default function CoreVisualization() {
    return (
        <div className="relative w-full h-[600px] flex items-center justify-center">

            {/* 1. Төв 3D Core Object */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 scale-110"
            >
                {/* Энд өөрийн Core-ийн зургаа оруулна уу */}
                <img
                    src="/your-core-image.png"
                    alt="IoT Core"
                    className="w-[500px] drop-shadow-[0_50px_50px_rgba(0,0,0,0.15)]"
                />

                {/* Шилэн цагираг (Glass Ring) */}
                <div className="absolute top-[40%] left-[-10%] w-56 h-56 border-[16px] border-white/20 rounded-full backdrop-blur-[2px] shadow-[0_0_40px_rgba(255,255,255,0.2)] -z-10" />
            </motion.div>

            {/* 2. Мэдээллийн заагчууд (Pointers) */}

            {/* TOP RIGHT: Core Process Temp */}
            <div className="absolute top-[10%] right-[15%] z-20">
                <div className="flex flex-col items-start">
                    <div className="flex items-center">
                        <div className="w-[120px] h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-gray-400"></div>
                        <div className="w-2 h-2 rounded-full bg-white border border-gray-300 shadow-sm ml-[-4px]"></div>
                    </div>
                    <div className="pl-28 mt-[-35px]">
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Core Process (Q-C-1) Temp</p>
                        <p className="text-2xl font-black text-gray-800">9.8e+6 nodes</p>
                    </div>
                </div>
            </div>

            {/* BOTTOM RIGHT: Mesh Network Latency */}
            <div className="absolute bottom-[35%] right-[10%] z-20">
                <div className="flex items-center gap-4">
                    <div className="w-[100px] h-[1px] bg-gradient-to-r from-transparent to-gray-300"></div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Mesh Network Latency</p>
                        <p className="text-2xl font-black text-gray-800">&lt;1ns</p>
                    </div>
                </div>
            </div>

            {/* BOTTOM LEFT: IoT Node Density */}
            <div className="absolute bottom-[10%] left-[20%] z-20">
                <div className="flex flex-col items-center">
                    <div className="mb-2 text-center">
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">IoT Node Density</p>
                        <p className="text-2xl font-black text-gray-800">9.8e+6 nodes</p>
                    </div>
                    <div className="w-[1px] h-20 bg-gradient-to-b from-gray-300 to-transparent"></div>
                    <div className="w-2 h-2 rounded-full bg-white border border-gray-300 shadow-sm mt-[-4px]"></div>
                </div>
            </div>

            {/* 3. Дээд талын өнгө сонгогч (Color Selector) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-xl px-6 py-3 rounded-full flex gap-4 shadow-2xl border border-white/10">
                <div className="w-5 h-5 rounded-full bg-[#ff4d4d] cursor-pointer hover:scale-125 transition-transform" />
                <div className="w-5 h-5 rounded-full bg-[#ffcc00] cursor-pointer hover:scale-125 transition-transform" />
                <div className="w-5 h-5 rounded-full bg-[#00cc99] cursor-pointer hover:scale-125 transition-transform" />
                <div className="w-5 h-5 rounded-full bg-[#0099ff] cursor-pointer hover:scale-125 transition-transform" />
                <div className="w-5 h-5 rounded-full bg-white cursor-pointer hover:scale-125 transition-transform shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>

        </div>
    );
}