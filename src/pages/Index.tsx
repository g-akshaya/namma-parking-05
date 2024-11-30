import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
} from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';
import ParkingLayout from '@/components/ParkingLayout';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [showParkingSlots, setShowParkingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
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
    setShowConfirmDialog(true);
  };

  const handleConfirmBooking = () => {
    setShowConfirmDialog(false);
    toast({
      title: "Booking Confirmed!",
      description: "You have 5 minutes to park your car.",
      duration: 5000,
    });
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

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Book Parking Slot</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to book now or for later?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Later</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmBooking}>Book Now</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;