
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TripRoute, Hospital } from "@/types/trips";
import { getHospitals } from "@/lib/supabase";

interface TripRouteSectionProps {
  tripRoute: TripRoute;
  onChange: (route: Partial<TripRoute>) => void;
  errors: Partial<Record<keyof TripRoute, string>>;
}

const TripRouteSection: React.FC<TripRouteSectionProps> = ({
  tripRoute,
  onChange,
  errors
}) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getHospitals();
        setHospitals(data || []);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleChange = (key: keyof TripRoute, value: string | number | undefined) => {
    onChange({ [key]: value });
  };

  const handleHospitalSelect = (hospitalName: string) => {
    const selected = hospitals.find(h => h.name === hospitalName);
    if (selected) {
      onChange({ 
        hospital: selected.name,
        dropLocation: selected.address
      });
    }
  };

  return (
    <Card className="mb-6 border-medical-blue/20">
      <CardHeader className="bg-medical-blue/5">
        <CardTitle className="text-xl font-medium text-medical-blue">Trip Route</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="pickupLocation" className="text-sm font-medium">
            Pickup Location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="pickupLocation"
            placeholder="Enter pickup address"
            value={tripRoute.pickupLocation || ''}
            onChange={(e) => handleChange('pickupLocation', e.target.value)}
            className={errors.pickupLocation ? "border-red-500" : ""}
          />
          {errors.pickupLocation && <p className="text-red-500 text-xs">{errors.pickupLocation}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="hospital" className="text-sm font-medium">
            Select Hospital (Optional)
          </Label>
          <Select
            value={tripRoute.hospital}
            onValueChange={(value) => handleHospitalSelect(value)}
            disabled={loading}
          >
            <SelectTrigger id="hospital">
              <SelectValue placeholder={loading ? "Loading hospitals..." : "Select a hospital"} />
            </SelectTrigger>
            <SelectContent>
              {hospitals.map((hospital) => (
                <SelectItem key={hospital.id} value={hospital.name}>
                  {hospital.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="dropLocation" className="text-sm font-medium">
            Drop Location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="dropLocation"
            placeholder="Enter drop address"
            value={tripRoute.dropLocation || ''}
            onChange={(e) => handleChange('dropLocation', e.target.value)}
            className={errors.dropLocation ? "border-red-500" : ""}
          />
          {errors.dropLocation && <p className="text-red-500 text-xs">{errors.dropLocation}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="distance" className="text-sm font-medium">
            Total Distance (km) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="distance"
            type="number"
            placeholder="Distance in kilometers"
            value={tripRoute.distance || ''}
            onChange={(e) => handleChange('distance', e.target.value ? parseFloat(e.target.value) : 0)}
            className={errors.distance ? "border-red-500" : ""}
          />
          {errors.distance && <p className="text-red-500 text-xs">{errors.distance}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripRouteSection;
