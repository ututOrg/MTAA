import { DarkHeroPanel } from '../components/DarkHeroPanel';
import { DarkMetricsCards } from '../components/DarkMetricsCards';
import { useOutletContext } from 'react-router';
import IntroDashboard from "./IntroDashboard";

export default function Dashboard() {
    const { isDark } = useOutletContext<{ isDark: boolean }>();

    return (
        <div className="space-y-8">
            {/*<div className="space-y-2">*/}
            {/*    <h1 className={`text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Logistics Dashboard</h1>*/}
            {/*    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Track shipments and warehouse*/}
            {/*        operations</p>*/}
            {/*</div>*/}
            <IntroDashboard isDark={isDark} />
            <DarkMetricsCards isDark={isDark}/>
            {/*<DarkHeroPanel isDark={isDark} />*/}

        </div>
    );
}