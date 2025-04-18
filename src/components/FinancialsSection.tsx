
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Financials } from "@/types/trips";
import { cn } from "@/lib/utils";

interface FinancialsSectionProps {
  financials: Financials;
  onChange: (financials: Partial<Financials>) => void;
  errors: Partial<Record<keyof Financials, string>>;
}

const FinancialsSection: React.FC<FinancialsSectionProps> = ({
  financials,
  onChange,
  errors
}) => {
  // Helper to handle expense changes
  const handleExpenseChange = (key: keyof Financials["expenses"], value: number | undefined) => {
    const updatedExpenses = {
      ...financials.expenses,
      [key]: value
    };
    
    onChange({ 
      expenses: updatedExpenses
    });
  };

  // Recalculate total expenses whenever any expense changes
  useEffect(() => {
    const { fuel = 0, driver = 0, nursingStaff = 0, maintenance = 0, miscellaneous = 0 } = financials.expenses;
    const total = fuel + driver + nursingStaff + maintenance + miscellaneous;
    
    // Only update if the calculated total is different from current total
    if (total !== financials.totalExpenses) {
      onChange({ totalExpenses: total });
    }
  }, [financials.expenses]);

  return (
    <Card className="mb-6 border-medical-teal/20">
      <CardHeader className="bg-medical-teal/5">
        <CardTitle className="text-xl font-medium text-medical-teal">Financials</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="moneyCharged" className="text-sm font-medium">
            Money Charged <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
            <Input
              id="moneyCharged"
              type="number"
              placeholder="0.00"
              className={cn("pl-8", errors.moneyCharged ? "border-red-500" : "")}
              value={financials.moneyCharged || ''}
              onChange={(e) => onChange({ moneyCharged: e.target.value ? parseFloat(e.target.value) : 0 })}
            />
          </div>
          {errors.moneyCharged && <p className="text-red-500 text-xs">{errors.moneyCharged}</p>}
        </div>

        <div className="grid gap-2">
          <h3 className="text-sm font-medium mb-2">Expense Breakdown</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fuel" className="text-xs">
                Fuel
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <Input
                  id="fuel"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={financials.expenses.fuel || ''}
                  onChange={(e) => handleExpenseChange('fuel', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="driver" className="text-xs">
                Driver
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <Input
                  id="driver"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={financials.expenses.driver || ''}
                  onChange={(e) => handleExpenseChange('driver', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nursingStaff" className="text-xs">
                Nursing Staff
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <Input
                  id="nursingStaff"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={financials.expenses.nursingStaff || ''}
                  onChange={(e) => handleExpenseChange('nursingStaff', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="maintenance" className="text-xs">
                Maintenance
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <Input
                  id="maintenance"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={financials.expenses.maintenance || ''}
                  onChange={(e) => handleExpenseChange('maintenance', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="miscellaneous" className="text-xs">
                Miscellaneous
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <Input
                  id="miscellaneous"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={financials.expenses.miscellaneous || ''}
                  onChange={(e) => handleExpenseChange('miscellaneous', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-medical-soft-gray rounded-md">
          <div className="flex justify-between items-center">
            <Label className="font-medium">Total Expenses:</Label>
            <div className="font-medium text-lg">₹ {financials.totalExpenses.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialsSection;
