import { useState, useEffect } from 'react';
import { Terminal, Shield, CheckCircle, Loader2 } from 'lucide-react';

const HACKER_NAMES = [
  'Phantom', 'Shadow', 'Cipher', 'Ghost', 'Nova', 'Viper', 'Raven', 'Apex',
  'Nexus', 'Pulse', 'Stealth', 'Cryptic', 'Void', 'Onyx', 'Blaze', 'Frost',
  'Havoc', 'Omega', 'Sigma', 'Delta', 'Proxy', 'Vector', 'Binary', 'Daemon',
  'Echo', 'Flux', 'Glitch', 'Hex', 'Ion', 'Jinx', 'Kernel', 'Lynx',
  'Matrix', 'Node', 'Orbit', 'Pixel', 'Quantum', 'Root', 'Syntax', 'Torch'
];

export function SignUp() {
  const [step, setStep] = useState(0);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [generatedUsername, setGeneratedUsername] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const terminalLines = [
    { text: '$ systemctl start cardvault-anon.service', delay: 800 },
    { text: '[INFO] Loading anonymous access module...', delay: 1200 },
    { text: '$ openssl rand -hex 32 > /tmp/session.key', delay: 1800 },
    { text: '[OK] Generated 256-bit session encryption key', delay: 2200 },
    { text: '$ tor --controlport 9051 --cookieauthentication 0', delay: 2800 },
    { text: '[INFO] Establishing Tor circuit through 3 nodes...', delay: 3500 },
    { text: '$ curl -s --socks5-hostname 127.0.0.1:9050 ifconfig.me', delay: 4200 },
    { text: '[VALID] IP anonymization confirmed: 185.220.101.1', delay: 4800 },
    { text: '$ iptables -A OUTPUT -j DROP && iptables -A OUTPUT -d 127.0.0.1 -j ACCEPT', delay: 5500 },
    { text: '[SECURE] Firewall rules applied - blocking all outbound traffic', delay: 6100 },
    { text: '$ gpg --gen-key --batch /etc/cardvault/gpg.conf', delay: 6800 },
    { text: '[KEYGEN] Creating PGP keypair for secure communications', delay: 7500 },
    { text: '$ ssh-keygen -t ed25519 -f ~/.ssh/cardvault_id -N ""', delay: 8200 },
    { text: '[SSH] Generated Ed25519 keypair for secure access', delay: 8800 },
    { text: '$ journalctl -f -u cardvault-anon.service | grep -E "(SUCCESS|COMPLETE)"', delay: 9500 },
    { text: '[SUCCESS] Anonymous environment fully initialized', delay: 10200 },
    { text: 'Access granted. Welcome to Card Vault.', delay: 10800 },
  ];

  useEffect(() => {
    // Generate a random email
    const randomId = Math.random().toString(36).substring(2, 15);
    const email = `user_${randomId}@cardvault.anon`;
    setGeneratedEmail(email);

    // Generate a random hacker username
    const name = HACKER_NAMES[Math.floor(Math.random() * HACKER_NAMES.length)];
    const suffix = Math.floor(Math.random() * 999);
    const username = `${name}${suffix}`;
    setGeneratedUsername(username);
    localStorage.setItem('card-vault-username', username);

    // Auto-progress through terminal lines
    terminalLines.forEach((line, index) => {
      setTimeout(() => {
        setStep(index + 1);
      }, line.delay);
    });

    // Complete the process and redirect (total ~11 seconds for all commands + 2 seconds delay)
    setTimeout(() => {
      setIsComplete(true);
      // Accept terms automatically after successful sign-up
      localStorage.setItem('card-vault-terms-accepted', 'true');
      setTimeout(() => {
        window.location.href = window.location.origin;
      }, 2000);
    }, 13000);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-[#4ec9b0]" />
            <h1 className="text-3xl font-mono text-[#569cd6]">Anonymous Access Setup</h1>
          </div>
          <p className="text-[#9cdcfe] font-mono">
            Creating secure anonymous environment for your session
          </p>
        </div>

        {/* Generated Email Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#161b22] border border-[#30363d] p-4">
            <div className="text-[#9cdcfe] font-mono text-sm mb-2">
              Generated Anonymous Email:
            </div>
            <div className="text-[#ce9178] font-mono text-lg font-bold">
              {generatedEmail || 'Generating...'}
            </div>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] p-4">
            <div className="text-[#9cdcfe] font-mono text-sm mb-2">
              Assigned Username:
            </div>
            <div className="text-[#4ec9b0] font-mono text-lg font-bold">
              {generatedUsername || 'Generating...'}
            </div>
          </div>
        </div>

        {/* Terminal Interface */}
        <div className="bg-[#1e1e1e] border border-[#3e3e42] p-6 font-mono">
          <div className="flex items-center gap-2 mb-4 text-[#9cdcfe]">
            <Terminal className="w-5 h-5" />
            <span>Terminal Session</span>
          </div>

          <div className="space-y-2 text-[#d4d4d4]">
            {terminalLines.slice(0, step).map((line, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-[#569cd6]">$</span>
                <span className={line.text.includes('[INFO]') ? 'text-[#4ec9b0]' :
                               line.text.includes('[OK]') ? 'text-[#4ec9b0]' :
                               line.text.includes('[VALID]') ? 'text-[#4ec9b0]' :
                               line.text.includes('[SECURE]') ? 'text-[#b5cea8]' :
                               line.text.includes('[KEYGEN]') ? 'text-[#b5cea8]' :
                               line.text.includes('[SSH]') ? 'text-[#b5cea8]' :
                               line.text.includes('[SUCCESS]') ? 'text-[#4ec9b0]' :
                               line.text.includes('systemctl') || line.text.includes('openssl') || line.text.includes('tor') || line.text.includes('curl') || line.text.includes('iptables') || line.text.includes('gpg') || line.text.includes('ssh-keygen') || line.text.includes('journalctl') ? 'text-[#ce9178]' :
                               'text-[#d4d4d4]'}>
                  {line.text}
                </span>
                {index === step - 1 && !isComplete && (
                  <Loader2 className="w-4 h-4 animate-spin text-[#4ec9b0]" />
                )}
                {index < step - 1 && (
                  <CheckCircle className="w-4 h-4 text-[#4ec9b0]" />
                )}
              </div>
            ))}
          </div>

          {isComplete && (
            <div className="mt-6 pt-4 border-t border-[#3e3e42]">
              <div className="flex items-center gap-2 text-[#4ec9b0] mb-2">
                <CheckCircle className="w-5 h-5" />
                <span>Setup Complete!</span>
              </div>
              <p className="text-[#9cdcfe] font-mono text-sm">
                Your anonymous session has been established. Redirecting to main site...
              </p>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 border border-[#30363d] bg-[#161b22]">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#4ec9b0] mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-[#569cd6] font-mono text-sm font-semibold mb-1">
                Security Features Activated
              </h3>
              <ul className="text-[#9cdcfe] font-mono text-xs space-y-1">
                <li>• IP address anonymization active</li>
                <li>• Encrypted communication channels established</li>
                <li>• Session fingerprinting disabled</li>
                <li>• Anonymous email generated for communications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}