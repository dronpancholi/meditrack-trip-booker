
import { Ambulance } from "lucide-react";
import TripBookingForm from "@/components/TripBookingForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-medical-light-gray/50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Ambulance className="h-8 w-8 text-medical-blue mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Life Plus Health Care</h1>
                <p className="text-gray-600 text-sm">Ambulance Management System</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Trip Booking</h2>
          <TripBookingForm />
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Life Plus Health Care. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
