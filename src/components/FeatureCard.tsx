
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

export default function FeatureCard({ title, description, icon: Icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full border border-gray-100 hover:border-earnify-blue/30 transition-all duration-300 hover:shadow-md bg-white overflow-hidden">
        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-br from-earnify-blue/10 to-earnify-green/10 blur-2xl"></div>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-earnify-lightBlue to-earnify-lightGreen flex items-center justify-center mb-4">
            <Icon className="h-6 w-6 text-earnify-blue" />
          </div>
          <h3 className="font-medium text-gray-800 text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
