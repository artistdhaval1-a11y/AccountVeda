import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Inquiry } from '../types';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  presetService: string;
  presetMessage: string;
  onClearPresets: () => void;
}

export default function Contact({ presetService, presetMessage, onClearPresets }: ContactProps) {
  // Form input states
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('Proprietorship');
  const [selectedService, setSelectedService] = useState('Bookkeeping & Accounting');
  const [message, setMessage] = useState('');

  // Status feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  // Inquiries listing (stored in localStorage)
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Preload presets if passed from parent
  useEffect(() => {
    if (presetService) {
      setSelectedService(presetService);
    }
    if (presetMessage) {
      setMessage(presetMessage);
    }
  }, [presetService, presetMessage]);

  // Load inquiries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('accountveda_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        // Safe fallback
      }
    } else {
      // Prepopulate with a mock listing so there is immediate feedback
      const initialMock: Inquiry[] = [
        {
          id: '1',
          timestamp: new Date(Date.now() - 3600000 * 2).toLocaleString('en-IN'),
          businessName: 'Apex Logistics Hub',
          contactName: 'Nirav Patel',
          phone: '+91 98765 43210',
          email: 'nirav@apexcorp.in',
          businessType: 'Private Limited',
          servicesSelected: ['GST Compliance', 'MIS Reporting'],
          message: 'Looking for prompt monthly bookkeeping auditing and input tax matching.',
          status: 'Scheduled'
        }
      ];
      localStorage.setItem('accountveda_inquiries', JSON.stringify(initialMock));
      setInquiries(initialMock);
    }
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !phone || !email) {
      setValidationError('Please fill out all required fields.');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);

    const newInquiry: Inquiry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleString('en-IN'),
      businessName: businessName || 'Proprietor Firm',
      contactName,
      phone,
      email,
      businessType,
      servicesSelected: [selectedService],
      message: message || 'No custom message specified.',
      status: 'Received'
    };

    // Store locally first
    const updatedList = [newInquiry, ...inquiries];
    localStorage.setItem('accountveda_inquiries', JSON.stringify(updatedList));
    setInquiries(updatedList);

    // Format WhatsApp message to owner's WhatsApp number (+91 74056 52991)
    const formattedText = `*New Onboarding Intake Submission*
----------------------------------------
*Company Name:* ${businessName || 'Proprietor Firm'}
*Constitution:* ${businessType}
*Contact Name:* ${contactName}
*Phone Number:* ${phone}
*Email Address:* ${email}
*Service Selected:* ${selectedService}
*Message / Requirements:* ${message || 'No custom message specified.'}
----------------------------------------
Inquiry ID: ${newInquiry.id}`;

    const whatsappUrl = `https://wa.me/917405652991?text=${encodeURIComponent(formattedText)}`;
    setWhatsappRedirectUrl(whatsappUrl);

    // Try to open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setSubmitSuccess(true);
    onClearPresets();

    // Reset fields
    setBusinessName('');
    setContactName('');
    setPhone('');
    setEmail('');
    setMessage('');

    // Auto clear alert
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 12000);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-primary-dark to-secondary text-white relative scroll-mt-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Let's Connect
          </h2>
          <p className="text-light/80 font-medium select-none text-sm md:text-base">
            Initiate compliance onboarding. Request advice or book a meeting with our veteran accountants today.
          </p>
        </div>

        {/* Major split container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: Info & trackers */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Cards */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold border-b border-white/10 pb-2">Direct Channels</h3>
              
              <div className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white font-extrabold shadow-lg shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-light/75 font-bold block uppercase tracking-wider">Call or WhatsApp</span>
                  <a href="tel:+917405652991" className="text-base sm:text-lg font-extrabold hover:underline block text-white">
                    +91 74056 52991
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white font-extrabold shadow-lg shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 w-full">
                  <span className="text-xs text-light/75 font-bold block uppercase tracking-wider">Email Correspondence</span>
                  <a href="mailto:dhaval_vinchhi@outlook.com" className="text-sm xs:text-base sm:text-lg font-extrabold hover:underline block text-white break-all">
                    dhaval_vinchhi@outlook.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white font-extrabold shadow-lg shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-light/75 font-bold block uppercase tracking-wider">Our Head Office Location</span>
                  <span className="text-sm xs:text-base sm:text-lg font-extrabold block text-white leading-tight">
                    Ahmedabad, Gujarat, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Lead form */}
          <div className="lg:col-span-7 bg-white text-gray-905 p-6 md:p-8 rounded-3xl border border-gray-150 shadow-2xl">
            <h3 className="text-2xl font-black text-primary mb-2 tracking-tight">Onboarding Intake Form</h3>
            <p className="text-xs text-gray-500 mb-8 font-medium">Please supply your configuration parameters, and we will initiate customized checklists.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <AnimatePresence>
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold"
                  >
                    {validationError}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Company / Business Name</label>
                  <input
                    type="text"
                    id="contact-company"
                    placeholder="e.g. Apex Exports"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 text-gray-900 border border-gray-250 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Contact name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Contact Name *</label>
                  <input
                    type="text"
                    id="contact-person"
                    required
                    placeholder="e.g. Nirav Patel"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 text-gray-900 border border-gray-250 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">WhatsApp Phone Number *</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 text-gray-900 border border-gray-250 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Email Address *</label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    placeholder="e.g. contact@apex.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 text-gray-900 border border-gray-250 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Business Type */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Business Constitution</label>
                  <select
                    id="contact-constitution"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 text-gray-900 border border-gray-250 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                  >
                    <option value="Proprietorship">Sole Proprietorship</option>
                    <option value="Partnership">Partnership Firm</option>
                    <option value="LLP">Limited Liability Partnership (LLP)</option>
                    <option value="Private Limited">Private Limited Company</option>
                    <option value="Individual Single">Individual Trader / Professional</option>
                  </select>
                </div>

                {/* Service of Interest */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Focus Service Focus</label>
                  <select
                    id="contact-service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 text-gray-900 border border-gray-250 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold"
                  >
                    <option value="Bookkeeping & Accounting">Bookkeeping & Accounting</option>
                    <option value="Account Finalization">Account Finalization</option>
                    <option value="Financial Reporting">Financial Reporting</option>
                    <option value="MIS Reporting">MIS Reporting</option>
                    <option value="GST Compliance">GST Compliance & Filing</option>
                    <option value="TDS Compliance">TDS Compliance</option>
                    <option value="Income Tax Return Filing">Income Tax Return Filing</option>
                    <option value="EPF & ESIC Payroll Filing">EPF & ESIC payroll Filing</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Custom Requirement Description</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Share details about your business size, typical month ledger volume, or due dates..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 text-gray-900 border border-gray-250 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                id="contact-submit-btn"
                disabled={isSubmitting}
                className="w-full py-4 mt-2 bg-primary hover:bg-neutral-800 disabled:bg-gray-300 text-white font-bold rounded-xl shadow-lg hover:shadow-primary/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  'Submitting Profile...'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Request & Launch Consultation
                  </>
                )}
              </button>

              {/* Success notification */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex gap-2 mt-4"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 animate-pulse" />
                    <div>
                      <span className="text-xs font-bold block">Onboarding Inquiry Submitted!</span>
                      <p className="text-[10px] font-medium leading-relaxed mt-0.5">
                        Your intake profile is logged. Redirecting you to WhatsApp now to send this directly to our team at <strong className="font-bold">+91 74056 52991</strong>.
                      </p>
                      {whatsappRedirectUrl && (
                        <div className="mt-2">
                          <a
                            href={whatsappRedirectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm shadow-emerald-500/10 cursor-pointer"
                          >
                            <span>Open WhatsApp Manually</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
