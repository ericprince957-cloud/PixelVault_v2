import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is PixelVault?',
    a: 'PixelVault is a curated digital-asset discovery and organization platform. It helps creators, designers, and teams discover, organize, and manage their digital content in one beautiful place.',
  },
  {
    q: 'Is PixelVault free to use?',
    a: 'Yes! PixelVault offers a free plan with access to the curated catalog, up to 10 favorites, and 1 collection. For more features, check out our Pro and Business plans.',
  },
  {
    q: 'Can I upload my own content?',
    a: 'PixelVault is currently a curated platform. Our team carefully selects and adds content to the catalog. We\'re exploring user-upload features for future releases.',
  },
  {
    q: 'How secure is my data?',
    a: 'We use Supabase with Row Level Security (RLS) to ensure your data is access-controlled. Only you can see your favorites, collections, and tasks. All connections are encrypted.',
  },
  {
    q: 'Can I use PixelVault on mobile?',
    a: 'Absolutely! PixelVault is fully responsive and optimized for mobile devices. We\'ve designed it to work beautifully on phones, tablets, and desktops.',
  },
  {
    q: 'How do payments work?',
    a: 'We use Paystack for secure payment processing. You can pay in NGN using various methods including cards, bank transfers, and mobile money.',
  },
  {
    q: 'Can I cancel my subscription?',
    a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.',
  },
  {
    q: 'Do you offer team plans?',
    a: 'Yes! Our Business plan includes team collaboration features, shared collections, and dedicated support. Contact us for custom pricing.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="animate-fade-in max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h1>
        <p className="text-muted">Everything you need to know about PixelVault</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-surface overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-light/50 transition-colors"
              aria-expanded={openIndex === i}
            >
              <span className="font-medium pr-4">{faq.q}</span>
              <ChevronDown
                size={20}
                className={`text-muted flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 animate-fade-in">
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
