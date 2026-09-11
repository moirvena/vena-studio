import React, { useEffect, useState } from 'react';
import { LogOut, RefreshCw, Search, ShieldCheck, X } from 'lucide-react';
import { supabase, fetchAdminInquiries, type AdminInquiry } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

const statusLabels: Record<string, string> = {
  new: '신규', reviewing: '검토 중', consultation_scheduled: '상담 예정', proposal_sent: '제안서 발송', contracted: '계약 완료',
};

const DetailRow = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="border-b border-zinc-100 py-3 last:border-0">
    <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{label}</p>
    <p className="mt-1 break-words text-sm leading-relaxed text-zinc-800">{value || '-'}</p>
  </div>
);

export const AdminPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [selected, setSelected] = useState<AdminInquiry | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadInquiries = async () => {
    setLoading(true); setError('');
    const { data, error: fetchError } = await fetchAdminInquiries();
    if (fetchError) setError(fetchError.message);
    else setInquiries(data || []);
    setLoading(false);
  };

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) void loadInquiries(); else setLoading(false);
    });
    void supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      if (data.session?.user) void loadInquiries(); else setLoading(false);
    });
    return () => subscription.data.subscription.unsubscribe();
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); setSubmitting(true); setError('');
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) setError(loginError.message);
    setSubmitting(false);
  };

  if (!user) return <main className="flex min-h-screen items-center justify-center bg-[#f5f3ef] px-5"><form onSubmit={handleLogin} className="w-full max-w-md space-y-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white"><ShieldCheck className="h-5 w-5" /></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">VENASTUDIO</p><h1 className="text-2xl font-black text-zinc-950">관리자 로그인</h1></div></div><p className="text-sm leading-relaxed text-zinc-600">Supabase 관리자 계정으로 로그인하면 접수된 문의를 확인할 수 있습니다.</p>{error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<input type="email" required placeholder="관리자 이메일" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-zinc-950" /><input type="password" required placeholder="비밀번호" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-zinc-950" /><button disabled={submitting} className="w-full rounded-full bg-zinc-950 py-3 text-sm font-bold text-white disabled:opacity-50">{submitting ? '로그인 중...' : '로그인'}</button></form></main>;

  const filtered = inquiries.filter((inquiry) => `${inquiry.brand_name} ${inquiry.contact_person} ${inquiry.email} ${inquiry.selected_package}`.toLowerCase().includes(query.toLowerCase()));

  return <main className="min-h-screen bg-[#f5f3ef] px-5 py-10 text-zinc-900 sm:px-8"><div className="mx-auto max-w-7xl space-y-8"><header className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">VENASTUDIO ADMIN</p><h1 className="text-4xl font-black tracking-tight text-zinc-950">문의 관리</h1><p className="mt-2 text-sm text-zinc-600">{inquiries.length}건의 문의</p></div><div className="flex gap-2"><button onClick={() => void loadInquiries()} className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-bold"><RefreshCw className="h-4 w-4" />새로고침</button><button onClick={() => void supabase.auth.signOut()} className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white"><LogOut className="h-4 w-4" />로그아웃</button></div></header><div className="relative"><Search className="absolute left-4 top-3 h-4 w-4 text-zinc-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="브랜드, 담당자, 이메일, 패키지 검색" className="w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-zinc-950" /></div>{error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}{loading ? <p className="py-20 text-center text-sm text-zinc-500">문의 불러오는 중...</p> : <div className="overflow-x-auto rounded-3xl border border-zinc-200 bg-white shadow-sm"><table className="w-full min-w-[900px] text-left text-sm"><thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500"><tr><th className="px-5 py-4">브랜드</th><th className="px-5 py-4">담당자</th><th className="px-5 py-4">이메일</th><th className="px-5 py-4">패키지</th><th className="px-5 py-4">상태</th><th className="px-5 py-4">접수일</th></tr></thead><tbody>{filtered.map((inquiry) => <tr key={inquiry.id} onClick={() => setSelected(inquiry)} className="cursor-pointer border-b border-zinc-100 transition-colors hover:bg-zinc-50 last:border-0"><td className="px-5 py-4 font-bold">{inquiry.brand_name}</td><td className="px-5 py-4">{inquiry.contact_person}</td><td className="px-5 py-4">{inquiry.email}</td><td className="px-5 py-4">{inquiry.selected_package}</td><td className="px-5 py-4"><span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">{statusLabels[inquiry.status] || inquiry.status}</span></td><td className="px-5 py-4 text-zinc-500">{inquiry.created_at ? new Date(inquiry.created_at).toLocaleString('ko-KR') : '-'}</td></tr>)}</tbody></table>{!filtered.length && <p className="p-10 text-center text-sm text-zinc-500">문의가 없습니다.</p>}</div>}</div>{selected && <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"><aside className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"><div className="mb-6 flex items-start justify-between gap-4 border-b border-zinc-200 pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">INQUIRY DETAIL</p><h2 className="mt-1 text-2xl font-black text-zinc-950">{selected.brand_name}</h2><p className="mt-1 text-sm text-zinc-500">{selected.created_at ? new Date(selected.created_at).toLocaleString('ko-KR') : '-'}</p></div><button onClick={() => setSelected(null)} className="rounded-full bg-zinc-100 p-2 text-zinc-600"><X className="h-5 w-5" /></button></div><div className="space-y-1"><DetailRow label="담당자" value={selected.contact_person} /><DetailRow label="회신 이메일" value={selected.email} /><DetailRow label="연락처" value={selected.phone} /><DetailRow label="관심 패키지" value={selected.selected_package} /><DetailRow label="추가 옵션" value={selected.selected_addons?.join(', ')} /><DetailRow label="타깃 국가" value={selected.target_markets?.join(', ')} /><DetailRow label="제품 / 산업" value={selected.category} /><DetailRow label="Instagram" value={selected.instagram_handle} /><DetailRow label="웹사이트" value={selected.website_url} /><DetailRow label="월 예산" value={selected.monthly_budget} /><DetailRow label="문의 내용" value={selected.message} /></div></aside></div>}</main>;
};
