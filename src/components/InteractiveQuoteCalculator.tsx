import React from 'react';

interface InteractiveQuoteCalculatorProps {
  onProceedWithQuote: (quoteData: {
    selectedPackage: string;
    selectedAddons: string[];
    targetMarkets: string[];
    estimatedCost: number;
    category: string;
  }) => void;
}

export const InteractiveQuoteCalculator: React.FC<InteractiveQuoteCalculatorProps> = ({
}) => {
  return (
  <section id="calculator" className="border-b border-zinc-200/80 bg-zinc-50/50 py-24 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 shadow-[0_25px_80px_rgba(24,24,27,0.15)]">
          <video
            src="/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="block h-[280px] w-full object-cover sm:h-[440px] lg:h-[620px]"
          />
        </div>
      </div>
    </section>
  );
};
