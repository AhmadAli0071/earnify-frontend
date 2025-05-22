
import { useNavigate } from "react-router-dom";
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  CheckSquare, 
  CreditCard, 
  ArrowUp,
  ArrowRight,
  Activity,
  Bell,
  Calendar,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import TaskCard from "@/components/TaskCard";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const statCards = [
    { 
      title: "Wallet Balance", 
      value: "$12.40", 
      icon: Wallet, 
      color: "blue", 
      trend: { value: 8, positive: true },
      type: "wallet" 
    },
    { 
      title: "Total Earned", 
      value: "$42.80", 
      icon: TrendingUp, 
      color: "green", 
      trend: { value: 8, positive: true },
      type: "total" 
    },
    { 
      title: "Withdrawable", 
      value: "$10.00", 
      icon: ArrowUp, 
      color: "blue",
      type: "withdrawable" 
    },
    { 
      title: "Referrals", 
      value: "3", 
      icon: Users, 
      color: "blue",
      type: "referrals" 
    }
  ];

  const sampleTasks = [
    { 
      id: "task1", 
      title: "Follow @earnify on Instagram", 
      platform: "instagram", 
      completed: false,
      estimatedTime: "1-2 min"
    },
    { 
      id: "task2", 
      title: "Like our Facebook post", 
      platform: "facebook", 
      completed: true,
      estimatedTime: "1 min" 
    },
    { 
      id: "task3", 
      title: "Retweet our latest announcement", 
      platform: "twitter", 
      completed: false,
      estimatedTime: "2 min"
    }
  ];

  const recentActivity = [
    { id: 1, type: "task", description: "Completed Instagram task", amount: "+$0.20", time: "2 hours ago" },
    { id: 2, type: "referral", description: "New referral signup", amount: "+$1.00", time: "Yesterday" },
    { id: 3, type: "withdrawal", description: "Withdrawal to PayPal", amount: "-$5.00", time: "3 days ago" },
  ];

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Function to navigate to deposit page
  const goToDepositPage = () => {
    navigate('/packages');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Top section with header and notifications */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <h1 className="text-3xl font-bold text-gray-800 font-heading">Dashboard</h1>
              <p className="text-gray-500">Welcome back, let's continue earning!</p>
            </motion.div>
            
            <div className="flex items-center gap-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-white rounded-full hover:bg-gray-100">
                      <Calendar className="w-5 h-5 text-gray-700 mr-1" /> Today
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 w-80">
                        <h4 className="text-sm font-medium mb-2">Your Calendar</h4>
                        <p className="text-xs text-gray-500 mb-4">You have 2 tasks scheduled for today</p>
                        <Button className="w-full" size="sm">View Full Calendar</Button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <Button variant="outline" size="icon" className="rounded-full relative bg-white border-gray-200">
                <Bell size={18} className="text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="h-28 animate-pulse">
                  <CardContent className="p-6 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {statCards.map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <StatCard 
                    title={stat.title} 
                    value={stat.value} 
                    icon={stat.icon} 
                    color={stat.color} 
                    trend={stat.trend} 
                    type={stat.type}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {/* Main Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Daily Tasks */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-0 shadow-md overflow-hidden bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2 border-b bg-gray-50">
                  <div>
                    <CardTitle className="text-lg font-medium flex items-center">
                      <CheckSquare className="mr-2 h-5 w-5 text-purple-500" />
                      Daily Tasks
                    </CardTitle>
                    <CardDescription>Complete tasks to earn daily rewards</CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-purple-600 group"
                    onClick={() => navigate('/tasks')}
                  >
                    View All
                    <ArrowRight size={16} className="ml-1 transition-all duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {sampleTasks.map((task, index) => (
                      <motion.div 
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index + 0.4 }}
                      >
                        <TaskCard 
                          id={task.id}
                          title={task.title}
                          platform={task.platform as any}
                          completed={task.completed}
                          estimatedTime={task.estimatedTime}
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4 bg-gray-50">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-purple-600">2/5</span> tasks completed today
                  </div>
                  <Progress value={40} className="w-1/2 h-2" />
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-0 shadow-md bg-white h-full">
                <CardHeader className="border-b bg-gray-50">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-amber-500" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Access common features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                    onClick={goToDepositPage}
                  >
                    <CreditCard size={18} className="mr-2 text-blue-500" />
                    Choose Package
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal hover:border-green-500 hover:text-green-600 transition-all duration-300"
                    onClick={() => navigate('/withdraw')}
                  >
                    <ArrowUp size={18} className="mr-2 text-green-500" />
                    Withdraw Earnings
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal hover:border-pink-500 hover:text-pink-600 transition-all duration-300"
                    onClick={() => navigate('/referrals')}
                  >
                    <Users size={18} className="mr-2 text-pink-500" />
                    Invite Friends
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Additional row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Current Package Info */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="border-0 shadow-md bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                <CardHeader className="pb-3 border-b border-white/10">
                  <CardTitle className="text-lg font-medium">Your Active Package</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-6 items-center">
                    <div>
                      <div className="text-3xl font-bold font-heading">$10</div>
                      <div className="text-sm text-white/80">Current package</div>
                    </div>
                    <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
                    <div>
                      <div className="text-lg font-semibold text-green-300">$0.40</div>
                      <div className="text-sm text-white/80">Daily earnings</div>
                    </div>
                    <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
                    <div>
                      <div className="text-lg font-semibold">31 days</div>
                      <div className="text-sm text-white/80">Until ROI</div>
                    </div>
                    <div className="ml-auto">
                      <Button 
                        onClick={() => navigate('/packages')}
                        className="bg-white hover:bg-gray-100 text-purple-700 transition-all duration-300"
                      >
                        <CreditCard size={18} className="mr-2" />
                        Upgrade Package
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="border-0 shadow-md bg-white h-full">
                <CardHeader className="border-b bg-gray-50">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Activity size={18} className="mr-2 text-purple-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {recentActivity.map((item, index) => (
                      <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{item.description}</p>
                            <p className="text-xs text-gray-500">{item.time}</p>
                          </div>
                          <span className={`text-sm font-medium ${
                            item.amount.startsWith("+") ? "text-green-600" : "text-red-500"
                          }`}>
                            {item.amount}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
