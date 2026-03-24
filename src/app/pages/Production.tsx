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
  Legend,
} from 'recharts';
import { TrendingUp, Package, AlertCircle, Clock } from 'lucide-react';

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

export default function Production() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl text-white">Production Dashboard</h1>
        <p className="text-sm text-gray-400">Monitor manufacturing operations and efficiency</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="mt-2 text-3xl text-white">{stat.value}</p>
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
        <Card className="border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg text-white">Production vs Target</h3>
              <p className="text-xs text-gray-400">Monthly production units</p>
            </div>
            <button className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10">
              7 months ▼
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} />
              <YAxis stroke="#9ca3af" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="target" fill="#a3e635" radius={[4, 4, 0, 0]} barSize={18} />
              <Bar dataKey="actual" fill="#fb923c" radius={[4, 4, 0, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Machine Utilization */}
        <Card className="border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg text-white">Machine Utilization</h3>
              <p className="text-xs text-gray-400">Current week performance</p>
            </div>
            <button className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10">
              This week ▼
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={machineData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
              <XAxis type="number" stroke="#9ca3af" fontSize={11} domain={[0, 100]} />
              <YAxis type="category" dataKey="machine" stroke="#9ca3af" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="utilization" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Efficiency Trend */}
      <Card className="border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg text-white">Production Efficiency Trend</h3>
            <p className="text-xs text-gray-400">Percentage efficiency over time</p>
          </div>
          <button className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10">
            7 months ▼
          </button>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={productionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
            <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} />
            <YAxis stroke="#9ca3af" fontSize={11} domain={[90, 110]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
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
