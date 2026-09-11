import React from 'react';

interface PhilosophyProps {
  language?: 'ko' | 'en';
  onOpenInquiry?: () => void;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ language = 'ko', onOpenInquiry }) => {
  return (
    <>
      <section id="about" className="py-14 border-b border-zinc-200/80 bg-[#39c4f4] text-zinc-900">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col items-center justify-center text-center gap-4 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/90">GLOBAL SOCIAL MEDIA AGENCY</p>
            <h2 className="max-w-4xl text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl text-white">
              {language === 'ko' ? '해외 진출,' : 'Going global,'}
              <span className="block text-white">{language === 'ko' ? 'SNS부터 제대로.' : 'start with social.'}</span>
            </h2>
            <p className="max-w-3xl text-base text-white/90 sm:text-lg">
              {language === 'ko' ? (
                <>새로운 시장에는 새로운 콘텐츠와 전략이 필요합니다. <br />VENA는 글로벌 진출을 준비하는 브랜드를 위해 <br />시장별 SNS 전략부터 콘텐츠 제작, 현지화, 채널 운영까지 원스톱으로 제공합니다.</>
              ) : (
                <>New markets need new content and new strategy. <br />VENA helps ambitious brands move globally with <br />market-specific social strategy, content, localization, and channel operations.</>
              )}
            </p>
          </div>
        </div>
      </section>

      <div className="bg-[#f5f3ef] py-8 text-zinc-900 sm:py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center px-5 text-center sm:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 text-[clamp(1.9rem,2.5vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.07em] text-zinc-950">
            <span>STRATEGY</span>
            <span className="inline-block h-3.5 w-3.5 rounded-full bg-[#f59e0b] sm:h-4 sm:w-4" aria-hidden="true" />
            <span>CONTENT</span>
            <span className="inline-block h-3.5 w-3.5 rounded-full bg-[#f59e0b] sm:h-4 sm:w-4" aria-hidden="true" />
            <span>LOCALIZATION</span>
            <span className="inline-block h-3.5 w-3.5 rounded-full bg-[#f59e0b] sm:h-4 sm:w-4" aria-hidden="true" />
            <span>MANAGEMENT</span>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-[clamp(2rem,2.6vw,4.4rem)] font-medium leading-[1.1] tracking-[-0.06em] text-zinc-950">
            <span>Think Global.</span>
            <span>Create Local.</span>
          </div>

          <button
            type="button"
            onClick={() => onOpenInquiry?.()}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-[18px] bg-[#fcba03] px-5 py-2.5 text-[clamp(1rem,1.1vw,1.7rem)] font-black uppercase tracking-[-0.04em] text-zinc-950 shadow-[0_6px_0_rgba(0,0,0,0.08)] transition hover:brightness-105 sm:px-7 sm:py-3.5"
          >
            {language === 'ko' ? 'VENA와 시작하기' : 'Start with VENA'} <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </>
  );
};
