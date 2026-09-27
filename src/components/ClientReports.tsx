import React from 'react';

interface ClientReportsProps {
  language?: 'ko' | 'en';
}

export const ClientReports: React.FC<ClientReportsProps> = ({ language = 'ko' }) => {
  const isKo = language === 'ko';

  return (
    <section className="border-b border-zinc-200/80 bg-white py-20">
      <div className="mx-auto w-[92%] max-w-[1200px] px-5 sm:px-8">
        <div className="mb-12 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            <span>TRACK RECORD</span>
            <span className="h-px w-8 bg-zinc-300" />
            <span className="text-zinc-400">NUMBERS DON'T LIE</span>
          </div>
          <h2 className="text-3xl font-black tracking-[-0.05em] text-zinc-950 sm:text-5xl">
            GROWTH BY THE NUMBERS
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">
            {isKo
              ? '화려한 말 대신, VENASTUDIO가 처음부터 끝까지 운영한 브랜드 계정의 실제 Meta Business Suite 데이터로 보여드립니다.'
              : 'No buzzwords, just real Meta Business Suite data from brand accounts VENASTUDIO has run end-to-end.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-[#f5f3ef] p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                Client A
              </span>
              <span className="text-xs font-medium text-zinc-500">
                {isKo ? 'K-뷰티 스킨케어 브랜드 · 글로벌 계정 리부트' : 'K-beauty skincare brand · Global account reboot'}
              </span>
            </div>
            <div className="overflow-hidden rounded-[18px] border border-zinc-200 bg-white">
              <img
                src="/client-a-report.png"
                alt={isKo ? 'Client A 운영 성과 리포트' : 'Client A performance report'}
                className="block h-auto w-full object-contain"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-[#f5f3ef] p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                Client B
              </span>
              <span className="text-xs font-medium text-zinc-500">
                {isKo ? 'K-뷰티 안티에이징 브랜드 · 글로벌 확장 캠페인' : 'K-beauty anti-aging brand · Global expansion campaign'}
              </span>
            </div>
            <div className="overflow-hidden rounded-[18px] border border-zinc-200 bg-white">
              <img
                src="/client-b-report.png"
                alt={isKo ? 'Client B 운영 성과 리포트' : 'Client B performance report'}
                className="block h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
