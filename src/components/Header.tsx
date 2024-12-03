import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from 'lucide-react';
import { SidebarMenu } from './SidebarMenu';

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-purple-600">Namma Parking</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="w-6 h-6 text-purple-600" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] sm:w-[350px]">
          <SidebarMenu />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;