import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CarIcon } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [showParkingSlots, setShowParkingSlots] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Show welcome message after a brief delay
    setTimeout(() => {
      setShowWelcome(true);
    }, 500);

    // Simulate loading animation with longer duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const parkingSlots = [
    { id: 'L1', status: 'available' },
    { id: 'L2', status: 'occupied' },
    { id: 'L3', status: 'available' },
    { id: 'R1', status: 'available' },
    { id: 'R2', status: 'available' },
    { id: 'R3', status: 'occupied' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className={`transition-opacity duration-500 ${showWelcome ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-3xl font-bold mb-2 text-purple-600">Welcome to</h1>
          <h2 className="text-4xl font-bold mb-8 text-purple-600">Namma Parking</h2>
        </div>
        <div className="animate-bounce">
          <CarIcon className="w-16 h-16 text-purple-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-600">Namma Parking</h1>
        
        <Card className="p-4">
          <Input
            type="text"
            placeholder="Search parking location..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setShowParkingSlots(true);
            }}
            className="mb-4"
          />

          {showParkingSlots && (
            <div className="relative mt-8">
              {/* Left row of parking slots */}
              <div className="absolute left-0 space-y-4">
                {parkingSlots.slice(0, 3).map((slot) => (
                  <div
                    key={slot.id}
                    className={`w-16 h-16 border-2 ${
                      slot.status === 'available' ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100'
                    } rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity`}
                  >
                    {slot.id}
                  </div>
                ))}
              </div>

              {/* Center area for car movement */}
              <div className="mx-auto w-24 h-64 bg-gray-200 rounded-lg">
                <div className="h-full flex items-center justify-center text-gray-500">
                  <CarIcon className="w-12 h-12" />
                </div>
              </div>

              {/* Right row of parking slots */}
              <div className="absolute right-0 space-y-4">
                {parkingSlots.slice(3).map((slot) => (
                  <div
                    key={slot.id}
                    className={`w-16 h-16 border-2 ${
                      slot.status === 'available' ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100'
                    } rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity`}
                  >
                    {slot.id}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;