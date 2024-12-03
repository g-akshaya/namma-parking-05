import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import ParkingHistory from "./pages/ParkingHistory";
import BookingStatus from "./pages/BookingStatus";
import FAQ from "./pages/FAQ";
import BookingConfirmation from "./components/BookingConfirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/parking-history" element={<ParkingHistory />} />
          <Route path="/booking-status" element={<BookingStatus />} />
          <Route path="/faq" element={<FAQ />} />
          <Route 
            path="/booking-confirmation" 
            element={
              <BookingConfirmation 
                slotId={localStorage.getItem('selectedSlot') || ''} 
                bookingTime={new Date(localStorage.getItem('bookingTime') || Date.now())} 
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;