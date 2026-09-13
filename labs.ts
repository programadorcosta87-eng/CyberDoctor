export type LabType = 'bruteforce' | 'hashcat' | 'portscan' | 'exploit' | 'osint' | 'sqlinjection' | 'directory_bruteforce' | 'privilege_escalation' | 'active_directory' | 'steganography' | 'free_attack';

export interface DynamicLab {
  id: string;
  type: LabType;
  title: string;
  desc: string;
  command: string;
  altCommand?: string;
  points: number;
  targetUser?: string;
  targetPassword?: string;
  targetSystem: string;
}

const SYSTEMS = ['Servidor SSH', 'Portal Corporativo', 'Banco de Dados SQL', 'Servidor FTP', 'Painel Admin Web', 'Roteador Core', 'Servidor de E-mail (SMTP)', 'VPN Gateway'];
const NAMES = ['Carlos Silva', 'Ana Beatriz', 'John Doe', 'Sarah Connor', 'Marcus Root', 'Elena K.', 'Thiago M.', 'Fernanda P.', 'Alex Mercer', 'Diana Prince'];
const ROLES = ['DBA', 'System Administrator', 'DevOps Engineer', 'CTO', 'Diretor Financeiro', 'RH', 'Engenheiro de Software', 'Suporte TI'];

const generateRandomPassword = () => {
  const bases = ['cyber', 'admin', 'root', 'qwerty', 'dragon', 'matrix', 'hacker', 'ninja', 'senha', 'password', 'batman', 'shadow'];
  const numbers = Math.floor(100 + Math.random() * 9000);
  const specials = ['!', '@', '#', '$', '*', '&'];
  return `${bases[Math.floor(Math.random() * bases.length)]}${numbers}${specials[Math.floor(Math.random() * specials.length)]}`;
};

export const generateFakeProfile = (username: string) => {
  const files = [
    'passwords_2024.txt', 'relatorio_financeiro_Q3.pdf', 'backup_db_prod.sql', 
    'fotos_confidenciais.zip', 'chaves_ssh.pem', 'clientes_db.csv', 
    'codigo_fonte_v2.tar.gz', 'planilha_salarios.xlsx', 'config_firewall.bak'
  ];
  return {
    name: NAMES[Math.floor(Math.random() * NAMES.length)],
    username: username,
    role: ROLES[Math.floor(Math.random() * ROLES.length)],
    lastLogin: new Date(Date.now() - Math.random() * 10000000000).toLocaleString(),
    ip: `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
    confidentialFiles: files.sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 3)),
    cardNumber: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`
  };
};

