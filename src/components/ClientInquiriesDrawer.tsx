import React, { useState, useEffect } from 'react';
import { X, FileText, CheckCircle2, Clock, Calendar, Mail, Building, RefreshCw, LogIn, ExternalLink } from 'lucide-react';
import { ProjectInquiry, fetchUserInquiries, auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';

interface ClientInquiriesDrawerProps {
  language?: 'ko' | 'en';
  isOpen: boolean;
  onClose: () => void;
  onNewInquiry: () => void;
}

const statusMap: Record<string, { label: string; color: string }> = {
  new: { label: '접수 완료 (분석 중)', color: 'bg-amber-100 border-amber-300 text-amber-800' },
  reviewing: { label: '전략팀 검토 중', color: 'bg-blue-100 border-blue-300 text-blue-800' },
  consultation_scheduled: { label: '미팅 일정 조율 완료', color: 'bg-purple-100 border-purple-300 text-purple-800' },
  proposal_sent: { label: '맞춤 제안서 발송', color: 'bg-emerald-100 border-emerald-300 text-emerald-800' },
  contracted: { label: '프로젝트 착수', color: 'bg-zinc-900 border-zinc-950 text-white' },
};

export const ClientInquiriesDrawer: React.FC<ClientInquiriesDrawerProps> = ({
  language = 'ko',
  isOpen,
  onClose,
  onNewInquiry,
}) => {
  const isKo = language === 'ko';
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  const loadInquiries = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await fetchUserInquiries(user.uid, user.email || undefined);
      setInquiries(data);
    } catch (err) {
      console.error('Failed to load user inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      loadInquiries();
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white border-l border-zinc-200 h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
        <div className="space-y-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-300 flex items-center justify-center text-zinc-800">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-zinc-950 font-syne uppercase">
                  {isKo ? '내 프로젝트 문의 내역' : 'My project inquiries'}
                </h3>
                <p className="text-[11px] text-zinc-500 font-mono">
                  {user ? user.email : (isKo ? 'Google 계정 로그인 필요' : 'Google sign-in required')}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-500 hover:text-zinc-950"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!user ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-200 mx-auto flex items-center justify-center text-zinc-500">
                <LogIn className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-zinc-900">{isKo ? '로그인이 필요합니다' : 'Sign-in required'}</h4>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  {isKo ? 'Google 계정으로 로그인하시면 제출하신 문의 내역과 제안서 진행 상태를 실시간으로 확인하실 수 있습니다.' : 'Sign in with Google to view your inquiries and proposal status in real time.'}
                </p>
              </div>
              <button
                onClick={() => signInWithPopup(auth, googleProvider)}
                className="px-6 py-2.5 rounded-full bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm"
              >
                {isKo ? 'Google 계정으로 로그인' : 'Sign in with Google'}
              </button>
            </div>
          ) : loading ? (
            <div className="py-16 text-center text-xs text-zinc-500 space-y-3">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto text-zinc-400" />
              <span>{isKo ? '문의 내역을 불러오는 중입니다...' : 'Loading inquiries...'}</span>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <p className="text-xs text-zinc-500">
                {isKo ? '아직 등록된 프로젝트 문의가 없습니다.' : 'No project inquiries yet.'}
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNewInquiry();
                }}
                className="px-6 py-2.5 rounded-full bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm"
              >
                {isKo ? '새 프로젝트 문의 작성하기' : 'Create a new inquiry'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{isKo ? `총 ${inquiries.length}건의 문의` : `${inquiries.length} inquiries`}</span>
                <button
                  onClick={loadInquiries}
                  className="hover:text-zinc-950 flex items-center gap-1 text-[11px] font-semibold"
                >
                  <RefreshCw className="w-3 h-3" /> {isKo ? '새로고침' : 'Refresh'}
                </button>
              </div>

              {inquiries.map((inq) => {
                const st = statusMap[inq.status] || statusMap.new;
                return (
                  <div
                    key={inq.id}
                    className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-zinc-950 font-syne">
                        {inq.brandName}
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${st.color}`}>
                        {st.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-zinc-600">
                      <div>
                        <span className="text-zinc-400 font-medium">{isKo ? '패키지:' : 'Package:'}</span> {inq.selectedPackage}
                      </div>
                      <div>
                        <span className="text-zinc-400 font-medium">{isKo ? '카테고리:' : 'Category:'}</span> {inq.category}
                      </div>
                    </div>

                    {inq.message && (
                      <p className="text-xs text-zinc-700 bg-white p-3 rounded-xl border border-zinc-200 italic line-clamp-2">
                        &ldquo;{inq.message}&rdquo;
                      </p>
                    )}

                    <div className="pt-2 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                      <span>{isKo ? '담당자:' : 'Contact:'} {inq.contactPerson}</span>
                      <span>{isKo ? '문의 ID:' : 'Inquiry ID:'} {inq.id?.substring(0, 8)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Bottom Actions */}
        <div className="pt-6 border-t border-zinc-200">
          <button
            onClick={() => {
              onClose();
              onNewInquiry();
            }}
            className="w-full py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            + {isKo ? '새 프로젝트 문의하기' : 'New project inquiry'}
          </button>
        </div>
      </div>
    </div>
  );
};
