import { DarkHeroPanel } from '../components/DarkHeroPanel';
import { DarkMetricsCards } from '../components/DarkMetricsCards';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <DarkHeroPanel />
      <DarkMetricsCards />
    </div>
  );
}
