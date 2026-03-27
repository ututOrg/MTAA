import {Card} from '../components/ui/card';
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
import {TrendingUp, Package, AlertCircle, Clock} from 'lucide-react';
import {useOutletContext} from 'react-router';
import {FactoryDashboard} from "../components/History";
import FullMapDashboard from "../components/FullMapDashboard";

const productionData = [
    {month: 'Aug', target: 1200, actual: 1150, efficiency: 95.8},
    {month: 'Sep', target: 1400, actual: 1380, efficiency: 98.5},
    {month: 'Oct', target: 1600, actual: 1520, efficiency: 95.0},
    {month: 'Nov', target: 1800, actual: 1898, efficiency: 105.4},
    {month: 'Dec', target: 1500, actual: 1450, efficiency: 96.6},
    {month: 'Jan', target: 1700, actual: 1680, efficiency: 98.8},
    {month: 'Feb', target: 1900, actual: 1850, efficiency: 97.3},
];

const machineData = [
    {machine: 'Line A', utilization: 92},
    {machine: 'Line B', utilization: 87},
    {machine: 'Line C', utilization: 95},
    {machine: 'Line D', utilization: 78},
    {machine: 'Line E', utilization: 89},
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
    const {isDark} = useOutletContext<{ isDark: boolean }>();

    return (
        <div className="space-y-8 ">
            <section className="fixed inset-0 bg-gray-100">
                <div className="pt-[0px] w-full h-full">
                    <FullMapDashboard/>
                </div>
            </section>
        </div>
    );
}