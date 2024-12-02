import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from 'lucide-react';

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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Advance Booking Notice</AlertDialogTitle>
            <AlertDialogDescription>
              Booking in prior will cost you more than on the spot. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmLaterBooking}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showTimeSelectionDialog} onOpenChange={setShowTimeSelectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Arrival Time</DialogTitle>
            <DialogDescription>
              Please select your expected arrival time
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <CalendarIcon className="w-5 h-5 text-purple-400" />
              <Input type="datetime-local" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTimeSelectionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleTimeSelection}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showBufferDialog} onOpenChange={setShowBufferDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Buffer Time Notice</AlertDialogTitle>
            <AlertDialogDescription>
              A buffer time of 15 minutes will be given for parking. If not parked by then, the booked slot will be canceled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleBufferConfirm}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingDialogs;