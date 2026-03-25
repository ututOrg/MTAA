import { Card } from '../components/ui/card';
import { DollarSign, TrendingUp, Users, ShoppingCart } from 'lucide-react';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend,
} from 'recharts';
import { useOutletContext } from 'react-router';

const revenueData = [
    { month: 'Aug', revenue: 125000, target: 120000 },
    { month: 'Sep', revenue: 145000, target: 140000 },
    { month: 'Oct', revenue: 168000, target: 160000 },
    { month: 'Nov', revenue: 192000, target: 180000 },
    { month: 'Dec', revenue: 178000, target: 170000 },
    { month: 'Jan', revenue: 205000, target: 190000 },
    { month: 'Feb', revenue: 225000, target: 210000 },
];

const categoryData = [
    { category: 'Electronics', sales: 45000 },
    { category: 'Clothing', sales: 32000 },
    { category: 'Home & Garden', sales: 28000 },
    { category: 'Sports', sales: 22000 },
    { category: 'Books', sales: 18000 },
];

const stats = [
    {
        icon: DollarSign,
        label: 'Total Revenue',
        value: '$225,430',
        change: '+15.3%',
        color: 'text-lime-400',
    },
    {
        icon: ShoppingCart,
        label: 'Total Orders',
        value: '3,842',
        change: '+8.7%',
        color: 'text-blue-400',
    },
    {
        icon: Users,
        label: 'New Customers',
        value: '468',
        change: '+12.4%',
        color: 'text-purple-400',
    },
    {
        icon: TrendingUp,
        label: 'Conversion Rate',
        value: '3.8%',
        change: '+0.5%',
        color: 'text-orange-400',
    },
];

export default function Sales() {
    const { isDark } = useOutletContext<{ isDark: boolean }>();

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className={`text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Sales Dashboard</h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monitor sales performance and revenue trends</p>
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
                {/* Revenue vs Target */}
                <Card className={`p-6 backdrop-blur-sm ${
                    isDark
                        ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                        : 'border-gray-200 bg-white shadow-sm'
                }`}>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Revenue vs Target</h3>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monthly revenue performance</p>
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
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a3e635" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#a3e635" stopOpacity={0.05} />
                                </linearGradient>
                                <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                                </linearGradient>
                            </defs>
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
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#a3e635"
                                strokeWidth={2}
                                fill="url(#revenueGradient)"
                            />
                            <Area
                                type="monotone"
                                dataKey="target"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="url(#targetGradient)"
                                strokeDasharray="5 5"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>

                {/* Sales by Category */}
                <Card className={`p-6 backdrop-blur-sm ${
                    isDark
                        ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                        : 'border-gray-200 bg-white shadow-sm'
                }`}>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Sales by Category</h3>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Top performing categories</p>
                        </div>
                        <button className={`rounded-lg px-3 py-1.5 text-xs ${
                            isDark
                                ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                            This month ▼
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={categoryData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#ffffff15' : '#e5e7eb'} />
                            <XAxis type="number" stroke={isDark ? '#9ca3af' : '#4b5563'} fontSize={11} />
                            <YAxis type="category" dataKey="category" stroke={isDark ? '#9ca3af' : '#4b5563'} fontSize={11} width={100} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                    border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    color: isDark ? '#fff' : '#000',
                                }}
                            />
                            <Bar dataKey="sales" fill="#fb923c" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Revenue Trend */}
            <Card className={`p-6 backdrop-blur-sm ${
                isDark
                    ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                    : 'border-gray-200 bg-white shadow-sm'
            }`}>
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Revenue Growth Trend</h3>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monthly revenue progression</p>
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
                    <LineChart data={revenueData}>
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
                        <Line
                            type="monotone"
                            dataKey="revenue"
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