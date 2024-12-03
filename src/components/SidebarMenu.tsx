import { UserIcon, WalletIcon, ClockIcon, InfoIcon, LogOutIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: <UserIcon className="w-5 h-5" />, label: 'Profile', path: '/profile' },
  { icon: <WalletIcon className="w-5 h-5" />, label: 'Wallet', path: '/wallet' },
  { icon: <ClockIcon className="w-5 h-5" />, label: 'Parking History' },
  { icon: <InfoIcon className="w-5 h-5" />, label: 'FAQ' },
  { icon: <LogOutIcon className="w-5 h-5" />, label: 'Log Out' },
  { icon: <XIcon className="w-5 h-5" />, label: 'Exit' },
];

export const SidebarMenu = () => {
  const navigate = useNavigate();

  const handleClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold text-purple-600 mb-6">Namma Parking</h2>
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
            onClick={() => handleClick(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};