import {motion, AnimatePresence} from "framer-motion";
import React, {useState} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface OfficeItem {
    id: string;
    stats: string;
    unit: string;
    desc: string;
    engineer: number;
    repairman: number;
    img: string;
    icon: string;          // emoji fallback when img missing
    color: string;         // hex accent
    bgAlpha: string;       // rgba for visual bg
    chart: number[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const OFFICE_DATA: Record<string, OfficeItem> = {
    "Хяналтын камер": {
        id: "ID-01", stats: "719", unit: "Камер",
        desc: "Хяналтын камерын систем 719 ширхэг камер\n Хяналтын камерын системийн програм хангамж, тоног төхөөрөмж болон холбогдох техник хэрэгслийн хэвийн, тасралтгүй үйл ажиллагааг хангаж ажиллах, шаардлагатай тохиолдолд оношилгоо, засвар үйлчилгээ хийх, байгууллагын станц, цэг, салбар нэгжүүдийн аюулгүй байдал, найдвартай ажиллагааг ханган, хяналт тавих",
        engineer: 1, repairman: 2,
        img: "/src/assets/cctv-3d.png", icon: "📷",
        color: "#3b82f6", bgAlpha: "rgba(59,130,246,0.08)",
        chart: [40, 70, 45, 90, 65, 85, 50, 75, 60, 80],
    },
    "Компьютер": {
        id: "ID-02", stats: "462", unit: "ТӨХӨӨРӨМЖ",
        desc: "Компьютер 462 ширхэг,  Принтер 159 ширхэг\n Байгууллагын хэмжээнд ашиглагдаж буй компьютер, принтер болон холбогдох тоног төхөөрөмжийн хэвийн, тасралтгүй үйл ажиллагааг ханган ажиллах, шаардлагатай тохиолдолд оношилгоо, засвар үйлчилгээ хийх\n",
        engineer: 2, repairman: 4,
        img: "/src/assets/pc-3d.png", icon: "🖥️",
        color: "#ef4444", bgAlpha: "rgba(239,68,68,0.08)",
        chart: [30, 50, 80, 40, 90, 70, 60, 85, 45, 55],
    },
    "Сүлжээ": {
        id: "ID-03", stats: "1090", unit: "ШИРХЭГ",
        desc: "Сүлжээний тоног төхөөрөмж 1090 ширхэг, Шилэн кабель 230 км\n Гадаад болон дотоод сүлжээ зохион байгуулах, бүх цэг салбаруудын дотоод сүлжээний аюулгүй, найдвартай хэвийн үйл ажиллагааг хангах\n" +
            "\n",
        engineer: 1, repairman: 3,
        img: "/src/assets/network-3d.png", icon: "🌐",
        color: "#06b6d4", bgAlpha: "rgba(6,182,212,0.08)",
        chart: [60, 85, 70, 95, 80, 65, 90, 75, 85, 100],
    },
    "Холбоо": {
        id: "ID-04", stats: "595", unit: "ДУГААР",
        desc: "Холбооны тоног төхөөрөмж – 79, С-68 IP-25 IPTV-16,  Дата дугаар 595\n \n Байгууллагын хэмжээний холбооны системийн програм хангамж, тоног төхөөрөмж, техник хэрэгслийн засвар үйлчилгээг хариуцан, тасралтгүй хэвийн үйл ажиллагааг хангах\n" +
            "\n",
        engineer: 1, repairman: 1,
        img: "/src/assets/telecom-3d.png", icon: "📡",
        color: "#f97316", bgAlpha: "rgba(249,115,22,0.08)",
        chart: [45, 60, 55, 70, 65, 80, 75, 90, 85, 95],
    },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Glass card wrapper */
function GlassCard({
                       children, className = "", style = {}, hover = true,
                   }: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    hover?: boolean;
}) {
    return (
        <motion.div
            whileHover={hover ? {y: -4, boxShadow: "0 24px 56px rgba(0,0,0,0.12)"} : {}}
            transition={{duration: 0.25}}
            className={`relative overflow-hidden rounded-3xl border border-white/80 ${className}`}
            style={{
                background: "rgba(255,255,255,0.52)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                ...style,
            }}
        >
            {/* Shimmer overlay */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "linear-gradient(135deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.35) 50%,rgba(255,255,255,0.08) 100%)",
                }}
            />
            {children}
        </motion.div>
    );
}

/** Animated bar chart */
function BarChart({data, color}: { data: number[]; color: string }) {
    return (
        <div className="flex items-end gap-1" style={{height: 56}}>
            {data.map((h, i) => (
                <motion.div
                    key={i}
                    className="flex-1 rounded-t-sm cursor-pointer transition-opacity hover:opacity-100"
                    style={{background: color, opacity: 0.18 + h / 200}}
                    initial={{height: 0}}
                    animate={{height: `${h}%`}}
                    transition={{delay: i * 0.04, duration: 0.7, ease: [0.4, 0, 0.2, 1]}}
                />
            ))}
        </div>
    );
}

/** Staff card (engineer / repairman) */
function StaffCard({
                       icon, label, value, color,
                   }: {
    icon: string; label: string; value: number; color: string;
}) {
    return (
        <motion.div
            whileHover={{y: -2, background: color}}
            transition={{duration: 0.22}}
            className="flex flex-1 items-center gap-3 rounded-2xl border border-black/[0.04] p-3 cursor-pointer group"
            style={{background: "rgba(248,250,252,0.8)"}}
        >
            <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 transition-colors duration-200"
                style={{background: color + "18"}}
            >
                {icon}
            </div>
            <div>
                <p
                    className="text-[8px] font-bold tracking-[.15em] uppercase transition-colors duration-200"
                    style={{color: "#94a3b8"}}
                >
                    {label}
                </p>
                <p
                    className="text-[22px] font-black leading-none transition-colors duration-200"
                    style={{fontFamily: "'Syne',sans-serif", color: "#0f172a"}}
                >
                    {value}
                </p>
            </div>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OfficeSec() {
    const [activeTab, setActiveTab] = useState("Хяналтын камер");
    const d = OFFICE_DATA[activeTab];

    return (
        <div className="w-full  mx-auto p-6 space-y-8 font-sans antialiased">
            <div
                className="p-8"
                style={{background: "rgba(0,0,0,0.1)", borderRadius: "60px", fontFamily: "'Inter',sans-serif"}}
            >
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/30 blur-[120px]"/>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/30 blur-[120px]"/>
                {/* ── Header ── */}
                <div className="flex items-start justify-between mb-7 relative z-10">
                    <div>
                        <p
                            className="text-[10px] font-semibold tracking-[.22em] uppercase mb-1.5"
                            style={{color: "#94a3b8"}}
                        >
                            Оффис хэсэг
                        </p>
                        <h1
                            className="text-[34px] font-black tracking-tight leading-none"
                            style={{fontFamily: "'Syne',sans-serif", color: "#0f172a"}}
                        >
                            {activeTab}
                        </h1>
                        <motion.div
                            className="mt-2 h-[3px] rounded-full"
                            animate={{background: d.color, width: 36}}
                            transition={{duration: 0.4}}
                        />
                    </div>

                    {/* Tab pills */}
                    <div
                        className="flex gap-1 p-1.5 rounded-full border border-white/90"
                        style={{
                            background: "rgba(255,255,255,0.6)",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        }}
                    >
                        {Object.keys(OFFICE_DATA).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all duration-250 ${
                                    activeTab === tab
                                        ? "bg-white text-slate-900 shadow-xl scale-[1.03]"
                                        : "text-slate-400 hover:text-slate-600 bg-transparent"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Bento Grid ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        className="grid gap-4 relative z-10"
                        style={{gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto auto"}}
                        initial={{opacity: 0, y: 12}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -12}}
                        transition={{duration: 0.45, ease: [0.4, 0, 0.2, 1]}}
                    >

                        {/* ── Main info card (tall, col 1, row 1-2) ── */}
                        <GlassCard
                            className="p-7 flex flex-col"
                            style={{
                                gridColumn: "1 / 2",
                                gridRow: "1 / 3",
                                borderTop: `3px solid ${d.color}`,
                            }}
                        >
            <span
                className="text-[9px] font-bold tracking-[.25em] uppercase mb-4"
                style={{color: "#cbd5e1"}}
            >
              {d.id}
            </span>

                            <div className="flex items-baseline gap-2 mb-1">
              <span
                  className="font-black leading-none"
                  style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: 64,
                      color: "#0f172a",
                      letterSpacing: "-0.03em",
                  }}
              >
                {d.stats}
              </span>
                            </div>
                            <span
                                className="text-[11px] font-semibold tracking-[.12em] mb-4"
                                style={{color: "#94a3b8"}}
                            >
              {d.unit}
            </span>

                            <p className="text-[13px] leading-relaxed mb-5" style={{color: "#64748b"}}>
                                {d.desc}
                            </p>

                            <div className="h-px mb-5" style={{background: "rgba(0,0,0,0.05)"}}/>
                            <div className="text-left">
                                <p className="text-[8px] font-bold tracking-[.2em] uppercase"
                                   style={{color: "#94a3b8", fontSize: 11}}>
                                    Хариуцан ажилдаг ажилчид
                                </p>

                            </div>
                            <div className="flex gap-2.5 mb-auto">
                                <StaffCard icon="👤" label="Инженер" value={d.engineer} color={d.color}/>
                                <StaffCard icon="🛠️" label="Засварчин" value={d.repairman} color={d.color}/>
                            </div>

                            <div className="mt-6">
                                <p
                                    className="text-[9px] font-bold tracking-[.15em] uppercase mb-2.5"
                                    style={{color: "#cbd5e1"}}
                                >
                                    Ачааллын график
                                </p>
                                <BarChart data={d.chart} color={d.color}/>
                            </div>
                        </GlassCard>

                        {/* ── Visual card (col 2-3, row 1) ── */}
                        <GlassCard
                            className="flex items-center justify-center p-10 relative"
                            style={{
                                gridColumn: "2 / 4",
                                gridRow: "1 / 2",
                                minHeight: 280,
                                background: "rgba(255,255,255,0.35)",
                            }}
                            hover={false}
                        >
                            <div className="flex flex-col items-center justify-center">
                                {/* Animated icon / image */}
                                <div className="relative mb-5" style={{width: 160, height: 160}}>
                                    {/* Pulse rings */}
                                    {[0, 0.7].map((delay, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute inset-0 rounded-full border-2"
                                            style={{borderColor: d.color}}
                                            animate={{scale: [0.85, 1.22], opacity: [0.6, 0]}}
                                            transition={{duration: 2, delay, repeat: Infinity, ease: "easeOut"}}
                                        />
                                    ))}
                                    <div
                                        className="absolute inset-0 rounded-full flex items-center justify-center"
                                        style={{background: d.bgAlpha, fontSize: 72}}
                                    >
                                        {d.img ? (
                                            <img
                                                src={d.img}
                                                alt={activeTab}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    (e.currentTarget as HTMLImageElement).style.display = "none";
                                                    (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = "flex";
                                                }}
                                            />
                                        ) : null}
                                        <span>{d.icon}</span>
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
                                    {activeTab}
                                </h2>
                                <p className="text-[11px] mt-1 tracking-wide" style={{color: "#94a3b8"}}>
                                    Active System · Real-time
                                </p>
                            </div>

                            {/* Status badge */}
                            <div
                                className="absolute bottom-5 right-5 flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/90"
                                style={{
                                    background: "rgba(255,255,255,0.85)",
                                    backdropFilter: "blur(20px)",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                                }}
                            >
                                <div className="text-right">
                                    <p className="text-[8px] font-bold tracking-[.2em] uppercase"
                                       style={{color: "#94a3b8"}}>
                                        System Flow
                                    </p>
                                    <p
                                        className="font-black"
                                        style={{fontFamily: "'Syne',sans-serif", fontSize: 18, color: "#0f172a"}}
                                    >
                                        OPTIMAL
                                    </p>
                                </div>
                                <div
                                    className="w-[3px] h-9 rounded-full"
                                    style={{background: d.color}}
                                />
                            </div>
                        </GlassCard>

                        {/* ── Stat card 1 (col 2, row 2) ── */}
                        <GlassCard className="p-6 flex flex-col justify-between"
                                   style={{gridColumn: "2 / 3", gridRow: "2 / 3"}}>
                            <div>
                                <p className="text-[9px] font-bold tracking-[.2em] uppercase mb-2"
                                   style={{color: "#cbd5e1"}}>
                                    Нийт төхөөрөмж
                                </p>
                                <p
                                    className="font-black leading-none"
                                    style={{
                                        fontFamily: "'Syne',sans-serif",
                                        fontSize: 44,
                                        color: "#0f172a",
                                        letterSpacing: "-0.02em"
                                    }}
                                >
                                    {d.stats}
                                </p>
                                <p className="text-[11px] mt-1" style={{color: "#94a3b8"}}>Бүртгэлтэй {d.unit}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <motion.div
                                        animate={{background: d.color}}
                                        className="w-1.5 h-1.5 rounded-full"
                                    />
                                    <span className="text-[10px] font-semibold" style={{color: "#64748b"}}>
                  Идэвхтэй үйл ажиллагаа
                </span>
                                </div>
                                <div className="h-[3px] rounded-full" style={{background: "#f1f5f9"}}>
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{background: d.color}}
                                        initial={{width: "0%"}}
                                        animate={{width: "72%"}}
                                        transition={{duration: 0.9, ease: [0.4, 0, 0.2, 1]}}
                                    />
                                </div>
                            </div>
                        </GlassCard>

                        {/* ── Stat card 2 (col 3, row 2) ── */}
                        <GlassCard className="p-6 flex flex-col justify-between"
                                   style={{gridColumn: "3 / 4", gridRow: "2 / 3"}}>
                            <div>
                                <p className="text-[9px] font-bold tracking-[.2em] uppercase mb-2"
                                   style={{color: "#cbd5e1"}}>
                                    Ажиллах хүч
                                </p>
                                <p
                                    className="font-black leading-none"
                                    style={{
                                        fontFamily: "'Syne',sans-serif",
                                        fontSize: 44,
                                        color: "#0f172a",
                                        letterSpacing: "-0.02em"
                                    }}
                                >
                                    {d.engineer + d.repairman}
                                </p>
                                <p className="text-[11px] mt-1" style={{color: "#94a3b8"}}>
                                    {d.engineer} инженер · {d.repairman} засварчин
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <motion.div
                                        animate={{background: d.color}}
                                        className="w-1.5 h-1.5 rounded-full"
                                    />
                                    <span className="text-[10px] font-semibold" style={{color: "#64748b"}}>
                  Нийт хүний тоо
                </span>
                                </div>
                                <div className="h-[3px] rounded-full" style={{background: "#f1f5f9"}}>
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{background: d.color}}
                                        initial={{width: "0%"}}
                                        animate={{width: `${Math.min(100, (d.engineer + d.repairman) * 14)}%`}}
                                        transition={{duration: 0.9, ease: [0.4, 0, 0.2, 1]}}
                                    />
                                </div>
                            </div>
                        </GlassCard>

                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

    );
}
