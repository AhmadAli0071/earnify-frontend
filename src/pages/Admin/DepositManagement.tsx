
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  Search,
  Eye,
  Check,
  X,
  Clock,
  DollarSign,
  Upload,
  Mail
} from "lucide-react";
import AdminLayout from "./AdminLayout";

export default function DepositManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeposit, setSelectedDeposit] = useState<any>(null);

  const deposits = [
    {
      id: 1,
      user: "Alex Thompson",
      email: "alex@example.com",
      amount: 100.00,
      package: "Premium Package",
      method: "Bitcoin",
      walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      status: "pending",
      submittedAt: "2024-01-20 14:30",
      proofImage: "/placeholder.svg",
      transactionId: "tx_abc123456"
    },
    {
      id: 2,
      user: "Madison Lee",
      email: "madison@example.com",
      amount: 50.00,
      package: "Starter Package",
      method: "PayPal",
      walletAddress: "madison.lee@paypal.com",
      status: "approved",
      submittedAt: "2024-01-20 12:15",
      approvedAt: "2024-01-20 13:45",
      proofImage: "/placeholder.svg",
      transactionId: "tx_def789012"
    },
    {
      id: 3,
      user: "Devon Smith",
      email: "devon@example.com",
      amount: 200.00,
      package: "VIP Package",
      method: "Ethereum",
      walletAddress: "0x742d35Cc6634C0532925a3b8D0A4E3B0",
      status: "rejected",
      submittedAt: "2024-01-19 16:20",
      rejectedAt: "2024-01-20 09:30",
      rejectionReason: "Invalid transaction proof",
      proofImage: "/placeholder.svg",
      transactionId: "tx_ghi345678"
    }
  ];

  const filteredDeposits = deposits.filter(deposit =>
    deposit.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deposit.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deposit.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Unknown</Badge>;
    }
  };

  const handleApprove = (depositId: number) => {
    console.log("Approving deposit:", depositId);
    // Handle approval logic
  };

  const handleReject = (depositId: number) => {
    console.log("Rejecting deposit:", depositId);
    // Handle rejection logic
  };

  const pendingDeposits = deposits.filter(d => d.status === "pending");
  const approvedDeposits = deposits.filter(d => d.status === "approved");
  const rejectedDeposits = deposits.filter(d => d.status === "rejected");
  const totalAmount = deposits.reduce((sum, d) => sum + d.amount, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Deposit Management</h1>
            <p className="text-gray-400">Review and manage user deposit requests</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Mail className="h-4 w-4 mr-2" />
            Bulk Email
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
                  <p className="text-2xl font-bold text-yellow-400">{pendingDeposits.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Check className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Approved</p>
                  <p className="text-2xl font-bold text-green-400">{approvedDeposits.length}</p>
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
                  <p className="text-2xl font-bold text-red-400">{rejectedDeposits.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Volume</p>
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
                placeholder="Search deposits by user, email, or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700/50 text-gray-300"
              />
            </div>
          </CardContent>
        </Card>

        {/* Deposits Table */}
        <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-indigo-400" />
              <span>All Deposit Requests ({filteredDeposits.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">User</TableHead>
                  <TableHead className="text-gray-400">Amount</TableHead>
                  <TableHead className="text-gray-400">Package</TableHead>
                  <TableHead className="text-gray-400">Method</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Submitted</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeposits.map((deposit) => (
                  <TableRow key={deposit.id} className="border-gray-800 hover:bg-gray-800/50">
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{deposit.user}</p>
                        <p className="text-gray-400 text-sm">{deposit.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-green-400 font-medium">${deposit.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-white">{deposit.package}</TableCell>
                    <TableCell className="text-gray-400">{deposit.method}</TableCell>
                    <TableCell>{getStatusBadge(deposit.status)}</TableCell>
                    <TableCell className="text-gray-400">{deposit.submittedAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-indigo-700 text-indigo-400"
                              onClick={() => setSelectedDeposit(deposit)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Deposit Details - {selectedDeposit?.user}</DialogTitle>
                              <DialogDescription className="text-gray-400">
                                Review deposit request and supporting documentation
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedDeposit && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm text-gray-400">Amount</label>
                                    <p className="text-xl font-bold text-green-400">${selectedDeposit.amount.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm text-gray-400">Package</label>
                                    <p className="text-white font-medium">{selectedDeposit.package}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm text-gray-400">Payment Method</label>
                                    <p className="text-white">{selectedDeposit.method}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm text-gray-400">Transaction ID</label>
                                    <p className="text-white font-mono text-sm">{selectedDeposit.transactionId}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="text-sm text-gray-400">Wallet Address</label>
                                  <p className="text-white font-mono text-sm bg-gray-800 p-2 rounded mt-1">
                                    {selectedDeposit.walletAddress}
                                  </p>
                                </div>
                                
                                <div>
                                  <label className="text-sm text-gray-400">Payment Proof</label>
                                  <div className="mt-2 p-4 border border-gray-700 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                      <Upload className="h-5 w-5 text-gray-400" />
                                      <span className="text-sm text-gray-400">Screenshot uploaded</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {selectedDeposit.status === "pending" && (
                                  <div className="flex space-x-3 pt-4">
                                    <Button 
                                      onClick={() => handleApprove(selectedDeposit.id)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <Check className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button 
                                      onClick={() => handleReject(selectedDeposit.id)}
                                      variant="outline" 
                                      className="border-red-700 text-red-500 hover:bg-red-700/20"
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                )}
                                
                                {selectedDeposit.status === "rejected" && selectedDeposit.rejectionReason && (
                                  <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
                                    <p className="text-sm text-gray-400">Rejection Reason:</p>
                                    <p className="text-red-400">{selectedDeposit.rejectionReason}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        {deposit.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleApprove(deposit.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleReject(deposit.id)}
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
