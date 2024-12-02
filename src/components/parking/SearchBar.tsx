import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: () => void;
}

const SearchBar = ({ searchValue, setSearchValue, onSearch }: SearchBarProps) => {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search parking location..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        className="pr-10 bg-white/80 backdrop-blur-sm"
      />
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onSearch}
        className="absolute right-1 top-1/2 -translate-y-1/2"
      >
        <SearchIcon className="w-5 h-5 text-purple-400" />
      </Button>
    </div>
  );
};

export default SearchBar;