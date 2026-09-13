export function getLevelInfo(points: number) {
  if (points >= 200000) return { name: 'BatMax', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500', next: Infinity, progress: 100 };
  if (points >= 100000) return { name: 'CyberPro', color: 'text-[#00FF41]', bg: 'bg-[#00FF41]/10', border: 'border-[#00FF41]', next: 200000, progress: ((points - 100000) / 100000) * 100 };
  if (points >= 15001) return { name: 'Mestre Hacker', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500', next: 100000, progress: ((points - 15001) / 84999) * 100 };
  if (points >= 7001) return { name: 'Diamante', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400', next: 15001, progress: ((points - 7001) / 8000) * 100 };
  if (points >= 3001) return { name: 'Ouro', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400', next: 7001, progress: ((points - 3001) / 4000) * 100 };
  if (points >= 1001) return { name: 'Prata', color: 'text-gray-300', bg: 'bg-gray-300/10', border: 'border-gray-300', next: 3001, progress: ((points - 1001) / 2000) * 100 };
  return { name: 'Bronze', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500', next: 1001, progress: (points / 1000) * 100 };
}
