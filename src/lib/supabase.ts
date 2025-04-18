
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';
import type { TripData } from '@/types/trips';
import { supabase as integrationClient } from '@/integrations/supabase/client';

// Use the client from the integration file which already has the correct URL and key
export const supabase = integrationClient;

// Function to save a new trip
export const saveTrip = async (tripData: TripData): Promise<{ success: boolean; data?: TripData; error?: any }> => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    // Create a record with user ID and timestamps
    // Map our frontend model to the database model (using lowercase column names)
    // Convert complex objects to JSON for storage
    const recordToInsert = {
      patientdetails: tripData.patientDetails,
      triproute: tripData.tripRoute,
      financials: tripData.financials,
      tripmode: tripData.tripMode,
      userid: user?.id,
      createdat: new Date().toISOString(),
      updatedat: new Date().toISOString(),
    };

    // Insert the record into the trips table
    const { data, error } = await supabase
      .from('trips')
      .insert(recordToInsert)
      .select()
      .single();

    if (error) {
      console.error('Error saving trip:', error);
      toast.error('Failed to save trip data');
      return { success: false, error };
    }

    // Map the response data back to our frontend model
    const savedTrip: TripData = {
      id: data.id,
      patientDetails: data.patientdetails,
      tripRoute: data.triproute,
      financials: data.financials,
      tripMode: data.tripmode,
      userId: data.userid,
      createdAt: data.createdat,
      updatedAt: data.updatedat,
    };

    toast.success('Trip saved successfully');
    return { success: true, data: savedTrip };
  } catch (error) {
    console.error('Unexpected error saving trip:', error);
    toast.error('An unexpected error occurred');
    return { success: false, error };
  }
};

// Function to get hospitals
export const getHospitals = async () => {
  try {
    const { data, error } = await supabase
      .from('hospital_locations')
      .select('*');

    if (error) {
      console.error('Error fetching hospitals:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching hospitals:', error);
    return [];
  }
};

// Function to get real-time updates for trips
export const subscribeToTrips = (callback: (trip: TripData) => void) => {
  const subscription = supabase
    .channel('trips-channel')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'trips' }, (payload) => {
      // Map the database model to our frontend model
      const tripData: TripData = {
        id: payload.new.id,
        patientDetails: payload.new.patientdetails,
        tripRoute: payload.new.triproute,
        financials: payload.new.financials,
        tripMode: payload.new.tripmode,
        userId: payload.new.userid,
        createdAt: payload.new.createdat,
        updatedAt: payload.new.updatedat,
      };
      callback(tripData);
    })
    .subscribe();

  // Return a function to unsubscribe
  return () => {
    supabase.removeChannel(subscription);
  };
};
