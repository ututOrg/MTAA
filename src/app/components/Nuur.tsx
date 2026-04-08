import {motion} from "framer-motion";
import {useOutletContext} from "react-router";
import {ArrowRightIcon} from "lucide-react"; // lucide-react ашиглав



export default function Nuur() {
    const {isDark} = useOutletContext<{ isDark: boolean }>();

    return (
        <section
            className={`relative w-full  flex items-center justify-center overflow-hidden snap-none transition-colors duration-700 ${
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
                            Танилцуулга
                        </motion.span>
                        <h2 className={`text-6xl md:text-8xl font-black text-align tracking-tighter leading-none transition-colors ${
                            isDark ? "text-white" : "text-slate-900"
                        }`}>
                            МЭДЭЭЛЛИЙН ТЕХНОЛОГИ, <br/>
                            <span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-[#6094ea]">
                                АВТОМАТЖУУЛАЛТЫН АЛБА
                            </span>
                        </h2>
                        <p className={`max-w-md text-base leading-relaxed ${isDark ? "text-slate-500" : "text-slate-600"}`}>
                            Байгууллагын дижитал шилжилтийг эрчимжүүлж, инновацид суурилсан өгөгдлийн сангийн
                            архитектур болон кибер аюулгүй байдлын цогц системийг нэвтрүүлнэ.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}