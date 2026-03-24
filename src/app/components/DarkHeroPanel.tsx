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

export function DarkHeroPanel() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-4xl text-white">Welcome Back, Terry</h1>
        <p className="text-sm text-gray-400">Information designed to accurate insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm"
          >
            <p className="text-4xl text-white">{stat.value}</p>
            <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <Card className="border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg text-white">Predicted vs Actual Sales</h3>
              <p className="text-xs text-gray-400">Monthly Performance (units)</p>
            </div>
            <button className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10">
              6 months ▼
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={salesData}>
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
              <span className="text-gray-400">Predicted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-orange-400"></div>
              <span className="text-gray-400">Actual</span>
            </div>
          </div>
        </Card>

        {/* Production Chart */}
        <Card className="border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg text-white">Predicted vs Actual Production</h3>
              <p className="text-xs text-gray-400">Monthly Performance (units)</p>
            </div>
            <button className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10">
              6 months ▼
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
              <span className="text-gray-400">Predicted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-orange-400"></div>
              <span className="text-gray-400">Actual</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
