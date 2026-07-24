import { Terminal, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Privacy() {
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
            <h1 className="text-2xl font-bold text-green-400">Privacy Policy</h1>
          </div>

          <div className="space-y-6 text-green-600">
            <section>
              <h2 className="text-green-400 font-bold mb-2">1. Information We Collect</h2>
              <p className="text-sm">
                We collect minimal personal information necessary for order processing and customer support. 
                This may include email addresses for digital delivery and shipping addresses for physical products.
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">2. How We Use Your Information</h2>
              <p className="text-sm">
                Your information is used solely for:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>Order processing and fulfillment</li>
                <li>Customer support communication</li>
                <li>Payment processing through third-party providers</li>
                <li>Shipping and delivery notifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">3. Data Protection</h2>
              <p className="text-sm">
                We implement industry-standard security measures to protect your data. 
                All sensitive information is encrypted during transmission and storage.
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">4. Third-Party Services</h2>
              <p className="text-sm">
                We use trusted third-party services for payment processing (NowPayments) and delivery. 
                These providers have their own privacy policies governing the use of your information.
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">5. Cookies and Tracking</h2>
              <p className="text-sm">
                We use essential cookies for website functionality and analytics to improve our service. 
                You can disable cookies in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">6. Data Retention</h2>
              <p className="text-sm">
                We retain order information for a limited period necessary for business operations 
                and legal compliance. You may request deletion of your personal data at any time.
              </p>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">7. Your Rights</h2>
              <p className="text-sm">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-green-400 font-bold mb-2">8. Contact Us</h2>
              <p className="text-sm">
                For questions about this privacy policy, please contact us at @cardvaultstore on Telegram.
              </p>
            </section>

            <div className="pt-8 border-t border-green-500/30 text-green-700 text-xs">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
