import { useState, useEffect } from 'react';
import { Terminal, Shield, CheckCircle, Loader2 } from 'lucide-react';

const HACKER_NAMES = [
  'Phantom', 'Shadow', 'Cipher', 'Ghost', 'Nova', 'Viper', 'Raven', 'Apex',
  'Nexus', 'Pulse', 'Stealth', 'Cryptic', 'Void', 'Onyx', 'Blaze', 'Frost',
  'Havoc', 'Omega', 'Sigma', 'Delta', 'Proxy', 'Vector', 'Binary', 'Daemon',
  'Echo', 'Flux', 'Glitch', 'Hex', 'Ion', 'Jinx', 'Kernel', 'Lynx',
  'Matrix', 'Node', 'Orbit', 'Pixel', 'Quantum', 'Root', 'Syntax', 'Torch'
];

const TERMINAL_COMMANDS = [
  { cmd: '$ init --anon-mode --force', out: '[OK] Anonymous mode enabled', type: 'success', delay: 150 },
  { cmd: '$ tor-circuit --rotate --nodes 3', out: '[OK] Tor circuit rotated via 3 nodes', type: 'success', delay: 300 },
  { cmd: '$ iptables --flush && iptables -P OUTPUT DROP', out: '[SECURE] Firewall locked down', type: 'warn', delay: 450 },
  { cmd: '$ macchanger -r eth0', out: '[OK] MAC address spoofed: 00:1B:44:11:3A:B7', type: 'success', delay: 600 },
  { cmd: '$ openssl rand -hex 64 > /dev/session.key', out: '[KEYGEN] 512-bit session key generated', type: 'info', delay: 750 },
  { cmd: '$ gpg --batch --gen-key /dev/stdin <<< %no-protection', out: '[KEYGEN] PGP keypair created (4096-bit RSA)', type: 'info', delay: 900 },
  { cmd: '$ ssh-keygen -t ed25519 -f ~/.ssh/anon -N ""', out: '[SSH] Ed25519 keypair generated', type: 'success', delay: 1050 },
  { cmd: '$ curl -s --socks5 127.0.0.1:9050 https://api.ipify.org', out: '[VALID] IP masked: 45.88.212.17 (Exit Node: DE)', type: 'success', delay: 1200 },
  { cmd: '$ proxychains nmap -sT -sV --top-ports 1000 target', out: '[SCAN] 1000 ports scanned - 0 open, firewall detected', type: 'warn', delay: 1400 },
  { cmd: '$ john --wordlist=/usr/share/wordlists/rockyou.txt --session=cardvault', out: '[CRACK] Password hash cracking session initialized', type: 'info', delay: 1600 },
  { cmd: '$ hydra -l admin -P /usr/share/wordlists/common.txt ssh://target', out: '[BRUTE] SSH brute-force attack running...', type: 'warn', delay: 1800 },
  { cmd: '$ msfconsole -x "use exploit/multi/handler; set PAYLOAD windows/meterpreter/reverse_tcp; run"', out: '[METASPLOIT] Multi/handler started - listening on 4444', type: 'danger', delay: 2000 },
  { cmd: '$ whoami && id && uname -a', out: '[INFO] User: root | UID: 0 | Linux 5.15.0-kali7-amd64', type: 'success', delay: 2200 },
  { cmd: '$ finalize --anon-session --persist', out: '[SUCCESS] Anonymous environment fully initialized', type: 'success', delay: 2400 },
  { cmd: '$ access --grant --level=root --ttl=infinite', out: '[ACCESS GRANTED] Welcome to Card Vault', type: 'success', delay: 2600 },
];

