import React, { useState } from 'react';
import { SERVICES } from '../data/content';
import { Sparkles, ArrowRight, Check, Instagram, Video, Globe, Users, Megaphone, TrendingUp } from 'lucide-react';

interface ServicesSectionProps {
  language?: 'ko' | 'en';
  onOpenInquiry: (serviceName?: string) => void;
}

const serviceColorMap: Record<string, { bg: string; border: string; text: string; badgeBg: string; pill: string }> = {
  '01': {
    bg: 'bg-violet-50/50 hover:bg-violet-50/80',
    border: 'border-violet-200 hover:border-violet-400',
    text: 'text-violet-700',
    badgeBg: 'bg-violet-600 text-white',
    pill: 'bg-violet-100 text-violet-800 border-violet-200',
  },
  '02': {
    bg: 'bg-pink-50/50 hover:bg-pink-50/80',
    border: 'border-pink-200 hover:border-pink-400',
    text: 'text-pink-700',
    badgeBg: 'bg-pink-600 text-white',
    pill: 'bg-pink-100 text-pink-800 border-pink-200',
  },
  '03': {
    bg: 'bg-cyan-50/50 hover:bg-cyan-50/80',
    border: 'border-cyan-200 hover:border-cyan-400',
    text: 'text-cyan-700',
    badgeBg: 'bg-cyan-600 text-white',
    pill: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  },
  '04': {
    bg: 'bg-amber-50/50 hover:bg-amber-50/80',
    border: 'border-amber-200 hover:border-amber-400',
    text: 'text-amber-700',
    badgeBg: 'bg-amber-600 text-white',
    pill: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  '05': {
    bg: 'bg-fuchsia-50/50 hover:bg-fuchsia-50/80',
    border: 'border-fuchsia-200 hover:border-fuchsia-400',
    text: 'text-fuchsia-700',
    badgeBg: 'bg-fuchsia-600 text-white',
    pill: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
  },
  '06': {
    bg: 'bg-blue-50/50 hover:bg-blue-50/80',
    border: 'border-blue-200 hover:border-blue-400',
    text: 'text-blue-700',
    badgeBg: 'bg-blue-600 text-white',
    pill: 'bg-blue-100 text-blue-800 border-blue-200',
  },
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ language = 'ko', onOpenInquiry }) => {
  const isKo = language === 'ko';
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const getExpandedContent = (srv: (typeof SERVICES)[number]) => {
    if (!isKo) {
      const englishContent: Record<string, { title: string; paragraphs: string[]; bullet: string }> = {
        'sns-management': {
          title: 'From launch to growth, we build your official overseas channels.',
          paragraphs: [
            'We design and operate your official social channels from the ground up. Instead of simply uploading scheduled posts, we build a channel strategy around your target market, platform, and brand.',
            'From channel concept and visual direction to content calendars, publishing, and community communication, we create a consistent brand experience and use performance insights to improve the next cycle.',
          ],
          bullet: 'Channel setup and renewal · Concept and visual direction · Monthly content calendar · Publishing and management · Community communication · Performance monitoring · Strategy optimization',
        },
        'global-content': {
          title: 'Content planned for global audiences from the very beginning.',
          paragraphs: [
            'Content that performs in Korea does not automatically perform overseas when translated. VENASTUDIO combines your brand identity with local content trends to create work that feels natural and relevant to each market.',
            'We produce organic short-form content for Instagram Reels, TikTok, and YouTube Shorts, as well as ad creatives for products and services. AI-assisted image and video production is also available.',
            'We can work with existing brand assets or develop a new concept from scratch, depending on the scope you need.',
          ],
          bullet: 'Global short-form content · Reels/TikTok/Shorts · AI image and video · Organic content · Ad creatives · Content planning and scripts · Existing asset production',
        },
        localization: {
          title: 'Localization, not just translation.',
          paragraphs: [
            'Localization is more than changing a language. We rebuild content around the expressions, cultural context, and social communication habits that local audiences actually use.',
            'We review hooks, CTAs, captions, subtitles, content flow, and tone so the result feels like natural local content rather than a translated advertisement.',
            'When needed, we match native reviewers and local operators to validate nuance and help your brand communicate naturally with each market.',
          ],
          bullet: 'Caption localization · Subtitle and script localization · Ad copy and CTA optimization · Cultural adaptation · Native copywriting · Local trend alignment',
        },
        'ugc-creator': {
          title: 'We spread your brand message through local creator voices.',
          paragraphs: [
            'There are moments when content experienced and introduced by real consumers and creators works harder than a brand-led advertisement.',
            'VENASTUDIO finds and contacts creators suited to your market and brand, supporting the full process from product seeding and UGC production to content guidelines and deliverable management.',
            'Rather than defaulting to expensive celebrity campaigns, we design efficient seeding strategies using micro, nano, and UGC creators according to your budget and goals.',
            'For launches, awareness, and follower growth, we can also plan product seeding, UGC campaigns, social events, and participation-led promotions.',
          ],
          bullet: 'Local creator research · Outreach and booking · Product seeding · UGC production · Content guidelines · Micro/nano influencer campaigns · Social events and promotions · Deliverable management',
        },
      };
      return englishContent[srv.id] || {
        title: srv.titleEn,
        paragraphs: [srv.titleEn],
        bullet: srv.highlights.join(' · '),
      };
    }

    if (srv.id === 'sns-management') {
      return {
        title: '해외 공식 채널의 시작부터 성장까지 함께합니다.',
        paragraphs: [
          '브랜드의 해외 공식 SNS 채널을 처음부터 설계하고 지속적으로 운영합니다. 단순히 정해진 콘텐츠를 업로드하는 것이 아니라, 타깃 국가와 플랫폼의 특성을 분석해 브랜드에 맞는 채널 운영 전략을 구축합니다.',
          '채널 콘셉트와 비주얼 방향 설정부터 콘텐츠 캘린더 구성, 업로드 및 구독자 커뮤니케이션까지 일관된 브랜드 경험을 만들어갑니다. 운영 이후에는 콘텐츠별 반응과 성과를 지속적으로 확인하여 다음 콘텐츠와 채널 전략에 반영합니다.',
        ],
        bullet: 'SNS 채널 구축 및 리뉴얼 · 채널 콘셉트/비주얼 설계 · 월간 콘텐츠 캘린더 · 게시물 업로드 및 관리 · 댓글/구독자 커뮤니케이션 · 콘텐츠 성과 모니터링 · 운영 전략 개선',
      };
    }

    if (srv.id === 'global-content') {
      return {
        title: '번역된 콘텐츠가 아닌, 해외 타깃을 위해 처음부터 기획된 콘텐츠를 만듭니다.',
        paragraphs: [
          '한국에서 좋은 반응을 얻은 콘텐츠를 그대로 번역한다고 해외에서도 같은 결과가 나오는 것은 아닙니다. VENASTUDIO는 브랜드 아이덴티티와 타깃 시장의 콘텐츠 트렌드를 함께 분석하여 현지 소비자가 자연스럽게 보고 반응할 수 있는 콘텐츠를 기획·제작합니다.',
          'Instagram Reels, TikTok, YouTube Shorts 등 숏폼 중심의 오가닉 콘텐츠부터 제품 및 서비스 홍보를 위한 광고 크리에이티브까지 목적에 맞게 제작합니다. 촬영이 어려운 브랜드를 위한 AI 기반 이미지·영상 콘텐츠 제작도 가능합니다.',
          '브랜드가 가진 기존 소스를 활용한 제작부터 새로운 콘셉트 기획까지, 필요한 범위에 맞춰 유연하게 진행합니다.',
        ],
        bullet: '글로벌 숏폼 콘텐츠 · Reels/TikTok/Shorts · AI 이미지 & 영상 · 오가닉 콘텐츠 · 광고 크리에이티브 · 콘텐츠 기획 및 스크립트 · 기존 브랜드 소스 활용 콘텐츠',
      };
    }

    if (srv.id === 'localization') {
      return {
        title: 'Translation이 아닌 Localization.',
        paragraphs: [
          '콘텐츠 현지화는 단순히 언어를 바꾸는 작업이 아닙니다. 직역된 문장 대신 해당 국가의 소비자가 실제로 사용하는 표현, 문화적 맥락, SNS 커뮤니케이션 방식까지 고려해 콘텐츠를 현지 시장에 맞게 재구성합니다.',
          '영상 자막과 카피뿐만 아니라 후킹 문구, CTA, 콘텐츠의 흐름과 표현 방식까지 검토하여 번역된 광고처럼 느껴지지 않는 자연스러운 콘텐츠를 만드는 것이 목표입니다.',
          '필요한 경우 타깃 국가의 현지인 운영 담당자 및 네이티브 인력을 매칭하여 언어와 문화적 뉘앙스를 한 번 더 검수하고, 브랜드가 현지 소비자와 보다 자연스럽게 소통할 수 있도록 지원합니다.',
        ],
        bullet: '콘텐츠 번역 및 현지화 · 네이티브 카피라이팅 · 영상 자막/스크립트 현지화 · 광고 카피 및 CTA 최적화 · 문화적 표현 검수 · 네이티브 콘텐츠 검수',
      };
    }

    if (srv.id === 'ugc-creator') {
      return {
        title: '브랜드의 메시지를 현지 크리에이터의 목소리로 확산합니다.',
        paragraphs: [
          '브랜드가 직접 이야기하는 광고보다 실제 소비자와 크리에이터가 경험하고 소개하는 콘텐츠가 더 강력하게 작용할 때가 있습니다.',
          'VENASTUDIO는 타깃 국가와 브랜드에 적합한 크리에이터를 발굴하고 컨택하여 제품 시딩부터 UGC 제작, 콘텐츠 가이드 및 결과물 관리까지 전 과정을 지원합니다.',
          '대형 인플루언서 중심의 고비용 캠페인만을 제안하기보다, 브랜드의 예산과 목표에 따라 마이크로·나노 크리에이터 및 UGC 크리에이터를 활용한 효율적인 시딩 전략을 설계합니다.',
          '신제품 출시, 브랜드 인지도 확대, SNS 팔로워 확보 등 캠페인 목적에 따라 제품 시딩, UGC 캠페인, SNS 이벤트 및 참여형 프로모션도 함께 기획할 수 있습니다.',
        ],
        bullet: '현지 크리에이터 리서치 · 크리에이터 컨택/섭외 · 제품 시딩 · UGC 콘텐츠 제작 · 콘텐츠 가이드라인 · 마이크로/나노 인플루언서 캠페인 · SNS 이벤트/프로모션 · 캠페인 결과물 관리',
      };
    }

    return {
      title: srv.titleKo,
      paragraphs: [srv.description],
      bullet: srv.highlights.slice(0, 5).join(' · '),
    };
  };

  return (
    <section id="services" className="border-b border-zinc-200/80 bg-[#f5f3ef] py-20">
      <div className="mx-auto w-[92%] max-w-[1080px] px-5 sm:px-8">
        <div className="mb-10 text-left">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">What we do</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {SERVICES.slice(0, 4).map((srv) => {
            const style = serviceColorMap[srv.number] || serviceColorMap['01'];
            const isExpanded = expandedService === srv.id;
            const expandedContent = getExpandedContent(srv);

            return (
              <div
                key={srv.number}
                className={`flex min-h-[260px] flex-col justify-between rounded-[28px] border p-5 shadow-sm transition-transform hover:-translate-y-1 ${style.bg} ${style.border}`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${style.text}`}>{srv.number}</span>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {srv.tags.slice(0, 3).map((tag) => (
                        <span
                          key={`${srv.number}-${tag}`}
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${style.pill}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="mb-3 text-2xl font-black tracking-[-0.08em] text-zinc-900">{isKo ? srv.titleKo : srv.titleEn}</h3>
                  <p className="text-sm leading-relaxed text-zinc-600">{isKo ? srv.description : ({
                    'sns-management': 'We design and operate official overseas social channels around your brand, platform, and target market.',
                    'global-content': 'We create global content shaped by your brand identity and the trends of each target market.',
                    localization: 'We adapt language, cultural context, and social communication so content feels native to each market.',
                    'ugc-creator': 'We connect your brand with local creators through research, product seeding, UGC production, and campaign management.',
                  } as Record<string, string>)[srv.id] || srv.description}</p>

                  {isExpanded && (
                    <div className="mt-5 space-y-4 overflow-hidden rounded-[22px] border border-zinc-200 bg-white/80 p-4 shadow-sm">
                      {srv.id === 'sns-management' && (
                        <div className="overflow-hidden rounded-[18px]">
                          <img
                            src="/global-sns-content-grid.png"
                            alt="글로벌 SNS 콘텐츠 운영 사례"
                            className="block h-auto w-full rounded-[18px] object-contain"
                          />
                        </div>
                      )}

                      {srv.id === 'global-content' && (
                        <div className="overflow-hidden rounded-[18px]">
                          <img
                            src="/full.png"
                            alt="글로벌 콘텐츠 제작 사례"
                            className="block h-auto w-full rounded-[18px] object-contain"
                          />
                        </div>
                      )}

                      {srv.id === 'localization' && (
                        <div className="overflow-hidden rounded-[18px]">
                          <video
                            src="/video.mp4"
                            autoPlay
                            muted
                            loop
                            controls
                            playsInline
                            className="block h-auto w-full rounded-[18px]"
                          />
                        </div>
                      )}

                      {srv.id === 'ugc-creator' && (
                        <div className="overflow-hidden rounded-[18px] border border-zinc-200 bg-white shadow-sm">
                          <img
                            src="/ugc-creator-collage.jpg"
                            alt="글로벌 UGC 크리에이터 콘텐츠 콜라주"
                            className="block h-auto w-full rounded-[18px] object-contain"
                          />
                        </div>
                      )}

                      <div className="space-y-3 text-left">
                        <h4 className="text-base font-black tracking-[-0.04em] text-zinc-900">{expandedContent.title}</h4>
                        {expandedContent.paragraphs.map((paragraph, paragraphIndex) => (
                          <p key={`${srv.id}-p-${paragraphIndex}`} className="text-sm leading-relaxed text-zinc-700">
                            {paragraph}
                          </p>
                        ))}
                        <p className="text-sm font-medium leading-relaxed text-zinc-800">{expandedContent.bullet}</p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedService((prev) => (prev === srv.id ? null : srv.id))}
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${style.text}`}
                >
                  {isExpanded ? 'View less' : 'Learn more'} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
