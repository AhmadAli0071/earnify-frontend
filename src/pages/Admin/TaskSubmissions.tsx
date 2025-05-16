
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
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

export default function TaskSubmissions() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Sample tasks data
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      user: "Alex Thompson", 
      email: "alex@example.com", 
      taskType: "Instagram Post", 
      status: "pending", 
      submitted: "2023-06-14", 
      reward: "$3.50",
      proof: "https://example.com/proof1"
    },
    { 
      id: 2, 
      user: "Madison Lee", 
      email: "madison@example.com", 
      taskType: "Facebook Share", 
      status: "pending", 
      submitted: "2023-06-14", 
      reward: "$2.25",
      proof: "https://example.com/proof2"
    },
    { 
      id: 3, 
      user: "Devon Smith", 
      email: "devon@example.com", 
      taskType: "Twitter Retweet", 
      status: "approved", 
      submitted: "2023-06-13", 
      reward: "$1.75",
      proof: "https://example.com/proof3" 
    },
    { 
      id: 4, 
      user: "Riley Johnson", 
      email: "riley@example.com", 
      taskType: "YouTube Comment", 
      status: "pending", 
      submitted: "2023-06-14", 
      reward: "$4.00",
      proof: "https://example.com/proof4" 
    },
    { 
      id: 5, 
      user: "Jamie Wilson", 
      email: "jamie@example.com", 
      taskType: "TikTok Share", 
      status: "rejected", 
      submitted: "2023-06-12", 
      reward: "$3.25",
      proof: "https://example.com/proof5" 
    },
    { 
      id: 6, 
      user: "Taylor Brown", 
      email: "taylor@example.com", 
      taskType: "Instagram Story", 
      status: "approved", 
      submitted: "2023-06-13", 
      reward: "$2.50",
      proof: "https://example.com/proof6" 
    },
    { 
      id: 7, 
      user: "Jordan Garcia", 
      email: "jordan@example.com", 
      taskType: "Facebook Like", 
      status: "pending", 
      submitted: "2023-06-14", 
      reward: "$1.25",
      proof: "https://example.com/proof7" 
    },
    { 
      id: 8, 
      user: "Casey Martinez", 
      email: "casey@example.com", 
      taskType: "Twitter Follow", 
      status: "rejected", 
      submitted: "2023-06-12", 
      reward: "$1.50",
      proof: "https://example.com/proof8" 
    }
  ]);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter tasks based on search term and status filter
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.taskType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      activeFilter === "all" || 
      activeFilter === task.status;
    
    return matchesSearch && matchesFilter;
  });

  const approveTask = (id: number) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        toast.success(`Task by ${task.user} approved`);
        return { ...task, status: "approved" };
      }
      return task;
    }));
  };

  const rejectTask = (id: number) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        toast.error(`Task by ${task.user} rejected`);
        return { ...task, status: "rejected" };
      }
      return task;
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
            <h1 className="text-2xl font-bold tracking-tight text-white">Task Submissions</h1>
            <p className="text-gray-400 text-sm">{tasks.filter(task => task.status === "pending").length} pending approvals</p>
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
                  All Tasks
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer" onClick={() => setActiveFilter("pending")}>
                  <Check className={`mr-2 h-4 w-4 ${activeFilter === "pending" ? "opacity-100" : "opacity-0"}`} />
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer" onClick={() => setActiveFilter("approved")}>
                  <Check className={`mr-2 h-4 w-4 ${activeFilter === "approved" ? "opacity-100" : "opacity-0"}`} />
                  Approved
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer" onClick={() => setActiveFilter("rejected")}>
                  <Check className={`mr-2 h-4 w-4 ${activeFilter === "rejected" ? "opacity-100" : "opacity-0"}`} />
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Export Task Data
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search tasks by user or type..."
                  className="pl-10 bg-gray-800/50 border-gray-700/50 focus:border-indigo-600 text-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className={`border-gray-700 ${activeFilter === "pending" ? "bg-amber-900/30 text-amber-400 border-amber-800" : "text-gray-400 hover:text-gray-300 hover:border-gray-600"}`}
                  onClick={() => setActiveFilter(activeFilter === "pending" ? "all" : "pending")}
                >
                  Pending
                </Button>
                <Button 
                  variant="outline" 
                  className={`border-gray-700 ${activeFilter === "approved" ? "bg-green-900/30 text-green-400 border-green-800" : "text-gray-400 hover:text-gray-300 hover:border-gray-600"}`}
                  onClick={() => setActiveFilter(activeFilter === "approved" ? "all" : "approved")}
                >
                  Approved
                </Button>
                <Button 
                  variant="outline" 
                  className={`border-gray-700 ${activeFilter === "rejected" ? "bg-red-900/30 text-red-400 border-red-800" : "text-gray-400 hover:text-gray-300 hover:border-gray-600"}`}
                  onClick={() => setActiveFilter(activeFilter === "rejected" ? "all" : "rejected")}
                >
                  Rejected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Table */}
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
                      <th className="px-6 py-3 text-xs font-semibold text-gray-400">USER</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-400">TASK TYPE</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-400">STATUS</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-400">SUBMITTED</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-400">REWARD</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-400">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task) => (
                        <motion.tr 
                          key={task.id}
                          className="hover:bg-gray-800/50 transition-colors"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          layout
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-medium">
                                {task.user.charAt(0)}
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-200">{task.user}</span>
                                <p className="text-xs text-gray-500">{task.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">{task.taskType}</td>
                          <td className="px-6 py-4">
                            <Badge className={`${
                              task.status === 'approved' ? 'bg-green-900/20 text-green-400 border-green-800/50 hover:bg-green-900/30' :
                              task.status === 'rejected' ? 'bg-red-900/20 text-red-400 border-red-800/50 hover:bg-red-900/30' :
                              'bg-amber-900/20 text-amber-400 border-amber-800/50 hover:bg-amber-900/30'
                            }`}>
                              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">{task.submitted}</td>
                          <td className="px-6 py-4 text-sm font-medium text-green-400">{task.reward}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost" className="text-indigo-400 hover:text-indigo-300">
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              {task.status === 'pending' && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="text-green-400 hover:text-green-300"
                                    onClick={() => approveTask(task.id)}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="text-red-400 hover:text-red-300"
                                    onClick={() => rejectTask(task.id)}
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
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
                                    View User Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator className="bg-gray-800" />
                                  {task.status !== 'pending' && (
                                    <DropdownMenuItem 
                                      className="text-amber-400 hover:bg-gray-800 cursor-pointer"
                                      onClick={() => {
                                        setTasks(prev => prev.map(t => {
                                          if (t.id === task.id) {
                                            toast("Task status reset to pending");
                                            return { ...t, status: "pending" };
                                          }
                                          return t;
                                        }));
                                      }}
                                    >
                                      Reset to Pending
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <AlertTriangle className="h-10 w-10 text-gray-600 mb-2" />
                            <p className="text-gray-500 text-sm">No tasks found matching your filters</p>
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
                <p className="text-sm text-gray-500">Showing {filteredTasks.length} of {tasks.length} tasks</p>
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
