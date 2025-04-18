
export type Gender = 'Male' | 'Female' | 'Other' | 'Not Specified';

export type TripMode = 'Online' | 'Offline';

export interface PatientDetails {
  name: string;
  phoneNumber?: string;
  email?: string;
  age?: number;
  gender?: Gender;
  condition: string;
}

export interface TripRoute {
  pickupLocation: string;
  dropLocation: string;
  hospital?: string;
  distance: number;
}

export interface Financials {
  moneyCharged: number;
  expenses: {
    fuel?: number;
    driver?: number;
    nursingStaff?: number;
    maintenance?: number;
    miscellaneous?: number;
  };
  totalExpenses: number;
}

export interface TripData {
  id?: string;
  patientDetails: PatientDetails;
  tripRoute: TripRoute;
  financials: Financials;
  tripMode: TripMode;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
}
