import { Card } from "@/components/ui/card";
import ParkingLayout from '@/components/ParkingLayout';

interface ParkingSectionProps {
  onSlotSelect: (slotId: string) => void;
}

const ParkingSection = ({ onSlotSelect }: ParkingSectionProps) => {
  return (
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
        onSlotSelect={onSlotSelect}
      />
    </>
  );
};

export default ParkingSection;