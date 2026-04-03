import { motion } from "framer-motion";

const FONT_STACK = "'IBM Plex Sans', 'Segoe UI', 'Noto Sans', sans-serif";
const DISPLAY_STACK = "'Space Grotesk', 'IBM Plex Sans', 'Segoe UI', sans-serif";

const LOCAL_FONT_CSS = `
  .system-section,
  .system-section * {
    font-family: ${FONT_STACK};
    font-style: normal;
    font-synthesis: none;
  }

  .system-section .system-display {
    font-family: ${DISPLAY_STACK};
  }
`;

const OVERVIEW = {
  servers: 28,
  software: 79,
  streams: 2,
  description:
    "Байгууллагын хэмжээнд 28 сервер дээр 79 нэр төрлийн программ хангамжийн ашиглалт, хөгжүүлэлтийг хариуцан ажиллаж байна.",
};

type SystemCluster = {
  id: string;
  eyebrow: string;
  title: string;
  total: number;
  accent: string;
  tint: string;
  border: string;
  summary: string;
  statRows: Array<{ label: string; value: number }>;
  detailGroups: Array<{ label: string; items: string[] }>;
  platformLabels: string[];
};

const SYSTEM_CLUSTERS: SystemCluster[] = [
  {
    id: "automation",
    eyebrow: "Core 01",
    title: "Автоматжуулалтын программ хангамж",
    total: 29,
    accent: "#0f766e",
    tint: "linear-gradient(135deg, rgba(15,118,110,0.18), rgba(14,165,233,0.08))",
    border: "rgba(15,118,110,0.18)",
    summary:
      "Үйлдвэрлэлийн хяналт, станцын процесс, төхөөрөмжийн автоматикийг бодит горимд ажиллуулах үндсэн программын орчин.",
    statRows: [
      { label: "Хөгжүүлэлт", value: 13 },
      { label: "Ашиглалт", value: 16 },
    ],
    detailGroups: [
      {
        label: "SCADA программ хангамж",
        items: ["Citect Scada", "Simatic WinCC", "iFix", "Kwater"],
      },
      {
        label: "PLC программ хангамж",
        items: ["SoMachine HVAC", "Step7 S7-200", "ICP101"],
      },
    ],
    platformLabels: ["SCADA", "PLC", "HMI", "Telemetry"],
  },
  {
    id: "operations",
    eyebrow: "Core 02",
    title: "Үйл ажиллагаатай холбоотой программ хангамж",
    total: 50,
    accent: "#c2410c",
    tint: "linear-gradient(135deg, rgba(194,65,12,0.18), rgba(234,179,8,0.08))",
    border: "rgba(194,65,12,0.18)",
    summary:
      "Өдөр тутмын бүртгэл, мэдээллийн сан, тайлан, хөгжүүлэлтийн технологиудыг дэмждэг байгууллагын дотоод экосистем.",
    statRows: [
      { label: "Хөгжүүлэлт", value: 11 },
      { label: "Ашиглалт", value: 30 },
      { label: "Лиценз", value: 9 },
    ],
    detailGroups: [
      {
        label: "Дата бааз",
        items: ["MySQL", "MSSQL", "Oracle", "PostgreSQL", "Mongo DB"],
      },
      {
        label: "Хөгжүүлэлтийн стек",
        items: ["JavaScript", "PHP", "NodeJS", "HTML", "ReactJS"],
      },
    ],
    platformLabels: ["Database", "Backend", "Frontend", "Reporting"],
  },
];

const SUMMARY_CARDS = [
  {
    label: "Нийт сервер",
    value: String(OVERVIEW.servers).padStart(2, "0"),
    note: "Төвлөрсөн орчин",
  },
  {
    label: "Программ",
    value: String(OVERVIEW.software).padStart(2, "0"),
    note: "Нэр төрөл",
  },
  {
    label: "Үндсэн урсгал",
    value: String(OVERVIEW.streams).padStart(2, "0"),
    note: "Экосистемийн багц",
  },
];

export default function SystemSection() {
  return (
    <section className="system-section w-full px-4 py-3 sm:px-6 sm:py-4">
      <style>{LOCAL_FONT_CSS}</style>

      <div className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-[linear-gradient(180deg,#fcfcfb_0%,#f3f0e8_100%)] p-5 shadow-[0_22px_70px_rgba(15,23,42,0.08)] sm:p-6 lg:p-7">
        <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:22px_22px] opacity-40" />

        <div className="relative z-10 space-y-5">
          <div className="grid gap-4 lg:grid-cols-[1.45fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500">
                System Landscape
              </p>
              <h2 className="system-display mt-2 max-w-2xl text-2xl font-bold leading-tight text-slate-900 sm:text-[2rem]">
                Программ хангамжийн шинэ бүтэц, төвлөрсөн ангилал
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[14px]">
                {OVERVIEW.description}
              </p>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {SUMMARY_CARDS.map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className="rounded-[20px] border border-white/80 bg-white/75 px-4 py-3 backdrop-blur-md"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {card.label}
                  </p>
                  <p className="system-display mt-1.5 text-[28px] font-bold text-slate-950">
                    {card.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{card.note}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {SYSTEM_CLUSTERS.map((cluster, clusterIndex) => (
              <motion.article
                key={cluster.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: clusterIndex * 0.08 }}
                className="relative overflow-hidden rounded-[26px] border bg-white/78 p-4 backdrop-blur-xl sm:p-5"
                style={{ borderColor: cluster.border }}
              >
                <div
                  className="absolute inset-0 opacity-90"
                  style={{ background: cluster.tint }}
                />
                <div className="relative z-10 space-y-4">
                  <div className="flex flex-col gap-3 border-b border-slate-200/70 pb-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-lg">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                        {cluster.eyebrow}
                      </p>
                      <h3 className="mt-1.5 text-[22px] font-semibold leading-tight text-slate-950">
                        {cluster.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {cluster.summary}
                      </p>
                    </div>

                    <div className="min-w-[112px] rounded-[20px] bg-slate-950 px-4 py-3 text-white shadow-[0_20px_40px_rgba(15,23,42,0.18)]">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/60">
                        Нийт багц
                      </p>
                      <p className="system-display mt-1.5 text-[34px] font-bold">
                        {cluster.total}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 lg:grid-cols-[0.92fr_1.08fr]">
                    <div className="space-y-3">
                      <div className="rounded-[20px] bg-white/80 p-3.5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Үзүүлэлтүүд
                        </p>
                        <div className="mt-3 space-y-2.5">
                          {cluster.statRows.map((stat) => {
                            const width = `${Math.max((stat.value / cluster.total) * 100, 18)}%`;

                            return (
                              <div key={stat.label}>
                                <div className="flex items-center justify-between text-sm text-slate-600">
                                  <span>{stat.label}</span>
                                  <span className="system-display text-base font-semibold text-slate-900">
                                    {stat.value}
                                  </span>
                                </div>
                                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200/80">
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      width,
                                      background: `linear-gradient(90deg, ${cluster.accent}, rgba(15,23,42,0.7))`,
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded-[20px] bg-slate-950 p-3.5 text-white">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                          Платформ
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {cluster.platformLabels.map((label) => (
                            <span
                              key={label}
                              className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {cluster.detailGroups.map((group) => (
                        <div key={group.label} className="rounded-[20px] bg-white/80 p-3.5">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                            {group.label}
                          </p>
                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {group.items.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
