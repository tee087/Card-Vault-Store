import { Terminal, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TermsAcceptance } from '@/components/TermsAcceptance';

export function Terms() {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <a href="#home">
          <Button variant="outline" className="mb-8 border-green-500/30 text-green-600 hover:bg-green-500/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </a>

        <div className="border border-green-500/30 bg-green-500/5 p-8">
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-6 h-6" />
            <h1 className="text-2xl font-bold text-green-400">Terms of Service</h1>
          </div>

          <div className="space-y-6 text-green-600">
            <section>
              <h2 className="text-green-400 font-bold mb-2">1. Acceptance of Terms</h2>
              <p className="text-sm">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">2. Products and Services</h2>
              <p className="text-sm">
                All products listed on this website are for educational and novelty purposes only. 
                We make no guarantees about the functionality or reliability of any products.
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">3. Payment and Pricing</h2>
              <p className="text-sm">
                All payments are processed through NowPayments.io using cryptocurrency. 
                Prices are subject to change without notice. Payment must be received before product delivery.
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">4. Delivery</h2>
              <p className="text-sm">
                Digital products are delivered instantly after payment confirmation. 
                Physical products are shipped within 24-48 hours. Delivery times may vary based on location.
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">5. Refund Policy</h2>
              <p className="text-sm">
                We offer replacements for non-working products within 24 hours of delivery. 
                All sales are final for products that are confirmed working. 
                No refunds will be issued for change of mind.
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">6. User Responsibilities</h2>
              <p className="text-sm">
                Users agree to use products responsibly and in accordance with local laws. 
                This website does not condone or support illegal activities.
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">7. Limitation of Liability</h2>
              <p className="text-sm">
                We shall not be liable for any damages arising from the use or inability to use our products. 
                Users assume all risks associated with any products purchased.
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">8. Contact Information</h2>
              <p className="text-sm">
                For questions about these terms, please contact us at @cardvaultstore on Telegram.
              </p>
            </section>

            <div className="pt-8 border-t border-green-500/30 text-green-700 text-xs">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Terms Acceptance */}
        <TermsAcceptance onAccepted={() => window.location.hash = 'signup'} />
      </div>
    </div>
  );
}
