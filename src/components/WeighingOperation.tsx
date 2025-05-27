
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Weight, Scale, Truck, Clock, Save, RefreshCw } from 'lucide-react';

export const WeighingOperation = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [currentWeight, setCurrentWeight] = useState(0);
  const [isWeighing, setIsWeighing] = useState(false);
  const [weighingHistory, setWeighingHistory] = useState<any[]>([]);

  // Simulate real-time weight reading
  useEffect(() => {
    const interval = setInterval(() => {
      if (isWeighing) {
        setCurrentWeight(prev => {
          const variation = (Math.random() - 0.5) * 2; // ±1 ton variation
          const newWeight = Math.max(0, prev + variation);
          return Math.round(newWeight * 10) / 10;
        });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isWeighing]);

  const startWeighing = () => {
    if (!vehicleNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter vehicle number",
        variant: "destructive"
      });
      return;
    }

    setIsWeighing(true);
    setCurrentWeight(Math.random() * 50 + 10); // Random starting weight between 10-60 tons
    
    toast({
      title: "Weighing Started",
      description: `Started weighing for vehicle ${vehicleNumber}`,
    });
  };

  const stopWeighing = () => {
    setIsWeighing(false);
    
    const weighingRecord = {
      id: Date.now(),
      vehicleNumber,
      weight: currentWeight,
      timestamp: new Date().toLocaleString(),
      operator: 'Current User'
    };

    setWeighingHistory(prev => [weighingRecord, ...prev.slice(0, 9)]); // Keep last 10 records

    toast({
      title: "Weighing Completed",
      description: `Vehicle ${vehicleNumber} weight recorded: ${currentWeight} tons`,
    });
  };

  const resetScale = () => {
    setCurrentWeight(0);
    setIsWeighing(false);
    setVehicleNumber('');
    
    toast({
      title: "Scale Reset",
      description: "Weighing scale has been reset",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <Weight className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Weighing Operations</h2>
          <p className="text-gray-600">Real-time vehicle weighing and recording</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weighing Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scale className="h-5 w-5 text-blue-600" />
              <span>Weighing Control</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vehicleNum">Vehicle Number</Label>
              <Input
                id="vehicleNum"
                placeholder="Enter vehicle number"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                disabled={isWeighing}
              />
            </div>

            {/* Weight Display */}
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="text-green-400 text-4xl font-mono font-bold mb-2">
                {currentWeight.toFixed(1)} T
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className={`h-2 w-2 rounded-full ${isWeighing ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
                <span className="text-green-400 text-sm">
                  {isWeighing ? 'WEIGHING...' : 'READY'}
                </span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={startWeighing}
                disabled={isWeighing}
                className="bg-green-600 hover:bg-green-700"
              >
                <Weight className="h-4 w-4 mr-2" />
                Start Weighing
              </Button>
              
              <Button
                onClick={stopWeighing}
                disabled={!isWeighing}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Save className="h-4 w-4 mr-2" />
                Record Weight
              </Button>
            </div>

            <Button
              onClick={resetScale}
              variant="outline"
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Scale
            </Button>

            {/* Status Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600">Bridge Status</div>
                <Badge variant="default" className="bg-green-100 text-green-800 mt-1">
                  Operational
                </Badge>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600">Calibration</div>
                <Badge variant="default" className="bg-blue-100 text-blue-800 mt-1">
                  Verified
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Weighings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span>Recent Weighings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weighingHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Truck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No weighings recorded yet</p>
                  <p className="text-sm">Start weighing vehicles to see records here</p>
                </div>
              ) : (
                weighingHistory.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Truck className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{record.vehicleNumber}</p>
                        <p className="text-sm text-gray-500">{record.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">{record.weight} T</p>
                      <p className="text-xs text-gray-500">by {record.operator}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
