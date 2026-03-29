import {motion} from "framer-motion";
import React from "react";
import {useOutletContext} from "react-router";

// ─── DATA (Зургаас авсан бүх датаг нэгтгэв) ─────────────────────────────────────
const TOTAL_STAFF = {engineer: 1, tex: 2, repairman: 4}; // Нийт ажилчид

const ALL_NODES = [
    {name: "ТЦБ СТАНЦ", stats: 8, unit: "төхөөрөмж", color: "#6366f1", icon: "🏢"},
    {name: "БАГА ОВРЫН ЦБ", stats: 5, unit: "станц", color: "#3b82f6", icon: "🏭"},
    {name: "БОХИРЫН ӨРГӨХ СТАНЦ", stats: 9, unit: "станц", color: "#06b6d4", icon: "🌀"},
    {name: "ТУНГААГУУРЫН ТОК", stats: 19, unit: "төхөөрөмж", color: "#10b981", icon: "⚡"},
    {name: "ДАВТАМЖ ХУВИРГАГЧ", stats: 91, unit: "төхөөрөмж", color: "#f59e0b", icon: "📠"}
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function StatCard({node}: any) {
    return (
        <motion.div
            whileHover={{y: -5}}
            className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-sm flex flex-col justify-between"
        >
            <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-inner"
                     style={{background: node.color + "15", color: node.color}}>
                    {node.icon}
                </div>
                <span className="text-[10px] font-black text-slate-300 tracking-tighter uppercase">Active Node</span>
            </div>
            <div className="mt-8">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">{node.stats}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{node.unit}</span>
                </div>
                <p className="text-[11px] font-bold text-slate-600 mt-1 uppercase tracking-tight">{node.name}</p>
            </div>
        </motion.div>
    );
}

export default function Tsewer() {
    const { isDark } = useOutletContext<{ isDark: boolean }>();
    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8 font-sans antialiased">
            <div
                className="p-8"
                style={{background: "rgba(0,0,0,0.1)", borderRadius: "60px", fontFamily: "'Inter',sans-serif"}}
            >
                {/* Header: Нийт ажиллах хүч */}
                <div className="grid grid-cols-12 gap-6 mb-8">
                    <div className="col-span-12 lg:col-span-4">
                           <span className="text-[20px] font-bold   ">
                                <br/> Цэвэр усны тоног төхөөрөмжийн хэсэг
                           </span>
                    </div>

                    <div className="col-span-12 lg:col-span-8 flex gap-4">
                        {[
                            {label: "НИЙТ ИНЖЕНЕР", val: TOTAL_STAFF.engineer, col: "#6366f1"},
                            {label: "ТЕХНИКЧИД", val: TOTAL_STAFF.tex, col: "#10b981"},
                            {label: "ЗАСВАРЧИД", val: TOTAL_STAFF.repairman, col: "#f59e0b"}
                        ].map((s, i) => (
                            <div key={i}
                                 className="flex-1 bg-white p-5 rounded-[1.8rem] border border-slate-200/60 shadow-sm flex flex-col justify-center">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                                <p className="text-3xl font-black text-slate-900 tracking-tighter leading-none"
                                   style={{color: s.col}}>{s.val}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content: Bento Grid Layout */}
                <div className="grid grid-cols-12 gap-6">

                    {/* Left Side: Industrial Visual */}
                    <div
                        className="col-span-12 lg:col-span-7 rounded-[3rem] relative overflow-hidden p-12 flex flex-col justify-between min-h-[500px]">
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)',
                            backgroundSize: '30px 30px'
                        }}/>

                        <div className="relative z-10">
                            <div
                                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            {/* Animated icon / image */}
                            <div className="relative mb-5" style={{width: 160, height: 160}}>
                                {/* Pulse rings */}
                                {[0, 0.9].map((delay, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute inset-0 rounded-full border-2"
                                        style={{borderColor: "d.color"}}
                                        animate={{scale: [0.85, 1.22], opacity: [0.6, 0]}}
                                        transition={{duration: 2, delay, repeat: Infinity, ease: "easeOut"}}
                                    />
                                ))}
                                <div
                                    className="absolute inset-0 rounded-full flex items-center justify-center"
                                    style={{background: "d.bgAlpha", fontSize: 72}}
                                >

                                    🌊
                                    {/*<span>{d.icon}</span>*/}
                                </div>
                            </div>

                            <h2
                                className="font-black text-center"
                                style={{
                                    fontFamily: "'Syne',sans-serif",
                                    fontSize: 24,
                                    color: "#0f172a",
                                    letterSpacing: "-0.01em"
                                }}
                            >
                            </h2>
                            <p className="text-[11px] mt-1 tracking-wide" style={{color: "#94a3b8"}}>
                                Active System · Real-time
                            </p>
                        </div>

                        <div className="relative z-10 flex justify-between items-end">
                            <div>

                                <h3 className="text-2xl font-black text-white italic tracking-tighter">Бохир ус</h3>
                            </div>
                            <div className="flex gap-1.5">
                                {[1, 2, 3, 4].map(i => <div key={i}
                                                            className="w-1 h-6 rounded-full bg-blue-500/50"/>)}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Nodes Grid */}
                    <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
                        {ALL_NODES.map((node, i) => (
                            <div key={i} className={i === 4 ? "col-span-2" : "col-span-1"}>
                                <StatCard node={node}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}