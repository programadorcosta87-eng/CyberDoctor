import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Library() {
  const tools = [
    { name: 'Nmap', desc: 'Mapeador de redes e scanner de portas de segurança. Utilizado para descobrir hosts e serviços em uma rede de computadores.', details: 'Comandos comuns incluem "nmap -sV -p- <ip>" para detecção de versão e escaneamento de todas as portas. Ele usa pacotes IP brutos para determinar o que está disponível na rede.', color: 'border-blue-500' },
    { name: 'Hashcat', desc: 'O utilitário de recuperação de senha mais rápido e avançado do mundo.', details: 'Suporta cinco modos exclusivos de ataque para mais de 300 algoritmos de hash. Fundamental para quebrar hashes MD5, SHA1, bcrypt capturados durante um ataque.', color: 'border-purple-500' },
    { name: 'Hydra', desc: 'Cracker de login de rede muito rápido, suporta muitos protocolos diferentes.', details: 'Pode realizar ataques de dicionário e força bruta contra mais de 50 protocolos, incluindo FTP, HTTP, HTTPS, RDP, SSH, e SMB.', color: 'border-red-500' },
    { name: 'John the Ripper', desc: 'Um cracker de senha rápido, atualmente disponível para muitos sistemas.', details: 'Sua finalidade primária é detectar senhas Unix fracas, mas também suporta Windows LM, NTLM e outros formatos. Ferramenta clássica de força bruta offline.', color: 'border-yellow-500' },
    { name: 'Wireshark', desc: 'Analisador de protocolo de rede (packet sniffer) amplamente utilizado.', details: 'Permite capturar e interagir com o tráfego que passa em uma rede em tempo real. Essencial para análise de pacotes e depuração de comunicações de rede.', color: 'border-cyan-500' },
    { name: 'Metasploit', desc: 'Framework de testes de penetração e exploração.', details: 'Contém um banco de dados gigantesco de exploits (códigos que aproveitam vulnerabilidades). Facilita a tarefa de obter um shell (acesso) no servidor alvo.', color: 'border-green-500' },
    { name: 'Burp Suite', desc: 'Plataforma para testes de segurança em aplicações web.', details: 'Atua como um proxy web entre o navegador e o aplicativo alvo, permitindo interceptar, inspecionar e modificar o tráfego que passa por ele. Indispensável no Bug Bounty.', color: 'border-orange-500' },
    { name: 'SQLmap', desc: 'Ferramenta automática para detectar e explorar falhas de injeção de SQL.', details: 'Automatiza o processo de detectar vulnerabilidades de SQLi e assumir o controle de servidores de banco de dados, despejando (dumping) tabelas e credenciais.', color: 'border-rose-500' },
    { name: 'Aircrack-ng', desc: 'Conjunto de ferramentas para avaliar a segurança de redes Wi-Fi.', details: 'Foca em diferentes áreas da segurança WiFi: monitoramento, ataques de deautenticação, testes de cracking WEP e WPA PSK (WPA 1 e 2).', color: 'border-teal-500' },
    { name: 'Gobuster', desc: 'Ferramenta para força bruta de URIs e subdomínios.', details: 'Muito útil para descobrir diretórios e arquivos ocultos em sites web (ex: /admin, /backup.zip) listados no arquivo de dicionário (wordlist).', color: 'border-indigo-500' },
    { name: 'theHarvester', desc: 'Ferramenta de OSINT para coleta de e-mails, subdomínios, etc.', details: 'Busca em fontes públicas (Google, Bing, PGP, LinkedIn) para coletar informações passivas que ajudam na fase inicial de reconhecimento.', color: 'border-emerald-500' },
    { name: 'Searchsploit', desc: 'Utilitário de linha de comando do Exploit Database.', details: 'Permite buscar rapidamente por exploits e shellcodes localmente, útil para quando você descobre a versão de um software antigo na rede do alvo.', color: 'border-pink-500' },
  
    { name: 'Nikto', desc: 'Scanner de vulnerabilidades para servidores web.', details: 'Realiza testes abrangentes contra servidores web para múltiplos itens perigosos/obsoletos, incluindo mais de 6700 arquivos e programas perigosos.', color: 'border-yellow-300' },
    { name: 'Ghidra', desc: 'Framework de engenharia reversa de software (SRE).', details: 'Desenvolvido pela NSA, é usado para analisar código malicioso e engenharia reversa, oferecendo decompilação avançada e análise estática.', color: 'border-red-400' },
    { name: 'BloodHound', desc: 'Ferramenta de análise visual para ambientes Active Directory.', details: 'Usa a teoria dos grafos para revelar relações e permissões ocultas, permitindo identificar caminhos complexos de escalonamento de privilégios e ataques em domínio.', color: 'border-purple-600' },
    { name: 'Responder', desc: 'Envenenador de tráfego de rede (LLMNR, NBT-NS e MDNS).', details: 'Responde a consultas NetBIOS e captura credenciais de autenticação na rede interna, muitas vezes retornando hashes NTLMv2.', color: 'border-teal-400' },
    { name: 'Maltego', desc: 'Software forense e OSINT de mineração de dados interativa.', details: 'Oferece mapeamento visual para investigação de alvos usando fontes abertas (OSINT). Cria conexões entre domínios, e-mails, endereços IPs e pessoas.', color: 'border-blue-400' },
    { name: 'Ffuf', desc: 'Fuzzing web ultra-rápido desenvolvido em Go.', details: 'Usado primariamente para descoberta de diretórios e fuzzing de parâmetros ocultos em URLs, com grande velocidade de requisição.', color: 'border-rose-400' },
    { name: 'Nessus', desc: 'Scanner de vulnerabilidades líder no mercado.', details: 'Ferramenta comercial com uma extensa biblioteca de assinaturas, usada por defensores (Blue Team) para garantir a segurança da infraestrutura detectando falhas CVE.', color: 'border-green-600' },
    { name: 'Steghide', desc: 'Ferramenta de esteganografia para esconder dados.', details: 'Permite ocultar (ou extrair) dados dentro de arquivos de imagem e áudio, sendo muito usada na transferência dissimulada de arquivos e captura da bandeira (CTF).', color: 'border-indigo-400' }
  ];
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Biblioteca de Ferramentas</h1>
        <p className="text-gray-400 mt-2">Conheça as principais ferramentas utilizadas em cibersegurança ofensiva e defensiva. Clique no card para ler detalhes.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(tool => {
          const isExpanded = expanded === tool.name;
          return (
            <div 
              key={tool.name} 
              onClick={() => setExpanded(isExpanded ? null : tool.name)}
              className={`bg-[#0f0f11] border border-[#1a1a1c] border-t-2 ${tool.color} p-5 rounded-xl hover:bg-[#161618] transition-all cursor-pointer h-full flex flex-col`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white">{tool.name}</h3>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">{tool.desc}</p>
              
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-[#222] animate-in fade-in">
                  <h4 className="text-xs font-bold text-[#00FF41] uppercase tracking-wider mb-2">Detalhes</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{tool.details}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
