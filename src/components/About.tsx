import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Building2, Landmark, Clock } from 'lucide-react';

interface AboutProps {
  onContactUs: () => void;
}

export default function About({ onContactUs }: AboutProps) {
  const statistics = [
    { value: '2023', label: 'Established' },
    { value: '100%', label: 'Compliance Rate' },
    { value: '150+', label: 'Reconciliations done' },
    { value: 'Ahmedabad', label: 'Local Office Hub' }
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* About Section Header & Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              OUR STORY
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight leading-tight">
              About AccountVeda
            </h2>
            
            <p className="text-gray-600 font-medium text-base md:text-lg leading-relaxed">
              AccountVeda was established in 2023 with a singular objective: helping growing businesses manage their accounting, taxation, and statutory compliances efficiently.
            </p>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              We provide continuous bookkeeping, tax planning, GST and TDS filing, and customized management reporting solutions (MIS) tailored for startups, retail traders, service providers, and growing enterprises.
            </p>
            
            <div className="p-5 border-l-4 border-primary bg-light/70 rounded-r-2xl space-y-2">
              <span className="text-xs font-bold tracking-wider text-secondary uppercase block">Our Focus is Simple:</span>
              <p className="text-sm font-semibold text-gray-800 italic">
                "Accurate bookkeeping, seamless tax compliance, clear proactive reporting, and reliable personal support."
              </p>
            </div>
          </div>

          {/* Visual Presentation on Right */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl filter blur-3xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="p-6 bg-light rounded-3xl border border-primary/10 text-center shadow-lg hover:-translate-y-1 transition-transform">
                <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-extrabold text-primary text-base">Timely Filings</h4>
                <p className="text-xs text-gray-500 mt-1">Direct calendar tracking to eliminate late-fees completely.</p>
              </div>
              <div className="p-6 bg-white border border-gray-150 rounded-3xl text-center shadow-lg hover:-translate-y-1 transition-transform">
                <Landmark className="w-10 h-10 text-secondary mx-auto mb-3" />
                <h4 className="font-extrabold text-secondary text-base">Tax Preparedness</h4>
                <p className="text-xs text-gray-500 mt-1">Precise trial balancing ahead of annual audits.</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-6 bg-white border border-gray-150 rounded-3xl text-center shadow-lg hover:-translate-y-1 transition-transform">
                <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-extrabold text-primary text-base">Clean Ledgering</h4>
                <p className="text-xs text-gray-500 mt-1">Accurate, tidy records structured to standard rules.</p>
              </div>
              <div className="p-6 bg-light rounded-3xl border border-primary/10 text-center shadow-lg hover:-translate-y-1 transition-transform">
                <Clock className="w-10 h-10 text-secondary mx-auto mb-3" />
                <h4 className="font-extrabold text-gray-800 text-base">MIS Reporting</h4>
                <p className="text-xs text-gray-500 mt-1">Interactive reports for faster investment choices.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Statistical Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 px-6 sm:px-8 bg-primary rounded-3xl text-white shadow-xl items-stretch">
          {statistics.map((stat, i) => (
            <div key={i} className="text-center flex flex-col justify-center items-center p-2 min-w-0 h-full">
              <span className={`block font-extrabold tracking-tight leading-none mb-2 ${
                stat.value === 'Ahmedabad' 
                  ? 'text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl' 
                  : 'text-3xl md:text-4xl'
              }`}>
                {stat.value}
              </span>
              <span className="block text-[10px] xs:text-xs font-bold text-light/75 tracking-wider uppercase text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
