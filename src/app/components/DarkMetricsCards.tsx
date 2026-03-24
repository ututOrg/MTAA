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

export function DarkMetricsCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Procurement Decisions */}
      <Card className="border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm text-white">Procurement Decisions</h3>
          <button className="text-xs text-gray-400 hover:text-gray-300">6 months ▼</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border-4 border-lime-400 bg-gradient-to-br from-white/10 to-white/5 p-6 text-center">
            <p className="text-3xl text-white">72%</p>
          </div>
          <div className="rounded-2xl border-4 border-orange-400 bg-gradient-to-br from-white/10 to-white/5 p-6 text-center">
            <p className="text-3xl text-white">28%</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-lime-400"></div>
            <span className="text-gray-400">Automated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-400"></div>
            <span className="text-gray-400">Manual</span>
          </div>
        </div>
      </Card>

      {/* Maintenance Triggering */}
      <Card className="border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm text-white">Maintenance Triggering</h3>
          <button className="text-xs text-gray-400 hover:text-gray-300">6 months ▼</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border-4 border-lime-400 bg-gradient-to-br from-white/10 to-white/5 p-6 text-center">
            <p className="text-3xl text-white">88%</p>
          </div>
          <div className="rounded-2xl border-4 border-orange-400 bg-gradient-to-br from-white/10 to-white/5 p-6 text-center">
            <p className="text-3xl text-white">12%</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-lime-400"></div>
            <span className="text-gray-400">Automated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-400"></div>
            <span className="text-gray-400">Manual</span>
          </div>
        </div>
      </Card>

      {/* Incidents Reported */}
      <Card className="border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm text-white">Incidents Reported</h3>
          <button className="text-xs text-gray-400 hover:text-gray-300">6 months ▼</button>
        </div>
        <div className="relative">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={incidentsData}>
              <defs>
                <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb923c" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7c2d12" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff',
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
        <p className="mt-2 text-center text-xs text-gray-400">Monthly reported incidents</p>
      </Card>
    </div>
  );
}
