
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, CoinsIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PackageCardProps {
  deposit: number;
  monthlyEarn: number;
  featured?: boolean;
  bestValue?: boolean;
  onSelect?: () => void;
}

export default function PackageCard({ 
  deposit, 
  monthlyEarn, 
  featured = false,
  bestValue = false,
  onSelect 
}: PackageCardProps) {
  return (
    <div 
      className={cn(
        "earnify-card relative overflow-hidden transition-all duration-300 p-6 hover:shadow-lg hover:-translate-y-1",
        featured && "border-earnify-blue",
        bestValue && "border-earnify-green"
      )}
    >
      {featured && (
        <div className="absolute top-0 right-0">
          <Badge className="bg-earnify-blue hover:bg-earnify-blue text-white font-medium rounded-bl-lg rounded-tr-xl px-3 py-1.5">
            Most Popular
          </Badge>
        </div>
      )}
      
      {bestValue && (
        <div className="absolute top-0 right-0">
          <Badge className="bg-earnify-green hover:bg-earnify-green text-white font-medium rounded-bl-lg rounded-tr-xl px-3 py-1.5">
            Best Value
          </Badge>
        </div>
      )}
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <BriefcaseIcon className="h-5 w-5 text-earnify-blue mr-2" />
          <div className="text-xl font-bold font-heading text-gray-800">${deposit} Package</div>
        </div>
        <div className="flex items-center text-earnify-green font-medium">
          <CoinsIcon className="h-5 w-5 mr-2" />
          <span>Earn up to ${monthlyEarn}/month</span>
        </div>
      </div>
      
      <ul className="space-y-2 mb-6 text-sm text-gray-600">
        <li className="flex items-start">
          <div className="mr-2 mt-0.5">•</div>
          <span>Complete daily tasks & earn daily</span>
        </li>
        <li className="flex items-start">
          <div className="mr-2 mt-0.5">•</div>
          <span>Withdraw anytime</span>
        </li>
        <li className="flex items-start">
          <div className="mr-2 mt-0.5">•</div>
          <span>Eligible for referral bonuses</span>
        </li>
      </ul>
      
      <Button 
        onClick={onSelect} 
        className={cn(
          "w-full flex items-center justify-center",
          featured ? "bg-earnify-blue hover:bg-blue-600" : 
          bestValue ? "bg-earnify-green hover:bg-green-600" : "bg-primary hover:bg-primary/90"
        )}
      >
        Choose Package
        <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
