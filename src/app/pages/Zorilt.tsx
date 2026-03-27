import { motion } from "framer-motion";
import { useOutletContext } from "react-router";

const data = [
    "Цэг салбаруудын автомат ажиллагаанд оруулах бэлтгэлийг хангах, нэвтрэлт, дохиолол, хамгаалалтын систем нэвтрүүлэх\n",
    "Мэдээллийн аюулгүй байдлын эрсдэлийн үнэлгээний зөвлөмжийн дагуу мэдээллийн аюулгүй байдлын бодлого, дүрэм журмыг шинэчилж боловсруулж хэрэгжүүлэх\n",
    "Байгууллагад сүүлийн үеийн дэвшилтэд техник технологи нэвтрүүлж санхүүгийн хэмнэлт гаргаж, хиймэл оюун ухааныг үйл ажиллагаанд нэвтрүүлэх \n",
    "Хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн менежментийн тогтолцооны MNS ISO 45001 стандартыг мөрдөж, программын ашиглалт, шинэчлэлтийг хийж ажиллах\n",
    "Байгууллага дээр хэрэгжиж байгаа төсөл хөтөлбөрүүдийн автоматжуулалт, программ хангамж мэдээллийн технологийн ажлууд дээр хяналт тавин хүлээж авч хариуцан ажиллах\n",
];

export default function Zorilt() {
    const { isDark } = useOutletContext<{ isDark: boolean }>();

    return (
        <section
            className={`relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden px-4 ${
                isDark
                    ? "bg-gradient-to-br from-[#020617] via-[#0f172a] to-black"
                    : "bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#fdf2f8]"
            }`}
        >
            {/* GLOW */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/30 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/30 blur-[120px]" />

            {/* CONTENT */}
            <div className="relative z-10 w-full max-w-[1200px] grid md:grid-cols-2 gap-16 items-center">

                {/* LEFT */}
                <div className="flex justify-center">
                    <motion.img
                        src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="w-[220px] md:w-[300px]"
                    />
                </div>

                {/* RIGHT */}
                <div className="space-y-10">

                    <h2
                        className={`text-3xl md:text-4xl font-bold ${
                            isDark
                                ? "bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
                                : "bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text"
                        }`}
                    >
                        ЦААШДЫН ЗОРИЛТ
                    </h2>

                    <div className="space-y-5">

                        {data.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 80 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="flex gap-6 items-start"
                            >
                                {/* ===== TIMELINE ===== */}
                                <div className="flex flex-col items-center">

                                    {/* DOT */}
                                    <motion.div
                                        animate={{ scale: [1, 1.4, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.9)]"
                                    />

                                    {/* LINE */}
                                    {i !== data.length - 1 && (
                                        <div className="relative w-[2px] h-24 bg-white/10 overflow-hidden mt-1">
                                            <motion.div
                                                animate={{ y: ["-100%", "100%"] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className="absolute w-full h-[200%] bg-gradient-to-b from-blue-400 via-purple-400 to-transparent"
                                            />
                                        </div>
                                    )}

                                </div>

                                {/* ===== CARD ===== */}
                                <motion.div
                                    whileHover={{ scale: 1.04, y: -4 }}
                                    className={`rounded-xl px-6 py-4 transition-all w-full ${
                                        isDark
                                            ? "bg-white/5 border border-white/10 backdrop-blur-xl text-white"
                                            : "bg-white/70 border border-gray-200 shadow-lg text-gray-800"
                                    }`}
                                >
                                    {item}
                                </motion.div>
                            </motion.div>
                        ))}

                    </div>

                </div>
            </div>
        </section>
    );
}