
import { Button } from "@/components/ui/button";

interface PackageCardProps {
  deposit: number;
  dailyEarn: number;
  tasks: number;
  featured?: boolean;
  onSelect?: () => void;
}

export default function PackageCard({ deposit, dailyEarn, tasks, featured = false, onSelect }: PackageCardProps) {
  return (
    <div className={`earnify-card relative overflow-hidden transition-all duration-300 ${featured ? 'border-earnify-blue transform hover:-translate-y-1' : 'hover:shadow-lg'}`}>
      {featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-earnify-blue text-white text-xs font-semibold py-1 px-3 rounded-bl-lg">
            Popular
          </div>
        </div>
      )}
      <div className="text-center mb-4">
        <div className="text-2xl font-bold font-heading text-gray-800">${deposit}</div>
        <div className="text-xs text-gray-500 uppercase tracking-wider">Package</div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Daily Earn:</span>
          <span className="font-semibold text-earnify-green">${dailyEarn}/day</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tasks:</span>
          <span className="font-semibold">{tasks} per day</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Withdraw:</span>
          <span className="font-semibold">Anytime</span>
        </div>
      </div>
      
      <Button 
        onClick={onSelect} 
        className={`w-full ${featured ? 'bg-earnify-blue hover:bg-blue-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
        variant={featured ? "default" : "outline"}
      >
        Select Package
      </Button>
    </div>
  );
}
