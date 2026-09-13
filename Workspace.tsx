import React, { useState, useEffect, useRef } from 'react';
import { Download, FileText, Trash2, Database, ShieldAlert, AlertTriangle, Terminal, Play, Search, CheckCircle } from 'lucide-react';

export default function Workspace({ profile, onDeleteFile }: { profile: any, onDeleteFile: (id: string) => void }) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [analysisState, setAnalysisState] = useState<'idle' | 'analyzing' | 'done'>('idle');
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const file = profile.workspace.find((f: any) => f.id === selectedFile);

  useEffect(() => {
    setAnalysisState('idle');
    setAnalysisLogs([]);
  }, [selectedFile]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [analysisLogs]);

  const runAnalysis = () => {
    if (!file) return;
    setAnalysisState('analyzing');
    setAnalysisLogs(['[+] Iniciando motor de análise forense...', '[+] Verificando integridade e assinaturas do arquivo...']);
    
    let step = 0;
    const steps = [
      '[+] Calculando hashes (MD5, SHA-1, SHA-256)...',
      '[+] Procurando strings ocultas e metadados...',
      '[+] Analisando entropia e possível ofuscação...',
      '[+] Verificando referências a chaves privadas ou senhas...',
      `[!] ANÁLISE CONCLUÍDA: Nenhum artefato malicioso direto detectado em ${file.name}.`,
      '[+] Metadados: Origem confirmada, sem alterações recentes.',
      '[+] Recomendação: Manter o arquivo arquivado para auditoria.'
    ];

    const interval = setInterval(() => {
      if (step < steps.length) {
        setAnalysisLogs(prev => [...prev, steps[step]]);
        step++;
      } else {
        clearInterval(interval);
        setAnalysisState('done');
      }
    }, 800);
  };

  return (
    <div className="space-y-6 flex flex-col flex-1 min-w-0 h-full">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Meu Trabalho</h1>
        <p className="text-gray-400 mt-2">Área segura para análise de dados extraídos durante simulações.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0 min-w-0">
        {/* File List */}
        <div className="bg-[#0f0f11] border border-[#1a1a1c] rounded-xl overflow-hidden flex flex-col min-h-[250px] md:min-h-0 min-w-0">
          <div className="p-4 border-b border-[#1a1a1c] bg-[#161618]">
            <h2 className="text-white font-bold flex items-center gap-2">
              <Database className="w-5 h-5 text-[#00FF41]" />
              Arquivos Armazenados ({profile.workspace.length})
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {profile.workspace.length === 0 ? (
              <div className="text-center text-gray-500 mt-10 p-4">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p className="text-sm">Nenhum arquivo extraído ainda.</p>
                <p className="text-xs mt-1">Conclua infiltrações no Laboratório.</p>
              </div>
            ) : (
              profile.workspace.map((f: any) => (
                <div 
                  key={f.id}
                  onClick={() => setSelectedFile(f.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex justify-between items-center ${selectedFile === f.id ? 'bg-[#00FF41]/10 border-[#00FF41]' : 'bg-[#161618] border-[#222] hover:border-gray-500'}`}
                >
                  <div className="truncate pr-2 min-w-0 flex-1">
                    <p className={`font-mono text-sm truncate ${selectedFile === f.id ? 'text-[#00FF41]' : 'text-gray-300'}`}>{f.name}</p>
                    <p className="text-xs text-gray-500 truncate">Alvo: {f.source}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteFile(f.id); if (selectedFile === f.id) setSelectedFile(null); }}
                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* File Content / Analysis */}
        <div className="md:col-span-2 bg-black border border-[#1a1a1c] rounded-xl overflow-hidden flex flex-col relative shadow-inner min-h-[400px] md:min-h-0 min-w-0">
          {file ? (
            <>
              <div className="p-3 border-b border-[#1a1a1c] bg-[#161618] flex items-center justify-between">
                <h3 className="text-[#00FF41] font-mono font-bold text-sm flex items-center gap-2 min-w-0 flex-1 pr-2">
                  <FileText className="w-4 h-4 shrink-0" /> <span className="truncate min-w-0 flex-1">{file.name}</span>
                </h3>
                <span className="text-xs text-gray-500 font-mono">{new Date(file.extractedAt).toLocaleString()}</span>
              </div>
              
              <div className="flex-1 flex flex-col min-h-0 min-w-0">
                {/* Raw Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap break-all">
                  <div className="text-gray-500 mb-2 border-b border-[#222] pb-2 uppercase text-xs tracking-wider">Conteúdo Bruto</div>
                  {file.content}
                </div>

                {/* Analysis Console */}
                <div className="border-t border-[#1a1a1c] bg-[#0a0a0b] flex flex-col" style={{ minHeight: '40%' }}>
                  <div className="p-2 border-b border-[#1a1a1c] bg-[#161618] flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> Console de Análise Forense
                    </span>
                    
                    {analysisState === 'idle' && (
                      <button 
                        onClick={runAnalysis}
                        className="bg-[#00FF41]/20 hover:bg-[#00FF41]/30 text-[#00FF41] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-2 transition-all"
                      >
                        <Play className="w-3 h-3" /> Iniciar Análise
                      </button>
                    )}
                    {analysisState === 'analyzing' && (
                      <span className="text-yellow-500 text-xs flex items-center gap-2 animate-pulse">
                        <Search className="w-3 h-3" /> Analisando...
                      </span>
                    )}
                    {analysisState === 'done' && (
                      <span className="text-[#00FF41] text-xs flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" /> Análise Concluída
                      </span>
                    )}
                  </div>
                  
                  <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-xs text-gray-300 space-y-1">
                    {analysisLogs.length === 0 && analysisState === 'idle' && (
                      <span className="text-gray-600">Aguardando início da análise forense...</span>
                    )}
                    {analysisLogs.map((log, idx) => (
                      <div key={idx} className={log?.includes('[!]') ? 'text-[#00FF41] font-bold' : log?.includes('Recomendação') ? 'text-blue-400' : ''}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
              <ShieldAlert className="w-16 h-16 mb-4 opacity-20" />
              <p>Selecione um arquivo para visualizar e analisar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
