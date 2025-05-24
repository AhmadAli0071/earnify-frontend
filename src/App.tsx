
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Referrals from "./pages/Referrals";
import Settings from "./pages/Settings";
import NewsFeed from "./pages/NewsFeed";
import NotFound from "./pages/NotFound";

// Admin Panel Routes
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import PackageManagement from "./pages/Admin/PackageManagement";
import DepositManagement from "./pages/Admin/DepositManagement";
import WithdrawalManagement from "./pages/Admin/WithdrawalManagement";
import TaskManagement from "./pages/Admin/TaskManagement";
import NewsfeedManagement from "./pages/Admin/NewsfeedManagement";
import AdminSettings from "./pages/Admin/AdminSettings";

// Protected Route Components
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userEmail = localStorage.getItem("userEmail");
  
  if (!userEmail) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const userEmail = localStorage.getItem("userEmail");
  
  if (!userEmail) {
    return <Navigate to="/login" replace />;
  }
  
  if (userEmail !== "admin@earnify.com") {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Main App Component
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* User Dashboard Routes - Protected */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/tasks" element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              } />
              <Route path="/deposit" element={
                <ProtectedRoute>
                  <Deposit />
                </ProtectedRoute>
              } />
              <Route path="/withdraw" element={
                <ProtectedRoute>
                  <Withdraw />
                </ProtectedRoute>
              } />
              <Route path="/referrals" element={
                <ProtectedRoute>
                  <Referrals />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/news-feed" element={
                <ProtectedRoute>
                  <NewsFeed />
                </ProtectedRoute>
              } />
              
              {/* Admin Panel Routes - Admin Protected */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/users" element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              } />
              <Route path="/admin/packages" element={
                <AdminRoute>
                  <PackageManagement />
                </AdminRoute>
              } />
              <Route path="/admin/deposits" element={
                <AdminRoute>
                  <DepositManagement />
                </AdminRoute>
              } />
              <Route path="/admin/withdrawals" element={
                <AdminRoute>
                  <WithdrawalManagement />
                </AdminRoute>
              } />
              <Route path="/admin/tasks" element={
                <AdminRoute>
                  <TaskManagement />
                </AdminRoute>
              } />
              <Route path="/admin/newsfeed" element={
                <AdminRoute>
                  <NewsfeedManagement />
                </AdminRoute>
              } />
              <Route path="/admin/settings" element={
                <AdminRoute>
                  <AdminSettings />
                </AdminRoute>
              } />
              <Route path="/admin/referrals" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/analytics" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/security" element={
                <AdminRoute>
                  <AdminSettings />
                </AdminRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
