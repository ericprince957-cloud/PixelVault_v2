import { useState } from 'react';
import { useApp, Task } from '../context/AppContext';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Plus, Check, Trash2, X, Loader2, CheckSquare, Circle } from 'lucide-react';

export default function Tasks() {
  useDocumentHead({
    title: 'My Tasks — PixelVault',
    description: 'Manage your tasks and to-dos in PixelVault. Track priorities, due dates, and completion status.',
    noindex: true,
  });
  const { tasks, createTask, updateTask, deleteTask, loadingTasks } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setCreating(true);
    await createTask({ title: newTitle.trim(), description: newDesc.trim() || null, priority: newPriority, due_date: newDueDate || null });
    setNewTitle('');
    setNewDesc('');
    setNewPriority('medium');
    setNewDueDate('');
    setShowCreate(false);
    setCreating(false);
  };

  const priorityColors = {
    low: 'text-success bg-success/10 border-success/20',
    medium: 'text-warning bg-warning/10 border-warning/20',
    high: 'text-danger bg-danger/10 border-danger/20',
  };

  const priorityEmoji = {
    low: '🟢',
    medium: '🟡',
    high: '🔴',
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  if (loadingTasks) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-wiggle">✓</div>
          <p className="text-muted">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight">Tasks <span className="text-success">✓</span></h1>
          <p className="text-muted">{pendingTasks.length} pending, {completedTasks.length} completed</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px_8px_12px_9px] bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
        >
          <Plus size={16} /> Add Task
        </button>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-[20px_16px_22px_18px] border-2 border-border bg-surface p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black">New Task ✦</h2>
              <button onClick={() => setShowCreate(false)} className="text-muted hover:text-text">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Task title..."
                className="w-full px-4 py-3 rounded-[12px_10px_14px_11px] bg-background border-2 border-border focus:border-primary focus:outline-none text-text placeholder:text-muted/50"
                autoFocus
              />
              <textarea
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                placeholder="Description (optional)..."
                rows={2}
                className="w-full px-4 py-3 rounded-[12px_10px_14px_11px] bg-background border-2 border-border focus:border-primary focus:outline-none text-text placeholder:text-muted/50 resize-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value as any)}
                  className="px-4 py-3 rounded-[12px_10px_14px_11px] bg-background border-2 border-border focus:border-primary focus:outline-none text-text text-sm font-medium"
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={e => setNewDueDate(e.target.value)}
                  className="px-4 py-3 rounded-[12px_10px_14px_11px] bg-background border-2 border-border focus:border-primary focus:outline-none text-text text-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2.5 rounded-[10px_8px_12px_9px] border-2 border-border text-sm text-muted hover:text-text transition-colors font-medium">
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={creating || !newTitle.trim()}
                className="flex-1 px-4 py-2.5 rounded-[10px_8px_12px_9px] bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create ✦'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pending tasks */}
      {pendingTasks.length === 0 && completedTasks.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-lg font-black mb-2">No tasks yet</h3>
          <p className="text-muted mb-6">Create your first task to get started</p>
          <button
            onClick={() => setShowCreate(true)}
            className="px-5 py-2.5 rounded-[10px_8px_12px_9px] bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            Add Task ✦
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingTasks.length > 0 && (
            <div>
              <h2 className="text-sm font-black text-muted mb-3 uppercase tracking-wide">Pending</h2>
              <div className="space-y-2">
                {pendingTasks.map((task, i) => (
                  <TaskItem key={task.id} task={task} priorityColors={priorityColors} priorityEmoji={priorityEmoji} updateTask={updateTask} deleteTask={deleteTask} index={i} />
                ))}
              </div>
            </div>
          )}
          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-sm font-black text-muted mb-3 uppercase tracking-wide">Completed ✓</h2>
              <div className="space-y-2">
                {completedTasks.map((task, i) => (
                  <TaskItem key={task.id} task={task} priorityColors={priorityColors} priorityEmoji={priorityEmoji} updateTask={updateTask} deleteTask={deleteTask} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TaskItem({ task, priorityColors, priorityEmoji, updateTask, deleteTask, index }: {
  task: Task;
  priorityColors: Record<string, string>;
  priorityEmoji: Record<string, string>;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  index: number;
}) {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-[14px_10px_16px_12px] border-2 border-border bg-surface group hover:border-primary/20 transition-all hand-placed ${task.completed ? 'opacity-60' : ''}`} style={{ animationDelay: `${index * 60}ms` }}>
      <button
        onClick={() => updateTask(task.id, { completed: !task.completed })}
        className={`flex-shrink-0 transition-all hover:scale-110 ${task.completed ? 'text-success' : 'text-muted hover:text-primary'}`}
      >
        {task.completed ? <Check size={20} /> : <Circle size={20} />}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold ${task.completed ? 'line-through text-muted' : ''}`}>{task.title}</p>
        {task.description && <p className="text-xs text-muted mt-0.5 truncate">{task.description}</p>}
        <div className="flex items-center gap-2 mt-1.5">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${priorityColors[task.priority]}`}>
            {priorityEmoji[task.priority]} {task.priority}
          </span>
          {task.due_date && <span className="text-[10px] text-muted font-medium">Due: {task.due_date}</span>}
        </div>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="p-2 rounded-[8px_6px_10px_7px] text-muted hover:text-danger hover:bg-danger/10 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
        aria-label="Delete task"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
