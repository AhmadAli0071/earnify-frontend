
import { useNavigate } from "react-router-dom";
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  CheckSquare, 
  CreditCard, 
  ArrowUp,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import TaskCard from "@/components/TaskCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const statCards = [
    { title: "Wallet Balance", value: "$12.40", icon: Wallet, color: "blue" },
    { title: "Total Earned", value: "$42.80", icon: TrendingUp, color: "green", trend: { value: 8, positive: true } },
    { title: "Withdrawable", value: "$10.00", icon: ArrowUp, color: "blue" },
    { title: "Referrals", value: "3", icon: Users, color: "green" }
  ];

  const sampleTasks = [
    { id: "task1", title: "Follow @earnify on Instagram", platform: "instagram", completed: false },
    { id: "task2", title: "Like our Facebook post", platform: "facebook", completed: true },
    { id: "task3", title: "Retweet our latest announcement", platform: "twitter", completed: false }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold font-heading text-gray-800 mb-6">Dashboard</h1>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                trend={stat.trend}
              />
            ))}
          </div>
          
          {/* Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Daily Tasks */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg font-medium">Daily Tasks</CardTitle>
                  <CardDescription>Complete tasks to earn daily rewards</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-earnify-blue" onClick={() => navigate('/tasks')}>
                  View All
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleTasks.map(task => (
                    <TaskCard 
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      platform={task.platform as any}
                      completed={task.completed}
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-earnify-blue">2/5</span> tasks completed today
                </div>
                <Progress value={40} className="w-1/2 h-2" />
              </CardFooter>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
                <CardDescription>Access common features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left font-normal"
                  onClick={() => navigate('/deposit')}
                >
                  <CreditCard size={18} className="mr-2 text-earnify-blue" />
                  Deposit Funds
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left font-normal"
                  onClick={() => navigate('/withdraw')}
                >
                  <ArrowUp size={18} className="mr-2 text-earnify-green" />
                  Withdraw Earnings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left font-normal"
                  onClick={() => navigate('/referrals')}
                >
                  <Users size={18} className="mr-2 text-earnify-blue" />
                  Invite Friends
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Current Package Info */}
          <div className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Your Active Package</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6 items-center">
                  <div>
                    <div className="text-3xl font-bold text-gray-800 font-heading">$10</div>
                    <div className="text-sm text-gray-500">Current package</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200 hidden sm:block"></div>
                  <div>
                    <div className="text-lg font-semibold text-earnify-green">$0.40</div>
                    <div className="text-sm text-gray-500">Daily earnings</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200 hidden sm:block"></div>
                  <div>
                    <div className="text-lg font-semibold">31 days</div>
                    <div className="text-sm text-gray-500">Until ROI</div>
                  </div>
                  <div className="ml-auto">
                    <Button onClick={() => navigate('/deposit')}>
                      <CreditCard size={18} className="mr-2" />
                      Upgrade Package
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
