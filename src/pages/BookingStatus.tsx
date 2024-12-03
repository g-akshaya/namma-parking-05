import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const BookingStatus = () => {
  const navigate = useNavigate();
  
  // Get booking details from localStorage
  const bookingDetails = {
    name: "Akshaya",
    vehicleName: "Hotwheels Car",
    numberPlate: "1234",
    location: "College",
    slotId: localStorage.getItem('selectedSlot') || 'Not available',
    bookingDate: localStorage.getItem('bookingTime') 
      ? format(new Date(localStorage.getItem('bookingTime') || ''), 'PPP')
      : 'Not available',
    bookingTime: localStorage.getItem('bookingTime')
      ? format(new Date(localStorage.getItem('bookingTime') || ''), 'p')
      : 'Not available'
  };

  const details = [
    { label: "Name", value: bookingDetails.name },
    { label: "Registered Vehicle Name", value: bookingDetails.vehicleName },
    { label: "Car Number Plate", value: bookingDetails.numberPlate },
    { label: "Location", value: bookingDetails.location },
    { label: "Slot Registered", value: bookingDetails.slotId },
    { label: "Date", value: bookingDetails.bookingDate },
    { label: "Time", value: bookingDetails.bookingTime },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <Button 
        variant="outline" 
        onClick={() => navigate('/')}
        className="mb-6"
      >
        Back to Home
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-purple-800">
            Booking Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {details.map((detail, index) => (
            <div 
              key={index} 
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-50 rounded-lg"
            >
              <span className="font-semibold text-gray-700 mb-1 sm:mb-0">
                {detail.label}:
              </span>
              <span className="text-gray-600">
                {detail.value}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStatus;