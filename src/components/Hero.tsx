import React from 'react';
import { Sparkles } from 'lucide-react';
import { TARGET_MARKETS } from '../data/content';
import { VenaLogo } from './VenaLogo';

interface HeroProps {
  language?: 'ko' | 'en';
  onOpenInquiry: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language = 'ko', onOpenInquiry, onExploreServices }) => {
  const isKo = language === 'ko';
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-zinc-50/50 to-white border-b border-zinc-200/80">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-violet-200/40 via-pink-100/30 to-amber-100/40 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="space-y-12">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm text-xs font-semibold text-zinc-800">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 animate-pulse"></span>
              <span className="font-mono tracking-wider text-[11px] uppercase text-zinc-600 font-bold">
                GLOBAL SNS MARKETING & CONTENT STUDIO
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>US · VIETNAM · THAILAND · JAPAN</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="hero-display break-words text-zinc-950 text-[3.4rem] sm:text-[5.5rem] md:text-[8.2rem] lg:text-[8rem] xl:text-[10rem] leading-[0.8] tracking-[-0.08em] uppercase">
                YOUR BRAND, <br />
                <span className="block break-words text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-pink-600 to-orange-500">
                  BEYOND BORDERS.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl text-zinc-800 font-semibold tracking-tight leading-snug">
                {isKo ? '한국 브랜드의 가능성을' : 'Take your brand'} <br className="sm:hidden" />
                <span className="text-zinc-950 font-bold underline decoration-pink-500 decoration-wavy underline-offset-4">
                  {isKo ? '더 넓은 글로벌 시장으로.' : 'to a wider global market.'}
                </span>
              </p>

              <p className="text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
                {isKo
                  ? 'VENASTUDIO는 글로벌 SNS 운영부터 현지화 콘텐츠 기획, 숏폼 비디오, 글로벌 크리에이터 시딩(UGC), Meta 광고까지 원스톱으로 실행하는 글로벌 SNS 마케팅 전문 스튜디오입니다.'
                  : 'VENASTUDIO is a global social media marketing studio covering channel operations, localized content, short-form video, creator seeding, and Meta ads in one connected workflow.'}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-950 shadow-[0_25px_80px_rgba(24,24,27,0.15)] lg:col-span-12">
              <video
                src="/header.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="h-[340px] w-full object-cover sm:h-[420px] lg:h-[560px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
            </div>

          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="text-zinc-500 uppercase tracking-widest font-bold text-[11px] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-600"></span>
              CORE EXPERTISE
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {[
                { name: 'Instagram Management', color: 'bg-pink-50 text-pink-700 border-pink-200' },
                { name: 'Global Content', color: 'bg-violet-50 text-violet-700 border-violet-200' },
                { name: 'Short-form & Reels', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                { name: 'Creator Seeding (UGC)', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                { name: 'Localization', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { name: 'Vietnamese', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
                { name: 'Thai', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                { name: 'Japanese', color: 'bg-red-50 text-red-700 border-red-200' },
                { name: 'Social Ads', color: 'bg-purple-50 text-purple-700 border-purple-200' },
              ].map((item) => (
                <span
                  key={item.name}
                  className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold ${item.color} shadow-xs`}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