export function SignUp() {
  const [step, setStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [generatedUsername, setGeneratedUsername] = useState('');

  useEffect(() => {
    // Generate random email instantly
    const randomId = Math.random().toString(36).substring(2, 15);
    const email = `user_${randomId}@cardvault.anon`;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGeneratedEmail(email);

    // Generate random hacker username instantly
    const name = HACKER_NAMES[Math.floor(Math.random() * HACKER_NAMES.length)];
    const suffix = Math.floor(Math.random() * 9999);
    const username = `${name}${suffix}`;
    setGeneratedUsername(username);
    localStorage.setItem('card-vault-username', username);

    // Glitch effect flashes
    const glitchInterval = setInterval(() => setGlitch((g) => !g), 150);
    setTimeout(() => clearInterval(glitchInterval), 3000);

    // Auto-progress through terminal commands rapidly
    TERMINAL_COMMANDS.forEach((cmd, index) => {
      setTimeout(() => {
        setStep(index + 1);
      }, cmd.delay);
    });

    // Complete and redirect (fast - ~3 seconds total)
    setTimeout(() => {
      setIsComplete(true);
      localStorage.setItem('card-vault-terms-accepted', 'true');
      setTimeout(() => {
        window.location.href = window.location.origin;
      }, 1000);
    }, 2800);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      {/* Background matrix hints */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)" }} />

      <div className="relative z-10 max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Shield className="w-7 h-7 text-[#00ff00] animate-pulse" />
            <h1 className="text-3xl font-mono text-[#00ff00] tracking-widest uppercase">
              ANONYMOUS<br />
              <span className="text-[#ff00ff]">ACCESS PROTOCOL</span>
            </h1>
          </div>
          <p className="text-[#00ff00]/70 font-mono text-sm tracking-wider">
            ESTABLISHING SECURE UNDERGROUND SESSION...
          </p>
        </div>

        {/* Generated Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-[#0a0a0a] border border-[#00ff00]/30 p-3 rounded shadow-[0_0_15px_rgba(0,255,0,0.15)]">
            <div className="text-[#ff00ff] font-mono text-[10px] uppercase mb-1 tracking-widest">anon email</div>
            <div className="text-[#00ff00] font-mono text-sm font-bold break-all">{generatedEmail || 'user_....@cardvault.anon'}</div>
          </div>
          <div className="bg-[#0a0a0a] border border-[#ff00ff]/30 p-3 rounded shadow-[0_0_15px_rgba(255,0,255,0.15)]">
            <div className="text-[#ff00ff] font-mono text-[10px] uppercase mb-1 tracking-widest">handle</div>
            <div className="text-[#00ff00] font-mono text-sm font-bold">{generatedUsername || 'hacker....'}</div>
          </div>
        </div>

        {/* Hacker Terminal */}
        <div className="bg-[#050505] border-2 border-[#00ff00]/50 rounded-lg p-4 shadow-[0_0_40px_rgba(0,255,0,0.25)] relative overflow-hidden">
          {/* Terminal glow border */}
          <div className="absolute inset-0 border-2 border-transparent rounded-lg" />

          <div className="flex items-center gap-2 mb-3 text-[#00ff00]">
            <Terminal className="w-4 h-4" />
            <span className="font-mono text-xs tracking-widest uppercase">root@cardvault:~#</span>
            <span className="ml-auto text-[#ff00ff] text-[10px]">SESSION: ACTIVE</span>
          </div>

          <div className="space-y-1.5 font-mono text-xs leading-tight">
            {TERMINAL_COMMANDS.slice(0, step).map((cmd, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-[#00ff00]/60">$</span>
                <span className={`font-mono ${cmd.type === 'danger' ? 'text-[#ff0000]' : cmd.type === 'warn' ? 'text-[#ffff00]' : cmd.type === 'info' ? 'text-[#00ffff]' : cmd.type === 'success' ? 'text-[#00ff00]' : 'text-[#00ff00]/80'}`}>
                  {cmd.cmd}
                </span>
                {cmd.out && (
                  <span className={`ml-2 font-mono ${cmd.type === 'danger' ? 'text-[#ff0000]' : cmd.type === 'warn' ? 'text-[#ffff00]' : cmd.type === 'info' ? 'text-[#00ffff]' : cmd.type === 'success' ? 'text-[#00ff00]' : 'text-[#00ff00]/60'}`}>
                    {cmd.out}
                  </span>
                )}
                {index === step - 1 && !isComplete && (
                  <Loader2 className="w-3 h-3 animate-spin text-[#00ff00]" />
                )}
                {index < step - 1 && (
                  <CheckCircle className="w-3 h-3 text-[#00ff00]" />
                )}
              </div>
            ))}
            {isComplete && (
              <div className="flex items-center gap-2 bg-[#00ff00]/10 border border-[#00ff00]/30 p-2 rounded">
                <CheckCircle className="w-4 h-4 text-[#00ff00]" />
                <span className="text-[#00ff00] font-mono text-xs font-bold">ACCESS GRANTED - SESSION ESTABLISHED</span>
              </div>
            )}
          </div>
        </div>

        {/* Status indicators */}
        <div className="mt-5 flex items-center justify-between text-[#00ff00] font-mono text-[10px] tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse" />
            <span>TOR ROUTING ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span>ENCRYPTION: AES-256</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <span>IP: MASKED</span>
          </div>
        </div>

        {/* Glitch overlay */}
        {glitch && (
          <div className="absolute inset-0 bg-[#00ff00]/10 pointer-events-none" />
        )}
      </div>
    </div>
  );
}
