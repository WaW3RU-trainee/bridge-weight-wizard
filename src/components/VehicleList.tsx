
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Search, Eye, Edit, Trash2 } from 'lucide-react';

export const VehicleList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock vehicle data
  const vehicles = [
    {
      id: 1,
      vehicleNumber: 'TN-09-AB-1234',
      driverName: 'Rajesh Kumar',
      vehicleType: 'Truck',
      company: 'ABC Transport',
      lastWeighed: '2024-01-15',
      totalWeighings: 45,
      status: 'active'
    },
    {
      id: 2,
      vehicleNumber: 'TN-09-CD-5678',
      driverName: 'Suresh Reddy',
      vehicleType: 'Trailer',
      company: 'XYZ Logistics',
      lastWeighed: '2024-01-14',
      totalWeighings: 32,
      status: 'active'
    },
    {
      id: 3,
      vehicleNumber: 'TN-09-EF-9012',
      driverName: 'Mohammed Ali',
      vehicleType: 'Tanker',
      company: 'PQR Industries',
      lastWeighed: '2024-01-13',
      totalWeighings: 67,
      status: 'active'
    },
    {
      id: 4,
      vehicleNumber: 'TN-09-GH-3456',
      driverName: 'Karthik Sharma',
      vehicleType: 'Container',
      company: 'DEF Shipping',
      lastWeighed: '2024-01-10',
      totalWeighings: 23,
      status: 'inactive'
    }
  ];

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Truck className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vehicle Management</h2>
            <p className="text-gray-600">Manage registered vehicles and their information</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Vehicles ({filteredVehicles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Truck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{vehicle.vehicleNumber}</h3>
                      <p className="text-gray-600">{vehicle.driverName}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">Type: {vehicle.vehicleType}</span>
                        <span className="text-sm text-gray-500">Company: {vehicle.company}</span>
                        <span className="text-sm text-gray-500">Last Weighed: {vehicle.lastWeighed}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Weighings</p>
                      <p className="font-bold text-lg">{vehicle.totalWeighings}</p>
                    </div>
                    
                    <Badge variant={vehicle.status === 'active' ? 'default' : 'secondary'}>
                      {vehicle.status}
                    </Badge>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
