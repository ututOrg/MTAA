import { Card } from '../components/ui/card';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend, AreaChart, Area,
} from 'recharts';
import { TrendingUp, Package, AlertCircle, Clock } from 'lucide-react';
import { useOutletContext } from 'react-router';

const productionData = [
    { month: 'Aug', target: 1200, actual: 1150, efficiency: 95.8 },
    { month: 'Sep', target: 1400, actual: 1380, efficiency: 98.5 },
    { month: 'Oct', target: 1600, actual: 1520, efficiency: 95.0 },
    { month: 'Nov', target: 1800, actual: 1898, efficiency: 105.4 },
    { month: 'Dec', target: 1500, actual: 1450, efficiency: 96.6 },
    { month: 'Jan', target: 1700, actual: 1680, efficiency: 98.8 },
    { month: 'Feb', target: 1900, actual: 1850, efficiency: 97.3 },
];

const machineData = [
    { machine: 'Line A', utilization: 92 },
    { machine: 'Line B', utilization: 87 },
    { machine: 'Line C', utilization: 95 },
    { machine: 'Line D', utilization: 78 },
    { machine: 'Line E', utilization: 89 },
];

const stats = [
    {
        icon: Package,
        label: 'Units Produced',
        value: '12,458',
        change: '+8.2%',
        color: 'text-lime-400',
    },
    {
        icon: TrendingUp,
        label: 'Production Efficiency',
        value: '97.3%',
        change: '+2.1%',
        color: 'text-blue-400',
    },
    {
        icon: Clock,
        label: 'Machine Uptime',
        value: '88.2%',
        change: '+5.4%',
        color: 'text-purple-400',
    },
    {
        icon: AlertCircle,
        label: 'Quality Issues',
        value: '3',
        change: '-12 from last month',
        color: 'text-orange-400',
    },
];

const incidentsData = [
    { age: '', value: 0 },
    { age: '2006 он', value: 19 },
    { age: '2011 он', value: 22 },
    { age: '2013 он', value: 3 },
    { age: '2014 он', value: 3 },
    { age: '2015 он', value: 3 },
    { age: '2017 он', value: 53 },
    { age: '2025 он', value: 53 }
];
export default function Production() {
    const { isDark } = useOutletContext<{ isDark: boolean }>();

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className={`text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Production Dashboard</h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monitor manufacturing operations and efficiency</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card
                            key={index}
                            className={`p-6 backdrop-blur-sm ${
                                isDark
                                    ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                                    : 'border-gray-200 bg-white shadow-sm'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                                    <p className={`mt-2 text-3xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                                    <p className="mt-1 text-xs text-green-400">{stat.change}</p>
                                </div>
                                <Icon className={`h-8 w-8 ${stat.color}`} />
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Charts Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Production vs Target */}
                <Card className={`p-6 backdrop-blur-sm ${
                    isDark
                        ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                        : 'border-gray-200 bg-white shadow-sm'
                }`}>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Production vs Target</h3>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monthly production units</p>
                        </div>
                        <button className={`rounded-lg px-3 py-1.5 text-xs ${
                            isDark
                                ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                            7 months ▼
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={productionData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff15' : '#e5e7eb'} />
                            <XAxis dataKey="month" stroke={isDark ? '#9ca3af' : '#4b5563'} fontSize={11} />
                            <YAxis stroke={isDark ? '#9ca3af' : '#4b5563'} fontSize={11} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                    border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#000',
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                            <Bar dataKey="target" fill="#a3e635" radius={[4, 4, 0, 0]} barSize={18} />
                            <Bar dataKey="actual" fill="#fb923c" radius={[4, 4, 0, 0]} barSize={18} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Machine Utilization */}
                <Card className={`p-6 backdrop-blur-sm ${
                    isDark
                        ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                        : 'border-gray-200 bg-white shadow-sm'
                }`}>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Machine Utilization</h3>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Current week performance</p>
                        </div>
                        <button className={`rounded-lg px-3 py-1.5 text-xs ${
                            isDark
                                ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                            This week ▼
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={machineData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff15' : '#e5e7eb'} />
                            <XAxis type="number" stroke={isDark ? '#9ca3af' : '#4b5563'} fontSize={11} domain={[0, 100]} />
                            <YAxis type="category" dataKey="machine" stroke={isDark ? '#9ca3af' : '#4b5563'} fontSize={11} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                    border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#000',
                                }}
                            />
                            <Bar dataKey="utilization" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Efficiency Trend */}

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
                            Нийт ажилчид

                    </h3>
                    <button
                        className={`text-xs ${
                            isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        {/*6 months ▼*/}
                    </button>
                </div>
                <div className="relative">
                    <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={incidentsData}>
                            <defs>
                                <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.4} />
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
                            <YAxis hide />

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
                                dataKey="value"
                                stroke="#fb923c"
                                strokeWidth={2}
                                fill="url(#incidentGradient)"
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
                    Monthly reported incidents
                </p>
            </Card>
        </div>
    );
}