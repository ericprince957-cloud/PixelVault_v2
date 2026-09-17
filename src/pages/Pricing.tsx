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
    },
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Simple, transparent <span className="gradient-text">pricing</span>
        </h1>
        <p className="text-muted max-w-lg mx-auto">
          Choose the plan that fits your needs. Upgrade or downgrade at any time.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-6 sm:p-8 transition-all ${
              plan.popular
                ? 'border-primary bg-surface shadow-lg shadow-primary/10'
                : 'border-border bg-surface hover:border-primary/30'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-white text-xs font-medium">
                Most Popular
              </div>
            )}
            <div className="mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                plan.popular ? 'bg-primary/10' : 'bg-surface-light'
              }`}>
                <plan.icon size={24} className={plan.popular ? 'text-primary' : 'text-muted'} />
              </div>
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-muted">{plan.desc}</p>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-muted text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check size={16} className={plan.popular ? 'text-primary' : 'text-success'} />
                  <span className="text-muted">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/signup"
              className={`block text-center px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                plan.popular
                  ? 'bg-primary hover:bg-primary-dark text-white'
                  : 'border border-border hover:border-primary/50 text-text hover:bg-surface-light'
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
