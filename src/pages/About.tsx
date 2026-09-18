import { Link } from 'react-router-dom';
import { Users, Target, Lightbulb, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          <div className="text-4xl mb-4">✦</div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">
            About <span className="gradient-text doodle-underline">PixelVault</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            PixelVault is a curated digital-asset discovery and organization platform built for 
            creators, designers, developers, and teams who value beautiful, thoughtful organization.
          </p>
          <p className="text-muted mt-4 leading-relaxed">
            We believe that organizing digital content should feel as creative as the content itself. 
            That's why we've crafted every detail with care — from the organic shapes to the warm interactions.
          </p>
        </div>
      </section>

      {/* Mission - craft cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To help digital creators discover, organize, and manage their content efficiently — so they can focus on what matters most: creating.', emoji: '🎯' },
            { icon: Users, title: 'Who It\'s For', desc: 'Designers, photographers, developers, digital marketers, agencies, students, and anyone who works with digital content daily.', emoji: '👥' },
            { icon: Lightbulb, title: 'How It Works', desc: 'Browse our curated catalog, save favorites, create collections, and manage tasks — all from one intuitive dashboard.', emoji: '💡' },
          ].map((item, i) => (
            <div key={item.title} className="p-6 rounded-[18px_14px_20px_16px] border-2 border-border bg-surface hand-placed hover:border-primary/30 transition-all" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-2xl mb-3">{item.emoji}</div>
              <div className="w-12 h-12 rounded-[14px_10px_16px_12px] bg-primary/10 flex items-center justify-center mb-4">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-black mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-black mb-8 text-center tracking-tight">Our Values <span className="text-primary">✦</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Simplicity', desc: 'Complex problems deserve simple solutions.', emoji: '✨' },
            { title: 'Security', desc: 'Your data is protected with access-controlled storage.', emoji: '🔒' },
            { title: 'Speed', desc: 'Fast performance, even on constrained connections.', emoji: '⚡' },
            { title: 'Craft', desc: 'Every detail matters in the experience we build.', emoji: '🎨' },
          ].map((v, i) => (
            <div key={v.title} className="p-5 rounded-[14px_10px_16px_12px] border-2 border-border bg-surface/50 text-center hand-placed hover:border-primary/30 transition-all" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="text-2xl mb-2">{v.emoji}</div>
              <h4 className="font-black mb-1">{v.title}</h4>
              <p className="text-sm text-muted">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-[24px_18px_28px_20px] bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-2 border-border p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-4 right-4 text-primary/20 text-3xl">✦</div>
          <div className="absolute bottom-4 left-4 text-accent/20 text-2xl">♡</div>
          <h2 className="text-2xl font-black mb-4 tracking-tight">Join the PixelVault community</h2>
          <p className="text-muted mb-6">Start organizing your digital world today.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-7 py-4 rounded-[14px_10px_16px_12px] bg-primary hover:bg-primary-dark text-white font-bold text-lg transition-all hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1">
            Get Started <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
