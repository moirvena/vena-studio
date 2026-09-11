import React from 'react';
import { ADDONS } from '../data/content';
import { Plus, ArrowRight, Sparkles, Video, Users, Megaphone, Globe, Layers } from 'lucide-react';

interface AddonsSectionProps {
  language?: 'ko' | 'en';
  onOpenInquiry: (addonName: string) => void;
}

const addonColors: Record<string, { iconBg: string; text: string; border: string }> = {
  ugc_creator: { iconBg: 'bg-amber-100 text-amber-700', text: 'text-amber-700', border: 'hover:border-amber-400' },
  short_form: { iconBg: 'bg-pink-100 text-pink-700', text: 'text-pink-700', border: 'hover:border-pink-400' },
  meta_ads: { iconBg: 'bg-blue-100 text-blue-700', text: 'text-blue-700', border: 'hover:border-blue-400' },
  localization_pack: { iconBg: 'bg-cyan-100 text-cyan-700', text: 'text-cyan-700', border: 'hover:border-cyan-400' },
  campaign_special: { iconBg: 'bg-violet-100 text-violet-700', text: 'text-violet-700', border: 'hover:border-violet-400' },
  content_only: { iconBg: 'bg-emerald-100 text-emerald-700', text: 'text-emerald-700', border: 'hover:border-emerald-400' },
};

export const AddonsSection: React.FC<AddonsSectionProps> = ({ language = 'ko', onOpenInquiry }) => {
  const isKo = language === 'ko';
  const englishDescriptions: Record<string, string> = {
    ugc_creator: 'Source overseas UGC creators and produce short-form content based on real local use.',
    short_form: 'Additional trend-led short-form production for Reels, TikTok, and YouTube Shorts.',
    promo_video: 'A one-off promotional video option for brand advertising. Choose AI production or studio filming; organic shoots and talent fees may be additional.',
    meta_ads: 'Support from Meta ad setup and market targeting through Instagram/Facebook operation, reporting, and optimization.',
    localization_pack: 'Expand localization into English, Vietnamese, Thai, Japanese, and additional market languages.',
    campaign_special: 'Plan and operate global giveaways, launch events, and special influencer campaigns.',
    content_only: 'Global content production for brands that manage their own social publishing.',
  };

  return (
    <section className="py-24 border-b border-zinc-200/80 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-500 font-syne font-bold">
            <span className="w-2 h-2 rounded-full bg-violet-600"></span>
            <span>{isKo ? 'CUSTOMIZE & SCALE' : 'CUSTOMIZE & SCALE'}</span>
            <span className="h-px w-8 bg-zinc-300"></span>
            <span className="text-zinc-400">{isKo ? 'ADD-ONS' : 'ADD-ONS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 font-syne uppercase">
            {isKo ? 'ADD-ON SERVICES' : 'ADD-ON SERVICES'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            {isKo
              ? '기본 패키지에 브랜드가 필요한 개별 서비스를 자유롭게 추가 구성할 수 있습니다.'
              : 'Add the specific services your brand needs to scale beyond the base package.'}
          </p>
        </div>

        {/* 6 Addons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADDONS.map((addon) => {
            const color = addonColors[addon.id] || addonColors.ugc_creator;

            return (
              <div
                key={addon.id}
                id={`addon-card-${addon.id}`}
                className={`rounded-3xl bg-zinc-50/60 border border-zinc-200 p-7 space-y-5 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md ${color.border} hover:bg-white`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${color.iconBg}`}>
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-900 bg-white px-2.5 py-1 rounded-full border border-zinc-200 shadow-2xs">
                      {addon.estimatedAddPrice}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-950 font-syne uppercase">
                    {addon.title}
                  </h3>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {isKo ? addon.description : englishDescriptions[addon.id] || addon.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200/80 flex items-center justify-between">
                  <button
                    onClick={() => onOpenInquiry(addon.title)}
                    className="text-xs font-bold text-zinc-900 hover:text-black flex items-center gap-1 group cursor-pointer"
                  >
                    <span>{isKo ? '추가 옵션 문의' : 'Ask about this add-on'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    OPTIONAL
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
