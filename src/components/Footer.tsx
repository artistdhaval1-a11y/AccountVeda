import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, FileSpreadsheet } from 'lucide-react';
import logoImg from '../assets/images/accountveda_logo.svg';

interface FooterProps {
  logo?: string;
}

export default function Footer({ logo }: FooterProps) {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-dark text-white border-t border-neutral-800 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        
        {/* Brand */}
        <div className="space-y-4 text-left select-none">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-md overflow-hidden flex items-center justify-center shadow-sm bg-white/5 select-none">
              <img 
                src={logo || logoImg} 
                alt="AccountVeda Logo" 
                referrerPolicy="no-referrer"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                className="w-full h-full object-contain p-0.5 pointer-events-none select-none"
              />
              {/* Protective overlay blocking direct image interactions */}
              <div 
                className="absolute inset-0 bg-transparent z-10 select-none cursor-default"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-white uppercase block">
              AccountVeda
            </span>
          </div>
          <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs">
            Professional accounting, taxation bookkeeping, internal MIS audits and statutory compliance solutions based in Ahmedabad, Gujarat since 2023.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4 text-left">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Our Operations</h4>
          <ul className="space-y-2 text-xs font-semibold text-gray-300">
            <li>Bookkeeping & Audits</li>
            <li>GST Returns (GSTR-1, 3B)</li>
            <li>TDS Retentions & Forms</li>
            <li>Statutory EPF & ESIC Filings</li>
          </ul>
        </div>

        {/* Contact Links */}
        <div className="space-y-4 text-left">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">General Office</h4>
          <ul className="space-y-2 text-xs font-semibold text-gray-300">
            <li className="flex items-center gap-2 min-w-0">
              <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>+91 74056 52991</span>
            </li>
            <li className="flex items-center gap-2 min-w-0">
              <Mail className="w-3.5 h-3.5 text-secondary shrink-0" />
              <a 
                href="mailto:dhaval_vinchhi@outlook.com" 
                className="hover:text-white truncate break-all block min-w-0 max-w-full"
                title="Send email to Dhaval Vinchhi"
              >
                dhaval_vinchhi@outlook.com
              </a>
            </li>
            <li className="flex items-center gap-2 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="truncate">Ahmedabad, Gujarat, India</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copy Notice footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-500">
        <span>© 2026 AccountVeda. All Rights Reserved.</span>
        
        <button
          onClick={handleScrollTop}
          className="p-3 bg-neutral-800 hover:bg-primary text-gray-400 hover:text-white rounded-full transition-colors flex items-center justify-center gap-1 cursor-pointer focus:outline-none"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
          Top
        </button>
      </div>
    </footer>
  );
}
