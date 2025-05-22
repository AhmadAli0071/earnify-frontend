
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
import { toast } from "@/components/ui/sonner";

// This is just a placeholder function - in a real app, you'd have actual auth logic
const isAuthenticated = () => {
  // For demo purposes, check if we're on any page other than home, login, or register
  // In a real app, this would check for a valid auth token or user session
  const path = window.location.pathname;
  const userEmail = localStorage.getItem("userEmail");
  
  return userEmail !== null && path !== "/" && path !== "/login" && path !== "/register";
};

const isAdmin = () => {
  const userEmail = localStorage.getItem("userEmail");
  return userEmail === "admin@earnify.com";
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const authenticated = isAuthenticated();
  const admin = isAdmin();

  // Determine if we're on the landing page
  const isLandingPage = location.pathname === "/";

  // Only show these links after login
  const authenticatedNavLinks = admin 
    ? [] // Admin doesn't need these links since they'll be in the admin panel
    : [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "Tasks", path: "/tasks", icon: <CheckSquare size={18} /> },
        { name: "Packages", path: "/deposit", icon: <CreditCard size={18} /> }, // Updated "Deposit" to "Packages"
        { name: "Withdraw", path: "/withdraw", icon: <ArrowUp size={18} /> },
        { name: "Referrals", path: "/referrals", icon: <Users size={18} /> },
        { name: "News Feed", path: "/news-feed", icon: <Newspaper size={18} /> },
        { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
      ];
  
  // Show these links on landing page only
  const unauthenticatedNavLinks = isLandingPage ? [] : [
    { name: "Login", path: "/login", icon: null },
    { name: "Register", path: "/register", icon: null },
  ];
  
  // Use appropriate nav links based on auth status
  const navLinks = authenticated ? authenticatedNavLinks : unauthenticatedNavLinks;

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  // If admin is logged in on a user page, redirect to admin panel
  if (admin && !location.pathname.startsWith('/admin')) {
    window.location.href = "/admin";
    return null;
  }

  return (
    <motion.nav 
      className={`${authenticated ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'} sticky top-0 z-50`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to={authenticated ? (admin ? "/admin" : "/dashboard") : "/"} className="flex items-center space-x-2">
            <motion.div 
              className={`h-10 w-10 rounded-full ${authenticated ? 'bg-gradient-to-br from-violet-600 to-indigo-600' : 'bg-white/10 backdrop-blur-md border border-white/20'} flex items-center justify-center text-white font-bold text-lg`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              E
            </motion.div>
            <span className={`font-heading font-bold text-xl ${authenticated ? 'text-gray-800' : 'text-white'}`}>Earnify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {navLinks.map((link) => (
              <HoverCard key={link.path} openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Link
                    to={link.path}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      authenticated 
                        ? (location.pathname === link.path
                          ? "text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md"
                          : "text-gray-600 hover:bg-gray-100")
                        : "text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md"
                    }`}
                  >
                    {link.icon && <span className="mr-2">{link.icon}</span>}
                    {link.name}
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto p-2">
                  <span className="text-xs font-medium">{`Go to ${link.name}`}</span>
                </HoverCardContent>
              </HoverCard>
            ))}
            
            {isLandingPage && (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-white text-indigo-600 hover:bg-white/90">
                    Register
                  </Button>
                </Link>
              </>
            )}
            
            {authenticated && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-red-500 transition-all duration-300"
                onClick={handleLogout}
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
              className={`${authenticated ? 'text-gray-600' : 'text-white'} hover:bg-white/10 focus:outline-none`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div 
        className={`md:hidden ${authenticated ? 'bg-white' : 'bg-black/70 backdrop-blur-md'} ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4 space-y-1">
          {isLandingPage && !authenticated && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Link
                  to="/login"
                  className="flex items-center px-4 py-3 rounded-md text-base font-medium text-white hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Link
                  to="/register"
                  className="flex items-center px-4 py-3 rounded-md text-base font-medium text-white hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </motion.div>
            </>
          )}
          
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <Link
                to={link.path}
                className={`flex items-center px-4 py-3 rounded-md text-base font-medium ${
                  authenticated
                    ? (location.pathname === link.path
                      ? "bg-indigo-50 text-indigo-600" 
                      : "text-gray-600 hover:bg-gray-50")
                    : "text-white hover:bg-white/10"
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
                className="w-full flex items-center px-4 py-3 rounded-md text-base font-medium text-red-500 hover:bg-red-50"
                onClick={handleLogout}
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
