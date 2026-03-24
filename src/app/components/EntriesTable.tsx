import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Card } from './ui/card';

const entries = [
  {
    id: 'PRJ-001',
    name: 'Website Redesign',
    client: 'Acme Corp',
    status: 'completed',
    priority: 'high',
    budget: '$45,000',
    progress: 100,
    dueDate: '2026-03-15',
  },
  {
    id: 'PRJ-002',
    name: 'Mobile App Development',
    client: 'TechStart Inc',
    status: 'in-progress',
    priority: 'high',
    budget: '$120,000',
    progress: 65,
    dueDate: '2026-04-30',
  },
  {
    id: 'PRJ-003',
    name: 'Brand Identity',
    client: 'Startup Labs',
    status: 'in-progress',
    priority: 'medium',
    budget: '$25,000',
    progress: 40,
    dueDate: '2026-04-15',
  },
  {
    id: 'PRJ-004',
    name: 'SEO Optimization',
    client: 'Digital Wave',
    status: 'pending',
    priority: 'low',
    budget: '$12,000',
    progress: 0,
    dueDate: '2026-05-20',
  },
  {
    id: 'PRJ-005',
    name: 'E-commerce Platform',
    client: 'Retail Plus',
    status: 'completed',
    priority: 'high',
    budget: '$85,000',
    progress: 100,
    dueDate: '2026-02-28',
  },
  {
    id: 'PRJ-006',
    name: 'Marketing Campaign',
    client: 'Growth Media',
    status: 'in-progress',
    priority: 'medium',
    budget: '$35,000',
    progress: 75,
    dueDate: '2026-03-28',
  },
  {
    id: 'PRJ-007',
    name: 'Cloud Migration',
    client: 'Enterprise Solutions',
    status: 'pending',
    priority: 'high',
    budget: '$150,000',
    progress: 0,
    dueDate: '2026-06-15',
  },
  {
    id: 'PRJ-008',
    name: 'Dashboard Analytics',
    client: 'Data Insights',
    status: 'completed',
    priority: 'medium',
    budget: '$42,000',
    progress: 100,
    dueDate: '2026-03-10',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">Completed</Badge>;
    case 'in-progress':
      return <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">In Progress</Badge>;
    case 'pending':
      return <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">Pending</Badge>;
    case 'cancelled':
      return <Badge variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-100">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">High</Badge>;
    case 'medium':
      return <Badge variant="secondary" className="bg-orange-50 text-orange-700 hover:bg-orange-100">Medium</Badge>;
    case 'low':
      return <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">Low</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
};

export function EntriesTable() {
  return (
    <Card className="overflow-hidden">
      <div className="border-b bg-gray-50/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl text-gray-900">Recent Projects</h2>
            <p className="mt-1 text-sm text-gray-500">
              A list of all projects including their status and details
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                  ID
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                  Project Name
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead className="w-[120px]">Progress</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium text-gray-900">
                  {entry.id}
                </TableCell>
                <TableCell className="text-gray-900">{entry.name}</TableCell>
                <TableCell className="text-gray-600">{entry.client}</TableCell>
                <TableCell>{getStatusBadge(entry.status)}</TableCell>
                <TableCell>{getPriorityBadge(entry.priority)}</TableCell>
                <TableCell className="text-gray-900">{entry.budget}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${entry.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{entry.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{entry.dueDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
