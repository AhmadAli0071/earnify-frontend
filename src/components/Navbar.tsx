
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Home, CheckSquare, CreditCard, ArrowUp, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const isAuthenticated = () => {
  // This would be replaced with actual auth check
  return false;
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const authenticated = isAuthenticated();

  const navLinks = authenticated
    ? [
        { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
        { name: "Tasks", path: "/tasks", icon: <CheckSquare size={18} /> },
        { name: "Deposit", path: "/deposit", icon: <CreditCard size={18} /> },
        { name: "Withdraw", path: "/withdraw", icon: <ArrowUp size={18} /> },
        { name: "Referrals", path: "/referrals", icon: <Users size={18} /> },
        { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
      ]
    : [
        { name: "Home", path: "/", icon: <Home size={18} /> },
        { name: "Login", path: "/login", icon: null },
        { name: "Register", path: "/register", icon: null },
      ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-earnify-blue to-earnify-green flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
            <span className="font-heading font-bold text-xl text-gray-800">Earnify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.path
                    ? "text-earnify-blue"
                    : "text-gray-600 hover:text-earnify-blue"
                }`}
              >
                {link.icon && <span className="mr-1.5">{link.icon}</span>}
                {link.name}
              </Link>
            ))}
            {authenticated && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-red-500"
                onClick={() => console.log("Logging out")}
              >
                <LogOut size={18} className="mr-1.5" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-earnify-blue focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 pb-4">
          <div className="container mx-auto px-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
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
            ))}
            {authenticated && (
              <button
                className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => console.log("Logging out")}
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
