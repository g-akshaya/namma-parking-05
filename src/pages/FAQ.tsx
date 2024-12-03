import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How do I create an account?",
    answer: "Users can sign up by emailing or contacting the authority."
  },
  {
    question: "How can I book a parking slot in advance?",
    answer: "Go to the \"Reserve Slot\" section, select your preferred location, date, and time, and confirm the reservation."
  },
  {
    question: "What happens if I arrive late for my reserved slot?",
    answer: "Reserved slots are held for a grace period (e.g., 10 minutes); after that, it may be reassigned. Check the policy details in the app."
  },
  {
    question: "What if my RFID tag doesn't work?",
    answer: "Contact the facility administrator."
  },
  {
    question: "How are parking fees calculated?",
    answer: "Fees are based on the duration of your parking and the facility's pricing structure. Check the fee calculator in the app for details."
  },
  {
    question: "Is my vehicle secure in the parking lot?",
    answer: "Yes, parking lots integrated with this app have camera-based vehicle detection and monitoring for added security."
  },
  {
    question: "My reserved slot was occupied by someone else. What should I do?",
    answer: "Report the issue through the app's \"Help & Support\" section. Alternative arrangements will be made promptly."
  },
  {
    question: "Why is my payment failing?",
    answer: "Ensure your internet connection is stable and that your payment method has sufficient balance or credit."
  },
  {
    question: "Can I view real-time availability of parking slots?",
    answer: "Yes, the app updates slot availability in real-time for supported locations."
  },
  {
    question: "Does the app support multiple vehicles?",
    answer: "Yes, you can register multiple vehicles under a single account."
  }
];

const FAQ = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4">
      <Button 
        variant="outline" 
        onClick={() => navigate('/')}
        className="mb-6"
      >
        Back to Home
      </Button>
      
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm">
              <AccordionTrigger className="px-4 hover:no-underline hover:text-purple-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;