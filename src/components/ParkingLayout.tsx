import { CarIcon } from 'lucide-react';

interface ParkingSlot {
  id: string;
  status: 'available' | 'occupied';
}

interface ParkingLayoutProps {
  parkingSlots: ParkingSlot[];
  onSlotSelect: (slotId: string) => void;
}

const ParkingLayout = ({ parkingSlots, onSlotSelect }: ParkingLayoutProps) => {
  const leftSlots = parkingSlots.slice(0, 3);
  const rightSlots = parkingSlots.slice(3);

  return (
    <div className="relative mt-8">
      <div className="flex justify-between">
        <div className="space-y-4">
          {leftSlots.map((slot) => (
            <div
              key={slot.id}
              onClick={() => slot.status === 'available' && onSlotSelect(slot.id)}
              className={`w-16 h-16 border-2 ${
                slot.status === 'available' ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100'
              } rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity shadow-md`}
            >
              {slot.id}
            </div>
          ))}
        </div>

        <div className="mx-auto w-24 h-64 bg-gray-200/80 backdrop-blur-sm rounded-lg">
          <div className="h-full flex items-center justify-center text-purple-400">
            <CarIcon className="w-12 h-12 animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          {rightSlots.map((slot) => (
            <div
              key={slot.id}
              onClick={() => slot.status === 'available' && onSlotSelect(slot.id)}
              className={`w-16 h-16 border-2 ${
                slot.status === 'available' ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100'
              } rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity shadow-md`}
            >
              {slot.id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingLayout;