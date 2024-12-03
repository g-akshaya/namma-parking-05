import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Info, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          Back to Home
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-purple-800 mb-8">Profile</h1>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Name:</span>
              <span>Akshaya</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Age:</span>
              <span>20</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Vehicles Registered:</span>
              <div className="flex items-center gap-2">
                <span>1</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowVehicleDetails(true)}
                  className="hover:bg-purple-100"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={showVehicleDetails} onOpenChange={setShowVehicleDetails}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Vehicle Details</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => setShowVehicleDetails(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold">Vehicle Name:</span>
                <span>Hotwheels Car</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold">Number Plate:</span>
                <span>1234</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;