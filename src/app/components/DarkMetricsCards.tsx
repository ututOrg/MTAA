import { Card } from './ui/card';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const incidentsData = [
    { month: 'May', value: 18 },
    { month: 'Jun', value: 16 },
    { month: 'Jul', value: 14 },
    { month: 'Aug', value: 11 },
    { month: 'Sep', value: 9 },
    { month: 'Oct', value: 7 },
    { month: 'Nov', value: 5 },
];

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

export function DarkMetricsCards({ isDark }: { isDark: boolean }) {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Procurement Decisions */}
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
                        Procurement Decisions
                    </h3>
                    <button
                        className={`text-xs ${
                            isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        6 months ▼
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
                            72%
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
                            28%
                        </p>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-6 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-lime-400"></div>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Automated</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-orange-400"></div>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Manual</span>
                    </div>
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
                        Maintenance Triggering
                    </h3>
                    <button
                        className={`text-xs ${
                            isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        6 months ▼
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
                            88%
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
                            12%
                        </p>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-6 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-lime-400"></div>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Automated</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-orange-400"></div>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Manual</span>
                    </div>
                </div>
            </Card>

            {/* Incidents Reported */}
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
                        Incidents Reported
                    </h3>
                    <button
                        className={`text-xs ${
                            isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        6 months ▼
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
                                dataKey="month"
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
                        <p className="text-sm text-black">11</p>
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