
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
import { Skeleton } from 'boneyard-js/react';

interface TeacherDashboardProps {
  onBack?: () => void;
  skeletonDebug?: boolean;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onBack }) => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Students', value: '1,280', icon: Users, color: 'text-cyan-300', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { label: 'Active Courses', value: '12', icon: BookOpen, color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Avg. Progress', value: '84%', icon: TrendingUp, color: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { label: 'Engagement', value: '92', icon: Award, color: 'text-violet-300', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  ];

  const recentClasses = [
    { name: 'Atomic Structure - Sec A', time: '10:30 AM', students: 42, status: 'Completed' },
    { name: 'Molecular Geometry - Sec B', time: '01:15 PM', students: 38, status: 'In Progress' },
    { name: 'Quantum Mechanics Intro', time: '03:45 PM', students: 50, status: 'Upcoming' },
  ];

  return (
    <div className="h-full overflow-y-auto bg-transparent p-8 space-y-12 pb-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-white transition-all shadow-md mt-6 md:mt-0 self-start"
            >
              Go Back
            </button>
          )}
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-cyan-300 font-mono text-[10px] uppercase tracking-[0.3em] drop-shadow-sm">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/30">
                <Sparkles size={12} className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </div>
              Professional Dashboard
            </div>
            <h1 className="text-4xl font-display font-medium text-white tracking-tight drop-shadow-md">
              Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">{user?.first_name}</span>
            </h1>
            <p className="text-white/60 font-sans text-sm drop-shadow-sm">Monitor your classes and student engagement today.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 rounded-2xl bg-black/40 border border-white/10 text-white/80 text-xs font-medium hover:bg-white/10 hover:text-white transition-all shadow-inner hover:border-white/20">
            Schedule Class
          </button>
          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-medium hover:from-cyan-400 hover:to-violet-500 shadow-[0_4px_20px_rgba(34,211,238,0.3)] border border-white/20 transition-all flex items-center gap-2 group">
            <Plus size={16} className="drop-shadow-sm group-hover:rotate-90 transition-transform" />
            <span className="drop-shadow-sm">New Content</span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <Skeleton name="teacher-stats" loading={false}>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[32px] bg-black/40 border border-white/10 backdrop-blur-xl group hover:border-white/20 hover:bg-black/60 transition-all shadow-lg"
            >
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.border} border ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
                <stat.icon size={24} className="drop-shadow-md" />
              </div>
              <div className="text-3xl font-display font-medium text-white mb-1 drop-shadow-sm group-hover:text-cyan-300 transition-colors">{stat.value}</div>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] leading-none">{stat.label}</div>
            </motion.div>
          ))}
        </section>
      </Skeleton>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto relative z-10">
        {/* Main Content: Upcoming Classes */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-medium text-white uppercase tracking-tight flex items-center gap-3 drop-shadow-sm">
              <Calendar size={20} className="text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
              Schedule Today
            </h2>
            <button className="text-[10px] font-mono text-white/40 hover:text-cyan-300 uppercase tracking-[0.2em] transition-all drop-shadow-sm">
              View Calendar
            </button>
          </div>

          <div>
            <Skeleton name="teacher-classes" loading={false}>
              <div className="space-y-4">
                {recentClasses.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="group p-6 rounded-[28px] bg-black/40 backdrop-blur-md border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all flex items-center justify-between shadow-lg"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner ${item.status === 'In Progress' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30 animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'bg-black/50 text-white/30 border-white/5'
                        }`}>
                        <Play size={20} className={item.status === 'In Progress' ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''} />
                      </div>
                      <div>
                        <h3 className="text-sm font-sans font-medium text-white mb-1 group-hover:text-cyan-100 transition-colors drop-shadow-sm">{item.name}</h3>
                        <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Clock size={12} /> {item.time}</span>
                          <span className="flex items-center gap-1.5"><Users size={12} /> {item.students} Students</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border ${item.status === 'In Progress' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-400/20 shadow-inner' : 'bg-black/50 text-white/40 border-white/10 shadow-inner'
                        }`}>
                        {item.status}
                      </span>
                      <button className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-white/30 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 hover:text-white shadow-inner">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Skeleton>
          </div>
        </div>

        {/* Sidebar: Announcements & Tasks */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 rounded-[40px] bg-gradient-to-br from-cyan-600/90 to-violet-800/90 backdrop-blur-2xl text-white relative overflow-hidden group shadow-[0_8px_32px_rgba(34,211,238,0.2)] border border-white/20">
            <div className="absolute -right-8 -bottom-8 opacity-20 group-hover:scale-110 transition-transform duration-1000 mix-blend-overlay">
              <Sparkles size={200} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-100 drop-shadow-sm">Gesture Control</span>
                <span className="px-3 py-1 rounded-lg bg-black/30 border border-white/20 text-[8px] font-mono uppercase tracking-widest shadow-inner drop-shadow-sm">Active</span>
              </div>
              <h3 className="text-2xl font-display font-medium tracking-tight leading-tight drop-shadow-md">
                Ready for Immersive Teaching
              </h3>
              <p className="text-sm font-sans text-cyan-50 leading-relaxed drop-shadow-sm">
                Use advanced hand gestures to manipulate models and navigate materials during your session.
              </p>
              <button className="w-full py-4 rounded-[20px] bg-white text-slate-900 text-[10px] font-mono uppercase tracking-[0.2em] hover:bg-cyan-50 transition-all shadow-[0_4px_15px_rgba(255,255,255,0.4)]">
                Launch Presentation
              </button>
            </div>
          </div>

          <div className="p-8 rounded-[40px] bg-black/40 backdrop-blur-xl border border-white/10 space-y-6 shadow-lg">
            <h3 className="text-[10px] font-mono text-cyan-300 uppercase tracking-[0.3em] flex items-center gap-2 drop-shadow-sm">
              <MessageSquare size={12} className="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
              Recent Inquiries
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-white/40 shrink-0 group-hover:text-cyan-300 group-hover:border-cyan-400/30 transition-all shadow-inner">
                    <Users size={16} className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  </div>
                  <div>
                    <p className="text-xs font-sans text-white/70 leading-snug group-hover:text-white transition-colors drop-shadow-sm">
                      Student #0{i} asked about Electron Affinity in Section B...
                    </p>
                    <span className="text-[9px] font-mono text-cyan-300/50 uppercase tracking-widest mt-1.5 inline-block drop-shadow-sm">10 min ago</span>
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
