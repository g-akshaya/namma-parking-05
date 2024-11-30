import { CarIcon } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold mb-2 text-purple-600 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Welcome to
        </h1>
        <h2 className="text-5xl font-bold mb-8 text-purple-600 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Namma Parking
        </h2>
      </div>
      <div className="mt-8 animate-bounce">
        <CarIcon className="w-16 h-16 text-purple-600" />
      </div>
    </div>
  );
};

export default LoadingScreen;