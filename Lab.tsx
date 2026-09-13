import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, ShieldAlert, CornerDownLeft, Lock, User, FileText, Database, LogIn, Download, RefreshCw , ArrowLeft } from 'lucide-react';
import { generateAllLabs, DynamicLab, generateFakeProfile } from '../data/labs';

interface Props {
  onSuccess: (points: number, title: string) => void;
  onExtractFile: (file: any) => void;
}

export default function Lab({ onSuccess, onExtractFile }: Props) {
    const [labs, setLabs] = useState<DynamicLab[]>([]);
  const [activeLabId, setActiveLabId] = useState<string | null>(null);
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [phase, setPhase] = useState<'terminal' | 'login' | 'profile'>('terminal');
  const [terminalSuccess, setTerminalSuccess] = useState(false);
  
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [fakeProfile, setFakeProfile] = useState<any>(null);
  const [extractedFiles, setExtractedFiles] = useState<string[]>([]);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLabs(generateAllLabs());
  }, []);

  useEffect(() => {
    if (phase === 'terminal') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output, phase]);

  const refreshLabs = () => {
    setLabs(generateAllLabs());
  };

  const resetLab = () => {
    setActiveLabId(null);
    setOutput([]);
    setPhase('terminal');
    setTerminalSuccess(false);
    setLoginUser('');
    setLoginPass('');
    setLoginError('');
    setFakeProfile(null);
    setExtractedFiles([]);
  };

  const handleCommand = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const rawCmd = input.trim();
    const cmd = rawCmd.replace(/\s+/g, ' '); 
    
    setInput('');
    setOutput(prev => [...prev, `$ ${rawCmd}`]);

    const lab = labs.find(l => l.id === activeLabId);
    if (!lab) return;

    const targetCmd = lab.command.replace(/\s+/g, ' ');
    const altTargetCmd = lab.altCommand ? lab.altCommand.replace(/\s+/g, ' ') : null;

    const validTools = ['nmap', 'hydra', 'hashcat', 'sqlmap', 'gobuster', 'theharvester', 'searchsploit', 'steghide', 'responder', 'john', 'nikto', 'ffuf', 'aircrack-ng', 'sudo', 'msfconsole', 'dirb', 'wfuzz'];
    const parts = cmd.trim().split(/\s+/);
    const toolName = parts[0].toLowerCase();
    const isToolValid = validTools?.includes(toolName);
    const hasArguments = parts.length > 1;

    if (lab.type === 'free_attack') {
      if (!isToolValid) {
        setOutput(prev => [...prev, `[!] Erro: Comando '${toolName}' não reconhecido.`]);
        setOutput(prev => [...prev, `[!] Ferramentas válidas: nmap, hydra, sqlmap, hashcat, gobuster, john, searchsploit, steghide...`]);
        return;
      }
      if (!hasArguments) {
        setOutput(prev => [...prev, `[!] Erro: Comando incompleto. Forneça os parâmetros para o '${toolName}' (ex: ${toolName} -h, ${toolName} <alvo>).`]);
        return;
      }
    }

    if (lab.type === 'free_attack' || cmd === targetCmd || (altTargetCmd && cmd === altTargetCmd)) {
      setIsProcessing(true);
      setOutput(prev => [...prev, 'Iniciando vetor de ataque... ']);
      
      let simulatedLines = [];
      if (lab.type === 'free_attack') {
        simulatedLines = [
          `[+] Analisando comando livre: ${cmd}`,
          `[+] Carregando wordlists e módulos dinâmicos...`,
          `[+] Simulando testes de invasão e respostas do servidor...`,
          `[+] ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)} - Testando variações comuns...`,
          `[+] Extraindo possíveis credenciais na base local...`
        ];
      }

      setTimeout(() => {
        if (lab.type === 'free_attack') {
           setOutput(prev => [...prev, ...simulatedLines]);
        } else {
           setOutput(prev => [...prev, '[+] Executando rotinas. Analisando alvo...']);
        }
      }, 800);
      
      setTimeout(() => {
        if (lab.type === 'free_attack') {
          setOutput(prev => [...prev, `[!] SUCESSO: Ataque livre concluído! Credenciais deduzidas: Usuário: '${lab.targetUser}' | Senha: '${lab.targetPassword}'`]);
        } else if (lab.targetUser && lab.targetPassword) {
          setOutput(prev => [...prev, `[!] SUCESSO: Credenciais encontradas! Usuário: '${lab.targetUser}' | Senha: '${lab.targetPassword}'`]);
        } else {
          setOutput(prev => [...prev, `[!] SUCESSO: Vulnerabilidade explorada. Acesso root obtido.`]);
        }
        setTerminalSuccess(true);
        setIsProcessing(false);
      }, lab.type === 'free_attack' ? 3000 : 2000);
    } else if (cmd === 'clear') {
      setOutput([]);
    } else {
      setOutput(prev => [...prev, `Comando inválido ou incorreto para este desafio. Dica: ${lab.command}`]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const lab = labs.find(l => l.id === activeLabId);
    if (!lab) return;

    const cleanUser = loginUser.trim().replace(/^['"]|['"]$/g, '');
    const cleanPass = loginPass.trim().replace(/^['"]|['"]$/g, '');
    if (cleanUser === lab.targetUser && cleanPass === lab.targetPassword) {
      setLoginError('');
      setFakeProfile(generateFakeProfile(lab.targetUser || 'root'));
      setPhase('profile');
    } else {
      setLoginError('Credenciais inválidas. Tente usar as informações que você descobriu no terminal.');
    }
  };

  const bypassLoginForExploit = () => {
    const lab = labs.find(l => l.id === activeLabId);
    if (!lab) return;
    setFakeProfile(generateFakeProfile(lab.targetUser || 'root'));
    setPhase('profile');
  };

  const handleExtractFile = (filename: string) => {
    if (extractedFiles?.includes(filename)) return;
    
    const lab = labs.find(l => l.id === activeLabId);
    const content = `CONTEÚDO DO ARQUIVO: ${filename}\n\nEste arquivo foi extraído com sucesso do sistema alvo (${lab?.targetSystem || 'Desconhecido'}).\n\nDados brutos prontos para análise.`;
    
    onExtractFile({
      name: filename,
      content: content,
      source: lab?.targetSystem || 'Desconhecido'
    });
    
    setExtractedFiles(prev => [...prev, filename]);
  };

  const handleFinishLab = () => {
    const lab = labs.find(l => l.id === activeLabId);
    if (lab) {
      onSuccess(lab.points, `Lab: ${lab.title}`);
    }
    resetLab();
    refreshLabs();
  };

  if (activeLabId === null) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Laboratório de Invasão</h1>
            <p className="text-gray-400 mt-2">Escolha um vetor de ataque. Todas as ferramentas listadas abaixo estão disponíveis como simulações locais.</p>
          </div>
          <button 
            onClick={refreshLabs}
            className="text-gray-400 hover:text-[#00FF41] flex items-center gap-2 transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" /> Gerar Novos IPs
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {labs.map(lab => (
            <div key={lab.id} className="bg-[#0f0f11] border border-[#1a1a1c] p-6 rounded-xl hover:border-[#00FF41]/50 transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#1a1a1c] text-xs px-2 py-1 rounded text-gray-400 uppercase tracking-wider">{lab.type}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 truncate">{lab.title}</h3>
              <p className="text-gray-400 text-sm mb-4 h-10 line-clamp-2">{lab.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-[#00FF41] text-sm font-bold">+{lab.points} pts</span>
                <button 
                  onClick={() => setActiveLabId(lab.id)}
                  className="bg-[#161618] hover:bg-[#00FF41] hover:text-black text-white px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> Atacar Alvo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const lab = labs.find(l => l.id === activeLabId)!;

  return (
    <div className="flex flex-col flex-1 min-h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{lab.title}</h2>
          {phase === 'terminal' && <p className="text-xs text-gray-400 break-words mt-1">Objetivo: {lab.type === 'free_attack' ? 'Digite qualquer comando de ataque para iniciar.' : <span>Digite o comando <code className="text-[#00FF41] bg-[#00FF41]/10 px-1 rounded break-all">{lab.command}</code></span>}</p>}
          {phase === 'login' && <p className="text-xs text-gray-400">Infiltração: Faça login ou abra o backdoor.</p>}
          {phase === 'profile' && <p className="text-xs text-[#00FF41] font-bold animate-pulse">Acesso Concedido. Sistema Comprometido.</p>}
        </div>
        <button onClick={resetLab} className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
          Sair do Lab
        </button>
      </div>

      {phase === 'terminal' && (
        <>
          <div className="flex-1 bg-black rounded-t-xl border border-[#1a1a1c] p-4 font-mono text-sm overflow-y-auto shadow-inner relative">
            
            <div className="space-y-1 mb-4 text-[#00FF41]/80">
              <p>CyberDoctor OS v2.0.0 (Dynamic Simulated Target)</p>
              <p>Connecting to proxy... OK.</p>
              <p>Target acquired: {lab.targetSystem}</p>
            </div>
            
            {output.map((line, i) => (
              <div key={i} className={`${line.startsWith('$') ? 'text-gray-300' : line?.includes('SUCESSO') ? 'text-[#00FF41] font-bold' : 'text-blue-400'} mb-1 break-words whitespace-pre-wrap`}>
                {line}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {terminalSuccess && (
            <div className="bg-[#161618] border-x border-[#1a1a1c] p-3 flex flex-row items-center justify-between gap-4">
               <p className="text-[#00FF41] font-bold text-xs flex items-center gap-2 shrink-0">Vetor de ataque bem sucedido!</p>
               {lab.targetUser && lab.targetPassword ? (
                 <button
                    onClick={() => setPhase('login')}
                   className="bg-[#00FF41] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#00cc33] transition-all flex items-center gap-2 text-xs shrink-0"
                 >
                   <LogIn className="w-4 h-4" /> Acessar
                 </button>
               ) : (
                 <button
                    onClick={bypassLoginForExploit}
                   className="bg-red-500 text-black font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition-all flex items-center gap-2 text-xs shrink-0"
                 >
                   <TerminalIcon className="w-4 h-4" /> Acessar (Root)
                 </button>
               )}
            </div>
          )}
          <form onSubmit={handleCommand} className="bg-[#0f0f11] border border-[#1a1a1c] border-t-0 rounded-b-xl p-2 flex items-center gap-2 relative group min-w-0">
              <span className="text-[#00FF41] pl-2 font-mono font-bold">$</span>
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isProcessing}
                autoFocus
                spellCheck={false} onFocus={() => setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 300)}
                className="flex-1 min-w-0 bg-transparent text-gray-200 font-mono focus:outline-none py-2"
                placeholder="Digite o comando..."
              />
              <button 
                type="submit" 
                disabled={isProcessing || !input.trim()}
                className="p-2 text-gray-500 hover:text-[#00FF41] disabled:opacity-50 transition-colors cursor-pointer"
                title="Executar comando (Enter)"
              >
                <CornerDownLeft className="w-5 h-5" />
              </button>
            </form>
        </>
      )}

      {phase === 'login' && (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#050505] rounded-xl border border-[#1a1a1c] p-4">
           <div className="w-full max-w-sm mb-4">
             <button 
               onClick={() => setPhase('terminal')}
               className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors"
             >
               <ArrowLeft className="w-4 h-4" /> Voltar ao Terminal
             </button>
           </div>
           <form onSubmit={handleLogin} className="bg-[#0f0f11] p-8 rounded-xl border border-[#222] w-full max-w-sm shadow-[0_0_30px_rgba(0,255,65,0.05)]">
              <div className="text-center mb-6">
                <Database className="w-12 h-12 text-[#00FF41] mx-auto mb-2 opacity-80" />
                <h3 className="text-xl font-bold text-white break-words">{lab.targetSystem}</h3>
                <p className="text-gray-500 text-xs mt-1">Acesso Restrito</p>
              </div>
              
              {loginError && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded mb-4">
                  {loginError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Usuário</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      value={loginUser}
                      onChange={e => setLoginUser(e.target.value)}
                      className="w-full bg-[#161618] border border-[#222] text-white rounded pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#00FF41]"
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Senha</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="password" 
                      value={loginPass}
                      onChange={e => setLoginPass(e.target.value)}
                      className="w-full bg-[#161618] border border-[#222] text-white rounded pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#00FF41]"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#00FF41] hover:bg-[#00cc33] text-black font-bold py-2 rounded text-sm transition-colors mt-2"
                >
                  Entrar no Sistema
                </button>
              </div>
           </form>
        </div>
      )}

      {phase === 'profile' && fakeProfile && (
         <div className="flex-1 bg-[#050505] rounded-xl border border-[#1a1a1c] p-6 overflow-y-auto">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-[#0f0f11] border border-[#222] rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-red-500/50 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-500" />
                </div>
                <div className="flex-1 text-center md:text-left">
                   <h3 className="text-2xl font-bold text-white">{fakeProfile.name}</h3>
                   <p className="text-[#00FF41] font-mono text-sm">@{fakeProfile.username}</p>
                   <div className="mt-2 text-gray-400 text-sm space-y-1">
                     <p>Cargo: <strong className="text-gray-200">{fakeProfile.role}</strong></p>
                     <p>Último Login: {fakeProfile.lastLogin}</p>
                     <p>IP Local: {fakeProfile.ip}</p>
                   </div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-lg text-xs font-mono font-bold text-center">
                  <ShieldAlert className="w-6 h-6 mx-auto mb-1" />
                  SISTEMA COMPROMETIDO
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0f0f11] border border-[#222] p-5 rounded-xl">
                   <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                     <Database className="w-4 h-4 text-[#00FF41]" />
                     Dados Financeiros
                   </h4>
                   <div className="space-y-2 text-sm text-gray-400">
                     <p>Cartão Vinculado: <span className="text-gray-200 font-mono">{fakeProfile.cardNumber}</span></p>
                     <p>Status: <span className="text-green-400">Ativo</span></p>
                   </div>
                </div>
                <div className="bg-[#0f0f11] border border-[#222] p-5 rounded-xl">
                   <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                     <FileText className="w-4 h-4 text-orange-400" />
                     Arquivos Confidenciais
                   </h4>
                   <ul className="space-y-2">
                     {fakeProfile.confidentialFiles.map((file: string, idx: number) => {
                       const isExtracted = extractedFiles?.includes(file);
                       return (
                         <li key={idx} className={`flex items-center justify-between text-sm bg-[#161618] p-2 rounded border ${isExtracted ? 'border-[#00FF41]/50' : 'border-[#222]'}`}>
                           <span className={`${isExtracted ? 'text-[#00FF41]' : 'text-gray-300'} font-mono text-xs truncate max-w-[150px]`}>{file}</span>
                           <button 
                             onClick={() => handleExtractFile(file)}
                             disabled={isExtracted}
                             className={`text-xs px-2 py-1 rounded transition-colors ${isExtracted ? 'bg-[#00FF41]/10 text-[#00FF41]' : 'bg-[#222] text-gray-400 hover:text-white'}`}
                           >
                             {isExtracted ? 'Extraído' : 'Extrair'}
                           </button>
                         </li>
                       );
                     })}
                   </ul>
                   <p className="text-xs text-gray-500 mt-2">* Arquivos extraídos vão para o 'Meu Trabalho'</p>
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <button 
                  onClick={handleFinishLab}
                  className="bg-[#00FF41] text-black font-bold px-8 py-3 rounded-xl hover:bg-[#00cc33] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                >
                  <ShieldAlert className="w-5 h-5" /> Finalizar Infiltração (+{lab.points} XP)
                </button>
              </div>
            </div>
         </div>
      )}
    </div>
  );
}
