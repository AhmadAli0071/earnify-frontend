
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
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

// For demonstration purposes - in a real app this would be tied to your auth system
const isAdmin = () => {
  return localStorage.getItem("userEmail") === "admin@earnify.com";
};

type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  path: string;
  active?: boolean;
};

const SidebarItem = ({ icon, label, path, active }: SidebarItemProps) => {
  return (
    <Link to={path}>
      <motion.div
        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
          active
            ? "bg-indigo-900/50 text-indigo-100"
            : "text-gray-400 hover:text-gray-100 hover:bg-indigo-900/20"
        }`}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-lg">{icon}</div>
        <span className="font-medium">{label}</span>
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
    { icon: <Users size={20} />, label: "Users", path: "/admin/users" },
    { icon: <CheckSquare size={20} />, label: "Tasks", path: "/admin/tasks" },
    { icon: <CreditCard size={20} />, label: "Deposits", path: "/admin/deposits" },
    { icon: <ArrowUp size={20} />, label: "Withdrawals", path: "/admin/withdrawals" },
    { icon: <UserPlus size={20} />, label: "Referrals", path: "/admin/referrals" },
    { icon: <Newspaper size={20} />, label: "News Feed", path: "/admin/newsfeed" },
    { icon: <BarChart3 size={20} />, label: "Analytics", path: "/admin/analytics" },
    { icon: <Package size={20} />, label: "Packages", path: "/admin/packages" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 border-b border-gray-800 py-3 px-4 flex items-center justify-between">
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
          className={`fixed md:relative z-30 md:z-auto w-64 h-full md:h-screen bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
          initial={false}
        >
          {/* Sidebar Header */}
          <div className="h-16 flex items-center px-6 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                E
              </div>
              <span className="font-semibold text-lg">Earnify Admin</span>
            </div>
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
              />
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 p-3">
            <Link to="/login">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                onClick={() => {
                  // Clear admin status for demo
                  localStorage.removeItem("userEmail");
                }}
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-x-hidden bg-gray-950">
          {/* Top Bar */}
          <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 hidden md:flex">
            <div className="relative w-72">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-8 bg-gray-900 border-gray-700 focus:border-indigo-600 text-gray-300"
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gray-900 rounded-full px-3 py-1.5">
                <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center">
                  A
                </div>
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
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
