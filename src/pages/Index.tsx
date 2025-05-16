
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, CreditCard, Shield, Award, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import { Suspense } from "react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-950 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-6 inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/10"
              >
                ✨ Revolutionizing Online Earnings
              </motion.span>
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-heading tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-sky-400">
                  Turn Social Media
                </span> <br className="hidden md:block" />
                Into <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">Real Income</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Join thousands already earning daily rewards by completing simple social 
                media tasks. No special skills required — just your smartphone or computer.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <Link to="/register">
                  <Button 
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 transition-all duration-300 text-base rounded-full px-8 py-6 shadow-lg shadow-violet-600/20"
                  >
                    Start Earning Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 transition-all duration-300 rounded-full px-8 py-6"
                  >
                    Log In to Account
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10"
            >
              <Suspense fallback={<div className="h-[500px] w-full bg-white/5 animate-pulse rounded-2xl"></div>}>
                <Hero3D />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900/50 to-indigo-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "25K+", label: "Active Users" },
              { number: "$1.2M", label: "Total Earnings Paid" },
              { number: "4.3M", label: "Tasks Completed" },
              { number: "98%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 font-heading mb-2">{stat.number}</h3>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4">
              How <span className="text-indigo-400">Earnify</span> Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full mx-auto mb-4"></div>
            <p className="text-white/80 max-w-2xl mx-auto">
              Get started in minutes and start earning daily rewards with these simple steps
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Create an Account",
                description: "Sign up for free in less than a minute with just your email"
              },
              {
                step: "02",
                title: "Complete Daily Tasks",
                description: "Browse and complete simple social media tasks that take minutes"
              },
              {
                step: "03",
                title: "Earn Real Money",
                description: "Get paid directly to your preferred payment method, fast and secure"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="absolute -top-6 left-8 px-4 py-2 bg-indigo-600/90 rounded-lg shadow-lg text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mt-6 mb-3 text-white group-hover:text-indigo-300 transition-colors">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="text-indigo-400" />
                </div>
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
            <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4">
              Why Choose <span className="text-indigo-400">Earnify</span>?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full mx-auto mb-4"></div>
            <p className="text-white/80 max-w-2xl mx-auto">
              Our platform makes it simple to earn daily rewards with these great features
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <CheckCircle className="h-8 w-8 text-indigo-400" />,
                title: "Quick Daily Tasks",
                description: "Complete simple social media tasks in just minutes each day"
              },
              {
                icon: <CreditCard className="h-8 w-8 text-sky-400" />,
                title: "Fast Payouts",
                description: "Withdraw your earnings quickly and securely to your account"
              },
              {
                icon: <Shield className="h-8 w-8 text-violet-400" />,
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
                className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="mb-5 p-3 rounded-full bg-white/10 shadow-inner">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-800/80 to-indigo-800/80 opacity-90"></div>
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
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-white">
              Ready to Start Earning?
            </h2>
            <p className="text-lg opacity-90 max-w-xl mx-auto mb-10">
              Join Earnify today and start earning rewards by doing simple tasks you already enjoy.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="inline-block"
            >
              <Link to="/register">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-indigo-900 font-bold text-lg px-10 py-6 rounded-full shadow-lg">
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
