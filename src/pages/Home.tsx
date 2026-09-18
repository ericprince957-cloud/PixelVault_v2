import { Link } from 'react-router-dom';
import { Search, Shield, FolderOpen, BarChart3, Zap, Star, ArrowRight, Heart } from 'lucide-react';

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
      {/* Hero Section - organic, handcrafted */}
      <section className="relative overflow-hidden">
        {/* Organic background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl" style={{ borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%' }} />
          <div className="absolute top-40 right-[15%] w-56 h-56 bg-accent/5 rounded-full blur-3xl" style={{ borderRadius: '58% 42% 37% 63% / 56% 59% 41% 44%' }} />
          <div className="absolute bottom-20 left-[30%] w-40 h-40 bg-warning/5 rounded-full blur-3xl" style={{ borderRadius: '37% 63% 42% 58% / 44% 41% 59% 56%' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              {/* Hand-placed badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px_8px_12px_9px] bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6 animate-wiggle" style={{ animationDuration: '4s' }}>
                <Heart size={12} fill="currentColor" /> made with love for creators
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
                Your digital world,{' '}
                <span className="gradient-text inline-block" style={{ transform: 'rotate(-1deg)' }}>organized</span>{' '}
                in one place.
              </h1>
              <p className="text-lg text-muted mb-8 max-w-lg leading-relaxed">
                Discover, organize, and manage your digital content with PixelVault. 
                A curated platform built for creators who value beautiful, thoughtful organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-[14px_10px_16px_12px] bg-primary hover:bg-primary-dark text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1 text-base"
                >
                  Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-[12px_14px_10px_16px] border-2 border-border hover:border-primary/50 hover:bg-surface-light text-text font-semibold transition-all duration-300 text-base"
                >
                  Explore ✦
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <span className="text-success text-lg">✦</span>
                  Free to start
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent text-lg">✦</span>
                  No credit card
                </div>
              </div>
            </div>

            {/* Product Preview - craft paper feel */}
            <div className="relative">
              <div className="relative rounded-[20px_16px_22px_14px] border-2 border-border bg-surface p-4 shadow-2xl shadow-primary/5 animate-float" style={{ animationDuration: '6s' }}>
                {/* Mock UI */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-danger/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                  <div className="flex-1 ml-3 h-6 rounded-[6px_8px_5px_7px] bg-surface-light" />
                </div>
                <div className="flex gap-3">
                  {/* Sidebar */}
                  <div className="w-36 hidden sm:block space-y-2">
                    <div className="h-7 rounded-[8px_6px_10px_7px] bg-primary/20 flex items-center px-2">
                      <div className="w-3 h-3 rounded-[3px_4px_3px_5px] bg-primary/40" />
                      <div className="ml-2 w-16 h-2 rounded-[3px_4px_3px_5px] bg-primary/30" />
                    </div>
                    {['Search', 'Favorites', 'Collections', 'Tasks'].map(item => (
                      <div key={item} className="h-7 rounded-[8px_6px_10px_7px] bg-surface-light/50 flex items-center px-2">
                        <div className="w-3 h-3 rounded-[3px_4px_3px_5px] bg-border" />
                        <div className="ml-2 w-14 h-2 rounded-[3px_4px_3px_5px] bg-border/60" />
                      </div>
                    ))}
                  </div>
                  {/* Content area */}
                  <div className="flex-1 space-y-3">
                    <div className="h-8 rounded-[8px_6px_10px_7px] bg-surface-light flex items-center px-3">
                      <Search size={12} className="text-muted" />
                      <div className="ml-2 w-24 h-2 rounded-[3px_4px_3px_5px] bg-border/60" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { color: '#7c3aed', rot: '-1deg' },
                        { color: '#ec4899', rot: '0.5deg' },
                        { color: '#22c55e', rot: '-0.5deg' },
                        { color: '#fbbf24', rot: '1deg' },
                      ].map((item, i) => (
                        <div key={i} className="aspect-square rounded-[10px_8px_12px_9px] border border-border overflow-hidden" style={{ transform: `rotate(${item.rot})` }}>
                          <div className="h-3/4" style={{ backgroundColor: item.color, opacity: 0.3 }} />
                          <div className="p-1.5 space-y-1">
                            <div className="w-3/4 h-1.5 rounded-[3px_4px_3px_5px] bg-border/60" />
                            <div className="w-1/2 h-1.5 rounded-[3px_4px_3px_5px] bg-border/40" />
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
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 text-2xl animate-bounce-soft" style={{ animationDuration: '3s' }}>✦</div>
              <div className="absolute -bottom-3 -left-3 text-xl animate-wiggle" style={{ animationDuration: '5s' }}>♡</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - craft paper feel */}
      <section className="border-y border-border bg-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10K+', label: 'Digital Assets', emoji: '📦' },
              { value: '50+', label: 'Categories', emoji: '🏷️' },
              { value: '5K+', label: 'Happy Users', emoji: '✨' },
              { value: '99.9%', label: 'Uptime', emoji: '⚡' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center p-4 rounded-[14px_10px_16px_12px] bg-surface/50 border border-border/50 hand-placed" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="text-2xl sm:text-3xl font-black gradient-text">{stat.value}</div>
                <div className="text-sm text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - handcrafted cards */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">
              Everything you need to{' '}
              <span className="gradient-text doodle-underline">stay organized</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto leading-relaxed">
              Thoughtful features designed to help you discover, organize, and manage your digital content with care.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group p-6 rounded-[16px_12px_18px_14px] border-2 border-border bg-surface/50 hover:bg-surface hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hand-placed craft-card"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-[12px_10px_14px_11px] bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:rotate-3 duration-300">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - personal, warm */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[24px_18px_28px_20px] overflow-hidden border-2 border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10" />
            <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" />
            {/* Decorative dots */}
            <div className="absolute top-6 right-6 text-primary/20 text-4xl">✦ ✦ ✦</div>
            <div className="absolute bottom-6 left-6 text-accent/20 text-2xl">♡ ♡</div>
            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">Ready to organize your digital world?</h2>
              <p className="text-muted mb-8 max-w-lg mx-auto leading-relaxed">
                Join thousands of creators and teams who use PixelVault to keep their digital assets organized and accessible.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[14px_10px_16px_12px] bg-primary hover:bg-primary-dark text-white font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1"
              >
                Start for Free <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
