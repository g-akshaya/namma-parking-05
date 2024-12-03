import { CarIcon } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
      <div className="w-full max-w-md text-center">
        <h2 className="text-[30px] font-['Helvetica'] font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Namma Parking
        </h2>
      </div>
      <div className="w-full flex justify-center mt-12">
        <CarIcon className="w-16 h-16 text-purple-600 animate-bounce" />
      </div>
    </div>
  );
};

export default LoadingScreen;