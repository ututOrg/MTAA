import { motion } from "framer-motion";
import React from "react";
import SoftwareTabs from "../SoftwareTabs";
import {useOutletContext} from "react-router";

// --- Программ хангамжийн дата (Зургаас авсан бодит үзүүлэлтүүд) ---
const SOFTWARE_STATS = [
    {
        name: "АВТОМАТЖУУЛАЛТЫН ПРОГРАММ ХАНГАМЖ",
        total: 29,
        dev: 13,
        usage: 16,
        tools: "Citect Scada, WinCC, iFix, Kwater, So Machine, Step7, ICP101",
        color: "#6366f1", icon: "⚙️"
    },
    {
        name: "ҮЙЛ АЖИЛЛАГААНЫ ПРОГРАММ ХАНГАМЖ",
        total: 50,
        dev: 11,
        usage: 30,
        license: 9,
        tools: "MySQL, MSSQL, Oracle, PostgreSQL, Node.js, React, Java, Docker",
        color: "#10b981", icon: "💻"
    }
];

export default function SystemSection() {
    const { isDark } = useOutletContext<{ isDark: boolean }>();
    return (
        <div className="w-full  mx-auto p-6 space-y-8 font-sans antialiased">
            <div
                className="p-8"
                style={{background: "rgba(0,0,0,0.1)", borderRadius: "60px", fontFamily: "'Inter',sans-serif"}}
            >

                {/* Header: Нэгдсэн мэдээлэл */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                    <div className="space-y-2">

                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">ПРОГРАММ
                            ХАНГАМЖ, ХӨГЖҮҮЛЭЛТ</h1>
                        <p className="text-sm text-slate-500 font-medium">Байгууллагын хэмжээнд 27 сервер, 79 нэр
                            төрлийн программ хангамж</p>
                    </div>

                    <div className="flex gap-4">

                            <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase mb-1">Нийт
                                Сервер</p>
                            <p className="text-3xl font-black text-indigo-600 tracking-tighter">27</p>


                            <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase mb-1">Нийт
                                ПРОГРАММ ХАНГАМЖ</p>
                            <p className="text-3xl font-black text-white tracking-tighter">79</p>

                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-6">

                    {/* 1. Дотоодын болон Өөрсдийн хөгжүүлсэн ПХ-уудын жагсаалт */}
                   <SoftwareTabs/>

                    {/* 2. Төв визуал болон Технологийн стак */}
                    <div className="col-span-12 lg:col-span-8 grid grid-rows-2 gap-6">

                        {/* Өөрсдийн хөгжүүлсэн программ хангамжууд (Visual Cards) */}
                        <div className="row-span-1 grid grid-cols-3 gap-4">
                            {SOFTWARE_STATS.map((stat, i) => (
                                <div key={i}
                                     className={`${i === 1 ? 'col-span-2' : 'col-span-1'} bg-white p-8 rounded-[3rem] border border-slate-100 flex flex-col justify-between relative overflow-hidden`}>
                                    <div className="relative z-10">
                                        <div className="text-2xl mb-4">{stat.icon}</div>
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.name}</h4>
                                        <p className="text-4xl font-black text-slate-900 tracking-tighter italic">{stat.total}</p>
                                    </div>
                                    <div className="relative z-10 flex gap-4 mt-6">
                                        <div>
                                            <p className="text-[8px] font-black text-indigo-500 uppercase">Хөгжүүлэлт</p>
                                            <p className="text-xl font-black text-slate-800">{stat.dev}</p>
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-black text-emerald-500 uppercase">Ашиглалт</p>
                                            <p className="text-xl font-black text-slate-800">{stat.usage}</p>
                                        </div>
                                    </div>
                                    {/* Background Tech Stack Text */}
                                    <div
                                        className="absolute -right-4 bottom-4 opacity-[0.03] font-black text-4xl whitespace-nowrap rotate-[-5deg]">
                                        {stat.tools}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Дотоодын ПХ хөгжүүлэлтийн жагсаалт (Bottom Wide) */}
                        <div
                            className="row-span-1 bg-[#000000d6] rounded-[3rem] p-8 relative overflow-hidden flex items-center">
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)',
                                backgroundSize: '30px 30px'
                            }}/>
                            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                                {[
                                    {label: "Өөрсдийн хөгжүүлсэн", count: 11, unit: "ПХ"},
                                    {label: "Лицензтэй программ", count: 9, unit: "эрх"},
                                    {label: "Датабааз систем", count: 4, unit: "төрөл"},
                                    {label: "Хөгжүүлэлтийн хэл", count: 8, unit: "хэл"}
                                ].map((item, i) => (
                                    <div key={i} className="text-center md:text-left">
                                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                        <p className="text-3xl font-black text-white italic tracking-tighter">{item.count}
                                            <span className="text-xs not-italic text-slate-600">{item.unit}</span></p>
                                    </div>
                                ))}
                            </div>
                            {/* Visual Dev Icon */}
                            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20">
                                <div className="text-7xl font-black text-white italic">{"</>"}</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer: Технологийн стак */}
                <div
                    className="bg-white/50 backdrop-blur-md border border-white p-6 rounded-[2.5rem] flex flex-wrap justify-center gap-4">
                    {["MySQL", "MSSQL", "PostgreSQL", "ReactJS", "NodeJS", "Docker", "Java Spring"].map((tech, i) => (
                        <span key={i}
                              className="px-5 py-2 rounded-full bg-white border border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest shadow-sm">
                    {tech}
                </span>
                    ))}
                </div>
            </div>
        </div>
    );
}