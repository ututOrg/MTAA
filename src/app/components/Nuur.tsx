import {motion, useScroll, useTransform, AnimatePresence} from "framer-motion";
import {useOutletContext} from "react-router";
import React, {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {Card} from "./ui/card";
import {Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

interface OutletCtx {
    isDark: boolean
}

/* ── PARTICLE ── */
function Particle({isDark, index}: { isDark: boolean; index: number }) {
    const rx = Math.random() * 100, rd = Math.random() * 5, rdu = 8 + Math.random() * 12, sz = 2 + Math.random() * 4;
    return (
        <motion.div className="absolute rounded-full pointer-events-none"
                    style={{
                        left: `${rx}%`,
                        bottom: "-10px",
                        width: sz,
                        height: sz,
                        background: index % 3 === 0 ? "#4CAF50" : index % 3 === 1 ? "#6094ea" : isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.15)"
                    }}
                    initial={{y: 0, opacity: 0}}
                    animate={{y: [-20, -600], opacity: [0, 0.8, 0], x: [0, (Math.random() - 0.5) * 120]}}
                    transition={{duration: rdu, delay: rd, repeat: Infinity, ease: "easeOut"}}/>
    );
}

function AnimatedNumber({target, suffix = ""}: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let s = 0;
        const step = target / 60;
        const t = setInterval(() => {
            s += step;
            if (s >= target) {
                setCount(target);
                clearInterval(t);
            } else setCount(Math.floor(s));
        }, 30);
        return () => clearInterval(t);
    }, [target]);
    return <>{count}{suffix}</>;
}

function SharedBG({isDark}: { isDark: boolean }) {
    return (
        <>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div animate={{scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4]}}
                            transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
                            className={`absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-[120px] ${isDark ? "bg-[#4CAF50]/10" : "bg-[#4CAF50]/8"}`}/>
                <motion.div animate={{scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3]}}
                            transition={{duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2}}
                            className={`absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] ${isDark ? "bg-[#6094ea]/12" : "bg-[#6094ea]/8"}`}/>
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `radial-gradient(${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} 1px, transparent 1px)`,
                backgroundSize: "36px 36px"
            }}/>
            <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
                 style={{backgroundImage: `repeating-linear-gradient(-45deg, ${isDark ? "#fff" : "#000"}, ${isDark ? "#fff" : "#000"} 1px, transparent 1px, transparent 40px)`}}/>
        </>
    );
}


/* ── DATA ── */
const STATS = [
    {value: 20, suffix: "", label: "Жилийн туршлага"},
    {value: 200, suffix: "+", label: "Цэг салбарын автоматжуулалт"},
    {value: 98, suffix: "%", label: "Амжилтын түвшин"},
];

const WORDS = [
    {text: "МЭДЭЭЛЛИЙН", gradient: false},
    {text: "ТЕХНОЛОГИ,", gradient: false},
    {text: "АВТОМАТЖУУЛАЛТЫН", gradient: true, from: "#4CAF50", to: "#7ed56f"},
    {text: "АЛБА", gradient: true, from: "#6094ea", to: "#38bdf8"},
];

type TrackType = "auto" | "it" | "both";
const TRACK_COLORS: Record<TrackType, { bg: string; label: string }> = {
    auto: {bg: "#4CAF50", label: "Автоматжуулалт"},
    it: {bg: "#6094ea", label: "Мэдээллийн технологи"},
    both: {bg: "#e07a50", label: "МТ + Автоматжуулалт"},
};

const TIMELINE: { year: string; title: string; desc: string; track: TrackType }[] = [
    {
        year: "1987",
        title: "МТ-ийн анхны алхам",
        desc: "Ажиллагсдын цалинг тооцоолон бодох төвөөр бодуулж эхэлснээр байгууллагад мэдээллийн технологийн суурь тавигдсан.",
        track: "it"
    },
    {
        year: "1990",
        title: "Анхны компьютерууд",
        desc: "НААҮЯамнаас 2 компьютер хуваарилагдаж ирснээр байгууллагад анх мэдээллийн технологийн эхлэл тавигдсан.",
        track: "it"
    },
    {
        year: "1992",
        title: "Анхны програм хангамж",
        desc: "Бараа материал, цалин, ус бохирдуулалтын програмуудыг DOS-н орчинд хийснээр бүртгэлийн ажилд шинэ техник нэвтэрч, анхны мэргэжлийн програм зохиогчтой болсон.",
        track: "it"
    },
    {
        year: "1995",
        title: "Анхны сүлжээний орчин",
        desc: "НББОУС-ын програмыг байгууллагын онцлогт тохируулан DOS-н орчинд хийлгэн анхны сүлжээний орчинг бий болгосон.",
        track: "it"
    },
    {
        year: "1997",
        title: "Удирдлага хяналтын шинэ эрин",
        desc: "Японы буцалтгүй тусламжаар релейний систем дээр контролёр нэвтэрч, 74 худгийн алсын удирдлагын пульт суурилуулагдсан.",
        track: "auto"
    },
    {
        year: "1999–2000",
        title: "Удирдлагын мэдээллийн систем",
        desc: "Дэлхийн банкны зээлээр 36 компьютерийг дотоод сүлжээнд холбон НББ, Усны тооцоо, Зөөврийн усны програмуудыг Windows-д шинэчилсэн.",
        track: "it"
    },
    {
        year: "2002",
        title: "Allen Bradley — Анхны PLC",
        desc: "PER AARSLEFF төслөөр Allen Bradley PLC бүхий алсын удирдлага, радио холбоо болон програмчлагддаг контролёр удирдлага хяналтын системд анх удаа нэвтэрсэн.",
        track: "auto"
    },
    {
        year: "2004",
        title: "Телеметрийн систем (31 цэг)",
        desc: "Дэлхийн банкны УБААС-1 төслийн хүрээнд усан хангамжийн системийн 31 цэгийг хамарсан радио холбоо бүхий телеметрийн системийн суурь тавигдсан.",
        track: "auto"
    },
    {
        year: "2005",
        title: "Анхны бүрэн SCADA систем",
        desc: "SIEMENS/СИНЕТИК хамтран Тасганы насос станцыг хүний оролцоогүй диспетчерийн удирдлагаар ажилладаг анхны бүрэн SCADA систем болгосон — одоо ч жишиг цэг.",
        track: "auto"
    },
    {
        year: "2006",
        title: "МТАХ байгуулагдсан",
        desc: "Б.Пүрэвжав даргын санаачилгаар Д.Одсүрэн ахлагчтай 5 хүний бүрэлдэхүүнтэй Мэдээллийн Технологи Автоматжуулалтын Хэсэг байгуулагдсан.",
        track: "both"
    },
    {
        year: "2007",
        title: "Зөөврийн усны машины хяналт",
        desc: "60 гаруй усны автомашины хяналтын систем анх нэвтэрч, хоёрч удаа шинэчлэгдэн одоогоор үргэлжилж хэрэгджэж байна.",
        track: "auto"
    },
    {
        year: "2008",
        title: "Цаг бүртгэлийн систем",
        desc: "20 цэг дээрээс 1000 гаруй ажилтнуудын ирцийг бүртгэх цаг бүртгэлийн систем хэрэгжиж эхэлсэн.",
        track: "it"
    },
    {
        year: "2008–2009",
        title: "Монголдоо анхны өөрсдийн гараар автоматжуулалт",
        desc: "Баянголын Ус Суваг Ашиглалтын Товчоог жишиг болгон 1, 2-р өргөгчийг өөрсдийн инженерүүдийн хүчээр бүрэн автоматжуулсан — Монголдоо анхны тохиолдол.",
        track: "auto"
    },
    {
        year: "2009",
        title: "Серверийн өрөө",
        desc: "Байгууллагын хэмжээнд зориулалтын Серверийн өрөөг бий болгон тохижуулсан — дотоод сүлжээг эмхлэн байгуулах анхны алхам.",
        track: "it"
    },
    {
        year: "2011",
        title: "Schneider бренд + Domain сүлжээ",
        desc: "Баруун дүүргийн болон Хайлаастын насос станцуудыг Schneider брендийн тоноглолоор автоматжуулж, байгууллагын сүлжээг domain хэлбэрт шилжүүлсэн.",
        track: "both"
    },
    {
        year: "2013",
        title: "МТАХ → МТАН болон өргөтгөгдсөн",
        desc: "Мэдээллийн Технологи Автоматжуулалтын Хэсэг нь Нэгж болон өргөтгөгдөж байгууллагын хэмжээнд МТ, автоматжуулалтын бодлого барин хөгжүүлэлт хариуцан ажиллах болсон.",
        track: "both"
    },
    {
        year: "2014",
        title: "Яармаг, Гачуурт + Ухаалаг ус түгээх",
        desc: "Солонгосын тусламжаар Яармагын бүрэн автомат эх үүсвэр, 6 дэлгэц бүхий анхны ханан дэлгэц нэвтэрсэн. 130+ ухаалаг ус түгээх худаг хэрэгжиж эхэлсэн.",
        track: "auto"
    },
    {
        year: "2015",
        title: "Зүүн хойд бүсийн усан сангийн автоматжуулалт",
        desc: "Зүүн хойд бүсийн усан сан болон хаалтнуудын үйл ажиллагааг бүрэн автоматжуулж Үйлдвэрлэлийг удирдах төвтэй нэгтгэсэн.",
        track: "auto"
    },
    {
        year: "2017–2019",
        title: "АХБ: Үйлдвэрлэлийг Удирдах Төв хөгжүүлэлт",
        desc: "Азийн Хөгжлийн Банкны тусламжаар 30 гаруй хяналт удирдлага бүхий худаг, 3×5м ханан дэлгэц суурилуулсан. 81 цэг салбарыг GPRS-ээр холбосон.",
        track: "both"
    },
    {
        year: "2018–2019",
        title: "Камерийн нэгдсэн систем + Шинэ барилга",
        desc: "650 орчим камер бүхий нэгдсэн хяналтын систем УДТ-д нэгтгэгдэж, бие даасан шилэн кабелийн сүлжээтэй болсон. УДТ бүхий оффисын шинэ барилга ашиглалтанд орсон.",
        track: "both"
    },
];


const incidentsData = [
    {age: "", "Ажилтаны тоо": 0},
    {age: "2006 он", "Ажилтаны тоо": 19},
    {age: "2011 он", "Ажилтаны тоо": 22},
    {age: "2013 он", "Ажилтаны тоо": 3},
    {age: "2014 он", "Ажилтаны тоо": 3},
    {age: "2015 он", "Ажилтаны тоо": 3},
    {age: "2017 он", "Ажилтаны тоо": 53},
    {age: "2025 он", "Ажилтаны тоо": 53},
];
const productionData = [
    {name: "18-25", value: 7, color: "#60a5fa"},
    {name: "26-35", value: 19, color: "#34d399"},
    {name: "36-45", value: 22, color: "#fbbf24"},
    {name: "46+", value: 3, color: "#f87171"},
];
const warehouseData = [
    {name: "Удирдлага", value: 1, color: "#a3e635"},
    {name: "Инженер", value: 26, color: "#3b82f6"},
    {name: "Албан хаагч", value: 3, color: "#fb923c"},
    {name: "Техникч", value: 15, color: "#a855f7"},
    {name: "Засварчин", value: 11, color: "#ff0000"},
];
const Gender = [
    {name: "Эрэгтэй", value: 44, color: "#a3e635"},
    {name: "Эмэгтэй", value: 7, color: "#3b82f6"},
];

/* ══════════════════════════════════════
   ORG CHART — INTERFACES & DATA
══════════════════════════════════════ */
interface OrgTask {
    icon: string;
    label: string
}

interface OrgRole {
    title: string;
    count: number
}

interface OrgNode {
    id: string;
    icon: string;
    name: string;
    shortName: string;
    color: string;
    bg: string;
    border: string;
    textColor: string;
    pillar: "it" | "ot";
    roles: OrgRole[];
    tasks: OrgTask[];
}

