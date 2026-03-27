import { Card } from '../components/ui/card';
import { Package, Truck, MapPin, Clock } from 'lucide-react';
import { motion } from "framer-motion";
import { useOutletContext } from 'react-router';

const deliveryData = [
    { month: 'Aug', onTime: 320, delayed: 25 },
    { month: 'Sep', onTime: 380, delayed: 18 },
    { month: 'Oct', onTime: 420, delayed: 22 },
    { month: 'Nov', onTime: 450, delayed: 15 },
    { month: 'Dec', onTime: 390, delayed: 12 },
    { month: 'Jan', onTime: 440, delayed: 20 },
    { month: 'Feb', onTime: 480, delayed: 10 },
];

const warehouseData = [
    { name: 'Warehouse A', value: 35, color: '#a3e635' },
    { name: 'Warehouse B', value: 25, color: '#3b82f6' },
    { name: 'Warehouse C', value: 20, color: '#fb923c' },
    { name: 'Warehouse D', value: 20, color: '#a855f7' },
];

const stats = [
    {
        icon: Package,
        label: 'Active Shipments',
        value: '1,248',
        change: '+12.5%',
        color: 'text-lime-400',
    },
    {
        icon: Truck,
        label: 'Delivery Rate',
        value: '98.2%',
        change: '+3.2%',
        color: 'text-blue-400',
    },
    {
        icon: MapPin,
        label: 'Warehouses',
        value: '24',
        change: '+2 new',
        color: 'text-purple-400',
    },
    {
        icon: Clock,
        label: 'Avg. Delivery Time',
        value: '2.8 days',
        change: '-0.5 days',
        color: 'text-orange-400',
    },
];

