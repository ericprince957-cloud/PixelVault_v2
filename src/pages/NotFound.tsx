import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useDocumentHead } from '../hooks/useDocumentHead';

export default function NotFound() {
  useDocumentHead({
    title: 'Page Not Found — PixelVault',
    description: 'The page you are looking for does not exist. Return to the PixelVault homepage.',
    noindex: true,
  });
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="text-8xl font-black gradient-text mb-4" style={{ transform: 'rotate(-2deg)' }}>404</div>
        <div className="text-4xl mb-4 animate-wiggle">🗝️</div>
        <h1 className="text-2xl font-black mb-3 tracking-tight">Oops! This page got lost in the vault.</h1>
        <p className="text-muted mb-8 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-[14px_10px_16px_12px] bg-primary hover:bg-primary-dark text-white font-bold text-lg transition-all hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1"
        >
          <Home size={20} /> Return Home
        </Link>
      </div>
    </div>
  );
}
