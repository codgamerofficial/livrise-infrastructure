'use client';

import React, { useState } from 'react';
import { useLivRiseStore } from '@/lib/store';
import {
  CheckSquare,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  User,
  Filter,
  Briefcase,
} from 'lucide-react';
import { MobileBottomSheet } from '@/components/app/MobileBottomSheet';

interface TaskItem {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  status: 'Todo' | 'In Progress' | 'Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assignedTo: string;
  dueDate: string;
}

export default function AdminTasksPage() {
  const { projects } = useLivRiseStore();

  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 'tsk-01',
      projectId: projects[0]?.id || 'prj-1',
      projectName: projects[0]?.title || 'Residential Project',
      title: 'Structural STAAD.Pro foundation load analysis',
      status: 'In Progress',
      priority: 'Urgent',
      assignedTo: 'Lead Structural Consultant',
      dueDate: '2026-10-15',
    },
    {
      id: 'tsk-02',
      projectId: projects[0]?.id || 'prj-1',
      projectName: projects[0]?.title || 'Residential Project',
      title: 'Municipal statutory setback drawing signoff',
      status: 'Todo',
      priority: 'High',
      assignedTo: 'Architectural Project Lead',
      dueDate: '2026-10-20',
    },
    {
      id: 'tsk-03',
      projectId: projects[1]?.id || 'prj-2',
      projectName: projects[1]?.title || 'Infrastructure Corridor',
      title: 'Geotechnical soil bearing capacity vetting',
      status: 'Done',
      priority: 'Medium',
      assignedTo: 'Civil Engineering Lead',
      dueDate: '2026-09-28',
    },
  ]);

  const [filter, setFilter] = useState<'All' | 'Todo' | 'In Progress' | 'Review' | 'Done'>('All');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState<TaskItem['priority']>('High');
  const [taskAssignee, setTaskAssignee] = useState('Structural Engineering Lead');
  const [taskDueDate, setTaskDueDate] = useState('');

  const filteredTasks = filter === 'All' ? tasks : tasks.filter((t) => t.status === filter);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const prj = projects[0] || { id: 'prj-1', title: 'Active Project' };
    const newTask: TaskItem = {
      id: `tsk-${Date.now()}`,
      projectId: prj.id,
      projectName: prj.title,
      title: taskTitle,
      status: 'Todo',
      priority: taskPriority,
      assignedTo: taskAssignee,
      dueDate: taskDueDate || '2026-10-30',
    };

    setTasks([newTask, ...tasks]);
    setIsNewTaskOpen(false);
    setTaskTitle('');
  };

  const handleUpdateStatus = (id: string, newStatus: TaskItem['status']) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-400">Operations Workflow</span>
          <h1 className="text-2xl font-bold text-white tracking-tight">Project Tasks & Milestones</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Operational deliverables, structural reviews, and site engineering checks.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewTaskOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Task</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {(['All', 'Todo', 'In Progress', 'Review', 'Done'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === tab
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tasks Table / Card List */}
      <div className="space-y-3">
        {filteredTasks.map((t) => (
          <div
            key={t.id}
            className="p-4 sm:p-5 rounded-2xl liquid-glass border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
          >
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    t.priority === 'Urgent'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : t.priority === 'High'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}
                >
                  {t.priority}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 truncate">
                  {t.projectName}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white tracking-tight">
                {t.title}
              </h3>
              <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-zinc-500" />
                  {t.assignedTo}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  Due {t.dueDate}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
              <select
                value={t.status}
                onChange={(e) => handleUpdateStatus(t.id, e.target.value as TaskItem['status'])}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-medium focus:outline-none"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Under Review</option>
                <option value="Done">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* New Task Sheet */}
      <MobileBottomSheet
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        title="Create Operational Task"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
              Task Title
            </label>
            <input
              type="text"
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Seismic drift verification and pier reinforcement"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                Priority
              </label>
              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value as TaskItem['priority'])}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                Due Date
              </label>
              <input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
              Assigned Engineer
            </label>
            <input
              type="text"
              value={taskAssignee}
              onChange={(e) => setTaskAssignee(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsNewTaskOpen(false)}
              className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors"
            >
              Save Task
            </button>
          </div>
        </form>
      </MobileBottomSheet>
    </div>
  );
}
