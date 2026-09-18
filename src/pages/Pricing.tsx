import { Link } from 'react-router-dom';
import { Check, Zap, Building2, Crown } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '₦0',
      period: '/month',
      desc: 'Perfect for getting started',
      icon: Zap,
      features: ['Access to curated catalog', 'Up to 10 favorites', '1 collection', 'Basic search', 'Community support'],
      cta: 'Get Started',
      popular: false,
      emoji: '🌱',
    },
    {
      name: 'Pro',
      price: '₦5,000',
      period: '/month',
      desc: 'For serious creators',
      icon: Crown,
      features: ['Everything in Free', 'Unlimited favorites', 'Unlimited collections', 'Advanced search & filters', 'Priority support', 'Task management', 'Activity tracking'],
      cta: 'Upgrade to Pro',
      popular: true,
      emoji: '⭐',
    },
    {
      name: 'Business',
      price: '₦15,000',
      period: '/month',
      desc: 'For teams and agencies',
      icon: Building2,
      features: ['Everything in Pro', 'Team collaboration', 'Shared collections', 'API access', 'Dedicated support', 'Custom branding', 'Analytics dashboard'],
      cta: 'Contact Sales',
      popular: false,
      emoji: '🏢',
    },
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <div className="text-4xl mb-4">✦ ✦ ✦</div>
        <h1 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">
          Simple, transparent <span className="gradient-text doodle-underline">pricing</span>
        </h1>
        <p className="text-muted max-w-lg mx-auto leading-relaxed">
          Choose the plan that fits your needs. Upgrade or downgrade at any time. No hidden fees, no surprises.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className={`relative rounded-[20px_16px_22px_18px] border-2 p-6 sm:p-8 transition-all hand-placed ${
              plan.popular
                ? 'border-primary bg-surface shadow-xl shadow-primary/10 scale-105'
                : 'border-border bg-surface hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5'
            }`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-lg shadow-primary/30">
                ✦ Most Popular
              </div>
            )}
            <div className="mb-6">
              <div className="text-3xl mb-3">{plan.emoji}</div>
              <div className={`w-12 h-12 rounded-[14px_10px_16px_12px] flex items-center justify-center mb-4 ${
                plan.popular ? 'bg-primary/10' : 'bg-surface-light'
              }`}>
                <plan.icon size={24} className={plan.popular ? 'text-primary' : 'text-muted'} />
              </div>
              <h3 className="text-xl font-black mb-1">{plan.name}</h3>
              <p className="text-sm text-muted">{plan.desc}</p>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-black">{plan.price}</span>
              <span className="text-muted text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <span className={plan.popular ? 'text-primary' : 'text-success'}>✦</span>
                  <span className="text-muted">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/signup"
              className={`block text-center px-4 py-3.5 rounded-[12px_10px_14px_11px] font-bold text-sm transition-all ${
                plan.popular
                  ? 'bg-primary hover:bg-primary-dark text-white hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5'
                  : 'border-2 border-border hover:border-primary/50 text-text hover:bg-surface-light'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
