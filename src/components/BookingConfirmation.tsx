import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ClockIcon, CarIcon, IndianRupeeIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter } from './ui/dialog';

interface BookingConfirmationProps {
  slotId: string;
  bookingTime: Date;
}

const BookingConfirmation = ({ slotId, bookingTime }: BookingConfirmationProps) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showThankYouDialog, setShowThankYouDialog] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const costPerMinute = 2;

  return (
    <>
      <Dialog open={showThankYouDialog} onOpenChange={setShowThankYouDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center gap-4 py-4">
            <CarIcon className="w-16 h-16 text-purple-500" />
            <h2 className="text-xl font-semibold text-center">Thank you for Booking</h2>
            <p className="text-center text-gray-600">You have 5 minutes to park your car</p>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setShowThankYouDialog(false)}
              className="w-full"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-purple-50 p-6">
        <Card className="max-w-md mx-auto p-6 space-y-6">
          <div className="flex justify-center">
            <CarIcon className="w-16 h-16 text-purple-500" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ClockIcon className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Booking Time</p>
                <p className="font-semibold">
                  {bookingTime.toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CarIcon className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Slot Number</p>
                <p className="font-semibold">{slotId}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IndianRupeeIcon className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Cost per minute</p>
                <p className="font-semibold">₹{costPerMinute}</p>
              </div>
            </div>

            <div className="bg-purple-100 p-4 rounded-lg">
              <p className="text-center text-lg font-semibold text-purple-700">
                Time Remaining: {minutes}:{seconds.toString().padStart(2, '0')}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default BookingConfirmation;