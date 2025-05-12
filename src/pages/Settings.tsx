
import { useState } from "react";
import { LogOut, User, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Settings = () => {
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    taskReminders: true,
    withdrawalUpdates: true,
    marketingEmails: false,
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    
    setTimeout(() => {
      setSaving(false);
      toast("Profile updated", {
        description: "Your profile information has been updated successfully.",
      });
      
      // Reset password fields
      setProfileData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
    }, 1500);
  };
  
  const handleNotificationsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    
    setTimeout(() => {
      setSaving(false);
      toast("Notification preferences updated", {
        description: "Your notification settings have been saved.",
      });
    }, 1000);
  };
  
  const handleLogout = () => {
    toast("Logging out", {
      description: "You have been successfully logged out.",
    });
    
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold font-heading text-gray-800 mb-6">Settings</h1>
          
          <Tabs defaultValue="profile" className="max-w-3xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account details and personal information
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleProfileSubmit}>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={profileData.currentPassword}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={profileData.newPassword}
                          onChange={handleProfileChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={profileData.confirmPassword}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      Leave password fields empty if you don't want to change your password
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                    <Button type="submit" disabled={saving}>
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Shield size={18} className="text-earnify-blue mr-2" />
                        <Label htmlFor="emailVerified">Email Verification</Label>
                      </div>
                      <p className="text-sm text-gray-500">
                        Your email address has been verified
                      </p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Verified
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">KYC Verification</h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-amber-800">
                        KYC verification will be required for withdrawals above $500. This feature will be available soon.
                      </p>
                    </div>
                    
                    <Button disabled>
                      <Shield size={16} className="mr-2" />
                      Complete KYC (Coming Soon)
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Session Management</h3>
                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">Current Session</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Active now • Chrome on Windows
                          </p>
                        </div>
                        <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Active
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" color="destructive" onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" />
                      Logout from all devices
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Control when and how you receive notifications
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleNotificationsSubmit}>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center">
                            <Bell size={18} className="text-earnify-blue mr-2" />
                            <Label htmlFor="emailNotifications">Email Notifications</Label>
                          </div>
                          <p className="text-sm text-gray-500">
                            Receive important notifications via email
                          </p>
                        </div>
                        <Switch
                          id="emailNotifications"
                          checked={notifications.emailNotifications}
                          onCheckedChange={(checked) => 
                            handleNotificationChange("emailNotifications", checked)
                          }
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="taskReminders">Task Reminders</Label>
                          <p className="text-sm text-gray-500">
                            Get reminded about daily tasks to complete
                          </p>
                        </div>
                        <Switch
                          id="taskReminders"
                          checked={notifications.taskReminders}
                          onCheckedChange={(checked) => 
                            handleNotificationChange("taskReminders", checked)
                          }
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="withdrawalUpdates">Withdrawal Updates</Label>
                          <p className="text-sm text-gray-500">
                            Get notified about deposit and withdrawal status
                          </p>
                        </div>
                        <Switch
                          id="withdrawalUpdates"
                          checked={notifications.withdrawalUpdates}
                          onCheckedChange={(checked) => 
                            handleNotificationChange("withdrawalUpdates", checked)
                          }
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketingEmails">Marketing Emails</Label>
                          <p className="text-sm text-gray-500">
                            Receive promotional offers and updates
                          </p>
                        </div>
                        <Switch
                          id="marketingEmails"
                          checked={notifications.marketingEmails}
                          onCheckedChange={(checked) => 
                            handleNotificationChange("marketingEmails", checked)
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="ml-auto" disabled={saving}>
                      {saving ? "Saving..." : "Save Preferences"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
