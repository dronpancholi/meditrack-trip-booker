
import { Ambulance, Activity, Bell, Calendar, Users, ChevronRight, PlusCircle } from "lucide-react";
import TripBookingForm from "@/components/TripBookingForm";
import { ConnectionIndicator } from "@/components/ConnectionIndicator";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ConnectionIndicator />

      {/* Modern floating header */}
      <header className="sticky top-5 z-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: loaded ? 0 : -20, opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-medical-blue/10 p-4"
        >
          <div className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-medical-blue to-medical-teal p-2 rounded-xl shadow group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
              <Ambulance className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-medical-blue to-medical-teal bg-clip-text text-transparent">
                Life Plus Health Care
              </h1>
              <p className="text-xs text-medical-neutral-gray">
                Ambulance Management System
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <NavItem icon={Activity} label="Dashboard" />
            <NavItem icon={Calendar} label="Schedule" />
            <NavItem icon={Users} label="Patients" />
            <NavItem icon={Bell} label="Notifications" badge="3" />
          </div>
        </motion.div>
      </header>
      
      <main className="relative z-10 pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: loaded ? 0 : 20, opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <StatCard 
              title="Total Trips"
              value="156"
              change="+12%"
              positive={true}
              icon={Ambulance}
              color="blue"
            />
            <StatCard 
              title="Patients"
              value="98"
              change="+5%"
              positive={true}
              icon={Users}
              color="teal"
            />
            <StatCard 
              title="Average Response"
              value="8:24"
              change="-2:15"
              positive={true}
              icon={Activity}
              color="purple"
            />
          </motion.div>

          {/* New Booking Form */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: loaded ? 0 : 40, opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <PlusCircle className="h-5 w-5 text-medical-blue" />
              <h2 className="text-xl font-medium text-gray-800">
                New Trip Booking
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8">
                <TripBookingForm />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <footer className="bg-white/80 backdrop-blur-md border-t border-medical-blue/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-center text-medical-neutral-gray text-sm">
              &copy; {new Date().getFullYear()} Life Plus Health Care. All rights reserved.
            </p>
            <div className="flex gap-6">
              <FooterLink label="Privacy" />
              <FooterLink label="Terms" />
              <FooterLink label="Support" />
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, badge }: { icon: any, label: string, badge?: string }) => (
  <div className="flex items-center gap-1 text-gray-600 hover:text-medical-blue transition-colors cursor-pointer group">
    <Icon className="h-4 w-4" />
    <span className="text-sm font-medium">{label}</span>
    {badge && (
      <span className="bg-medical-blue text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
        {badge}
      </span>
    )}
    <div className="h-[2px] w-0 group-hover:w-full bg-medical-blue mt-1 transition-all duration-300"></div>
  </div>
);

const StatCard = ({ 
  title, 
  value, 
  change, 
  positive, 
  icon: Icon,
  color 
}: { 
  title: string, 
  value: string, 
  change: string, 
  positive: boolean,
  icon: any,
  color: 'blue' | 'teal' | 'purple'
}) => {
  const colorMap = {
    blue: 'from-medical-blue/20 to-blue-50',
    teal: 'from-medical-teal/20 to-teal-50',
    purple: 'from-purple-300/20 to-purple-50',
  };
  
  return (
    <div className={`bg-gradient-to-r ${colorMap[color]} p-5 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          <div className={`flex items-center mt-2 ${positive ? 'text-green-600' : 'text-red-600'}`}>
            <span className="text-xs font-medium">{change}</span>
          </div>
        </div>
        <div className={`p-3 rounded-full bg-white/80 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`h-5 w-5 ${color === 'blue' ? 'text-medical-blue' : color === 'teal' ? 'text-medical-teal' : 'text-purple-500'}`} />
        </div>
      </div>
    </div>
  );
};

const FooterLink = ({ label }: { label: string }) => (
  <a href="#" className="text-sm text-gray-500 hover:text-medical-blue transition-colors">
    {label}
  </a>
);

export default Index;
