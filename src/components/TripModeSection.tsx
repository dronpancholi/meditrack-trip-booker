
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TripMode } from "@/types/trips";

interface TripModeSectionProps {
  tripMode: TripMode;
  onChange: (mode: TripMode) => void;
}

const TripModeSection: React.FC<TripModeSectionProps> = ({
  tripMode,
  onChange
}) => {
  const handleToggle = (checked: boolean) => {
    onChange(checked ? 'Online' : 'Offline');
  };
  
  return (
    <Card className="mb-6 border-medical-blue/20">
      <CardHeader className="bg-medical-blue/5">
        <CardTitle className="text-xl font-medium text-medical-blue">Trip Mode</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">Trip Mode</Label>
            <p className="text-sm text-gray-500">
              Choose whether this trip was booked online or offline
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="trip-mode" className={tripMode === 'Offline' ? 'text-gray-500' : 'text-medical-blue font-medium'}>
              {tripMode}
            </Label>
            <Switch
              id="trip-mode"
              checked={tripMode === 'Online'}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-medical-blue"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripModeSection;
