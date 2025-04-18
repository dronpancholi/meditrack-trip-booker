
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PatientDetails, Gender } from "@/types/trips";

interface PatientDetailsSectionProps {
  patientDetails: PatientDetails;
  onChange: (details: Partial<PatientDetails>) => void;
  errors: Partial<Record<keyof PatientDetails, string>>;
}

const PatientDetailsSection: React.FC<PatientDetailsSectionProps> = ({ 
  patientDetails, 
  onChange,
  errors
}) => {
  const handleChange = (key: keyof PatientDetails, value: string | number | undefined) => {
    onChange({ [key]: value });
  };

  return (
    <Card className="mb-6 border-medical-teal/20">
      <CardHeader className="bg-medical-teal/5">
        <CardTitle className="text-xl font-medium text-medical-teal">Patient Details</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Patient Name"
            value={patientDetails.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              placeholder="Phone Number"
              value={patientDetails.phoneNumber || ''}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email ID
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email ID"
              value={patientDetails.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="age" className="text-sm font-medium">
              Age
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Age"
              value={patientDetails.age || ''}
              onChange={(e) => handleChange('age', e.target.value ? parseInt(e.target.value) : undefined)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gender" className="text-sm font-medium">
              Gender
            </Label>
            <Select
              value={patientDetails.gender}
              onValueChange={(value) => handleChange('gender', value as Gender)}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Not Specified">Not Specified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="condition" className="text-sm font-medium">
            Patient Condition <span className="text-red-500">*</span>
          </Label>
          <Input
            id="condition"
            placeholder="Patient Condition"
            value={patientDetails.condition || ''}
            onChange={(e) => handleChange('condition', e.target.value)}
            className={errors.condition ? "border-red-500" : ""}
          />
          {errors.condition && <p className="text-red-500 text-xs">{errors.condition}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientDetailsSection;
