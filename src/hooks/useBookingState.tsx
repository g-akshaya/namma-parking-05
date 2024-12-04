import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

export const useBookingState = () => {
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showConfirmNowDialog, setShowConfirmNowDialog] = useState(false);
  const [showConfirmLaterDialog, setShowConfirmLaterDialog] = useState(false);
  const [showTimeSelectionDialog, setShowTimeSelectionDialog] = useState(false);
  const [showBufferDialog, setShowBufferDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const resetStates = () => {
    setSelectedSlot(null);
    setShowBookingDialog(false);
    setShowConfirmNowDialog(false);
    setShowConfirmLaterDialog(false);
    setShowTimeSelectionDialog(false);
    setShowBufferDialog(false);
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
      resetStates();
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
    resetStates();
  };

  const handleNoConfirmation = () => {
    resetStates();
  };

  return {
    showBookingDialog,
    showConfirmNowDialog,
    showConfirmLaterDialog,
    showTimeSelectionDialog,
    showBufferDialog,
    selectedSlot,
    setShowBookingDialog,
    setShowConfirmNowDialog,
    setShowConfirmLaterDialog,
    setShowTimeSelectionDialog,
    setShowBufferDialog,
    setSelectedSlot,
    handleBookNow,
    handleBookLater,
    handleConfirmNowBooking,
    handleConfirmLaterBooking,
    handleTimeSelection,
    handleBufferConfirm,
    handleNoConfirmation,
  };
};