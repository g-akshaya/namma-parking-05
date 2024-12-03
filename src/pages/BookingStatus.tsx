import { ClipboardX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BookingStatus = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-4">
      <Button 
        variant="outline" 
        onClick={() => navigate('/')}
        className="absolute top-4 left-4"
      >
        Back to Home
      </Button>
      
      <div className="text-center space-y-4">
        <ClipboardX className="w-16 h-16 text-gray-400 mx-auto" />
        <h2 className="text-xl font-semibold text-gray-700">
          No advance bookings made for now
        </h2>
      </div>
    </div>
  );
};

export default BookingStatus;