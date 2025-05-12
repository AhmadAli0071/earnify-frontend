
import { useState } from "react";
import { ArrowUp, AlertCircle, Wallet, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Withdraw = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [showReferralDialog, setShowReferralDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const walletBalance = 12.40;
  const withdrawable = 10.00;
  const pendingWithdrawals = 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // This is just for demo to show the referral popup
    if (parseFloat(amount) > 5 && Math.random() > 0.5) {
      setShowReferralDialog(true);
      return;
    }
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast("Withdrawal requested", {
        description: "Your withdrawal request has been submitted successfully.",
      });
      
      // Reset form
      setWalletAddress("");
      setAmount("");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold font-heading text-gray-800 mb-6">Withdraw</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Request Withdrawal</CardTitle>
                  <CardDescription>
                    Withdraw your earnings to your preferred wallet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="walletAddress">Wallet Address</Label>
                      <Input
                        id="walletAddress"
                        placeholder="Enter your wallet address"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="amount">Amount</Label>
                        <span className="text-xs text-gray-500">
                          Available: ${withdrawable.toFixed(2)}
                        </span>
                      </div>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        min="1"
                        max={withdrawable}
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setAmount("5.00")}
                        >
                          $5
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setAmount((withdrawable / 2).toFixed(2))}
                        >
                          50%
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setAmount(withdrawable.toFixed(2))}
                        >
                          Max
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                        <div className="text-sm text-amber-800">
                          <p className="font-medium">Withdrawal Processing Time</p>
                          <p className="mt-1">
                            Withdrawals are typically processed within 12–24 hours during business days.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isProcessing || !walletAddress || !amount || parseFloat(amount) > withdrawable}
                    >
                      {isProcessing ? "Processing..." : (
                        <>
                          <ArrowUp size={18} className="mr-2" />
                          Request Withdrawal
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Balance Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Wallet size={18} className="text-earnify-blue mr-2" />
                        <span className="text-sm text-gray-600">Total Balance</span>
                      </div>
                      <span className="font-medium">${walletBalance.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <ArrowUp size={18} className="text-earnify-green mr-2" />
                        <span className="text-sm text-gray-600">Withdrawable</span>
                      </div>
                      <span className="font-medium">${withdrawable.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertCircle size={18} className="text-amber-500 mr-2" />
                        <span className="text-sm text-gray-600">Pending</span>
                      </div>
                      <span className="font-medium">${pendingWithdrawals.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Withdrawal History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6 text-gray-500">
                    <p>No recent withdrawals</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Referral Dialog */}
      <Dialog open={showReferralDialog} onOpenChange={setShowReferralDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlock Next Withdrawal</DialogTitle>
            <DialogDescription>
              To unlock your next withdrawal, you need to refer 2 more people to Earnify.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-earnify-lightBlue p-4 rounded-lg flex items-start space-x-4">
            <Users className="text-earnify-blue h-5 w-5 mt-0.5" />
            <div>
              <h4 className="font-medium text-earnify-blue">Invite Friends</h4>
              <p className="text-sm text-gray-700 mt-1">
                Share your referral link and earn additional rewards when your friends join Earnify.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReferralDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowReferralDialog(false);
              window.location.href = "/referrals";
            }}>
              Go to Referrals
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Withdraw;
