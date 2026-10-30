import { useState, useEffect } from 'react';
import { Mail, X } from 'lucide-react';

interface InboxMessage {
  id: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  icon: 'welcome' | 'gift' | 'vip' | 'security';
}

export function MessageInbox() {
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const unreadCount = messages.filter(m => !m.read).length;

  useEffect(() => {
    const stored = localStorage.getItem('card-vault-inbox');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Clear old cached messages that contain old content
        const hasOldContent = parsed.some((m: InboxMessage) =>
          m.subject?.includes('Random Drop') || m.subject?.includes('Regular Customer Status Unlocked') || m.subject?.includes('Path to Regular Customer')
        );
        if (hasOldContent) {
          localStorage.removeItem('card-vault-inbox');
          setMessages([]);
        } else {
          setMessages(parsed);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  // Show popup notification when there are unread messages
  useEffect(() => {
    if (unreadCount > 0) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  return (
    <div className="relative">
      {/* Mail Icon Button - navigates to #messages page */}
      <a
        href="#messages"
        className="relative text-green-600 hover:text-green-400 hover:bg-green-500/10 p-2 rounded transition-colors inline-flex items-center"
        aria-label="Messages"
      >
        <Mail className="w-5 h-5" />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 flex items-center justify-center bg-purple-500 text-white text-[10px] font-bold rounded-full border-2 border-black animate-pulse shadow-lg shadow-purple-500/50">
            {unreadCount} unread
          </span>
        )}

        {/* Glow ring when unread */}
        {unreadCount > 0 && (
          <span className="absolute inset-0 rounded animate-ping bg-purple-500/20 pointer-events-none" />
        )}
      </a>

      {/* Toast Popup Notification */}
      {showPopup && unreadCount > 0 && (
        <div className="absolute right-0 top-12 w-80 z-[100] animate-slide-in-down">
          <a href="#messages" className="block">
            <div className="bg-black/95 border border-purple-500/50 rounded-lg shadow-2xl shadow-purple-500/20 overflow-hidden backdrop-blur-sm">
              {/* Glow bar */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-glow-pulse" />

              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-purple-400 font-mono text-xs font-bold tracking-wider uppercase">
                        New Message
                      </span>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowPopup(false); }}
                        className="text-green-700 hover:text-green-400 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-green-400 font-mono text-sm truncate">
                      {messages[0]?.subject}
                    </p>
                    <p className="text-green-700 font-mono text-xs mt-1">
                      Click to view your inbox
                    </p>
                  </div>
                </div>

                {/* Animated progress bar */}
                <div className="mt-3 h-0.5 bg-green-900/30 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full animate-shrink-bar" />
                </div>
              </div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
