import React from 'react';
import {
  CalendarCheck,
  Check,
  Clock3,
  Download,
  Search,
  ShieldCheck,
  UserCheck,
  UserMinus,
  Users,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

type AttendanceStatus = 'present' | 'late' | 'absent';

interface AttendancePortalProps {
  mode: 'teacher' | 'institute' | 'student';
  classes?: any[];
  selectedClass?: any | null;
  studentName?: string;
  onClose: () => void;
}

interface AttendanceStudent {
  id: string | number;
  name: string;
  roll: string;
  className: string;
  streak: number;
  rate: number;
}

const sampleStudents: AttendanceStudent[] = [
  { id: 's1', name: 'Aarav Sharma', roll: 'LZ-1101', className: 'Grade 11 Physics', streak: 18, rate: 96 },
  { id: 's2', name: 'Maya Banerjee', roll: 'LZ-1102', className: 'Grade 11 Physics', streak: 15, rate: 94 },
  { id: 's3', name: 'Rohan Iyer', roll: 'LZ-1103', className: 'Grade 12 Chemistry', streak: 11, rate: 91 },
  { id: 's4', name: 'Sara Khan', roll: 'LZ-1104', className: 'Grade 12 Biology', streak: 9, rate: 88 },
  { id: 's5', name: 'Dev Patel', roll: 'LZ-1105', className: 'Grade 10 Mathematics', streak: 7, rate: 84 },
  { id: 's6', name: 'Nisha Rao', roll: 'LZ-1106', className: 'Grade 10 Mathematics', streak: 20, rate: 98 }
];

const getStudentName = (student: any, index: number) => {
  const fullName = `${student?.first_name || ''} ${student?.last_name || ''}`.trim();
  return fullName || student?.name || student?.username || `Student ${index + 1}`;
};

const normalizeStudents = (classes: any[] = [], selectedClass?: any | null): AttendanceStudent[] => {
  const sourceClasses = selectedClass ? [selectedClass] : classes;
  const normalized = sourceClasses.flatMap((classroom, classIndex) => {
    const students = Array.isArray(classroom?.students) ? classroom.students : [];
    return students.map((student: any, index: number) => ({
      id: student?.id || `${classroom?.id || classIndex}-${index}`,
      name: getStudentName(student, index),
      roll: student?.roll_no || student?.username || `LZ-${String(index + 1).padStart(3, '0')}`,
      className: classroom?.name || student?.className || 'LabZero Classroom',
      streak: 6 + ((index + classIndex) % 17),
      rate: 82 + ((index + classIndex * 3) % 17)
    }));
  });

  return normalized.length > 0 ? normalized : sampleStudents;
};

const statusStyles: Record<AttendanceStatus, string> = {
  present: 'bg-emerald-500 text-white border-emerald-400',
  late: 'bg-amber-400 text-slate-950 border-amber-300',
  absent: 'bg-rose-500 text-white border-rose-400'
};

const AttendancePortal: React.FC<AttendancePortalProps> = ({
  mode,
  classes = [],
  selectedClass,
  studentName,
  onClose
}) => {
  const [activeClassId, setActiveClassId] = React.useState<string>(() => String(selectedClass?.id || classes[0]?.id || 'all'));
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sessionDate, setSessionDate] = React.useState(() => new Date().toISOString().slice(0, 10));
  const [records, setRecords] = React.useState<Record<string, AttendanceStatus>>({});
  const [notice, setNotice] = React.useState<string | null>(null);

  const selectedPortalClass = selectedClass || classes.find((item) => String(item.id) === activeClassId) || null;
  const students = React.useMemo(
    () => normalizeStudents(classes, activeClassId === 'all' ? null : selectedPortalClass),
    [classes, activeClassId, selectedPortalClass]
  );

  React.useEffect(() => {
    setRecords((current) => {
      const next = { ...current };
      students.forEach((student, index) => {
        if (!next[String(student.id)]) {
          next[String(student.id)] = index % 7 === 0 ? 'late' : index % 5 === 0 ? 'absent' : 'present';
        }
      });
      return next;
    });
  }, [students]);

  const visibleStudents = students.filter((student) => {
    const haystack = `${student.name} ${student.roll} ${student.className}`.toLowerCase();
    return haystack.includes(searchTerm.toLowerCase());
  });

  const counts = students.reduce(
    (total, student) => {
      total[records[String(student.id)] || 'present'] += 1;
      return total;
    },
    { present: 0, late: 0, absent: 0 } as Record<AttendanceStatus, number>
  );

  const attendanceRate = students.length
    ? Math.round(((counts.present + counts.late * 0.5) / students.length) * 100)
    : 0;

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2200);
  };

  const updateStatus = (studentId: string | number, status: AttendanceStatus) => {
    setRecords((current) => ({ ...current, [String(studentId)]: status }));
  };

  const markAllPresent = () => {
    setRecords((current) => {
      const next = { ...current };
      visibleStudents.forEach((student) => {
        next[String(student.id)] = 'present';
      });
      return next;
    });
    showNotice('Visible students marked present.');
  };

  const exportCsv = () => {
    const rows = [
      ['Date', 'Class', 'Roll', 'Student', 'Status', 'Attendance Rate', 'Streak'],
      ...visibleStudents.map((student) => [
        sessionDate,
        student.className,
        student.roll,
        student.name,
        records[String(student.id)] || 'present',
        `${student.rate}%`,
        `${student.streak} days`
      ])
    ];

    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `labzero-attendance-${sessionDate}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showNotice('Attendance CSV exported.');
  };

  const studentSummary = sampleStudents.find((student) =>
    student.name.toLowerCase().includes((studentName || '').toLowerCase().split(' ')[0] || 'astra')
  ) || sampleStudents[0];

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-0 md:p-6">
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/78 backdrop-blur-md"
        aria-label="Close attendance portal"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden border border-[var(--border-glass)] bg-[var(--bg-deep)] shadow-2xl md:h-[92vh] md:rounded-[32px]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_30rem),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.12),_transparent_30rem)] pointer-events-none" />

        <header className="relative z-10 flex flex-col gap-5 border-b border-[var(--border-glass)] bg-[var(--bg-panel)]/70 p-5 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between lg:p-7">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-500/10 text-cyan-300 shadow-inner">
              <CalendarCheck size={28} />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-cyan-300">
                {mode === 'student' ? 'Student Attendance' : mode === 'institute' ? 'Institute Attendance Control' : 'Teacher Attendance Portal'}
              </div>
              <h2 className="mt-1 text-2xl font-display font-semibold tracking-tight text-[var(--text-primary)]">
                Attendance Register
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="date"
              value={sessionDate}
              onChange={(event) => setSessionDate(event.target.value)}
              className="h-11 rounded-xl border border-[var(--border-glass)] bg-[var(--bg-panel)] px-4 text-sm text-[var(--text-primary)] outline-none focus:border-cyan-300"
            />
            {mode !== 'student' && classes.length > 0 && !selectedClass && (
              <select
                value={activeClassId}
                onChange={(event) => setActiveClassId(event.target.value)}
                className="h-11 rounded-xl border border-[var(--border-glass)] bg-[var(--bg-panel)] px-4 text-sm text-[var(--text-primary)] outline-none focus:border-cyan-300"
              >
                <option value="all">All classrooms</option>
                {classes.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>{classroom.name}</option>
                ))}
              </select>
            )}
            {mode !== 'student' && (
              <button
                onClick={markAllPresent}
                className="flex h-11 items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 text-[10px] font-mono uppercase tracking-widest text-emerald-300 transition-all hover:bg-emerald-500 hover:text-white"
              >
                <UserCheck size={15} />
                Mark Present
              </button>
            )}
            <button
              onClick={exportCsv}
              className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-4 text-[10px] font-mono uppercase tracking-widest text-white shadow-lg shadow-cyan-500/10 transition-all hover:from-cyan-400 hover:to-violet-500"
            >
              <Download size={15} />
              Export
            </button>
            <button onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-glass)] bg-[var(--bg-panel)] text-[var(--text-muted)] transition-all hover:text-[var(--text-primary)]">
              <X size={18} />
            </button>
          </div>
        </header>

        <main className="relative z-10 grid flex-1 min-h-0 grid-cols-1 overflow-y-auto lg:grid-cols-12">
          <aside className="border-b border-[var(--border-glass)] bg-[var(--bg-panel)]/35 p-5 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-7">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Attendance', value: `${attendanceRate}%`, icon: ShieldCheck, color: 'text-cyan-300' },
                { label: 'Present', value: counts.present, icon: Check, color: 'text-emerald-300' },
                { label: 'Late', value: counts.late, icon: Clock3, color: 'text-amber-300' },
                { label: 'Absent', value: counts.absent, icon: UserMinus, color: 'text-rose-300' }
              ].map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-[var(--border-glass)] bg-[var(--bg-panel)] p-4 shadow-sm">
                  <metric.icon size={18} className={metric.color} />
                  <div className="mt-3 text-2xl font-display font-semibold text-[var(--text-primary)]">{metric.value}</div>
                  <div className="mt-1 text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)]">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-[var(--border-glass)] bg-[var(--bg-panel)] p-5">
              <div className="flex items-center gap-3">
                <Users size={18} className="text-cyan-300" />
                <h3 className="text-sm font-display font-semibold text-[var(--text-primary)]">Session Summary</h3>
              </div>
              <div className="mt-5 space-y-4">
                {mode === 'student' ? (
                  <>
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)]">Current Student</div>
                      <div className="mt-1 text-lg font-display text-[var(--text-primary)]">{studentName || studentSummary.name}</div>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--bg-deep)]">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${studentSummary.rate}%` }} />
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                      Your attendance is {studentSummary.rate}% with a {studentSummary.streak}-day learning streak.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-muted)]">Classrooms in scope</span>
                      <span className="font-semibold text-[var(--text-primary)]">{activeClassId === 'all' ? Math.max(classes.length, 1) : 1}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-muted)]">Students tracked</span>
                      <span className="font-semibold text-[var(--text-primary)]">{students.length}</span>
                    </div>
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-xs leading-relaxed text-cyan-100">
                      Use the status controls to update today's roll call, then export the report for records or institute review.
                    </div>
                  </>
                )}
              </div>
            </div>
          </aside>

          <section className="flex min-h-0 flex-col lg:col-span-8">
            <div className="border-b border-[var(--border-glass)] p-5 lg:p-7">
              <div className="relative">
                <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by student, roll number, or class"
                  className="h-12 w-full rounded-2xl border border-[var(--border-glass)] bg-[var(--bg-panel)] pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-cyan-300"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 lg:p-7">
              <div className="space-y-3">
                {visibleStudents.map((student, index) => {
                  const status = records[String(student.id)] || 'present';
                  return (
                    <motion.div
                      key={`${student.id}-${student.className}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="grid gap-4 rounded-3xl border border-[var(--border-glass)] bg-[var(--bg-panel)] p-4 shadow-sm transition-all hover:border-cyan-300/35 md:grid-cols-[1fr_auto] md:items-center"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 font-display text-sm font-semibold text-cyan-300">
                          {student.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-[var(--text-primary)]">{student.name}</div>
                          <div className="mt-1 flex flex-wrap gap-2 text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                            <span>{student.roll}</span>
                            <span>{student.className}</span>
                            <span>{student.rate}% avg</span>
                          </div>
                        </div>
                      </div>

                      {mode === 'student' ? (
                        <div className={`inline-flex w-fit items-center rounded-xl border px-3 py-2 text-[10px] font-mono uppercase tracking-widest ${statusStyles[status]}`}>
                          {status}
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-2">
                          {(['present', 'late', 'absent'] as AttendanceStatus[]).map((item) => (
                            <button
                              key={item}
                              onClick={() => updateStatus(student.id, item)}
                              className={`rounded-xl border px-3 py-2 text-[9px] font-mono uppercase tracking-widest transition-all ${
                                status === item
                                  ? statusStyles[item]
                                  : 'border-[var(--border-glass)] bg-[var(--bg-deep)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {visibleStudents.length === 0 && (
                <div className="rounded-3xl border border-[var(--border-glass)] bg-[var(--bg-panel)] p-12 text-center text-sm text-[var(--text-muted)]">
                  No attendance records match your search.
                </div>
              )}
            </div>
          </section>
        </main>

        {notice && (
          <div className="absolute bottom-5 right-5 z-20 rounded-2xl border border-emerald-400/20 bg-slate-950/95 px-5 py-4 text-sm text-emerald-200 shadow-2xl">
            {notice}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AttendancePortal;
