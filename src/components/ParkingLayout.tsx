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
  const leftSlots = parkingSlots.slice(0, 5);
  const rightSlots = parkingSlots.slice(5);

  return (
    <div className="relative mt-8">
      {/* Legend */}
      <div className="mb-6 flex items-center gap-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-green-500 bg-green-100 rounded"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-red-500 bg-red-100 rounded"></div>
          <span className="text-sm text-gray-600">Occupied</span>
        </div>
      </div>

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

        <div className="mx-auto w-24 h-96 bg-gray-200/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <CarIcon className="w-12 h-12 text-purple-400 animate-pulse" />
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