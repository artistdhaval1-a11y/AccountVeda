import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, Award, MapPin } from 'lucide-react';
import chaitaliImg from '../assets/images/founder_chaitali_1782221629255.jpg';
import dhavalImg from '../assets/images/founder_dhaval_1782221644891.jpg';
 
interface FoundersProps {
  onContactUs: () => void;
  customChaitali?: string;
  customDhaval?: string;
}
 
export default function Founders({ onContactUs, customChaitali, customDhaval }: FoundersProps) {
  const photos = {
    chaitali: customChaitali || chaitaliImg,
    dhaval: customDhaval || dhavalImg,
  };
 
  const foundersList = [
    {
      id: 'chaitali',
      name: 'Chaitali Vinchhi',
      role: 'Founder',
      qualifications: ['B.Com'],
      image: photos.chaitali,
      bio: 'Expert in day-to-day bookkeeping, transactional accounting structures, and continuous statutory bank reconciliation.',
      focus: 'Bookkeeping Operations & EPF/ESIC Statutory Filings',
      defaultImage: chaitaliImg
    },
    {
      id: 'dhaval',
      name: 'Dhaval Vinchhi',
      role: 'Co-Founder',
      qualifications: ['B.Com', 'PGDBA (Finance)'],
      image: photos.dhaval,
      bio: 'Over a decade of active financial advisory expertise. Specializes in GST returns filing, quarterly TDS compilations, and financial account finalization processes.',
      focus: 'Tax Filings, Reconciliation Strategy & MIS Audit Advisory',
      defaultImage: dhavalImg
    }
  ];
 
  return (
    <section id="founders" className="py-24 bg-light relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
            Our Founders
          </h2>
          <p className="text-gray-600 font-medium">
            Meet the leaders of AccountVeda, steering growth for business enterprises with deep strategic finance acumen and direct hands-on support.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {foundersList.map((founder, i) => (
            <div
              key={i}
              className="bg-white border border-primary/10 rounded-sm p-6 md:p-8 shadow-sm transition-all flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Frame Portrait */}
                <div className="relative w-full aspect-square md:aspect-[4/3] rounded-sm overflow-hidden bg-gray-50 border border-primary/5 select-none group/portrait">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    referrerPolicy="no-referrer"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    className="w-full h-full object-cover object-top pointer-events-none select-none"
                  />

                  {/* Floating role badge */}
                  <span className="absolute bottom-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-sm z-20">
                    {founder.role}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-extrabold text-primary group-hover:text-secondary transition-colors tracking-tight">
                    {founder.name}
                  </h3>

                  {/* Qualifications */}
                  <div className="flex flex-wrap gap-2 items-center text-xs font-bold text-gray-500">
                    <GraduationCap className="w-4 h-4 text-secondary shrink-0" />
                    <span>{founder.qualifications.join(' | ')}</span>
                  </div>

                  <p className="text-gray-600 text-xs leading-relaxed font-semibold">
                    {founder.bio}
                  </p>
                </div>
              </div>

              {/* Bottom focus highlights */}
              <div className="mt-8 pt-4 border-t border-primary/5 space-y-3">
                <div className="flex items-start gap-2 text-xs">
                  <Award className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="font-bold text-gray-700 leading-tight">Focus: {founder.focus}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                  Ahmedabad, Gujarat, India
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
