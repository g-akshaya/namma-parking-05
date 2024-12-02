import { UserIcon, WalletIcon, ClockIcon, InfoIcon, LogOutIcon, XIcon } from 'lucide-react';

const menuItems = [
  { icon: <UserIcon className="w-5 h-5" />, label: 'Profile' },
  { icon: <WalletIcon className="w-5 h-5" />, label: 'Wallet' },
  { icon: <ClockIcon className="w-5 h-5" />, label: 'Parking History' },
  { icon: <InfoIcon className="w-5 h-5" />, label: 'FAQ' },
  { icon: <LogOutIcon className="w-5 h-5" />, label: 'Log Out' },
  { icon: <XIcon className="w-5 h-5" />, label: 'Exit' },
];

export const SidebarMenu = () => {
  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold text-purple-600 mb-6">Namma Parking</h2>
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};