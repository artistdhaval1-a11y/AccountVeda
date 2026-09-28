import React, { useState } from 'react';
import { TESTIMONIALS } from '../data';
import { Star, MessageSquareQuote } from 'lucide-react';

interface TestimonialType {
  quote: string;
  author: string;
  role: string;
}

export default function Testimonials() {
  const [list] = useState<TestimonialType[]>(() => {
    const saved = localStorage.getItem('custom_testimonials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing custom testimonials from local storage:', e);
      }
    }
    return TESTIMONIALS;
  });

  return (
    <section id="testimonials" className="py-24 bg-white relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-wider">
            <MessageSquareQuote className="w-4 h-4" />
            REAL WORD FROM BUSINESS PARTNERS
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 font-medium">
            Read how we empower financial advisors, corporate auditors, and trading teams with impeccable precision.
          </p>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((t, idx) => {
            return (
              <div
                key={idx}
                className="border p-8 rounded-3xl relative flex flex-col justify-between transition-all duration-300 group bg-light/60 border-primary/5 hover:bg-white hover:border-gray-200 hover:shadow-xl"
              >
                <div className="space-y-6">
                  {/* Visual stars rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>

                  <blockquote className="text-sm font-semibold text-gray-700 italic leading-relaxed block relative">
                    {t.quote}
                  </blockquote>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-150/50">
                  <span className="block text-[15px] font-black text-primary tracking-tight">
                    {t.author}
                  </span>
                  <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    {t.role}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

