
import { useState } from "react";
import { Check, Copy, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";

const packages = [
  { deposit: 10, dailyEarn: 0.4, tasks: 5 },
  { deposit: 20, dailyEarn: 0.8, tasks: 5 },
  { deposit: 50, dailyEarn: 1.5, tasks: 5, featured: true },
  { deposit: 100, dailyEarn: 3, tasks: 5 },
  { deposit: 200, dailyEarn: 6, tasks: 5 },
  { deposit: 500, dailyEarn: 16, tasks: 5 },
  { deposit: 1000, dailyEarn: 32, tasks: 5 }
];

const Deposit = () => {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<null | typeof packages[0]>(null);
  const [paymentMethod, setPaymentMethod] = useState("binance");
  const [file, setFile] = useState<File | null>(null);
  
  const handlePackageSelect = (pkg: typeof packages[0]) => {
    setSelectedPackage(pkg);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast("Deposit submitted", {
      description: "We will process your deposit soon.",
    });
    // Reset the form
    setStep(1);
    setSelectedPackage(null);
    setFile(null);
  };
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh");
    toast("Address copied!", {
      description: "Wallet address copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold font-heading text-gray-800 mb-6">Deposit</h1>
          
          {step === 1 && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-xl font-medium mb-2">Select a Package</h2>
                <p className="text-gray-600">Choose the investment package that suits your budget</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages.map((pkg, index) => (
                  <PackageCard 
                    key={index}
                    deposit={pkg.deposit}
                    dailyEarn={pkg.dailyEarn}
                    tasks={pkg.tasks}
                    featured={pkg.featured}
                    onSelect={() => handlePackageSelect(pkg)}
                  />
                ))}
              </div>
              
              <div className="mt-10 bg-white rounded-lg border border-gray-100 p-6">
                <h3 className="text-lg font-medium mb-4">Package Information</h3>
                <div className="space-y-3 text-gray-600">
                  <p>• All packages include 5 daily tasks to complete</p>
                  <p>• Daily earnings are credited automatically upon task completion</p>
                  <p>• You can withdraw your earnings anytime</p>
                  <p>• Packages can be upgraded at any time by making a new deposit</p>
                </div>
              </div>
            </>
          )}
          
          {step === 2 && selectedPackage && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Complete Your Deposit</CardTitle>
                <CardDescription>
                  Send exactly ${selectedPackage.deposit} to the address below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base">Selected Package</Label>
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <span className="font-medium">${selectedPackage.deposit} Package</span>
                          <span className="text-earnify-green">${selectedPackage.dailyEarn}/day</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <Label className="text-base">Payment Method</Label>
                      <RadioGroup 
                        value={paymentMethod} 
                        onValueChange={setPaymentMethod} 
                        className="flex flex-col space-y-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="binance" id="binance" />
                          <Label htmlFor="binance" className="font-normal cursor-pointer">
                            Binance Pay
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bitcoin" id="bitcoin" />
                          <Label htmlFor="bitcoin" className="font-normal cursor-pointer">
                            Bitcoin
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="usdt" id="usdt" />
                          <Label htmlFor="usdt" className="font-normal cursor-pointer">
                            USDT (TRC-20)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-base">Wallet Address</Label>
                      <div className="flex">
                        <Input 
                          value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" 
                          readOnly 
                          className="flex-1 rounded-r-none"
                        />
                        <Button 
                          type="button"
                          variant="outline" 
                          className="rounded-l-none"
                          onClick={handleCopyAddress}
                        >
                          <Copy size={16} />
                        </Button>
                      </div>
                      <p className="text-sm text-red-500">
                        Important: Send exactly ${selectedPackage.deposit} to this address
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-base">Upload Proof (Optional)</Label>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                        <Input
                          type="file"
                          id="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                        <Label htmlFor="file" className="cursor-pointer">
                          <div className="flex flex-col items-center">
                            <Upload size={24} className="text-gray-400 mb-2" />
                            <span className="text-sm font-medium text-gray-700">
                              {file ? file.name : "Click to upload screenshot"}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                              PNG, JPG up to 5MB
                            </span>
                          </div>
                        </Label>
                        {file && (
                          <div className="mt-3 flex items-center justify-center text-sm text-earnify-blue">
                            <Check size={16} className="mr-1" />
                            File uploaded successfully
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Back to Packages
                    </Button>
                    <Button type="submit">
                      Submit Deposit
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col space-y-4 border-t pt-6">
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Your deposit will be processed within 1-2 hours during business hours</p>
                  <p>• Make sure to send the exact amount specified</p>
                  <p>• For assistance, contact support@earnify.com</p>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Deposit;