export const generateAllLabs = (): DynamicLab[] => {
  const labs: DynamicLab[] = [];
  const allTypes: LabType[] = ['free_attack', 'bruteforce', 'hashcat', 'portscan', 'exploit', 'osint', 'sqlinjection', 'directory_bruteforce', 'privilege_escalation', 'active_directory', 'steganography'];
  
  for(const type of allTypes) {
    const ip = `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
    const system = SYSTEMS[Math.floor(Math.random() * SYSTEMS.length)] + ` (${ip})`;
    const pass = generateRandomPassword();
    
    let lab: DynamicLab;
    
    switch (type) {
      
      case 'free_attack':
        lab = {
          id: Math.random().toString(), type,
          title: `Terminal de Ataque Livre`,
          desc: `Modo Sandbox: Digite qualquer comando de ataque (ex: nmap, hydra, sqlmap) para simular. O sistema criará resultados dinâmicos.`,
          command: `[Comando Livre]`,
          points: 100 + Math.floor(Math.random() * 50),
          targetUser: 'admin', targetPassword: pass, targetSystem: 'Alvo Dinâmico'
        };
        break;
      case 'bruteforce':
        const users = ['admin', 'root', 'sysadmin', 'oracle'];
        const u = users[Math.floor(Math.random() * users.length)];
        lab = {
          id: Math.random().toString(), type,
          title: `Ataque de Dicionário em ${ip}`,
          desc: `Use o Hydra para tentar descobrir a senha do serviço.`,
          command: `hydra -l ${u} -P pass.txt ssh://${ip}`,
          points: 150 + Math.floor(Math.random() * 100),
          targetUser: u, targetPassword: pass, targetSystem: system
        };
        break;
      case 'hashcat':
        lab = {
          id: Math.random().toString(), type,
          title: `Força Bruta de Hash (MD5)`,
          desc: `Um hash foi interceptado. Use Hashcat para quebrá-lo.`,
          command: `hashcat -m 0 hash.txt rockyou.txt`,
          points: 200 + Math.floor(Math.random() * 100),
          targetUser: 'hash_victim', targetPassword: pass, targetSystem: 'Portal Corporativo Interno'
        };
        break;
      case 'portscan':
        lab = {
          id: Math.random().toString(), type,
          title: `Mapeamento de Rede (${ip})`,
          desc: `Encontre portas abertas e serviços ocultos usando Nmap.`,
          command: `nmap -sV -p- ${ip}`,
          points: 100 + Math.floor(Math.random() * 50),
          targetUser: 'backdoor', targetPassword: pass, targetSystem: system
        };
        break;
      case 'exploit':
        lab = {
          id: Math.random().toString(), type,
          title: `Exploração de Vulnerabilidade`,
          desc: `O alvo tem uma versão desatualizada. Use o Searchsploit.`,
          command: `searchsploit vsftpd 2.3.4`,
          points: 300 + Math.floor(Math.random() * 150),
          targetUser: 'root', targetPassword: pass, targetSystem: 'Servidor FTP Antigo'
        };
        break;
      
      case 'sqlinjection':
        lab = {
          id: Math.random().toString(), type,
          title: `Injeção SQL em ${ip}`,
          desc: `O portal corporativo parece vulnerável. Use o SQLmap para obter acesso.`,
          command: `sqlmap -u "http://${ip}/login.php?id=1" --dbs`,
          points: 350 + Math.floor(Math.random() * 100),
          targetUser: 'dba_admin', targetPassword: pass, targetSystem: 'Banco de Dados SQL (Root)'
        };
        break;
      case 'directory_bruteforce':
        lab = {
          id: Math.random().toString(), type,
          title: `Varredura de Diretórios (${ip})`,
          desc: `Encontre painéis administrativos ocultos com o Gobuster.`,
          command: `gobuster dir -u http://${ip} -w common.txt`,
          points: 180 + Math.floor(Math.random() * 100),
          targetUser: 'web_master', targetPassword: pass, targetSystem: 'Painel Admin Web (Oculto)'
        };
        break;
      
      case 'privilege_escalation':
        lab = {
          id: Math.random().toString(), type,
          title: `Escalonamento de Privilégio em ${ip}`,
          desc: `Você tem acesso de usuário baixo. Explore permissões erradas no Sudo.`,
          command: `sudo -l && sudo /usr/bin/find . -exec /bin/sh \\; -quit`,
          points: 500 + Math.floor(Math.random() * 200),
          targetUser: 'root_escalado', targetPassword: pass, targetSystem: 'Servidor Linux Crítico'
        };
        break;
      case 'active_directory':
        lab = {
          id: Math.random().toString(), type,
          title: `Comprometimento de Active Directory`,
          desc: `Use o Responder para capturar hashes NTLMv2 na rede corporativa.`,
          command: `responder -I eth0 -rdw`,
          points: 700 + Math.floor(Math.random() * 250),
          targetUser: 'domain_admin', targetPassword: pass, targetSystem: 'Controlador de Domínio (DC)'
        };
        break;
      case 'steganography':
        lab = {
          id: Math.random().toString(), type,
          title: `Extração Esteganográfica`,
          desc: `Há uma senha escondida em uma imagem interceptada. Use steghide.`,
          command: `steghide extract -sf alvo.jpg -p senha_secreta`,
          points: 250 + Math.floor(Math.random() * 100),
          targetUser: 'agente_oculto', targetPassword: pass, targetSystem: 'Canal de Comunicação Criptografado'
        };
        break;
      case 'osint':
      default:
        lab = {
          id: Math.random().toString(), type,
          title: `Investigação OSINT / Vazamentos`,
          desc: `Busque por vazamentos conhecidos deste alvo.`,
          command: `theHarvester -d empresa.local -b all`,
          points: 250 + Math.floor(Math.random() * 100),
          targetUser: 'ceo_admin', targetPassword: pass, targetSystem: 'Painel Administrativo'
        };
        break;
    }
    labs.push(lab);
  }
  return labs;
};
