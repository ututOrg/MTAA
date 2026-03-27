import { motion } from "framer-motion";
import {useOutletContext} from "react-router";
const data = [
    {
        year: "2006",
        title: "Шуурхай зохицуулалтын албаны \n" +
            "Мэдээллийн технологи автоматжуулалтын хэсэг\n" +
            "\n",
        tasks: [
            "Мэдээллийн технологи автоматжуулалтын хэсэг байгуулагдсан",
            "Дотоод сүлжээ нэвтрүүлсэн",
            "Системийн суурь тавигдсан",
        ],
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    },
    {
        year: "2011",
        title: "Хангамж үйлчилгээний албаны \n" +
            "Мэдээллийн технологи автоматжуулалтын хэсэг\n" +
            "\n",
        tasks: [
            "Автоматжуулалтын систем өргөжсөн",
            "Шинэ серверүүд нэвтрүүлсэн",
            "Дата удирдлага сайжирсан",
        ],
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    },
    {
        year: "2013",
        title: "Мэдээллийн технологи автоматжуулалтын нэгж\n" +
            "\n",
        tasks: [
            "Шинэ платформ нэвтрүүлсэн",
            "Дотоод системүүд холбогдсон",
            "Хяналтын систем сайжирсан",
        ],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
        year: "2014",
        title: "Үйл ажиллагааны зохицуулалтыг албаны\n" +
            " Мэдээллийн технологи автоматжуулалтын нэгж\n",
        tasks: [
            "Шинэ платформ нэвтрүүлсэн",
            "Дотоод системүүд холбогдсон",
            "Хяналтын систем сайжирсан",
        ],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
        year: "2015",
        title: "Засварын нэгдсэн албаны \n" +
            "Цахилгаан автоматикийн хэсэг \n" +
            "\n",
        tasks: [
            "Шинэ платформ нэвтрүүлсэн",
            "Дотоод системүүд холбогдсон",
            "Хяналтын систем сайжирсан",
        ],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
        year: "2017",
        title: "Мэдээллийн технологи автоматжуулалтын нэгж\n" +
            "\n",
        tasks: [
            "Шинэ платформ нэвтрүүлсэн",
            "Дотоод системүүд холбогдсон",
            "Хяналтын систем сайжирсан",
        ],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
        year: "2025",
        title: "Мэдээллийн технологи автоматжуулалтын алба\n" +
            "\n",
        tasks: [
            "Шинэ платформ нэвтрүүлсэн",
            "Дотоод системүүд холбогдсон",
            "Хяналтын систем сайжирсан",
        ],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
];

export default function FullMapDashboard() {
    const { isDark } = useOutletContext<{ isDark: boolean }>();
    return (
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-auto">

            {data.map((item, i) => (
                <section
                    key={i}
                    className="h-screen snap-start relative overflow-hidden text-white"
                >
                    {/*<div className="w-full h-[500px] rounded-3xl overflow-hidden flex bg-[#f4f6fa]">*/}

                    {/*    /!* LEFT TEXT *!/*/}
                    {/*    <div className="w-1/2 p-12 flex flex-col justify-center">*/}
                    {/*        <p className="text-sm text-gray-500 mb-2">ТАНИЛЦУУЛГА</p>*/}

                    {/*        <h1 className="text-3xl font-semibold text-gray-800 leading-snug">*/}
                    {/*            МЭДЭЭЛЛИЙН ТЕХНОЛОГИ,*/}
                    {/*            <br />*/}
                    {/*            АВТОМАТЖУУЛАЛТ АЛБА*/}
                    {/*        </h1>*/}

                    {/*        <p className="text-gray-500 mt-4 leading-relaxed">*/}
                    {/*            Мэдээллийн технологи, автоматжуулалт алба нь байгууллагын*/}
                    {/*            мэдээллийн технологийн бүхий л үйл ажиллагааг зохион байгуулж,*/}
                    {/*            хэрэгжүүлж ажилладаг.*/}
                    {/*        </p>*/}
                    {/*    </div>*/}

                    {/*    /!* RIGHT IMAGE *!/*/}
                    {/*    <div className="w-1/2 relative">*/}
                    {/*        <motion.img*/}
                    {/*            src={item.image}*/}
                    {/*            initial={{ scale: 1.1 }}*/}
                    {/*            whileInView={{ scale: 1 }}*/}
                    {/*            transition={{ duration: 1 }}*/}
                    {/*            className="w-full h-full object-cover"*/}
                    {/*        />*/}

                    {/*        /!* OPTIONAL overlay *!/*/}
                    {/*        <div className="absolute inset-0 bg-black/10" />*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                    {/* ===== BACKGROUND ===== */}
                    <motion.img
                        src={item.image}
                        initial={{ scale: 1.2 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* OVERLAY */}
                    {/*<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />*/}

                    {/* ===== CONTENT ===== */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

                        {/* YEAR */}
                        <motion.h1
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-6xl md:text-7xl font-bold"
                        >
                            {item.year}
                        </motion.h1>

                        {/* TITLE */}
                        <motion.h2
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-xl md:text-2xl font-semibold"
                        >
                            {item.title}
                        </motion.h2>

                        {/* TASK LIST 🔥 */}
                        <motion.ul
                            initial="hidden"
                            whileInView="show"
                            variants={{
                                hidden: {},
                                show: {
                                    transition: {
                                        staggerChildren: 0.15,
                                    },
                                },
                            }}
                            className="mt-6 space-y-3 text-white/80 text-left max-w-xl"
                        >
                            {item.tasks.map((task, index) => (
                                <motion.li
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, x: -30 },
                                        show: { opacity: 1, x: 0 },
                                    }}
                                    className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-md"
                                >
                                    <span className="mt-1 w-2 h-2 bg-blue-400 rounded-full"></span>
                                    {task}
                                </motion.li>
                            ))}
                        </motion.ul>

                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

                    {/* ===== SCROLL HINT 🔥 ===== */}
                    <ScrollHint />
                </section>
            ))}

        </div>
    );
}

function ScrollHint() {
    return (
        <div className="absolute bottom-35 right-6 flex flex-col items-center z-20">
            <p className="text-white/60 text-xs mb-1 rotate-90 origin-right">
                Scroll
            </p>

            {/* Arrow */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-6 h-10 border border-white/40 rounded-full flex justify-center"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-1 h-2 bg-red-700 rounded-full mt-1"
                />
            </motion.div>

        </div>
    );
}