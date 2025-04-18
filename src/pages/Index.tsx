
import { Ambulance } from "lucide-react";
import TripBookingForm from "@/components/TripBookingForm";
import { ConnectionIndicator } from "@/components/ConnectionIndicator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-soft-gray to-white">
      <header className="bg-white shadow-md border-b border-medical-blue/10 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-medical-blue to-medical-teal p-3 rounded-lg shadow-lg group-hover:shadow-xl transition-all">
                <Ambulance className="h-8 w-8 text-white transform group-hover:scale-110 transition-transform" />
              </div>
              <div className="transition-all">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-medical-blue to-medical-teal bg-clip-text text-transparent">
                  Life Plus Health Care
                </h1>
                <p className="text-medical-neutral-gray">
                  Ambulance Management System
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in delay-100">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-medical-blue/10 p-8 mb-8 hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-semibold text-medical-blue mb-6 flex items-center gap-2">
            Trip Booking
            <div className="h-1 w-20 bg-gradient-to-r from-medical-blue to-medical-teal rounded-full" />
          </h2>
          <TripBookingForm />
        </div>
      </main>
      
      <footer className="bg-white/80 backdrop-blur-sm border-t border-medical-blue/10 mt-auto animate-fade-in delay-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-medical-neutral-gray text-sm">
            &copy; {new Date().getFullYear()} Life Plus Health Care. All rights reserved.
          </p>
        </div>
      </footer>

      <ConnectionIndicator />
    </div>
  );
};

export default Index;
