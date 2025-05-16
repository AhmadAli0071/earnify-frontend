import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, CreditCard, Users, Clock, Shield, Award, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PackageCard from "@/components/PackageCard";
import TaskCard from "@/components/TaskCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ThreeCanvas from "@/components/ThreeCanvas";
import Hero3D, { Hero3DScene } from "@/components/Hero3D";
import Testimonials from "@/components/Testimonials";
import FeatureCard from "@/components/FeatureCard";
import { Suspense, useEffect, useState } from "react";

const Index = () => {
  const [mounted, setMounted] = useState(false);

  // This helps with Three.js initialization
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-earnify-blue/5 to-earnify-green/5 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-earnify-blue to-earnify-green">
                  Earn Daily
                </span> by Doing Easy Tasks
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-700 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Join thousands of users making extra income by completing simple social media tasks daily. No special skills required.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <Link to="/login">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto border-earnify-blue text-earnify-blue hover:bg-earnify-blue hover:text-white transition-all duration-300"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-earnify-blue to-earnify-green hover:opacity-90 transition-all duration-300"
                  >
                    Register Now
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-[400px] relative"
            >
              <Hero3D />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 border-y border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15K+", label: "Active Users" },
              { number: "3.2M", label: "Tasks Completed" },
              { number: "$520K", label: "Total Paid" },
              { number: "97%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 font-heading mb-2">{stat.number}</h3>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Feature Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-800 mb-2">
              Why Choose Earnify?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-earnify-blue to-earnify-green rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our platform makes it simple to earn daily rewards with these great features
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={Clock}
              title="Quick Daily Tasks"
              description="Complete simple social media tasks in just minutes each day"
              delay={0.1}
            />
            <FeatureCard
              icon={CreditCard}
              title="Fast Payouts"
              description="Withdraw your earnings quickly and securely to your account"
              delay={0.2}
            />
            <FeatureCard
              icon={Users}
              title="Referral Program"
              description="Earn even more by inviting friends to join our platform"
              delay={0.3}
            />
            <FeatureCard
              icon={Shield}
              title="Secure Platform"
              description="Your data and earnings are protected with top-tier security"
              delay={0.4}
            />
          </div>
        </div>
      </section>
      
      {/* Packages Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-800 mb-2">
              Start Earning Today
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-earnify-blue to-earnify-green rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-xl mx-auto">
              Choose from our flexible packages and start earning by completing simple daily tasks
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <PackageCard
                deposit={10}
                dailyEarn={0.4}
                tasks={5}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PackageCard
                deposit={50}
                dailyEarn={1.5}
                tasks={5}
                featured
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <PackageCard
                deposit={100}
                dailyEarn={3}
                tasks={5}
              />
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/register">
              <Button variant="outline" className="group border-earnify-blue text-earnify-blue hover:bg-earnify-blue hover:text-white">
                View All Packages 
                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Task Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-800 mb-2">
              Try a Demo Task
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-earnify-blue to-earnify-green rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-xl mx-auto">
              Here's a preview of the simple tasks you'll complete daily to earn rewards
            </p>
          </motion.div>
          
          <div className="max-w-2xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <TaskCard 
                id="1" 
                title="Follow @earnify on Instagram" 
                platform="instagram" 
                demo={true}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TaskCard 
                id="2" 
                title="Like our Facebook post" 
                platform="facebook" 
                demo={true}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TaskCard 
                id="3" 
                title="Retweet our latest announcement" 
                platform="twitter" 
                demo={true}
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-earnify-blue to-earnify-green opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4 text-white">
              Ready to Start Earning?
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-xl mx-auto mb-8">
              Join Earnify today and start earning rewards by doing simple tasks you already enjoy.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/register">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-earnify-blue font-medium px-8">
                  Create Your Account
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
