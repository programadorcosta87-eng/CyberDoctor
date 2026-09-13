export type Level = 'Bronze' | 'Prata' | 'Ouro' | 'Diamante' | 'Mestre Hacker';

export interface WorkspaceFile {
  id: string;
  name: string;
  content: string;
  extractedAt: number;
  source: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface ActivityHistory {
  id: string;
  type: 'Lab' | 'Quiz' | 'Challenge';
  title: string;
  pointsEarned: number;
  timestamp: number;
}

export interface UserProfile {
  username: string;
  points: number;
  joinedAt: number;
  achievements: Achievement[];
  history: ActivityHistory[];
  workspace: WorkspaceFile[];
}

export const LEVELS = {
  BRONZE: { name: 'Bronze', minPoints: 0, maxPoints: 1000, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500' },
  PRATA: { name: 'Prata', minPoints: 1001, maxPoints: 3000, color: 'text-gray-300', bg: 'bg-gray-300/10', border: 'border-gray-300' },
  OURO: { name: 'Ouro', minPoints: 3001, maxPoints: 7000, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400' },
  DIAMANTE: { name: 'Diamante', minPoints: 7001, maxPoints: 15000, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400' },
  MESTRE: { name: 'Mestre Hacker', minPoints: 15001, maxPoints: Infinity, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500' },
};

export const AVAILABLE_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_blood', title: 'First Blood', description: 'Completou o primeiro laboratório.', icon: 'droplet' },
  { id: 'quiz_master', title: 'Mestre dos Quizzes', description: 'Acertou 100% em um quiz.', icon: 'brain' },
  { id: 'hacker_man', title: 'Hacker Man', description: 'Realizou uma infiltração com sucesso.', icon: 'terminal' },
  { id: 'silver_tier', title: 'Evolução', description: 'Alcançou o nível Prata.', icon: 'award' },
  { id: 'gold_tier', title: 'Ostentação', description: 'Alcançou o nível Ouro.', icon: 'award' },
  { id: 'diamond_tier', title: 'Elite', description: 'Alcançou o nível Diamante.', icon: 'award' },
  { id: 'cyberpro_tier', title: 'Profissional', description: 'Alcançou o nível CyberPro.', icon: 'award' },
  { id: 'batmax_tier', title: 'O Supremo', description: 'Alcançou o temido nível BatMax.', icon: 'award' },
  { id: 'data_broker', title: 'Data Broker', description: 'Extraiu o primeiro arquivo de um alvo.', icon: 'download' },
  { id: 'scanner', title: 'Port Scanner', description: 'Descobriu portas abertas em servidores.', icon: 'search' },
  { id: 'red_team', title: 'Red Team Ops', description: 'Completou 10 simulações de ataque.', icon: 'shield' },
  { id: 'red_team_pro', title: 'Red Team Pro', description: 'Completou 50 simulações de ataque.', icon: 'shield' },
  { id: 'red_team_master', title: 'Mestre da Invasão', description: 'Completou 100 simulações de ataque.', icon: 'shield' },
  { id: 'password_cracker', title: 'Cracker de Senhas', description: 'Descobriu 5 senhas aleatórias.', icon: 'key' },
  { id: 'osint_ninja', title: 'OSINT Ninja', description: 'Encontrou dados vazados.', icon: 'eye' },
  { id: 'phishing_expert', title: 'Engenheiro Social', description: 'Completou com sucesso desafios de Phishing.', icon: 'users' },
  { id: 'malware_analyst', title: 'Caçador de Malware', description: 'Analisou artefatos maliciosos na bancada.', icon: 'bug' },
  { id: 'crypto_breaker', title: 'Criptoanalista', description: 'Quebrou cifras de criptografia avançadas.', icon: 'unlock' },
  { id: 'network_ghost', title: 'Fantasma da Rede', description: 'Atuou indetectável em 5 laboratórios de rede.', icon: 'wifi' },
  { id: 'sql_injector', title: 'Injetor SQL', description: 'Extraiu dados através de injeção SQL no banco.', icon: 'database' },
  { id: 'xss_exploiter', title: 'Cross-Site Scripter', description: 'Executou scripts no navegador da vítima.', icon: 'code' },
  { id: 'ddos_survivor', title: 'Sobrevivente DDoS', description: 'Mitigou um ataque de negação de serviço.', icon: 'activity' },
  { id: 'zero_day', title: 'Pesquisador Zero-Day', description: 'Criou um exploit não catalogado.', icon: 'cpu' },
  { id: 'privilege_escalation', title: 'Root Acess', description: 'Escalou privilégios para Administrador/Root.', icon: 'chevron-up' },
  { id: 'forensic_expert', title: 'Perito Forense', description: 'Extraiu e analisou 10 arquivos confidenciais.', icon: 'search' },
  { id: 'blue_team', title: 'Defensor Blue Team', description: 'Configurou firewalls e IDS com sucesso.', icon: 'shield-check' },
  { id: 'cloud_hacker', title: 'Invasor de Nuvens', description: 'Comprometeu uma infraestrutura AWS/Azure simulada.', icon: 'cloud' },
  { id: 'iot_breaker', title: 'Pesadelo IoT', description: 'Assumiu o controle de câmeras e roteadores.', icon: 'radio' },
  { id: 'social_engineer', title: 'O Ilusionista', description: 'Obteve acessos puramente com lábia.', icon: 'user' },
  { id: 'wireless_hacker', title: 'Cracker Wi-Fi', description: 'Quebrou redes WPA2 e WPA3.', icon: 'wifi' },
  { id: 'api_breaker', title: 'Destruidor de APIs', description: 'Descobriu endpoints ocultos (BOLA/IDOR).', icon: 'zap' },
  { id: 'mobile_hacker', title: 'Android Root', description: 'Fez engenharia reversa em um APK.', icon: 'smartphone' },
  { id: 'steganography', title: 'Olho Mágico', description: 'Encontrou mensagens ocultas em imagens.', icon: 'image' },
  { id: 'sysadmin_nightmare', title: 'Pesadelo do SysAdmin', description: 'Apagou os logs antes de sair.', icon: 'trash-2' },
  { id: 'bug_bounty', title: 'Caçador de Recompensas', description: 'Atingiu 10.000 pontos totais em Bug Bounty.', icon: 'dollar-sign' },
  { id: 'ciso', title: 'CISO Virtual', description: 'Desbloqueou todos os módulos de biblioteca.', icon: 'briefcase' },
  { id: 'terminal_addict', title: 'Viciado em Terminal', description: 'Digitou 1000 comandos no Laboratório Livre.', icon: 'terminal' },
  { id: 'night_owl', title: 'Coruja H4x0r', description: 'Realizou uma invasão de madrugada.', icon: 'moon' },
];
