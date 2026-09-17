import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Heart, Loader2 } from 'lucide-react';

export default function Favorites() {
  const { contentItems, favorites, toggleFavorite, loadingFavorites } = useApp();
  const favoriteItems = contentItems.filter(item => favorites.includes(item.id));

  if (loadingFavorites) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Favorites</h1>
        <p className="text-muted">Your saved digital assets</p>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center mx-auto mb-4">
            <Heart size={24} className="text-muted" />
          </div>
          <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
          <p className="text-muted mb-6">Start exploring and save items you love</p>
          <Link to="/explore" className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors">
            Explore Content
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favoriteItems.map(item => (
            <div
              key={item.id}
              className="group rounded-2xl border border-border bg-surface overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <Link to={`/explore/${item.id}`}>
                <div className="aspect-[4/3] relative overflow-hidden" style={{ backgroundColor: item.color || '#6366f1' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" loading="lazy" />}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-xs text-white">{item.category}</span>
                  </div>
                </div>
              </Link>
              <div className="p-4 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link to={`/explore/${item.id}`} className="font-medium text-sm hover:text-primary transition-colors line-clamp-1">{item.title}</Link>
                  {item.creator && <p className="text-xs text-muted mt-0.5">{item.creator}</p>}
                </div>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="p-1.5 rounded-full text-danger hover:bg-danger/10 transition-colors flex-shrink-0"
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
