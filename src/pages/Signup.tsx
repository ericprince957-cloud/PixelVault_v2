import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

export function Signup() {
  useDocumentHead({
    title: 'Create Account — PixelVault',
    description: 'Join PixelVault and start organizing your digital world. Create your free account today.',
    noindex: true,
  });

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, configured } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) { setError('Please fill in all fields'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setError('');
    const { error } = await signUp(email, password, fullName);
    setLoading(false);
    if (error) { setError(error); return; }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">✦</div>
          <h1 className="text-2xl font-black mb-2 tracking-tight">Create your account</h1>
          <p className="text-muted">Start organizing your digital world</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-[20px_16px_22px_18px] border-2 border-border bg-surface p-6 sm:p-8">
          {!configured && (
            <div className="p-3 rounded-[10px_8px_12px_9px] bg-warning/10 border border-warning/20 text-sm text-warning">
              ⚠️ Authentication not configured. Add Supabase credentials to enable signup.
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-[10px_8px_12px_9px] bg-danger/10 border border-danger/20 text-sm text-danger">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold mb-1.5" htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="w-full px-4 py-3 rounded-[12px_10px_14px_11px] bg-background border-2 border-border focus:border-primary focus:outline-none text-text placeholder:text-muted/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1.5" htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full px-4 py-3 rounded-[12px_10px_14px_11px] bg-background border-2 border-border focus:border-primary focus:outline-none text-text placeholder:text-muted/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1.5" htmlFor="signup-password">Password</label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full px-4 py-3 pr-10 rounded-[12px_10px_14px_11px] bg-background border-2 border-border focus:border-primary focus:outline-none text-text placeholder:text-muted/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1.5" htmlFor="signup-confirm">Confirm Password</label>
            <input
              id="signup-confirm"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-[12px_10px_14px_11px] bg-background border-2 border-border focus:border-primary focus:outline-none text-text placeholder:text-muted/50 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-[14px_10px_16px_12px] bg-primary hover:bg-primary-dark text-white font-bold transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            Create Account ✦
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary-light font-bold">Sign in →</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
