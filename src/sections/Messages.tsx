import { useState, useEffect } from 'react';
import { Mail, Gift, Star, Zap, Shield, ChevronRight, ArrowLeft, Terminal, Clock, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InboxMessage {
  id: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  icon: 'welcome' | 'gift' | 'vip' | 'security';
}

const HACKER_NAMES = [
  'Phantom', 'Shadow', 'Cipher', 'Ghost', 'Nova', 'Viper', 'Raven', 'Apex',
  'Nexus', 'Pulse', 'Stealth', 'Cryptic', 'Void', 'Onyx', 'Blaze', 'Frost',
  'Havoc', 'Omega', 'Sigma', 'Delta', 'Proxy', 'Vector', 'Binary', 'Daemon',
  'Echo', 'Flux', 'Glitch', 'Hex', 'Ion', 'Jinx', 'Kernel', 'Lynx',
  'Matrix', 'Node', 'Orbit', 'Pixel', 'Quantum', 'Root', 'Syntax', 'Torch'
];

const GREETING_OPENERS = [
  'We are very happy to see you between our carding underground.',
  'Welcome aboard, operative. Your presence has been noted.',
  'Access granted. You have entered the inner circle.',
  'The vault doors have opened for you. Welcome inside.',
  'Your anonymous identity has been verified. Welcome to the network.',
];

function generateUsername(): string {
  const stored = localStorage.getItem('card-vault-username');
  if (stored) return stored;
  const name = HACKER_NAMES[Math.floor(Math.random() * HACKER_NAMES.length)];
  const suffix = Math.floor(Math.random() * 999);
  const username = `${name}${suffix}`;
  localStorage.setItem('card-vault-username', username);
  return username;
}

function generateWelcomeMessage(username: string): InboxMessage {
  const opener = GREETING_OPENERS[Math.floor(Math.random() * GREETING_OPENERS.length)];

  const body = `# ═══════════════════════════════════════════════════════
#   CARD VAULT — WELCOME MODULE
#   Classified: TOP SECRET | Clearance Level: GRANTED
# ═══════════════════════════════════════════════════════

import cardvault
from cardvault import access, products, support

class Operative:
    """New operative initialization protocol."""

    def __init__(self, username: str):
        self.username = "${username}"
        self.status = "active"
        self.clearance = "granted"
        self.is_regular = False

    def welcome(self) -> str:
        """Initialize operative session."""
        print("${opener}")

        return f"Welcome to Card Vault, {self.username}."

    def access_granted(self) -> list:
        """Return available privileges."""
        return [
            "Browse full product catalog",
            "Receive exclusive deals and drops",
            "Contact support via Telegram",
            "Earn loyalty rewards over time",
        ]

# ── Execute Welcome ─────────────────────────────────────

if __name__ == "__main__":
    user = Operative(username="${username}")
    user.welcome()

    # NOTE: Regular customers who stay active
    # receive free products in this inbox.
    # Keep shopping to unlock rewards.

    print("Stay active. Stay anonymous. Stay ahead.")
    print("— Card Vault Admin")`;

  return {
    id: `welcome-${Date.now()}`,
    subject: `Welcome to Card Vault, ${username}`,
    body,
    timestamp: new Date().toLocaleString(),
    read: false,
    icon: 'welcome',
  };
}

function generateLoyaltyMessage(): InboxMessage {
  const body = `# ═══════════════════════════════════════════════════════
#   CARD VAULT — LOYALTY ENGINE
#   Module: Regular Customer Status Tracker
# ═══════════════════════════════════════════════════════

from cardvault.loyalty import RegularCustomer
from cardvault.rewards import DropEngine

class CustomerStatus:
    """Tracks customer tier and eligibility."""

    def __init__(self):
        self.is_regular = False
        self.orders_completed = 0
        self.threshold = 10  # orders needed to unlock
        self.rewards_unlocked = False

    def check_eligibility(self) -> bool:
        """Determine if customer qualifies for rewards."""
        if self.orders_completed >= self.threshold:
            self.is_regular = True
            self.rewards_unlocked = True
            return True
        return False

    def get_future_rewards(self) -> list:
        """Returns rewards available after promotion."""
        return [
            "Free products dropped to inbox",
            "Free Google Voice numbers",
            "Free SSH & SOCKS proxies",
            "Exclusive method leaks",
            "Priority support & VIP access",
        ]

    def status_report(self) -> None:
        """Print current customer status."""
        if not self.is_regular:
            print("STATUS: New member")
            print("You are NOT a regular customer yet.")
            print(f"Orders needed: {self.threshold - self.orders_completed}")
            print("")
            print("Keep shopping to unlock rewards.")
        else:
            print("STATUS: Regular Customer [UNLOCKED]")

# ── Execute Status Check ────────────────────────────────

if __name__ == "__main__":
    customer = CustomerStatus()

    eligible = customer.check_eligibility()

    if not eligible:
        print("# Regular customer perks are NOT yet unlocked.")
        print("# Complete more orders to earn your status.")
        print("")
        print("rewards = customer.get_future_rewards()")
        print("for perk in rewards:")
        print('    print(f"  >> {perk}")')
    else:
        print("Congratulations. Perks unlocked.")

    # The more you shop, the closer you get.
    print("— Card Vault Admin")`;

  return {
    id: `gift-${Date.now()}`,
    subject: 'Earn Regular Customer Status',
    body,
    timestamp: new Date().toLocaleString(),
    read: false,
    icon: 'gift',
  };
}

function renderPythonCode(code: string) {
  const lines = code.split('\n');
  return lines.map((line, i) => {
    const tokens: { text: string; color: string }[] = [];
    let remaining = line;

    while (remaining.length > 0) {
      let matched = false;

      // Comments (# ...)
      if (remaining.startsWith('#')) {
        tokens.push({ text: remaining, color: 'text-gray-500' });
        remaining = '';
        matched = true;
      }
      // Triple quotes docstrings
      else if (remaining.startsWith('"""') || remaining.startsWith("'''")) {
        const quote = remaining.slice(0, 3);
        const endIdx = remaining.indexOf(quote, 3);
        if (endIdx !== -1) {
          tokens.push({ text: remaining.slice(0, endIdx + 3), color: 'text-[#6A9955]' });
          remaining = remaining.slice(endIdx + 3);
        } else {
          tokens.push({ text: remaining, color: 'text-[#6A9955]' });
          remaining = '';
        }
        matched = true;
      }
      // Strings (f-strings, regular strings)
      else if (remaining.startsWith('f"') || remaining.startsWith("f'")) {
        const quote = remaining[1];
        let endIdx = 2;
        while (endIdx < remaining.length && remaining[endIdx] !== quote) {
          if (remaining[endIdx] === '\\') endIdx++;
          endIdx++;
        }
        endIdx++;
        tokens.push({ text: remaining.slice(0, endIdx), color: 'text-[#CE9178]' });
        remaining = remaining.slice(endIdx);
        matched = true;
      }
      else if (remaining.startsWith('"') || remaining.startsWith("'")) {
        const quote = remaining[0];
        let endIdx = 1;
        while (endIdx < remaining.length && remaining[endIdx] !== quote) {
          if (remaining[endIdx] === '\\') endIdx++;
          endIdx++;
        }
        endIdx++;
        tokens.push({ text: remaining.slice(0, endIdx), color: 'text-[#CE9178]' });
        remaining = remaining.slice(endIdx);
        matched = true;
      }
      // Keywords
      else {
        const kwMatch = remaining.match(/^(import|from|class|def|if|else|elif|return|for|in|not|and|or|True|False|None|print|self|with|as|try|except|raise|pass|break|continue|while|yield|lambda|is|assert|del|global|nonlocal)\b/);
        if (kwMatch) {
          tokens.push({ text: kwMatch[0], color: 'text-[#569CD6]' });
          remaining = remaining.slice(kwMatch[0].length);
          matched = true;
        }
      }
      // Built-in functions
      if (!matched) {
        const builtinMatch = remaining.match(/^(range|len|str|int|float|list|dict|set|tuple|type|isinstance|hasattr|getattr|setattr|super|property|staticmethod|classmethod|enumerate|zip|map|filter|sorted|reversed|open|input|abs|min|max|sum|any|all|round|format)\b/);
        if (builtinMatch) {
          tokens.push({ text: builtinMatch[0], color: 'text-[#DCDCAA]' });
          remaining = remaining.slice(builtinMatch[0].length);
          matched = true;
        }
      }
      // Numbers
      if (!matched) {
        const numMatch = remaining.match(/^\d+(\.\d+)?/);
        if (numMatch) {
          tokens.push({ text: numMatch[0], color: 'text-[#B5CEA8]' });
          remaining = remaining.slice(numMatch[0].length);
          matched = true;
        }
      }
      // Decorators
      if (!matched && remaining.startsWith('@')) {
        const decMatch = remaining.match(/^@\w+/);
        if (decMatch) {
          tokens.push({ text: decMatch[0], color: 'text-[#DCDCAA]' });
          remaining = remaining.slice(decMatch[0].length);
          matched = true;
        }
      }
      // Class/function names after def/class
      if (!matched) {
        const nameMatch = remaining.match(/^[A-Z]\w*/);
        if (nameMatch) {
          tokens.push({ text: nameMatch[0], color: 'text-[#4EC9B0]' });
          remaining = remaining.slice(nameMatch[0].length);
          matched = true;
        }
      }
      // Operators and special chars
      if (!matched && /^[=<>!+\-*/%&|^~:,.()\[\]{}]/.test(remaining)) {
        tokens.push({ text: remaining[0], color: 'text-[#D4D4D4]' });
        remaining = remaining.slice(1);
        matched = true;
      }
      // Regular identifiers/variables
      if (!matched) {
        const idMatch = remaining.match(/^\w+/);
        if (idMatch) {
          tokens.push({ text: idMatch[0], color: 'text-[#9CDCFE]' });
          remaining = remaining.slice(idMatch[0].length);
        } else {
          tokens.push({ text: remaining[0], color: 'text-[#D4D4D4]' });
          remaining = remaining.slice(1);
        }
      }
    }

    return (
      <div key={i} className="flex">
        <span className="w-8 text-right pr-3 text-[#858585] select-none flex-shrink-0">{i + 1}</span>
        <span>
          {tokens.map((t, j) => (
            <span key={j} className={t.color}>{t.text}</span>
          ))}
        </span>
      </div>
    );
  });
}

const iconMap = {
  welcome: <Shield className="w-5 h-5" />,
  gift: <Gift className="w-5 h-5" />,
  vip: <Star className="w-5 h-5" />,
  security: <Zap className="w-5 h-5" />,
};

const iconColorMap = {
  welcome: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  gift: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  vip: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  security: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
};

export function Messages() {
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(null);
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);

  const unreadCount = messages.filter(m => !m.read).length;

  useEffect(() => {
    const stored = localStorage.getItem('card-vault-inbox');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const hasOldContent = parsed.some((m: InboxMessage) =>
          m.subject?.includes('Random Drop') || m.subject?.includes('Regular Customer Status Unlocked') || m.subject?.includes('Path to Regular Customer')
        );
        if (hasOldContent) {
          localStorage.removeItem('card-vault-inbox');
          initInbox();
        } else {
          setMessages(parsed);
        }
      } catch {
        initInbox();
      }
    } else {
      initInbox();
    }
  }, []);

  const initInbox = () => {
    const username = generateUsername();
    const welcome = generateWelcomeMessage(username);
    const loyalty = generateLoyaltyMessage();
    const initialMessages = [welcome, loyalty];
    setMessages(initialMessages);
    localStorage.setItem('card-vault-inbox', JSON.stringify(initialMessages));
  };

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('card-vault-inbox', JSON.stringify(messages));
    }
  }, [messages]);

  const markAsRead = (id: string) => {
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const handleSelectMessage = (msg: InboxMessage) => {
    markAsRead(msg.id);
    setSelectedMessage(msg);
  };

  const clearAll = () => {
    setMessages([]);
    localStorage.removeItem('card-vault-inbox');
    setSelectedMessage(null);
  };

  return (
    <div className="min-h-screen text-green-500 font-mono relative" style={{ background: '#1e1e1e' }}>
      {/* Background effects */}
      <div className="fixed inset-0 scanline pointer-events-none z-[5]" />
      <div className="fixed inset-0 bg-green-500/[0.02] animate-flicker pointer-events-none z-[5]" />

      <div className="relative z-10 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <a href="#home" className="inline-block mb-8">
            <Button variant="outline" className="border-[#3c3c3c] text-[#cccccc] hover:bg-[#2a2a2a] hover:text-white hover:border-[#569CD6] transition-all">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </a>

          {/* VS Code style editor window */}
          <div className="rounded-lg overflow-hidden border border-[#3c3c3c] shadow-2xl">
            {/* Title bar */}
            <div className="bg-[#323233] px-4 py-2 flex items-center gap-3 border-b border-[#3c3c3c]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <Terminal className="w-4 h-4 text-[#888]" />
                <span className="text-[#cccccc] text-xs font-mono">
                  cardvault — mailbox.py
                </span>
              </div>
              <div className="ml-auto flex items-center gap-3">
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-[#264f78] border border-[#3c3c3c] text-[#cccccc] text-[10px] font-mono rounded">
                    {unreadCount} new
                  </span>
                )}
                {messages.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-[10px] text-[#858585] hover:text-[#f44747] font-mono transition-colors"
                  >
                    clear
                  </button>
                )}
              </div>
            </div>

            {/* Tab bar */}
            <div className="bg-[#252526] border-b border-[#3c3c3c] flex">
              <div className="px-4 py-1.5 text-[11px] font-mono text-[#cccccc] border-b-2 border-[#569CD6] flex items-center gap-2">
                <Mail className="w-3 h-3 text-[#cccccc]" />
                mailbox.py
                <span className="text-[#858585]">{unreadCount > 0 ? `(${unreadCount} unread)` : '(read)'}</span>
              </div>
            </div>

            {/* Editor body */}
            <div className="p-0" style={{ background: '#1e1e1e' }}>
              {selectedMessage ? (
                /* Message Detail View — Python code style */
                <div className="animate-slide-in-down">
                  {/* File path breadcrumb */}
                  <div className="px-4 py-2 bg-[#252526] border-b border-[#3c3c3c] flex items-center gap-2">
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="text-[10px] text-[#858585] hover:text-[#cccccc] font-mono flex items-center gap-1 transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 rotate-180" />
                      inbox
                    </button>
                    <span className="text-[#858585] text-[10px]">/</span>
                    <span className="text-[#cccccc] text-[10px] flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${selectedMessage.icon === 'gift' ? 'bg-[#C586C0]' : 'bg-[#569CD6]'}`} />
                      {selectedMessage.subject}
                    </span>
                  </div>

                  {/* Message header as Python class definition */}
                  <div className="px-4 py-3 border-b border-[#3c3c3c] flex items-center gap-4" style={{ background: '#1e1e1e' }}>
                    <div className={`w-10 h-10 rounded border flex items-center justify-center flex-shrink-0 ${iconColorMap[selectedMessage.icon]}`}>
                      {iconMap[selectedMessage.icon]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[#569CD6] text-xs font-mono">class</span>
                        <span className="text-[#4EC9B0] text-xs font-mono font-bold">{selectedMessage.subject.replace(/[^a-zA-Z0-9_]/g, '_')}</span>
                        <span className="text-[#D4D4D4] text-xs font-mono">:</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-[#6A9955] text-[10px] font-mono flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          # from: admin@cardvault.anon
                        </span>
                        <span className="text-[#6A9955] text-[10px] font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          # {selectedMessage.timestamp}
                        </span>
                        <span className="text-[#6A9955] text-[10px] font-mono flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          # PGP Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Python code body */}
                  <div className="overflow-x-auto" style={{ background: '#1e1e1e' }}>
                    <div className="py-3 font-mono text-[12px] leading-[1.6]">
                      {renderPythonCode(selectedMessage.body)}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 bg-[#252526] border-t border-[#3c3c3c] flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[#858585] font-mono text-[10px]">
                      <span>Ln {selectedMessage.body.split('\n').length}, Col 1</span>
                      <span>Spaces: 4</span>
                      <span>UTF-8</span>
                      <span>Python</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#858585] font-mono text-[10px]">
                      <Shield className="w-3 h-3" />
                      <span>PGP Encrypted</span>
                      <span className="text-[#3c3c3c]">|</span>
                      <span>E2E Secured</span>
                      {selectedMessage.icon === 'gift' && (
                        <>
                          <span className="text-[#3c3c3c]">|</span>
                          <span className="flex items-center gap-1 text-[#C586C0]">
                            <Sparkles className="w-3 h-3" />
                            Loyalty
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Message List View */
                <div style={{ background: '#1e1e1e' }}>
                  {/* Python script header */}
                  <div className="px-4 py-2 font-mono text-[11px] leading-[1.6]" style={{ background: '#1e1e1e' }}>
                    <div className="text-[#569CD6]">import <span className="text-[#DCDCAA]">os</span>, <span className="text-[#DCDCAA]">sys</span></div>
                    <div className="text-[#569CD6]">from <span className="text-[#DCDCAA]">cardvault</span> <span className="text-[#569CD6]">import</span> <span className="text-[#DCDCAA]">Inbox</span></div>
                    <div>&nbsp;</div>
                    <div className="text-[#569CD6]">def <span className="text-[#DCDCAA]">list_messages</span><span className="text-[#D4D4D4]">():</span></div>
                    <div className="text-[#6A9955] pl-8">"""Return all messages from inbox."""</div>
                    <div className="pl-8 text-[#D4D4D4]">
                      <span className="text-[#569CD6]">return</span> Inbox.<span className="text-[#DCDCAA]">fetch_all</span><span className="text-[#D4D4D4]">()</span>
                    </div>
                    <div>&nbsp;</div>
                    <div>
                      <span className="text-[#D4D4D4]">messages = </span>
                      <span className="text-[#DCDCAA]">list_messages</span><span className="text-[#D4D4D4]">()</span>
                      <span className="text-[#6A9955]">  # {messages.length} total</span>
                    </div>
                    <div>
                      <span className="text-[#569CD6]">for</span>
                      <span className="text-[#D4D4D4]"> msg </span>
                      <span className="text-[#569CD6]">in</span>
                      <span className="text-[#D4D4D4]"> messages:</span>
                    </div>
                  </div>

                  <div className="h-px bg-[#3c3c3c] mx-4 my-2" />

                  {messages.length === 0 ? (
                    <div className="py-12 px-4 text-center">
                      <div className="w-12 h-12 rounded bg-[#252526] border border-[#3c3c3c] flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-6 h-6 text-[#858585]" />
                      </div>
                      <p className="text-[#858585] font-mono text-sm">
                        <span className="text-[#569CD6]">return</span> <span className="text-[#569CD6]">None</span>
                      </p>
                      <p className="text-[#6A9955] font-mono text-xs mt-2"># No messages in inbox</p>
                    </div>
                  ) : (
                    <div className="py-1">
                      {messages.map((msg) => (
                        <button
                          key={msg.id}
                          onClick={() => handleSelectMessage(msg)}
                          onMouseEnter={() => setHoveredMessage(msg.id)}
                          onMouseLeave={() => setHoveredMessage(null)}
                          className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-all duration-150 group ${
                            hoveredMessage === msg.id
                              ? 'bg-[#2a2d2e]'
                              : ''
                          }`}
                        >
                          {/* Line number */}
                          <span className="w-8 text-right text-[#858585] text-[11px] font-mono flex-shrink-0 select-none">
                            {/*msg.id.slice(-2)*/}
                          </span>

                          {/* Unread indicator */}
                          <div className="flex-shrink-0">
                            {!msg.read ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#C586C0] shadow-lg shadow-[#C586C0]/30 animate-pulse" />
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-full border border-[#3c3c3c]" />
                            )}
                          </div>

                          {/* Icon */}
                          <div className={`w-7 h-7 rounded border flex items-center justify-center flex-shrink-0 text-[11px] ${
                            hoveredMessage === msg.id
                              ? iconColorMap[msg.icon]
                              : 'text-[#858585] border-[#3c3c3c] bg-[#252526]'
                          }`}>
                            {iconMap[msg.icon]}
                          </div>

                          {/* Content — styled as Python code */}
                          <div className="flex-1 min-w-0 font-mono text-[12px]">
                            <div className="flex items-center gap-2">
                              <span className="text-[#569CD6]">print</span>
                              <span className="text-[#D4D4D4]">(</span>
                              <span className={`${!msg.read ? 'text-[#CE9178]' : 'text-[#6A9955]'}`}>
                                "{!msg.read ? '>>> ' : ''}{msg.subject}"
                              </span>
                              <span className="text-[#D4D4D4]">)</span>
                              {!msg.read && (
                                <span className="text-[#C586C0] text-[10px] font-bold ml-1">NEW</span>
                              )}
                            </div>
                            <div className="text-[#858585] text-[10px] truncate mt-0.5 pl-0">
                              <span className="text-[#6A9955]"># </span>
                              {msg.body.split('\n').find(line => line.trim().length > 0 && !line.trim().startsWith('#')) || msg.body.split('\n')[0]}
                            </div>
                          </div>

                          {/* Timestamp */}
                          <span className="text-[#858585] font-mono text-[10px] flex-shrink-0 hidden sm:block">
                            {msg.timestamp}
                          </span>

                          {/* Arrow */}
                          <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${
                            hoveredMessage === msg.id
                              ? 'text-[#cccccc] translate-x-0.5'
                              : 'text-[#3c3c3c]'
                          }`} />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Terminal footer */}
                  <div className="px-4 py-2 bg-[#007acc] flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white text-[10px] font-mono">
                      <span>master</span>
                      <span>0 problems</span>
                    </div>
                    <div className="flex items-center gap-3 text-white text-[10px] font-mono">
                      <span>Ln 1</span>
                      <span>UTF-8</span>
                      <span>Python</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[#858585] font-mono text-[10px]">
            <Lock className="w-3 h-3" />
            <span>All messages are encrypted end-to-end</span>
            <span>·</span>
            <span>cardvault://secure/inbox</span>
          </div>
        </div>
      </div>
    </div>
  );
}
