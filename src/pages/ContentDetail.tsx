import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { ArrowLeft, Heart, Calendar, User, Tag, FolderOpen, Loader2 } from 'lucide-react';

export default function ContentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contentItems, favorites, toggleFavorite, collections, addToCollection, fetchCollections } = useApp();
  const { user } = useAuth();
  const [showCollections, setShowCollections] = useState(false);

  const item = contentItems.find(c => c.id === id);
  const related = item ? contentItems.filter(c => c.category === item.category && c.id !== item.id).slice(0, 4) : [];

  useDocumentHead({
    title: item ? `${item.title} — PixelVault` : 'Content Detail — PixelVault',
    description: item?.description || 'View details of this curated digital asset on PixelVault.',
  });

  useEffect(() => {
    if (user) fetchCollections();
  }, [user]);

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-wiggle">✦</div>
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-text mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={16} /> ← Back
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Hero image - organic shape */}
          <div
            className="aspect-video rounded-[20px_16px_22px_14px] overflow-hidden mb-6 relative border-2 border-border"
            style={{ backgroundColor: item.color || '#f59e0b' }}
          >
            {item.thumbnail && (
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Title & description */}
          <h1 className="text-2xl sm:text-3xl font-black mb-3 tracking-tight">{item.title}</h1>
          {item.description && (
            <p className="text-muted leading-relaxed mb-6">{item.description}</p>
          )}

          {/* Tags - playful pills */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-light border border-border text-xs text-muted font-medium hover:border-primary/30 transition-colors">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar - craft cards */}
        <div className="space-y-4">
          {/* Actions */}
          {user && (
            <div className="rounded-[16px_12px_18px_14px] border-2 border-border bg-surface p-4 space-y-3">
              <button
                onClick={() => toggleFavorite(item.id)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[12px_10px_14px_11px] font-bold text-sm transition-all ${
                  favorites.includes(item.id)
                    ? 'bg-danger/10 text-danger border-2 border-danger/20'
                    : 'bg-primary/10 text-primary border-2 border-primary/20 hover:bg-primary/20'
                }`}
              >
                <Heart size={16} fill={favorites.includes(item.id) ? 'currentColor' : 'none'} />
                {favorites.includes(item.id) ? 'Favorited ♡' : 'Add to Favorites'}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowCollections(!showCollections)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[12px_10px_14px_11px] bg-surface-light border-2 border-border text-sm text-muted hover:text-text transition-colors"
                >
                  <FolderOpen size={16} /> Add to Collection
                </button>
                {showCollections && (
                  <div className="absolute top-full mt-2 w-full rounded-[14px_10px_16px_12px] bg-surface border-2 border-border shadow-xl py-2 z-10 animate-fade-in">
                    {collections.length === 0 ? (
                      <p className="px-4 py-2 text-sm text-muted">No collections yet</p>
                    ) : (
                      collections.map(col => (
                        <button
                          key={col.id}
                          onClick={() => { addToCollection(col.id, item.id); setShowCollections(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-muted hover:text-text hover:bg-surface-light transition-colors font-medium"
                        >
                          📁 {col.name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Meta info */}
          <div className="rounded-[16px_12px_18px_14px] border-2 border-border bg-surface p-4 space-y-4">
            {item.creator && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px_6px_10px_7px] bg-primary/10 flex items-center justify-center">
                  <User size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted">Creator</p>
                  <p className="text-sm font-bold">{item.creator}</p>
                </div>
              </div>
            )}
            {item.category && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px_6px_10px_7px] bg-accent/10 flex items-center justify-center">
                  <Tag size={14} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted">Category</p>
                  <p className="text-sm font-bold">{item.category}</p>
                </div>
              </div>
            )}
            {item.date && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px_6px_10px_7px] bg-success/10 flex items-center justify-center">
                  <Calendar size={14} className="text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted">Date</p>
                  <p className="text-sm font-bold">{item.date}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related items */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-black mb-6 tracking-tight">More in {item.category} ✦</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map(rel => (
              <Link
                key={rel.id}
                to={`/explore/${rel.id}`}
                className="group rounded-[14px_10px_16px_12px] border-2 border-border bg-surface overflow-hidden hover:border-primary/40 transition-all hover:-translate-y-1 hand-placed"
              >
                <div className="aspect-[4/3]" style={{ backgroundColor: rel.color || '#f59e0b' }}>
                  {rel.thumbnail && <img src={rel.thumbnail} alt={`${rel.title} - related item`} className="w-full h-full object-cover" loading="lazy" />}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold group-hover:text-primary transition-colors truncate">{rel.title}</h3>
                  <p className="text-xs text-muted mt-0.5">by {rel.creator}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
