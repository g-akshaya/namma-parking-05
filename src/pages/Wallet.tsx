import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const Wallet = () => {
  const [balance, setBalance] = useState(5000);
  const [showRecharge, setShowRecharge] = useState(false);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRecharge = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to recharge.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setBalance(prev => prev + Number(amount));
      setIsProcessing(false);
      setShowRecharge(false);
      setAmount('');
      toast({
        title: "Recharge Successful",
        description: `Successfully added ₹${amount} to your wallet.`,
      });
    }, 3000);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-medium text-gray-700">The payment is being processed, please wait.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          Back to Home
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-purple-800 mb-8">Wallet</h1>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center p-6 bg-gray-50 rounded-lg">
              <span className="text-xl font-semibold">Current Balance:</span>
              <span className="text-xl font-bold text-purple-800">₹{balance}</span>
            </div>
            
            <Button 
              className="w-full py-6 text-lg"
              onClick={() => setShowRecharge(true)}
            >
              Recharge Wallet
            </Button>
          </div>
        </div>

        <Dialog open={showRecharge} onOpenChange={setShowRecharge}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Recharge Wallet</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => setShowRecharge(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Enter the recharge amount:
                </label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                />
              </div>
              <Button 
                className="w-full"
                onClick={handleRecharge}
              >
                Recharge
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Wallet;