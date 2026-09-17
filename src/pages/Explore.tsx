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
    
    // Search filter
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

    // Category filter
    if (category !== 'All') {
      items = items.filter(item => item.category === category);
    }

    // Sort
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
          <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <AlertCircle size={48} className="text-danger mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted mb-4">{error}</p>
          <button onClick={fetchContent} className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors">
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
        <h1 className="text-3xl font-bold mb-2">Explore</h1>
        <p className="text-muted">Discover curated digital assets from our collection</p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 mb-8">
        {/* Search bar */}
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, creator, tags..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:outline-none text-text placeholder:text-muted/60 transition-colors"
          />
        </div>

        {/* Category chips */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} className="text-muted" />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  category === cat
                    ? 'bg-primary text-white'
                    : 'bg-surface border border-border text-muted hover:text-text hover:border-primary/30'
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
              className="px-3 py-1.5 rounded-lg bg-surface border border-border text-sm text-muted focus:outline-none focus:border-primary"
            >
              <option value="newest">Newest</option>
              <option value="title">Title A-Z</option>
              <option value="creator">Creator</option>
            </select>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 rounded-lg bg-surface border border-border text-muted hover:text-text transition-colors"
              aria-label="Toggle view"
            >
              {viewMode === 'grid' ? <List size={16} /> : <Grid size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted mb-4">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-muted" />
          </div>
          <h3 className="text-lg font-medium mb-2">No results found</h3>
          <p className="text-muted">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Grid view */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item, i) => (
            <Link
              key={item.id}
              to={`/explore/${item.id}`}
              className="group rounded-2xl border border-border bg-surface overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Thumbnail */}
              <div
                className="aspect-[4/3] relative overflow-hidden"
                style={{ backgroundColor: item.color || '#6366f1' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {item.thumbnail && (
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                )}
                <div className="absolute top-3 right-3">
                  {user && (
                    <button
                      onClick={e => { e.preventDefault(); toggleFavorite(item.id); }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                        favorites.includes(item.id) ? 'bg-danger/80 text-white' : 'bg-black/30 text-white/80 hover:text-white'
                      }`}
                      aria-label={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart size={16} fill={favorites.includes(item.id) ? 'currentColor' : 'none'} />
                    </button>
                  )}
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-xs text-white">
                    {item.category}
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="p-4">
                <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
                {item.creator && <p className="text-xs text-muted">{item.creator}</p>}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] bg-surface-light text-muted">{tag}</span>
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
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all group"
            >
              <div
                className="w-16 h-16 rounded-lg flex-shrink-0"
                style={{ backgroundColor: item.color || '#6366f1' }}
              >
                {item.thumbnail && <img src={item.thumbnail} alt="" className="w-full h-full object-cover rounded-lg" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">{item.title}</h3>
                <p className="text-xs text-muted mt-0.5">{item.creator} • {item.category}</p>
              </div>
              {user && (
                <button
                  onClick={e => { e.preventDefault(); toggleFavorite(item.id); }}
                  className={`p-2 rounded-full transition-all ${
                    favorites.includes(item.id) ? 'text-danger' : 'text-muted hover:text-danger'
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
