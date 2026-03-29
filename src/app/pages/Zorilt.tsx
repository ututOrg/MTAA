import {motion} from "framer-motion";
import {useOutletContext} from "react-router";
import {ArrowRightIcon} from "lucide-react"; // lucide-react ашиглав

const goals = [
    {title: "Автоматжуулалт", desc: "Дэд салбаруудын автомат ажиллагаанд оруулах бэлтгэлийг хангах"},
    {
        title: "Аюулгүй байдал",
        desc: "Мэдээллийн аюулгүй байдлын эрсдэлийн үнэлгээний зөвлөмжийн дагуу бодлого, дүрэм журмыг шинэчлэх"
    },
    {
        title: "Дижитал шилжилт",
        desc: "Байгууллагад сүүлийн үеийн техник технологи нэвтрүүлж, хиймэл оюун ухааныг үйл ажиллагаанд ашиглах"
    },
    {title: "Стандартчилал", desc: "MNS ISO 45001 стандартыг мөрдөж ажиллах"},
    {
        title: "Хяналт ба удирдлага",
        desc: "Төсөл хөтөлбөрүүдийн автоматжуулалт, IT ажлууд дээр хяналт тавин хүлээж авч хариуцан ажиллах"
    }
];

export default function Zorilt() {
    const {isDark} = useOutletContext<{ isDark: boolean }>();

    return (
        <section
            className={`relative w-full mt-5 flex items-center justify-center overflow-hidden transition-colors duration-700 ${
                isDark ? "bg-[#0a0a0a]" : "bg-[#fcfcfd]"
            }`}>

            {/* ATMOSPHERIC DECORATION (Glow and Text in background) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className={`absolute top-0 right-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] ${
                    isDark ? "bg-[#f02fc2]/10" : "bg-[#f02fc2]/5"
                }`}/>
                <div
                    className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? "opacity-20" : "opacity-[0.05]"}`}
                    style={{
                        backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 0.5px, transparent 0.5px)`,
                        backgroundSize: "40px 40px"
                    }}/>
                <motion.div initial={{y: 0}} animate={{y: [0, -20, 0]}}
                            transition={{duration: 10, repeat: Infinity}}
                            className="absolute bottom-20 left-20">
                    <p className={`text-[180px] font-black tracking-tighter ${isDark ? 'text-white/5' : 'text-slate-100'}`}>FUTURE</p>
                </motion.div>
            </div>

            <div
                className="relative z-10 max-w-[1500px] mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-12 gap-16 items-start">

                {/* LEFT SIDE: Typography & CTAs (Sticky Header) */}
                <div className="md:col-span-5 md:sticky md:top-32 space-y-16 py-12">
                    <div className="space-y-6">
                        <motion.span
                            initial={{opacity: 0}} animate={{opacity: 1}}
                            className="text-[#4CAF50] font-mono text-xs tracking-[0.4em] uppercase"
                        >
                            Next Generation Strategy
                        </motion.span>
                        <h2 className={`text-6xl md:text-8xl font-black tracking-tighter leading-none transition-colors ${
                            isDark ? "text-white" : "text-slate-900"
                        }`}>
                            ЦААШДЫН <br/>
                            <span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-[#6094ea]">
                                ЗОРИЛТ
                            </span>
                        </h2>
                        <p className={`max-w-md text-base leading-relaxed ${isDark ? "text-slate-500" : "text-slate-600"}`}>
                            Байгууллагын дижитал шилжилтийг эрчимжүүлж, инновацид суурилсан өгөгдлийн сангийн
                            архитектур болон кибер аюулгүй байдлын цогц системийг нэвтрүүлнэ.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE: Bio-Visual & Info Points */}
                <div className="md:col-span-7 space-y-8 relative">

                    {/* Жагсаалтын картууд (Glassmorphism) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {goals.map((goal, idx) => (
                            <motion.div
                                key={idx} initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}} transition={{delay: idx * 0.1, duration: 0.8}}
                                className={`group p-8 rounded-[2rem] border transition-all duration-500 ${
                                    isDark
                                        ? "bg-[#111111]/60 border-white/5 hover:bg-white/[0.04] hover:border-white/10 backdrop-blur-2xl"
                                        : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xl shadow-sm"
                                }`}
                            >
                                <div className="space-y-4 relative">
                                            <span
                                                className="text-transparent bg-clip-text bg-gradient-to-b from-[#4CAF50] to-[#6094ea]/20 font-bold text-5xl">0{idx + 1}</span>
                                    <h3 className={`text-xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-800"}`}>{goal.title}</h3>
                                    <p className={`text-sm leading-relaxed ${isDark ? "text-slate-500" : "text-slate-600"}`}>{goal.desc}</p>

                                    {/* Гэрэлтсэн холбогч шугам */}
                                    <div
                                        className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#4CAF50] shadow-[0_0_10px_rgba(240,47,194,1)] animate-pulse"/>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}