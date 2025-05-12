
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PackageCard from "@/components/PackageCard";
import TaskCard from "@/components/TaskCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-earnify-blue to-earnify-green text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
            Earn Daily by Doing Easy Tasks
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of users making extra income by completing simple social media tasks daily.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-earnify-blue hover:bg-gray-100">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto bg-earnify-green hover:bg-green-600">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Basic Package Preview */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-800 mb-2">
              Start Earning Today
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Choose from our flexible packages and start earning by completing simple daily tasks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <PackageCard
              deposit={10}
              dailyEarn={0.4}
              tasks={5}
            />
            <PackageCard
              deposit={50}
              dailyEarn={1.5}
              tasks={5}
              featured
            />
            <PackageCard
              deposit={100}
              dailyEarn={3}
              tasks={5}
            />
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/register">
              <Button variant="outline" className="group">
                View All Packages 
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Task Preview Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-800 mb-2">
              Try a Demo Task
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Here's a preview of the simple tasks you'll complete daily to earn rewards.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-4">
            <TaskCard 
              id="1" 
              title="Follow @earnify on Instagram" 
              platform="instagram" 
              demo={true}
            />
            <TaskCard 
              id="2" 
              title="Like our Facebook post" 
              platform="facebook" 
              demo={true}
            />
            <TaskCard 
              id="3" 
              title="Retweet our latest announcement" 
              platform="twitter" 
              demo={true}
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-800 mb-2">
              Why Choose Earnify?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our platform makes it simple to earn daily rewards with these great features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Daily Tasks",
                description: "Simple social media tasks that take just minutes to complete"
              },
              {
                title: "Flexible Packages",
                description: "Choose the investment level that works for your budget"
              },
              {
                title: "Quick Withdrawals",
                description: "Get your earnings sent directly to your wallet anytime"
              },
              {
                title: "Referral Program",
                description: "Earn additional income by inviting friends to join"
              },
              {
                title: "Mobile Friendly",
                description: "Complete tasks from any device, anywhere"
              },
              {
                title: "24/7 Support",
                description: "Our team is available to help whenever you need assistance"
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start p-4">
                <div className="mr-4 text-earnify-blue">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-earnify-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
            Join Earnify today and start earning rewards by doing simple tasks you already enjoy.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-earnify-blue hover:bg-gray-100">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
