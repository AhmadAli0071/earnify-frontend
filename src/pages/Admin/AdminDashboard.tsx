
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Package,
  CreditCard,
  ArrowUp,
  CheckSquare,
  UserPlus,
  Newspaper,
  AlertCircle,
  BarChart3,
  ChevronRight,
  Activity,
  DollarSign,
  Calendar
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  
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
      color: "from-indigo-600 to-purple-600",
      link: "/admin/users"
    },
    { 
      title: "Active Packages", 
      value: "5", 
      change: "+2 this month", 
      changePositive: true,
      icon: <Package className="h-8 w-8 text-green-400" />,
      color: "from-green-600 to-emerald-600",
      link: "/admin/packages"
    },
    { 
      title: "Pending Deposits", 
      value: "24", 
      change: "Needs Review", 
      changePositive: false,
      icon: <CreditCard className="h-8 w-8 text-orange-400" />,
      color: "from-orange-600 to-amber-600",
      link: "/admin/deposits"
    },
    { 
      title: "Pending Withdrawals", 
      value: "12", 
      change: "$4,395 total", 
      changePositive: false,
      icon: <ArrowUp className="h-8 w-8 text-sky-400" />,
      color: "from-sky-600 to-blue-600",
      link: "/admin/withdrawals"
    }
  ];

  const quickActions = [
    { title: "Manage Users", description: "View and manage user accounts", icon: Users, link: "/admin/users" },
    { title: "Review Deposits", description: "Approve pending deposits", icon: CreditCard, link: "/admin/deposits" },
    { title: "Manage Tasks", description: "Create and review tasks", icon: CheckSquare, link: "/admin/tasks" },
    { title: "Withdrawal Requests", description: "Process withdrawals", icon: ArrowUp, link: "/admin/withdrawals" },
    { title: "Package Management", description: "Create and edit packages", icon: Package, link: "/admin/packages" },
    { title: "Post Announcements", description: "Update newsfeed", icon: Newspaper, link: "/admin/newsfeed" }
  ];

  const recentActivity = [
    { id: 1, type: "user", message: "New user registration: Alex Thompson", time: "5 min ago" },
    { id: 2, type: "deposit", message: "Deposit request of $100 from Madison Lee", time: "12 min ago" },
    { id: 3, type: "withdrawal", message: "Withdrawal approved for Devon Smith ($50)", time: "25 min ago" },
    { id: 4, type: "task", message: "Task submission by Riley Johnson", time: "1 hour ago" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, manage your Earnify platform</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-gray-700 text-indigo-400 hover:text-indigo-300">
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
                <CardContent className="p-6 h-[120px]"></CardContent>
              </Card>
            ))
          ) : (
            statCards.map((stat, index) => (
              <motion.div variants={itemVariants} key={index}>
                <Link to={stat.link}>
                  <Card className="bg-gray-900/70 border-gray-700/30 backdrop-blur-md overflow-hidden hover:shadow-lg hover:shadow-indigo-900/20 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                          <p className="text-2xl font-bold mt-1 text-white">{stat.value}</p>
                          <div className={`text-xs font-medium mt-1 flex items-center ${stat.changePositive ? 'text-green-500' : 'text-amber-500'}`}>
                            {stat.changePositive ? '↗' : '⚠'} {stat.change}
                          </div>
                        </div>
                        <div className={`h-14 w-14 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-70 flex items-center justify-center shadow-lg`}>
                          {stat.icon}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
        >
          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Activity className="h-5 w-5 text-indigo-400" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Link to={action.link}>
                      <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800/70 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-600/20 flex items-center justify-center">
                            <action.icon className="h-5 w-5 text-indigo-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{action.title}</h3>
                            <p className="text-gray-400 text-sm">{action.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
        >
          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardHeader className="flex-row justify-between items-center">
              <CardTitle className="text-white flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-400" />
                <span>Recent Activity</span>
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    variants={itemVariants}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div className={`h-2 w-2 rounded-full ${
                      activity.type === 'user' ? 'bg-green-500' :
                      activity.type === 'deposit' ? 'bg-blue-500' :
                      activity.type === 'withdrawal' ? 'bg-orange-500' :
                      'bg-purple-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.message}</p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Status */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
        >
          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-green-400" />
                <span>System Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-400">Platform Health</p>
                  <p className="text-sm font-medium text-green-400">Excellent</p>
                </div>
                <Progress value={95} className="h-2 bg-gray-800" />
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-400">User Activity</p>
                  <p className="text-sm font-medium text-white">High</p>
                </div>
                <Progress value={78} className="h-2 bg-gray-800" />
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-400">Payment Processing</p>
                  <p className="text-sm font-medium text-green-400">Online</p>
                </div>
                <Progress value={100} className="h-2 bg-gray-800" />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
