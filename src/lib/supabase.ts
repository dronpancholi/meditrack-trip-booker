
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';
import type { TripData } from '@/types/trips';

// Initialize the Supabase client
// These values should be replaced with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to save a new trip
export const saveTrip = async (tripData: TripData): Promise<{ success: boolean; data?: TripData; error?: any }> => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    // Create a record with user ID and timestamps
    const recordToInsert = {
      ...tripData,
      userId: user?.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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

    toast.success('Trip saved successfully');
    return { success: true, data };
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
      callback(payload.new as TripData);
    })
    .subscribe();

  // Return a function to unsubscribe
  return () => {
    supabase.removeChannel(subscription);
  };
};
