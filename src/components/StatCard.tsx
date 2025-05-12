
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
}

export default function StatCard({ title, value, icon: Icon, color = "blue", trend }: StatCardProps) {
  const getColorClasses = () => {
    switch(color) {
      case 'green':
        return {
          bg: 'bg-earnify-lightGreen',
          text: 'text-earnify-green'
        };
      case 'blue':
        return {
          bg: 'bg-earnify-lightBlue',
          text: 'text-earnify-blue'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700'
        };
    }
  };
  
  const colorClasses = getColorClasses();
  
  return (
    <div className="earnify-card">
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-500 text-sm">{title}</div>
        <div className={`p-2 rounded-lg ${colorClasses.bg} ${colorClasses.text}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="flex items-baseline space-x-1">
        <h3 className="text-2xl font-bold font-heading">{value}</h3>
        
        {trend && (
          <div className={`text-xs font-medium ${trend.positive ? 'text-earnify-green' : 'text-red-500'}`}>
            {trend.positive ? '+' : '-'}{trend.value}%
          </div>
        )}
      </div>
    </div>
  );
}
