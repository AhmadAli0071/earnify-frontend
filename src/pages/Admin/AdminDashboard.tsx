
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  CheckSquare,
  ArrowUp,
  DollarSign,
  Activity,
  BarChart3,
  Calendar,
  AlertCircle,
  ChevronRight,
  Shield
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    { 
      title: "Total Users", 
      value: "8,249", 
      change: "+12%", 
      changePositive: true,
      icon: <Users className="h-8 w-8 text-indigo-400" />,
      color: "from-indigo-600 to-purple-600"
    },
    { 
      title: "Tasks Completed", 
      value: "22,483", 
      change: "+18%", 
      changePositive: true,
      icon: <CheckSquare className="h-8 w-8 text-green-400" />,
      color: "from-green-600 to-emerald-600"
    },
    { 
      title: "Withdrawals Today", 
      value: "$4,395", 
      change: "+5%", 
      changePositive: true,
      icon: <ArrowUp className="h-8 w-8 text-orange-400" />,
      color: "from-orange-600 to-amber-600"
    },
    { 
      title: "Total Revenue", 
      value: "$86,240", 
      change: "+8%", 
      changePositive: true,
      icon: <DollarSign className="h-8 w-8 text-sky-400" />,
      color: "from-sky-600 to-blue-600"
    }
  ];

  const recentUsers = [
    { id: 1, name: "Alex Thompson", email: "alex@example.com", joined: "2 hours ago", tasks: 15 },
    { id: 2, name: "Madison Lee", email: "madison@example.com", joined: "4 hours ago", tasks: 8 },
    { id: 3, name: "Devon Smith", email: "devon@example.com", joined: "Yesterday", tasks: 22 },
    { id: 4, name: "Riley Johnson", email: "riley@example.com", joined: "Yesterday", tasks: 11 },
  ];

  const pendingTasks = [
    { id: 1, user: "Chris Wilson", task: "Instagram Post Promotion", reward: "$2.50", submitted: "Today" },
    { id: 2, user: "Taylor Miller", task: "Facebook Page Like", reward: "$1.25", submitted: "Today" },
    { id: 3, user: "Jordan Lee", task: "YouTube Video Watch", reward: "$3.00", submitted: "Yesterday" },
    { id: 4, user: "Morgan Davis", task: "Twitter Retweet", reward: "$1.75", submitted: "Yesterday" },
  ];

  const pendingWithdrawals = [
    { id: 1, user: "Chris Wilson", amount: "$120.00", method: "PayPal", requested: "Today" },
    { id: 2, user: "Taylor Miller", amount: "$78.50", method: "Bank Transfer", requested: "Today" },
    { id: 3, user: "Jordan Lee", amount: "$250.00", method: "PayPal", requested: "Yesterday" },
    { id: 4, user: "Morgan Davis", amount: "$42.00", method: "Crypto", requested: "Yesterday" },
  ];

  const alerts = [
    { id: 1, type: "warning", message: "Unusual withdrawal activity detected", time: "12 minutes ago" },
    { id: 2, type: "info", message: "System maintenance scheduled for tonight", time: "2 hours ago" },
    { id: 3, type: "error", message: "Payment gateway API experiencing delays", time: "3 hours ago" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome back, Admin</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-gray-700 text-indigo-400 hover:text-indigo-300 hover:border-indigo-700">
              <Calendar className="h-4 w-4 mr-2" />
              Today
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Generate Reports
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <Card key={i} className="bg-gray-900 border-gray-800 animate-pulse">
                <CardContent className="p-6 h-[100px]"></CardContent>
              </Card>
            ))
          ) : (
            statCards.map((stat, index) => (
              <motion.div variants={itemVariants} key={index}>
                <Card className="bg-gray-900/70 border-gray-700/30 backdrop-blur-md overflow-hidden hover:shadow-lg hover:shadow-indigo-900/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1 text-white">{stat.value}</p>
                        <div className={`text-xs font-medium mt-1 flex items-center ${stat.changePositive ? 'text-green-500' : 'text-red-500'}`}>
                          {stat.changePositive ? '↑' : '↓'} {stat.change} from last month
                        </div>
                      </div>
                      <div className={`h-14 w-14 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-70 flex items-center justify-center shadow-lg`}>
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-gray-900/70 border border-gray-800 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Tasks</TabsTrigger>
            <TabsTrigger value="withdrawals" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Withdrawals</TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">System Alerts</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab Content */}
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Users */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate={loading ? "hidden" : "visible"}
                className="lg:col-span-2"
              >
                <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30 overflow-hidden">
                  <CardHeader className="bg-gray-900/80 border-b border-gray-800 flex-row justify-between items-center pb-4">
                    <CardTitle className="text-lg font-medium flex items-center space-x-2 text-white">
                      <Users className="h-5 w-5 text-indigo-400" />
                      <span>Recent Users</span>
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-indigo-400 hover:text-indigo-300"
                      onClick={() => window.location.href = '/admin/users'}
                    >
                      View All <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-800">
                      {recentUsers.map((user) => (
                        <motion.div 
                          key={user.id}
                          variants={itemVariants}
                          className="flex items-center justify-between px-6 py-4 hover:bg-gray-800/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-medium">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{user.name}</p>
                              <p className="text-xs text-gray-400">{user.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">Joined {user.joined}</p>
                            <p className="text-xs text-indigo-400">{user.tasks} tasks completed</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* System Alerts */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={loading ? "hidden" : "visible"}
              >
                <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30 overflow-hidden">
                  <CardHeader className="bg-gray-900/80 border-b border-gray-800 flex-row justify-between items-center pb-4">
                    <CardTitle className="text-lg font-medium flex items-center space-x-2 text-white">
                      <AlertCircle className="h-5 w-5 text-amber-400" />
                      <span>System Alerts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    {alerts.map((alert) => (
                      <motion.div
                        key={alert.id}
                        variants={itemVariants}
                        className={`p-4 rounded-lg ${
                          alert.type === "warning" ? "bg-amber-900/20 border border-amber-700/50" :
                          alert.type === "error" ? "bg-red-900/20 border border-red-700/50" :
                          "bg-blue-900/20 border border-blue-700/50"
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`p-1 rounded-full mr-3 ${
                            alert.type === "warning" ? "bg-amber-700" :
                            alert.type === "error" ? "bg-red-700" :
                            "bg-blue-700"
                          }`}>
                            <AlertCircle className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{alert.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={loading ? "hidden" : "visible"}
              className="mt-6"
            >
              <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30 overflow-hidden">
                <CardHeader className="bg-gray-900/80 border-b border-gray-800 flex-row justify-between items-center pb-4">
                  <CardTitle className="text-lg font-medium flex items-center space-x-2 text-white">
                    <Activity className="h-5 w-5 text-sky-400" />
                    <span>Platform Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-400">System Load</p>
                      <p className="text-sm font-medium text-green-400">Healthy</p>
                    </div>
                    <Progress value={42} className="h-2 bg-gray-800" />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-400">Task Completion Rate</p>
                      <p className="text-sm font-medium text-white">78%</p>
                    </div>
                    <Progress value={78} className="h-2 bg-gray-800" />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-400">User Growth</p>
                      <p className="text-sm font-medium text-white">+12.4%</p>
                    </div>
                    <Progress value={62} className="h-2 bg-gray-800" />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Tasks Tab Content */}
          <TabsContent value="tasks" className="mt-0">
            <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30 overflow-hidden">
              <CardHeader className="bg-gray-900/80 border-b border-gray-800 flex-row justify-between items-center pb-4">
                <CardTitle className="text-lg font-medium flex items-center space-x-2 text-white">
                  <CheckSquare className="h-5 w-5 text-green-400" />
                  <span>Pending Task Submissions</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left text-xs text-gray-400 px-6 py-3">USER</th>
                      <th className="text-left text-xs text-gray-400 px-6 py-3">TASK</th>
                      <th className="text-left text-xs text-gray-400 px-6 py-3">REWARD</th>
                      <th className="text-left text-xs text-gray-400 px-6 py-3">SUBMITTED</th>
                      <th className="text-left text-xs text-gray-400 px-6 py-3">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {pendingTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-white">{task.user}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{task.task}</td>
                        <td className="px-6 py-4 text-sm text-green-400">{task.reward}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{task.submitted}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-green-700 text-green-500 hover:text-green-400 hover:border-green-600">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-700 text-red-500 hover:text-red-400 hover:border-red-600">
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Withdrawals Tab Content */}
          <TabsContent value="withdrawals" className="mt-0">
            <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30 overflow-hidden">
              <CardHeader className="bg-gray-900/80 border-b border-gray-800 flex-row justify-between items-center pb-4">
                <CardTitle className="text-lg font-medium flex items-center space-x-2 text-white">
                  <ArrowUp className="h-5 w-5 text-orange-400" />
                  <span>Pending Withdrawals</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left text-xs text-gray-400 px-6 py-3">USER</th>
                      <th className="text-left text-xs text-gray-400 px-6 py-3">AMOUNT</th>
                      <th className="text-left text-xs text-gray-400 px-6 py-3">METHOD</th>
                      <th className="text-left text-xs text-gray-400 px-6 py-3">REQUESTED</th>
                      <th className="text-left text-xs text-gray-400 px-6 py-3">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {pendingWithdrawals.map((withdrawal) => (
                      <tr key={withdrawal.id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-white">{withdrawal.user}</td>
                        <td className="px-6 py-4 text-sm font-medium text-green-400">{withdrawal.amount}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{withdrawal.method}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{withdrawal.requested}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-green-700 text-green-500 hover:text-green-400 hover:border-green-600">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-700 text-red-500 hover:text-red-400 hover:border-red-600">
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab Content */}
          <TabsContent value="alerts" className="mt-0">
            <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30 overflow-hidden">
              <CardHeader className="bg-gray-900/80 border-b border-gray-800 flex-row justify-between items-center pb-4">
                <CardTitle className="text-lg font-medium flex items-center space-x-2 text-white">
                  <Shield className="h-5 w-5 text-red-400" />
                  <span>System Security Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    variants={itemVariants}
                    className={`p-4 rounded-lg ${
                      alert.type === "warning" ? "bg-amber-900/40 border border-amber-700/50" :
                      alert.type === "error" ? "bg-red-900/40 border border-red-700/50" :
                      "bg-blue-900/40 border border-blue-700/50"
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full mr-4 ${
                        alert.type === "warning" ? "bg-amber-700" :
                        alert.type === "error" ? "bg-red-700" :
                        "bg-blue-700"
                      }`}>
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-base font-medium text-white">{alert.message}</p>
                        <p className="text-sm text-gray-400 mt-2">{alert.time}</p>
                        <Button variant="outline" size="sm" className="mt-3 border-gray-700 text-indigo-400 hover:border-indigo-600">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <div className="text-center pt-4">
                  <Button variant="outline" className="text-gray-400 hover:text-gray-300 border-gray-700">
                    Load More Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Analytics Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
          className="mt-6"
        >
          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30 overflow-hidden">
            <CardHeader className="bg-gray-900/80 border-b border-gray-800 flex-row justify-between items-center pb-4">
              <CardTitle className="text-lg font-medium flex items-center space-x-2 text-white">
                <BarChart3 className="h-5 w-5 text-purple-400" />
                <span>Performance Analytics</span>
              </CardTitle>
              <Link to="/admin/analytics">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  View Detailed Analytics
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <BarChart3 className="h-16 w-16 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-400">Analytics Dashboard</h3>
                    <p className="text-gray-500 mt-2">Detailed analytics charts and metrics will be displayed here.</p>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Link to="/admin/analytics">View Full Analytics</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
