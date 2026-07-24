import { MessageCircle, Send, Terminal, Shield, Clock, Lock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { sendTelegramNotification } from '@/lib/telegram';

export function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send notification to Telegram
    sendTelegramNotification('CONTACT_FORM', {
      customerName: formData.name,
      email: formData.email,
      message: formData.message
    });
    
    // Open Telegram with the message
    const telegramMsg = `*New Message from Card Vault*\n\n*Name:* ${formData.name}\n${formData.email ? `*Telegram:* ${formData.email}\n` : ''}\n*Message:* ${formData.message}`;
    const encodedMsg = encodeURIComponent(telegramMsg);
    window.open(`https://t.me/cardvaultstore?text=${encodedMsg}`, '_blank');
    setShowDialog(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'telegram',
      value: '@cardvaultstore',
      href: 'https://t.me/cardvaultstore',
    },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={ref}
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-mono text-sm">contact.module</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono text-green-400 mb-2">
            $ nc -v support 443
          </h2>
          <p className="text-green-600 font-mono text-sm">
            Connection established. Ready to communicate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div className="space-y-4">
            {contactMethods.map((method, index) => (
              <Card 
                key={index}
                className={`bg-black border border-green-500/30 hover:border-green-500 transition-all duration-300 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-5 flex items-center gap-4">
                  <a 
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-green-500/50 flex items-center justify-center group-hover:bg-green-500/20 transition-colors"
                  >
                    <method.icon className="w-6 h-6 text-green-500" />
                  </a>
                  <div className="font-mono">
                    <a 
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 flex items-center gap-1"
                    >
                      {method.value}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <div className="text-green-600 text-xs">{method.title}</div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Status Panel */}
            <div className="border border-green-500/30 p-5 bg-green-500/5">
              <div className="text-green-700 font-mono text-sm mb-4">$ systemctl status</div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Shield, label: 'secure', status: 'OK' },
                  { icon: Clock, label: '24/7', status: 'UP' },
                  { icon: Lock, label: 'encrypted', status: 'ON' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <item.icon className="w-5 h-5 text-green-500 mx-auto mb-2" />
                    <div className="text-xs text-green-700 font-mono">{item.label}</div>
                    <div className="text-xs text-green-400 font-mono">[{item.status}]</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className={`bg-black border border-green-500/30 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '200ms' }}>
            <CardContent className="p-6">
              <div className="text-green-700 font-mono text-sm mb-6">$ ./send_message.sh</div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-green-600 font-mono text-xs mb-2 block">
                    $ read -p "Name: " name
                  </label>
                  <Input 
                    placeholder="user_input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-black border-green-500/30 text-green-400 font-mono focus:border-green-500 rounded-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-green-600 font-mono text-xs mb-2 block">
                    $ read -p "Telegram: " telegram
                  </label>
                  <Input 
                    placeholder="@username (optional)"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-black border-green-500/30 text-green-400 font-mono focus:border-green-500 rounded-none"
                  />
                </div>
                <div>
                  <label className="text-green-600 font-mono text-xs mb-2 block">
                    $ read -p "Message: " message
                  </label>
                  <Textarea 
                    placeholder="Enter your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-black border-green-500/30 text-green-400 font-mono focus:border-green-500 rounded-none min-h-[120px]"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-green-500 text-black hover:bg-green-400 font-mono rounded-none"
                >
                  <Send className="w-4 h-4 mr-2" />
                  ./submit.sh
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-black border border-green-500/30 font-mono">
          <DialogHeader>
            <DialogTitle className="text-center text-green-400 flex flex-col items-center">
              <div className="w-16 h-16 border border-green-500 flex items-center justify-center mb-4">
                <Send className="w-8 h-8 text-green-500" />
              </div>
              $ echo "Message Sent!"
            </DialogTitle>
            <DialogDescription className="text-center text-green-700">
              Transmission complete. Support will respond within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button 
              onClick={() => setShowDialog(false)} 
              variant="outline"
              className="border-green-500/30 text-green-600 hover:bg-green-500/10"
            >
              exit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
