
import React from "react";
import { X, Users, Wallet, TrendingUp, ArrowUp, Copy, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Dummy data for statistics details
const dummyReferrals = [
  { id: 1, name: "John Smith", date: "May 15, 2025", status: "active", earnings: "$2.40" },
  { id: 2, name: "Emma Johnson", date: "May 12, 2025", status: "active", earnings: "$1.80" },
  { id: 3, name: "Michael Brown", date: "May 10, 2025", status: "pending", earnings: "$0.00" },
];

const dummyTransactions = [
  { id: 1, description: "Task Completion", amount: "+$0.40", date: "May 21, 2025", type: "earning" },
  { id: 2, description: "Referral Bonus", amount: "+$1.00", date: "May 20, 2025", type: "earning" },
  { id: 3, description: "Daily Task Reward", amount: "+$0.60", date: "May 19, 2025", type: "earning" },
  { id: 4, description: "Withdrawal to PayPal", amount: "-$5.00", date: "May 17, 2025", type: "withdrawal" },
];

interface StatDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  statType: "wallet" | "total" | "withdrawable" | "referrals";
  title: string;
}

const StatDetailPopup = ({ isOpen, onClose, statType, title }: StatDetailPopupProps) => {
  const copyReferralLink = () => {
    navigator.clipboard.writeText("https://earnify.com/ref/yourcode123");
    toast.success("Referral link copied to clipboard!");
  };

  const renderContent = () => {
    switch (statType) {
      case "wallet":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Current Balance</h3>
              <p className="text-2xl font-bold text-gray-900">$12.40</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Recent Transactions</h3>
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
                {dummyTransactions.slice(0, 3).map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                    <span className={`font-medium ${
                      transaction.type === "earning" ? "text-green-600" : "text-red-500"
                    }`}>
                      {transaction.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Last updated: Today, 2:45 PM</span>
              <Button variant="outline" size="sm" onClick={() => window.location.href = "/withdraw"}>
                Withdraw Funds
              </Button>
            </div>
          </div>
        );
        
      case "total":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Earnings</h3>
              <p className="text-2xl font-bold text-gray-900">$42.80</p>
              <div className="flex items-center mt-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+8% from last month</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Earnings Breakdown</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Tasks</p>
                  <p className="font-medium">$28.50</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Referrals</p>
                  <p className="font-medium">$14.30</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Earnings History</h3>
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
                {dummyTransactions.filter(t => t.type === "earning").map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                    <span className="font-medium text-green-600">{transaction.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case "withdrawable":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Available for Withdrawal</h3>
              <p className="text-2xl font-bold text-gray-900">$10.00</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Withdrawal Methods</h3>
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
                        P
                      </div>
                      <div>
                        <p className="font-medium text-sm">PayPal</p>
                        <p className="text-xs text-gray-500">1-3 business days</p>
                      </div>
                    </div>
                    <Button size="sm">Select</Button>
                  </div>
                </div>
                
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-900 rounded-full flex items-center justify-center text-white mr-3">
                        C
                      </div>
                      <div>
                        <p className="font-medium text-sm">Crypto</p>
                        <p className="text-xs text-gray-500">Instant</p>
                      </div>
                    </div>
                    <Button size="sm">Select</Button>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-green-700 rounded-full flex items-center justify-center text-white mr-3">
                        B
                      </div>
                      <div>
                        <p className="font-medium text-sm">Bank Transfer</p>
                        <p className="text-xs text-gray-500">3-5 business days</p>
                      </div>
                    </div>
                    <Button size="sm">Select</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Minimum withdrawal amount is $5.00
              </p>
            </div>
          </div>
        );
        
      case "referrals":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Referrals</h3>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Users className="h-5 w-5 text-pink-500" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Your Referral Link</h3>
                <Button variant="outline" size="sm" onClick={copyReferralLink}>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 text-sm text-gray-500 overflow-hidden">
                https://earnify.com/ref/yourcode123
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Your Referrals</h3>
                <Badge variant="outline" className="text-purple-600">
                  Earn 10% of referral earnings
                </Badge>
              </div>
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
                {dummyReferrals.map((referral) => (
                  <div 
                    key={referral.id}
                    className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-800 mr-2">
                        {referral.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{referral.name}</p>
                        <p className="text-xs text-gray-500">Joined: {referral.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant={referral.status === "active" ? "success" : "pending"} className="mr-2">
                        {referral.status}
                      </Badge>
                      <span className="font-medium text-green-600">{referral.earnings}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <DialogFooter>
              <Button className="w-full" onClick={() => window.location.href = "/referrals"}>
                <UserPlus className="h-4 w-4 mr-1" />
                Invite More Friends
              </Button>
            </DialogFooter>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {statType === "wallet" && <Wallet className="h-5 w-5 text-blue-500" />}
            {statType === "total" && <TrendingUp className="h-5 w-5 text-purple-500" />}
            {statType === "withdrawable" && <ArrowUp className="h-5 w-5 text-green-500" />}
            {statType === "referrals" && <Users className="h-5 w-5 text-pink-500" />}
            {title}
          </DialogTitle>
        </DialogHeader>
        
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default StatDetailPopup;
