import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight, Menu, X, User as UserIcon, LogOut, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { User, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { VenaLogo } from './VenaLogo';

interface NavbarProps {
  language?: 'ko' | 'en';
  onToggleLanguage?: () => void;
  onOpenInquiry: (initialPackage?: string) => void;
  onOpenMyInquiries: () => void;
  inquiryCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  language = 'ko',
  onToggleLanguage,
  onOpenInquiry,
  onOpenMyInquiries,
  inquiryCount,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setAuthLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign-out failed:', err);
    }
  };

  const isKo = language === 'ko';
  const navLinks = isKo
    ? [
        { label: 'About', href: '#about' },
        { label: '서비스', href: '#services' },
        { label: 'Why VENA', href: '#why-vena' },
        { label: '고객사', href: '#who-we-work-with' },
        { label: '패키지', href: '#packages' },
      ]
    : [
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Why VENA', href: '#why-vena' },
        { label: 'Clients', href: '#who-we-work-with' },
        { label: 'Packages', href: '#packages' },
      ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200/80 py-3 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-zinc-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <VenaLogo size="md" variant="dark" />
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wider uppercase font-semibold text-zinc-600">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-zinc-950 transition-colors duration-200">
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="px-2.5 py-1 rounded-full border border-zinc-200 bg-white text-[11px] font-bold text-zinc-700 hover:border-zinc-300 hover:text-zinc-950 transition-colors"
          >
            {language === 'ko' ? 'EN' : 'KR'}
          </button>
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 rounded-full py-1 pl-2 pr-3 text-xs">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-6 h-6 rounded-full border border-zinc-300 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-700">
                  <UserIcon className="w-3.5 h-3.5" />
                </div>
              )}
              <span className="text-zinc-800 max-w-[100px] truncate text-[11px] font-semibold">
                {user.displayName || user.email?.split('@')[0]}
              </span>
              <button
                id="btn-my-inquiries"
                onClick={onOpenMyInquiries}
                className="ml-1 text-zinc-600 hover:text-zinc-950 p-1 transition-colors relative"
                title="내 프로젝트 문의 내역"
              >
                <FileText className="w-3.5 h-3.5" />
                {inquiryCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 text-[9px] font-bold text-white rounded-full flex items-center justify-center">
                    {inquiryCount}
                  </span>
                )}
              </button>
              <button
                id="btn-signout"
                onClick={handleSignOut}
                className="text-zinc-400 hover:text-red-600 p-1 transition-colors"
                title="로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : null}

          <button
            type="button"
            onClick={onToggleLanguage}
            className="text-xs font-semibold px-3 py-2 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300 transition-all"
          >
            {isKo ? 'ENGLISH' : '한국어'}
          </button>

          <button
            id="btn-nav-inquiry"
            onClick={() => onOpenInquiry()}
            className="text-xs font-bold px-5 py-2.5 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 transition-all duration-200 flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
          >
            <span>{isKo ? '프로젝트 문의하기' : 'Request a project'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          id="btn-mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-700 hover:text-zinc-950 rounded-lg border border-zinc-200"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-6 py-6 mt-2 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 text-sm tracking-wider uppercase font-semibold text-zinc-700">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-zinc-950 border-b border-zinc-100"
            >
              About VENA
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-zinc-950 border-b border-zinc-100"
            >
              Services (01-06)
            </a>
            <a
              href="#why-vena"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-zinc-950 border-b border-zinc-100"
            >
              Why VENA
            </a>
            <a
              href="#who-we-work-with"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-zinc-950 border-b border-zinc-100"
            >
              Target Clients
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-zinc-950 border-b border-zinc-100"
            >
              Packages & Pricing
            </a>
          </nav>

          <div className="pt-3 flex flex-col gap-2.5">
            {user ? (
              <div className="flex items-center justify-between bg-zinc-50 p-3 rounded-xl border border-zinc-200 text-xs">
                <div className="flex items-center gap-2">
                  {user.photoURL && (
                    <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                  )}
                  <span className="text-zinc-900 font-medium">{user.displayName || user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenMyInquiries();
                    }}
                    className="text-zinc-700 hover:text-zinc-950 underline text-xs font-semibold"
                  >
                    내 문의내역
                  </button>
                  <button onClick={handleSignOut} className="text-red-500 text-xs font-semibold">
                    로그아웃
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-zinc-800 text-xs font-bold flex items-center justify-center gap-2"
              >
                <UserIcon className="w-4 h-4 text-zinc-500" />
                <span>Google 계정으로 로그인</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3 rounded-full bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <span>프로젝트 문의하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
