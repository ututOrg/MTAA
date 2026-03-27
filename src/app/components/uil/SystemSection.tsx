import { motion } from "framer-motion";

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 },
};

export default function SystemSection() {
    return (
        <motion.section
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className=" fixed w-full min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-[#eef2f7] to-[#dfe7f1]"
        >
            <div className="max-w-[1200px] w-full space-y-12">

                {/* TITLE */}
                <motion.h2
                    variants={item}
                    className="text-center text-3xl md:text-4xl font-bold text-blue-900"
                >
                    СИСТЕМИЙН УДИРДЛАГА БОЛОН ПРОГРАММ ХАНГАМЖ
                </motion.h2>

                {/* GRID */}
                <div className="grid md:grid-cols-3 gap-10 items-center">

                    {/* LEFT */}
                    <motion.div variants={item} className="space-y-6">
                        <Card title="Автоматжуулалт – 29">
                            SCADA, PLC, WinCC, iFix
                        </Card>

                        <Card title="Программ – 50">
                            React, NodeJS, Java, DB
                        </Card>
                    </motion.div>

                    {/* CENTER */}
                    <motion.div
                        variants={item}
                        className="flex justify-center"
                    >
                        <motion.img
                            src="https://cdn-icons-png.flaticon.com/512/4712/4712100.png"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="w-[220px]"
                        />
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div variants={item} className="space-y-6">
                        <Card title="Системүүд">
                            ERP, GPS, HRM
                        </Card>

                        <Card title="Хөгжүүлэлт">
                            Internal apps, automation
                        </Card>
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
}

function Card({ title, children }: any) {
    return (
        <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="bg-white/70 backdrop-blur-xl p-5 rounded-xl shadow-lg"
        >
            <h3 className="font-semibold text-blue-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-700">{children}</p>
        </motion.div>
    );
}