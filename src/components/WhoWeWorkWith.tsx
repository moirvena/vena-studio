import React, { useState } from 'react';
import { WHO_WE_WORK_WITH } from '../data/content';
import { Sparkles, Globe, Video, Users, TrendingUp, Coins, CheckSquare, Square, ArrowRight, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, any> = {
  Sparkles: Sparkles,
  Globe: Globe,
  Video: Video,
  Users: Users,
  TrendingUp: TrendingUp,
  Coins: Coins,
};

const profileColors: Record<string, { badge: string; border: string; activeBorder: string; iconBg: string }> = {
  '01': { badge: 'bg-violet-100 text-violet-800', border: 'border-violet-200', activeBorder: 'border-violet-500 bg-violet-50/60 ring-2 ring-violet-500/20', iconBg: 'text-violet-600 bg-violet-100' },
  '02': { badge: 'bg-pink-100 text-pink-800', border: 'border-pink-200', activeBorder: 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-500/20', iconBg: 'text-pink-600 bg-pink-100' },
  '03': { badge: 'bg-amber-100 text-amber-800', border: 'border-amber-200', activeBorder: 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20', iconBg: 'text-amber-600 bg-amber-100' },
  '04': { badge: 'bg-emerald-100 text-emerald-800', border: 'border-emerald-200', activeBorder: 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20', iconBg: 'text-emerald-600 bg-emerald-100' },
  '05': { badge: 'bg-cyan-100 text-cyan-800', border: 'border-cyan-200', activeBorder: 'border-cyan-500 bg-cyan-50/60 ring-2 ring-cyan-500/20', iconBg: 'text-cyan-600 bg-cyan-100' },
  '06': { badge: 'bg-blue-100 text-blue-800', border: 'border-blue-200', activeBorder: 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20', iconBg: 'text-blue-600 bg-blue-100' },
};

interface WhoWeWorkWithProps {
  language?: 'ko' | 'en';
  onOpenInquiry: () => void;
}

export const WhoWeWorkWith: React.FC<WhoWeWorkWithProps> = ({ language = 'ko', onOpenInquiry }) => {
  const isKo = language === 'ko';
  const englishProfiles: Record<string, { title: string; description: string }> = {
    '01': { title: 'Brands just getting started', description: 'You have launched a brand but are unsure how to start your global social channels.' },
    '02': { title: 'Brands preparing for global expansion', description: 'You have sales channels ready but need a way to introduce your brand to local customers.' },
    '03': { title: 'Brands struggling with content production', description: 'Your product is strong, but your team lacks the capacity to create content consistently.' },
    '04': { title: 'Brands without an overseas marketing team', description: 'Hiring separate marketers for every market feels too heavy.' },
    '05': { title: 'Brands with stalled overseas social growth', description: 'You post consistently, but engagement and awareness are below expectations.' },
    '06': { title: 'Brands starting global marketing lean', description: 'You want to test market response through content and social before spending big.' },
  };
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([0, 1, 2]);

  const toggleSelect = (index: number) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  const matchPercentage = Math.round((selectedIndexes.length / 6) * 100);

  return (
    <section id="who-we-work-with" className="py-24 border-b border-zinc-200/80 bg-zinc-50/40 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-500 font-syne font-bold">
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            <span>{isKo ? 'TARGET CLIENTS' : 'TARGET CLIENTS'}</span>
            <span className="h-px w-8 bg-zinc-300"></span>
            <span className="text-zinc-400">{isKo ? 'WHO WE WORK WITH' : 'WHO WE WORK WITH'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 font-syne uppercase">
            {isKo ? 'WHO WE WORK WITH' : 'WHO WE WORK WITH'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            {isKo ? '해당되는 항목을 클릭하여 VENASTUDIO와의 핏을 확인해보세요.' : 'Click the ones that match your brand to see if VENA is the right fit.'}
          </p>
        </div>

        {/* 6 Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHO_WE_WORK_WITH.map((profile, idx) => {
            const Icon = iconMap[profile.iconName] || Sparkles;
            const isChecked = selectedIndexes.includes(idx);
            const style = profileColors[profile.number] || profileColors['01'];

            return (
              <div
                key={profile.number}
                id={`target-client-${profile.number}`}
                onClick={() => toggleSelect(idx)}
                className={`cursor-pointer rounded-3xl border p-7 transition-all duration-200 select-none flex flex-col justify-between ${
                  isChecked
                    ? `${style.activeBorder} shadow-md`
                    : 'bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/80 shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${style.badge}`}>
                        PROFILE {profile.number}
                      </span>
                    </div>

                    <div className="text-zinc-400">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-zinc-900" />
                      ) : (
                        <Square className="w-5 h-5 text-zinc-300" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${style.iconBg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-950 font-syne">
                        {isKo ? profile.title : englishProfiles[profile.number].title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed mt-1">
                        {isKo ? profile.description : englishProfiles[profile.number].description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-200/80 text-[11px] font-mono flex items-center justify-between">
                  <span className={isChecked ? 'text-zinc-900 font-bold' : 'text-zinc-400'}>
                    {isChecked ? (isKo ? '✓ 항목 선택됨' : '✓ Selected') : isKo ? '클릭하여 선택' : 'Click to select'}
                  </span>
                  <span className="text-zinc-400">{isKo ? 'VENA FIT' : 'VENA FIT'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Fit Score & CTA Box */}
        <div className="mt-12 p-8 rounded-3xl bg-white border border-zinc-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left w-full md:w-auto">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                {isKo ? 'VENASTUDIO FIT RATE' : 'VENASTUDIO FIT RATE'}
              </span>
              <span className="text-sm font-bold font-mono text-zinc-950 bg-zinc-100 px-2 py-0.5 rounded-full">
                {selectedIndexes.length} / 6 {isKo ? '항목 일치' : 'matches'} ({matchPercentage}%)
              </span>
            </div>
            <p className="text-sm text-zinc-700 font-medium">
              {selectedIndexes.length >= 2 ? (
                <span>
                  {isKo ? '🌟 귀사 브랜드는 VENASTUDIO와 매우 높은 시너지를 낼 수 있는 이상적인 상태입니다.' : '🌟 Your brand shows strong potential for a highly effective collaboration with VENASTUDIO.'}
                </span>
              ) : (
                <span>
                  {isKo ? '궁금하신 사항이 있으시면 언제든 편하게 무료 상담을 신청해주세요.' : 'If you have questions, we’re happy to discuss a free consultation.'}
                </span>
              )}
            </p>
          </div>

          <button
            id="btn-who-inquiry"
            onClick={onOpenInquiry}
            className="shrink-0 px-8 py-3.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-lg active:scale-95 cursor-pointer"
          >
            <span>{isKo ? '맞춤 전략 제안받기' : 'Get a custom strategy'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
