import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calculator, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenWorkspace: () => void;
  onOpenKnowledge: () => void;
  logo: string;
}

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenWorkspace,
  onOpenKnowledge,
  logo
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'why', label: 'Why Us' },
    { id: 'founders', label: 'Founders' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-primary/10 shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2.5 select-none">
          <div className="relative w-9 h-9 rounded-md overflow-hidden flex items-center justify-center shadow-sm bg-neutral-100 border border-primary/5 select-none">
            <img 
              src={logo} 
              alt="AccountVeda Logo" 
              referrerPolicy="no-referrer"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="w-full h-full object-contain p-0.5 pointer-events-none select-none"
            />
          </div>

          <div className="flex flex-col text-left items-start">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('home')}
                className="text-2xl font-extrabold tracking-tight text-primary block leading-none hover:text-secondary transition-colors focus:outline-none"
              >
                AccountVeda
              </button>
            </div>
            
            <span className="text-[8px] font-bold tracking-[0.25em] text-secondary/90 block uppercase mt-1">
              Accurate • Compliant
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`text-xs font-bold tracking-wider uppercase hover:text-secondary transition-colors cursor-pointer relative py-1 focus:outline-none ${
                  activeTab === item.id ? 'text-primary' : 'text-gray-500/80'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
          <li>
            <button id="nav-knowledge-btn" onClick={onOpenKnowledge} className="px-5 py-2 text-xs font-bold tracking-widest uppercase text-primary bg-white hover:bg-light border border-primary/20 rounded-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-sm focus:outline-none">
              <BookOpen className="w-3.5 h-3.5" /> Knowledge Portal
            </button>
          </li>
          <li>
            <button
              id="nav-calc-btn"
              onClick={onOpenWorkspace}
              className="px-5 py-2 text-xs font-bold tracking-widest uppercase text-white bg-primary hover:bg-secondary rounded-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-sm focus:outline-none"
            >
              <Calculator className="w-3.5 h-3.5" />
              Tax Workspace
            </button>
          </li>
        </ul>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button id="mobile-knowledge-trigger" onClick={onOpenKnowledge} className="p-2 text-primary bg-light hover:bg-secondary hover:text-white rounded-lg transition-colors focus:outline-none" title="Knowledge Portal"><BookOpen className="w-4 h-4" /></button>
          <button
            id="mobile-calc-trigger"
            onClick={onOpenWorkspace}
            className="p-2 text-white bg-secondary hover:bg-primary rounded-lg transition-colors focus:outline-none"
            title="Tax Workspace"
          >
            <Calculator className="w-4 h-4" />
          </button>
          <button
            id="mobile-menu-btn"
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="p-2 text-primary hover:bg-light rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-panel"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 top-20 bg-black/10 cursor-default"
            />
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain"
            >
              <ul className="px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left py-2 text-base font-semibold transition-colors cursor-pointer focus:outline-none ${
                      activeTab === item.id ? 'text-primary pl-2 border-l-2 border-primary' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2"><button id="mobile-drawer-knowledge-btn" onClick={() => { setIsOpen(false); onOpenKnowledge(); }} className="w-full py-3 bg-light text-primary border border-primary/10 font-bold rounded-xl flex items-center justify-center gap-2"><BookOpen className="w-4 h-4" /> Knowledge Portal</button></li>
              <li>
                <button
                  id="mobile-drawer-calc-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenWorkspace();
                  }}
                  className="w-full py-3 bg-secondary text-white font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Launch Workspace Tools
                </button>
              </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
