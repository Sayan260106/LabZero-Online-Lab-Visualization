
import React from 'react';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  BarChart3, 
  ShieldCheck, 
  Settings,
  MoreVertical,
  ArrowUpRight,
  Plus,
  Search,
  School,
  Database,
  PieChart,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

const InstituteDashboard: React.FC = () => {
  const { user } = useAuth();

  const metrics = [
    { label: 'Total Enrollment', value: '14,250', change: '+12%', icon: Users, color: 'text-blue-400' },
    { label: 'Faculty Count', value: '450', change: '+3', icon: School, color: 'text-indigo-400' },
    { label: 'Resource Utilization', value: '88.5%', change: '+5.2%', icon: Database, color: 'text-emerald-400' },
    { label: 'System Health', value: '99.9%', change: 'Optimal', icon: ShieldCheck, color: 'text-cyan-400' },
  ];

  const facultyHighlights = [
    { name: 'Dr. Sarah Wilson', department: 'Chemistry', classes: 24, performance: 98 },
    { name: 'Prof. James Miller', department: 'Physics', classes: 18, performance: 95 },
    { name: 'Dr. Elena Rodriguez', department: 'Mathematics', classes: 22, performance: 97 },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#020617] p-8 space-y-12 pb-32">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 max-w-7xl mx-auto">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Building2 size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400 leading-none mb-1">Administrative Node</span>
              <h1 className="text-3xl font-display font-bold text-white tracking-tight leading-none uppercase italic">
                {user?.first_name || 'Institute Controller'}
              </h1>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 px-4 border-r border-white/10 uppercase font-mono text-[9px] tracking-widest text-slate-500">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Global Status: Active
          </div>
          <button className="p-3 rounded-xl hover:bg-white/5 text-slate-400 transition-all">
            <Search size={18} />
          </button>
          <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-[10px] font-mono uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
            Export Report
          </button>
        </div>
      </header>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[40px] glass-panel border border-white/5 hover:border-white/10 transition-all relative overflow-hidden group"
          >
            <div className="absolute right-0 top-0 p-8 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform opacity-10">
                <m.icon size={80} />
            </div>
            <h3 className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-4">{m.label}</h3>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-display font-bold text-white tracking-tighter">{m.value}</span>
              <span className="text-[10px] font-mono text-emerald-500">{m.change}</span>
            </div>
            <div className="h-1 w-12 rounded-full bg-indigo-500/50" />
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* Performance Graph Placeholder */}
        <div className="xl:col-span-8 p-10 rounded-[48px] bg-white/[0.01] border border-white/5 space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight italic">Resource Utilization</h2>
              <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest leading-none">Across all departments for Q2 2026</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"><PieChart size={18} /></button>
              <button className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg"><BarChart3 size={18} /></button>
            </div>
          </div>
          
          <div className="h-64 flex items-end gap-4">
            {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
              <div key={i} className="flex-1 space-y-2 group">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center text-[8px] font-mono text-slate-500">{h}%</div>
                <div 
                  className="w-full bg-indigo-500/10 rounded-t-xl group-hover:bg-indigo-500/30 transition-all cursor-pointer relative overflow-hidden" 
                  style={{ height: `${h}%` }}
                >
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-500" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5">
            <div className="space-y-1">
              <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Active Seats</div>
              <div className="text-xl font-display font-bold text-white">12,402 / 15,000</div>
            </div>
            <div className="space-y-1">
              <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Storage Used</div>
              <div className="text-xl font-display font-bold text-white">4.2 TB / 10 TB</div>
            </div>
            <div className="space-y-1">
              <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">AI compute</div>
              <div className="text-xl font-display font-bold text-white">74.2% Utilization</div>
            </div>
          </div>
        </div>

        {/* Sidebar: Faculty Management */}
        <div className="xl:col-span-4 space-y-8">
          <div className="p-8 rounded-[40px] bg-slate-900 border border-white/10 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-display font-bold text-white uppercase tracking-tight flex items-center gap-2">
                <School size={18} className="text-indigo-400" />
                Key Faculty
              </h3>
              <Plus size={16} className="text-slate-600 cursor-pointer hover:text-white transition-all" />
            </div>

            <div className="space-y-6">
              {facultyHighlights.map((f, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 font-bold text-[10px]">
                      {f.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">{f.name}</div>
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{f.department}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-white">{f.performance}%</div>
                    <div className="text-[8px] font-mono text-slate-700 uppercase tracking-widest">Rating</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              Management Portal <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="p-8 rounded-[40px] bg-indigo-600/10 border border-indigo-500/20 relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-6 transform translate-x-4 -translate-y-4 opacity-10 group-hover:scale-110 transition-transform">
                <Target size={120} />
            </div>
            <h4 className="text-[9px] font-mono text-indigo-400 uppercase tracking-[0.3em] mb-4">Institutional Goals</h4>
            <div className="space-y-4 relative z-10">
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "Reach 95% overall student engagement by the end of H1 2026."
              </p>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[72%]" />
              </div>
              <div className="flex justify-between text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                <span>Currently at 72%</span>
                <span>Goal: 95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteDashboard;
