
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  CheckSquare, 
  CreditCard, 
  ArrowUp, 
  Users, 
  Settings, 
  Newspaper
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const isAuthenticated = () => {
  // For now, we'll return true to always show the authenticated navigation links
  return true;
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const authenticated = isAuthenticated();

  const navLinks = authenticated
    ? [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "Tasks", path: "/tasks", icon: <CheckSquare size={18} /> },
        { name: "Deposit", path: "/deposit", icon: <CreditCard size={18} /> },
        { name: "Withdraw", path: "/withdraw", icon: <ArrowUp size={18} /> },
        { name: "Referrals", path: "/referrals", icon: <Users size={18} /> },
        { name: "News Feed", path: "/news-feed", icon: <Newspaper size={18} /> },
        { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
      ]
    : [
        { name: "Home", path: "/", icon: <LayoutDashboard size={18} /> },
        { name: "Login", path: "/login", icon: null },
        { name: "Register", path: "/register", icon: null },
      ];

  return (
    <motion.nav 
      className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              className="h-8 w-8 rounded-full bg-gradient-to-br from-earnify-blue to-earnify-green flex items-center justify-center text-white font-bold text-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              E
            </motion.div>
            <span className="font-heading font-bold text-xl text-gray-800">Earnify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {navLinks.map((link) => (
              <HoverCard key={link.path} openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Link
                    to={link.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      location.pathname === link.path
                        ? "text-earnify-blue bg-blue-50"
                        : "text-gray-600 hover:text-earnify-blue hover:bg-gray-50"
                    }`}
                  >
                    {link.icon && <span className="mr-1.5">{link.icon}</span>}
                    {link.name}
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto p-2">
                  <span className="text-xs font-medium">{`Go to ${link.name}`}</span>
                </HoverCardContent>
              </HoverCard>
            ))}
            {authenticated && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-red-500 transition-all duration-300"
                onClick={() => console.log("Logging out")}
              >
                <LogOut size={18} className="mr-1.5" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-earnify-blue focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div 
        className={`md:hidden bg-white border-b border-gray-100 pb-4 ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 space-y-1">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <Link
                to={link.path}
                className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? "bg-earnify-lightBlue text-earnify-blue"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon && <span className="mr-3">{link.icon}</span>}
                {link.name}
              </Link>
            </motion.div>
          ))}
          {authenticated && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * navLinks.length, duration: 0.3 }}
            >
              <button
                className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => console.log("Logging out")}
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}