export default function Logistics() {
    const { isDark } = useOutletContext<{ isDark: boolean }>();

    return (
        <div className="space-y-8">
            {/* Page Header */}
            {/*<div className="space-y-2">*/}
            {/*    <h1 className={`text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Logistics Dashboard</h1>*/}
            {/*    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Track shipments and warehouse operations</p>*/}
            {/*</div>*/}

            {/*/!* Stats Cards *!/*/}
            {/*<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">*/}
            {/*    {stats.map((stat, index) => {*/}
            {/*        const Icon = stat.icon;*/}
            {/*        return (*/}
            {/*            <Card*/}
            {/*                key={index}*/}
            {/*                className={`p-6 backdrop-blur-sm ${*/}
            {/*                    isDark*/}
            {/*                        ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'*/}
            {/*                        : 'border-gray-200 bg-white shadow-sm'*/}
            {/*                }`}*/}
            {/*            >*/}
            {/*                <div className="flex items-start justify-between">*/}
            {/*                    <div>*/}
            {/*                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>*/}
            {/*                        <p className={`mt-2 text-3xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>*/}
            {/*                        <p className="mt-1 text-xs text-green-400">{stat.change}</p>*/}
            {/*                    </div>*/}
            {/*                    <Icon className={`h-8 w-8 ${stat.color}`} />*/}
            {/*                </div>*/}
            {/*            </Card>*/}
            {/*        );*/}
            {/*    })}*/}
            {/*</div>*/}

            {/*/!* Charts Grid *!/*/}
            {/*<div className="grid gap-6 lg:grid-cols-2">*/}
            {/*    /!* Delivery Performance *!/*/}
            {/*    <Card className={`p-6 backdrop-blur-sm ${*/}
            {/*        isDark*/}
            {/*            ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'*/}
            {/*            : 'border-gray-200 bg-white shadow-sm'*/}
            {/*    }`}>*/}
            {/*        <div className="mb-4 flex items-center justify-between">*/}
            {/*            <div>*/}
            {/*                <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Delivery Performance</h3>*/}
            {/*                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>On-time vs Delayed deliveries</p>*/}
            {/*            </div>*/}
            {/*            <button className={`rounded-lg px-3 py-1.5 text-xs ${*/}
            {/*                isDark*/}
            {/*                    ? 'bg-white/5 text-gray-300 hover:bg-white/10'*/}
            {/*                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'*/}
            {/*            }`}>*/}
            {/*                7 months ▼*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*        <ResponsiveContainer width="100%" height={280}>*/}
            {/*            <BarChart data={deliveryData}>*/}
            {/*                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff15' : '#e5e7eb'} />*/}
            {/*                <XAxis dataKey="month" stroke={isDark ? '#9ca3af' : '#4b5563'} fontSize={11} />*/}
            {/*                <YAxis stroke={isDark ? '#9ca3af' : '#4b5563'} fontSize={11} />*/}
            {/*                <Tooltip*/}
            {/*                    contentStyle={{*/}
            {/*                        backgroundColor: isDark ? '#1f2937' : '#ffffff',*/}
            {/*                        border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',*/}
            {/*                        borderRadius: '8px',*/}
            {/*                        color: isDark ? '#fff' : '#000',*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*                <Bar dataKey="onTime" stackId="a" fill="#a3e635" radius={[0, 0, 0, 0]} />*/}
            {/*                <Bar dataKey="delayed" stackId="a" fill="#fb923c" radius={[4, 4, 0, 0]} />*/}
            {/*            </BarChart>*/}
            {/*        </ResponsiveContainer>*/}
            {/*        <div className="mt-4 flex items-center justify-center gap-6 text-xs">*/}
            {/*            <div className="flex items-center gap-2">*/}
            {/*                <div className="h-2.5 w-2.5 rounded-full bg-lime-400"></div>*/}
            {/*                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>On Time</span>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center gap-2">*/}
            {/*                <div className="h-2.5 w-2.5 rounded-full bg-orange-400"></div>*/}
            {/*                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Delayed</span>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </Card>*/}

            {/*    /!* Warehouse Distribution *!/*/}
            {/*    <Card className={`p-6 backdrop-blur-sm ${*/}
            {/*        isDark*/}
            {/*            ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'*/}
            {/*            : 'border-gray-200 bg-white shadow-sm'*/}
            {/*    }`}>*/}
            {/*        <div className="mb-4 flex items-center justify-between">*/}
            {/*            <div>*/}
            {/*                <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Warehouse Distribution</h3>*/}
            {/*                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Inventory allocation by location</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="flex items-center justify-center">*/}
            {/*            <ResponsiveContainer width="100%" height={280}>*/}
            {/*                <PieChart>*/}
            {/*                    <Pie*/}
            {/*                        data={warehouseData}*/}
            {/*                        cx="50%"*/}
            {/*                        cy="50%"*/}
            {/*                        innerRadius={60}*/}
            {/*                        outerRadius={100}*/}
            {/*                        paddingAngle={2}*/}
            {/*                        dataKey="value"*/}
            {/*                    >*/}
            {/*                        {warehouseData.map((entry, index) => (*/}
            {/*                            <Cell key={`cell-${index}`} fill={entry.color} />*/}
            {/*                        ))}*/}
            {/*                    </Pie>*/}
            {/*                    <Tooltip*/}
            {/*                        contentStyle={{*/}
            {/*                            backgroundColor: isDark ? '#1f2937' : '#ffffff',*/}
            {/*                            border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',*/}
            {/*                            borderRadius: '8px',*/}
            {/*                            color: isDark ? '#fff' : '#000',*/}
            {/*                        }}*/}
            {/*                    />*/}
            {/*                </PieChart>*/}
            {/*            </ResponsiveContainer>*/}
            {/*        </div>*/}
            {/*        <div className="mt-4 grid grid-cols-2 gap-3">*/}
            {/*            {warehouseData.map((item, index) => (*/}
            {/*                <div key={index} className="flex items-center gap-2 text-xs">*/}
            {/*                    <div*/}
            {/*                        className="h-3 w-3 rounded-full"*/}
            {/*                        style={{ backgroundColor: item.color }}*/}
            {/*                    ></div>*/}
            {/*                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>*/}
            {/*      {item.name}: {item.value}%*/}
            {/*    </span>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </Card>*/}
            {/*</div>*/}
            <section
                className={`relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden px-4 ${
                    isDark
                        ? "bg-gradient-to-br from-[#020617] via-[#0f172a] to-black"
                        : "bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#fdf2f8]"
                }`}
            >

                {/* BACKGROUND GLOW */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-400/30 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/30 blur-[120px]" />

                {/* DOT GRID */}
                <div className="absolute left-0 top-0 w-[300px] h-[300px] bg-[radial-gradient(circle,_#cbd5e1_1px,_transparent_1px)] bg-[size:20px_20px] opacity-30" />

                {/* MAIN CONTENT */}
                <div className="relative z-10 max-w-[1200px] w-full px-6 grid md:grid-cols-2 gap-16 items-center">

                    {/* LEFT IMAGE */}
                    <div className="flex justify-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                            className="w-[260px] md:w-[320px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.25)]"
                        />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="space-y-10">

                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
                            ЗОРИЛГО
                        </h2>

                        <Step
                            number="1"
                            color="text-yellow-500"
                            title="МЭДЭЭЛЛИЙН ТЕХНОЛОГИ АВТОМАТЖУУЛАЛТ"
                            desc="Мэдээллийн технологи, автоматжуулалтын алба нь байгууллагын хэмжээнд мэдээллийн технологи (IT), үйлдвэрлэлийн технологийн (OT) шийдлүүдийг нэвтрүүлж, ашиглалт, хөгжүүлэлт, засвар үйлчилгээг хариуцан ажиллана."
                        />

                        <Step
                            number="2"
                            color="text-green-500"
                            title="ХУУЛЬ, ДҮРЭМ ЖУРАМ"
                            desc="Албаны үйл ажиллагаа нь Төрийн болон орон нутгийн өмчийн тухай хууль, Нягтлан бодох бүртгэлийн тухай хууль, Харилцаа холбооны тухай хууль, Мэдээллийн ил тод байдал ба мэдээлэл авах эрхийн тухай хууль, Кибер аюулгүй байдлын тухай хууль, Кибер аюулгүй байдлыг хангах нийтлэг журам болон Ус сувгийн удирдах газрын дотоод дүрэм, журмын хүрээнд ажиллана."
                        />

                        <Step
                            number="3"
                            color="text-teal-500"
                            title="ПРОГРАММ ХАНГАМЖ, КИБЕР АЮУЛГҮЙ БАЙДАЛ"
                            desc="Алба нь СКАДА, GIS, GPS систем, программ хангамж, сервер, өгөгдлийн сан, шилэн кабель, холбоо, сүлжээ, хяналтын камер болон кибер аюулгүй байдлын дэд бүтцийг бүрэн хариуцаж, байгууллагын мэдээллийн технологийн аюулгүй, найдвартай, тасралтгүй ажиллагааг хангаж ажиллана."
                        />

                    </div>
                </div>

            </section>
        </div>
    );
}
function Tag({ text, className }: any) {
    return (
        <div
            className={`absolute ${className} bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs shadow`}
        >
            {text}
        </div>
    );
}

function Step({ number, title, desc, color }: any) {
    return (
        <div className="flex gap-6 items-start">

            {/* NUMBER */}
            <div className={`text-6xl font-bold ${color} relative`}>
                {number}

                {/* SHADOW */}
                <div className="absolute top-2 left-2 text-black/10">
                    {number}
                </div>
            </div>

            {/* TEXT */}
            <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                    {desc}
                </p>
            </div>

        </div>
    );
}