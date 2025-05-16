
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  CreditCard,
  ArrowUp,
  UserPlus,
  Newspaper,
  BarChart3,
  Package,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  Settings,
  ChevronDown,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

// For demonstration purposes - in a real app this would be tied to your auth system
const isAdmin = () => {
  return localStorage.getItem("userEmail") === "admin@earnify.com";
};

type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  path: string;
  active?: boolean;
  badge?: string;
};

const SidebarItem = ({ icon, label, path, active, badge }: SidebarItemProps) => {
  return (
    <Link to={path}>
      <motion.div
        className={`flex items-center justify-between px-3 py-2.5 rounded-lg mb-1 transition-all duration-200 ${
          active
            ? "bg-indigo-600 text-white"
            : "text-gray-400 hover:text-indigo-100 hover:bg-indigo-900/30"
        }`}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center space-x-3">
          <div className="text-lg">{icon}</div>
          <span className="font-medium">{label}</span>
        </div>
        {badge && (
          <Badge variant="outline" className="bg-indigo-900/50 text-indigo-200 border-indigo-700">
            {badge}
          </Badge>
        )}
      </motion.div>
    </Link>
  );
};

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<boolean>(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New user registered", time: "2 min ago" },
    { id: 2, title: "Withdrawal request", time: "15 min ago" },
    { id: 3, title: "Task submission", time: "1 hour ago" }
  ]);
  
  useEffect(() => {
    // Check if the user is admin
    setAdminUser(isAdmin());
  }, []);
  
  // If not admin, redirect to login
  if (!adminUser) {
    return <Navigate to="/login" replace />;
  }

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin" },
    { icon: <Users size={20} />, label: "Users", path: "/admin/users", badge: "8,249" },
    { icon: <CheckSquare size={20} />, label: "Tasks", path: "/admin/tasks", badge: "24" },
    { icon: <CreditCard size={20} />, label: "Deposits", path: "/admin/deposits" },
    { icon: <ArrowUp size={20} />, label: "Withdrawals", path: "/admin/withdrawals", badge: "12" },
    { icon: <UserPlus size={20} />, label: "Referrals", path: "/admin/referrals" },
    { icon: <Newspaper size={20} />, label: "News Feed", path: "/admin/newsfeed" },
    { icon: <BarChart3 size={20} />, label: "Analytics", path: "/admin/analytics" },
    { icon: <Package size={20} />, label: "Packages", path: "/admin/packages" },
    { icon: <Shield size={20} />, label: "Security", path: "/admin/security" },
  ];

  const handleSignOut = () => {
    localStorage.removeItem("userEmail");
    toast.success("Signed out successfully");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950/40 text-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900/80 backdrop-blur-md border-b border-gray-800 py-3 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="text-gray-300 hover:text-white hover:bg-transparent"
          >
            {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
              E
            </div>
            <span className="font-semibold text-lg">Admin</span>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-48px)] md:h-screen">
        {/* Sidebar - Desktop permanently visible, Mobile conditionally */}
        <motion.div
          className={`fixed md:relative z-30 md:z-auto w-64 h-full md:h-screen bg-gray-900/80 backdrop-blur-lg border-r border-gray-800/50 transform transition-transform duration-300 ease-in-out ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
          initial={false}
        >
          {/* Sidebar Header */}
          <div className="h-16 flex items-center px-6 border-b border-gray-800/50">
            <Link to="/admin" className="flex items-center space-x-2">
              <motion.div 
                className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                E
              </motion.div>
              <span className="font-semibold text-lg text-white">Earnify Admin</span>
            </Link>
          </div>

          {/* Sidebar Content */}
          <div className="py-4 px-3 overflow-y-auto h-[calc(100%-10rem)]">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={item.label}
                path={item.path}
                active={location.pathname === item.path}
                badge={item.badge}
              />
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800/50 p-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
              onClick={handleSignOut}
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-x-hidden flex flex-col">
          {/* Top Bar */}
          <div className="h-16 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="relative w-72 hidden md:block">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-8 bg-gray-800/50 border-gray-700/50 focus:border-indigo-600 text-gray-300"
              />
            </div>
            
            <div className="flex items-center space-x-4 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 bg-gray-900 border-gray-800 text-gray-300">
                  <DropdownMenuLabel className="text-gray-400">Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  {notifications.map(notification => (
                    <DropdownMenuItem key={notification.id} className="py-2 hover:bg-gray-800 cursor-pointer">
                      <div>
                        <p className="text-sm font-medium text-white">{notification.title}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="justify-center hover:bg-gray-800 cursor-pointer">
                    <span className="text-indigo-400 text-xs font-medium">View All Notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 py-1 px-2 rounded-full">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-indigo-600 text-white">A</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-300">Admin</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800 text-gray-300">
                  <DropdownMenuLabel className="text-gray-400">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                    <Settings size={16} className="mr-2" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                    <Shield size={16} className="mr-2" />
                    <span>Security</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-red-400" onClick={handleSignOut}>
                    <LogOut size={16} className="mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {children}
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
}
