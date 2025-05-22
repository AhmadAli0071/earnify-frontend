
import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import StatDetailPopup from "./StatDetailPopup";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  type: "wallet" | "total" | "withdrawable" | "referrals";
}

export default function StatCard({ title, value, icon: Icon, color = "blue", trend, type }: StatCardProps) {
  const [showDetails, setShowDetails] = useState(false);

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
    <>
      <motion.div 
        className="earnify-card cursor-pointer hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowDetails(true)}
      >
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
      </motion.div>

      <StatDetailPopup 
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        statType={type}
        title={title}
      />
    </>
  );
}
