import { Card } from './ui/card';
import ParkingSection from './ParkingSection';

interface ParkingContainerProps {
  onSlotSelect: (slotId: string) => void;
}

const ParkingContainer = ({ onSlotSelect }: ParkingContainerProps) => {
  return (
    <Card className="p-4 shadow-lg mt-4">
      <ParkingSection onSlotSelect={onSlotSelect} />
    </Card>
  );
};

export default ParkingContainer;