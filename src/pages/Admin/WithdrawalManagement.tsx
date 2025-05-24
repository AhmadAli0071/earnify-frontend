
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowUp,
  Search,
  Eye,
  Check,
  X,
  Clock,
  DollarSign,
  CreditCard
} from "lucide-react";
import AdminLayout from "./AdminLayout";

export default function WithdrawalManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null);

  const withdrawals = [
    {
      id: 1,
      user: "Chris Wilson",
      email: "chris@example.com",
      amount: 120.00,
      method: "PayPal",
      accountDetails: "chris.wilson@paypal.com",
      status: "pending",
      requestedAt: "2024-01-20 14:30",
      walletBalance: 150.00
    },
    {
      id: 2,
      user: "Taylor Miller",
      email: "taylor@example.com",
      amount: 78.50,
      method: "Bank Transfer",
      accountDetails: "****1234",
      status: "completed",
      requestedAt: "2024-01-20 10:15",
      completedAt: "2024-01-20 15:30",
      transactionId: "TXN_ABC123456",
      walletBalance: 200.00
    },
    {
      id: 3,
      user: "Jordan Lee",
      email: "jordan@example.com",
      amount: 250.00,
      method: "Bitcoin",
      accountDetails: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
      status: "rejected",
      requestedAt: "2024-01-19 16:20",
      rejectedAt: "2024-01-20 09:30",
      rejectionReason: "Insufficient verification",
      walletBalance: 180.00
    }
  ];

  const filteredWithdrawals = withdrawals.filter(withdrawal =>
    withdrawal.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    withdrawal.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>;
      case "completed":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Completed</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Rejected</Badge>;
      case "processing":
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Processing</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Unknown</Badge>;
    }
  };

  const handleApprove = (withdrawalId: number) => {
    console.log("Approving withdrawal:", withdrawalId);
    // Handle approval logic
  };

  const handleReject = (withdrawalId: number) => {
    console.log("Rejecting withdrawal:", withdrawalId);
    // Handle rejection logic
  };

  const pendingWithdrawals = withdrawals.filter(w => w.status === "pending");
  const completedWithdrawals = withdrawals.filter(w => w.status === "completed");
  const rejectedWithdrawals = withdrawals.filter(w => w.status === "rejected");
  const totalAmount = withdrawals.reduce((sum, w) => sum + w.amount, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Withdrawal Management</h1>
            <p className="text-gray-400">Process and manage user withdrawal requests</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-yellow-400">{pendingWithdrawals.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Check className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-green-400">{completedWithdrawals.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <X className="h-8 w-8 text-red-400" />
                <div>
                  <p className="text-sm text-gray-400">Rejected</p>
                  <p className="text-2xl font-bold text-red-400">{rejectedWithdrawals.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Requested</p>
                  <p className="text-2xl font-bold text-blue-400">${totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search withdrawals by user or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700/50 text-gray-300"
              />
            </div>
          </CardContent>
        </Card>

        {/* Withdrawals Table */}
        <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <ArrowUp className="h-5 w-5 text-indigo-400" />
              <span>All Withdrawal Requests ({filteredWithdrawals.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">User</TableHead>
                  <TableHead className="text-gray-400">Amount</TableHead>
                  <TableHead className="text-gray-400">Method</TableHead>
                  <TableHead className="text-gray-400">Wallet Balance</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Requested</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWithdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id} className="border-gray-800 hover:bg-gray-800/50">
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{withdrawal.user}</p>
                        <p className="text-gray-400 text-sm">{withdrawal.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-orange-400 font-medium">${withdrawal.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-white">{withdrawal.method}</TableCell>
                    <TableCell className="text-green-400">${withdrawal.walletBalance.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                    <TableCell className="text-gray-400">{withdrawal.requestedAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-indigo-700 text-indigo-400"
                              onClick={() => setSelectedWithdrawal(withdrawal)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Withdrawal Details - {selectedWithdrawal?.user}</DialogTitle>
                              <DialogDescription className="text-gray-400">
                                Review withdrawal request and account details
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedWithdrawal && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm text-gray-400">Withdrawal Amount</label>
                                    <p className="text-xl font-bold text-orange-400">${selectedWithdrawal.amount.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm text-gray-400">Current Wallet Balance</label>
                                    <p className="text-xl font-bold text-green-400">${selectedWithdrawal.walletBalance.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm text-gray-400">Payment Method</label>
                                    <p className="text-white font-medium">{selectedWithdrawal.method}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm text-gray-400">Status</label>
                                    <div className="mt-1">{getStatusBadge(selectedWithdrawal.status)}</div>
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="text-sm text-gray-400">Account Details</label>
                                  <p className="text-white font-mono text-sm bg-gray-800 p-2 rounded mt-1">
                                    {selectedWithdrawal.accountDetails}
                                  </p>
                                </div>
                                
                                {selectedWithdrawal.transactionId && (
                                  <div>
                                    <label className="text-sm text-gray-400">Transaction ID</label>
                                    <p className="text-white font-mono text-sm bg-gray-800 p-2 rounded mt-1">
                                      {selectedWithdrawal.transactionId}
                                    </p>
                                  </div>
                                )}
                                
                                {selectedWithdrawal.status === "pending" && (
                                  <div className="flex space-x-3 pt-4">
                                    <Button 
                                      onClick={() => handleApprove(selectedWithdrawal.id)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <Check className="h-4 w-4 mr-2" />
                                      Approve & Process
                                    </Button>
                                    <Button 
                                      onClick={() => handleReject(selectedWithdrawal.id)}
                                      variant="outline" 
                                      className="border-red-700 text-red-500 hover:bg-red-700/20"
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                )}
                                
                                {selectedWithdrawal.status === "rejected" && selectedWithdrawal.rejectionReason && (
                                  <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
                                    <p className="text-sm text-gray-400">Rejection Reason:</p>
                                    <p className="text-red-400">{selectedWithdrawal.rejectionReason}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        {withdrawal.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleApprove(withdrawal.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleReject(withdrawal.id)}
                              className="border-red-700 text-red-500 hover:bg-red-700/20"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
