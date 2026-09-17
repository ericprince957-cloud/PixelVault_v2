import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Home, Compass, Sparkles, Info, Mail, LayoutDashboard, Heart, FolderOpen, CheckSquare, CreditCard, LogOut, User } from 'lucide-react';

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/features', label: 'Features', icon: Sparkles },
    { to: '/about', label: 'About', icon: Info },
    { to: '/contact', label: 'Contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">PV</span>
              </div>
              <span className="text-xl font-bold text-text">Pixel<span className="gradient-text">Vault</span></span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted hover:text-text hover:bg-surface-light'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-light transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{profile?.full_name?.[0] || 'U'}</span>
                    </div>
                    <span className="text-sm text-text">{profile?.full_name || 'User'}</span>
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-surface border border-border shadow-xl py-2 animate-fade-in">
                      <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted hover:text-text hover:bg-surface-light transition-colors">
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                      <Link to="/favorites" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted hover:text-text hover:bg-surface-light transition-colors">
                        <Heart size={16} /> Favorites
                      </Link>
                      <Link to="/collections" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted hover:text-text hover:bg-surface-light transition-colors">
                        <FolderOpen size={16} /> Collections
                      </Link>
                      <Link to="/tasks" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted hover:text-text hover:bg-surface-light transition-colors">
                        <CheckSquare size={16} /> Tasks
                      </Link>
                      <Link to="/pricing" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted hover:text-text hover:bg-surface-light transition-colors">
                        <CreditCard size={16} /> Pricing
                      </Link>
                      <hr className="my-2 border-border" />
                      <button onClick={() => { signOut(); setProfileOpen(false); }} className="flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-surface-light transition-colors w-full text-left">
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm text-muted hover:text-text transition-colors">
                    Log In
                  </Link>
                  <Link to="/signup" className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-medium transition-colors">
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-surface-light transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.to) ? 'bg-primary/10 text-primary' : 'text-muted hover:text-text hover:bg-surface-light'
                  }`}
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              ))}
              <hr className="border-border my-2" />
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted hover:text-text hover:bg-surface-light">
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <Link to="/favorites" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted hover:text-text hover:bg-surface-light">
                    <Heart size={18} /> Favorites
                  </Link>
                  <Link to="/collections" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted hover:text-text hover:bg-surface-light">
                    <FolderOpen size={18} /> Collections
                  </Link>
                  <Link to="/tasks" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted hover:text-text hover:bg-surface-light">
                    <CheckSquare size={18} /> Tasks
                  </Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-danger hover:bg-surface-light w-full text-left">
                    <LogOut size={18} /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-center text-sm text-muted border border-border hover:bg-surface-light">
                    Log In
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-center text-sm font-medium bg-primary text-white">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-bold text-xs">PV</span>
                </div>
                <span className="text-lg font-bold text-text">Pixel<span className="gradient-text">Vault</span></span>
              </Link>
              <p className="text-sm text-muted">Your digital world, organized in one place. Discover, organize, and manage your content.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/explore" className="text-sm text-muted hover:text-text transition-colors">Explore</Link></li>
                <li><Link to="/features" className="text-sm text-muted hover:text-text transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-sm text-muted hover:text-text transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-sm text-muted hover:text-text transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-sm text-muted hover:text-text transition-colors">Contact</Link></li>
                <li><Link to="/faq" className="text-sm text-muted hover:text-text transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-sm text-muted hover:text-text transition-colors">Help Center</Link></li>
                <li><a href="#" className="text-sm text-muted hover:text-text transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-muted hover:text-text transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted">© 2026 PixelVault. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted hover:text-text transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="text-muted hover:text-text transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
