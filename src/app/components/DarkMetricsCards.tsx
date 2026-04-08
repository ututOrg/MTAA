import {Card} from './ui/card';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, LineChart, CartesianGrid, Line, LabelList,
} from 'recharts';
import React from "react";


const incidentsData = [
    {age: '', "Ажилтаны тоо": 0},
    {age: '2006 он', "Ажилтаны тоо": 19},
    {age: '2011 он', "Ажилтаны тоо": 22},
    {age: '2013 он', "Ажилтаны тоо": 3},
    {age: '2014 он', "Ажилтаны тоо": 3},
    {age: '2015 он', "Ажилтаны тоо": 3},
    {age: '2017 он', "Ажилтаны тоо": 53},
    {age: '2025 он', "Ажилтаны тоо": 53}
];

const productionData = [
    { name: '18-25', value: 7, color: '#60a5fa' },
    { name: '26-35', value: 19, color: '#34d399' },
    { name: '36-45', value: 22, color: '#fbbf24' },
    { name: '46+', value: 3, color: '#f87171' },
];

const warehouseData = [
    {name: 'Удирдлага', value: 1, color: '#a3e635'},
    {name: 'Инженер', value: 26, color: '#3b82f6'},
    {name: 'Албан хаагч', value: 3, color: '#fb923c'},
    {name: 'Техникч', value: 15, color: '#a855f7'},
    {name: 'Засварчин', value: 11, color: '#ff0000'},
];

const Gender = [
    {name: 'Эрэгтэй', value: 44, color: '#a3e635'},
    {name: 'Эмэгтэй', value: 7, color: '#3b82f6'},
];
export function DarkMetricsCards({isDark}: { isDark: boolean }) {
    const cardBase = `p-6  transition-all duration-500 rounded-[2.5rem] border ${
        isDark
            ? 'bg-black/20 border-white/10 shadow-2xl'
            : 'bg-white/40 border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]'
    }`;
    return (
        <div >
            <Card className={cardBase}>
                <div className="mb-4 flex items-center justify-between">
                    <h3 className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Албаны ажилчид
                    </h3>
                </div>
                <div className="relative">
                    <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={incidentsData}>
                            <defs>
                                <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.4}/>
                                    <stop
                                        offset="95%"
                                        stopColor={isDark ? '#7c2d12' : '#fed7aa'}
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="age"
                                stroke={isDark ? '#9ca3af' : '#4b5563'}
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis hide/>

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                    border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#000',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="Ажилтаны тоо"
                                stroke="#fb923c"
                                strokeWidth={2}
                                fill="url(#incidentGradient)"
                                dot={(props) => {
                                    const { cx, cy, value } = props;

                                    if (!value) return <></>;

                                    return (
                                        <>
                                            <circle cx={cx} cy={cy} r={4} fill="#fb923c" />
                                            <text
                                                x={cx}
                                                y={cy - 10}
                                                textAnchor="middle"
                                                fontSize={12}
                                                fill="black"
                                            >
                                                {value}
                                            </text>
                                        </>
                                    );
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className="absolute right-4 top-8 rounded-lg bg-orange-400 px-3 py-1.5">
                        <p className="text-sm text-black">53</p>
                    </div>
                </div>
                <p
                    className={`mt-2 text-center text-xs ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                >
                    Он цагийн дараалалаар
                </p>
            </Card>
            <div className="grid gap-6 lg:grid-cols-3 mt-10">
                <Card className={cardBase}>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Албаны нийт
                                ажилтан</h3>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Албан тушаалын
                                ангилал</p>
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
                                        <Cell key={`cell-${index}`} fill={entry.color}/>
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
                                    style={{backgroundColor: item.color}}
                                ></div>
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {item.name}: {item.value}
                </span>
                            </div>
                        ))}
                    </div>
                </Card>
                {/* Maintenance Triggering */}
                <Card className={cardBase}>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Албаны хүйсийн ангилал</h3>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Хүйсийн харьцаа</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={Gender}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {Gender.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color}/>
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
                        {Gender.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                                <div
                                    className="h-3 w-3 rounded-full"
                                    style={{backgroundColor: item.color}}
                                ></div>
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {item.name}: {item.value}
                </span>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className={cardBase}>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Албаны ажилтнуудын
                                насны ангилал</h3>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}></p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={productionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {Gender.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color}/>
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
                        {productionData.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                                <div
                                    className="h-3 w-3 rounded-full"
                                    style={{backgroundColor: item.color}}
                                ></div>
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {item.name} насны: {item.value} хүн
                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}