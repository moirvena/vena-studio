import React from 'react';
import { WHY_VENA } from '../data/content';
import { Sparkles, Globe, Heart, DollarSign, Layers, ArrowRight } from 'lucide-react';

const pillarVisuals: Record<string, { icon: any; color: string; badge: string; border: string; bg: string }> = {
  'GLOBAL FIRST': {
    icon: Globe,
    color: 'text-violet-600',
    badge: 'bg-violet-100 text-violet-800 border-violet-200',
    border: 'border-violet-200 hover:border-violet-400',
    bg: 'bg-gradient-to-b from-violet-50/40 to-white',
  },
  'CONTENT FIRST': {
    icon: Heart,
    color: 'text-pink-600',
    badge: 'bg-pink-100 text-pink-800 border-pink-200',
    border: 'border-pink-200 hover:border-pink-400',
    bg: 'bg-gradient-to-b from-pink-50/40 to-white',
  },
  'SMART PRICE': {
    icon: DollarSign,
    color: 'text-emerald-600',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    border: 'border-emerald-200 hover:border-emerald-400',
    bg: 'bg-gradient-to-b from-emerald-50/40 to-white',
  },
  'ONE STOP': {
    icon: Layers,
    color: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-800 border-blue-200',
    border: 'border-blue-200 hover:border-blue-400',
    bg: 'bg-gradient-to-b from-blue-50/40 to-white',
  },
};

interface WhyVenaProps {
  language?: 'ko' | 'en';
}

export const WhyVena: React.FC<WhyVenaProps> = ({ language = 'ko' }) => {
  const isKo = language === 'ko';

  return (
    <section id="why-vena" className="border-b border-zinc-800 bg-[#0b0c0d] py-20 text-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="mb-10 text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Our metrics</p>
          <h2 className="text-4xl font-black tracking-[-0.08em] text-white sm:text-6xl">&lt;24h</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: '<24h', label: 'turnaround', card: 'bg-[#ff4d8d] border-[#ff8fba]', text: 'text-zinc-950', labelText: 'text-zinc-900/75' },
            { value: '∞', label: 'creative ideas', card: 'bg-[#39c4f4] border-[#8de5ff]', text: 'text-zinc-950', labelText: 'text-zinc-900/75' },
            { value: '100%', label: 'tailored strategy', card: 'bg-[#ffc928] border-[#ffe58a]', text: 'text-zinc-950', labelText: 'text-zinc-900/75' },
            { value: '6', label: 'core services', card: 'bg-[#a855f7] border-[#d8a8ff]', text: 'text-white', labelText: 'text-white/80' },
          ].map((item) => (
            <div key={item.label} className={`rounded-[28px] border p-6 text-center shadow-[0_12px_30px_rgba(0,0,0,0.3)] ${item.card}`}>
              <div className={`text-4xl font-black tracking-[-0.08em] sm:text-5xl ${item.text}`}>{item.value}</div>
              <div className={`mt-3 text-[11px] font-bold uppercase tracking-[0.2em] ${item.labelText}`}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