const ORG_NODES: OrgNode[] = [
    {
        id: "sys", icon: "◈", pillar: "it",
        name: "Системийн удирдлага болон програм хангамж, хөгжүүлэлтийн хэсэг",
        shortName: "Системийн удирдлага + Програм хангамж",
        color: "#378ADD", bg: "#E6F1FB", border: "#85B7EB", textColor: "#0C447C",
        roles: [
            {title: "Систем администратор", count: 1}, {title: "Дата инженер", count: 1},
            {title: "ГМС-ийн инженер", count: 1}, {title: "Нөөцлөлт / Backup техникч", count: 1},
            {title: "Дотоод програм хөгжүүлэгч", count: 1}, {title: "Веб болон мобайл хөгжүүлэгч", count: 1},
            {title: "Өгөгдлийн сангийн инженер", count: 1}, {title: "Программист", count: 1},
        ],
        tasks: [
            {icon: "🖥", label: "Серверийн дэд бүтэц удирдах"}, {icon: "🗺", label: "GIS газрын зургийн систем"},
            {icon: "💾", label: "Мэдээллийн нөөцлөлт, сэргээлт"}, {icon: "⚙", label: "Дотоод програм хангамж хөгжүүлэх"},
            {icon: "📱", label: "Веб болон мобайл апп хөгжүүлэх"}, {icon: "🗃", label: "Өгөгдлийн сангийн удирдлага"},
        ],
    },
    {
        id: "net", icon: "⬡", pillar: "it",
        name: "Сүлжээ, аюулгүй байдлын хэсэг",
        shortName: "Сүлжээ, аюулгүй байдал",
        color: "#7F77DD", bg: "#EEEDFE", border: "#AFA9EC", textColor: "#3C3489",
        roles: [
            {title: "Сүлжээний инженер", count: 1}, {title: "Кибер аюулгүй байдлын инженер", count: 1},
            {title: "Шилэн кабелийн инженер", count: 1}, {title: "Компьютерийн инженер", count: 1},
            {title: "Хяналтын камерын системийн инженер", count: 1}, {title: "Холбооны инженер", count: 1},
            {title: "Тоног төхөөрөмжийн засварчин", count: 4},
        ],
        tasks: [
            {icon: "🌐", label: "Байгууллагын сүлжээ удирдах"}, {icon: "🔒", label: "Кибер аюулгүй байдлыг хангах"},
            {icon: "🔆", label: "Шилэн кабелийн сүлжээ засвар"}, {icon: "📹", label: "650+ камерын нэгдсэн систем"},
            {icon: "💻", label: "Компьютер, тоног төхөөрөмжийн засвар"}, {
                icon: "📡",
                label: "Холбооны тоног төхөөрөмж хариуцах"
            },
        ],
    },
    {
        id: "ops", icon: "◈", pillar: "ot",
        name: "Үйлдвэрлэлийн удирдлагын хэсэг", shortName: "Үйлдвэрлэлийн удирдлага",
        color: "#3B6D11", bg: "#EAF3DE", border: "#97C459", textColor: "#173404",
        roles: [{title: "Хяналтын системийн инженер", count: 4}, {title: "Хяналтын системийн техникч", count: 1}],
        tasks: [
            {icon: "🏭", label: "SCADA системийн удирдлага"}, {icon: "⚡", label: "81 цэг салбарыг GPRS-ээр хянах"},
            {icon: "📺", label: "3×5м ханан дэлгэц удирдах"}, {icon: "🔧", label: "PLC контроллер тохируулах"},
            {icon: "💧", label: "Насос станцуудын автоматжуулалт"},
        ],
    },
    {
        id: "data", icon: "⬡", pillar: "ot",
        name: "Дата хяналтын хэсэг", shortName: "Дата хяналт",
        color: "#639922", bg: "#EAF3DE", border: "#C0DD97", textColor: "#27500A",
        roles: [
            {title: "Ухаалаг ус түгээх системийн инженер", count: 1}, {
                title: "Ухаалаг ус түгээх системийн техникч",
                count: 4
            },
            {title: "GPS инженер", count: 1}, {title: "GPS техникч", count: 1},
            {title: "Нэг цэгийн инженер", count: 1}, {title: "Нэг цэгийн техникч", count: 1},
            {title: "Телеметр инженер", count: 1}, {title: "Телеметр техникч", count: 1},
        ],
        tasks: [
            {icon: "🚰", label: "331 УТУТ ухаалаг худаг хянах"}, {icon: "📡", label: "73 цэгийн телеметр систем"},
            {icon: "🚗", label: "100 автомашины GPS хяналт"}, {icon: "📍", label: "166 нэг цэгийн хяналтын систем"},
            {icon: "📊", label: "Бодит цагийн дата цуглуулах"},
        ],
    },
    {
        id: "clean", icon: "◎", pillar: "ot",
        name: "Цэвэр усны тоног төхөөрөмжийн засварын хэсэг", shortName: "Цэвэр усны засвар",
        color: "#185FA5", bg: "#E6F1FB", border: "#85B7EB", textColor: "#042C53",
        roles: [
            {title: "Үйлдвэрлэлийн тоног төхөөрөмж, PLC инженер", count: 1},
            {title: "Үйлдвэрлэлийн тоног төхөөрөмжийн техникч", count: 2},
            {title: "Үйлдвэрлэлийн тоног төхөөрөмжийн засварчин", count: 4},
        ],
        tasks: [
            {icon: "⚙", label: "PLC программчлалт, суурилуулалт"}, {icon: "⚡", label: "750KW давтамж хувиргагч засвар"},
            {icon: "💧", label: "Цэвэр усны эх үүсвэрийн засвар"}, {
                icon: "🔩",
                label: "Автомат хаалт, мэдрэгчийн засвар"
            },
            {icon: "🏗", label: "Насос станцуудын тоноглол засвар"},
        ],
    },
    {
        id: "waste", icon: "⬢", pillar: "ot",
        name: "Бохир усны тоног төхөөрөмжийн засварын хэсэг", shortName: "Бохир усны засвар",
        color: "#993C1D", bg: "#FAECE7", border: "#F0997B", textColor: "#4A1B0C",
        roles: [
            {title: "Цэвэрлэх байгууламжийн АХХХ, PLC инженер", count: 1},
            {title: "Ус дахин боловсруулах үйлдвэрлэлийн автоматжуулалтын инженер", count: 1},
            {title: "Цэвэрлэх байгууламжийн АХХХ техникч", count: 2},
            {title: "Цэвэрлэх байгууламжийн АХХХ засварчин", count: 2},
        ],
        tasks: [
            {icon: "🏭", label: "Цэвэрлэх байгууламжийн SCADA"}, {
                icon: "🔬",
                label: "Ус дахин боловсруулах автоматжуулалт"
            },
            {icon: "📊", label: "АХХХ хэрэгслийн хяналт, засвар"}, {icon: "⚙", label: "PLC контроллер суурилуулах"},
            {icon: "💧", label: "Бохир усны шугам мэдрэгч засвар"},
        ],
    },
];
const IT_NODES = ORG_NODES.filter(n => n.pillar === "it");
const OT_NODES = ORG_NODES.filter(n => n.pillar === "ot");
const IT_TOTAL_PEOPLE = IT_NODES.reduce((a, n) => a + n.roles.reduce((b, r) => b + r.count, 0), 0);
const OT_TOTAL_PEOPLE = OT_NODES.reduce((a, n) => a + n.roles.reduce((b, r) => b + r.count, 0), 0);

/* ── SYSTEM LANDSCAPE DATA ── */
const LANDSCAPE = {
    stats: [
        {label: "Нийт сервер", value: "28", sub: "Төвлөрсөн орчин"},
        {label: "Программ", value: "79", sub: "Нэр төрөл"},
        // { label: "Үндсэн урсгал", value: "02", sub: "Экосистемийн багц" },
    ],
    cores: [
        {
            num: "01", title: "Автоматжуулалтын программ хангамж", total: 29, color: "#3B6D11",
            metrics: [{label: "Хөгжүүлэлт", value: 13, max: 29, color: "#378ADD"}, {
                label: "Ашиглалт",
                value: 16,
                max: 29,
                color: "#3B6D11"
            }],
            groups: [
                {label: "SCADA программ хангамж", items: ["Citect Scada", "Simatic WinCC", "iFix", "Kwater"]},
                {label: "PLC программ хангамж", items: ["SoMachine HVAC", "Step7 S7-200", "ICP101"]},
            ],
            brands: ["Oracle", "Schneider", "K Water", "Simatic"],
        },
        {
            num: "02", title: "Үйл ажиллагаатай холбоотой программ хангамж", total: 50, color: "#993C1D",
            metrics: [{label: "Хөгжүүлэлт", value: 11, max: 50, color: "#993C1D"}, {
                label: "Ашиглалт",
                value: 30,
                max: 50,
                color: "#378ADD"
            }, {label: "Лиценз", value: 9, max: 50, color: "#7F77DD"}],
            groups: [
                {label: "Дата бааз", items: ["MySQL", "MSSQL", "Oracle", "PostgreSQL", "MongoDB"]},
                {label: "Хөгжүүлэлтийн стек", items: ["JavaScript", "PHP", "NodeJS", "ReactJS", "SQL Server"]},
            ],
            brands: ["MySQL", "MongoDB", "PHP", "React", "Node.js", "PostgreSQL"],
        },
    ],
    internalSw: {
        label: "Дотоодын компаниудын хөгжүүлэлт хийж байгаа программ хангамжууд",
        items: ["Санхүүгийн программ", "Хяналтын программ", "GIS, Засвар үйлчилгээний программ", "ХХХМС программ", "ЛИМС программ", "УТУТ программ", "GPS хяналтын программ", "Хүний нөөцийн программ"],
    },
    ownSw: {
        label: "Өөрсдийн хөгжүүлсэн программ хангамжууд",
        items: ["Гүйцэтгэлийн үзүүлэлт", "Цахим анкет", "Автомашины тооцоо бодолтын программ", "Автомашин захиалгын программ", "Диспетчерийн мэдээний программ", "Хуулт дүрэм журмын программ", "Цайны газрын программ", "Хангамжийн программ", "Техникийн нөхцлийн программ", "Цаг бүртгэлийн программ", "Нэг цэгийн хяналтын программ"],
    },
};

/* ── MODAL SHELL ── */
function ModalShell({onClose, isDark, width = 860, children}: {
    onClose: () => void;
    isDark: boolean;
    width?: number;
    children: React.ReactNode
}) {
    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", h);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", h);
            document.body.style.overflow = "";
        };
    }, [onClose]);
    return createPortal(
        <AnimatePresence>
            <motion.div key="bd" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                        transition={{duration: 0.2}}
                        onClick={onClose} style={{
                position: "fixed",
                inset: 0,
                zIndex: 200,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(12px)"
            }}/>
            <motion.div key="win" initial={{opacity: 0, scale: 0.88, y: 36}} animate={{opacity: 1, scale: 1, y: 0}}
                        exit={{opacity: 0, scale: 0.93, y: 20}}
                        transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}} onClick={e => e.stopPropagation()}
                        style={{
                            position: "fixed",
                            zIndex: 201,
                            inset: 0,
                            margin: "auto",
                            width: `min(${width}px, 97vw)`,
                            height: "fit-content",
                            maxHeight: "92vh",
                            display: "flex",
                            flexDirection: "column",
                            background: isDark ? "#0d0f1a" : "#f8fafc",
                            borderRadius: "clamp(12px, 3vw, 24px)",
                            overflow: "hidden",
                            border: `1px solid ${isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)"}`,
                            boxShadow: "0 40px 100px rgba(0,0,0,0.45)"
                        }}>
                <div style={{display: "flex", gap: 6, padding: "14px 20px 0", flexShrink: 0}}>
                    <motion.button whileHover={{scale: 1.2}} whileTap={{scale: 0.85}} onClick={onClose}
                                   style={{
                                       width: 13,
                                       height: 13,
                                       borderRadius: "50%",
                                       background: "#FF5F57",
                                       border: "none",
                                       cursor: "pointer"
                                   }}/>
                    <div style={{width: 13, height: 13, borderRadius: "50%", background: "#FFBD2E"}}/>
                    <div style={{width: 13, height: 13, borderRadius: "50%", background: "#28C840"}}/>
                </div>
                {children}
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}

