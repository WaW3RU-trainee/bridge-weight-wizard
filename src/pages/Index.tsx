import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Weight, Truck, BarChart3, Users, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { VehicleRegistration } from '@/components/VehicleRegistration';
import { WeighingOperation } from '@/components/WeighingOperation';
import { ReportsSection } from '@/components/ReportsSection';
import { WeightChart } from '@/components/WeightChart';
import { VehicleList } from '@/components/VehicleList';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for demonstration
  const todayStats = {
    totalVehicles: 47,
    totalWeight: 1247.5,
    averageWeight: 26.5,
    bridgeStatus: 'operational'
  };

  const recentWeighings = [
    { id: 1, vehicleNumber: 'TN-09-AB-1234', weight: 45.2, time: '14:30', status: 'completed' },
    { id: 2, vehicleNumber: 'TN-09-CD-5678', weight: 32.8, time: '14:15', status: 'completed' },
    { id: 3, vehicleNumber: 'TN-09-EF-9012', weight: 51.0, time: '14:00', status: 'completed' },
    { id: 4, vehicleNumber: 'TN-09-GH-3456', weight: 28.5, time: '13:45', status: 'completed' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Weight className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">WeighBridge Pro</h1>
                <p className="text-sm text-gray-500">Weight Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={todayStats.bridgeStatus === 'operational' ? 'default' : 'destructive'} className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Bridge Operational
              </Badge>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="weighing" className="flex items-center space-x-2">
              <Weight className="h-4 w-4" />
              <span>Weighing</span>
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Vehicles</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Register</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Vehicles</CardTitle>
                  <Truck className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.totalVehicles}</div>
                  <p className="text-xs text-blue-100">+12% from yesterday</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Weight (Tons)</CardTitle>
                  <Weight className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.totalWeight}</div>
                  <p className="text-xs text-green-100">+8% from yesterday</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Weight</CardTitle>
                  <BarChart3 className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.averageWeight} T</div>
                  <p className="text-xs text-purple-100">+2.1 tons from avg</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bridge Status</CardTitle>
                  <CheckCircle className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Active</div>
                  <p className="text-xs text-orange-100">99.8% uptime</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span>Weight Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <WeightChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span>Recent Weighings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentWeighings.map((weighing) => (
                      <div key={weighing.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Truck className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{weighing.vehicleNumber}</p>
                            <p className="text-sm text-gray-500">{weighing.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">{weighing.weight} T</p>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {weighing.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other Tabs */}
          <TabsContent value="weighing">
            <WeighingOperation />
          </TabsContent>

          <TabsContent value="vehicles">
            <VehicleList />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsSection />
          </TabsContent>

          <TabsContent value="register">
            <VehicleRegistration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
