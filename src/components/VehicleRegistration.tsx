
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Truck, Plus, Save } from 'lucide-react';

export const VehicleRegistration = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    driverName: '',
    driverLicense: '',
    vehicleType: '',
    tareWeight: '',
    maxCapacity: '',
    company: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.vehicleNumber || !formData.driverName || !formData.vehicleType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate registration
    toast({
      title: "Vehicle Registered Successfully",
      description: `Vehicle ${formData.vehicleNumber} has been registered in the system`,
    });

    // Reset form
    setFormData({
      vehicleNumber: '',
      driverName: '',
      driverLicense: '',
      vehicleType: '',
      tareWeight: '',
      maxCapacity: '',
      company: '',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Plus className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vehicle Registration</h2>
          <p className="text-gray-600">Register new vehicles in the weighing system</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-blue-600" />
            <span>Vehicle Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="vehicleNumber">Vehicle Number *</Label>
                <Input
                  id="vehicleNumber"
                  placeholder="e.g., TN-09-AB-1234"
                  value={formData.vehicleNumber}
                  onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                  className="uppercase"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type *</Label>
                <Select onValueChange={(value) => handleInputChange('vehicleType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="trailer">Trailer</SelectItem>
                    <SelectItem value="tanker">Tanker</SelectItem>
                    <SelectItem value="container">Container Truck</SelectItem>
                    <SelectItem value="pickup">Pickup Truck</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="driverName">Driver Name *</Label>
                <Input
                  id="driverName"
                  placeholder="Enter driver's full name"
                  value={formData.driverName}
                  onChange={(e) => handleInputChange('driverName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="driverLicense">Driver License Number</Label>
                <Input
                  id="driverLicense"
                  placeholder="Enter license number"
                  value={formData.driverLicense}
                  onChange={(e) => handleInputChange('driverLicense', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tareWeight">Tare Weight (tons)</Label>
                <Input
                  id="tareWeight"
                  type="number"
                  step="0.1"
                  placeholder="Empty vehicle weight"
                  value={formData.tareWeight}
                  onChange={(e) => handleInputChange('tareWeight', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxCapacity">Max Capacity (tons)</Label>
                <Input
                  id="maxCapacity"
                  type="number"
                  step="0.1"
                  placeholder="Maximum load capacity"
                  value={formData.maxCapacity}
                  onChange={(e) => handleInputChange('maxCapacity', e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information about the vehicle"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setFormData({
                vehicleNumber: '',
                driverName: '',
                driverLicense: '',
                vehicleType: '',
                tareWeight: '',
                maxCapacity: '',
                company: '',
                notes: ''
              })}>
                Clear Form
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Register Vehicle
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
