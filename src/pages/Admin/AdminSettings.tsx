
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Settings,
  Shield,
  Bell,
  Database,
  Mail,
  Globe,
  Lock,
  User,
  Save
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import { useForm } from "react-hook-form";

export default function AdminSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newUserRegistration, setNewUserRegistration] = useState(true);

  const profileForm = useForm({
    defaultValues: {
      name: "Admin",
      email: "admin@earnify.com",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const siteForm = useForm({
    defaultValues: {
      siteName: "Earnify",
      siteDescription: "Earn money by completing simple tasks",
      supportEmail: "support@earnify.com",
      minWithdrawal: "10",
      maxWithdrawal: "1000",
      referralBonus: "5"
    }
  });

  const onProfileSubmit = (data: any) => {
    console.log("Profile updated:", data);
  };

  const onSiteSubmit = (data: any) => {
    console.log("Site settings updated:", data);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Admin Settings</h1>
            <p className="text-gray-400">Manage platform settings and configuration</p>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-gray-900/70 border border-gray-800 mb-6">
            <TabsTrigger value="general" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-indigo-400" />
                  <span>Site Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...siteForm}>
                  <form onSubmit={siteForm.handleSubmit(onSiteSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={siteForm.control}
                        name="siteName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Site Name</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={siteForm.control}
                        name="supportEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Support Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={siteForm.control}
                      name="siteDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Site Description</FormLabel>
                          <FormControl>
                            <textarea 
                              className="w-full h-24 p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={siteForm.control}
                        name="minWithdrawal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Min Withdrawal ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={siteForm.control}
                        name="maxWithdrawal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Max Withdrawal ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={siteForm.control}
                        name="referralBonus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Referral Bonus ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Database className="h-5 w-5 text-indigo-400" />
                  <span>Platform Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Maintenance Mode</h3>
                    <p className="text-gray-400 text-sm">Put the site in maintenance mode for updates</p>
                  </div>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">New User Registration</h3>
                    <p className="text-gray-400 text-sm">Allow new users to register accounts</p>
                  </div>
                  <Switch
                    checked={newUserRegistration}
                    onCheckedChange={setNewUserRegistration}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <User className="h-5 w-5 text-indigo-400" />
                  <span>Admin Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={profileForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Current Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">New Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-400">Confirm Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                      <Save className="h-4 w-4 mr-2" />
                      Update Profile
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-indigo-400" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-gray-400 text-sm mb-4">Add an extra layer of security to your admin account</p>
                  <Button variant="outline" className="border-blue-700 text-blue-400">
                    Enable 2FA
                  </Button>
                </div>
                
                <div className="p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Session Management</h3>
                  <p className="text-gray-400 text-sm mb-4">View and manage active admin sessions</p>
                  <Button variant="outline" className="border-green-700 text-green-400">
                    View Sessions
                  </Button>
                </div>
                
                <div className="p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Security Logs</h3>
                  <p className="text-gray-400 text-sm mb-4">Review recent security events and login attempts</p>
                  <Button variant="outline" className="border-yellow-700 text-yellow-400">
                    View Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-indigo-400" />
                  <span>Notification Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Email Notifications</h3>
                    <p className="text-gray-400 text-sm">Receive email alerts for important events</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="space-y-4 pl-4 border-l-2 border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">New user registrations</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Deposit requests</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Withdrawal requests</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Task submissions</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">System alerts</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
