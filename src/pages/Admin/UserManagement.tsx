
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
  Users,
  Search,
  Filter,
  Eye,
  Ban,
  CheckCircle,
  AlertCircle,
  Edit,
  Wallet,
  UserPlus,
  Mail
} from "lucide-react";
import AdminLayout from "./AdminLayout";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    {
      id: 1,
      name: "Alex Thompson",
      email: "alex@example.com",
      walletBalance: 125.50,
      totalEarned: 340.75,
      status: "active",
      joinDate: "2024-01-15",
      referrals: 3,
      tasksCompleted: 24,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Madison Lee",
      email: "madison@example.com",
      walletBalance: 89.25,
      totalEarned: 200.00,
      status: "active",
      joinDate: "2024-02-03",
      referrals: 1,
      tasksCompleted: 15,
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Devon Smith",
      email: "devon@example.com",
      walletBalance: 0.00,
      totalEarned: 450.00,
      status: "suspended",
      joinDate: "2023-12-10",
      referrals: 8,
      tasksCompleted: 42,
      lastActive: "1 week ago"
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Active</Badge>;
      case "suspended":
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Suspended</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Unknown</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">User Management</h1>
            <p className="text-gray-400">Manage all registered users and their accounts</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700/50 text-gray-300"
                />
              </div>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Users className="h-5 w-5 text-indigo-400" />
              <span>All Users ({filteredUsers.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">User</TableHead>
                  <TableHead className="text-gray-400">Wallet Balance</TableHead>
                  <TableHead className="text-gray-400">Total Earned</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Join Date</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-gray-800 hover:bg-gray-800/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-green-400 font-medium">${user.walletBalance.toFixed(2)}</TableCell>
                    <TableCell className="text-white">${user.totalEarned.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-gray-400">{user.joinDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-indigo-700 text-indigo-400 hover:bg-indigo-700/20"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>User Details - {selectedUser?.name}</DialogTitle>
                              <DialogDescription className="text-gray-400">
                                Complete user profile and activity overview
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedUser && (
                              <Tabs defaultValue="profile" className="w-full">
                                <TabsList className="bg-gray-800 border border-gray-700">
                                  <TabsTrigger value="profile">Profile</TabsTrigger>
                                  <TabsTrigger value="financial">Financial</TabsTrigger>
                                  <TabsTrigger value="activity">Activity</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="profile" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm text-gray-400">Full Name</label>
                                      <p className="text-white font-medium">{selectedUser.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm text-gray-400">Email</label>
                                      <p className="text-white">{selectedUser.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm text-gray-400">Join Date</label>
                                      <p className="text-white">{selectedUser.joinDate}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm text-gray-400">Last Active</label>
                                      <p className="text-white">{selectedUser.lastActive}</p>
                                    </div>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="financial" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <Card className="bg-gray-800 border-gray-700">
                                      <CardContent className="p-4">
                                        <div className="flex items-center space-x-2">
                                          <Wallet className="h-5 w-5 text-green-400" />
                                          <div>
                                            <p className="text-sm text-gray-400">Wallet Balance</p>
                                            <p className="text-xl font-bold text-green-400">${selectedUser.walletBalance.toFixed(2)}</p>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    <Card className="bg-gray-800 border-gray-700">
                                      <CardContent className="p-4">
                                        <div className="flex items-center space-x-2">
                                          <CheckCircle className="h-5 w-5 text-blue-400" />
                                          <div>
                                            <p className="text-sm text-gray-400">Total Earned</p>
                                            <p className="text-xl font-bold text-blue-400">${selectedUser.totalEarned.toFixed(2)}</p>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      Adjust Balance
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                                      View Transactions
                                    </Button>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="activity" className="space-y-4">
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                      <p className="text-2xl font-bold text-white">{selectedUser.tasksCompleted}</p>
                                      <p className="text-sm text-gray-400">Tasks Completed</p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-2xl font-bold text-white">{selectedUser.referrals}</p>
                                      <p className="text-sm text-gray-400">Referrals</p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-2xl font-bold text-green-400">98%</p>
                                      <p className="text-sm text-gray-400">Completion Rate</p>
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        {user.status === "active" ? (
                          <Button size="sm" variant="outline" className="border-red-700 text-red-500 hover:bg-red-700/20">
                            <Ban className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="border-green-700 text-green-500 hover:bg-green-700/20">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
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
