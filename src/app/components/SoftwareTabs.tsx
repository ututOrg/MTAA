import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. Data + type auto inference
const softwareData = {
    internal: {
        title: "Дотоод хөгжүүлэлт",
        count: 8,
        items: [
            "Санхүүгийн программ", "Хяналтын программ", "ArcGIS, Засвар үйлчилгээ",
            "ХХХМС программ", "LIMS программ", "ҮТҮТ программ", "GPS хяналт", "Хүний нөөц"
        ]
    },
    own: {
        title: "Өөрсдийн хөгжүүлсэн",
        count: 11,
        items: [
            "Гүйцэтгэлийн хяналт", "Цахим анкет", "Автомашины тооцоо бодолт",
            "Автомашин захиалга", "Диспетчерийн мэдээ", "Хууль дүрэм журам",
            "Цайны газрын программ", "Хангамжийн программ", "Техникийн нөхцөл",
            "Цаг бүртгэлийн программ", "Нэг цэгийн хяналт"
        ]
    }
} as const;

// 2. Tab type (auto)
type TabType = keyof typeof softwareData;

export default function SoftwareTabs() {
    // 3. зөв type
    const [activeTab, setActiveTab] = useState<TabType>("internal");

    // 4. dynamic tabs
    const tabs = Object.keys(softwareData) as TabType[];

    return (
        <div className="col-span-12 lg:col-span-4 h-full">
            <div className=" p-6 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col max-h-[500px]">

                {/* Tab Switching */}
                <div className="flex p-1.5 bg-slate-100/50 rounded-2xl mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeTab === tab
                                    ? "bg-white shadow-md text-indigo-600"
                                    : "text-slate-400"
                            }`}
                        >
                            {tab === "internal" ? "Дотоодын" : "Өөрсдийн"} ({softwareData[tab].count})
                        </button>
                    ))}
                </div>

                {/* Scrollable Area */}
                <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="max-h-[290px] overflow-y-auto pr-2 custom-scrollbar space-y-2"
                        >
                            {softwareData[activeTab].items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ backgroundColor: "#F1F5F9" }}
                                    className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black text-slate-300 w-4">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-[11px] font-bold text-slate-700">
                                            {item}
                                        </span>
                                    </div>
                                    <div className="w-1 h-4 bg-slate-200 rounded-full group-hover:bg-indigo-400" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress */}
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-[9px] font-black text-slate-400">
                    <div className="flex gap-1">
                        {tabs.map((tab) => (
                            <div
                                key={tab}
                                className={`w-4 h-1 rounded-full ${
                                    activeTab === tab ? "bg-indigo-500" : "bg-slate-200"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}