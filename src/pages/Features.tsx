import { Link } from 'react-router-dom';
import { Search, FolderOpen, Shield, Zap, Star, BarChart3, ArrowRight } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: FolderOpen,
      title: 'Smart Organization',
      desc: 'Organize your digital assets into collections with intelligent categorization. Tag, sort, and find exactly what you need without the clutter.',
      details: ['Custom collections', 'Auto-categorization', 'Tag-based organization', 'Drag & drop sorting'],
    },
    {
      icon: Search,
      title: 'Fast Search',
      desc: 'Find any asset instantly with powerful full-text search across titles, descriptions, tags, creators, and categories.',
      details: ['Full-text search', 'Filter by category', 'Sort by date/name', 'Search suggestions'],
    },
    {
      icon: Shield,
      title: 'Secure Storage',
      desc: 'Access-controlled storage with Row Level Security ensures your data stays private and protected. Only you can access your favorites and collections.',
      details: ['Row Level Security', 'Encrypted connections', 'Per-user data isolation', 'Secure authentication'],
    },
    {
      icon: Zap,
      title: 'Easy Access',
      desc: 'Access your curated content from any device, anytime. Your vault travels with you across desktop, tablet, and mobile.',
      details: ['Responsive design', 'Mobile-optimized', 'Fast loading', 'Offline-ready UI'],
    },
    {
      icon: Star,
      title: 'Collections',
      desc: 'Create custom collections to group related content. Perfect for projects, mood boards, client work, or personal inspiration.',
      details: ['Unlimited collections', 'Add/remove items', 'Rename collections', 'Quick access'],
    },
    {
      icon: BarChart3,
      title: 'Simple Dashboard',
      desc: 'Get a clear overview of your activity, favorites, and collections all in one place. Stay on top of your digital world.',
      details: ['Activity feed', 'Quick stats', 'Recent items', 'Plan overview'],
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Powerful features for{' '}
            <span className="gradient-text">digital creators</span>
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Everything you need to discover, organize, and manage your digital content — all in one beautiful platform.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group p-6 sm:p-8 rounded-2xl border border-border bg-surface hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted mb-4 leading-relaxed">{feature.desc}</p>
              <ul className="grid grid-cols-2 gap-2">
                {feature.details.map(detail => (
                  <li key={detail} className="flex items-center gap-2 text-sm text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-border p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to get organized?</h2>
          <p className="text-muted mb-6 max-w-lg mx-auto">
            Join thousands of creators using PixelVault to manage their digital world.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-all"
          >
            Start for Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
