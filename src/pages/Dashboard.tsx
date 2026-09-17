import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Heart, FolderOpen, CheckSquare, Activity, TrendingUp, Clock, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const { favorites, collections, tasks, activities, contentItems } = useApp();

  const stats = [
    { label: 'Favorites', value: favorites.length, icon: Heart, color: 'text-danger', bg: 'bg-danger/10', link: '/favorites' },
    { label: 'Collections', value: collections.length, icon: FolderOpen, color: 'text-primary', bg: 'bg-primary/10', link: '/collections' },
    { label: 'Tasks', value: tasks.filter(t => !t.completed).length, icon: CheckSquare, color: 'text-success', bg: 'bg-success/10', link: '/tasks' },
    { label: 'Activities', value: activities.length, icon: Activity, color: 'text-accent', bg: 'bg-accent/10', link: '#' },
  ];

  const recentContent = contentItems.slice(0, 6);
  const recentActivities = activities.slice(0, 8);

  const formatAction = (action: string) => {
    const map: Record<string, string> = {
      'added_favorite': 'Added to favorites',
      'removed_favorite': 'Removed from favorites',
      'created_collection': 'Created collection',
      'created_task': 'Created task',
      'completed_task': 'Completed task',
    };
    return map[action] || action;
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">
          Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''} 👋
        </h1>
        <p className="text-muted">Here's what's happening in your vault</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <Link
            key={stat.label}
            to={stat.link}
            className="p-4 sm:p-5 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <ArrowRight size={16} className="text-muted group-hover:text-primary transition-colors" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Content */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Content</h2>
            <Link to="/explore" className="text-sm text-primary hover:text-primary-light">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentContent.map(item => (
              <Link
                key={item.id}
                to={`/explore/${item.id}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all group"
              >
                <div
                  className="w-12 h-12 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: item.color || '#6366f1' }}
                >
                  {item.thumbnail && <img src={item.thumbnail} alt="" className="w-full h-full object-cover rounded-lg" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">{item.title}</p>
                  <p className="text-xs text-muted">{item.category}</p>
                </div>
              </Link>
            ))}
            {recentContent.length === 0 && (
              <div className="col-span-2 text-center py-8 text-muted">
                <p>No content available yet.</p>
                <Link to="/explore" className="text-primary text-sm mt-2 inline-block">Explore content →</Link>
              </div>
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Clock size={16} className="text-muted" />
          </div>
          <div className="rounded-xl border border-border bg-surface overflow-hidden">
            {recentActivities.length === 0 ? (
              <div className="p-6 text-center text-muted text-sm">
                <Activity size={24} className="mx-auto mb-2 opacity-50" />
                <p>No activity yet</p>
                <p className="text-xs mt-1">Your actions will appear here</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="px-4 py-3">
                    <p className="text-sm">{formatAction(activity.action)}</p>
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
            <h2 className="text-lg font-semibold">Your Collections</h2>
            <Link to="/collections" className="text-sm text-primary hover:text-primary-light">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.slice(0, 3).map(col => (
              <div key={col.id} className="p-4 rounded-xl border border-border bg-surface">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FolderOpen size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{col.name}</p>
                    <p className="text-xs text-muted">{new Date(col.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plan info */}
      <div className="mt-8 p-5 rounded-xl border border-border bg-surface">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Current Plan</p>
            <p className="text-lg font-semibold capitalize">{profile?.plan || 'free'}</p>
          </div>
          <Link
            to="/pricing"
            className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            Upgrade
          </Link>
        </div>
      </div>
    </div>
  );
}
