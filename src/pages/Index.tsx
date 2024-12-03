import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import SearchLocation from '@/components/SearchLocation';
import BookingDialogs from '@/components/BookingDialogs';
import ParkingSection from '@/components/ParkingSection';

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
  const navigate = useNavigate();

  useEffect(() => {
    const showSlots = localStorage.getItem('showParkingSlots');
    if (showSlots === 'true') {
      setShowParkingSlots(true);
      setIsLoading(false);
      localStorage.removeItem('showParkingSlots');
      return;
    }

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
    if (selectedSlot) {
      localStorage.setItem('selectedSlot', selectedSlot);
      localStorage.setItem('bookingTime', new Date().toISOString());
      navigate('/booking-confirmation');
    }
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

  const handleNoConfirmation = () => {
    setShowConfirmNowDialog(false);
    setShowConfirmLaterDialog(false);
    setShowTimeSelectionDialog(false);
    setShowBufferDialog(false);
    setShowBookingDialog(false);
    setSelectedSlot(null);
  };

  if (isLoading && !showParkingSlots) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="p-4">
        <Header />
        <Card className="p-4 shadow-lg">
          {!showParkingSlots ? (
            <SearchLocation 
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              onSearch={handleSearch}
            />
          ) : (
            <ParkingSection onSlotSelect={handleSlotSelection} />
          )}
        </Card>
      </div>

      <BookingDialogs 
        showBookingDialog={showBookingDialog}
        showConfirmNowDialog={showConfirmNowDialog}
        showConfirmLaterDialog={showConfirmLaterDialog}
        showTimeSelectionDialog={showTimeSelectionDialog}
        showBufferDialog={showBufferDialog}
        setShowBookingDialog={setShowBookingDialog}
        setShowConfirmNowDialog={setShowConfirmNowDialog}
        setShowConfirmLaterDialog={setShowConfirmLaterDialog}
        setShowTimeSelectionDialog={setShowTimeSelectionDialog}
        setShowBufferDialog={setShowBufferDialog}
        handleBookNow={handleBookNow}
        handleBookLater={handleBookLater}
        handleConfirmNowBooking={handleConfirmNowBooking}
        handleConfirmLaterBooking={handleConfirmLaterBooking}
        handleTimeSelection={handleTimeSelection}
        handleBufferConfirm={handleBufferConfirm}
        handleNoConfirmation={handleNoConfirmation}
      />
    </div>
  );
};

export default Index;