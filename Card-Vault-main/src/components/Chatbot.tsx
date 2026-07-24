import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User, ChevronDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface QuickQuestion {
  id: string;
  question: string;
  answer: string;
}

const quickQuestions: QuickQuestion[] = [
  {
    id: 'q1',
    question: 'How do I place an order?',
    answer: 'To place an order: 1) Browse our products catalog, 2) Add items to your cart, 3) Click checkout, 4) Select your preferred cryptocurrency, 5) Complete payment to the provided address. Your order will be delivered instantly after payment confirmation.'
  },
  {
    id: 'q2',
    question: 'What payment methods do you accept?',
    answer: 'We accept Bitcoin (BTC), Ethereum (ETH), USDT, USDC, Monero (XMR), Litecoin (LTC), Dogecoin (DOGE), and Tron (TRX). All payments are processed through NowPayments for security.'
  },
  {
    id: 'q3',
    question: 'How long does delivery take?',
    answer: 'Digital products are delivered instantly via email or secure portal after payment confirmation. Physical cards are shipped within 24-48 hours with discreet packaging and tracking.'
  },
  {
    id: 'q4',
    question: 'Do you offer refunds?',
    answer: 'We offer replacements for non-working products within 24 hours of delivery. Please contact support immediately if you encounter any issues. All sales are final for working products.'
  },
  {
    id: 'q5',
    question: 'How can I track my order?',
    answer: 'After payment, you will receive a confirmation email with your order details. For digital products, delivery is instant. For physical cards, tracking information is sent within 24-48 hours.'
  },
  {
    id: 'q6',
    question: 'Are the products legal?',
    answer: 'All our products are for educational and novelty purposes only. By purchasing, you agree to use them responsibly and in accordance with local laws. We do not condone illegal activities.'
  },
  {
    id: 'q7',
    question: 'How do I contact support?',
    answer: 'You can reach our support team via Telegram at @cardvaultstore. We are available 24/7 for any questions or concerns.'
  },
  {
    id: 'q8',
    question: 'Do you offer bulk discounts?',
    answer: 'Yes! We offer significant discounts for bulk orders. Contact our support team for custom pricing on orders above $1000.'
  }
];

const initialGreeting: Message = {
  id: 'greeting',
  role: 'assistant',
  content: 'Hello! I\'m your AI assistant. I can help you with questions about our products, ordering process, payment methods, and more. Select a question below or type your own question.',
  timestamp: new Date()
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialGreeting]);
  const [inputValue, setInputValue] = useState('');
  const [showQuestions, setShowQuestions] = useState(true);

  const handleSendMessage = (content: string) => {
    const timestamp = new Date();
    const userMessage: Message = {
      id: `user-${timestamp.getTime()}`,
      role: 'user',
      content,
      timestamp
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowQuestions(false);

    // Simulate AI response
    setTimeout(() => {
      const responseTimestamp = new Date();
      const response: Message = {
        id: `assistant-${responseTimestamp.getTime()}`,
        role: 'assistant',
        content: getAIResponse(content),
        timestamp: responseTimestamp
      };
      setMessages(prev => [...prev, response]);
    }, 500);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('order') || lowerQuestion.includes('buy')) {
      return quickQuestions[0].answer;
    } else if (lowerQuestion.includes('payment') || lowerQuestion.includes('crypto') || lowerQuestion.includes('bitcoin')) {
      return quickQuestions[1].answer;
    } else if (lowerQuestion.includes('delivery') || lowerQuestion.includes('shipping') || lowerQuestion.includes('time')) {
      return quickQuestions[2].answer;
    } else if (lowerQuestion.includes('refund') || lowerQuestion.includes('money back')) {
      return quickQuestions[3].answer;
    } else if (lowerQuestion.includes('track')) {
      return quickQuestions[4].answer;
    } else if (lowerQuestion.includes('legal') || lowerQuestion.includes('allowed')) {
      return quickQuestions[5].answer;
    } else if (lowerQuestion.includes('contact') || lowerQuestion.includes('support') || lowerQuestion.includes('help')) {
      return quickQuestions[6].answer;
    } else if (lowerQuestion.includes('bulk') || lowerQuestion.includes('discount')) {
      return quickQuestions[7].answer;
    }
    
    return 'Thank you for your question! For detailed assistance, you can chat with our admin directly. Click "Chat with Admin" to connect with our support team on Telegram.';
  };

  const handleQuickQuestion = (question: QuickQuestion) => {
    handleSendMessage(question.question);
  };

  const handleChatWithAdmin = () => {
    // Opens Telegram with the last message or a default greeting
    const lastMessage = messages.length > 1 ? messages[messages.length - 1].content : 'Hello, I need help with my order';
    const encodedMessage = encodeURIComponent(lastMessage);
    window.open(`https://t.me/cardvaultstore?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-110"
      >
        <MessageCircle className="w-6 h-6 text-black" />
      </button>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md w-full bg-black border border-green-500/30 font-mono h-[500px] flex flex-col p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-green-500/30 bg-green-500/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-black" />
              </div>
              <div>
                <div className="text-green-400 font-bold text-sm">AI Assistant</div>
                <div className="text-green-700 text-xs">Online now</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-green-600 hover:text-green-400"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-black" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 text-sm ${
                      message.role === 'user'
                        ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                        : 'bg-black border border-green-500/20 text-green-400'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-6 h-6 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-black" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          {showQuestions && messages.length === 1 && (
            <div className="p-4 border-t border-green-500/30">
              <div className="text-green-700 text-xs mb-2">Quick Questions</div>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.slice(0, 4).map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleQuickQuestion(q)}
                    className="px-3 py-1.5 text-xs text-green-400 border border-green-500/30 hover:border-green-500 hover:bg-green-500/10 transition-colors"
                  >
                    {q.question}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowQuestions(!showQuestions)}
                className="flex items-center gap-1 text-green-700 text-xs mt-2 hover:text-green-500"
              >
                <ChevronDown className="w-3 h-3" />
                Show more questions
              </button>
            </div>
          )}

          {/* Chat with Admin Button */}
          <div className="p-4 border-t border-green-500/30">
            <Button
              onClick={handleChatWithAdmin}
              className="w-full bg-green-500/20 border border-green-500/50 text-green-400 hover:bg-green-500/30 text-sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Or Chat with Admin
            </Button>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-green-500/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Type your question..."
                className="flex-1 bg-black border border-green-500/30 px-3 py-2 text-green-400 text-sm focus:outline-none focus:border-green-500"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim()}
                className="bg-green-500 hover:bg-green-400 text-black"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
