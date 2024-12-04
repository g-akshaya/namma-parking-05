import SearchLocation from './SearchLocation';
import { Card } from './ui/card';

interface HomeHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

const HomeHeader = ({ searchValue, onSearchChange, onSearch }: HomeHeaderProps) => {
  return (
    <div className="space-y-6 mt-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-purple-800">Welcome to Namma Parking</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find and book your perfect parking spot with ease. Enter your destination to get started.
        </p>
      </div>
      
      <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm">
        <SearchLocation 
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onSearch={onSearch}
        />
        <p className="mt-4 text-sm text-gray-500 text-center">
          Try searching for "college" to see available parking spots
        </p>
      </Card>
    </div>
  );
};

export default HomeHeader;