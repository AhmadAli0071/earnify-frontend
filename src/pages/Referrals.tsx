
import { useState } from "react";
import { Copy, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for the referral table
const referrals = [
  { id: "user123", joinedDate: "2023-04-15", status: "Active", deposit: 50 },
  { id: "user456", joinedDate: "2023-04-10", status: "Active", deposit: 20 },
  { id: "user789", joinedDate: "2023-04-02", status: "Inactive", deposit: 10 },
];

const earningRates = [
  { deposit: 10, commission: 0.05 },
  { deposit: 20, commission: 0.10 },
  { deposit: 50, commission: 0.25 },
  { deposit: 100, commission: 0.5 },
  { deposit: 200, commission: 1.0 },
  { deposit: 500, commission: 2.5 },
  { deposit: 1000, commission: 5.0 },
];

const Referrals = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "EARN123";
  const referralLink = `https://earnify.com/ref/${referralCode}`;
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast("Copied to clipboard!", {
      description: "Share this with your friends to earn referral bonuses.",
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold font-heading text-gray-800 mb-6">Referrals</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Referral Stats</CardTitle>
                  <CardDescription>
                    Invite friends and earn commission on their deposits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-gray-500 mb-1">Total Referrals</div>
                        <div className="text-2xl font-bold">{referrals.length}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-gray-500 mb-1">Active Referrals</div>
                        <div className="text-2xl font-bold">{referrals.filter(r => r.status === "Active").length}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-gray-500 mb-1">Total Earnings</div>
                        <div className="text-2xl font-bold text-earnify-green">$0.35</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Your Referral Link</h3>
                    <div className="flex">
                      <Input
                        value={referralLink}
                        readOnly
                        className="flex-1 rounded-r-none"
                      />
                      <Button
                        variant="outline"
                        className="rounded-l-none"
                        onClick={() => handleCopy(referralLink)}
                      >
                        {copied ? <CheckCircle size={16} className="text-earnify-green" /> : <Copy size={16} />}
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-4">
                      <div>
                        <h3 className="font-medium">Referral Code:</h3>
                        <div className="mt-1 bg-gray-100 px-3 py-2 rounded-md text-gray-800 font-mono">
                          {referralCode}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(referralCode)}
                      >
                        {copied ? "Copied!" : "Copy Code"}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4 mt-6">
                      <Button variant="outline" className="flex-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Share on Facebook
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                        </svg>
                        Share on Twitter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Your Referred Users</CardTitle>
                  <CardDescription>
                    List of users who joined using your referral
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Joined Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Deposit</TableHead>
                        <TableHead>Commission</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {referrals.map((ref) => (
                        <TableRow key={ref.id}>
                          <TableCell className="font-medium">{ref.id}</TableCell>
                          <TableCell>{new Date(ref.joinedDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                ref.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {ref.status}
                            </span>
                          </TableCell>
                          <TableCell>${ref.deposit}</TableCell>
                          <TableCell className="text-earnify-green">
                            ${(earningRates.find(rate => rate.deposit === ref.deposit)?.commission || 0).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Referral Program</CardTitle>
                  <CardDescription>
                    How our referral system works
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-earnify-lightBlue p-2 rounded-full">
                      <Users size={18} className="text-earnify-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium">Earn by Sharing</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Get a commission when users join using your referral code and make a deposit.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Referral Commission Rates</h4>
                    <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User Deposit</TableHead>
                            <TableHead>Your Commission</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {earningRates.map((rate) => (
                            <TableRow key={rate.deposit}>
                              <TableCell>${rate.deposit}</TableCell>
                              <TableCell className="text-earnify-green">${rate.commission.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Referral Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600">
                  <p>• Share your link on social media platforms</p>
                  <p>• Create content explaining how Earnify works</p>
                  <p>• Direct message friends who might be interested</p>
                  <p>• Join online communities and share your experience</p>
                  <p>• Create a tutorial on how to get started</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Referrals;
