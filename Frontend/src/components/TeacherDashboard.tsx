
import React from 'react';
import { 
  Users, 
  BookOpen, 
  Clock, 
  BarChart, 
  Calendar,
  MessageSquare,
  Plus,
  Play,
  Upload,
  MoreVertical,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Students', value: '1,280', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Active Courses', value: '12', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Avg. Progress', value: '84%', icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Engagement', value: '92', icon: Award, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  ];

  const recentClasses = [
    { name: 'Atomic Structure - Sec A', time: '10:30 AM', students: 42, status: 'Completed' },
    { name: 'Molecular Geometry - Sec B', time: '01:15 PM', students: 38, status: 'In Progress' },
    { name: 'Quantum Mechanics Intro', time: '03:45 PM', students: 50, status: 'Upcoming' },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#020617] p-8 space-y-12 pb-32">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-7xl mx-auto">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-[10px] uppercase tracking-[0.3em]">
            <Sparkles size={12} />
            Professional Dashboard
          </div>
          <h1 className="text-4xl font-display font-bold text-white tracking-tight">
            Welcome back, <span className="text-indigo-500">{user?.first_name}</span>
          </h1>
          <p className="text-slate-500 font-light text-sm">Monitor your classes and student engagement today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-medium hover:bg-white/10 transition-all">
            Schedule Class
          </button>
          <button className="px-6 py-3 rounded-2xl bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2">
            <Plus size={16} />
            New Content
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group hover:border-white/10 transition-all"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <div className="text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* Main Content: Upcoming Classes */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight flex items-center gap-3">
              <Calendar size={20} className="text-indigo-400" />
              Schedule Today
            </h2>
            <button className="text-[10px] font-mono text-slate-500 hover:text-indigo-400 uppercase tracking-widest transition-all">
              View Calendar
            </button>
          </div>

          <div className="space-y-4">
            {recentClasses.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="group p-6 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-indigo-500/20 hover:bg-indigo-500/[0.02] transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    item.status === 'In Progress' ? 'bg-indigo-500/20 text-indigo-400 animate-pulse' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Play size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{item.name}</h3>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {item.time}</span>
                      <span className="flex items-center gap-1.5"><Users size={12} /> {item.students} Students</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full ${
                    item.status === 'In Progress' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5 text-slate-500'
                  }`}>
                    {item.status}
                  </span>
                  <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-all">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar: Announcements & Tasks */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 rounded-[40px] bg-gradient-to-br from-indigo-600 to-violet-800 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <Sparkles size={200} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-70">Gesture Control</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[8px] font-mono uppercase tracking-widest">Active</span>
              </div>
              <h3 className="text-2xl font-display font-bold tracking-tight leading-tight uppercase italic">
                Ready for Immersive Teaching
              </h3>
              <p className="text-xs opacity-70 font-light leading-relaxed">
                Use advanced hand gestures to manipulate models and navigate materials during your session.
              </p>
              <button className="w-full py-4 rounded-2xl bg-white text-slate-900 text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-all">
                Launch Presentation
              </button>
            </div>
          </div>

          <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-6">
            <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
              <MessageSquare size={12} />
              Recent Inquiries
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-600 shrink-0">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-300 leading-snug group-hover:text-white transition-colors">
                      Student #0{i} asked about Electron Affinity in Section B...
                    </p>
                    <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mt-1 inline-block">10 min ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
