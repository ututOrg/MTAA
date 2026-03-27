import { motion } from "framer-motion";

const data = [
    {
        year: "2011",
        title: "Хангамж үйлчилгээ",
        desc: "Мэдээллийн технологи автоматжуулалт",
        image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
    },
    {
        year: "2014",
        title: "Систем хөгжүүлэлт",
        desc: "Шинэ платформ нэвтрүүлсэн",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    },
    {
        year: "2017",
        title: "Хөгжил",
        desc: "Систем шинэчлэл",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
];
export default function TimelineSection() {
    return (
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#f8fafc]">

            {/* ===== SECTION 1 ===== */}
            <section className="h-screen snap-start flex items-center justify-center px-6">

                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-7xl"
                >
                    <div className="bg-white rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.1)] p-6">

                        {/* HEADER */}
                        <div className="mb-6">
                            <h1 className="text-5xl font-bold">2011</h1>
                            <p className="text-gray-500 mt-2">
                                Хангамж үйлчилгээ – Мэдээллийн технологи
                            </p>
                        </div>

                        {/* GRID */}
                        <div className="grid grid-cols-12 gap-6">

                            {/* LEFT */}
                            <div className="col-span-3 space-y-4">
                                <Card />
                                <Card />
                                <Card />
                            </div>

                            {/* CENTER */}
                            <div className="col-span-6 bg-gray-100 rounded-2xl h-[300px] flex items-center justify-center">
                                <span className="text-gray-400">Main Dashboard</span>
                            </div>

                            {/* RIGHT */}
                            <div className="col-span-3 space-y-4">
                                <Card />
                                <Card />
                            </div>

                        </div>

                    </div>
                </motion.div>
            </section>

            {/* ===== SECTION 2 ===== */}
            <section className="h-screen snap-start flex items-center justify-center px-6">

                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-7xl"
                >
                    <div className="bg-white rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.1)] p-6">

                        <h1 className="text-5xl font-bold">2014</h1>

                        <div className="grid grid-cols-3 gap-6 mt-6">
                            <Card />
                            <Card />
                            <Card />
                        </div>

                    </div>
                </motion.div>
            </section>

        </div>
    );
}
function Card() {
    return (
        <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Metric</p>
            <p className="text-2xl font-bold">96.5%</p>
        </div>
    );
}