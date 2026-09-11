import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { ServicesSection } from './components/ServicesSection';
import { WhyVena } from './components/WhyVena';
import { WhoWeWorkWith } from './components/WhoWeWorkWith';
import { PackagesSection } from './components/PackagesSection';
import { AddonsSection } from './components/AddonsSection';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { ClientInquiriesDrawer } from './components/ClientInquiriesDrawer';
import { auth, fetchUserInquiries } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function App() {
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiriesDrawerOpen, setInquiriesDrawerOpen] = useState(false);
  const [selectedInitialPackage, setSelectedInitialPackage] = useState<string>('GROWTH');
  const [customQuoteData, setCustomQuoteData] = useState<any>(null);
  const [userInquiryCount, setUserInquiryCount] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const list = await fetchUserInquiries(user.uid, user.email || undefined);
          setUserInquiryCount(list.length);
        } catch (e) {
          console.warn('Could not fetch user inquiry count:', e);
        }
      } else {
        setUserInquiryCount(0);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOpenInquiry = (initialPackage = 'GROWTH') => {
    setSelectedInitialPackage(initialPackage);
    setCustomQuoteData(null);
    setInquiryModalOpen(true);
  };

  const handleProceedWithCustomQuote = (quoteData: any) => {
    setCustomQuoteData(quoteData);
    setSelectedInitialPackage(quoteData.selectedPackage);
    setInquiryModalOpen(true);
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRefreshInquiryCount = async () => {
    if (currentUser) {
      const list = await fetchUserInquiries(currentUser.uid, currentUser.email || undefined);
      setUserInquiryCount(list.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-zinc-900 selection:bg-zinc-900 selection:text-white font-sans">
      {/* Sticky Top Navigation */}
      <Navbar
        language={language}
        onToggleLanguage={() => setLanguage((prev) => (prev === 'ko' ? 'en' : 'ko'))}
        onOpenInquiry={handleOpenInquiry}
        onOpenMyInquiries={() => setInquiriesDrawerOpen(true)}
        inquiryCount={userInquiryCount}
      />

      <main>
        {/* Hero Section */}
        <Hero
          language={language}
          onOpenInquiry={() => handleOpenInquiry('GROWTH')}
          onExploreServices={handleScrollToServices}
        />

        {/* Philosophy: GLOBAL, MADE SIMPLE. */}
        <Philosophy language={language} onOpenInquiry={() => handleOpenInquiry('GROWTH')} />

        {/* Services: WHAT WE DO (01 to 06) */}
        <ServicesSection language={language} onOpenInquiry={handleOpenInquiry} />

        {/* Why VENA: 4 Pillars & Unified Flow */}
        <WhyVena language={language} />

        {/* Who We Work With: 01 to 06 Target Profiles */}
        <WhoWeWorkWith language={language} onOpenInquiry={() => handleOpenInquiry('GROWTH')} />

        {/* Our Client */}
        <section className="relative border-b border-zinc-200/80 bg-[#f5f3ef] py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-16 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                <span>OUR CLIENT</span>
                <span className="h-px w-8 bg-zinc-300" />
                <span className="text-zinc-400">SELECTED WORK</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl">
                OUR CLIENT
              </h2>
            </div>
            <div className="mx-auto max-w-[1400px]">
              <div className="overflow-hidden">
                <video
                  src="/brand2.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedMetadata={(event) => {
                    event.currentTarget.playbackRate = 0.7;
                  }}
                  className="block h-auto max-h-[720px] w-full object-contain mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Packages: STARTER, GROWTH, GLOBAL */}
        <PackagesSection language={language} onSelectPackage={(pkgId) => handleOpenInquiry(pkgId.toUpperCase())} />

        {/* Add-ons */}
        <AddonsSection language={language} onOpenInquiry={(addon) => handleOpenInquiry(`ADDON: ${addon}`)} />

      </main>

      {/* Footer */}
      <Footer language={language} onOpenInquiry={() => handleOpenInquiry('GROWTH')} />

      {/* Consultation & Brief Submission Modal */}
      <InquiryModal
        language={language}
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialPackage={selectedInitialPackage}
        initialQuoteData={customQuoteData}
        onInquirySubmitted={handleRefreshInquiryCount}
      />

      {/* Client Portal Inquiries Drawer */}
      <ClientInquiriesDrawer
        language={language}
        isOpen={inquiriesDrawerOpen}
        onClose={() => setInquiriesDrawerOpen(false)}
        onNewInquiry={() => {
          setInquiriesDrawerOpen(false);
          handleOpenInquiry('GROWTH');
        }}
      />
    </div>
  );
}
