import { motion } from "framer-motion";

const items = [
    {
        title: "Ус түгээх ухаалаг систем (УТҮТ)",
        value: "342",
        color: "bg-blue-500",
    },
    {
        title: "Телеметр",
        value: "73",
        color: "bg-cyan-500",
    },
    {
        title: "Авто тээвэр хяналтын систем (GPS)",
        value: "113",
        color: "bg-teal-500",
    },
    {
        title: "Нэг цэгийн хяналтын систем",
        value: "164",
        color: "bg-green-500",
    },
];

export default function DataSection() {
    return (
        <section className="w-full min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-[#eef3f8] to-[#dfe7f1] relative overflow-hidden">

            {/* LEFT TITLE */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden md:block">
                <h1 className="text-5xl font-bold text-blue-900 leading-tight">
                    ДАТА <br /> ХЯНАЛТЫН <br /> СИСТЕМИЙН <br /> ХЭСЭГ
                </h1>
            </div>

            {/* MAIN */}
            <div className="max-w-[1100px] w-full relative">

                {/* CURVE LINE */}
                <svg
                    viewBox="0 0 500 800"
                    className="absolute left-1/2 -translate-x-1/2 h-full"
                >
                    <motion.path
                        d="M250 0 C 100 200, 400 400, 250 800"
                        stroke="url(#grad)"
                        strokeWidth="6"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                    />
                    <defs>
                        <linearGradient id="grad" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#22c55e" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* ITEMS */}
                <div className="space-y-24 relative z-10">

                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className={`flex items-center ${
                                i % 2 === 0 ? "justify-start" : "justify-end"
                            }`}
                        >

                            <div className="flex items-center gap-4 max-w-[400px]">

                                {/* DOT */}
                                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center shadow-lg`}>
                                    <div className="w-3 h-3 bg-white rounded-full" />
                                </div>

                                {/* CARD */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/80 backdrop-blur-xl px-6 py-4 rounded-xl shadow-xl border border-white/40"
                                >
                                    <p className="font-semibold text-gray-800">
                                        {item.title}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {item.value}
                                    </p>
                                </motion.div>

                            </div>

                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
}