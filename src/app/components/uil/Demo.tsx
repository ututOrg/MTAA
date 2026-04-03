import {AnimatePresence, motion} from "framer-motion";
import type {HTMLMotionProps} from "framer-motion";
import React, {useEffect, useMemo, useState} from "react";
import cameraSlide1 from "../assets/slides/kamer.webp";
import cameraSlide2 from "../assets/slides/4.jpg";
import cameraSlide3 from "../assets/slides/5.jpg";
import cameraSlide4 from "../assets/slides/6.jpg";
import cameraSlide5 from "../assets/slides/7.jpg";
import cyberImage from "../assets/slides/cyber.webp";
import computerImage from "../assets/slides/hardware.jpg";
import networkImage from "../assets/slides/suljee.jpg";
import telecomImage from "../assets/slides/holboo.jpg";
import DeviceCountsLayer from "../componets/DeviceLocationCount";
import type {DeviceLocationCount} from "../componets/Data";

type VisualSlide = {
    src: string;
    alt: string;
};

// Replace/extend this list with real diagram images.
const VISUAL_SLIDES: VisualSlide[] = [
    {src: cameraSlide1, alt: "Camera system overview"},
    {src: cameraSlide2, alt: "Camera system (reference)"},
    {src: cameraSlide3, alt: "Camera system (reference)"},
    {src: cameraSlide4, alt: "Camera system (reference)"},
    {src: cameraSlide5, alt: "Camera system (reference)"},
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface OfficeItem {
    id: string;
    stats: string;
    unit: string;
    desc: string;
    engineer: number;
    repairman: number;
    tex?:number;
    img: string;
    icon: string;          // emoji fallback when img missing
    color: string;         // hex accent
    bgAlpha: string;       // rgba for visual bg
    chart: number[];
    slides?: VisualSlide[];
    hideVisualText?: boolean;
    fullVisualImage?: boolean;
    visualScale?: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────


const OFFICE_DATA: Record<string, OfficeItem> = {
    "Хяналтын камер": {
        id: "ID-01", stats: "1776", unit: "Камер",
        desc: "\n Хяналтын камерын системийн програм хангамж, тоног төхөөрөмж болон холбогдох техник хэрэгслийн хэвийн, тасралтгүй үйл ажиллагааг хангаж ажиллах, шаардлагатай тохиолдолд оношилгоо, засвар үйлчилгээ хийх, байгууллагын станц, цэг, салбар нэгжүүдийн аюулгүй байдал, найдвартай ажиллагааг ханган, хяналт тавих",
        engineer: 1, repairman: 2,
        img: "/src/assets/cctv-3d.png", icon: "📷",
        color: "#3b82f6", bgAlpha: "rgba(59,130,246,0.08)",
        chart: [40, 70, 45, 90, 65, 85, 50, 75, 60, 80],
        slides: VISUAL_SLIDES,
        visualScale: 1.12,
    },
    "Кибер аюулгүй байдал": {
        id: "ID-02", stats: "719", unit: "Камер",
        desc: "Хяналтын камерын систем 719 ширхэг камер\n Хяналтын камерын системийн програм хангамж, тоног төхөөрөмж болон холбогдох техник хэрэгслийн хэвийн, тасралтгүй үйл ажиллагааг хангаж ажиллах, шаардлагатай тохиолдолд оношилгоо, засвар үйлчилгээ хийх, байгууллагын станц, цэг, салбар нэгжүүдийн аюулгүй байдал, найдвартай ажиллагааг ханган, хяналт тавих",
        engineer: 1, repairman: 2,
        img: cyberImage, icon: "📷",
        color: "#3b82f6", bgAlpha: "rgba(59,130,246,0.08)",
        chart: [40, 70, 45, 90, 65, 85, 50, 75, 60, 80],
        hideVisualText: true,
        fullVisualImage: true,
        visualScale: 1.12,
    },
    "Компьютер": {
        id: "ID-03", stats: "462", unit: "ТӨХӨӨРӨМЖ",
        desc: "Компьютер 462 ширхэг,  Принтер 159 ширхэг\n Байгууллагын хэмжээнд ашиглагдаж буй компьютер, принтер болон холбогдох тоног төхөөрөмжийн хэвийн, тасралтгүй үйл ажиллагааг ханган ажиллах, шаардлагатай тохиолдолд оношилгоо, засвар үйлчилгээ хийх\n",
        engineer: 2, repairman: 4,
        img: computerImage, icon: "🖥️",
        color: "#ef4444", bgAlpha: "rgba(239,68,68,0.08)",
        chart: [30, 50, 80, 40, 90, 70, 60, 85, 45, 55],
        hideVisualText: true,
        fullVisualImage: true,
        visualScale: 1.34,
    },
    "Сүлжээ": {
        id: "ID-04", stats: "1090", unit: "ШИРХЭГ",
        desc: "Сүлжээний тоног төхөөрөмж 1090 ширхэг, Шилэн кабель 230 км\n Гадаад болон дотоод сүлжээ зохион байгуулах, бүх цэг салбаруудын дотоод сүлжээний аюулгүй, найдвартай хэвийн үйл ажиллагааг хангах\n" +
            "\n",
        engineer: 1, repairman: 3,
        img: networkImage, icon: "🌐",
        color: "#06b6d4", bgAlpha: "rgba(6,182,212,0.08)",
        chart: [60, 85, 70, 95, 80, 65, 90, 75, 85, 100],
        hideVisualText: true,
        fullVisualImage: true,
        visualScale: 1.58,
    },
    "Холбоо": {
        id: "ID-05", stats: "595", unit: "ДУГААР",
        desc: "Холбооны тоног төхөөрөмж – 79, С-68 IP-25 IPTV-16,  Дата дугаар 595\n \n Байгууллагын хэмжээний холбооны системийн програм хангамж, тоног төхөөрөмж, техник хэрэгслийн засвар үйлчилгээг хариуцан, тасралтгүй хэвийн үйл ажиллагааг хангах\n" +
            "\n",
        engineer: 1, repairman: 1,
        img: telecomImage, icon: "📡",
        color: "#f97316", bgAlpha: "rgba(249,115,22,0.08)",
        chart: [45, 60, 55, 70, 65, 80, 75, 90, 85, 95],
        hideVisualText: true,
        fullVisualImage: true,
        visualScale: 1.4,
    },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

// TODO: Replace this with real data (API/DB). These are placeholders for the "Нийт төхөөрөмж" layer.
const CAMERA_COUNTS_BY_LOCATION: DeviceLocationCount[] = [
    {location: "Ус сувгийн удирдах газрын төв байранд", cameras: 3},
    {location: "Дээд эх үүсвэр станц", cameras: 15},
    {location: "Дээд эх үүсвэрийн худгууд", cameras: 58},
    {location: "Гачууртын эх үүсвэр станц", cameras: 9},
    {location: "Гачууртын эх үүсвэр худгууд", cameras: 23},
    {location: "Төвийн эх үүсвэр", cameras: 12},
    {location: "Төвийн эх үүсвэр худгууд", cameras: 99},
    {location: "Махын эх үүсвэр станц", cameras: 14},
    {location: "Махын эх үүсвэр станцын худгууд", cameras: 15},
    {location: "Яармагийн эх үүсвэр станц", cameras: 12},
    {location: "Яармагийн эх үүсвэр худаг", cameras: 5},
    {location: "Яармагийн эх үүсвэрийн усан сан", cameras: 3},
    {location: "Нисэхийн эх үүсвэр станц", cameras: 9},
    {location: "Нисэхийн эх үүсвэр станцын худгууд", cameras: 22},
    {location: "Нисэхийн усан сан", cameras: 5},
    {location: "Үйлдвэрийн эх үүсвэр станц", cameras: 13},
    {location: "Үйлдвэрийн станц худгууд", cameras: 21},
    {location: "Баруун дүүргийн насос станц", cameras: 11},
    {location: "21-р хороололын усан сан", cameras: 4},
    {location: "Баянхошуу дээд станц", cameras: 7},
    {location: "Баянхошуу дээд усан сан", cameras: 6},
    {location: "Баянхошуу доод станц", cameras: 7},
    {location: "Баянхошуу доод усан сан", cameras: 5},
    {location: "Толгойт станц", cameras: 5},
    {location: "Тасган станц", cameras: 14},
    {location: "3,4-р хороололын усан сан", cameras: 5},
    {location: "Сэлбэ станц", cameras: 5},
    {location: "Чингэлтэй станц", cameras: 5},
    {location: "Чингэлтэй усан сан", cameras: 5},
    {location: "Хайлааст станц", cameras: 5},
    {location: "Хайлааст усан сан", cameras: 5},
    {location: "Шархад станц", cameras: 4},
    {location: "Шархад усан сан", cameras: 7},
    {location: "Завсрын усан сан", cameras: 12},
    {location: "Зуун хойд бүсийн усан сан", cameras: 9},
    {location: "Баянгол цэвэр усны насос станц", cameras: 8},
    {location: "Баянгол цэвэр усны 1-р өргөгч худаг", cameras: 5},
    {location: "Баянгол бохир усны насос станц", cameras: 5},
    {location: "Тооллуурын лаборатор ХэУА", cameras: 6},
    {location: "Ус төв лаборатор", cameras: 9},
    {location: "ХэУА баруун ХҮТ", cameras: 3},
    {location: "ХэУА Үйлдвэр ХҮТ", cameras: 3},
    {location: "ХэУА Төвийн ХҮТ", cameras: 3},
    {location: "ХэУА Зүүн ХҮТ", cameras: 3},
    {location: "ШУХА, ЗУХА, АВТО бааз, Спорт цогцолбор", cameras: 34},
    {location: "Төв цэвэрлэх байгууламж", cameras: 62},
    {location: "Авто бааз баруун граш", cameras: 8},
    {location: "Шугамын ашиглалт засварын алба", cameras: 10},
    {location: "Дамба цэвэрлэх байгууламж", cameras: 5},
    {location: "Нисэхийн шинэ цэвэрлэх", cameras: 15},
    {location: "Био цэвэрлэх байгууламж", cameras: 8},

    // --- Additional camera locations from the provided 2026-03-30 sheet ---
    {location: "2.А станц", cameras: 6},
    {location: "3.Б станц/үйлдвэрийн станц/ Сургалтын төвийн хажууд байдаг", cameras: 4},
    {location: "4.В станц/махан станц/", cameras: 3},
    {location: "Засварын усан сан", cameras: 2},
    {location: "Сэлбэ станц (2 дахь)", cameras: 1},
    {location: "Гачуурт станц", cameras: 5},
    {location: "УСУГ төв", cameras: 59},
    {location: "Сургалтын төв", cameras: 25},
    {location: "ШАЗА", cameras: 4},
    {location: "Баянголын ус суваг ашиглалтын товчоо", cameras: 6},
    {location: "Урьдчилан цэвэрлэх байгууламж", cameras: 25},
    {location: "ЗУХА", cameras: 6},
    {location: "Спорт", cameras: 4},
    {location: "Авто бааз харуул", cameras: 8},
    {location: "Хуучин байрны харуул", cameras: 16},
    {location: "Баянхошуу дэд төв (1)", cameras: 5},
    {location: "Баянхошуу дэд төв (2)", cameras: 8},
    {location: "Дамбын усан сан", cameras: 8},
    {location: "Дамбын насос станц", cameras: 5},
    {location: "Багахангай", cameras: 8},
    {location: "Тооллуурын лаб 2", cameras: 2},
    {location: "Усны лаб", cameras: 8},
    {location: "Сувилал", cameras: 16},
    {location: "Толгойт (1)", cameras: 5},
    {location: "Баруун ддрэг насос", cameras: 3},
    {location: "ТВ", cameras: 5},
    {location: "Толгойт (2)", cameras: 5},
    {location: "21 усан сан", cameras: 4},
    {location: "Тасган (2 дахь)", cameras: 4},
    {location: "Бохир цэг", cameras: 4},
    {location: "Шувуу фабрик усан сан", cameras: 5},
    {location: "Шар хад усан сан (2 дахь)", cameras: 4},
    {location: "Орбит насос станц", cameras: 4},
    {location: "10 машин граш БУШ", cameras: 2},
    {location: "Хорооллын усан сан", cameras: 2},

    // Group total shown in the sheet (no per-site breakdown provided).
    {location: "УТҮТ (391 худаг)", cameras: 751},

    // Sheet note: additional cameras without per-location breakdown.
    {location: "Бусад (задаргаа байхгүй)", cameras: 98},
];

/** Glass card wrapper */
function GlassCard({
                       children,
                       className = "",
                       style = {},
                       hover = true,
                       ...rest
                   }: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    hover?: boolean;
} & HTMLMotionProps<"div">) {
    return (
        <motion.div
            {...rest}
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

function VisualSlider({
                         slides,
                         accentColor,
                         scale = 1.08,
                       }: {
    slides: VisualSlide[];
    accentColor: string;
    scale?: number;
}) {
    const [idx, setIdx] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        setIdx(0);
    }, [slides]);

    useEffect(() => {
        if (paused) return;
        if (!slides || slides.length < 2) return;
        const id = window.setInterval(() => {
            setIdx((v) => (v + 1) % slides.length);
        }, 6500);
        return () => window.clearInterval(id);
    }, [paused, slides]);

    const canNavigate = slides && slides.length > 1;
    const current = slides && slides.length ? slides[Math.min(idx, slides.length - 1)] : null;

    const goPrev = () => {
        if (!canNavigate) return;
        setIdx((v) => (v - 1 + slides.length) % slides.length);
    };

    const goNext = () => {
        if (!canNavigate) return;
        setIdx((v) => (v + 1) % slides.length);
    };

    return (
        <div
            className="relative w-full h-full overflow-hidden rounded-[28px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label="Visual slides"
        >
            <AnimatePresence mode="wait">
                {current ? (
                    <motion.img
                        key={current.src}
                        src={current.src}
                        alt={current.alt}
                        className="absolute inset-0 z-0 h-full w-full object-cover"
                        initial={{opacity: 0, scale: 0.985}}
                        animate={{opacity: 1, scale}}
                        exit={{opacity: 0, scale: scale + 0.03}}
                        transition={{duration: 0.45, ease: [0.4, 0, 0.2, 1]}}
                        draggable={false}
                    />
                ) : null}
            </AnimatePresence>

            {/* Navigation */}
            {canNavigate ? (
                <>
                    <button
                        type="button"
                        onClick={goPrev}
                        className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 sm:left-5 sm:h-10 sm:w-10"
                        style={{
                            background: "rgba(255,255,255,0.55)",
                            backdropFilter: "blur(14px)",
                            WebkitBackdropFilter: "blur(14px)",
                            boxShadow: "0 10px 26px rgba(0,0,0,0.10)",
                        }}
                        aria-label="Previous slide"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M15 6L9 12L15 18" stroke={accentColor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 sm:right-5 sm:h-10 sm:w-10"
                        style={{
                            background: "rgba(255,255,255,0.55)",
                            backdropFilter: "blur(14px)",
                            WebkitBackdropFilter: "blur(14px)",
                            boxShadow: "0 10px 26px rgba(0,0,0,0.10)",
                        }}
                        aria-label="Next slide"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M9 6L15 12L9 18" stroke={accentColor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-5">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setIdx(i)}
                                className="w-2.5 h-2.5 rounded-full border border-white/80"
                                style={{
                                    background: i === idx ? accentColor : "rgba(255,255,255,0.55)",
                                    boxShadow: i === idx ? `0 0 0 4px ${accentColor}22` : "none",
                                }}
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={i === idx ? "true" : undefined}
                            />
                        ))}
                    </div>
                </>
            ) : null}
        </div>
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

