import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import LoadingScreen from '@/components/LoadingScreen';
import ParkingLayout from '@/components/ParkingLayout';
import MainHeader from '@/components/parking/MainHeader';
import SearchBar from '@/components/parking/SearchBar';
import BookingDialogs from '@/components/parking/BookingDialogs';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [showParkingSlots, setShowParkingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showConfirmNowDialog, setShowConfirmNowDialog] = useState(false);
  const [showConfirmLaterDialog, setShowConfirmLaterDialog] = useState(false);
  const [showTimeSelectionDialog, setShowTimeSelectionDialog] = useState(false);
  const [showBufferDialog, setShowBufferDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    if (searchValue.toLowerCase() === 'college') {
      setShowParkingSlots(true);
    }
  };

  const handleSlotSelection = (slotId: string) => {
    setSelectedSlot(slotId);
    setShowBookingDialog(true);
  };

  const handleBookNow = () => {
    setShowBookingDialog(false);
    setShowConfirmNowDialog(true);
  };

  const handleBookLater = () => {
    setShowBookingDialog(false);
    setShowConfirmLaterDialog(true);
  };

  const handleConfirmNowBooking = () => {
    setShowConfirmNowDialog(false);
    toast({
      title: "Booking Confirmed!",
      description: "You have 5 minutes to park your car.",
      duration: 5000,
    });
  };

  const handleConfirmLaterBooking = () => {
    setShowConfirmLaterDialog(false);
    setShowTimeSelectionDialog(true);
  };

  const handleTimeSelection = () => {
    setShowTimeSelectionDialog(false);
    setShowBufferDialog(true);
  };

  const handleBufferConfirm = () => {
    setShowBufferDialog(false);
    toast({
      title: "Advance Booking Confirmed",
      description: "Remember: 15 minutes buffer time will be given for parking.",
      duration: 5000,
    });
    setShowParkingSlots(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="p-4">
        <MainHeader />
        
        <Card className="p-4 shadow-lg">
          <SearchBar 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onSearch={handleSearch}
          />

          {showParkingSlots && (
            <ParkingLayout 
              parkingSlots={[
                { id: 'L1', status: 'available' },
                { id: 'L2', status: 'occupied' },
                { id: 'L3', status: 'available' },
                { id: 'R1', status: 'available' },
                { id: 'R2', status: 'available' },
                { id: 'R3', status: 'occupied' },
              ]}
              onSlotSelect={handleSlotSelection}
            />
          )}
        </Card>
      </div>

      <BookingDialogs 
        showBookingDialog={showBookingDialog}
        setShowBookingDialog={setShowBookingDialog}
        showConfirmNowDialog={showConfirmNowDialog}
        setShowConfirmNowDialog={setShowConfirmNowDialog}
        showConfirmLaterDialog={showConfirmLaterDialog}
        setShowConfirmLaterDialog={setShowConfirmLaterDialog}
        showTimeSelectionDialog={showTimeSelectionDialog}
        setShowTimeSelectionDialog={setShowTimeSelectionDialog}
        showBufferDialog={showBufferDialog}
        setShowBufferDialog={setShowBufferDialog}
        onBookNow={handleBookNow}
        onBookLater={handleBookLater}
        onConfirmNowBooking={handleConfirmNowBooking}
        onConfirmLaterBooking={handleConfirmLaterBooking}
        onTimeSelection={handleTimeSelection}
        onBufferConfirm={handleBufferConfirm}
      />
    </div>
  );
};

export default Index;