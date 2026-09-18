import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Heart, Loader2 } from 'lucide-react';

export default function Favorites() {
  const { contentItems, favorites, toggleFavorite, loadingFavorites } = useApp();
  const favoriteItems = contentItems.filter(item => favorites.includes(item.id));

  if (loadingFavorites) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-wiggle">♡</div>
          <p className="text-muted">Loading favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight">Favorites <span className="text-danger">♡</span></h1>
        <p className="text-muted">Your saved digital gems</p>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">💝</div>
          <h3 className="text-lg font-black mb-2">No favorites yet</h3>
          <p className="text-muted mb-6">Start exploring and save items you love</p>
          <Link to="/explore" className="px-5 py-2.5 rounded-[10px_8px_12px_9px] bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/20">
            Explore Content ✦
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favoriteItems.map((item, i) => (
            <div
              key={item.id}
              className="group rounded-[16px_12px_18px_14px] border-2 border-border bg-surface overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hand-placed"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Link to={`/explore/${item.id}`}>
                <div className="aspect-[4/3] relative overflow-hidden" style={{ backgroundColor: item.color || '#7c3aed' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white font-medium">{item.category}</span>
                  </div>
                </div>
              </Link>
              <div className="p-4 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link to={`/explore/${item.id}`} className="font-bold text-sm hover:text-primary transition-colors line-clamp-1">{item.title}</Link>
                  {item.creator && <p className="text-xs text-muted mt-0.5">by {item.creator}</p>}
                </div>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="p-2 rounded-full text-danger hover:bg-danger/10 transition-all flex-shrink-0 hover:scale-110"
                  aria-label="Remove from favorites"
                >
                  <Heart size={16} fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
