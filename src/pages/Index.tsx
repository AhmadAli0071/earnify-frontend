
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, CreditCard, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import { Suspense } from "react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-6 inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium"
              >
                New way to earn online
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight font-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Earn Daily
                </span> <br className="hidden md:block" />
                Rewards Online
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-white/80 mb-8 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Join thousands of users making extra income by completing 
                simple social media tasks daily. No special skills required.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <Link to="/register">
                  <Button 
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all duration-300 font-bold text-base rounded-full px-8 py-6"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 transition-all duration-300 rounded-full px-8 py-6"
                  >
                    Log In
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-[400px] relative rounded-2xl overflow-hidden border border-white/20 shadow-xl"
            >
              <Suspense fallback={<div className="h-[400px] w-full bg-white/5 animate-pulse"></div>}>
                <Hero3D />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white/5 backdrop-blur-md">
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
                <h3 className="text-3xl md:text-4xl font-bold text-white font-heading mb-2">{stat.number}</h3>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Feature Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold font-heading mb-3">
              Why Choose <span className="text-purple-400">Earnify</span>?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4"></div>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Our platform makes it simple to earn daily rewards with these great features
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <CheckCircle className="h-8 w-8 text-purple-400" />,
                title: "Quick Daily Tasks",
                description: "Complete simple social media tasks in just minutes each day"
              },
              {
                icon: <CreditCard className="h-8 w-8 text-blue-400" />,
                title: "Fast Payouts",
                description: "Withdraw your earnings quickly and securely to your account"
              },
              {
                icon: <Shield className="h-8 w-8 text-purple-400" />,
                title: "Secure Platform",
                description: "Your data and earnings are protected with top-tier security"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="mb-5 p-3 rounded-full bg-white/10">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-blue-800 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Award className="h-16 w-16 text-yellow-300" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-white">
              Ready to Start Earning?
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-xl mx-auto mb-10">
              Join Earnify today and start earning rewards by doing simple tasks you already enjoy.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="inline-block"
            >
              <Link to="/register">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-purple-900 font-bold text-lg px-10 py-6 rounded-full">
                  Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
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
