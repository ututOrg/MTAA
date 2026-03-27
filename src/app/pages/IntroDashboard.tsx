import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        title: "МЭДЭЭЛЛИЙН ТЕХНОЛОГИ, АВТОМАТЖУУЛАЛТ АЛБАНЫ",
        subtitle: "ТАНИЛЦУУЛГА",
        image: "/src/app/components/assets/blog_2.jpg",
    },
    {
        title: "ШИНЭ СИСТЕМ НЭВТРҮҮЛЭЛТ",
        subtitle: "МЭДЭЭЛЭЛ",
        image: "/src/app/components/assets/alba.jpg",
    },
];

export default function IntroDashboard({ isDark }: { isDark: boolean }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const prev = () =>
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);

    const next = () =>
        setIndex((prev) => (prev + 1) % slides.length);

    return (
        <div className="w-full mt-4">

            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 h-auto md:h-[420px]">

                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className={`relative md:absolute inset-0 transition-all duration-700 ${
                            i === index ? "opacity-100 z-10" : "opacity-0 hidden md:block"
                        }`}
                    >

                        {/* 🔥 TEXT (unchanged) */}
                        <div className="relative z-10 w-full md:w-1/2 flex items-center p-6 md:p-12">

                            <div className="bg-black/1 ">

                                <p className={`text-xs uppercase tracking-widest  ${!isDark? 'text-black/60' :'text-white/60' }`}>
                                    Танилцуулга
                                </p>

                                <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl ${!isDark? 'text-black/60' :'text-white' } font-semibold leading-snug  mt-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]`}>
                                    МЭДЭЭЛЛИЙН ТЕХНОЛОГИ, <br />
                                    АВТОМАТЖУУЛАЛТ АЛБА
                                </h1>

                                <p className={`text-sm md:text-base ${!isDark? 'text-black/80' :'text-white' } mt-4 leading-relaxed`}>
                                   <i>Мэдээллийн технологи, автоматжуулалт алба нь байгууллагын
                                    мэдээллийн технологийн бүхий л үйл ажиллагааг зохион байгуулж,
                                    хэрэгжүүлэх үүрэгтэй.</i>
                                </p>

                                <p className={`text-sm md:text-base ${!isDark? 'text-black/80' :'text-white' } mt-2 leading-relaxed`}>
                                    <i> Ус хангамжийн байгууллагын дижитал шилжилт, найдвартай ажиллагааг 24/7 хангах,
                                        автоматжуулалт, дата төвийн иж бүрэн шийдэл.</i>
                                </p>

                            </div>
                        </div>

                        {/* 🔥 IMAGE WRAPPER (FIXED) */}
                        <div className="relative md:absolute md:right-0 md:top-0 md:h-full md:w-1/2">

                            {/* IMAGE */}
                            <img
                                src={slide.image}
                                className="
                  w-full h-[200px] object-cover mt-2
                  md:mt-0 md:h-full md:w-full
                  rounded-b-2xl md:rounded-b-none md:rounded-r-2xl
                "
                            />

                            {/* ⬅ LEFT (NOW ON IMAGE) */}
                            <button
                                onClick={prev}
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-20
                bg-white/20 backdrop-blur-md rounded-full p-2 hover:scale-110 transition"
                            >
                                <ChevronLeft />
                            </button>

                            {/* ➡ RIGHT */}
                            <button
                                onClick={next}
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-20
   bg-white/20 backdrop-blur-md rounded-full p-2 hover:scale-110 transition"
                            >
                                <ChevronRight />
                            </button>

                        </div>

                        {/* 🔥 DESKTOP FADE (unchanged) */}
                        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/30 via-black/5 to-transparent" />

                    </div>
                ))}

                {/* DOTS (unchanged) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-2 w-2 rounded-full ${
                                i === index ? "bg-white" : "bg-white/40"
                            }`}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}