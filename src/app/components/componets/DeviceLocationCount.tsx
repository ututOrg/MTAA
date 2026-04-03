import React, {useEffect, useMemo, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "../ui/button";
import {DeviceLocationCount} from "./Data";

export default function DeviceCountsLayer({
                               open,
                               onClose,
                               accentColor,
                               totalLabel,
                               locations,
                           }: {
    open: boolean;
    onClose: () => void;
    accentColor: string;
    totalLabel: string;
    locations: DeviceLocationCount[];
}) {
    const [query, setQuery] = useState("");

    const totalFromData = useMemo(
        () => locations.reduce((sum, x) => sum + (Number.isFinite(x.cameras) ? x.cameras : 0), 0),
        [locations],
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const base = q
            ? locations.filter((x) => x.location.toLowerCase().includes(q))
            : locations.slice();
        base.sort((a, b) => b.cameras - a.cameras);
        return base;
    }, [locations, query]);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    useEffect(() => {
        if (!open) setQuery("");
    }, [open]);

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-[80] flex items-center justify-center p-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onMouseDown={onClose}
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        className="absolute inset-0"
                        style={{background: "rgba(15, 23, 42, 0.35)"}}
                    />

                    <motion.div
                        className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/70"
                        style={{
                            background: "rgba(255,255,255,0.72)",
                            backdropFilter: "blur(28px)",
                            WebkitBackdropFilter: "blur(28px)",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
                        }}
                        initial={{y: 18, scale: 0.985, opacity: 0}}
                        animate={{y: 0, scale: 1, opacity: 1}}
                        exit={{y: 10, scale: 0.99, opacity: 0}}
                        transition={{duration: 0.25, ease: [0.4, 0, 0.2, 1]}}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-bold tracking-[.2em] uppercase"
                                       style={{color: "#94a3b8"}}>
                                        Layer
                                    </p>
                                    <h3
                                        className="text-[22px] font-bold tracking-[.1em] "
                                        style={{color: "#0f172a"}}
                                    >
                                        Нийт төхөөрөмж
                                    </h3>
                                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                                        <span className="text-[12px] font-semibold" style={{color: "#64748b"}}>
                                            Нийт: <span className="font-black" style={{color: "#0f172a"}}>{totalLabel}</span>
                                        </span>
                                        <span className="text-[12px] font-semibold" style={{color: "#cbd5e1"}}>·</span>
                                        <span className="text-[12px] font-semibold" style={{color: "#64748b"}}>
                                            Байршлаар: <span className="font-black"
                                                             style={{color: "#0f172a"}}>{totalFromData}</span>
                                        </span>
                                        <span className="text-[12px] font-semibold" style={{color: "#cbd5e1"}}>·</span>
                                        <span className="text-[12px] font-semibold" style={{color: "#64748b"}}>
                                            {filtered.length} байршил
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onClose}
                                    className="rounded-xl border-white/70 bg-white/60 hover:bg-white"
                                >
                                    Хаах
                                </Button>
                            </div>

                            <div className="mt-5 flex items-center gap-3">
                                <div className="flex-1">
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Байршлаар хайх..."
                                        className="w-full h-10 rounded-xl border border-white/70 bg-white/70 px-3 text-[12px] font-semibold outline-none focus:ring-2"
                                        style={{
                                            color: "#0f172a",
                                            boxShadow: "0 8px 22px rgba(0,0,0,0.06)",
                                            // Tailwind's ring color isn't easily parameterized, so do it here.
                                            outlineColor: accentColor,
                                        }}
                                    />
                                </div>
                                <div className="h-10 w-[3px] rounded-full" style={{background: accentColor}}/>
                            </div>
                        </div>

                        <div className="px-6 pb-6">
                            <div
                                className="rounded-2xl border border-white/70 overflow-hidden"
                                style={{background: "rgba(255,255,255,0.55)"}}
                            >
                                <div
                                    className="grid grid-cols-[1fr_140px] gap-0 px-4 py-3 border-b border-white/70"
                                    style={{background: "rgba(255,255,255,0.6)"}}
                                >
                                    <span className="text-[10px] font-black tracking-[.18em] uppercase"
                                          style={{color: "#94a3b8"}}>
                                        Байршил
                                    </span>
                                    <span className="text-right text-[10px] font-black tracking-[.18em] uppercase"
                                          style={{color: "#94a3b8"}}>
                                        Камер
                                    </span>
                                </div>

                                <div className="max-h-[52vh] overflow-auto">
                                    {filtered.length === 0 ? (
                                        <div
                                            className="px-4 py-8 text-center text-[12px] font-semibold"
                                            style={{color: "#64748b"}}
                                        >
                                            Илэрц олдсонгүй.
                                        </div>
                                    ) : (
                                        filtered.map((row) => (
                                            <div
                                                key={row.location}
                                                className="grid grid-cols-[1fr_140px] gap-0 px-4 py-3 border-b border-black/[0.04] hover:bg-white/70 transition-colors"
                                            >
                                                <div className="min-w-0">
                                                    <p className="truncate text-[12px] font-bold"
                                                       style={{color: "#0f172a"}}>
                                                        {row.location}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span
                                                        className="inline-flex items-center justify-end min-w-[64px] px-2.5 py-1 rounded-xl text-[12px] font-black"
                                                        style={{background: accentColor + "18", color: "#0f172a"}}
                                                    >
                                                        {row.cameras}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <p className="mt-3 text-[11px] font-semibold" style={{color: "#94a3b8"}}>
                                Тайлбар: Энд байгаа байршлын жагсаалт нь placeholder байна. Жинхэнэ өгөгдөлтэй холбохоор `CAMERA_COUNTS_BY_LOCATION`-ийг солих хэрэгтэй.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}