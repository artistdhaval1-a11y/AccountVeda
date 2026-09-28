import React from 'react';
import { CHALLENGES, SOLUTIONS } from '../data';
import { AlertCircle, CheckCircle2, TrendingUp, Handshake, ShieldAlert, Award } from 'lucide-react';

interface WhyUsProps {
  onContactUs: () => void;
}

export default function WhyUs({ onContactUs }: WhyUsProps) {
  return (
    <section id="why" className="py-24 bg-white relative scroll-mt-12">
      {/* Decorative vector elements */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-wider">
            <Handshake className="w-4 h-4" />
            BUSINESS ENABLEMENT PARTNERS
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight leading-tight">
            Why Businesses Choose AccountVeda
          </h2>
          <p className="text-gray-600 font-medium text-sm md:text-base">
            We bridge the gap between financial complexity and operational clarity. Here is how we transform standard accounting struggles into solid growth signals.
          </p>
        </div>

        {/* Major Challenge vs Solutions Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Business Challenges: Left panel */}
          <div className="lg:col-span-5 bg-gradient-to-b from-red-50/50 to-red-50/10 p-8 rounded-3xl border border-red-100 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-red-700">
                <ShieldAlert className="w-6 h-6" />
                <h3 className="text-lg font-extrabold tracking-tight">The Common Pitfalls</h3>
              </div>
              <p className="text-xs text-red-600 font-semibold leading-relaxed">
                Startups and merchants lose significant capital, confidence, and focus because of unstructured bookkeeping frameworks.
              </p>

              <ul className="space-y-4 pt-4 border-t border-red-150/50">
                {CHALLENGES.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-gray-700 leading-normal">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 p-4 bg-white/80 rounded-2xl border border-red-100 text-xs text-neutral-600 select-none text-center">
              Our target: Transform roadblocks into simple structures.
            </div>
          </div>

          {/* AccountVeda Solutions: Right panel */}
          <div className="lg:col-span-7 bg-primary p-8 md:p-10 rounded-3xl text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full filter blur-2xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2.5 text-light">
                <TrendingUp className="w-6 h-6 text-secondary" />
                <h3 className="text-xl font-extrabold tracking-tight">The AccountVeda Difference</h3>
              </div>
              <p className="text-xs text-light/75 font-semibold">
                By onboarding our virtual accounting and prompt compliance operations, you unlock flawless performance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                {SOLUTIONS.map((solution, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                      <h4 className="font-extrabold text-sm text-white tracking-tight">{solution.title}</h4>
                    </div>
                    <p className="text-xs text-light/80 leading-relaxed font-medium pl-7">{solution.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
              <span className="text-xs font-semibold text-light/75 text-center sm:text-left leading-relaxed">
                Save 60% of physical accountant overheads with AccountVeda.
              </span>
              <button
                id="solutions-cta"
                onClick={onContactUs}
                className="px-6 py-3 bg-secondary hover:bg-white hover:text-primary text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-md focus:outline-none"
              >
                Schedule Free Consultation
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
