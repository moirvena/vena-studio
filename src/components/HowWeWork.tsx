import React, { useState } from 'react';
import { HOW_WE_WORK_STEPS } from '../data/content';
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import lamelinImage from './ChatGPT Image Apr 28, 2026, 03_59_16 PM.png';

const stepColors = [
  { stepBadge: 'bg-violet-600 text-white', activeBorder: 'border-violet-500 ring-2 ring-violet-500/20 bg-violet-50/50', text: 'text-violet-700' },
  { stepBadge: 'bg-pink-600 text-white', activeBorder: 'border-pink-500 ring-2 ring-pink-500/20 bg-pink-50/50', text: 'text-pink-700' },
  { stepBadge: 'bg-amber-600 text-white', activeBorder: 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/50', text: 'text-amber-700' },
  { stepBadge: 'bg-emerald-600 text-white', activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50', text: 'text-emerald-700' },
  { stepBadge: 'bg-blue-600 text-white', activeBorder: 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/50', text: 'text-blue-700' },
];

interface HowWeWorkProps {
  language?: 'ko' | 'en';
}

const projects = [
  {
    brand: 'LAMELIN',
    type: 'Cosmetic Brand',
    image: lamelinImage,
    title: 'Air fit / Pore Sun Milk',
    subtitle: 'Lamelin',
    intro: 'From product beauty to emotional storytelling, we shaped a fresh skincare narrative that feels premium, local, and highly relatable across global audience segments.',
    story:
      'From summertime skin rituals to premium product storytelling, the campaign brought a glossy editorial look into the product experience. We paired close-up portraiture with a modern beauty aesthetic to spotlight texture, sunscreen performance, and a clean, confident lifestyle.',
    gallery: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521590832167-7e4a1a1fd1a9?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    brand: 'IKEA',
    type: 'Marketing Assets',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    title: 'Cooking Sessions',
    subtitle: 'IKEA',
    intro: 'We helped IKEA turn a local food event into a timely campaign story across digital and outdoor touchpoints, blending product education with warm, social-first storytelling.',
    story:
      'The concept centered on bringing people together through food, design, and everyday rituals. We used vibrant color, bold modular layouts, and a clear editorial rhythm to turn event coverage into a cohesive campaign that felt live, friendly, and highly shareable.',
    gallery: [
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    brand: 'LEGO',
    type: 'Marketing Assets',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    title: 'Playful Brand Activation',
    subtitle: 'LEGO',
    intro: 'A colorful campaign system designed to turn a playful brand narrative into an immersive physical-and-digital experience.',
    story:
      'The work focused on dimensional storytelling, textured product moments, and bright environments designed for photo-first engagement. Every asset was built to feel approachable, creative, and shareable while staying aligned with the brand’s playful identity.',
    gallery: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    brand: 'BILLY',
    type: 'Marketing Assets',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    title: 'Retail Visual Storytelling',
    subtitle: 'BILLY',
    intro: 'We built a retail-first visual storytelling system that made product positioning feel modern, premium, and highly sellable across channels.',
    story:
      'The campaign moved from a functional product showcase into a lifestyle-driven story. Clean composition, strong contrast, and product-led shots were used to create a premium visual language with a memorable social reach.',
    gallery: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    ],
  },
];

export const HowWeWork: React.FC<HowWeWorkProps> = ({ language = 'ko' }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);
  const isKo = language === 'ko';

  return (
    <section id="how-we-work" className="border-b border-zinc-200/80 bg-[#39c4f4] py-8 sm:py-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedProject ? (
          <div className="rounded-[32px] bg-[#0b0c0d] px-4 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <h3 className="mb-8 text-center text-[2.5rem] font-black tracking-[-0.08em] text-white sm:text-[4.4rem] lg:text-[5.1rem]">
              Our Clients
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {projects.map((item, index) => (
                <button
                  key={item.brand}
                  type="button"
                  onClick={() => setSelectedProject(item)}
                  className="overflow-hidden rounded-[28px] border border-white/10 bg-[#101315] p-2 text-left shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition-transform hover:-translate-y-1"
                >
                  <div className="relative h-[360px] overflow-hidden rounded-[22px] bg-zinc-900">
                    <img
                      src={item.image}
                      alt={item.brand}
                      className="h-full w-full object-cover"
                    />

                    {index === 0 && (
                      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/45" />
                    )}

                    {index === 0 && (
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <div className="text-[0.8rem] tracking-[0.08em] uppercase text-white/80">Lamelin</div>
                        <div className="mt-1 text-[1.2rem] font-semibold">Air fit / Pore Sun Milk</div>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex items-end justify-between gap-3 px-2 pb-2 text-white">
                    <div>
                      <div className="text-[1.5rem] font-bold tracking-[-0.05em]">{item.brand}</div>
                      <div className="text-[0.72rem] uppercase tracking-[0.06em] text-white/65">
                        {item.type}
                      </div>
                    </div>
                    {index === 0 && (
                      <div className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[0.62rem] uppercase tracking-[0.08em] text-white/80">
                        Cosmetic
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[32px] bg-[#f4f1ee] text-zinc-900 shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
            <div className="border-b border-zinc-200 bg-white/70 px-4 py-3 sm:px-8">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center gap-2 text-sm font-bold text-zinc-700"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Back to work
              </button>
            </div>

            <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
              <div className="mb-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
                <div className="overflow-hidden rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                  <img src={selectedProject.image} alt={selectedProject.brand} className="h-[420px] w-full object-cover" />
                </div>

                <div className="space-y-5">
                  <div className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-zinc-500">Case study</div>
                  <h3 className="text-4xl font-black tracking-[-0.08em] text-zinc-900 sm:text-5xl">{selectedProject.title}</h3>
                  <p className="text-base leading-relaxed text-zinc-700">{selectedProject.intro}</p>
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
                    <div className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-zinc-500">Brand</div>
                    <div className="mt-2 text-2xl font-black tracking-[-0.06em] text-zinc-900">{selectedProject.subtitle}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[2.5rem] font-black tracking-[-0.08em] text-zinc-900 sm:text-[4rem]">Story</h4>
                <p className="max-w-5xl text-lg leading-relaxed text-zinc-700 sm:text-2xl">
                  {selectedProject.story}
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {selectedProject.gallery.map((photo, idx) => (
                  <div
                    key={`${selectedProject.brand}-${idx}`}
                    className="overflow-hidden rounded-[24px] bg-zinc-200 shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
                  >
                    <img src={photo} alt={`${selectedProject.brand} ${idx + 1}`} className="h-[260px] w-full object-cover" />
                  </div>
                ))}
              </div>

              <div className="mt-12 rounded-[32px] bg-[#0b0c0d] px-6 py-10 text-center text-white sm:px-10">
                <h4 className="text-4xl font-black tracking-[-0.08em] sm:text-6xl">Ready to see transformative results?</h4>
                <button
                  type="button"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#f6d433] px-8 py-4 text-base font-black text-zinc-900 transition-transform hover:scale-[1.01]"
                >
                  Let&apos;s chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
