import { Card } from './ui/card';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, LineChart, CartesianGrid, Line,
} from 'recharts';



const metricsData = [
    {
        title: 'Procurement Decisions',
        automated: 72,
        manual: 28,
    },
    {
        title: 'Maintenance Triggering',
        automated: 88,
        manual: 12,
    },
];

const productionData = [
    { age: '18-25',  efficiency: 7 },
    { age: '26-35', efficiency: 19 },
    { age: '36-45', efficiency: 22 },
    { age: '45-с дээш',  efficiency: 3 },
];

const warehouseData = [
    { name: 'Удирдлага', value: 1, color: '#a3e635' },
    { name: 'Инженер', value: 26, color: '#3b82f6' },
    { name: 'Албан хаагч', value: 3, color: '#fb923c' },
    { name: 'Техникч', value: 15, color: '#a855f7' },
    { name: 'Засварчин', value: 11, color: '#ff0000' },
];

export function DarkMetricsCards({ isDark }: { isDark: boolean }) {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/*<Card*/}
            {/*    className={`p-6 backdrop-blur-sm ${*/}
            {/*        isDark*/}
            {/*            ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'*/}
            {/*            : 'border-gray-200 bg-white shadow-sm'*/}
            {/*    }`}*/}
            {/*>*/}
            {/*    <div className="mb-4 flex items-center justify-between">*/}
            {/*        <h3*/}
            {/*            className={`text-sm ${*/}
            {/*                isDark ? 'text-white' : 'text-gray-900'*/}
            {/*            }`}*/}
            {/*        >*/}
            {/*            Албаны нийт ажилтан*/}
            {/*        </h3>*/}
            {/*        <button*/}
            {/*            className={`text-xs ${*/}
            {/*                isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'*/}
            {/*            }`}*/}
            {/*        >*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*    <div className="grid grid-cols-2 gap-3">*/}
            {/*        <div*/}
            {/*            className={`rounded-2xl border-4 border-lime-400 p-6 text-center ${*/}
            {/*                isDark ? 'bg-gradient-to-br from-white/10 to-white/5' : 'bg-gradient-to-br from-green-50 to-white'*/}
            {/*            }`}*/}
            {/*        >*/}
            {/*            <p*/}
            {/*                className={`text-3xl ${*/}
            {/*                    isDark ? 'text-white' : 'text-gray-900'*/}
            {/*                }`}*/}
            {/*            >*/}
            {/*                56*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <div*/}
            {/*            className={`rounded-2xl border-4 border-orange-400 p-6 text-center ${*/}
            {/*                isDark ? 'bg-gradient-to-br from-white/10 to-white/5' : 'bg-gradient-to-br from-orange-50 to-white'*/}
            {/*            }`}*/}
            {/*        >*/}
            {/*            <p*/}
            {/*                className={`text-3xl ${*/}
            {/*                    isDark ? 'text-white' : 'text-gray-900'*/}
            {/*                }`}*/}
            {/*            >*/}
            {/*                1*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <div*/}
            {/*            className={`rounded-2xl border-4 border-orange-400 p-6 text-center ${*/}
            {/*                isDark ? 'bg-gradient-to-br from-white/10 to-white/5' : 'bg-gradient-to-br from-orange-50 to-white'*/}
            {/*            }`}*/}
            {/*        >*/}
            {/*            <p*/}
            {/*                className={`text-3xl ${*/}
            {/*                    isDark ? 'text-white' : 'text-gray-900'*/}
            {/*                }`}*/}
            {/*            >*/}
            {/*                1*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="mt-4 flex items-center justify-center gap-6 text-xs">*/}
            {/*        <div className="flex items-center gap-2">*/}
            {/*            <div className="h-2.5 w-2.5 rounded-full bg-lime-400"></div>*/}
            {/*            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Automated</span>*/}
            {/*        </div>*/}
            {/*        <div className="flex items-center gap-2">*/}
            {/*            <div className="h-2.5 w-2.5 rounded-full bg-orange-400"></div>*/}
            {/*            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Manual</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Card>*/}
            <Card className={`p-6 backdrop-blur-sm ${
                isDark
                    ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                    : 'border-gray-200 bg-white shadow-sm'
            }`}>
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Албаны нийт ажилтан</h3>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Албан тушаалын ангилал</p>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={warehouseData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {warehouseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                    border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#000',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                    {warehouseData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            ></div>
                            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {item.name}: {item.value}
                </span>
                        </div>
                    ))}
                </div>
            </Card>
            {/* Maintenance Triggering */}
            <Card
                className={`p-6 backdrop-blur-sm ${
                    isDark
                        ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                        : 'border-gray-200 bg-white shadow-sm'
                }`}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h3
                        className={`text-sm ${
                            isDark ? 'text-white' : 'text-gray-900'
                        }`}
                    >
                        Албаны хүйсийн харицаа
                    </h3>
                    <button
                        className={`text-xs ${
                            isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        {/*6 months ▼*/}
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div
                        className={`rounded-2xl border-4 border-lime-400 p-6 text-center ${
                            isDark ? 'bg-gradient-to-br from-white/10 to-white/5' : 'bg-gradient-to-br from-green-50 to-white'
                        }`}
                    >
                        <p
                            className={`text-3xl ${
                                isDark ? 'text-white' : 'text-gray-900'
                            }`}
                        >
                            44
                        </p>
                    </div>
                    <div
                        className={`rounded-2xl border-4 border-orange-400 p-6 text-center ${
                            isDark ? 'bg-gradient-to-br from-white/10 to-white/5' : 'bg-gradient-to-br from-orange-50 to-white'
                        }`}
                    >
                        <p
                            className={`text-3xl ${
                                isDark ? 'text-white' : 'text-gray-900'
                            }`}
                        >
                            7
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-6 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-lime-400"></div>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Эрэгтэй</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-orange-400"></div>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Эмэгтэй</span>
                    </div>
                </div>
            </Card>

            {/* Incidents Reported */}
            <Card className={`p-6 backdrop-blur-sm ${
                isDark
                    ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                    : 'border-gray-200 bg-white shadow-sm'
            }`}>
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Албаны ажилтнуудын насны ангилал</h3>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}></p>
                    </div>
                    <button className={`rounded-lg px-3 py-1.5 text-xs ${
                        isDark
                            ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                    </button>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={productionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff15' : '#e5e7eb'} />
                        <XAxis dataKey="age" stroke={isDark ? '#9ca3af' : '#4b5563'} fontSize={11} />
                        <YAxis stroke={isDark ? '#9ca3af' : '#4b5563'} fontSize={11} domain={[0, 30]} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                                borderRadius: '8px',
                                color: isDark ? '#fff' : '#000',
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="efficiency"
                            stroke="#a3e635"
                            strokeWidth={3}
                            dot={{ fill: '#a3e635', r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
}