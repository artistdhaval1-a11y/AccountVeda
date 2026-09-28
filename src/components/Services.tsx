import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { Check, CheckSquare, Search, Award } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
  onOpenWorkspace: () => void;
}

export default function Services({ onSelectService, onOpenWorkspace }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'accounting' | 'taxation' | 'compliance' | 'reporting'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'accounting', label: 'Accounting' },
    { id: 'taxation', label: 'Tax & Return Filing' },
    { id: 'compliance', label: 'Statutory Payroll' },
    { id: 'reporting', label: 'Business Reporting' }
  ];

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-24 bg-light relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider">
            <Award className="w-4 h-4" />
            COMPREHENSIVE FINANCIAL ADVISORY
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
            Our Services
          </h2>
          <p className="text-gray-600 font-medium">
            Accurate, reliable financial management solutions designed to streamline business taxation, compliance checkpoints, and operational accounts.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-4 rounded-sm border border-primary/10 shadow-sm">
          {/* Categories list */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-${cat.id}`}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-light/60 hover:text-primary border border-transparent hover:border-primary/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar inside filters */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="service-search"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-gray-50 border border-gray-250 rounded-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary/20 placeholder-gray-400 text-gray-900"
            />
          </div>
        </div>

        {/* Services Grid container */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-sm border border-dashed border-gray-200">
            <CheckSquare className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-bold uppercase text-xs tracking-wider">No services match your request.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="text-primary text-xs font-black uppercase tracking-widest mt-2 block mx-auto cursor-pointer focus:outline-none hover:underline"
            >
              Reset Search Parameters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, idx) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white hover:bg-white/95 border border-primary/10 p-6 rounded-sm shadow-sm hover:shadow-md transition-all flex flex-col justify-between group h-full"
                >
                  <div className="space-y-4">
                    {/* Header badge */}
                    <span className="inline-block px-2.5 py-1 text-[9px] font-extrabold text-secondary bg-secondary/10 tracking-widest uppercase rounded-sm">
                      {service.category === 'accounting' ? 'Bookkeeping' : service.category === 'taxation' ? 'Filing' : service.category === 'compliance' ? 'Payroll' : 'Reporting'}
                    </span>
                    <h3 className="text-lg font-bold text-primary tracking-tight leading-tight group-hover:text-secondary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed font-semibold">
                      {service.description}
                    </p>
                    
                    {/* Bullet list */}
                    <ul className="space-y-2.5 pt-3.5 border-t border-primary/5">
                      {service.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs text-gray-700 font-bold">
                          <Check className="w-3.5 h-3.5 text-secondary mt-0.5 shrink-0" />
                          <span className="leading-tight">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-8 pt-4 border-t border-primary/5 flex items-center justify-between gap-3">
                    {service.id.includes('gst') ? (
                      <button
                        onClick={onOpenWorkspace}
                        className="text-xs font-black uppercase tracking-wider text-secondary hover:text-primary transition-colors hover:underline cursor-pointer flex items-center gap-1 focus:outline-none"
                      >
                        Try GST tool
                      </button>
                    ) : (
                      <div className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">
                        Professional
                      </div>
                    )}
                    <button
                      id={`inquire-btn-${service.id}`}
                      onClick={() => onSelectService(service.title)}
                      className="px-4 py-2.5 bg-primary/5 hover:bg-primary hover:text-white text-primary text-xs font-bold uppercase tracking-widest rounded-sm transition-all cursor-pointer focus:outline-none"
                    >
                      Inquire
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
