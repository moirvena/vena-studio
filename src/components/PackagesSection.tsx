import React from 'react';
import { PACKAGES } from '../data/content';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PackagesSectionProps {
  language?: 'ko' | 'en';
  onSelectPackage: (packageId: string) => void;
}

const packageThemes: Record<string, { badge: string; border: string; bg: string; buttonBg: string; buttonText: string }> = {
  starter: {
    badge: 'bg-blue-100 text-blue-800 border-blue-200',
    border: 'border-zinc-200 hover:border-blue-300',
    bg: 'bg-white',
    buttonBg: 'bg-zinc-950 text-white hover:bg-zinc-800',
    buttonText: 'text-white',
  },
  growth: {
    badge: 'bg-gradient-to-r from-violet-600 to-pink-600 text-white',
    border: 'border-violet-400 ring-2 ring-violet-500/20 shadow-xl',
    bg: 'bg-gradient-to-b from-violet-50/30 via-white to-white',
    buttonBg: 'bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:opacity-95 shadow-md shadow-violet-500/20',
    buttonText: 'text-white',
  },
  'content-studio': {
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    border: 'border-zinc-200 hover:border-amber-300',
    bg: 'bg-white',
    buttonBg: 'bg-zinc-950 text-white hover:bg-zinc-800',
    buttonText: 'text-white',
  },
  global: {
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    border: 'border-zinc-200 hover:border-emerald-300',
    bg: 'bg-white',
    buttonBg: 'bg-zinc-950 text-white hover:bg-zinc-800',
    buttonText: 'text-white',
  },
};

export const PackagesSection: React.FC<PackagesSectionProps> = ({ language = 'ko', onSelectPackage }) => {
  const isKo = language === 'ko';
  const englishPackages: Record<string, { subtitle: string; targetAudience: string; features: string[]; disclaimer: string }> = {
    starter: {
      subtitle: 'For brands starting global social media',
      targetAudience: 'Launching overseas social channels and testing early market response',
      features: ['Instagram targeting for one market/language', 'Monthly content strategy', 'Feed / Carousel: 4 posts', 'Reels: 1 video', 'Native-feel caption localization', 'Content publishing and scheduling', 'Basic hashtag setup and optimization', 'Monthly performance summary'],
      disclaimer: '*Production and ad spend excluded',
    },
    growth: {
      subtitle: 'For brands ready to grow overseas social channels',
      targetAudience: 'Reliable monthly content supply and stronger follower engagement',
      features: ['Instagram targeting for one market/language', 'Integrated monthly social strategy', 'Feed / Carousel: 8 posts', 'Reels: 4 videos', 'Context-aware caption localization', 'Publishing at optimized times', 'Basic comment and community management', 'One awareness or engagement campaign per month', 'Detailed monthly performance report and insights'],
      disclaimer: '*Production, UGC, and ad spend excluded',
    },
    global: {
      subtitle: 'Content and UGC in one connected solution',
      targetAudience: 'Global scale-up and overseas creator reach',
      features: ['Integrated global social strategy', 'Dedicated Instagram channel operation', 'Feed / Carousel: 8 posts', 'Reels: 6 videos', 'Multilingual caption localization', 'Regular publishing and channel management', 'Interactive community management', 'Monthly special viral campaign', 'UGC creator research and sourcing', 'Direct creator outreach and communication', 'UGC / seeding campaign planning and operation', 'Monthly performance analysis and scale-up guidance'],
      disclaimer: '*Product shipping, creator fees, and ad spend excluded',
    },
    'content-studio': {
      subtitle: 'For brands that need content without channel management',
      targetAudience: 'Global social content, short-form, carousel, and ad creative production',
      features: ['Global content strategy planning', 'Feed / Carousel: 8 posts', 'Reels / Shorts: 4 videos', 'Brand promotional ad creative', 'Market-aware caption localization', 'Short-form content series', 'Brand story and messaging', 'Monthly content feedback and optimization'],
      disclaimer: '*Production, talent, and ad spend excluded',
    },
  };

  return (
    <section id="packages" className="py-24 border-b border-zinc-200/80 bg-zinc-50/40 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-500 font-syne font-bold">
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            <span>{isKo ? 'PACKAGES & PRICING' : 'PACKAGES & PRICING'}</span>
            <span className="h-px w-8 bg-zinc-300"></span>
            <span className="text-zinc-400">{isKo ? 'TRANSPARENT & SCALABLE' : 'TRANSPARENT & SCALABLE'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 font-syne uppercase">
            {isKo ? 'PACKAGES & PRICING' : 'PACKAGES & PRICING'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            {isKo
              ? '브랜드의 현재 진출 단계와 예산에 맞추어 가장 효율적인 패키지를 선택하실 수 있습니다.'
              : 'Choose the package that fits your stage, budget, and global growth goals.'}
          </p>
        </div>

        {/* 3 Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => {
            const theme = packageThemes[pkg.id] || packageThemes.starter;

            return (
              <div
                key={pkg.id}
                id={`package-card-${pkg.id}`}
                className={`rounded-3xl border ${theme.border} ${theme.bg} p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative shadow-sm hover:shadow-lg`}
              >
                {/* Popular Pill */}
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{pkg.badge || 'MOST POPULAR'}</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Top Name & Subtitle */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-extrabold text-zinc-950 font-syne tracking-tight">
                        {pkg.name}
                      </h3>
                      {!pkg.isPopular && pkg.badge && (
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-600 font-medium">
                      {isKo ? pkg.subtitle : englishPackages[pkg.id]?.subtitle || pkg.subtitle}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className="space-y-1 py-4 border-y border-zinc-200/80">
                    <div className="text-3xl sm:text-4xl font-extrabold text-zinc-950 font-syne">
                      {pkg.price}
                    </div>
                    <div className="text-xs font-mono font-bold text-violet-700">
                      {pkg.totalContents}
                    </div>
                  </div>

                  {/* Target Audience Note */}
                  <div className="p-3.5 rounded-xl bg-zinc-100/80 border border-zinc-200 text-xs text-zinc-700">
                    <span className="font-bold text-zinc-900">{isKo ? '추천 대상:' : 'Best for:'} </span>
                    {isKo ? pkg.targetAudience : englishPackages[pkg.id]?.targetAudience || pkg.targetAudience}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                      {isKo ? 'INCLUDED DELIVERABLES' : 'INCLUDED DELIVERABLES'}
                    </div>
                    {(isKo ? pkg.features : englishPackages[pkg.id]?.features || pkg.features).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA & Disclaimer */}
                <div className="pt-8 mt-6 border-t border-zinc-200/80 space-y-3">
                  <button
                    id={`btn-select-pkg-${pkg.id}`}
                    onClick={() => onSelectPackage(pkg.id)}
                    className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${theme.buttonBg}`}
                  >
                    <span>{isKo ? `${pkg.name} 플랜 문의하기` : `Request ${pkg.name} plan`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-zinc-500 text-center font-mono">
                    {isKo ? pkg.disclaimer : englishPackages[pkg.id]?.disclaimer || pkg.disclaimer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
