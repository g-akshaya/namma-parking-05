import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
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
import { useToast } from "@/components/ui/use-toast";
import { 
  MenuIcon,
  UserIcon,
  WalletIcon,
  ClockIcon,
  InfoIcon,
  LogOutIcon,
  XIcon,
  SearchIcon,
  CalendarIcon,
} from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';
import ParkingLayout from '@/components/ParkingLayout';

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

  const menuItems = [
    { icon: <UserIcon className="w-5 h-5" />, label: 'Profile' },
    { icon: <WalletIcon className="w-5 h-5" />, label: 'Wallet' },
    { icon: <ClockIcon className="w-5 h-5" />, label: 'Parking History' },
    { icon: <InfoIcon className="w-5 h-5" />, label: 'FAQ' },
    { icon: <LogOutIcon className="w-5 h-5" />, label: 'Log Out' },
    { icon: <XIcon className="w-5 h-5" />, label: 'Exit' },
  ];

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-600">Namma Parking</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="w-6 h-6 text-purple-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="py-4">
                <h2 className="text-2xl font-bold text-purple-600 mb-6">Namma Parking</h2>
                <nav className="space-y-2">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Card className="p-4 shadow-lg">
          {!showParkingSlots ? (
            <div className="relative">
              <Input
                type="text"
                placeholder="Search parking location..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pr-10 bg-white/80 backdrop-blur-sm"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <SearchIcon className="w-5 h-5 text-purple-400" />
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-purple-600 mb-4">College Parking</h2>
              <ParkingLayout 
                parkingSlots={[
                  { id: 'L1', status: 'available' },
                  { id: 'L2', status: 'occupied' },
                  { id: 'L3', status: 'available' },
                  { id: 'L4', status: 'available' },
                  { id: 'L5', status: 'occupied' },
                  { id: 'R1', status: 'available' },
                  { id: 'R2', status: 'available' },
                  { id: 'R3', status: 'occupied' },
                  { id: 'R4', status: 'available' },
                  { id: 'R5', status: 'occupied' },
                ]}
                onSlotSelect={handleSlotSelection}
              />
            </>
          )}
        </Card>
      </div>

      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-sm p-4">
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to book this slot now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
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
    </div>
  );
};

export default Index;
