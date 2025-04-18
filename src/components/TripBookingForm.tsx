
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { TripData, PatientDetails, TripRoute, Financials, TripMode } from "@/types/trips";
import { saveTrip } from "@/lib/supabase";
import PatientDetailsSection from "./PatientDetailsSection";
import TripRouteSection from "./TripRouteSection";
import FinancialsSection from "./FinancialsSection";
import TripModeSection from "./TripModeSection";
import { toast } from "sonner";

const TripBookingForm = () => {
  // Initialize form state
  const [tripData, setTripData] = useState<TripData>({
    patientDetails: {
      name: "",
      condition: "",
    },
    tripRoute: {
      pickupLocation: "",
      dropLocation: "",
      distance: 0,
    },
    financials: {
      moneyCharged: 0,
      expenses: {},
      totalExpenses: 0,
    },
    tripMode: "Online",
  });

  // Form errors
  const [errors, setErrors] = useState<{
    patientDetails: Partial<Record<keyof PatientDetails, string>>;
    tripRoute: Partial<Record<keyof TripRoute, string>>;
    financials: Partial<Record<keyof Financials, string>>;
  }>({
    patientDetails: {},
    tripRoute: {},
    financials: {},
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Update patient details
  const handlePatientDetailsChange = (details: Partial<PatientDetails>) => {
    setTripData((prev) => ({
      ...prev,
      patientDetails: {
        ...prev.patientDetails,
        ...details,
      },
    }));

    // Clear errors for updated fields
    if (Object.keys(details).some(key => errors.patientDetails[key as keyof PatientDetails])) {
      const updatedErrors = { ...errors };
      Object.keys(details).forEach(key => {
        delete updatedErrors.patientDetails[key as keyof PatientDetails];
      });
      setErrors(updatedErrors);
    }
  };

  // Update trip route
  const handleTripRouteChange = (route: Partial<TripRoute>) => {
    setTripData((prev) => ({
      ...prev,
      tripRoute: {
        ...prev.tripRoute,
        ...route,
      },
    }));

    // Clear errors for updated fields
    if (Object.keys(route).some(key => errors.tripRoute[key as keyof TripRoute])) {
      const updatedErrors = { ...errors };
      Object.keys(route).forEach(key => {
        delete updatedErrors.tripRoute[key as keyof TripRoute];
      });
      setErrors(updatedErrors);
    }
  };

  // Update financials
  const handleFinancialsChange = (financials: Partial<Financials>) => {
    setTripData((prev) => ({
      ...prev,
      financials: {
        ...prev.financials,
        ...financials,
      },
    }));

    // Clear errors for updated fields
    if (Object.keys(financials).some(key => errors.financials[key as keyof Financials])) {
      const updatedErrors = { ...errors };
      Object.keys(financials).forEach(key => {
        delete updatedErrors.financials[key as keyof Financials];
      });
      setErrors(updatedErrors);
    }
  };

  // Update trip mode
  const handleTripModeChange = (mode: TripMode) => {
    setTripData((prev) => ({
      ...prev,
      tripMode: mode,
    }));
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors = {
      patientDetails: {},
      tripRoute: {},
      financials: {},
    };

    let isValid = true;

    // Validate patient details
    if (!tripData.patientDetails.name) {
      newErrors.patientDetails.name = "Patient name is required";
      isValid = false;
    }
    
    if (!tripData.patientDetails.condition) {
      newErrors.patientDetails.condition = "Patient condition is required";
      isValid = false;
    }

    // Validate trip route
    if (!tripData.tripRoute.pickupLocation) {
      newErrors.tripRoute.pickupLocation = "Pickup location is required";
      isValid = false;
    }

    if (!tripData.tripRoute.dropLocation) {
      newErrors.tripRoute.dropLocation = "Drop location is required";
      isValid = false;
    }

    if (!tripData.tripRoute.distance) {
      newErrors.tripRoute.distance = "Distance is required";
      isValid = false;
    }

    // Validate financials
    if (!tripData.financials.moneyCharged) {
      newErrors.financials.moneyCharged = "Money charged is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save trip data to Supabase
      const result = await saveTrip(tripData);
      
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);

        // Reset form
        setTripData({
          patientDetails: {
            name: "",
            condition: "",
          },
          tripRoute: {
            pickupLocation: "",
            dropLocation: "",
            distance: 0,
          },
          financials: {
            moneyCharged: 0,
            expenses: {},
            totalExpenses: 0,
          },
          tripMode: "Online",
        });
      }
    } catch (error) {
      console.error("Error saving trip data:", error);
      toast.error("Failed to save trip data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <PatientDetailsSection
        patientDetails={tripData.patientDetails}
        onChange={handlePatientDetailsChange}
        errors={errors.patientDetails}
      />
      
      <TripRouteSection
        tripRoute={tripData.tripRoute}
        onChange={handleTripRouteChange}
        errors={errors.tripRoute}
      />
      
      <FinancialsSection
        financials={tripData.financials}
        onChange={handleFinancialsChange}
        errors={errors.financials}
      />
      
      <TripModeSection
        tripMode={tripData.tripMode}
        onChange={handleTripModeChange}
      />
      
      <div className="flex justify-end mt-6 mb-8">
        <Button
          type="submit"
          className="bg-medical-blue hover:bg-medical-blue/90 text-white px-6"
          disabled={isSubmitting || isSuccess}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Trip
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default TripBookingForm;
