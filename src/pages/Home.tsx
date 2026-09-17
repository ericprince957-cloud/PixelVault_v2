import { Link } from 'react-router-dom';
import { Search, Shield, FolderOpen, BarChart3, Zap, Lock, ArrowRight, Star } from 'lucide-react';

export default function Home() {
  const features = [
    { icon: FolderOpen, title: 'Smart Organization', desc: 'Organize your digital assets into collections with intelligent categorization and tagging.' },
    { icon: Search, title: 'Fast Search', desc: 'Find any asset instantly with powerful search across titles, tags, creators, and categories.' },
    { icon: Shield, title: 'Secure Storage', desc: 'Access-controlled storage with Row Level Security ensures your data stays private and protected.' },
    { icon: Zap, title: 'Easy Access', desc: 'Access your curated content from any device, anytime. Your vault travels with you.' },
    { icon: Star, title: 'Collections', desc: 'Create custom collections to group related content. Perfect for projects, moods, or workflows.' },
    { icon: BarChart3, title: 'Simple Dashboard', desc: 'Get a clear overview of your activity, favorites, and collections all in one place.' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                <Lock size={12} /> Secure Digital Asset Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your Digital World,{' '}
                <span className="gradient-text">Organized in One Place.</span>
              </h1>
              <p className="text-lg text-muted mb-8 max-w-lg">
                Discover, organize, and manage your digital content with PixelVault. 
                A curated platform built for creators, designers, and teams who value 
                beautiful organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
                >
                  Get Started <ArrowRight size={18} />
                </Link>
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border hover:border-primary/50 hover:bg-surface-light text-text font-medium transition-all duration-200"
                >
                  Explore PixelVault
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  Free to start
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  No credit card required
                </div>
              </div>
            </div>

            {/* Product Preview */}
            <div className="relative">
              <div className="relative rounded-2xl border border-border bg-surface p-4 shadow-2xl shadow-primary/5">
                {/* Mock UI */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-danger/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                  <div className="flex-1 ml-3 h-6 rounded-md bg-surface-light" />
                </div>
                <div className="flex gap-3">
                  {/* Sidebar */}
                  <div className="w-36 hidden sm:block space-y-2">
                    <div className="h-7 rounded-md bg-primary/20 flex items-center px-2">
                      <div className="w-3 h-3 rounded bg-primary/40" />
                      <div className="ml-2 w-16 h-2 rounded bg-primary/30" />
                    </div>
                    {['Search', 'Favorites', 'Collections', 'Tasks'].map(item => (
                      <div key={item} className="h-7 rounded-md bg-surface-light/50 flex items-center px-2">
                        <div className="w-3 h-3 rounded bg-border" />
                        <div className="ml-2 w-14 h-2 rounded bg-border/60" />
                      </div>
                    ))}
                  </div>
                  {/* Content area */}
                  <div className="flex-1 space-y-3">
                    <div className="h-8 rounded-md bg-surface-light flex items-center px-3">
                      <Search size={12} className="text-muted" />
                      <div className="ml-2 w-24 h-2 rounded bg-border/60" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {['#6366f1', '#8b5cf6', '#10b981', '#f59e0b'].map((color, i) => (
                        <div key={i} className="aspect-square rounded-lg border border-border overflow-hidden">
                          <div className="h-3/4" style={{ backgroundColor: color, opacity: 0.3 }} />
                          <div className="p-1.5 space-y-1">
                            <div className="w-3/4 h-1.5 rounded bg-border/60" />
                            <div className="w-1/2 h-1.5 rounded bg-border/40" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 rounded-full bg-primary/10 border border-primary/20 px-2 flex items-center">
                        <div className="w-8 h-1.5 rounded bg-primary/30" />
                      </div>
                      <div className="h-6 rounded-full bg-surface-light border border-border px-2 flex items-center">
                        <div className="w-10 h-1.5 rounded bg-border/40" />
                      </div>
                      <div className="h-6 rounded-full bg-surface-light border border-border px-2 flex items-center">
                        <div className="w-8 h-1.5 rounded bg-border/40" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-3xl blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Digital Assets' },
              { value: '50+', label: 'Categories' },
              { value: '5K+', label: 'Active Users' },
              { value: '99.9%', label: 'Uptime' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to{' '}
              <span className="gradient-text">stay organized</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Powerful features designed to help you discover, organize, and manage your digital content efficiently.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-border bg-surface/50 hover:bg-surface hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20" />
            <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" />
            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to organize your digital world?</h2>
              <p className="text-muted mb-8 max-w-lg mx-auto">
                Join thousands of creators and teams who use PixelVault to keep their digital assets organized and accessible.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
              >
                Start for Free <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