/* ── SYSTEM LANDSCAPE MODAL ── */
function SystemLandscapeModal({onClose, isDark}: { onClose: () => void; isDark: boolean }) {
    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", h);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", h);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    const bg = isDark ? "#0b0d14" : "#f7f9fc";
    const card = isDark ? "rgba(255,255,255,0.04)" : "#ffffff";
    const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
    const tp = isDark ? "#fff" : "#0f172a";
    const tm = isDark ? "rgba(255,255,255,0.4)" : "#64748b";
    const sep = `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`;

    return createPortal(
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div key="ls-bd"
                        initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                        transition={{duration: 0.25}} onClick={onClose}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 200,
                            background: "rgba(0,0,0,0.55)",
                            backdropFilter: "blur(16px)"
                        }}
            />

            {/* Window */}
            <motion.div key="ls-win"
                        initial={{opacity: 0, scale: 0.92, y: 32}}
                        animate={{opacity: 1, scale: 1, y: 0}}
                        exit={{opacity: 0, scale: 0.95, y: 16}}
                        transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
                        onClick={e => e.stopPropagation()}
                        style={{
                            position: "fixed", zIndex: 201, inset: 0, margin: "auto",
                            width: "min(1020px, 96vw)", height: "fit-content", maxHeight: "90vh",
                            display: "flex", flexDirection: "column",
                            background: bg, borderRadius: 20, overflow: "hidden",
                            border: `1px solid ${border}`,
                            boxShadow: isDark
                                ? "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)"
                                : "0 32px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)",
                        }}>

                {/* ── HEADER ── */}
                <div style={{
                    padding: "18px 24px 20px", flexShrink: 0,
                    background: isDark
                        ? "linear-gradient(135deg, rgba(55,138,221,0.12), rgba(127,119,221,0.07), transparent)"
                        : "linear-gradient(135deg, #eff6ff, #f5f3ff, #f0fdf4)",
                    borderBottom: sep,
                }}>
                    {/* Traffic lights */}
                    <div style={{display: "flex", gap: 7, marginBottom: 18}}>
                        {[["#FF5F57", onClose], ["#FFBD2E", null], ["#28C840", null]].map(([color, fn], i) => (
                            <motion.div key={i} whileHover={{scale: 1.15}} onClick={fn as any || undefined}
                                        style={{
                                            width: 12,
                                            height: 12,
                                            borderRadius: "50%",
                                            background: color as string,
                                            cursor: fn ? "pointer" : "default"
                                        }}/>
                        ))}
                    </div>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        gap: 24,
                        flexWrap: "wrap"
                    }}>
                        {/* Title block */}
                        <div style={{flex: 1, minWidth: 200}}>
                            <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: 8}}>
                                <div style={{
                                    width: 4,
                                    height: 16,
                                    borderRadius: 2,
                                    background: "linear-gradient(180deg, #378ADD, #7F77DD)"
                                }}/>
                                <p style={{
                                    fontSize: 10,
                                    fontFamily: "var(--font-mono)",
                                    letterSpacing: "0.14em",
                                    color: "#378ADD",
                                    fontWeight: 700,
                                    margin: 0
                                }}>
                                    SYSTEM LANDSCAPE
                                </p>
                            </div>
                            <h2 style={{
                                fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
                                fontWeight: 900,
                                color: tp,
                                margin: "0 0 8px",
                                lineHeight: 1.2
                            }}>
                                СИСТЕМИЙН УДИРДЛАГА БОЛОН <br/>
                                <span style={{
                                    backgroundImage: "linear-gradient(135deg, #378ADD, #7F77DD)",
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text",
                                    color: "transparent"
                                }}>
                                     ПРОГРАММ ХАНГАМЖ, ХӨГЖҮҮЛЭЛТИЙН ХЭСЭГ
                                </span>
                            </h2>
                            <p style={{fontSize: 12, color: tm, lineHeight: 1.65, margin: 0}}>
                                Байгууллагын хэмжээнд{" "}
                                <strong style={{color: tp, fontWeight: 700}}>28 сервер</strong> дээр{" "}
                                <strong style={{color: tp, fontWeight: 700}}>79</strong> нэр төрлийн программ хангамж.
                            </p>
                        </div>

                        {/* Stats */}
                        <div style={{display: "flex", gap: 6, flexShrink: 0}}>
                            {LANDSCAPE.stats.map((s, i) => (
                                <motion.div key={i}
                                            initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}}
                                            transition={{delay: 0.1 + i * 0.08}}
                                            style={{
                                                padding: "10px 16px",
                                                borderRadius: 14,
                                                textAlign: "center",
                                                minWidth: 72,
                                                background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)",
                                                border: `1px solid ${border}`,
                                                backdropFilter: "blur(8px)",
                                            }}>
                                    <p style={{
                                        fontSize: "1.6rem",
                                        fontWeight: 900,
                                        color: tp,
                                        lineHeight: 1,
                                        margin: "0 0 4px"
                                    }}>{s.value}</p>
                                    <p style={{
                                        fontSize: 9.5,
                                        fontWeight: 600,
                                        color: tm,
                                        margin: "0 0 2px",
                                        letterSpacing: "0.04em"
                                    }}>{s.label}</p>
                                    {/*<p style={{ fontSize: 9, color: tm, opacity: 0.7, margin: 0 }}>{s.sub}</p>*/}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── BODY ── */}
                <div style={{overflowY: "auto", flex: 1, padding: "16px"}}>
                    <div
                        style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12}}>

                        {/* Left: Core panels */}
                        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                            {LANDSCAPE.cores.map((core, ci) => (
                                <motion.div key={ci}
                                            initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
                                            transition={{
                                                delay: 0.15 + ci * 0.1,
                                                duration: 0.45,
                                                ease: [0.16, 1, 0.3, 1]
                                            }}
                                            style={{
                                                background: card,
                                                borderRadius: 16,
                                                border: `1px solid ${border}`,
                                                overflow: "hidden"
                                            }}>

                                    {/* Core header */}
                                    <div style={{
                                        padding: "14px 16px", borderBottom: sep,
                                        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(248,250,252,0.8)",
                                        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                                    }}>
                                        <div>
                                            <p style={{
                                                fontSize: 9,
                                                fontFamily: "var(--font-mono)",
                                                letterSpacing: "0.14em",
                                                color: core.color,
                                                marginBottom: 5,
                                                fontWeight: 700
                                            }}>
                                                CORE {core.num}
                                            </p>
                                            <h3 style={{
                                                fontSize: 13,
                                                fontWeight: 800,
                                                color: tp,
                                                lineHeight: 1.3,
                                                margin: 0
                                            }}>{core.title}</h3>
                                        </div>
                                        <div style={{
                                            flexShrink: 0,
                                            width: 50,
                                            height: 50,
                                            borderRadius: 14,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: `1px solid ${border}`,
                                        }}>
                                            <p style={{
                                                fontSize: 7.5,
                                                fontFamily: "var(--font-mono)",
                                                color: tm,
                                                marginBottom: 1,
                                                letterSpacing: "0.08em"
                                            }}>НИЙТ</p>
                                            <p style={{
                                                fontSize: 19,
                                                fontWeight: 900,
                                                color: tp,
                                                lineHeight: 1
                                            }}>{core.total}</p>
                                        </div>
                                    </div>

                                    <div style={{
                                        padding: "14px 16px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12
                                    }}>
                                        {/* Metrics */}
                                        <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                                            {core.metrics.map((m, mi) => (
                                                <div key={mi}>
                                                    <div style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        marginBottom: 5
                                                    }}>
                                                        <span style={{fontSize: 11.5, color: tm}}>{m.label}</span>
                                                        <span style={{
                                                            fontSize: 13,
                                                            fontWeight: 800,
                                                            color: tp,
                                                            fontVariantNumeric: "tabular-nums"
                                                        }}>{m.value}</span>
                                                    </div>
                                                    <div style={{
                                                        height: 5,
                                                        borderRadius: 5,
                                                        background: isDark ? "rgba(255,255,255,0.06)" : "#e8edf2",
                                                        overflow: "hidden"
                                                    }}>
                                                        <motion.div
                                                            initial={{width: 0}}
                                                            animate={{width: `${(m.value / m.max) * 100}%`}}
                                                            transition={{
                                                                delay: 0.4 + ci * 0.1 + mi * 0.07,
                                                                duration: 0.8,
                                                                ease: [0.16, 1, 0.3, 1]
                                                            }}
                                                            style={{
                                                                height: "100%",
                                                                borderRadius: 5,
                                                                background: m.color
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Software groups */}
                                        {core.groups.map((g, gi) => (
                                            <div key={gi} style={{
                                                background: isDark ? "rgba(255,255,255,0.03)" : "#f1f5f9",
                                                borderRadius: 12, padding: "10px 12px",
                                                border: `1px solid ${border}`,
                                            }}>
                                                <p style={{
                                                    fontSize: 9,
                                                    fontFamily: "var(--font-mono)",
                                                    letterSpacing: "0.1em",
                                                    color: tm,
                                                    marginBottom: 8,
                                                    textTransform: "uppercase" as const
                                                }}>
                                                    {g.label}
                                                </p>
                                                <div style={{display: "flex", flexWrap: "wrap", gap: 5}}>
                                                    {g.items.map((item, ii) => (
                                                        <motion.span key={ii}
                                                                     initial={{scale: 0.85, opacity: 0}}
                                                                     animate={{scale: 1, opacity: 1}}
                                                                     transition={{delay: 0.5 + ci * 0.1 + gi * 0.04 + ii * 0.03}}
                                                                     style={{
                                                                         padding: "4px 10px",
                                                                         borderRadius: 20,
                                                                         fontSize: 11,
                                                                         fontWeight: 500,
                                                                         background: isDark ? "rgba(255,255,255,0.07)" : "#fff",
                                                                         color: tp,
                                                                         border: `1px solid ${border}`,
                                                                     }}>
                                                            {item}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Brand tags */}
                                        <div style={{
                                            borderRadius: 12,
                                            padding: "10px 12px",
                                            background: isDark ? "rgba(255,255,255,0.03)" : "#f1f5f9",
                                        }}>
                                            <p style={{
                                                fontSize: 9,
                                                fontFamily: "var(--font-mono)",
                                                color: tp,
                                                marginBottom: 8,
                                                letterSpacing: "0.1em"
                                            }}>
                                                ХӨГЖҮҮЛЭЛТ ХЭЛ
                                            </p>
                                            <div style={{display: "flex", flexWrap: "wrap", gap: 5}}>
                                                {core.brands.map((b, bi) => (
                                                    <motion.span key={bi}
                                                                 initial={{scale: 0.8, opacity: 0}}
                                                                 animate={{scale: 1, opacity: 1}}
                                                                 transition={{delay: 0.6 + ci * 0.1 + bi * 0.04}}
                                                                 style={{
                                                                     padding: "3px 10px",
                                                                     borderRadius: 20,
                                                                     fontSize: 11,
                                                                     fontWeight: 600,
                                                                     background: "rgba(255,255,255,0.08)",
                                                                     color: tp,
                                                                     border: `1px solid ${border}`,
                                                                 }}>
                                                        {b}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right: Software lists */}
                        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                            {[LANDSCAPE.internalSw, LANDSCAPE.ownSw].map((sw, si) => {
                                const accent = si === 0 ? "#378ADD" : "#4CAF50";
                                const accentBg = si === 0 ? "rgba(55,138,221,0.1)" : "rgba(76,175,80,0.1)";
                                return (
                                    <motion.div key={si}
                                                initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
                                                transition={{
                                                    delay: 0.2 + si * 0.12,
                                                    duration: 0.45,
                                                    ease: [0.16, 1, 0.3, 1]
                                                }}
                                                style={{
                                                    background: card,
                                                    borderRadius: 16,
                                                    border: `1px solid ${border}`,
                                                    overflow: "hidden",
                                                    flex: 1
                                                }}>

                                        {/* List header */}
                                        <div style={{
                                            padding: "12px 16px", borderBottom: sep,
                                            background: isDark ? "rgba(255,255,255,0.02)" : "rgba(248,250,252,0.8)",
                                            display: "flex", alignItems: "center", gap: 10,
                                        }}>
                                            <div style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 10,
                                                background: accentBg,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0
                                            }}>
                                                <span style={{fontSize: 14}}>{si === 0 ? "🏢" : "💡"}</span>
                                            </div>
                                            <p style={{
                                                fontSize: 11.5,
                                                fontWeight: 700,
                                                color: tp,
                                                lineHeight: 1.35,
                                                margin: 0
                                            }}>{sw.label}</p>
                                        </div>

                                        {/* Items */}
                                        <div style={{padding: "8px 12px"}}>
                                            {sw.items.map((item, ii) => (
                                                <motion.div key={ii}
                                                            initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}}
                                                            transition={{
                                                                delay: 0.3 + si * 0.12 + ii * 0.035,
                                                                duration: 0.28
                                                            }}
                                                            style={{
                                                                display: "flex", alignItems: "center", gap: 10,
                                                                padding: "7px 6px",
                                                                borderBottom: ii < sw.items.length - 1 ? `0.5px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}` : "none",
                                                            }}>
                                                    <span style={{
                                                        flexShrink: 0, width: 20, height: 20, borderRadius: 6,
                                                        background: accentBg,
                                                        color: accent, fontSize: 9.5, fontWeight: 900,
                                                        fontFamily: "var(--font-mono)",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                    }}>
                                                        {ii + 1}
                                                    </span>
                                                    <span style={{
                                                        fontSize: 12,
                                                        color: isDark ? "rgba(255,255,255,0.72)" : "#374151",
                                                        lineHeight: 1.4
                                                    }}>
                                                        {item}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}

/* ── DATA MODAL ── */
function DataModal({onClose, isDark}: { onClose: () => void; isDark: boolean }) {
    const tp = isDark ? "#fff" : "#0f172a";
    const tm = isDark ? "rgba(255,255,255,0.45)" : "#64748b";
    const items = [
        {
            icon: "🎯",
            name: "Ус түгээх ухаалаг систем (УТУТ)",
            count: 331,
            color: "#378ADD",
            desc: "MCA-Mongolia-ийн дэмжлэгээр 180 ухаалаг ус түгээх байр нэмж суурилуулж, нийт 326 байрыг ухаалаг тоноглон, бие даасан хяналтын системээр удирдаж, засвар үйлчилгээг нь хариуцдаг."
        },
        {
            icon: "📡",
            name: "Телеметр",
            count: 73,
            color: "#20A8D8",
            desc: "Цэвэр усны төв шугамын даралт, урсгал, температурыг бодит хугацаанд хянаж, дамжуулах телеметрийн хяналтын систем нь ус хангамжийн найдвартай ажиллагааг хангах дижитал хяналт, удирдлагын цогц шийдэл юм."
        },
        {
            icon: "🚗",
            name: "Авто тээвэр хяналтын систем (GPS)",
            count: 100,
            color: "#3B9E2A",
            desc: "Байгууллагын тээврийн хэрэгслийн байршил, хөдөлгөөн, түлшний зарцуулалтыг GPS болон 13 төрлийн тайлангаар хянаж, үр ашигтай ажиллах нөхцөлийг хангадаг систем юм."
        },
        {
            icon: "📍",
            name: "Нэг цэгийн хяналтын систем",
            count: 166,
            color: "#639922",
            desc: "Улаанбаатар хотын томоохон хэрэглэгчдийн / ус дулаан дамжуулах төв болон орон сууцны барилгын / оруулгын шугам дээрх тоолуур болон даралт мэдрэгчийн мэдээллийг бодит цагийн горимоор дамжуулахад хяналт тавин ажилладаг."
        },
    ];
    const [sel, setSel] = useState(0);
    return (
        <ModalShell onClose={onClose} isDark={isDark} width={900}>
            <div style={{overflowY: "auto", flex: 1, padding: "12px clamp(12px, 4vw, 24px) 20px"}}>
                <div style={{marginBottom: 20}}>
                    <p style={{
                        fontSize: 10,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.14em",
                        color: "#378ADD",
                        fontWeight: 700,
                        marginBottom: 4
                    }}>ДАТА ХЯНАЛТЫН СИСТЕМИЙН ХЭСЭГ</p>
                    <h2 style={{
                        fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                        fontWeight: 900,
                        color: tp,
                        lineHeight: 1.15,
                        margin: 0
                    }}>Дата хяналтын 4 үндсэн систем</h2>
                </div>
                <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16}}>
                    <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                        {items.map((item, i) => (
                            <motion.div key={i} initial={{opacity: 0, x: -16}} animate={{opacity: 1, x: 0}}
                                        transition={{delay: i * 0.08}}
                                        onClick={() => setSel(i)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 14,
                                            padding: "14px 16px",
                                            borderRadius: 16,
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                            background: sel === i ? (isDark ? `${item.color}18` : `${item.color}10`) : (isDark ? "rgba(255,255,255,0.025)" : "#fff"),
                                            border: `1.5px solid ${sel === i ? item.color : (isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)")}`,
                                            boxShadow: sel === i ? `0 4px 20px ${item.color}25` : "none"
                                        }}>
                                <div style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${item.color}30, ${item.color}15)`,
                                    border: `2px solid ${item.color}40`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 20,
                                    flexShrink: 0
                                }}>{item.icon}</div>
                                <div style={{flex: 1, minWidth: 0}}><p style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: sel === i ? item.color : tp,
                                    lineHeight: 1.3,
                                    margin: 0
                                }}>{item.name}</p></div>
                                <div style={{flexShrink: 0, textAlign: "right"}}><p style={{
                                    fontSize: "1.4rem",
                                    fontWeight: 900,
                                    color: item.color,
                                    lineHeight: 1
                                }}>{item.count}</p></div>
                            </motion.div>
                        ))}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div key={sel} initial={{opacity: 0, x: 16}} animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: -8}} transition={{duration: 0.28, ease: [0.16, 1, 0.3, 1]}}
                                    style={{
                                        background: isDark ? "rgba(255,255,255,0.025)" : "#fff",
                                        borderRadius: 20,
                                        padding: "20px",
                                        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        gap: 16,
                                        minWidth: 200
                                    }}>
                            <div style={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                background: `linear-gradient(135deg, ${items[sel].color}40, ${items[sel].color}15)`,
                                border: `2.5px solid ${items[sel].color}60`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 28
                            }}>{items[sel].icon}</div>
                            <div><p style={{
                                fontSize: 14,
                                fontWeight: 900,
                                color: tp,
                                lineHeight: 1.3,
                                marginBottom: 12
                            }}>{items[sel].name}</p><p
                                style={{fontSize: 13, color: tm, lineHeight: 1.75}}>{items[sel].desc}</p></div>
                            <div style={{display: "flex", alignItems: "baseline", gap: 8}}>
                                <span style={{
                                    fontSize: "3rem",
                                    fontWeight: 900,
                                    color: items[sel].color,
                                    lineHeight: 1
                                }}>{items[sel].count}</span>
                                <span style={{fontSize: 13, color: tm}}>нэгж / цэг</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </ModalShell>
    );
}

/* ── NET MODAL ── */
function NetModal({onClose, isDark}: { onClose: () => void; isDark: boolean }) {
    const tp = isDark ? "#fff" : "#0f172a";
    const tm = isDark ? "rgba(255,255,255,0.45)" : "#64748b";
    const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
    const items = [
        {
            num: "01",
            badge: "927 ш",
            badgeBg: "#7F77DD",
            title: "Хяналтын камерын систем",
            subtitle: "927 ширхэг камер",
            desc: "Хяналтын камерын системийн програм, тоног төхөөрөмж, холбогдох хэрэгслийн хэвийн, тасралтгүй ажиллагааг хангаж, шаардлагатай үед оношилгоо, засвар үйлчилгээ хийж, станц, цэг, салбар нэгжүүдийн аюулгүй байдал, найдвартай ажиллагаанд хяналт тавих."
        },
        {
            num: "02",
            badge: "545 ш   159 ш",
            badgeBg: "#E8606A",
            title: "Компьютер 545, Принтер 159 ширхэг",
            subtitle: "53 цаг бүртгэлийн төхөөрөмжинд 1485 ажилчин бүртгэлтэй ажиллаж байна.",
            desc: "Байгууллагын хэмжээнд ашиглагдаж буй компьютер, принтер болон холбогдох тоног төхөөрөмжийн хэвийн, тасралтгүй ажиллагааг хангаж, шаардлагатай үед оношилгоо, засвар үйлчилгэх. Өдөр өур цаг бүртгэлийг UB ERP систем рүү явуулдаг."
        },
        {
            num: "03",
            badge: "1090 ш, 230 км",
            badgeBg: "#20A8D8",
            title: "Шилэн кабелийн сүлжээ",
            subtitle: "58 цэгийн шилэн кабелийн сувагчлал, 12 цэгийн аналоги шилэн кабелийн турээс",
            desc: "Гадаад болон дотоод сүлжээ зохион байгуулах, бүх цэг салбаруудын дотоод сүлжээний аюулгүй, найдвартай хэвийн үйл ажиллагааг хангах."
        },
        {
            num: "04",
            badge: "79 ш, 595 дугаар",
            badgeBg: "#F5A623",
            title: "Холбооны тоног төхөөрөмж",
            subtitle: "Үүрэн холбооны дугаар 68 Аналоги дугаар-68 IP дугаар-26 IPTV-24, Дата дугаар 765",
            desc: "Дуудлагын төвийн дуудлага бүртгэлийн программын сервер, серверийн ажиллагаа. Байгууллагын дотуур холбоо, тугний холбоо, серверийн ажиллагааны тасралтгүй байдлыг хариуцдаг."
        },
    ];
    return (
        <ModalShell onClose={onClose} isDark={isDark} width={960}>
            <div style={{overflowY: "auto", flex: 1, padding: "12px clamp(12px, 4vw, 24px) 20px"}}>
                <div style={{marginBottom: 20}}>
                    <p style={{
                        fontSize: 10,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.14em",
                        color: "#7F77DD",
                        fontWeight: 700,
                        marginBottom: 4
                    }}>СҮЛЖЭЭ, АЮУЛГҮЙ БАЙДЛЫН ХЭСЭГ</p>
                    <h2 style={{
                        fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                        fontWeight: 900,
                        color: tp,
                        lineHeight: 1.2,
                        margin: 0
                    }}>Компьютер тоног төхөөрөмж болон сүлжээ, аюулгүй байдлын хэсэг</h2>
                </div>
                <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12}}>
                    {items.map((item, i) => (
                        <motion.div key={i} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
                                    transition={{delay: i * 0.09, duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
                                    style={{
                                        background: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                                        borderRadius: 18,
                                        border: `1px solid ${border}`,
                                        overflow: "hidden"
                                    }}>
                            <div style={{
                                padding: "10px 16px",
                                background: isDark ? "rgba(255,255,255,0.04)" : "#f8fafc",
                                borderBottom: `1px solid ${border}`,
                                display: "flex",
                                alignItems: "center",
                                gap: 10
                            }}>
                                <span style={{
                                    padding: "4px 12px",
                                    borderRadius: 20,
                                    background: item.badgeBg,
                                    color: "#fff",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    fontFamily: "var(--font-mono)"
                                }}>{item.badge}</span>
                            </div>
                            <div style={{padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8}}>
                                <div style={{display: "flex", alignItems: "flex-start", gap: 12}}>
                                    <div style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        background: item.badgeBg,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 13,
                                        fontWeight: 900,
                                        color: "#fff",
                                        flexShrink: 0,
                                        fontFamily: "var(--font-mono)"
                                    }}>{item.num}</div>
                                    <div><p style={{
                                        fontSize: 13,
                                        fontWeight: 900,
                                        color: tp,
                                        lineHeight: 1.3,
                                        margin: "0 0 4px"
                                    }}>{item.title}</p><p style={{
                                        fontSize: 11,
                                        color: item.badgeBg,
                                        fontWeight: 600,
                                        lineHeight: 1.35
                                    }}>{item.subtitle}</p></div>
                                </div>
                                <p style={{fontSize: 11.5, color: tm, lineHeight: 1.65}}>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </ModalShell>
    );
}

/* ── CLEAN MODAL ── */
function CleanModal({onClose, isDark}: { onClose: () => void; isDark: boolean }) {
    const tp = isDark ? "#fff" : "#0f172a";
    const tm = isDark ? "rgba(255,255,255,0.45)" : "#64748b";
    const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
    const items = [
        {icon: "🏭", label: "Эх үүсвэр", count: 9, color: "#185FA5"}, {
            icon: "💧",
            label: "Гүний худаг",
            count: 218,
            color: "#20A8D8"
        },
        {icon: "🏊", label: "Усан сан", count: 19, color: "#3B9E2A"}, {
            icon: "🔄",
            label: "Дахин дамжуулах",
            count: 13,
            color: "#639922"
        },
        {icon: "⚡", label: "Зөөлөн асаагч", count: 39, color: "#E8A020"}, {
            icon: "🔧",
            label: "Давтамж хувиргагч",
            count: 37,
            color: "#993C1D"
        },
    ];
    return (
        <ModalShell onClose={onClose} isDark={isDark} width={820}>
            <div style={{overflowY: "auto", flex: 1, padding: "12px clamp(12px, 4vw, 24px) 20px"}}>
                <div style={{marginBottom: 16}}>
                    <p style={{
                        fontSize: 10,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.14em",
                        color: "#185FA5",
                        fontWeight: 700,
                        marginBottom: 4
                    }}>ТОНОГ ТӨХӨӨРӨМЖИЙН ЗАСВАРЫН ХЭСЭГ</p>
                    <h2 style={{
                        fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                        fontWeight: 900,
                        color: tp,
                        lineHeight: 1.2,
                        margin: "0 0 8px"
                    }}>Цэвэр усны тоног төхөөрөмжийн засварын хэсэг</h2>
                    <p style={{fontSize: 13, color: tm, lineHeight: 1.7, maxWidth: 680}}>Цэвэр усны тоног төхөөрөмжийн
                        засварын хэсэг нь Ус хангамжийн албаны 1,2-р өргөгч, усан сангуудад байрлах удирдлагын шит,
                        давтамж хувиргагч, зөөлөн асаагч, автоматик хянах хэмжих хэрэгслийн засвар үйлчилгээний ажлыг
                        гүйцэтгэдэг.</p>
                </div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 12,
                    marginBottom: 20
                }}>
                    {items.map((item, i) => (
                        <motion.div key={i} initial={{opacity: 0, y: 24}} animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.15 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
                                    style={{
                                        background: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                                        borderRadius: 16,
                                        border: `1px solid ${border}`,
                                        overflow: "hidden"
                                    }}>
                            <div style={{height: 4, background: item.color}}/>
                            <div style={{
                                padding: "16px 16px 14px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 10,
                                textAlign: "center"
                            }}>
                                <div style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${item.color}30, ${item.color}12)`,
                                    border: `2px solid ${item.color}40`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 22
                                }}>{item.icon}</div>
                                <p style={{fontSize: 13, fontWeight: 700, color: tp, lineHeight: 1.3}}>{item.label}</p>
                                <motion.div initial={{scale: 0}} animate={{scale: 1}}
                                            transition={{delay: 0.4 + i * 0.07, type: "spring", stiffness: 200}}
                                            style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: "50%",
                                                border: `2px solid ${item.color}40`,
                                                background: isDark ? "rgba(255,255,255,0.04)" : "#f8fafc",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                    <span style={{
                                        fontSize: 16,
                                        fontWeight: 900,
                                        color: item.color,
                                        fontFamily: "var(--font-mono)"
                                    }}>{item.count}</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div style={{
                    background: isDark ? "rgba(255,255,255,0.025)" : "#f1f5f9",
                    borderRadius: 14,
                    padding: "14px 18px",
                    border: `1px solid ${border}`
                }}>
                    <p style={{
                        fontSize: 9.5,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.12em",
                        color: tm,
                        marginBottom: 12,
                        textTransform: "uppercase" as const
                    }}>Нийт тоног төхөөрөмжийн хэмжээ</p>
                    <div style={{display: "flex", gap: 8}}>
                        {items.map((item, i) => (
                            <div key={i} style={{
                                flex: item.count,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 4
                            }}>
                                <motion.div initial={{scaleY: 0}} animate={{scaleY: 1}}
                                            transition={{delay: 0.5 + i * 0.06, duration: 0.5, ease: "easeOut"}}
                                            style={{
                                                width: "100%",
                                                height: 6,
                                                borderRadius: 3,
                                                background: item.color,
                                                transformOrigin: "left"
                                            }}/>
                                <span style={{
                                    fontSize: 10,
                                    fontFamily: "var(--font-mono)",
                                    color: item.color,
                                    fontWeight: 700
                                }}>{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ModalShell>
    );
}

/* ── OPS MODAL ── */
function OpsModal({onClose, isDark}: { onClose: () => void; isDark: boolean }) {
    const tp = isDark ? "#fff" : "#0f172a";
    const tm = isDark ? "rgba(255,255,255,0.45)" : "#64748b";
    const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
    const stats = [
        {label: "Цэг салбар", value: "81", sub: "GPRS-ээр холбосон", color: "#3B9E2A"}, {
            label: "Ханан дэлгэц",
            value: "3×5м",
            sub: "Хяналтын төв",
            color: "#378ADD"
        },
        {label: "PLC контроллер", value: "30+", sub: "Автомат хаалт", color: "#E8A020"}, {
            label: "SCADA систем",
            value: "24/7",
            sub: "Тасралтгүй хяналт",
            color: "#7F77DD"
        },
    ];
    const points = [
        "Байгууллагын хэмжээнд SCADA систем, программ хангамж, алсын удирдлага, компьютер, харилцаа холбоо, автоматжуулалтын тоног төхөөрөмжийн найдвартай, 24/7 тасралтгүй ажиллагааг хянах, оношлох, засвар үйлчилгээ зохион байгуулах үндсэн үүрэгтэй.",
        "Станц цэг, салбаруудын автоматжуулалтын тоног төхөөрөмжид гэнэтийн гэмтэл гарсан тохиолдолд шуурхай зохион байгуулалт хийж, саатлыг арилгах, засварын ажлыг удирдан гүйцэтгэх.",
        "Хяналт удирдлагын төвийн диспетчерт мэдээллийн технологийн төрөл бүрийн техникийн дэмжлэг үзүүлж, системийн найдвартай, тасралтгүй ажиллагааг хангах.",
    ];
    return (
        <ModalShell onClose={onClose} isDark={isDark} width={880}>
            <div style={{overflowY: "auto", flex: 1, padding: "12px clamp(12px, 4vw, 24px) 20px"}}>
                <div style={{marginBottom: 20}}>
                    <p style={{
                        fontSize: 10,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.14em",
                        color: "#3B9E2A",
                        fontWeight: 700,
                        marginBottom: 4
                    }}>ҮЙЛДВЭРЛЭЛИЙН УДИРДЛАГЫН ХЭСЭГ</p>
                    <h2 style={{
                        fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
                        fontWeight: 900,
                        color: tp,
                        lineHeight: 1.2,
                        margin: 0
                    }}>Үйлдвэрлэлийн удирдлагын хэсэг</h2>
                </div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                    gap: 10,
                    marginBottom: 18
                }}>
                    {stats.map((s, i) => (
                        <motion.div key={i} initial={{opacity: 0, y: 16}} animate={{opacity: 1, y: 0}}
                                    transition={{delay: i * 0.08, duration: 0.4}}
                                    style={{
                                        background: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                                        borderRadius: 14,
                                        padding: "14px 14px",
                                        border: `1px solid ${border}`,
                                        textAlign: "center"
                                    }}>
                            <p style={{
                                fontSize: "1.8rem",
                                fontWeight: 900,
                                color: s.color,
                                lineHeight: 1
                            }}>{s.value}</p>
                            <p style={{fontSize: 12, fontWeight: 700, color: tp, marginTop: 4}}>{s.label}</p>
                            <p style={{fontSize: 10, color: tm, marginTop: 2}}>{s.sub}</p>
                        </motion.div>
                    ))}
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                    {points.map((p, i) => (
                        <motion.div key={i} initial={{opacity: 0, x: -12}} animate={{opacity: 1, x: 0}}
                                    transition={{delay: 0.3 + i * 0.1, duration: 0.4}}
                                    style={{
                                        display: "flex",
                                        gap: 14,
                                        padding: "14px 16px",
                                        background: isDark ? "rgba(255,255,255,0.025)" : "#fff",
                                        borderRadius: 14,
                                        border: `1px solid ${border}`
                                    }}>
                            <div style={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                background: "#3B9E2A20",
                                border: "1px solid #3B9E2A40",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                fontSize: 12,
                                fontWeight: 900,
                                color: "#3B9E2A",
                                fontFamily: "var(--font-mono)"
                            }}>{i + 1}</div>
                            <p style={{fontSize: 13, color: tm, lineHeight: 1.7, margin: 0}}>{p}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </ModalShell>
    );
}

function CleanBohirModal({onClose, isDark}: { onClose: () => void; isDark: boolean }) {
    const tp = isDark ? "#fff" : "#0f172a";
    const tm = isDark ? "rgba(255,255,255,0.45)" : "#64748b";
    const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
    const items = [
        {icon: "🏭", label: "ТЦБ станц", count: 7, color: "#185FA5"}, {
            icon: "💧",
            label: "Тунгаагуурын ток съёмник ",
            count: 19,
            color: "#20A8D8"
        },
        {icon: "🏊", label: "Бага оврын ЦБ", count: 6, color: "#3B9E2A"}, {
            icon: "🔄",
            label: "Зөөлөн асаагч ",
            count: 18,
            color: "#639922"
        },
        {icon: "⚡", label: "Бохирын өргөх станц", count: 9, color: "#E8A020"}, {
            icon: "🔧",
            label: "Давтамж хувиргагч",
            count: 66,
            color: "#993C1D"
        },
    ];
    return (
        <ModalShell onClose={onClose} isDark={isDark} width={820}>
            <div style={{overflowY: "auto", flex: 1, padding: "12px clamp(12px, 4vw, 24px) 20px"}}>
                <div style={{marginBottom: 16}}>
                    <p style={{
                        fontSize: 10,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.14em",
                        color: "#185FA5",
                        fontWeight: 700,
                        marginBottom: 4
                    }}>ТОНОГ ТӨХӨӨРӨМЖИЙН ЗАСВАРЫН ХЭСЭГ</p>
                    <h2 style={{
                        fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                        fontWeight: 900,
                        color: tp,
                        lineHeight: 1.2,
                        margin: "0 0 8px"
                    }}>Бохир усны тоног төхөөрөмжийн засварын хэсэг</h2>
                    <p style={{fontSize: 13, color: tm, lineHeight: 1.7, maxWidth: 680}}>Бохир усны тоног төхөөрөмжийн
                        засварын хэсэг нь бохирын өргөх станц, тунгаагуурын ток съёмник, зөөлөн асаагч, давтамж
                        хувиргагчийн өдөр тутмын засвар үйлчилгээг хариуцаж ажилладаг. </p>
                </div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 12,
                    marginBottom: 20
                }}>
                    {items.map((item, i) => (
                        <motion.div key={i} initial={{opacity: 0, y: 24}} animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.15 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
                                    style={{
                                        background: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                                        borderRadius: 16,
                                        border: `1px solid ${border}`,
                                        overflow: "hidden"
                                    }}>
                            <div style={{height: 4, background: item.color}}/>
                            <div style={{
                                padding: "16px 16px 14px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 10,
                                textAlign: "center"
                            }}>
                                <div style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${item.color}30, ${item.color}12)`,
                                    border: `2px solid ${item.color}40`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 22
                                }}>{item.icon}</div>
                                <p style={{fontSize: 13, fontWeight: 700, color: tp, lineHeight: 1.3}}>{item.label}</p>
                                <motion.div initial={{scale: 0}} animate={{scale: 1}}
                                            transition={{delay: 0.4 + i * 0.07, type: "spring", stiffness: 200}}
                                            style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: "50%",
                                                border: `2px solid ${item.color}40`,
                                                background: isDark ? "rgba(255,255,255,0.04)" : "#f8fafc",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                    <span style={{
                                        fontSize: 16,
                                        fontWeight: 900,
                                        color: item.color,
                                        fontFamily: "var(--font-mono)"
                                    }}>{item.count}</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div style={{
                    background: isDark ? "rgba(255,255,255,0.025)" : "#f1f5f9",
                    borderRadius: 14,
                    padding: "14px 18px",
                    border: `1px solid ${border}`
                }}>
                    <p style={{
                        fontSize: 9.5,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.12em",
                        color: tm,
                        marginBottom: 12,
                        textTransform: "uppercase" as const
                    }}>Нийт тоног төхөөрөмжийн хэмжээ</p>
                    <div style={{display: "flex", gap: 8}}>
                        {items.map((item, i) => (
                            <div key={i} style={{
                                flex: item.count,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 4
                            }}>
                                <motion.div initial={{scaleY: 0}} animate={{scaleY: 1}}
                                            transition={{delay: 0.5 + i * 0.06, duration: 0.5, ease: "easeOut"}}
                                            style={{
                                                width: "100%",
                                                height: 6,
                                                borderRadius: 3,
                                                background: item.color,
                                                transformOrigin: "left"
                                            }}/>
                                <span style={{
                                    fontSize: 10,
                                    fontFamily: "var(--font-mono)",
                                    color: item.color,
                                    fontWeight: 700
                                }}>{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ModalShell>
    );
}

/* ── TASKS MODAL ── */
function TasksModal({node, onClose, isDark}: { node: OrgNode; onClose: () => void; isDark: boolean }) {
    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", h);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", h);
            document.body.style.overflow = "";
        };
    }, [onClose]);
    const sep = `0.5px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}`;
    const total = node.roles.reduce((a, r) => a + r.count, 0);
    return createPortal(
        <AnimatePresence>
            <motion.div key="bd" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                        transition={{duration: 0.22}} onClick={onClose}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 200,
                            background: "rgba(0,0,0,0.52)",
                            backdropFilter: "blur(8px)"
                        }}/>
            <motion.div key="win" initial={{opacity: 0, scale: 0.84, y: 52}} animate={{opacity: 1, scale: 1, y: 0}}
                        exit={{opacity: 0, scale: 0.9, y: 28}}
                        transition={{duration: 0.38, ease: [0.16, 1, 0.3, 1]}} onClick={e => e.stopPropagation()}
                        style={{
                            position: "fixed",
                            zIndex: 201,
                            inset: 0,
                            margin: "auto",
                            width: "min(460px, 93vw)",
                            height: "fit-content",
                            maxHeight: "82vh",
                            display: "flex",
                            flexDirection: "column",
                            background: isDark ? "#0d0f1a" : "#ffffff",
                            border: `1.5px solid ${node.color}55`,
                            borderRadius: "clamp(12px, 3vw, 22px)",
                            overflow: "hidden",
                            boxShadow: `0 32px 80px ${node.color}35, 0 8px 32px rgba(0,0,0,0.28)`
                        }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    flexShrink: 0,
                    background: isDark ? `linear-gradient(135deg, ${node.color}18, ${node.color}06)` : `linear-gradient(135deg, ${node.bg}, #fff)`,
                    borderBottom: `1px solid ${node.color}30`
                }}>
                    <div style={{display: "flex", gap: 6, flexShrink: 0}}>
                        <motion.button whileHover={{scale: 1.2}} whileTap={{scale: 0.85}} onClick={onClose}
                                       style={{
                                           width: 13,
                                           height: 13,
                                           borderRadius: "50%",
                                           background: "#FF5F57",
                                           border: "none",
                                           cursor: "pointer"
                                       }}/>
                        <div style={{width: 13, height: 13, borderRadius: "50%", background: "#FFBD2E"}}/>
                        <div style={{width: 13, height: 13, borderRadius: "50%", background: "#28C840"}}/>
                    </div>
                    <div style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: node.bg,
                        border: `2px solid ${node.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 17,
                        color: node.textColor
                    }}>{node.icon}</div>
                    <div style={{flex: 1, minWidth: 0}}>
                        <p style={{
                            fontSize: 12,
                            fontWeight: 700,
                            lineHeight: 1.35,
                            color: isDark ? "#fff" : "#0f172a",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "calc(100% - 80px)"
                        }}>{node.name}</p>
                        <p style={{
                            fontSize: 9.5,
                            fontFamily: "var(--font-mono)",
                            color: node.color,
                            opacity: 0.75,
                            marginTop: 1
                        }}>Нийт {total} хүн</p>
                    </div>
                    <motion.button whileHover={{scale: 1.08}} whileTap={{scale: 0.92}} onClick={onClose}
                                   style={{
                                       flexShrink: 0,
                                       border: `0.5px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
                                       borderRadius: 8,
                                       padding: "4px 12px",
                                       fontSize: 11,
                                       color: isDark ? "rgba(255,255,255,0.5)" : "#64748b",
                                       background: "transparent",
                                       cursor: "pointer"
                                   }}>Хаах
                    </motion.button>
                </div>
                <div style={{overflowY: "auto", flex: 1, padding: "16px"}}>
                    <div style={{marginBottom: 16}}>
                        <div style={{display: "flex", alignItems: "center", gap: 6, marginBottom: 10}}>
                            <div
                                style={{width: 3, height: 14, borderRadius: 2, background: node.color, flexShrink: 0}}/>
                            <span style={{
                                fontSize: 10,
                                fontWeight: 700,
                                fontFamily: "var(--font-mono)",
                                letterSpacing: "0.14em",
                                textTransform: "uppercase" as const,
                                color: node.color
                            }}>⚡ Хийдэг ажлууд</span>
                        </div>
                        <div style={{
                            borderRadius: 14,
                            overflow: "hidden",
                            border: `0.5px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`
                        }}>
                            {node.tasks.map((t, i) => (
                                <motion.div key={i} initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}}
                                            transition={{delay: i * 0.055, duration: 0.25}}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                                padding: "11px 14px",
                                                borderBottom: i < node.tasks.length - 1 ? sep : "none",
                                                background: isDark ? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.01)"
                                            }}>
                                    <span style={{fontSize: 18, flexShrink: 0, lineHeight: 1}}>{t.icon}</span>
                                    <span style={{
                                        fontSize: 13,
                                        lineHeight: 1.45,
                                        color: isDark ? "rgba(255,255,255,0.75)" : "#374151"
                                    }}>{t.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div style={{display: "flex", alignItems: "center", gap: 6, marginBottom: 10}}>
                            <div style={{
                                width: 3,
                                height: 14,
                                borderRadius: 2,
                                background: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.14)",
                                flexShrink: 0
                            }}/>
                            <span style={{
                                fontSize: 10,
                                fontWeight: 700,
                                fontFamily: "var(--font-mono)",
                                letterSpacing: "0.14em",
                                textTransform: "uppercase" as const,
                                color: isDark ? "rgba(255,255,255,0.35)" : "#94a3b8"
                            }}>👤 Хүний нөөц</span>
                        </div>
                        <div style={{
                            borderRadius: 14,
                            overflow: "hidden",
                            border: `0.5px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`
                        }}>
                            {node.roles.map((r, i) => (
                                <div key={i} style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "9px 14px",
                                    borderBottom: i < node.roles.length - 1 ? sep : "none"
                                }}>
                                    <span style={{
                                        fontSize: 12,
                                        color: isDark ? "rgba(255,255,255,0.52)" : "#64748b",
                                        flex: 1,
                                        paddingRight: 8
                                    }}>{r.title}</span>
                                    <span style={{
                                        fontSize: 13,
                                        fontWeight: 900,
                                        fontFamily: "var(--font-mono)",
                                        color: node.color,
                                        flexShrink: 0
                                    }}>{r.count}</span>
                                </div>
                            ))}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "9px 14px",
                                background: isDark ? `${node.color}14` : node.bg,
                                borderTop: `1px solid ${node.border}`
                            }}>
                                <span style={{
                                    fontSize: 9.5,
                                    fontFamily: "var(--font-mono)",
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase" as const,
                                    color: node.textColor,
                                    opacity: 0.65
                                }}>нийт</span>
                                <span style={{fontSize: 20, fontWeight: 900, color: node.color}}>{total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}

/* ── CIRCLE NODE ── */
function CircleNode({node, active, onClick, isDark}: {
    node: OrgNode;
    active: boolean;
    onClick: () => void;
    isDark: boolean
}) {
    const total = node.roles.reduce((a, r) => a + r.count, 0);
    const divider = `0.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`;
    return (
        <div className="flex flex-col items-center w-[190px]">
            <motion.button whileHover={{scale: 1.1, y: -2}} whileTap={{scale: 0.95}} onClick={onClick}
                           className="relative w-[68px] h-[68px] rounded-full flex items-center justify-center cursor-pointer flex-shrink-0"
                           style={{
                               background: node.bg,
                               border: `2.5px solid ${active ? node.color : node.border}`,
                               color: node.textColor,
                               boxShadow: active ? `0 0 0 4px ${node.color}28, 0 8px 24px ${node.color}22` : `0 2px 8px ${node.color}12`
                           }}>
                <span style={{fontSize: "1.4rem"}}>{node.icon}</span>
                {!active && <motion.div animate={{scale: [1, 2.0, 1], opacity: [0.7, 0, 0.7]}}
                                        transition={{duration: 2.2, repeat: Infinity, ease: "easeOut"}}
                                        className="absolute inset-0 rounded-full pointer-events-none"
                                        style={{border: `1.5px solid ${node.color}`}}/>}
                {active && <motion.div initial={{scale: 0}} animate={{scale: 1}}
                                       className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                                       style={{background: node.color, borderColor: isDark ? "#060608" : "#f0f4f8"}}/>}
            </motion.button>
            <p className="text-center text-[11px] font-semibold mt-2.5 leading-snug px-1"
               style={{color: isDark ? "rgba(255,255,255,0.85)" : "#1e293b"}}>{node.shortName}</p>
            <p className="text-[10px] font-mono font-bold mt-0.5 mb-3" style={{color: node.color}}></p>
            <div className="w-full rounded-xl overflow-hidden" style={{
                background: isDark ? "rgba(255,255,255,0.025)" : "#fff",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}`
            }}>
                <div className="px-3 py-1.5 flex items-center justify-between"
                     style={{background: node.bg, borderBottom: `1px solid ${node.border}`}}>
                    <span className="text-[9px] font-mono tracking-wider uppercase"
                          style={{color: node.textColor, opacity: 0.7}}>Хэсэгт нийт</span>
                    <span className="text-[11px] font-black" style={{color: node.color}}>{total}</span>
                </div>
                {node.roles.map((r, i) => (
                    <div key={i} className="flex justify-between items-center px-3 py-1.5"
                         style={{borderBottom: i < node.roles.length - 1 ? divider : "none"}}>
                        <span className="text-[10px] pr-1 leading-snug"
                              style={{color: isDark ? "rgba(255,255,255,0.48)" : "#64748b", flex: 1}}>{r.title}</span>
                        <span className="text-[11px] font-black font-mono flex-shrink-0"
                              style={{color: node.color}}>{r.count}</span>
                    </div>
                ))}
            </div>
            <AnimatePresence>
                {active && (
                    node.id === "sys" ? <SystemLandscapeModal onClose={onClick} isDark={isDark}/> :
                        node.id === "data" ? <DataModal onClose={onClick} isDark={isDark}/> :
                            node.id === "net" ? <NetModal onClose={onClick} isDark={isDark}/> :
                                node.id === "clean" ? <CleanModal onClose={onClick} isDark={isDark}/> :
                                    node.id === "ops" ? <OpsModal onClose={onClick} isDark={isDark}/> :
                                        node.id === "waste" ? <CleanBohirModal onClose={onClick} isDark={isDark}/> :
                                            <TasksModal node={node} onClose={onClick} isDark={isDark}/>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ── PILLAR SECTION ── */
function PillarSection({
                           label,
                           sublabel,
                           emoji,
                           color,
                           borderColor,
                           bgColor,
                           glowColor,
                           total,
                           nodes,
                           active,
                           onToggle,
                           isDark,
                           side
                       }: {
    label: string;
    sublabel: string;
    emoji: string;
    color: string;
    borderColor: string;
    bgColor: string;
    glowColor: string;
    total: number;
    nodes: OrgNode[];
    active: string | null;
    onToggle: (id: string) => void;
    isDark: boolean;
    side: "left" | "right";
}) {
    return (
        <div className="flex flex-col items-center flex-1 min-w-[280px]">
            <motion.div initial={{opacity: 0, x: side === "left" ? -28 : 28}} whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}} transition={{duration: 0.75, ease: [0.16, 1, 0.3, 1]}}
                        className="relative w-full max-w-[380px] flex items-center gap-4 px-5 py-4 rounded-2xl overflow-hidden"
                        style={{
                            background: isDark ? "rgba(13,13,18,0.9)" : "rgba(255,255,255,0.8)",
                            border: `1.5px solid ${borderColor}`,
                            boxShadow: `0 4px 24px ${glowColor}`
                        }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none" style={{
                    background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
                    transform: "translate(35%,-35%)"
                }}/>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[28px] flex-shrink-0"
                     style={{background: bgColor}}>{emoji}</div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-[13.5px] font-black tracking-tight leading-snug"
                        style={{color: isDark ? "#fff" : "#080810"}}>{label}</h3>
                    <p className="text-[9px] font-mono tracking-[0.1em] mt-1"
                       style={{color, opacity: 0.7}}>{sublabel}</p>
                </div>
                <div className="text-right flex-shrink-0">
                    <p className="text-[1.9rem] font-black leading-none" style={{color}}>{total}</p>
                    <p className="text-[9px] font-mono mt-0.5" style={{color, opacity: 0.55}}>Мэргэжлийн хүн</p>
                </div>
            </motion.div>
            <svg width="100%" height="52" className="max-w-[380px]" style={{overflow: "visible"}}>
                <line x1="50%" y1="0" x2="50%" y2="20" stroke={borderColor} strokeWidth="1.5"/>
                {nodes.length > 1 && <line x1={`${(1 / (nodes.length * 2)) * 100}%`} y1="20"
                                           x2={`${((nodes.length * 2 - 1) / (nodes.length * 2)) * 100}%`} y2="20"
                                           stroke={borderColor} strokeWidth="1.5"/>}
                {nodes.map((_, i) => {
                    const x = `${((i * 2 + 1) / (nodes.length * 2)) * 100}%`;
                    return <line key={i} x1={x} y1="20" x2={x} y2="52" stroke={color} strokeWidth="1.5"
                                 strokeDasharray="4 3"/>;
                })}
            </svg>
            <div className="flex gap-5 justify-center w-full max-w-[420px] flex-wrap sm:flex-nowrap">
                {nodes.map((n, i) => (
                    <motion.div key={n.id} initial={{opacity: 0, y: 18}} whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true, margin: "-30px"}}
                                transition={{duration: 0.6, delay: 0.25 + i * 0.09, ease: [0.16, 1, 0.3, 1]}}
                                className="flex-1 flex justify-center ">
                        {/*min-w-[100px]*/}
                        <CircleNode node={n} active={active === n.id} onClick={() => onToggle(n.id)} isDark={isDark}/>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function Nuur() {
    const {isDark} = useOutletContext<OutletCtx>();
    const {scrollY} = useScroll();
    const heroY = useTransform(scrollY, [0, 600], [0, -100]);
    const heroOpacity = useTransform(scrollY, [0, 380], [1, 0]);
    const particles = Array.from({length: 25}, (_, i) => i);
    const [activeFilter, setActiveFilter] = useState<TrackType | "all">("all");
    const filtered = activeFilter === "all" ? TIMELINE : TIMELINE.filter(e => e.track === activeFilter || e.track === "both");
    const [selectedDept, setSelectedDept] = useState<string>("СИСТЕМИЙН УДИРДЛАГА БОЛОН ПРОГРАММ ХАНГАМЖ, ХӨГЖҮҮЛЭЛТИЙН ХЭСЭГ");
    const [openModal, setOpenModal] = useState<string | null>(null);
    const [activeOrg, setActiveOrg] = useState<string | null>(null);
    const toggleOrg = (id: string) => setActiveOrg(prev => prev === id ? null : id);
    const cardBase = `p-6 transition-all duration-500 rounded-[2rem] border ${isDark
        ? "bg-black/20 border-white/10 backdrop-blur-xl shadow-2xl"
        : "bg-white/60 border-white/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
    }`;

    return (
        <div className={`relative transition-colors duration-700 ${isDark ? "bg-[#060608]" : "bg-[#f0f4f8]"}`}>


            <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
                <SharedBG isDark={isDark}/>
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {particles.map((i) => <Particle key={i} isDark={isDark} index={i}/>)}
                </div>
                <motion.div style={{y: heroY, opacity: heroOpacity}}
                            className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden select-none">
                    <p className={`text-[20vw] font-black tracking-tighter leading-none whitespace-nowrap ${isDark ? "text-white/[0.03]" : "text-black/[0.04]"}`}>МТАА</p>
                </motion.div>

                <motion.div style={{y: heroY, opacity: heroOpacity}}
                            className="relative z-10 max-w-[1400px] mx-auto px-8 w-full py-24">
                    <motion.div initial={{opacity: 0, y: 24}} animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.7, ease: [0.22, 1, 0.36, 1]}}
                                className="mb-10 flex items-center gap-3">
                        <motion.div animate={{scale: [1, 1.4, 1]}} transition={{duration: 2, repeat: Infinity}}
                                    className="w-2 h-2 rounded-full bg-[#4CAF50]"/>
                        <span
                            className={`font-mono text-xs tracking-[0.35em] uppercase ${isDark ? "text-[#4CAF50]" : "text-[#2d8632]"}`}>Танилцуулга</span>
                        <div className={`flex-1 h-px max-w-[60px] ${isDark ? "bg-white/10" : "bg-black/10"}`}/>
                    </motion.div>
                    <div className="mb-16">
                        {WORDS.map((w, wi) => (
                            <div key={wi} className="overflow-hidden inline-block mr-4">
                                <motion.span initial={{y: "100%", opacity: 0}} animate={{y: 0, opacity: 1}}
                                             transition={{
                                                 duration: 0.75,
                                                 delay: 0.3 + wi * 0.12,
                                                 ease: [0.22, 1, 0.36, 1]
                                             }}
                                             style={{
                                                 display: "inline-block",
                                                 fontSize: "clamp(2.5rem,7vw,6.5rem)",
                                                 fontWeight: 900,
                                                 letterSpacing: "-0.03em",
                                                 lineHeight: 0.92,
                                                 color: w.gradient ? "transparent" : isDark ? "#fff" : "#0a0a10", ...(w.gradient && {
                                                     backgroundImage: `linear-gradient(135deg, ${w.from}, ${w.to})`,
                                                     WebkitBackgroundClip: "text",
                                                     backgroundClip: "text"
                                                 })
                                             }}>
                                    {w.text}
                                </motion.span>
                            </div>
                        ))}
                    </div>
                    <motion.div initial={{opacity: 0, y: 32}} animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1]}}
                                className="flex flex-wrap gap-10 mb-12">
                        {STATS.map((s, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span
                                    className={`text-4xl font-black tabular-nums ${i === 0 ? "text-[#4CAF50]" : i === 1 ? "text-[#6094ea]" : isDark ? "text-white" : "text-slate-900"}`}>
                                    <AnimatedNumber target={s.value} suffix={s.suffix}/>
                                </span>
                                <span
                                    className={`text-xs font-mono tracking-widest uppercase ${isDark ? "text-white/40" : "text-slate-500"}`}>{s.label}</span>
                            </div>
                        ))}
                        <div className={`w-px self-stretch mx-2 ${isDark ? "bg-white/10" : "bg-black/10"}`}/>
                        <div className="flex items-center">
                            {/*<motion.button whileHover={{scale: 1.04}} whileTap={{scale: 0.97}}*/}
                            {/*               className={`relative px-8 py-3.5 rounded-full font-bold text-sm tracking-wide overflow-hidden transition-all ${isDark ? "bg-white text-black" : "bg-slate-900 text-white"}`}>*/}
                            {/*    /!*<span className="relative z-10 flex items-center gap-2">Дэлгэрэнгүй <motion.span*!/*/}
                            {/*    /!*    animate={{x: [0, 4, 0]}}*!/*/}
                            {/*    /!*    transition={{duration: 1.5, repeat: Infinity}}>→</motion.span></span>*!/*/}
                            {/*    <motion.div className="absolute inset-0 bg-[#4CAF50] origin-left" initial={{scaleX: 0}}*/}
                            {/*                whileHover={{scaleX: 1}} transition={{duration: 0.3}}/>*/}
                            {/*</motion.button>*/}
                        </div>
                    </motion.div>
                    <motion.div initial={{scaleX: 0, opacity: 0}} animate={{scaleX: 1, opacity: 1}}
                                transition={{duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1]}}
                                className="origin-left relative h-px overflow-hidden"
                                style={{background: "linear-gradient(90deg, #4CAF50, #6094ea, transparent)"}}>
                        <motion.div animate={{x: ["0%", "100%"]}}
                                    transition={{duration: 3, repeat: Infinity, ease: "linear"}}
                                    className="absolute top-0 h-full w-32 blur-sm" style={{
                            background: "linear-gradient(90deg, transparent, #fff, transparent)",
                            opacity: 0.3
                        }}/>
                    </motion.div>
                </motion.div>
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1.6}}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                    <span
                        className={`text-[10px] font-mono tracking-[0.3em] uppercase ${isDark ? "text-white/30" : "text-black/30"}`}>Доош гүйлгэх</span>
                    <div className={`w-px h-12 relative overflow-hidden ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                        <motion.div className="absolute top-0 w-full bg-[#4CAF50]" animate={{y: ["0%", "100%"]}}
                                    transition={{duration: 1.2, repeat: Infinity, ease: "easeInOut"}}
                                    style={{height: "40%"}}/>
                    </div>
                </motion.div>
            </section>
            <section className="relative w-full overflow-hidden">
                <SharedBG isDark={isDark}/>
                <div className="relative z-10 max-w-[1200px] mx-auto px-8 xl:px-12 py-28">
                    <div className="mb-10 space-y-6">
                        <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}}
                                    viewport={{once: true}} transition={{duration: 0.65}}
                                    className="flex items-center gap-3">
                            <motion.span animate={{opacity: [1, 0.2, 1], scale: [1, 1.5, 1]}}
                                         transition={{duration: 2, repeat: Infinity}}
                                         className="w-2 h-2 rounded-full bg-[#e07a50] inline-block"/>
                            <span
                                className={`font-mono text-[11px] tracking-[0.38em] uppercase ${isDark ? "text-[#e07a50]" : "text-[#9a4010]"}`}>Үйл ажиллагаа</span>
                            <div className={`w-14 h-px ${isDark ? "bg-white/10" : "bg-black/10"}`}/>
                        </motion.div>
                        <div style={{overflow: "hidden"}}>
                            <motion.h2
                                initial={{y: 40, opacity: 0}}
                                whileInView={{y: 0, opacity: 1}}
                                viewport={{once: true}}
                                transition={{duration: 0.9, ease: [0.16, 1, 0.3, 1]}}
                                style={{
                                    fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
                                    fontWeight: 900,
                                    lineHeight: 0.92,
                                    letterSpacing: "-0.03em",
                                    color: isDark ? "#fff" : "#080810"
                                }}
                            >
                                ҮНДСЭН{" "}
                                <span
                                    style={{
                                        backgroundImage: "linear-gradient(135deg, #e07a50, #f0b070)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        color: "transparent"
                                    }}
                                >
        ЧИГЛЭЛ
    </span>
                            </motion.h2>
                        </div>
                        <motion.p initial={{opacity: 0, y: 12}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                                  transition={{duration: 0.7, delay: 0.2}}
                                  className={`text-[1rem] leading-[1.85] max-w-xl ${isDark ? "text-white/40" : "text-slate-500"}`}>
                            Мэдээллийн технологи, автоматжуулалтын алба нь байгууллагын хэмжээнд дараах үндсэн
                            чиглэлүүдэд үйл ажиллагаа явуулдаг.
                        </motion.p>
                    </div>
                    <div className="space-y-6">
                        {[
                            {
                                num: "01",
                                title: "Мэдээллийн технологи, автоматжуулалт",
                                desc: "Мэдээллийн технологи, автоматжуулалтын алба нь байгууллагын хэмжээнд мэдээллийн технологи (IT), үйлдвэрлэлийн технологийн (OT) шийдлүүдийг нэвтрүүлж, ашиглалт, хөгжүүлэлт, засвар үйлчилгээг хариуцан ажиллана.",
                                color: "#6094ea",
                                tags: ["IT", "OT", "SCADA", "GIS", "GPS"]
                            },
                            {
                                num: "02",
                                title: "Хууль, дүрэм журам",
                                desc: "Албаны үйл ажиллагаа нь Кибер аюулгүй байдлын тухай хууль, Мэдээллийн ил тод байдал ба мэдээлэл авах эрхийн тухай хууль болон Ус сувгийн удирдах газрын дотоод дүрэм, журмын хүрээнд ажиллана.",
                                color: "#4CAF50",
                                tags: ["Хууль", "Дүрэм", "Журам", "Кибер аюулгүй байдал"]
                            },
                            {
                                num: "03",
                                title: "Программ хангамж, кибер аюулгүй байдал",
                                desc: "Алба нь СКАДА, GIS, GPS систем, программ хангамж, сервер, өгөгдлийн сан, шилэн кабель, холбоо, сүлжээ, хяналтын камер болон кибер аюулгүй байдлын дэд бүтцийг бүрэн хариуцаж, байгууллагын мэдээллийн технологийн аюулгүй, найдвартай, тасралтгүй ажиллагааг хангаж ажиллана.",
                                color: "#e07a50",
                                tags: ["Кибер аюулгүй байдал", "Программ хангамж", "Сүлжээ", "Сервер"]
                            },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{opacity: 0, y: 40}} whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: true, margin: "-40px"}}
                                        transition={{duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1]}}
                                        className={`group relative rounded-2xl border overflow-hidden transition-all ${isDark ? "bg-white/[0.025] border-white/[0.065] hover:border-white/14" : "bg-white border-black/[0.055] hover:border-black/10 shadow-sm hover:shadow-xl"}`}>
                                <motion.div className="absolute left-0 top-0 bottom-0 w-[3px]"
                                            style={{background: item.color}}
                                            initial={{scaleY: 0}} whileInView={{scaleY: 1}} viewport={{once: true}}
                                            transition={{duration: 0.6, delay: 0.3 + i * 0.12}}/>
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{background: `radial-gradient(400px at 0% 50%, ${item.color}0c, transparent)`}}/>
                                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start px-8 py-8">
                                    <motion.div whileInView={{scale: [0.7, 1.05, 1], opacity: [0, 1, 1]}}
                                                viewport={{once: true}}
                                                transition={{duration: 0.6, delay: 0.25 + i * 0.12}}
                                                className="flex-shrink-0 select-none"
                                                style={{
                                                    fontSize: "clamp(4rem, 8vw, 6.5rem)",
                                                    fontWeight: 900,
                                                    lineHeight: 1,
                                                    letterSpacing: "-0.05em",
                                                    backgroundImage: `linear-gradient(135deg, ${item.color}, ${item.color}55)`,
                                                    WebkitBackgroundClip: "text",
                                                    backgroundClip: "text",
                                                    color: "transparent"
                                                }}>
                                        {item.num}
                                    </motion.div>
                                    <div className="flex-1 space-y-4 py-1">
                                        <h3 style={{
                                            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                                            fontWeight: 900,
                                            letterSpacing: "-0.02em",
                                            color: isDark ? "#fff" : "#080810",
                                            lineHeight: 1.2
                                        }}>{item.title.toUpperCase()}</h3>
                                        <p className={`text-[14px] leading-[1.85] ${isDark ? "text-white/42" : "text-slate-500"}`}>{item.desc}</p>
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {item.tags.map((tag, ti) => (
                                                <motion.span key={ti} initial={{scale: 0.8, opacity: 0}}
                                                             whileInView={{scale: 1, opacity: 1}}
                                                             viewport={{once: true}}
                                                             transition={{delay: 0.5 + i * 0.12 + ti * 0.05}}
                                                             className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider"
                                                             style={{
                                                                 background: item.color + "18",
                                                                 color: item.color
                                                             }}>{tag}</motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="relative h-px overflow-hidden mt-20">
                        <div className={`absolute inset-0 ${isDark ? "bg-white/[0.06]" : "bg-black/[0.07]"}`}/>
                        <motion.div animate={{x: ["-100%", "200%"]}}
                                    transition={{duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2}}
                                    className="absolute h-full w-1/3"
                                    style={{background: "linear-gradient(90deg, transparent, #e07a50 40%, #6094ea 60%, transparent)"}}/>
                    </div>
                </div>
            </section>
            <section className="relative w-full overflow-hidden">
                <SharedBG isDark={isDark}/>
                <div className="relative z-10 max-w-[1100px] mx-auto px-8 xl:px-12 py-28">
                    <div className="mb-16 space-y-6">
                        <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}}
                                    viewport={{once: true}} transition={{duration: 0.65}}
                                    className="flex items-center gap-3">
                            <motion.span animate={{opacity: [1, 0.2, 1], scale: [1, 1.5, 1]}}
                                         transition={{duration: 2, repeat: Infinity}}
                                         className="w-2 h-2 rounded-full bg-[#4CAF50] inline-block"/>
                            <span
                                className={`font-mono text-[11px] tracking-[0.38em] uppercase ${isDark ? "text-[#4CAF50]" : "text-[#267a2a]"}`}>Бидний тухай</span>
                            <div className={`w-14 h-px ${isDark ? "bg-white/10" : "bg-black/10"}`}/>
                        </motion.div>
                        <div style={{overflow: "hidden"}}>

                            <motion.h2
                                initial={{y: 40, opacity: 0}}
                                whileInView={{y: 0, opacity: 1}}
                                viewport={{once: true}}
                                transition={{duration: 0.9, ease: [0.16, 1, 0.3, 1]}}
                                style={{
                                    fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
                                    fontWeight: 900,
                                    lineHeight: 0.92,
                                    letterSpacing: "-0.03em",
                                    color: isDark ? "#fff" : "#080810"
                                }}
                            >
                                ХӨГЖЛИЙН{" "}
                                <span
                                    style={{
                                        backgroundImage: `linear-gradient(135deg,#4CAF50, #4CAF5055)`,
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        color: "transparent"
                                    }}
                                >
        ТҮҮХЭН ЗАМНАЛ
    </span>
                            </motion.h2>

                        </div>
                        <motion.p initial={{opacity: 0, y: 12}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                                  transition={{duration: 0.7, delay: 0.2}}
                                  className={`text-[1rem] leading-[1.85] max-w-2xl ${isDark ? "text-white/40" : "text-slate-500"}`}>
                            1987 оноос эхлэн мэдээллийн технологи болон автоматжуулалтын чиглэлд тасралтгүй хөгжиж,
                            Улаанбаатар хотын усан хангамжийн системийг бүрэн дижитал удирдлагатай болгосон түүхэн
                            замнал.
                        </motion.p>
                        <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true}} transition={{duration: 0.6, delay: 0.3}}
                                    className="flex flex-wrap gap-2 pt-2">
                            {([
                                {key: "all", label: "Бүгд", color: isDark ? "#ffffff" : "#0a0a10"},
                                {key: "auto", label: "Автоматжуулалт", color: "#4CAF50"},
                                {key: "it", label: "Мэдээллийн технологи", color: "#6094ea"},
                                {key: "both", label: "МТ + Автоматжуулалт", color: "#e07a50"},
                            ] as const).map((f) => (
                                <motion.button key={f.key} whileHover={{scale: 1.04}} whileTap={{scale: 0.97}}
                                               onClick={() => setActiveFilter(f.key)}
                                               className={`px-4 py-1.5 rounded-full text-[11px] font-mono tracking-wider border transition-all ${activeFilter === f.key ? "border-transparent text-white" : isDark ? "border-white/10 text-white/40 hover:text-white/70" : "border-black/10 text-slate-400 hover:text-slate-700"}`}
                                               style={activeFilter === f.key ? {background: f.color} : {}}>
                                    {f.label}
                                </motion.button>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div initial={{scaleX: 0}} whileInView={{scaleX: 1}} viewport={{once: true}}
                                transition={{duration: 1.2, ease: [0.22, 1, 0.36, 1]}}
                                className="origin-left h-px relative overflow-hidden mb-16"
                                style={{background: "linear-gradient(90deg, #4CAF50, #6094ea, transparent)"}}>
                        <motion.div animate={{x: ["0%", "100%"]}}
                                    transition={{duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1}}
                                    className="absolute inset-0 w-1/3"
                                    style={{background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"}}/>
                    </motion.div>

                    <div className="relative pl-10">
                        <motion.div initial={{scaleY: 0}} whileInView={{scaleY: 1}} viewport={{once: true}}
                                    transition={{duration: 1.5, ease: [0.22, 1, 0.36, 1]}}
                                    className="absolute left-[15px] top-4 bottom-4 w-px origin-top"
                                    style={{background: "linear-gradient(to bottom, #4CAF50, #6094ea 50%, rgba(96,148,234,0.1))"}}/>
                        {filtered.map((item, i) => {
                            const tc = TRACK_COLORS[item.track];
                            return (
                                <motion.div key={`${item.year}-${i}`} initial={{opacity: 0, x: -36}}
                                            whileInView={{opacity: 1, x: 0}}
                                            viewport={{once: true, margin: "-50px"}} transition={{
                                    duration: 0.75,
                                    delay: Math.min(i * 0.07, 0.4),
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                            className="relative flex gap-7 pb-10 last:pb-0 group">
                                    <div
                                        className="absolute -left-[25px] top-[6px] w-6 h-6 rounded-full border-2 flex items-center justify-center z-10"
                                        style={{borderColor: tc.bg, background: isDark ? "#060608" : "#f0f4f8"}}>
                                        <motion.div className="w-2.5 h-2.5 rounded-full" style={{background: tc.bg}}
                                                    whileInView={{scale: [0, 1.5, 1]}} viewport={{once: true}}
                                                    transition={{
                                                        delay: 0.2 + Math.min(i * 0.07, 0.4),
                                                        duration: 0.45
                                                    }}/>
                                    </div>
                                    <motion.div whileHover={{x: 6}} transition={{duration: 0.2}}
                                                className={`flex-1 rounded-2xl border px-7 py-5 transition-all overflow-hidden relative ${isDark ? "bg-white/[0.025] border-white/[0.065] group-hover:border-white/[0.13]" : "bg-white/70 border-white/80 group-hover:border-white backdrop-blur-sm shadow-sm group-hover:shadow-lg"}`}>
                                        <motion.div className="absolute left-0 top-0 bottom-0 w-[3px]"
                                                    style={{background: tc.bg}}
                                                    initial={{scaleY: 0}} whileInView={{scaleY: 1}}
                                                    viewport={{once: true}} transition={{
                                            duration: 0.5,
                                            delay: 0.25 + Math.min(i * 0.07, 0.4)
                                        }}/>
                                        <div
                                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{background: `radial-gradient(200px at 0% 50%, ${tc.bg}10, transparent)`}}/>
                                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                                            <span className="text-2xl font-black tabular-nums"
                                                  style={{color: tc.bg}}>{item.year}</span>
                                            <span
                                                className={`font-bold text-[15px] tracking-tight leading-snug ${isDark ? "text-white/85" : "text-slate-800"}`}>{item.title}</span>
                                            <span
                                                className={`ml-auto text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full ${isDark ? "bg-white/[0.06] text-white/40" : "bg-black/[0.04] text-slate-400"}`}>{tc.label}</span>
                                        </div>
                                        <p className={`text-[13.5px] leading-[1.75] ${isDark ? "text-white/38" : "text-slate-500"}`}>{item.desc}</p>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className="relative w-full overflow-hidden">
                <SharedBG isDark={isDark}/>
                <div className="relative z-10 max-w-[1300px] mx-auto px-8 xl:px-12 py-28">
                    {/* Header */}
                    <div className="mb-16 space-y-5">
                        <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}}
                                    viewport={{once: true}} transition={{duration: 0.65}}
                                    className="flex items-center gap-3">
                            <motion.span animate={{opacity: [1, 0.2, 1], scale: [1, 1.5, 1]}}
                                         transition={{duration: 2, repeat: Infinity}}
                                         className="w-2 h-2 rounded-full bg-[#6094ea] inline-block"/>
                            <span
                                className={`font-mono text-[11px] tracking-[0.38em] uppercase ${isDark ? "text-[#6094ea]" : "text-[#4060b0]"}`}>Албаны бүтэц</span>
                            <div className={`w-14 h-px ${isDark ? "bg-white/10" : "bg-black/10"}`}/>
                        </motion.div>
                        <div style={{overflow: "hidden", lineHeight: 1}}>
                            <motion.h2
                                initial={{y: 40, opacity: 0}}
                                whileInView={{y: 0, opacity: 1}}
                                viewport={{once: true}}
                                transition={{duration: 0.9, ease: [0.16, 1, 0.3, 1]}}
                                style={{
                                    fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
                                    fontWeight: 900,
                                    lineHeight: 0.92,
                                    letterSpacing: "-0.03em",
                                    color: isDark ? "#fff" : "#080810"
                                }}
                            >
                                АЛБАНЫ{" "}
                                <span
                                    style={{
                                        backgroundImage: `linear-gradient(135deg,#378ADD, #378ADD55)`,
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        color: "transparent"
                                    }}
                                >
        БҮТЭЦ
    </span>
                            </motion.h2>
                        </div>
                        <motion.p initial={{opacity: 0, y: 12}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                                  transition={{duration: 0.7, delay: 0.2}}
                                  className={`text-[1rem] leading-relaxed max-w-xl ${isDark ? "text-white/40" : "text-slate-500"}`}>
                            Мэдээллийн технологи болон автоматжуулалтын хоёр үндсэн хэсгээс бүрдэх, мэргэшсэн
                            инженерүүдтэй нэгдсэн баг.
                        </motion.p>
                        <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}}
                                    transition={{delay: 0.4}}
                                    className="flex items-center gap-2">
                            <motion.div animate={{scale: [1, 1.9, 1], opacity: [0.9, 0, 0.9]}}
                                        transition={{duration: 2, repeat: Infinity}}
                                        className="w-1.5 h-1.5 rounded-full" style={{background: "#378ADD"}}/>
                            <span className="text-[10px] font-mono tracking-wider"
                                  style={{color: isDark ? "rgba(255,255,255,0.35)" : "#94a3b8"}}>
                                Дугуй дээр дарахад хийдэг ажлууд  харагдана
                            </span>
                        </motion.div>
                    </div>

                    {/* Two pillars */}
                    <div className="flex flex-col xl:flex-row gap-12 xl:gap-8 items-start justify-center">
                        <PillarSection label="Мэдээллийн технологийн IT хэсэг"
                                       sublabel="Information Technology Division"
                                       emoji="🌐" color="#378ADD" borderColor="#85B7EB" bgColor="#E6F1FB"
                                       glowColor="rgba(55,138,221,0.08)" total={IT_TOTAL_PEOPLE} nodes={IT_NODES}
                                       active={activeOrg} onToggle={toggleOrg} isDark={isDark} side="left"/>
                        <div className="hidden xl:block w-px self-stretch" style={{
                            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
                            marginTop: 28
                        }}/>
                        <PillarSection label="Автоматжуулалтын технологийн OT хэсэг"
                                       sublabel="Operational Technology Division"
                                       emoji="⚙️" color="#3B6D11" borderColor="#97C459" bgColor="#EAF3DE"
                                       glowColor="rgba(76,175,80,0.08)" total={OT_TOTAL_PEOPLE} nodes={OT_NODES}
                                       active={activeOrg} onToggle={toggleOrg} isDark={isDark} side="right"/>
                    </div>

                    {/* Bottom info */}
                    <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                                transition={{duration: 0.7, delay: 0.5}}
                                className="flex flex-wrap gap-4 justify-center mt-16 pt-8"
                                style={{borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`}}>
                        {[
                            {
                                icon: "⚙",
                                color: "#3B6D11",
                                bg: "#EAF3DE",
                                title: "Автоматжуулалт",
                                desc: "SCADA, PLC, насос станц,Программ хангамж"
                            },
                            {
                                icon: "📡",
                                color: "#185FA5",
                                bg: "#E6F1FB",
                                title: "Дата хяналт",
                                desc: "GPS, Телеметр, УТУТ,Нэг цэгийн систем"
                            },
                            {
                                icon: "🔒",
                                color: "#534AB7",
                                bg: "#EEEDFE",
                                title: "Сүлжээ & Кибер",
                                desc: "Шилэн кабель, камер,компьютер,Сүлжээ,Кибер аюулгүй байдал"
                            },
                        ].map((b, i) => (
                            <div key={i}
                                 className="flex items-center gap-3 px-5 py-3 rounded-xl flex-1 min-w-[180px] max-w-[260px]"
                                 style={{
                                     background: isDark ? "rgba(255,255,255,0.025)" : "#fff",
                                     border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}`
                                 }}>
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                     style={{background: b.bg}}>
                                    <span style={{fontSize: "16px"}}>{b.icon}</span>
                                </div>
                                <div>
                                    <p className="text-[12px] font-bold"
                                       style={{color: isDark ? "#fff" : "#080810"}}>{b.title}</p>
                                    <p className="text-[10px] mt-0.5"
                                       style={{color: isDark ? "rgba(255,255,255,0.4)" : "#64748b"}}>{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
            <section className="relative w-full overflow-hidden">
                <SharedBG isDark={isDark}/>
                <div className="relative mx-auto px-8 xl:px-12 py-20">
                    <motion.div initial={{opacity: 0, y: 16}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                                transition={{duration: 0.6}}
                                className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <motion.span animate={{opacity: [1, 0.2, 1], scale: [1, 1.5, 1]}}
                                         transition={{duration: 2, repeat: Infinity}}
                                         className="w-2 h-2 rounded-full bg-[#6094ea] inline-block"/>
                            <span
                                className={`font-mono text-[11px] tracking-[0.38em] uppercase ${isDark ? "text-[#6094ea]" : "text-[#4060b0]"}`}>Хүний нөөц</span>
                        </div>
                        <motion.h2
                            initial={{y: 40, opacity: 0}}
                            whileInView={{y: 0, opacity: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.9, ease: [0.16, 1, 0.3, 1]}}
                            style={{
                                fontSize: "clamp(1.2rem, 2.0vw, 4.5rem)",
                                fontWeight: 900,
                                lineHeight: 0.92,
                                letterSpacing: "-0.03em",
                                color: isDark ? "#fff" : "#080810"
                            }}
                        >
                            АЖИЛТНУУДЫН{" "}
                            <span
                                style={{
                                    backgroundImage: `linear-gradient(135deg,#378ADD, #378ADD55)`,
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text",
                                    color: "transparent"
                                }}
                            >
        ТООН МЭДЭЭЛЭЛ
    </span>
                        </motion.h2>
                    </motion.div>
                    <div className="grid gap-6 lg:grid-cols-4">
                        <Card className={cardBase}>
                            <div className="mb-4"><h3
                                className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Албаны
                                ажилчид</h3></div>
                            <div className="relative">
                                <ResponsiveContainer width="100%" height={180}>
                                    <AreaChart data={incidentsData}>
                                        <defs>
                                            <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#fb923c" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor={isDark ? "#7c2d12" : "#fed7aa"}
                                                      stopOpacity={0.1}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="age" stroke={isDark ? "#9ca3af" : "#4b5563"} fontSize={10}
                                               tickLine={false} axisLine={false}/>
                                        <YAxis hide/>
                                        <Tooltip contentStyle={{
                                            backgroundColor: isDark ? "#1f2937" : "#ffffff",
                                            border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                            color: isDark ? "#fff" : "#000"
                                        }}/>
                                        <Area type="monotone" dataKey="Ажилтаны тоо" stroke="#fb923c" strokeWidth={2}
                                              fill="url(#incidentGradient)"
                                              dot={(props: any) => {
                                                  const {cx, cy, value} = props;
                                                  if (!value) return <></>;
                                                  return <>
                                                      <circle cx={cx} cy={cy} r={4} fill="#fb923c"/>
                                                      <text x={cx} y={cy - 10} textAnchor="middle" fontSize={12}
                                                            fill={isDark ? "#fff" : "#000"}>{value}</text>
                                                  </>;
                                              }}/>
                                    </AreaChart>
                                </ResponsiveContainer>
                                <div className="absolute right-4 top-8 rounded-lg bg-orange-400 px-3 py-1.5"><p
                                    className="text-sm text-black font-bold">53</p></div>
                            </div>
                            <p className={`mt-2 text-center text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Он
                                цагийн дараалалаар</p>
                        </Card>
                        <Card className={cardBase}>
                            <div className="mb-4"><h3
                                className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Албан
                                тушаалын ангилал</h3><p
                                className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Нийт 53 ажилтан</p>
                            </div>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={warehouseData} cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                                         paddingAngle={2} dataKey="value">
                                        {warehouseData.map((entry, index) => <Cell key={`cell-${index}`}
                                                                                   fill={entry.color}/>)}
                                    </Pie>
                                    <Tooltip contentStyle={{
                                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                                        border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                        color: isDark ? "#fff" : "#000"
                                    }}/>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                {warehouseData.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 text-xs">
                                        <div className="h-3 w-3 rounded-full flex-shrink-0"
                                             style={{backgroundColor: item.color}}/>
                                        <span
                                            className={isDark ? "text-gray-400" : "text-gray-600"}>{item.name}: {item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card className={cardBase}>
                            <div className="mb-4"><h3
                                className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Хүйсийн
                                харьцаа</h3><p
                                className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Эрэгтэй /
                                Эмэгтэй</p></div>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={Gender} cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                                         paddingAngle={2} dataKey="value">
                                        {Gender.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color}/>)}
                                    </Pie>
                                    <Tooltip contentStyle={{
                                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                                        border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                        color: isDark ? "#fff" : "#000"
                                    }}/>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                {Gender.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 text-xs">
                                        <div className="h-3 w-3 rounded-full flex-shrink-0"
                                             style={{backgroundColor: item.color}}/>
                                        <span
                                            className={isDark ? "text-gray-400" : "text-gray-600"}>{item.name}: {item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card className={cardBase}>
                            <div className="mb-4"><h3
                                className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Насны
                                ангилал</h3></div>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={productionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                                         paddingAngle={2} dataKey="value">
                                        {productionData.map((entry, index) => <Cell key={`cell-${index}`}
                                                                                    fill={entry.color}/>)}
                                    </Pie>
                                    <Tooltip contentStyle={{
                                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                                        border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                        color: isDark ? "#fff" : "#000"
                                    }}/>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                {productionData.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 text-xs">
                                        <div className="h-3 w-3 rounded-full flex-shrink-0"
                                             style={{backgroundColor: item.color}}/>
                                        <span
                                            className={isDark ? "text-gray-400" : "text-gray-600"}>{item.name} нас: {item.value} хүн</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}