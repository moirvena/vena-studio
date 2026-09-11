import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Globe, Sparkles, Building, User, Mail, Phone, Instagram, DollarSign, MessageSquare, AlertCircle } from 'lucide-react';
import { auth } from '../lib/firebase';
import { submitSupabaseInquiry } from '../lib/supabase';
import confetti from 'canvas-confetti';

interface InquiryModalProps {
  language?: 'ko' | 'en';
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
  initialQuoteData?: {
    selectedPackage: string;
    selectedAddons: string[];
    targetMarkets: string[];
    estimatedCost: number;
    category: string;
  } | null;
  onInquirySubmitted?: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  language = 'ko',
  isOpen,
  onClose,
  initialPackage = 'GROWTH',
  initialQuoteData,
  onInquirySubmitted,
}) => {
  const isKo = language === 'ko';
  const [brandName, setBrandName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(initialPackage);
  const [targetMarkets, setTargetMarkets] = useState<string[]>(['미국 / 글로벌']);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [category, setCategory] = useState('뷰티 / 코스메틱');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState('100~200만원');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (initialQuoteData) {
      setSelectedPackage(initialQuoteData.selectedPackage);
      setSelectedAddons(initialQuoteData.selectedAddons);
      setTargetMarkets(initialQuoteData.targetMarkets);
      if (initialQuoteData.category) setCategory(initialQuoteData.category);
    } else if (initialPackage) {
      setSelectedPackage(initialPackage);
    }
  }, [initialPackage, initialQuoteData, isOpen]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      if (user.email && !email) setEmail(user.email);
      if (user.displayName && !contactPerson) setContactPerson(user.displayName);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !email.trim() || !contactPerson.trim()) {
      setErrorMsg(isKo ? '브랜드명, 담당자명, 이메일은 필수 입력 사항입니다.' : 'Brand name, contact name, and email are required.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const user = auth.currentUser;
      const docId = await submitSupabaseInquiry({
        brandName,
        contactPerson,
        email,
        phone,
        selectedPackage,
        selectedAddons,
        targetMarkets,
        category,
        instagramHandle,
        websiteUrl,
        monthlyBudget,
        message,
      });

      const inquirySubject = `[VENASTUDIO 문의] ${brandName} - ${selectedPackage}`;
      const inquiryBody = [
        'VENASTUDIO 프로젝트 문의',
        '',
        `브랜드명 / 기업명: ${brandName}`,
        `담당자: ${contactPerson}`,
        `회신 이메일: ${email}`,
        `연락처: ${phone || '-'}`,
        `관심 패키지: ${selectedPackage}`,
        `추가 옵션: ${selectedAddons.length ? selectedAddons.join(', ') : '-'}`,
        `타깃 국가: ${targetMarkets.length ? targetMarkets.join(', ') : '-'}`,
        `제품 / 산업 카테고리: ${category}`,
        `Instagram: ${instagramHandle || '-'}`,
        `웹사이트: ${websiteUrl || '-'}`,
        `월 예산: ${monthlyBudget}`,
        '',
        '문의 내용:',
        message || '-',
        '',
        `접수 번호: ${docId}`,
      ].join('\n');

      window.location.href = `mailto:venastudio@naver.com?subject=${encodeURIComponent(inquirySubject)}&body=${encodeURIComponent(inquiryBody)}`;

      setSubmittedId(docId);
      setSuccess(true);
      if (onInquirySubmitted) onInquirySubmitted();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (cErr) {
        // Confetti is decorative
      }
    } catch (err: any) {
      console.error('Failed to submit inquiry:', err);
      setErrorMsg(isKo ? '문의 접수 중 오류가 발생했습니다. 다시 시도해 주세요.' : 'Something went wrong while submitting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setSubmittedId('');
    onClose();
  };

  return (
    <div
      id="inquiry-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 text-zinc-800 shadow-2xl my-8">
        {/* Close Button */}
        <button
          id="btn-close-inquiry-modal"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">
                SUBMISSION COMPLETE
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-syne">
                {isKo ? '프로젝트 문의가 정상 접수되었습니다.' : 'Your project inquiry has been submitted.'}
              </h3>
              <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                {isKo ? <>VENASTUDIO 글로벌 전략팀이 남겨주신 브랜드와 SNS 정보를 분석한 후, <strong className="text-zinc-950 font-bold">24시간 이내에 맞춤형 브리프와 미팅 일정</strong>을 안내해 드리겠습니다.</> : <>The VENASTUDIO strategy team will review your information and share a <strong className="text-zinc-950 font-bold">custom brief and meeting options within 24 hours.</strong></>}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-600 max-w-xs mx-auto">
              접수 번호 : <span className="text-zinc-950 font-bold">{submittedId}</span>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-lg cursor-pointer"
            >
              {isKo ? '확인 및 닫기' : 'Confirm and close'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Modal Header */}
            <div className="space-y-2 border-b border-zinc-200 pb-5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                <span>PROJECT BRIEF & CONSULTATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-syne uppercase">
                {isKo ? '프로젝트 문의하기' : 'Project inquiry'}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600">
                {isKo ? '한국 브랜드의 글로벌 진출, VENASTUDIO와 함께 시작해보세요.' : 'Start your global expansion with VENASTUDIO.'}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Row 1: Brand Name & Contact Person */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-700 font-semibold flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{isKo ? '브랜드명 / 기업명 *' : 'Brand / company name *'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: VENA Cosmetics"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-700 font-semibold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{isKo ? '담당자 성함 / 직책 *' : 'Contact name / role *'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 김마케터 팀장"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-700 font-semibold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{isKo ? '회신받을 이메일 *' : 'Reply email *'}</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@brand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-700 font-semibold flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{isKo ? '연락처 (전화번호)' : 'Phone number'}</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="010-1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Package & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-700 font-semibold">{isKo ? '관심 패키지' : 'Package of interest'}</label>
                  <select
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-950"
                  >
                    <option value="STARTER">STARTER (₩690K / 8 contents)</option>
                    <option value="GROWTH">GROWTH (₩1.49M / 12 contents / recommended)</option>
                    <option value="GLOBAL">GLOBAL (₩1.99M / 14+ contents + UGC)</option>
                    <option value="CUSTOM_CONTENT_ONLY">CONTENT ONLY</option>
                    <option value="UNDECIDED">Decide after consultation</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-700 font-semibold">{isKo ? '제품 / 산업 카테고리' : 'Product / industry'}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-950"
                  >
                    <option value="뷰티 / 코스메틱">Beauty & Skincare</option>
                    <option value="F&B / 식품">F&B / Food & Beverages</option>
                    <option value="홈&리빙 / 오브제">Home & Living</option>
                    <option value="패션 / 잡화">Fashion & Accessories</option>
                    <option value="테크 / 라이프스타일">Tech / Lifestyle</option>
                    <option value="기타">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Instagram Handle & Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-700 font-semibold flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{isKo ? '현재 운영 중인 SNS 계정 (선택)' : 'Current social account (optional)'}</span>
                  </label>
                  <input
                    type="text"
                    placeholder="@yourbrand.official"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-950"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-700 font-semibold flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{isKo ? '공식 웹사이트 / 판매 링크 (선택)' : 'Website / sales link (optional)'}</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourbrand.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-950"
                  />
                </div>
              </div>

              {/* Row 5: Message / Project Goal */}
              <div className="space-y-1.5">
                <label className="text-zinc-700 font-semibold flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{isKo ? '진출 목표 및 문의 사항' : 'Goals and inquiry'}</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="예: 미국 아마존 입점 예정으로 북미 인스타그램 론칭 및 현지 UGC 시딩을 고려 중입니다."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-zinc-300 hover:border-zinc-400 text-zinc-700 transition-colors"
                >
                  {isKo ? '취소' : 'Cancel'}
                </button>
                <button
                  id="btn-submit-inquiry"
                  type="submit"
                  disabled={loading}
                  className="px-7 py-2.5 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? (isKo ? '문의 등록 중...' : 'Submitting...') : (isKo ? '프로젝트 문의 제출하기' : 'Submit inquiry')}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
