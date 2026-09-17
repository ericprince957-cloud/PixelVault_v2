import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email format';
    if (!subject.trim()) errs.subject = 'Subject is required';
    if (!message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (res.ok) {
        setStatus('sent');
        setName(''); setEmail(''); setSubject(''); setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="animate-fade-in max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Get in <span className="gradient-text">Touch</span></h1>
        <p className="text-muted">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      {status === 'sent' ? (
        <div className="text-center py-12 rounded-2xl border border-border bg-surface">
          <CheckCircle size={48} className="text-success mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Message Sent!</h2>
          <p className="text-muted mb-6">Thank you for reaching out. We'll get back to you soon.</p>
          <button onClick={() => setStatus('idle')} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors">
            Send Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-5">
          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-danger/10 border border-danger/20 text-sm text-danger">
              <AlertCircle size={16} /> Failed to send message. Please try again or email us directly.
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className={`w-full px-4 py-2.5 rounded-lg bg-background border ${errors.name ? 'border-danger' : 'border-border'} focus:border-primary focus:outline-none text-text placeholder:text-muted/50 transition-colors`}
              />
              {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 rounded-lg bg-background border ${errors.email ? 'border-danger' : 'border-border'} focus:border-primary focus:outline-none text-text placeholder:text-muted/50 transition-colors`}
              />
              {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="What's this about?"
              className={`w-full px-4 py-2.5 rounded-lg bg-background border ${errors.subject ? 'border-danger' : 'border-border'} focus:border-primary focus:outline-none text-text placeholder:text-muted/50 transition-colors`}
            />
            {errors.subject && <p className="text-xs text-danger mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Tell us more..."
              rows={5}
              className={`w-full px-4 py-2.5 rounded-lg bg-background border ${errors.message ? 'border-danger' : 'border-border'} focus:border-primary focus:outline-none text-text placeholder:text-muted/50 transition-colors resize-none`}
            />
            {errors.message && <p className="text-xs text-danger mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-colors disabled:opacity-50"
          >
            {status === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}
