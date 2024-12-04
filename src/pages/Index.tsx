import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import HomeHeader from '@/components/HomeHeader';
import ParkingContainer from '@/components/ParkingContainer';
import BookingDialogs from '@/components/BookingDialogs';
import { useBookingState } from '@/hooks/useBookingState';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showParkingSlots, setShowParkingSlots] = useState(false);
  const bookingState = useBookingState();

  useEffect(() => {
    const showSlots = localStorage.getItem('showParkingSlots');
    if (showSlots === 'true') {
      setShowParkingSlots(true);
      setIsLoading(false);
      localStorage.removeItem('showParkingSlots');
    }
  }, []);

  const handleSearch = () => {
    if (searchValue.toLowerCase() === 'college') {
      setShowParkingSlots(true);
    }
  };

  const handleSlotSelection = (slotId: string) => {
    bookingState.setSelectedSlot(slotId);
    bookingState.setShowBookingDialog(true);
  };

  if (isLoading && !showParkingSlots) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="p-4 max-w-4xl mx-auto">
        <Header />
        
        {!showParkingSlots ? (
          <HomeHeader 
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSearch={handleSearch}
          />
        ) : (
          <ParkingContainer onSlotSelect={handleSlotSelection} />
        )}
      </div>

      <BookingDialogs 
        showBookingDialog={bookingState.showBookingDialog}
        showConfirmNowDialog={bookingState.showConfirmNowDialog}
        showConfirmLaterDialog={bookingState.showConfirmLaterDialog}
        showTimeSelectionDialog={bookingState.showTimeSelectionDialog}
        showBufferDialog={bookingState.showBufferDialog}
        setShowBookingDialog={bookingState.setShowBookingDialog}
        setShowConfirmNowDialog={bookingState.setShowConfirmNowDialog}
        setShowConfirmLaterDialog={bookingState.setShowConfirmLaterDialog}
        setShowTimeSelectionDialog={bookingState.setShowTimeSelectionDialog}
        setShowBufferDialog={bookingState.setShowBufferDialog}
        handleBookNow={bookingState.handleBookNow}
        handleBookLater={bookingState.handleBookLater}
        handleConfirmNowBooking={bookingState.handleConfirmNowBooking}
        handleConfirmLaterBooking={bookingState.handleConfirmLaterBooking}
        handleTimeSelection={bookingState.handleTimeSelection}
        handleBufferConfirm={bookingState.handleBufferConfirm}
        handleNoConfirmation={bookingState.handleNoConfirmation}
      />
    </div>
  );
};

export default Index;