function VisualPanel({item, title}: { item: OfficeItem; title: string }) {
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
        setImageFailed(false);
    }, [item.img, title]);

    if (item.slides?.length) {
        return <VisualSlider slides={item.slides} accentColor={item.color} scale={item.visualScale ?? 1.08}/>;
    }

    if (item.fullVisualImage && !imageFailed && item.img) {
        return (
            <div className="relative h-full w-full overflow-hidden rounded-[28px]">
                <img
                    src={item.img}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{transform: `scale(${item.visualScale ?? 1.08})`}}
                    onError={() => setImageFailed(true)}
                />
            </div>
        );
    }

    return (
        <div className="relative h-full w-full overflow-hidden rounded-[28px]">
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(circle at 50% 35%, ${item.color}16 0%, rgba(255,255,255,0.78) 42%, rgba(255,255,255,0.34) 100%)`,
                }}
            />
            <div
                className="absolute -left-10 bottom-0 h-44 w-44 rounded-full blur-3xl"
                style={{background: item.color + "10"}}
            />
            <div
                className="absolute -right-10 top-0 h-44 w-44 rounded-full blur-3xl"
                style={{background: item.color + "16"}}
            />

            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-4 py-5 text-center sm:gap-6 sm:px-8 sm:py-8">
                <div
                    className="flex h-24 w-24 items-center justify-center rounded-full border border-white/80 shadow-[0_18px_48px_rgba(15,23,42,0.12)] sm:h-36 sm:w-36"
                    style={{background: item.bgAlpha}}
                >
                    {!imageFailed && item.img ? (
                        <img
                            src={item.img}
                            alt={title}
                            className="h-14 w-14 object-contain sm:h-20 sm:w-20"
                            onError={() => setImageFailed(true)}
                        />
                    ) : (
                        <span className="text-5xl leading-none sm:text-6xl">{item.icon}</span>
                    )}
                </div>

                {!item.hideVisualText ? (
                    <div>
                        <h3 className="text-[22px] font-black tracking-tight sm:text-[28px]" style={{color: "#0f172a"}}>
                            {title}
                        </h3>
                        <p
                            className="mt-2 text-[12px] font-semibold uppercase tracking-[0.18em]"
                            style={{color: item.color}}
                        >
                            {item.unit}
                        </p>
                    </div>
                ) : null}
            </div>
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
            className="group flex min-w-[110px] flex-1 cursor-pointer items-center gap-2 rounded-2xl border border-black/[0.04] p-2.5 sm:gap-3 sm:p-3"
            style={{background: "rgba(248,250,252,0.8)"}}
        >
            <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-base transition-colors duration-200 sm:h-9 sm:w-9"
                style={{background: color + "18"}}
            >
                {icon}
            </div>
            <div>
                <p
                    className="text-[8px] font-bold uppercase tracking-[.12em] transition-colors duration-200 sm:tracking-[.15em]"
                    style={{color: "#94a3b8"}}
                >
                    {label}
                </p>
                <p
                    className="text-[19px] font-black leading-none transition-colors duration-200 sm:text-[22px]"
                    style={{color: "#0f172a"}}
                >
                    {value}
                </p>
            </div>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Demo() {
    const [deviceLayerOpen, setDeviceLayerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Хяналтын камер");
    const d = OFFICE_DATA[activeTab];
    const tabs = Object.keys(OFFICE_DATA);
    const totalCameras = useMemo(
        () => CAMERA_COUNTS_BY_LOCATION.reduce((sum, x) => sum + x.cameras, 0),
        [],
    );
    const parsedStatValue = useMemo(() => {
        const value = Number.parseInt(d.stats.replace(/[^\d]/g, ""), 10);
        return Number.isNaN(value) ? 0 : value;
    }, [d.stats]);
    const staffTotal = d.engineer + d.repairman + (d.tex ?? 0);
    const displayTotal = activeTab === "Хяналтын камер" ? totalCameras : parsedStatValue;
    const canOpenDeviceLayer = activeTab === "Хяналтын камер";

    useEffect(() => {
        setDeviceLayerOpen(false);
    }, [activeTab]);

    return (
        <div className="mx-auto w-full max-w-7xl p-3 font-sans antialiased sm:p-4 md:p-6">
            <div
                className="relative max-h-[calc(100svh-8.5rem)] overflow-y-auto overflow-x-hidden rounded-[26px] p-4 no-scrollbar sm:rounded-[42px] sm:p-6 md:max-h-none md:rounded-[60px] md:p-8"
                style={{background: "rgba(0,0,0,0.1)", fontFamily: "'Inter',sans-serif"}}
            >
                <div className="absolute right-0 top-0 h-40 w-40 bg-purple-400/30 blur-[90px] sm:h-[280px] sm:w-[280px] md:h-[400px] md:w-[400px] md:blur-[120px]"/>
                <div className="absolute bottom-0 left-0 h-32 w-32 bg-blue-400/30 blur-[80px] sm:h-[220px] sm:w-[220px] md:h-[300px] md:w-[300px] md:blur-[120px]"/>
                {/* ── Header ── */}
                <div className="relative z-10 mb-6 flex flex-col gap-4 md:mb-7 md:flex-row md:items-start md:justify-between">
                    <div>
                        <p
                            className="text-[10px] font-semibold tracking-[.22em] uppercase mb-1.5"
                            style={{color: "#94a3b8"}}
                        >
                            Оффис хэсэг
                        </p>
                        <h1
                            className="text-[24px] font-black tracking-tight leading-none sm:text-[30px] md:text-[34px]"
                            style={{color: "#0f172a"}}
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
                        className="no-scrollbar flex w-full gap-1 overflow-x-auto rounded-2xl border border-white/90 p-1.5 md:w-auto md:rounded-full"
                        style={{
                            background: "rgba(255,255,255,0.6)",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        }}
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-[10px] font-bold tracking-wide transition-all duration-250 sm:px-4 md:px-5 md:text-[11px] ${
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

                <div className="grid gap-3 md:hidden">
                    <GlassCard className="overflow-hidden p-0" hover={false}>
                        <div className="aspect-[20/9] w-full">
                            <VisualPanel item={d} title={activeTab}/>
                        </div>
                    </GlassCard>

                    <div className="grid grid-cols-2 gap-3">
                        <GlassCard className="p-4" hover={false}>
                            <p className="text-[9px] font-bold uppercase tracking-[.2em]" style={{color: "#94a3b8"}}>
                                Нийт төхөөрөмж
                            </p>
                            <p className="mt-3 text-[32px] font-black leading-none" style={{color: "#0f172a"}}>
                                {displayTotal}
                            </p>
                            <p className="mt-2 text-[11px]" style={{color: "#64748b"}}>
                                Бүртгэлтэй {d.unit}
                            </p>
                        </GlassCard>

                        <GlassCard className="p-4" hover={false}>
                            <p className="text-[9px] font-bold uppercase tracking-[.2em]" style={{color: "#94a3b8"}}>
                                Ажиллах хүч
                            </p>
                            <p className="mt-3 text-[32px] font-black leading-none" style={{color: "#0f172a"}}>
                                {staffTotal}
                            </p>
                            <p className="mt-2 text-[11px]" style={{color: "#64748b"}}>
                                {d.engineer} инженер{d.repairman ? ` · ${d.repairman} засварчин` : ""}
                            </p>
                        </GlassCard>

                        <GlassCard
                            className={`col-span-2 p-4 ${canOpenDeviceLayer ? "cursor-pointer" : ""}`}
                            hover={canOpenDeviceLayer}
                            role={canOpenDeviceLayer ? "button" : undefined}
                            tabIndex={canOpenDeviceLayer ? 0 : undefined}
                            aria-label={canOpenDeviceLayer ? "Нийт төхөөрөмжийг байршлаар харах" : undefined}
                            onClick={canOpenDeviceLayer ? () => setDeviceLayerOpen(true) : undefined}
                            onKeyDown={(e) => {
                                if (!canOpenDeviceLayer) return;
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setDeviceLayerOpen(true);
                                }
                            }}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-[.2em]" style={{color: "#94a3b8"}}>
                                        Байршлын задаргаа
                                    </p>
                                    <p className="mt-2 text-sm font-semibold" style={{color: "#0f172a"}}>
                                        {canOpenDeviceLayer
                                            ? "Камерын тоог цэг салбараар харах"
                                            : "Энэ төрлийн байршлын задаргаа идэвхгүй"}
                                    </p>
                                </div>
                                <div
                                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-lg font-bold"
                                    style={{background: `${d.color}18`, color: d.color}}
                                >
                                    {canOpenDeviceLayer ? "+" : "•"}
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    <GlassCard className="flex flex-col p-4" style={{borderTop: `3px solid ${d.color}`}}>
                        <div className="flex items-start justify-between gap-3">
                            <span
                                className="rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[.22em]"
                                style={{background: `${d.color}12`, color: d.color}}
                            >
                                {d.id}
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-[.14em]" style={{color: "#94a3b8"}}>
                                {d.unit}
                            </span>
                        </div>

                        <p className="mt-4 text-lg font-black leading-tight" style={{color: "#0f172a"}}>
                            {activeTab}
                        </p>

                        <div className="mt-4 max-h-32 overflow-y-auto pr-2 text-[12px] leading-6 no-scrollbar" style={{color: "#64748b"}}>
                            {d.desc}
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <StaffCard icon="👤" label="Инженер" value={d.engineer} color={d.color}/>
                            {d.tex ? (
                                <StaffCard icon="🛠️" label="Техникч" value={d.tex} color={d.color}/>
                            ) : d.repairman ? (
                                <StaffCard icon="🛠️" label="Засварчин" value={d.repairman} color={d.color}/>
                            ) : null}
                            {d.tex && d.repairman ? (
                                <div className="col-span-2">
                                    <StaffCard icon="🛠️" label="Засварчин" value={d.repairman} color={d.color}/>
                                </div>
                            ) : null}
                        </div>

                        <div className="mt-4">
                            <p className="mb-2 text-[9px] font-bold uppercase tracking-[.18em]" style={{color: "#94a3b8"}}>
                                Ачааллын график
                            </p>
                            <BarChart data={d.chart} color={d.color}/>
                        </div>
                    </GlassCard>
                </div>

                <div className="hidden md:block">
                    {/* ── Bento Grid ── */}
                    <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        className="relative z-10 grid grid-cols-2 gap-4 xl:grid-cols-3 xl:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]"
                        
                        initial={{opacity: 0, y: 12}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -12}}
                        transition={{duration: 0.45, ease: [0.4, 0, 0.2, 1]}}
                    >

                        {/* ── Main info card (tall, col 1, row 1-2) ── */}
                        <GlassCard
                            className="flex flex-col p-4 sm:p-6 md:p-7 xl:row-span-2"
                            style={{
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
                   className="text-[42px] font-black leading-none sm:text-[56px] lg:text-[64px]"
                   style={{
                       color: "#0f172a",
                       letterSpacing: "-0.03em",
                   }}
               >
                {displayTotal}
              </span>
                            </div>
                            <span
                                className="text-[11px] font-semibold tracking-[.12em] mb-4"
                                style={{color: "#94a3b8"}}
                            >
              {d.unit}
            </span>

                            <p className="mb-5 text-[12px] leading-relaxed sm:text-[13px]" style={{color: "#64748b"}}>
                                {d.desc}
                            </p>

                            <div className="h-px mb-5" style={{background: "rgba(0,0,0,0.05)"}}/>
                            <div className="text-left">
                                <p className="text-[8px] font-bold tracking-[.2em] uppercase"
                                   style={{color: "#94a3b8", fontSize: 11}}>
                                    Хариуцан ажилдаг ажилчид
                                </p>

                            </div>
                            <div className="mb-auto flex flex-wrap gap-2.5">
                                <StaffCard icon="👤" label="Инженер" value={d.engineer} color={d.color}/>
                                {d.tex ? <StaffCard icon="🛠️" label="Техникч" value={d.tex!} color={d.color}/> : ""}
                                {d.repairman ?
                                    <StaffCard icon="🛠️" label="Засварчин" value={d.repairman!} color={d.color}/> : ""}
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
                            className="relative p-0 xl:col-span-2"
                            style={{
                                minHeight: 220,
                                background: "rgba(255,255,255,0.35)",
                            }}
                            hover={false}
                        >
                            <VisualPanel item={d} title={activeTab}/>

                            {/* Status badge */}

                        </GlassCard>

                        {/* ── Stat card 1 (col 2, row 2) ── */}
                        <GlassCard
                            className="flex cursor-pointer flex-col justify-between p-4 sm:p-6"
                            
                            role={canOpenDeviceLayer ? "button" : undefined}
                            tabIndex={canOpenDeviceLayer ? 0 : undefined}
                            aria-label={canOpenDeviceLayer ? "Нийт төхөөрөмж (байршлаар харах)" : undefined}
                            onClick={canOpenDeviceLayer ? () => setDeviceLayerOpen(true) : undefined}
                            onKeyDown={(e) => {
                                if (!canOpenDeviceLayer) return;
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setDeviceLayerOpen(true);
                                }
                            }}
                        >
                            <div>
                                <p className="text-[9px] font-bold tracking-[.2em] uppercase mb-2"
                                   style={{color: "#cbd5e1"}}>
                                    Нийт төхөөрөмж
                                </p>
                                <p
                                    className="text-[34px] font-black leading-none sm:text-[44px]"
                                    style={{
                                        color: "#0f172a",
                                        letterSpacing: "-0.02em"
                                    }}
                                >
                                    {displayTotal}
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
                        <GlassCard className="flex flex-col justify-between p-4 sm:p-6">
                            <div>
                                <p className="text-[9px] font-bold tracking-[.2em] uppercase mb-2"
                                   style={{color: "#cbd5e1"}}>
                                    Ажиллах хүч
                                </p>
                                <p
                                    className="text-[34px] font-black leading-none sm:text-[44px]"
                                    style={{
                                        color: "#0f172a",
                                        letterSpacing: "-0.02em"
                                    }}
                                >
                                    {staffTotal}
                                </p>
                                <p className="text-[11px] mt-1" style={{color: "#94a3b8"}}>
                                    {d.engineer} инженер{d.repairman ? ` · ${d.repairman} засварчин` : ""}
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
                                        animate={{width: `${Math.min(100, staffTotal * 14)}%`}}
                                        transition={{duration: 0.9, ease: [0.4, 0, 0.2, 1]}}
                                    />
                                </div>
                            </div>
                        </GlassCard>

                    </motion.div>
                </AnimatePresence>
                </div>
            </div>

            <DeviceCountsLayer
                open={deviceLayerOpen && canOpenDeviceLayer}
                onClose={() => setDeviceLayerOpen(false)}
                accentColor={d.color}
                totalLabel={String(displayTotal)}
                locations={CAMERA_COUNTS_BY_LOCATION}
            />
        </div>

    );
}
