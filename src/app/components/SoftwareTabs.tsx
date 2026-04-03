import { AnimatePresence, motion } from "framer-motion";

export interface SoftwareCategory {
    key: string;
    title: string;
    shortLabel: string;
    count: number;
    description: string;
    accent: string;
    items: string[];
}

interface SoftwareTabsProps {
    categories: SoftwareCategory[];
    activeKey: string;
    onChange: (key: string) => void;
}

export default function SoftwareTabs({
    categories,
    activeKey,
    onChange,
}: SoftwareTabsProps) {
    const activeCategory =
        categories.find((category) => category.key === activeKey) ?? categories[0];

    if (!activeCategory) {
        return null;
    }

    return (
        <div className="col-span-12 lg:col-span-4 h-full">
            <div className="rounded-[3rem] border border-white/90 bg-white/60 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-[24px]">
                <div className="flex flex-wrap gap-2 rounded-[1.4rem] bg-slate-100/70 p-1.5">
                    {categories.map((category) => {
                        const isActive = category.key === activeKey;

                        return (
                            <button
                                key={category.key}
                                type="button"
                                onClick={() => onChange(category.key)}
                                className={`rounded-[1rem] px-4 py-2.5 text-left transition-all ${
                                    isActive ? "bg-white shadow-md" : "hover:bg-white/70"
                                }`}
                            >
                                <p
                                    className={`text-[9px] font-black uppercase tracking-[0.22em] ${
                                        isActive ? "text-slate-500" : "text-slate-400"
                                    }`}
                                >
                                    {category.shortLabel}
                                </p>
                                <p
                                    className={`mt-1 text-sm font-black ${
                                        isActive ? "text-slate-900" : "text-slate-500"
                                    }`}
                                >
                                    {category.count}
                                </p>
                            </button>
                        );
                    })}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.24 }}
                        className="mt-6"
                    >
                        <div
                            className="rounded-[2rem] px-5 py-4"
                            style={{ background: `${activeCategory.accent}12` }}
                        >
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                Идэвхтэй төрөл
                            </p>
                            <h3 className="mt-2 text-xl font-black text-slate-900">
                                {activeCategory.title}
                            </h3>
                            <p className="mt-2 text-[13px] leading-6 text-slate-600">
                                {activeCategory.description}
                            </p>
                        </div>

                        <div className="mt-5">
                            <div className="mb-3 flex items-center justify-between">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                    Програмын жагсаалт
                                </p>
                                <span className="text-[11px] font-semibold text-slate-500">
                                    {activeCategory.items.length} төрөл
                                </span>
                            </div>

                            <div className="max-h-[304px] space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                                {activeCategory.items.map((item, index) => (
                                    <motion.div
                                        key={`${activeCategory.key}-${item}`}
                                        initial={{ opacity: 0, x: 8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="flex items-center justify-between rounded-[1.4rem] border border-transparent bg-slate-50 px-4 py-3 hover:border-slate-200"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="w-5 text-[10px] font-black text-slate-300">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <span className="text-[12px] font-semibold text-slate-700">
                                                {item}
                                            </span>
                                        </div>
                                        <span
                                            className="h-8 w-1 rounded-full"
                                            style={{ background: `${activeCategory.accent}40` }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
