import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Heart, FolderOpen, CheckSquare, Activity, Clock, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  useDocumentHead({
    title: 'Dashboard — PixelVault',
    description: 'Your PixelVault dashboard: overview of favorites, collections, tasks, and recent activity.',
    noindex: true,
  });
  const { user, profile } = useAuth();
  const { favorites, collections, tasks, activities, contentItems } = useApp();

  const stats = [
    { label: 'Favorites', value: favorites.length, icon: Heart, color: 'text-danger', bg: 'bg-danger/10', link: '/favorites', emoji: '♡' },
    { label: 'Collections', value: collections.length, icon: FolderOpen, color: 'text-primary', bg: 'bg-primary/10', link: '/collections', emoji: '📁' },
    { label: 'Tasks', value: tasks.filter(t => !t.completed).length, icon: CheckSquare, color: 'text-success', bg: 'bg-success/10', link: '/tasks', emoji: '✓' },
    { label: 'Activities', value: activities.length, icon: Activity, color: 'text-accent', bg: 'bg-accent/10', link: '#', emoji: '⚡' },
  ];

  const recentContent = contentItems.slice(0, 6);
  const recentActivities = activities.slice(0, 8);

  const formatAction = (action: string) => {
    const map: Record<string, string> = {
      'added_favorite': '♡ Added to favorites',
      'removed_favorite': 'Removed from favorites',
      'created_collection': '📁 Created collection',
      'created_task': '✓ Created task',
      'completed_task': '✓✓ Completed task',
    };
    return map[action] || action;
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header - personal, warm */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black mb-1 tracking-tight">
          Hey{profile?.full_name ? ` ${profile.full_name.split(' ')[0]}` : ' there'} ✦
        </h1>
        <p className="text-muted">Here's what's happening in your vault today</p>
      </div>

      {/* Stats - craft cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="p-4 sm:p-5 rounded-[16px_12px_18px_14px] border-2 border-border bg-surface hover:border-primary/40 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hand-placed"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-[12px_10px_14px_11px] ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <ArrowRight size={16} className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-2xl font-black">{stat.value}</p>
            <p className="text-sm text-muted font-medium">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Content */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Recent Content</h2>
            <Link to="/explore" className="text-sm text-primary hover:text-primary-light font-medium">View all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentContent.map((item, i) => (
              <Link
                key={item.id}
                to={`/explore/${item.id}`}
                className="flex items-center gap-3 p-3 rounded-[14px_10px_16px_12px] border-2 border-border bg-surface hover:border-primary/40 transition-all group hover:-translate-y-0.5 hand-placed"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-[10px_8px_12px_9px] flex-shrink-0"
                  style={{ backgroundColor: item.color || '#f59e0b' }}
                >
                  {item.thumbnail && <img src={item.thumbnail} alt={`${item.title} preview`} className="w-full h-full object-cover rounded-[10px_8px_12px_9px]" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold group-hover:text-primary transition-colors truncate">{item.title}</p>
                  <p className="text-xs text-muted">{item.category}</p>
                </div>
              </Link>
            ))}
            {recentContent.length === 0 && (
              <div className="col-span-2 text-center py-8 text-muted">
                <p className="text-3xl mb-2">📭</p>
                <p>No content yet.</p>
                <Link to="/explore" className="text-primary text-sm mt-2 inline-block font-medium">Explore content →</Link>
              </div>
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Activity</h2>
            <Clock size={16} className="text-muted" />
          </div>
          <div className="rounded-[16px_12px_18px_14px] border-2 border-border bg-surface overflow-hidden">
            {recentActivities.length === 0 ? (
              <div className="p-6 text-center text-muted text-sm">
                <div className="text-3xl mb-2">📝</div>
                <p className="font-medium">No activity yet</p>
                <p className="text-xs mt-1">Your actions will show up here</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="px-4 py-3 hover:bg-surface-light/50 transition-colors">
                    <p className="text-sm font-medium">{formatAction(activity.action)}</p>
                    {activity.target && (
                      <p className="text-xs text-muted mt-0.5 truncate">{activity.target}</p>
                    )}
                    <p className="text-xs text-muted/60 mt-1">
                      {new Date(activity.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Collections preview */}
      {collections.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Your Collections</h2>
            <Link to="/collections" className="text-sm text-primary hover:text-primary-light font-medium">View all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.slice(0, 3).map((col, i) => (
              <div key={col.id} className="p-4 rounded-[14px_10px_16px_12px] border-2 border-border bg-surface hand-placed hover:border-primary/30 transition-all" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px_10px_14px_11px] bg-primary/10 flex items-center justify-center">
                    <FolderOpen size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{col.name}</p>
                    <p className="text-xs text-muted">{new Date(col.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plan info */}
      <div className="mt-8 p-5 rounded-[16px_12px_18px_14px] border-2 border-border bg-surface">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted font-medium">Current Plan</p>
            <p className="text-lg font-black capitalize">{profile?.plan || 'free'} ✦</p>
          </div>
          <Link
            to="/pricing"
            className="px-4 py-2 rounded-[10px_8px_12px_9px] bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors border border-primary/20"
          >
            Upgrade →
          </Link>
        </div>
      </div>
    </div>
  );
}
