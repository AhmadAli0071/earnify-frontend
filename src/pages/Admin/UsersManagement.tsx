
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  UserPlus,
  Filter,
  MoreHorizontal,
  UserX,
  Edit,
  AlertTriangle,
  Shield,
  Check
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";

export default function UsersManagement() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Sample users data
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "Alex Thompson", 
      email: "alex@example.com", 
      status: "active", 
      joined: "2023-05-12", 
      lastActive: "2023-06-15",
      earnings: "$124.50" 
    },
    { 
      id: 2, 
      name: "Madison Lee", 
      email: "madison@example.com", 
      status: "active", 
      joined: "2023-04-28", 
      lastActive: "2023-06-14",
      earnings: "$86.25" 
    },
    { 
      id: 3, 
      name: "Devon Smith", 
      email: "devon@example.com", 
      status: "blocked", 
      joined: "2023-03-15", 
      lastActive: "2023-05-20",
      earnings: "$245.00" 
    },
    { 
      id: 4, 
      name: "Riley Johnson", 
      email: "riley@example.com", 
      status: "active", 
      joined: "2023-06-01", 
      lastActive: "2023-06-15",
      earnings: "$56.75" 
    },
    { 
      id: 5, 
      name: "Jamie Wilson", 
      email: "jamie@example.com", 
      status: "inactive", 
      joined: "2023-02-10", 
      lastActive: "2023-04-25",
      earnings: "$178.20" 
    },
    { 
      id: 6, 
      name: "Taylor Brown", 
      email: "taylor@example.com", 
      status: "active", 
      joined: "2023-05-30", 
      lastActive: "2023-06-14",
      earnings: "$42.00" 
    },
    { 
      id: 7, 
      name: "Jordan Garcia", 
      email: "jordan@example.com", 
      status: "active", 
      joined: "2023-04-15", 
      lastActive: "2023-06-13",
      earnings: "$156.50" 
    },
    { 
      id: 8, 
      name: "Casey Martinez", 
      email: "casey@example.com", 
      status: "blocked", 
      joined: "2023-01-20", 
      lastActive: "2023-03-15",
      earnings: "$205.75" 
    }
  ]);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter users based on search term and status filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      activeFilter === "all" || 
      activeFilter === user.status;
    
    return matchesSearch && matchesFilter;
  });

  const toggleUserStatus = (id: number) => {
    setUsers(prev => prev.map(user => {
      if (user.id === id) {
        const newStatus = user.status === "blocked" ? "active" : "blocked";
        toast.success(`User ${user.name} is now ${newStatus}`);
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Users Management</h1>
            <p className="text-gray-400 text-sm">{users.length} total users</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-700 text-indigo-400 hover:text-indigo-300 hover:border-indigo-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-800 text-gray-300">
                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer" onClick={() => setActiveFilter("all")}>
                  <Check className={`mr-2 h-4 w-4 ${activeFilter === "all" ? "opacity-100" : "opacity-0"}`} />
                  All Users
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer" onClick={() => setActiveFilter("active")}>
                  <Check className={`mr-2 h-4 w-4 ${activeFilter === "active" ? "opacity-100" : "opacity-0"}`} />
                  Active Users
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer" onClick={() => setActiveFilter("blocked")}>
                  <Check className={`mr-2 h-4 w-4 ${activeFilter === "blocked" ? "opacity-100" : "opacity-0"}`} />
                  Blocked Users
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer" onClick={() => setActiveFilter("inactive")}>
                  <Check className={`mr-2 h-4 w-4 ${activeFilter === "inactive" ? "opacity-100" : "opacity-0"}`} />
                  Inactive Users
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search users by name or email..."
                  className="pl-10 bg-gray-800/50 border-gray-700/50 focus:border-indigo-600 text-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className={`border-gray-700 ${activeFilter === "active" ? "bg-green-900/30 text-green-400 border-green-800" : "text-gray-400 hover:text-gray-300 hover:border-gray-600"}`}
                  onClick={() => setActiveFilter(activeFilter === "active" ? "all" : "active")}
                >
                  Active Users
                </Button>
                <Button 
                  variant="outline" 
                  className={`border-gray-700 ${activeFilter === "blocked" ? "bg-red-900/30 text-red-400 border-red-800" : "text-gray-400 hover:text-gray-300 hover:border-gray-600"}`}
                  onClick={() => setActiveFilter(activeFilter === "blocked" ? "all" : "blocked")}
                >
                  Blocked
                </Button>
                <Button 
                  variant="outline" 
                  className={`border-gray-700 ${activeFilter === "inactive" ? "bg-gray-900/50 text-gray-300 border-gray-700" : "text-gray-400 hover:text-gray-300 hover:border-gray-600"}`}
                  onClick={() => setActiveFilter(activeFilter === "inactive" ? "all" : "inactive")}
                >
                  Inactive
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30 overflow-hidden">
          {loading ? (
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-16 bg-gray-800/50 rounded"></div>
                ))}
              </div>
            </CardContent>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-6 py-3 text-xs font-semibold text-gray-400">NAME</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-400">EMAIL</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-400">STATUS</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-400">JOINED</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-400">LAST ACTIVE</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-400">EARNINGS</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-400">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <motion.tr 
                          key={user.id}
                          className="hover:bg-gray-800/50 transition-colors"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          layout
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-medium">
                                {user.name.charAt(0)}
                              </div>
                              <span className="text-sm font-medium text-gray-200">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">{user.email}</td>
                          <td className="px-6 py-4">
                            <Badge className={`${
                              user.status === 'active' ? 'bg-green-900/20 text-green-400 border-green-800/50 hover:bg-green-900/30' :
                              user.status === 'blocked' ? 'bg-red-900/20 text-red-400 border-red-800/50 hover:bg-red-900/30' :
                              'bg-gray-900/20 text-gray-400 border-gray-800/50 hover:bg-gray-900/30'
                            }`}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">{user.joined}</td>
                          <td className="px-6 py-4 text-sm text-gray-400">{user.lastActive}</td>
                          <td className="px-6 py-4 text-sm font-medium text-green-400">{user.earnings}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-200">
                                <Edit className="h-4 w-4" />
                              </Button>
                              {user.status !== 'blocked' ? (
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-red-400 hover:text-red-300"
                                  onClick={() => toggleUserStatus(user.id)}
                                >
                                  <UserX className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-green-400 hover:text-green-300"
                                  onClick={() => toggleUserStatus(user.id)}
                                >
                                  <UserPlus className="h-4 w-4" />
                                </Button>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-200">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-gray-300">
                                  <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                                    Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator className="bg-gray-800" />
                                  <DropdownMenuItem className="text-red-400 hover:bg-gray-800 cursor-pointer">
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-10 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <AlertTriangle className="h-10 w-10 text-gray-600 mb-2" />
                            <p className="text-gray-500 text-sm">No users found matching "{searchTerm}"</p>
                            <Button 
                              variant="link"
                              className="mt-2 text-indigo-400"
                              onClick={() => {
                                setSearchTerm("");
                                setActiveFilter("all");
                              }}
                            >
                              Clear filters
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-900/80 border-t border-gray-800 px-6 py-3 flex justify-between items-center">
                <p className="text-sm text-gray-500">Showing {filteredUsers.length} of {users.length} users</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:text-gray-300 disabled:opacity-50" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:text-gray-300">
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
