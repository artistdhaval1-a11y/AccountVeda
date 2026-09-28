import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calculator, CheckCircle, Clock } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onContactUs: (presetService?: string, presetMessage?: string) => void;
  onOpenWorkspace: () => void;
}

export default function Hero({ onExploreServices, onContactUs, onOpenWorkspace }: HeroProps) {
  const [businessType, setBusinessType] = useState<'proprietor' | 'partnership' | 'pvtltd' | 'llp'>('proprietor');

  const compliancePreviews = {
    proprietor: {
      type: 'Sole Proprietorship',
      tasks: ['GST Filing (if registered)', 'TDS Compliance', 'ITR-3 / ITR-4 (Business ITR)'],
      frequency: 'Monthly & Annually',
      savingsRate: ''
    },
    partnership: {
      type: 'Partnership Firm',
      tasks: ['Partnership ITR-5 Filing', 'Monthly GSTR-1/3B', 'TDS Deposition', 'Tax Audit (if turnover exceeds thresholds)'],
      frequency: 'Monthly, Quarterly & Annually',
      savingsRate: 'Provides institutional stability'
    },
    pvtltd: {
      type: 'Private Limited Co.',
      tasks: ['Monthly TDS Returns', 'GST Returns Filing', 'Annual MCA filings & AOC-4/MGT-7', 'ITR-6 Corp Return'],
      frequency: 'Comprehensive Ongoing',
      savingsRate: 'Ensures 100% spotless ROC compliance'
    },
    llp: {
      type: 'Limited Liability Partnership',
      tasks: ['LLP Form 11 (Annual Declaration)', 'Form 8 (Statement of Accounts)', 'ITR-5 tax filing', 'Monthly GST returns'],
      frequency: 'Quarterly & Annually',
      savingsRate: 'Combines simple compliance with corporate stature'
    }
  };

  const currentPreview = compliancePreviews[businessType];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-br from-light via-white to-light/50"
    >
      {/* Decorative vector background */}
      <div className="absolute inset-x-0 bottom-0 top-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      
      {/* Ambient gradient rings */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Side Content */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase"
          >
            <Clock className="w-3.5 h-3.5" />
            Reliable Professional Accounting since 2023
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary leading-none"
            >
              AccountVeda
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-2xl sm:text-4xl font-bold text-gray-800 tracking-tight"
            >
              Simplifying Accounting for Business Success
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed font-medium"
            >
              Professional accounting, structured tax bookkeeping, and proactive statutory compliance solutions. Keeping Ahmedabad's and India's growing businesses organized, compliant, and focused purely on growth.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <button
              id="hero-explore"
              onClick={onExploreServices}
              className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
            >
              Explore Our Services
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              id="hero-contact"
              onClick={() => onContactUs('', 'Hello, I would like to schedule a free initial consultation.')}
              className="px-8 py-4 bg-white text-primary border-2 border-primary hover:bg-light font-bold rounded-full hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
            >
              Contact Us Now
            </button>
            <button
              id="hero-workspace"
              onClick={onOpenWorkspace}
              className="px-6 py-4 bg-secondary/15 hover:bg-secondary/25 text-secondary font-bold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none sm:hidden"
            >
              <Calculator className="w-4 h-4" />
              Launch Tax Tools
            </button>
          </motion.div>
        </div>

        {/* Right Side Interactive Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-2xl relative"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/20 rounded-full filter blur-xl -mr-6 -mt-6 pointer-events-none" />

          <h3 className="text-xl font-bold text-gray-900 mb-2">Compliance Quick-Planner</h3>
          <p className="text-xs text-gray-500 mb-6">Select your structure to see required compliance steps & estimates:</p>
          
          <div className="grid grid-cols-2 gap-2 mb-6">
            {(['proprietor', 'partnership', 'pvtltd', 'llp'] as const).map((type) => (
              <button
                key={type}
                id={`hero-tab-${type}`}
                onClick={() => setBusinessType(type)}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer border text-center ${
                  businessType === type
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/10'
                    : 'bg-gray-50 text-gray-600 border-gray-150 hover:bg-light hover:text-primary'
                }`}
              >
                {type === 'proprietor' ? 'Proprietor' : type === 'partnership' ? 'Partnership' : type === 'pvtltd' ? 'Pvt Ltd' : 'LLP'}
              </button>
            ))}
          </div>

          <div className="bg-light/60 rounded-2xl p-4 md:p-5 mb-6 border border-primary/5 min-h-[190px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">{currentPreview.type}</span>
                <span className="text-[10px] font-bold text-gray-400">{currentPreview.frequency}</span>
              </div>
              
              <ul className="space-y-2.5">
                {currentPreview.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium leading-tight">{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {currentPreview.savingsRate && (
              <div className="mt-4 pt-3 border-t border-primary/5 text-xs font-semibold text-primary block text-center italic">
                {currentPreview.savingsRate}
              </div>
            )}
          </div>

          <button
            id="hero-planner-inquire"
            onClick={() => onContactUs(
              currentPreview.type,
              `Hello Support! I run a ${currentPreview.type} and I am interested in seeking comprehensive accounting and filing assistance.`
            )}
            className="w-full py-3.5 bg-secondary hover:bg-primary text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-secondary/10"
          >
            Get Setup Advice Now
          </button>
        </motion.div>

      </div>
    </section>
  );
}
