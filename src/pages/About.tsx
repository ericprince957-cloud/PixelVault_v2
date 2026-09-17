import { Link } from 'react-router-dom';
import { Users, Target, Lightbulb, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="gradient-text">PixelVault</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            PixelVault is a curated digital-asset discovery and organization platform built for 
            creators, designers, developers, and teams who value beautiful, efficient organization.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To help digital creators discover, organize, and manage their content efficiently — so they can focus on what matters most: creating.' },
            { icon: Users, title: 'Who It\'s For', desc: 'Designers, photographers, developers, digital marketers, agencies, students, and anyone who works with digital content daily.' },
            { icon: Lightbulb, title: 'How It Works', desc: 'Browse our curated catalog, save favorites, create collections, and manage tasks — all from one intuitive dashboard.' },
          ].map(item => (
            <div key={item.title} className="p-6 rounded-2xl border border-border bg-surface">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Simplicity', desc: 'Complex problems deserve simple solutions.' },
            { title: 'Security', desc: 'Your data is protected with access-controlled storage.' },
            { title: 'Speed', desc: 'Fast performance, even on constrained connections.' },
            { title: 'Craft', desc: 'Every detail matters in the experience we build.' },
          ].map(v => (
            <div key={v.title} className="p-5 rounded-xl border border-border bg-surface/50 text-center">
              <h4 className="font-semibold mb-1">{v.title}</h4>
              <p className="text-sm text-muted">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-border p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Join the PixelVault community</h2>
          <p className="text-muted mb-6">Start organizing your digital world today.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-all">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
