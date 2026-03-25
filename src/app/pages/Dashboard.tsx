import { DarkHeroPanel } from '../components/DarkHeroPanel';
import { DarkMetricsCards } from '../components/DarkMetricsCards';
import { useOutletContext } from 'react-router';

export default function Dashboard() {
    const { isDark } = useOutletContext<{ isDark: boolean }>();

    return (
        <div className="space-y-8">
            <DarkHeroPanel isDark={isDark} />
            <DarkMetricsCards isDark={isDark} />
        </div>
    );
}