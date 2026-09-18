import { Link } from 'react-router-dom';
import { Search, FolderOpen, Shield, Zap, Star, BarChart3, ArrowRight } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: FolderOpen,
      title: 'Smart Organization',
      desc: 'Organize your digital assets into collections with intelligent categorization. Tag, sort, and find exactly what you need without the clutter.',
      details: ['Custom collections', 'Auto-categorization', 'Tag-based organization', 'Drag & drop sorting'],
      emoji: '📁',
    },
    {
      icon: Search,
      title: 'Fast Search',
      desc: 'Find any asset instantly with powerful full-text search across titles, descriptions, tags, creators, and categories.',
      details: ['Full-text search', 'Filter by category', 'Sort by date/name', 'Search suggestions'],
      emoji: '🔍',
    },
    {
      icon: Shield,
      title: 'Secure Storage',
      desc: 'Access-controlled storage with Row Level Security ensures your data stays private and protected. Only you can access your favorites and collections.',
      details: ['Row Level Security', 'Encrypted connections', 'Per-user data isolation', 'Secure authentication'],
      emoji: '🔒',
    },
    {
      icon: Zap,
      title: 'Easy Access',
      desc: 'Access your curated content from any device, anytime. Your vault travels with you across desktop, tablet, and mobile.',
      details: ['Responsive design', 'Mobile-optimized', 'Fast loading', 'Offline-ready UI'],
      emoji: '⚡',
    },
    {
      icon: Star,
      title: 'Collections',
      desc: 'Create custom collections to group related content. Perfect for projects, mood boards, client work, or personal inspiration.',
      details: ['Unlimited collections', 'Add/remove items', 'Rename collections', 'Quick access'],
      emoji: '⭐',
    },
    {
      icon: BarChart3,
      title: 'Simple Dashboard',
      desc: 'Get a clear overview of your activity, favorites, and collections all in one place. Stay on top of your digital world.',
      details: ['Activity feed', 'Quick stats', 'Recent items', 'Plan overview'],
      emoji: '📊',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="text-4xl mb-4">✦ ✦ ✦</div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">
            Powerful features for{' '}
            <span className="gradient-text doodle-underline">digital creators</span>
          </h1>
          <p className="text-muted max-w-2xl mx-auto leading-relaxed">
            Everything you need to discover, organize, and manage your digital content — all in one beautiful, handcrafted platform.
          </p>
        </div>

        {/* Feature cards - craft paper */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group p-6 sm:p-8 rounded-[20px_16px_22px_18px] border-2 border-border bg-surface hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hand-placed"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-[14px_10px_16px_12px] bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors group-hover:rotate-3 duration-300">
                  <feature.icon size={26} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-black">{feature.title}</h3>
                    <span className="text-lg">{feature.emoji}</span>
                  </div>
                  <p className="text-muted mb-4 leading-relaxed text-sm">{feature.desc}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {feature.details.map(detail => (
                      <li key={detail} className="flex items-center gap-2 text-sm text-muted">
                        <span className="text-primary">✦</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-[24px_18px_28px_20px] bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-2 border-border p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-4 right-4 text-primary/20 text-3xl">✦</div>
          <div className="absolute bottom-4 left-4 text-accent/20 text-2xl">♡</div>
          <h2 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight">Ready to get organized?</h2>
          <p className="text-muted mb-6 max-w-lg mx-auto leading-relaxed">
            Join thousands of creators using PixelVault to manage their digital world.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-[14px_10px_16px_12px] bg-primary hover:bg-primary-dark text-white font-bold text-lg transition-all hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1"
          >
            Start for Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
