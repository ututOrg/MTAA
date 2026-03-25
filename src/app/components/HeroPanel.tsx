import { TrendingUp, Users, Target, Award } from 'lucide-react';
import { Card } from './ui/card';
import {
    AreaChart,
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';

const chartData = [
    { name: 'Jan', value: 4000, projects: 24 },
    { name: 'Feb', value: 3000, projects: 18 },
    { name: 'Mar', value: 5000, projects: 29 },
    { name: 'Apr', value: 4500, projects: 32 },
    { name: 'May', value: 6000, projects: 38 },
    { name: 'Jun', value: 5500, projects: 42 },
];

const achievements = [
    {
        icon: TrendingUp,
        label: 'Revenue',
        value: '$48,574',
        change: '+12.5%',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
    },
    {
        icon: Users,
        label: 'Active Users',
        value: '8,234',
        change: '+8.2%',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
    },
    {
        icon: Target,
        label: 'Conversion',
        value: '24.8%',
        change: '+4.1%',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
    },
    {
        icon: Award,
        label: 'Projects',
        value: '183',
        change: '+15.3%',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
    },
];

export function HeroPanel() {
    return (
        <div className="space-y-6">
            {/* Summary Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl text-gray-900">Welcome back, John</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Here's what's happening with your projects today.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Last updated:</span>
                    <span className="text-gray-900">March 24, 2026 at 2:34 PM</span>
                </div>
            </div>

            {/* Achievement Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {achievements.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                    <p className="text-2xl text-gray-900">{stat.value}</p>
                                    <p className="text-xs text-green-600">{stat.change} from last month</p>
                                </div>
                                <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                                    <Icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Data Visualizations */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Area Chart */}
                <Card className="p-6">
                    <div className="mb-4">
                        <h3 className="text-lg text-gray-900">Revenue Trend</h3>
                        <p className="text-sm text-gray-500">Monthly revenue over the past 6 months</p>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>

                {/* Bar Chart */}
                <Card className="p-6">
                    <div className="mb-4">
                        <h3 className="text-lg text-gray-900">Project Activity</h3>
                        <p className="text-sm text-gray-500">Number of active projects per month</p>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                }}
                            />
                            <Bar dataKey="projects" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    );
}
