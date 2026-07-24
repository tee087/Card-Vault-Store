import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const TERMS_KEY = 'card-vault-terms-accepted';

const RULES = [
  "No reporting the site to authorities or authorities impersonators",
  "No sharing, copying, or distributing our proprietary products",
  "No testing products before purchasing - all sales are final",
  "No refunds or chargebacks under any circumstances",
  "All transactions are final and non-reversible",
  "You must be of legal age to purchase in your jurisdiction",
  "Use of this site constitutes agreement to these terms",
];

interface TermsAcceptanceProps {
  onAccepted: () => void;
}

export function TermsAcceptance({ onAccepted }: TermsAcceptanceProps) {
  const [agreed, setAgreed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    if (agreed) {
      localStorage.setItem(TERMS_KEY, 'true');
      setIsVisible(false);
      onAccepted();
    }
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">
      <div className="max-w-lg w-full mx-4 p-8 border-2 border-green-500/50 bg-black/90 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.3)]">
        <h1 className="text-2xl font-bold text-green-500 mb-4 text-center">
          ⚠️ IMPORTANT NOTICES ⚠️
        </h1>
        
        <p className="text-green-400/80 mb-6 text-center text-sm">
          By accessing this website, you agree to the following terms:
        </p>

        <ul className="space-y-3 mb-6">
          {RULES.map((rule, index) => (
            <li key={index} className="flex items-start gap-3 text-green-300 text-sm">
              <span className="text-red-500">✖</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 mb-6 p-3 border border-yellow-500/30 bg-yellow-500/10 rounded">
          <Checkbox 
            id="agree" 
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            className="border-green-500 data-[state=checked]:bg-green-500"
          />
          <label 
            htmlFor="agree" 
            className="text-sm text-green-300 cursor-pointer select-none"
          >
            I have read and agree to the terms, rules, and policies above
          </label>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleDecline}
            variant="outline"
            className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-500"
          >
            DECLINE & LEAVE
          </Button>
          <Button
            onClick={handleAccept}
            disabled={!agreed}
            className="flex-1 bg-green-600 hover:bg-green-700 text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            I AGREE - ENTER
          </Button>
        </div>

        <p className="text-xs text-green-500/50 mt-4 text-center">
          By clicking "I Agree", you acknowledge that you have read and understood these terms
        </p>
      </div>
    </div>
  );
}

export function checkTermsAccepted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(TERMS_KEY) === 'true';
}
