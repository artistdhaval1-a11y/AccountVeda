import React, { useState, useEffect } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Founders from './components/Founders';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Workspace from './components/Workspace';
import logoImg from './assets/images/accountveda_logo.svg';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [workspaceTab, setWorkspaceTab] = useState<'gst' | 'tax' | 'deadlines'>('gst');
  const [logo, setLogo] = useState(logoImg);
  const [customChaitali, setCustomChaitali] = useState<string | undefined>(undefined);
  const [customDhaval, setCustomDhaval] = useState<string | undefined>(undefined);

  const openWorkspaceToTab = (tab: 'gst' | 'tax' | 'deadlines') => {
    setWorkspaceTab(tab);
    setIsWorkspaceOpen(true);
  };

  const [showScreenCover, setShowScreenCover] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [securityAlert, setSecurityAlert] = useState<string | null>(null);

  // Full-scale Anti-Screenshot & Copyright Protection Engine
  useEffect(() => {
    // Helper to flash security alerts
    let alertTimeout: any;
    const triggerSecurityAlert = (message: string) => {
      setSecurityAlert(message);
      clearTimeout(alertTimeout);
      alertTimeout = setTimeout(() => {
        setSecurityAlert(null);
      }, 3500);
    };

    // 1. Right Click (Context Menu) Prevention
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerSecurityAlert("Right-click is disabled to protect proprietary accounting systems.");
    };

    // 2. Drag Prevention for elements
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // 3. Content Copy & Cut Prevention
    const handleCopyCut = (e: ClipboardEvent) => {
      e.preventDefault();
      triggerSecurityAlert("Content copying is locked due to regulatory compliance policies.");
    };

    // 4. Keyboard Shortcuts Prevention (DevTools, Screenshots, Printing, Saving)
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const code = e.keyCode;

      // PrintScreen Key detection
      if (e.key === 'PrintScreen' || code === 44) {
        e.preventDefault();
        // Immediately flash the solid cover to ruin the screenshot buffer
        setShowScreenCover(true);
        triggerSecurityAlert("Screenshots are strictly prohibited by AccountVeda Security.");
        setTimeout(() => setShowScreenCover(false), 2000);
        return;
      }

      // Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5 (macOS Screenshots)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && ['3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        setShowScreenCover(true);
        triggerSecurityAlert("System snapshot shortcut blocked.");
        setTimeout(() => setShowScreenCover(false), 2000);
        return;
      }

      // Win+Shift+S (Windows Snipping Tool)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && key === 's') {
        e.preventDefault();
        setShowScreenCover(true);
        triggerSecurityAlert("Windows Snip shortcut blocked.");
        setTimeout(() => setShowScreenCover(false), 2000);
        return;
      }

      // Print page (Ctrl/Cmd + P)
      if ((e.ctrlKey || e.metaKey) && key === 'p') {
        e.preventDefault();
        triggerSecurityAlert("Printing page is blocked under ISO 27001 data isolation policies.");
        return;
      }

      // Save page (Ctrl/Cmd + S)
      if ((e.ctrlKey || e.metaKey) && key === 's') {
        e.preventDefault();
        triggerSecurityAlert("Page archiving is disabled.");
        return;
      }

      // DevTools (F12)
      if (e.key === 'F12' || code === 123) {
        e.preventDefault();
        triggerSecurityAlert("Inspector Tools are restricted for professional data integrity.");
        return;
      }

      // DevTools combinations (Ctrl/Cmd + Shift + I/C/J or Cmd + Opt + I/C/J)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'c', 'j'].includes(key)) {
        e.preventDefault();
        triggerSecurityAlert("Developer inspector tools are restricted.");
        return;
      }

      // Source code view (Ctrl/Cmd + U)
      if ((e.ctrlKey || e.metaKey) && key === 'u') {
        e.preventDefault();
        triggerSecurityAlert("Source inspection is disabled.");
        return;
      }
    };

    // 5. Window Blur Detection (Triggers when background screenshot tool is opened/focused)
    const handleWindowBlur = () => {
      // Small timeout to prevent false positives during click actions
      setTimeout(() => {
        if (!document.hasFocus()) {
          setIsBlurred(true);
        }
      }, 150);
    };

    const handleWindowFocus = () => {
      setIsBlurred(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };

    // Attach listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopyCut);
    document.addEventListener('cut', handleCopyCut);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopyCut);
      document.removeEventListener('cut', handleCopyCut);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(alertTimeout);
    };
  }, []);

  // Load custom brand assets and sync testimonials if they exist in localStorage
  useEffect(() => {
    const loadCustomAssetsAndTestimonials = async () => {
      try {
        const res = await fetch('/api/custom-assets-status');
        if (res.ok) {
          const status = await res.json();
          const t = Date.now();
          if (status.logo) {
            setLogo(`/custom_assets/logo.svg?t=${t}`);
          }
          if (status.chaitali) {
            setCustomChaitali(`/custom_assets/chaitali.jpg?t=${t}`);
          }
          if (status.dhaval) {
            setCustomDhaval(`/custom_assets/dhaval.jpg?t=${t}`);
          }
        }
      } catch (err) {
        console.error('Failed to load custom brand assets:', err);
      }

      const customTestimonials = localStorage.getItem('custom_testimonials');
      if (customTestimonials) {
        try {
          await fetch('/api/save-testimonials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: customTestimonials
          });
          console.log('Successfully synced testimonials to server files');
        } catch (err) {
          console.error('Failed to sync testimonials to server:', err);
        }
      }
    };
    loadCustomAssetsAndTestimonials();
  }, []);

  // States for pre-populating contact form when navigating from individual widgets/services
  const [presetService, setPresetService] = useState('');
  const [presetMessage, setPresetMessage] = useState('');

  // Handle intersection observer to highlight currently visible navbar tab
  useEffect(() => {
    const handleScrollIntersection = () => {
      const sections = ['home', 'about', 'services', 'why', 'founders', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 120; // offset

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollIntersection);
    return () => window.removeEventListener('scroll', handleScrollIntersection);
  }, []);

  const handleInquireForService = (serviceTitle: string) => {
    setPresetService(serviceTitle);
    setPresetMessage(`Hello AccountVeda, I would like to request a professional consultation/quote regarding your "${serviceTitle}" services list.`);
    
    // Smooth scroll to contact form section
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleContactPresetChange = (serviceTitle: string = '', messageText: string = '') => {
    setPresetService(serviceTitle);
    setPresetMessage(messageText);

    // Smooth scroll to contact form section
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const clearPresets = () => {
    setPresetService('');
    setPresetMessage('');
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* 1. Frosted security glass screen when window loses focus (neutralizes background screen recording & snipping tools) */}
      {isBlurred && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[99999] flex flex-col items-center justify-center text-center p-6 select-none">
          <div className="w-16 h-16 bg-[#6D1ED1]/20 rounded-full flex items-center justify-center border border-[#6D1ED1]/30 text-[#6D1ED1] mb-5 animate-pulse">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-white text-base font-extrabold uppercase tracking-widest mb-2">Content Shield Active</h2>
          <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-sm mb-6">
            To prevent unauthorized screenshot utilities and scraping tools, page content is temporarily locked when browser focus is shifted.
          </p>
          <button 
            onClick={() => window.focus()} 
            className="px-6 py-2.5 bg-[#6D1ED1] hover:bg-[#5b19b0] text-white text-[10px] font-black uppercase tracking-widest rounded-sm transition-all shadow-lg active:scale-95"
          >
            Unlock Content
          </button>
        </div>
      )}

      {/* 2. Instant black cover on direct snapshot keystrokes to destroy screenshot capture buffer */}
      {showScreenCover && (
        <div id="screenshot-mask" className="fixed inset-0 bg-black z-[999999] flex flex-col items-center justify-center text-center p-6 select-none">
          <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center border border-red-500/30 text-red-500 mb-4 animate-bounce">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-white text-lg font-black uppercase tracking-widest mb-2">Capture Prevented</h2>
          <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">
            Compliance Policy restricts local snapshot generation.
          </p>
        </div>
      )}

      {/* 3. Floating Security Alert Notice banner */}
      {securityAlert && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100000] bg-neutral-900 border border-red-500/30 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce shadow-red-500/5 max-w-md w-[calc(100%-2rem)]">
          <div className="p-2 bg-red-500/10 text-red-500 rounded-lg shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black text-red-500 block uppercase tracking-widest">Security System</span>
            <span className="text-xs font-semibold text-gray-200 mt-0.5 block leading-normal">{securityAlert}</span>
          </div>
        </div>
      )}

      <div className={`relative min-h-screen bg-white text-gray-900 font-sans antialiased transition-all duration-300 ${isBlurred ? 'filter blur-[24px] pointer-events-none select-none' : ''}`}>
        {/* Dynamic Header Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenWorkspace={() => openWorkspaceToTab('gst')}
          logo={logo}
        />

        {/* Main Page Layout Units */}
        <main>
          <Hero
            onExploreServices={() => handleScrollToSection('services')}
            onContactUs={handleContactPresetChange}
            onOpenWorkspace={() => openWorkspaceToTab('gst')}
          />
          
          <About
            onContactUs={() => handleScrollToSection('contact')}
          />
          
          <Services
            onSelectService={handleInquireForService}
            onOpenWorkspace={() => openWorkspaceToTab('gst')}
          />
          
          <WhyUs
            onContactUs={() => handleScrollToSection('contact')}
          />
          
          <Founders
            onContactUs={() => handleScrollToSection('contact')}
            customChaitali={customChaitali}
            customDhaval={customDhaval}
          />
          
          <Testimonials />
          
          <Contact
            presetService={presetService}
            presetMessage={presetMessage}
            onClearPresets={clearPresets}
          />
        </main>

        {/* Footer */}
        <Footer logo={logo} />

        {/* Interactive Modal Workspace (GST, Tax slabs comparison, Deadlines list) */}
        {isWorkspaceOpen && (
          <Workspace
            isOpen={isWorkspaceOpen}
            onClose={() => setIsWorkspaceOpen(false)}
            onContactUs={(service, message) => {
              setIsWorkspaceOpen(false);
              handleContactPresetChange(service, message);
            }}
            defaultTab={workspaceTab}
          />
        )}

        {/* Floating WhatsApp CTA Widget */}
        <div className="fixed bottom-6 right-6 z-50 flex items-center group">
          {/* Tooltip text box */}
          <div className="mr-3 bg-white text-gray-800 text-[11px] font-black uppercase tracking-widest py-2 px-4 rounded-xl shadow-lg border border-gray-150 transform scale-0 group-hover:scale-100 origin-right transition-all duration-300 whitespace-nowrap pointer-events-none select-none flex items-center gap-2 shadow-primary/5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Chat on WhatsApp
          </div>

          <a
            href="https://wa.me/917405652991?text=Hello%20AccountVeda%2C%20I%20would%20like%20to%20inquire%20about%20your%20professional%20bookkeeping%20and%20tax%20filing%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 relative border border-white/10 group/btn"
            title="Chat on WhatsApp"
          >
            {/* Pulsing ring outline background */}
            <span className="absolute -inset-1 rounded-full bg-[#25D366]/25 animate-ping opacity-70 group-hover/btn:opacity-90 duration-1000 -z-10" />
            
            {/* Perfectly centered official WhatsApp icon */}
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
