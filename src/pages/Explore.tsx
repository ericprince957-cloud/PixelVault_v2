import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, Heart, Grid, List, Loader2, AlertCircle } from 'lucide-react';

const CATEGORIES = ['All', 'UI Design', 'Photography', 'Illustration', '3D Art', 'Typography', 'Motion', 'Branding'];

export default function Explore() {
  const { contentItems, loadingContent, error, fetchContent, favorites, toggleFavorite } = useApp();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'title' | 'creator'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (contentItems.length === 0) fetchContent();
  }, []);

  const filtered = useMemo(() => {
    let items = [...contentItems];
    
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(item =>
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.creator?.toLowerCase().includes(q) ||
        item.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    if (category !== 'All') {
      items = items.filter(item => item.category === category);
    }

    switch (sortBy) {
      case 'title':
        items.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      case 'creator':
        items.sort((a, b) => (a.creator || '').localeCompare(b.creator || ''));
        break;
      default:
        items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return items;
  }, [contentItems, search, category, sortBy]);

  if (loadingContent) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-wiggle">✦</div>
          <p className="text-muted">Loading treasures...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Hmm, something went wrong</h2>
          <p className="text-muted mb-4">{error}</p>
          <button onClick={fetchContent} className="px-5 py-2.5 rounded-[10px_8px_12px_9px] bg-primary text-white hover:bg-primary-dark transition-colors font-medium">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black mb-2 tracking-tight">Explore <span className="text-primary">✦</span></h1>
        <p className="text-muted">Discover curated digital gems from our collection</p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 mb-8">
        {/* Search bar - organic shape */}
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, creator, tags..."
            className="w-full pl-12 pr-4 py-3.5 rounded-[14px_10px_16px_12px] bg-surface border-2 border-border focus:border-primary focus:outline-none text-text placeholder:text-muted/60 transition-all duration-200"
          />
        </div>

        {/* Category chips - playful */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} className="text-muted" />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  category === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                    : 'bg-surface border-2 border-border text-muted hover:text-text hover:border-primary/30 hover:scale-105'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-[10px_8px_12px_9px] bg-surface border-2 border-border text-sm text-muted focus:outline-none focus:border-primary transition-colors"
            >
              <option value="newest">Newest first</option>
              <option value="title">Title A-Z</option>
              <option value="creator">Creator</option>
            </select>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2.5 rounded-[10px_8px_12px_9px] bg-surface border-2 border-border text-muted hover:text-text hover:border-primary/30 transition-colors"
              aria-label="Toggle view"
            >
              {viewMode === 'grid' ? <List size={16} /> : <Grid size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted mb-5 font-medium">
        {filtered.length} {filtered.length === 1 ? 'item' : 'items'} found {filtered.length > 0 && '✦'}
      </p>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-bold mb-2">No results found</h3>
          <p className="text-muted">Try adjusting your search or filters — something great is hiding in here!</p>
        </div>
      )}

      {/* Grid view - hand-placed cards */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item, i) => (
            <Link
              key={item.id}
              to={`/explore/${item.id}`}
              className="group rounded-[16px_12px_18px_14px] border-2 border-border bg-surface overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hand-placed"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Thumbnail */}
              <div
                className="aspect-[4/3] relative overflow-hidden"
                style={{ backgroundColor: item.color || '#7c3aed' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {item.thumbnail && (
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                )}
                <div className="absolute top-3 right-3">
                  {user && (
                    <button
                      onClick={e => { e.preventDefault(); toggleFavorite(item.id); }}
                      className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-200 ${
                        favorites.includes(item.id) ? 'bg-danger/80 text-white scale-110' : 'bg-black/30 text-white/80 hover:text-white hover:scale-110'
                      }`}
                      aria-label={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart size={16} fill={favorites.includes(item.id) ? 'currentColor' : 'none'} />
                    </button>
                  )}
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
                {item.creator && <p className="text-xs text-muted font-medium">by {item.creator}</p>}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-surface-light border border-border/50 text-muted font-medium">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* List view */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filtered.map(item => (
            <Link
              key={item.id}
              to={`/explore/${item.id}`}
              className="flex items-center gap-4 p-4 rounded-[14px_10px_16px_12px] border-2 border-border bg-surface hover:border-primary/40 transition-all group hover:-translate-y-0.5"
            >
              <div
                className="w-16 h-16 rounded-[12px_10px_14px_11px] flex-shrink-0"
                style={{ backgroundColor: item.color || '#7c3aed' }}
              >
                {item.thumbnail && <img src={item.thumbnail} alt="" className="w-full h-full object-cover rounded-[12px_10px_14px_11px]" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm group-hover:text-primary transition-colors truncate">{item.title}</h3>
                <p className="text-xs text-muted mt-0.5">by {item.creator} • {item.category}</p>
              </div>
              {user && (
                <button
                  onClick={e => { e.preventDefault(); toggleFavorite(item.id); }}
                  className={`p-2.5 rounded-full transition-all ${
                    favorites.includes(item.id) ? 'text-danger scale-110' : 'text-muted hover:text-danger hover:scale-110'
                  }`}
                >
                  <Heart size={18} fill={favorites.includes(item.id) ? 'currentColor' : 'none'} />
                </button>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
