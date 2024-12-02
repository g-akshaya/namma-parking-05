import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from 'lucide-react';

interface BookingDialogsProps {
  showBookingDialog: boolean;
  setShowBookingDialog: (show: boolean) => void;
  showConfirmNowDialog: boolean;
  setShowConfirmNowDialog: (show: boolean) => void;
  showConfirmLaterDialog: boolean;
  setShowConfirmLaterDialog: (show: boolean) => void;
  showTimeSelectionDialog: boolean;
  setShowTimeSelectionDialog: (show: boolean) => void;
  showBufferDialog: boolean;
  setShowBufferDialog: (show: boolean) => void;
  onBookNow: () => void;
  onBookLater: () => void;
  onConfirmNowBooking: () => void;
  onConfirmLaterBooking: () => void;
  onTimeSelection: () => void;
  onBufferConfirm: () => void;
}

const BookingDialogs = ({
  showBookingDialog,
  setShowBookingDialog,
  showConfirmNowDialog,
  setShowConfirmNowDialog,
  showConfirmLaterDialog,
  setShowConfirmLaterDialog,
  showTimeSelectionDialog,
  setShowTimeSelectionDialog,
  showBufferDialog,
  setShowBufferDialog,
  onBookNow,
  onBookLater,
  onConfirmNowBooking,
  onConfirmLaterBooking,
  onTimeSelection,
  onBufferConfirm,
}: BookingDialogsProps) => {
  return (
    <>
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Options</DialogTitle>
            <DialogDescription>
              Do you want to book now or for later?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
              Cancel
            </Button>
            <Button onClick={onBookLater}>Book Later</Button>
            <Button onClick={onBookNow}>Book Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmNowDialog} onOpenChange={setShowConfirmNowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to book this slot now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmNowBooking}>Yes</AlertDialogAction>
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
            <AlertDialogAction onClick={onConfirmLaterBooking}>Yes</AlertDialogAction>
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
            <Button onClick={onTimeSelection}>Confirm</Button>
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
            <AlertDialogAction onClick={onBufferConfirm}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingDialogs;