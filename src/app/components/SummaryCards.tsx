import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

const summaryData = [
  {
    title: 'Completed',
    count: 48,
    total: 65,
    icon: CheckCircle2,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    progressColor: 'bg-green-600',
  },
  {
    title: 'In Progress',
    count: 12,
    total: 65,
    icon: Clock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    progressColor: 'bg-blue-600',
  },
  {
    title: 'Pending',
    count: 3,
    total: 65,
    icon: AlertCircle,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    progressColor: 'bg-yellow-600',
  },
  {
    title: 'Cancelled',
    count: 2,
    total: 65,
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    progressColor: 'bg-red-600',
  },
];

export function SummaryCards() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-gray-900">Project Summary</h2>
        <span className="text-sm text-gray-500">Total: 65 projects</span>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item, index) => {
          const Icon = item.icon;
          const percentage = Math.round((item.count / item.total) * 100);
          
          return (
            <Card key={index} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-lg p-2 ${item.bgColor}`}>
                      <Icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <h3 className="text-sm text-gray-600">{item.title}</h3>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-3xl text-gray-900">{item.count}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {percentage}% of total
                    </p>
                  </div>
                  
                  <div className="mt-3">
                    <Progress value={percentage} className="h-1.5" />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
