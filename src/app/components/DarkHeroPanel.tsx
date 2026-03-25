import { Card } from './ui/card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const salesData = [
    { month: 'Aug', predicted: 1200, actual: 1100 },
    { month: 'Sep', predicted: 1400, actual: 1300 },
    { month: 'Oct', predicted: 1600, actual: 1500 },
    { month: 'Nov', predicted: 1800, actual: 1898 },
    { month: 'Dec', predicted: 1500, actual: 1400 },
    { month: 'Jan', predicted: 1700, actual: 1600 },
    { month: 'Feb', predicted: 1900, actual: 1800 },
];

const productionData = [
    { month: 'Aug', predicted: 1100, actual: 1000 },
    { month: 'Sep', predicted: 1300, actual: 1200 },
    { month: 'Oct', predicted: 1500, actual: 1400 },
    { month: 'Nov', predicted: 1700, actual: 1898 },
    { month: 'Dec', predicted: 1400, actual: 1300 },
    { month: 'Jan', predicted: 1600, actual: 1500 },
    { month: 'Feb', predicted: 1800, actual: 1700 },
];

const stats = [
    { value: '180+', label: 'SKUs Managed' },
    { value: '96%', label: 'Predictive Accuracy' },
    { value: '40%', label: 'Manual Labour Reduction' },
];

export function DarkHeroPanel({ isDark }: { isDark: boolean }) {
    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="space-y-2">
                <h1 className={`text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome Back, Terry</h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Information designed to accurate insights</p>
            </div>

            {/* Stats Cards */}
            {/*<div className="grid gap-4 md:grid-cols-3">*/}
            {/*    {stats.map((stat, index) => (*/}
            {/*        <Card*/}
            {/*            key={index}*/}
            {/*            className={`p-6 backdrop-blur-sm ${*/}
            {/*                isDark*/}
            {/*                    ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'*/}
            {/*                    : 'border-gray-200 bg-white shadow-sm'*/}
            {/*            }`}*/}
            {/*        >*/}
            {/*            <p className={`text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>*/}
            {/*            <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>*/}
            {/*        </Card>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {/* Charts Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Sales Chart */}
                <Card className={`p-6 backdrop-blur-sm ${
                    isDark
                        ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                        : 'border-gray-200 bg-white shadow-sm'
                }`}>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Predicted vs Actual Sales</h3>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Performance (units)</p>
                        </div>
                        <button className={`rounded-lg px-3 py-1.5 text-xs ${
                            isDark
                                ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                            6 months ▼
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={salesData}>
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
                            <Legend
                                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                                iconType="circle"
                            />
                            <Bar dataKey="predicted" fill="#a3e635" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar dataKey="actual" fill="#fb923c" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 flex items-center justify-center gap-6 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-lime-400"></div>
                            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Predicted</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-orange-400"></div>
                            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Actual</span>
                        </div>
                    </div>
                </Card>

                {/* Production Chart */}
                <Card className={`p-6 backdrop-blur-sm ${
                    isDark
                        ? 'border-white/10 bg-gradient-to-br from-white/10 to-white/5'
                        : 'border-gray-200 bg-white shadow-sm'
                }`}>
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Predicted vs Actual Production</h3>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Performance (units)</p>
                        </div>
                        <button className={`rounded-lg px-3 py-1.5 text-xs ${
                            isDark
                                ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                            6 months ▼
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
                            <Legend
                                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                                iconType="circle"
                            />
                            <Bar dataKey="predicted" fill="#a3e635" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar dataKey="actual" fill="#fb923c" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 flex items-center justify-center gap-6 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-lime-400"></div>
                            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Predicted</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-orange-400"></div>
                            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Actual</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}