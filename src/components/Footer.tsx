import React from 'react';
import { ArrowRight, Sparkles, Instagram, Mail, Globe, ArrowUp } from 'lucide-react';
import { VenaLogo } from './VenaLogo';

interface FooterProps {
  language?: 'ko' | 'en';
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language = 'ko', onOpenInquiry }) => {
  const isKo = language === 'ko';
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0c0d10] py-16 text-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="mb-12 text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">{isKo ? 'Ready to see' : 'Ready to see'}</p>
          <h2 className="text-4xl font-black tracking-[-0.08em] text-white sm:text-7xl">{isKo ? 'transformative results' : 'transformative results'}</h2>
          <button
            type="button"
            onClick={onOpenInquiry}
            className="mt-8 rounded-full bg-[#f1d247] px-6 py-3 text-sm font-bold uppercase text-zinc-900"
          >
            {isKo ? '상담 시작하기' : "Let's chat"}
          </button>
        </div>

        <div className="flex flex-col gap-10 border-t border-white/15 pt-10 text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <VenaLogo variant="light" size="xl" className="shrink-0 items-start" />

          <div className="max-w-2xl text-left text-xs leading-relaxed text-white/55 sm:text-sm">
            <div className="mb-3 text-base font-medium text-white/80">VENASTUDIO {isKo ? '(베나스튜디오)' : ''}</div>
            <div>{isKo ? '사업자등록번호:' : 'Business registration:'} 890-26-02018 {isKo ? '대표자:' : 'Representative:'} DO HIEN THAO</div>
            <div>{isKo ? '문의:' : 'Contact:'} 010-7208-2408 | venastudio@naver.com</div>
            <div>{isKo ? '소재지:' : 'Address:'} {isKo ? '경기도 고양시 일산서구 일산로 757(대화동)' : '757 Ilsan-ro, Ilsanseo-gu, Goyang-si, Gyeonggi-do'}</div>
            <div>757 Ilsan-ro, Ilsanseo-gu, Goyang-si, Gyeonggi-do, Republic of Korea</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
