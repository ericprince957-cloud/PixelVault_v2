import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

export function Login() {
  useDocumentHead({
    title: 'Sign In — PixelVault',
    description: 'Sign in to your PixelVault account to access your curated digital assets, favorites, and collections.',
    noindex: true,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, configured } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setError('');
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) { setError(error); return; }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">✦</div>
          <h1 className="text-2xl font-black mb-2 tracking-tight">Welcome back!</h1>
          <p className="text-muted">Sign in to your PixelVault account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-[20px_16px_22px_18px] border-2 border-border bg-surface p-6 sm:p-8">
          {!configured && (
            <div className="p-3 rounded-[10px_8px_12px_9px] bg-warning/10 border border-warning/20 text-sm text-warning">
              ⚠️ Authentication not configured. Add Supabase credentials to enable login.
            </div>
          )}
          
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-[10px_8px_12px_9px] bg-danger/10 border border-danger/20 text-sm text-danger">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold mb-1.5" htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full px-4 py-3 rounded-[12px_10px_14px_11px] bg-background border-2 border-border focus:border-primary focus:outline-none text-text placeholder:text-muted/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1.5" htmlFor="login-password">Password</label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
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

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
              <input type="checkbox" className="rounded border-border accent-primary" />
              Remember me
            </label>
            <a href="#" className="text-sm text-primary hover:text-primary-light font-medium">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-[14px_10px_16px_12px] bg-primary hover:bg-primary-dark text-white font-bold transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            Sign In ✦
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:text-primary-light font-bold">Sign up →</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
