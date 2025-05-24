
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  TrendingUp,
  Calendar,
  Users
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import { useForm } from "react-hook-form";

export default function PackageManagement() {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Starter Package",
      amount: 20,
      monthlyReturn: 80,
      roiPercentage: 400,
      duration: 30,
      isActive: true,
      subscribers: 1250,
      description: "Perfect for beginners"
    },
    {
      id: 2,
      name: "Premium Package",
      amount: 50,
      monthlyReturn: 200,
      roiPercentage: 400,
      duration: 30,
      isActive: true,
      subscribers: 890,
      description: "Most popular choice"
    },
    {
      id: 3,
      name: "VIP Package",
      amount: 100,
      monthlyReturn: 400,
      roiPercentage: 400,
      duration: 30,
      isActive: false,
      subscribers: 340,
      description: "High returns for serious investors"
    }
  ]);

  const form = useForm({
    defaultValues: {
      name: "",
      amount: 0,
      monthlyReturn: 0,
      duration: 30,
      description: ""
    }
  });

  const togglePackageStatus = (id: number) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, isActive: !pkg.isActive } : pkg
    ));
  };

  const calculateROI = (amount: number, monthlyReturn: number) => {
    return ((monthlyReturn / amount) * 100).toFixed(0);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Package Management</h1>
            <p className="text-gray-400">Create and manage earning packages for your users</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Package
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Create New Package</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Set up a new earning package for your users
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Package Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Premium Package" 
                            className="bg-gray-800 border-gray-700 text-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Investment Amount ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="50" 
                              className="bg-gray-800 border-gray-700 text-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="monthlyReturn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Monthly Return ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="200" 
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
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Duration (Days)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="30" 
                            className="bg-gray-800 border-gray-700 text-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Description</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Package description..." 
                            className="bg-gray-800 border-gray-700 text-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-2 pt-4">
                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                      Create Package
                    </Button>
                    <Button type="button" variant="outline" className="border-gray-700 text-gray-300">
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Package Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-indigo-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Packages</p>
                  <p className="text-2xl font-bold text-white">{packages.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Active Packages</p>
                  <p className="text-2xl font-bold text-green-400">{packages.filter(p => p.isActive).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Subscribers</p>
                  <p className="text-2xl font-bold text-blue-400">{packages.reduce((sum, p) => sum + p.subscribers, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Avg ROI</p>
                  <p className="text-2xl font-bold text-yellow-400">400%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Packages Table */}
        <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Package className="h-5 w-5 text-indigo-400" />
              <span>All Packages</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">Package</TableHead>
                  <TableHead className="text-gray-400">Investment</TableHead>
                  <TableHead className="text-gray-400">Monthly Return</TableHead>
                  <TableHead className="text-gray-400">ROI</TableHead>
                  <TableHead className="text-gray-400">Duration</TableHead>
                  <TableHead className="text-gray-400">Subscribers</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.id} className="border-gray-800 hover:bg-gray-800/50">
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{pkg.name}</p>
                        <p className="text-gray-400 text-sm">{pkg.description}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-white font-medium">${pkg.amount}</TableCell>
                    <TableCell className="text-green-400 font-medium">${pkg.monthlyReturn}</TableCell>
                    <TableCell>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {calculateROI(pkg.amount, pkg.monthlyReturn)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">{pkg.duration} days</TableCell>
                    <TableCell className="text-blue-400">{pkg.subscribers}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={pkg.isActive}
                          onCheckedChange={() => togglePackageStatus(pkg.id)}
                        />
                        <Badge className={pkg.isActive ? 
                          "bg-green-500/20 text-green-500 border-green-500/30" : 
                          "bg-red-500/20 text-red-500 border-red-500/30"
                        }>
                          {pkg.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-indigo-700 text-indigo-400">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-700 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
