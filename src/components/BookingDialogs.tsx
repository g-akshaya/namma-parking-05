import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Clock } from 'lucide-react';
import { format, addDays, isWithinInterval, parseISO } from 'date-fns';
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface BookingDialogsProps {
  showBookingDialog: boolean;
  showConfirmNowDialog: boolean;
  showConfirmLaterDialog: boolean;
  showTimeSelectionDialog: boolean;
  showBufferDialog: boolean;
  setShowBookingDialog: (show: boolean) => void;
  setShowConfirmNowDialog: (show: boolean) => void;
  setShowConfirmLaterDialog: (show: boolean) => void;
  setShowTimeSelectionDialog: (show: boolean) => void;
  setShowBufferDialog: (show: boolean) => void;
  handleBookNow: () => void;
  handleBookLater: () => void;
  handleConfirmNowBooking: () => void;
  handleConfirmLaterBooking: () => void;
  handleTimeSelection: () => void;
  handleBufferConfirm: () => void;
  handleNoConfirmation: () => void;
}

const BookingDialogs = ({
  showBookingDialog,
  showConfirmNowDialog,
  showConfirmLaterDialog,
  showTimeSelectionDialog,
  showBufferDialog,
  setShowBookingDialog,
  setShowConfirmNowDialog,
  setShowConfirmLaterDialog,
  setShowTimeSelectionDialog,
  setShowBufferDialog,
  handleBookNow,
  handleBookLater,
  handleConfirmNowBooking,
  handleConfirmLaterBooking,
  handleTimeSelection,
  handleBufferConfirm,
  handleNoConfirmation,
}: BookingDialogsProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { toast } = useToast();
  const currentDate = new Date();
  const maxDate = addDays(currentDate, 7);

  const validateDateSelection = (date: string) => {
    const selectedDateTime = parseISO(date);
    const isValid = isWithinInterval(selectedDateTime, {
      start: currentDate,
      end: maxDate
    });

    if (!isValid) {
      toast({
        title: "Invalid Date Selection",
        description: "Your booking can only be made within 7 days of the current date. Please select a valid date.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleDateTimeSubmit = () => {
    if (validateDateSelection(selectedDate)) {
      handleTimeSelection();
    }
  };

  return (
    <>
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-sm rounded-xl p-4">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-base">Booking Options</DialogTitle>
            <DialogDescription className="text-sm">
              Do you want to book now or for later?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button size="sm" onClick={handleBookLater}>Book Later</Button>
            <Button size="sm" onClick={handleBookNow}>Book Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmNowDialog} onOpenChange={setShowConfirmNowDialog}>
        <AlertDialogContent className="max-w-sm rounded-xl p-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">Confirm Booking</AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Are you sure you want to book this slot now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 mt-4">
            <AlertDialogCancel onClick={handleNoConfirmation}>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmNowBooking}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showConfirmLaterDialog} onOpenChange={setShowConfirmLaterDialog}>
        <AlertDialogContent className="max-w-md rounded-xl p-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">Advance Booking Notice</AlertDialogTitle>
            <AlertDialogDescription className="text-base text-gray-600">
              Booking in advance will cost you more than booking on the spot. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleNoConfirmation}>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmLaterBooking}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showTimeSelectionDialog} onOpenChange={setShowTimeSelectionDialog}>
        <DialogContent className="max-w-md rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-4">Select Arrival Time</DialogTitle>
            <DialogDescription>
              <div className="space-y-4">
                <div className="text-sm font-medium text-gray-700">
                  Current Date & Time: {format(new Date(), "MMM d, yyyy - h:mm a")}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <CalendarIcon className="w-5 h-5 text-purple-400" />
                    <Input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={format(currentDate, "yyyy-MM-dd")}
                      max={format(maxDate, "yyyy-MM-dd")}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <Input 
                      type="time" 
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowTimeSelectionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDateTimeSubmit}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showBufferDialog} onOpenChange={setShowBufferDialog}>
        <AlertDialogContent className="max-w-md rounded-xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">Buffer Time Notice</AlertDialogTitle>
            <AlertDialogDescription className="text-base text-gray-600">
              A buffer time of 15 minutes will be provided for parking. If you do not park within this time, your reserved slot will be canceled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel onClick={handleNoConfirmation}>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleBufferConfirm}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingDialogs;