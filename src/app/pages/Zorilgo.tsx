import {motion} from "framer-motion";
import {useOutletContext} from "react-router";

const objectives = [
    {
        id: "01",
        label: "IOT & AUTOMATION",
        title: "Мэдээллийн Технологи Автоматжуулалт",
        desc: "Үйлдвэрлэлийн OT болон IT дэд бүтцийг нэгдсэн системд холбож, бодит цагийн хяналтыг нэвтрүүлнэ.",
        status: "ACTIVE_NODE",
        color: "from-blue-500"
    },
    {
        id: "02",
        label: "SOFTWARE ARCHITECTURE",
        title: "Программ Хангамжийн Хөгжүүлэлт",
        desc: "СКАДА, GIS болон өгөгдлийн сангийн архитектурыг хөгжүүлж, байгууллагын дижитал шилжилтийг хариуцна.",
        status: "SYSTEM_READY",
        color: "from-purple-500"
    },
    {
        id: "03",
        label: "CYBER SECURITY",
        title: "Кибер Аюулгүй Байдал",
        desc: "Мэдээллийн аюулгүй байдлыг олон улсын стандартын дагуу хамгаалж, халдлагаас урьдчилан сэргийлнэ.",
        status: "ENCRYPTED",
        color: "from-emerald-500"
    }
];


export default function Zorilgo() {
    const {isDark} = useOutletContext<{ isDark: boolean }>();
    // 1. Өнгөний тогтмолуудыг зурагтай ижил болгох
    const bgMain = isDark ? "bg-[#020202]" : "bg-[#fcfcfd]";
    const textMain = isDark ? "text-white" : "text-slate-900";
    const cardBg = isDark ? "bg-white/[0.02] border-white/5 shadow-2xl" : "bg-white/80 border-slate-200";

    return (
        <section
            className={`relative flex flex-col items-center justify-center overflow-hidden py-10 transition-colors duration-700 ${bgMain}`}>
            {/* 🌌 ATMOSPHERIC LAYER - Зураг дээрх шиг гүн харанхуй эффект */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/30 blur-[120px]"/>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/30 blur-[120px]"/>
            <div className="absolute inset-0 pointer-events-none">
                {/* Зүүн дээрх цэнхэр гэрэл */}
                <div
                    className={`absolute top-0 left-[-10%] w-[800px] h-[800px] blur-[150px] rounded-full transition-opacity duration-1000 ${
                        isDark ? "bg-blue-900/20" : "bg-blue-200/20"
                    }`}/>

                {/* 🕸️ ПИН СУУРЬ (Dot Grid) - Зураг дээрх шиг маш нарийн */}
                <div
                    className={`absolute inset-0 transition-all duration-1000 ${isDark ? "opacity-20" : "opacity-[0.05]"}`}
                    style={{
                        backgroundImage: `radial-gradient(${isDark ? '#ffffff' : '#000000'} 0.5px, transparent 0.5px)`,
                        backgroundSize: "30px 30px"
                    }}
                />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                {/* HEADER */}
                <div className="text-center mb-32 space-y-6">
                    <motion.div
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full border backdrop-blur-md transition-all ${
                            isDark ? "border-white/10 bg-white/5" : "border-blue-500/10 bg-blue-500/5"
                        }`}
                    >
                        <span className="relative flex h-2 w-2">
                            <span
                                className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        </span>
                        <span
                            className={`text-[10px] font-mono tracking-[0.3em] uppercase ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                             Зорилго & Зорилт
                        </span>
                    </motion.div>

                    <h2 className={`text-6xl md:text-8xl font-bold tracking-tighter transition-colors ${textMain}`}>
                        ЗОРИЛГО <br/>
                        <span
                            className={`transition-opacity duration-700 font-light ${isDark ? "opacity-10" : "opacity-20"}`}>
                            STRATEGY
                        </span>
                    </h2>
                </div>

                {/* BENTO CARDS - Зураг дээрх шиг цэвэрхэн шилэн эффект */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {objectives.map((obj, idx) => (
                        <motion.div
                            key={obj.id}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: idx * 0.1, duration: 0.8}}
                            className={`group relative p-10 rounded-[2.5rem] border transition-all duration-500 ${cardBg} hover:border-blue-500/30`}
                        >
                            {/* Card Hover Glow */}
                            <div
                                className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${obj.color} to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}/>

                            <div className="relative z-10 space-y-8">
                                <div className="flex justify-between items-start">
                                    <div
                                        className={`text-[10px] font-mono px-3 py-1 rounded-full border transition-all ${
                                            isDark ? "text-blue-400 border-blue-500/20 bg-blue-500/5" : "text-blue-600 border-blue-200 bg-blue-50"
                                        }`}>
                                        {obj.label}
                                    </div>
                                    <span
                                        className={`text-[10px] font-mono ${isDark ? "text-white/20" : "text-slate-300"}`}>
                                        #{obj.id}
                                    </span>
                                </div>

                                <h3 className={`text-2xl font-semibold tracking-tight leading-tight ${textMain}`}>
                                    {obj.title}
                                </h3>

                                <p className={`text-sm leading-relaxed transition-colors ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                    {obj.desc}
                                </p>

                                <div
                                    className={`pt-6 flex items-center gap-3 border-t transition-colors ${isDark ? "border-white/5" : "border-slate-100"}`}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"/>
                                    <span
                                        className={`text-[9px] font-mono uppercase tracking-[0.2em] ${isDark ? "text-blue-400/60" : "text-blue-600/60"}`}>
                                        {obj.status}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
        ;
}