import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  Calendar, 
  FileText, 
  AlertCircle, 
  Sparkles, 
  CheckSquare, 
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { COMPLIANCE_CALENDAR_RULES } from '../data';

interface WorkspaceProps {
  onContactUs: (presetService?: string, presetMessage?: string) => void;
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'gst' | 'tax' | 'deadlines';
}

export default function Workspace({ 
  onContactUs, 
  isOpen, 
  onClose,
  defaultTab = 'gst'
}: WorkspaceProps) {
  // Tabs: 'gst' | 'tax' | 'deadlines'
  const [activeTool, setActiveTool] = useState<'gst' | 'tax' | 'deadlines'>(defaultTab);

  useEffect(() => {
    if (isOpen && defaultTab) {
      setActiveTool(defaultTab);
    }
  }, [isOpen, defaultTab]);

  // --- GST Calculator States ---
  const [baseAmount, setBaseAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18); // 5, 12, 18, 28, Custom
  const [customRate, setCustomRate] = useState<string>('');
  const [isInclusive, setIsInclusive] = useState<boolean>(false); // false = Add GST (Exclusive), true = Extract GST (Inclusive)
  const [isInterState, setIsInterState] = useState<boolean>(false); // false = Intra-state (CGST + SGST), true = Inter-state (IGST)


  // GST Calculation Logic
  const currentRate = gstRate === -1 ? (parseFloat(customRate) || 0) : gstRate;
  const [gstAmount, setGstAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [sourceAmount, setSourceAmount] = useState<number>(0);

  useEffect(() => {
    const amt = baseAmount || 0;
    const rate = currentRate;
    
    if (isInclusive) {
      // Amount is Inclusive of GST
      // Formula: GST Amount = Total - (Total / (1 + (Rate/100)))
      const calculatedSource = amt / (1 + (rate / 100));
      const calculatedGst = amt - calculatedSource;
      setSourceAmount(calculatedSource);
      setGstAmount(calculatedGst);
      setTotalAmount(amt);
    } else {
      // Amount is Exclusive of GST (Add GST)
      const calculatedGst = amt * (rate / 100);
      setSourceAmount(amt);
      setGstAmount(calculatedGst);
      setTotalAmount(amt + calculatedGst);
    }
  }, [baseAmount, gstRate, customRate, isInclusive, isInterState]);

  // --- Tax Planner States ---
  const [annualIncome, setAnnualIncome] = useState<number>(800000);
  const [deductions80C, setDeductions80C] = useState<number>(150000); // Max 1.5L
  const [otherDeductions, setOtherDeductions] = useState<number>(50000);

  // Indian Income Tax regime estimation logic (Simplified for standard individuals)
  const [newRegimeTax, setNewRegimeTax] = useState<number>(0);
  const [oldRegimeTax, setOldRegimeTax] = useState<number>(0);

  useEffect(() => {
    // 1. Calculate New Regime Tax (No 80C deductions, standard deduction ₹75,000 applies)
    const newStandardDeduction = 75000;
    const newTaxableIncome = Math.max(0, annualIncome - newStandardDeduction);
    
    // Slabs for New tax regime (FY 2024-25 / FY 2025-26 as per Union Budget)
    // Up to 3,00,000: Nil
    // 3,00,001 to 7,00,001: 5%
    // 7,00,001 to 10,00,001: 10%
    // 10,00,001 to 12,00,000: 15%
    // 12,00,001 to 15,00,000: 20%
    // Above 15,00,000: 30%
    // Tax Rebate: Under 115BAC, if taxable income is <= ₹7,00,000, then full tax rebate is offered (Nil tax). (Expanded to ₹12 Lakhs or more in proposals - let's use standard slab-based steps)
    
    let taxNew = 0;
    if (newTaxableIncome > 300000) {
      if (newTaxableIncome <= 700000) {
        taxNew = (newTaxableIncome - 300000) * 0.05;
      } else {
        // Slab 1: 3L - 7L (4L at 5% = 20,000)
        taxNew += 20000;
        
        if (newTaxableIncome <= 1000000) {
          taxNew += (newTaxableIncome - 700000) * 0.10;
        } else {
          // Slab 2: 7L - 10L (3L at 10% = 30,000)
          taxNew += 30000;
          
          if (newTaxableIncome <= 1200000) {
            taxNew += (newTaxableIncome - 1000000) * 0.15;
          } else {
            // Slab 3: 10L - 12L (2L at 15% = 30,000)
            taxNew += 30000;
            
            if (newTaxableIncome <= 1500000) {
              taxNew += (newTaxableIncome - 1200000) * 0.20;
            } else {
              // Slab 4: 12L - 15L (3L at 20% = 60,000)
              taxNew += 60000;
              taxNew += (newTaxableIncome - 1500000) * 0.30;
            }
          }
        }
      }
    }
    // Tax rebate under 87A for New Regime: If Net Taxable Income <= 7,00,000, rebate is 100% of tax
    if (newTaxableIncome <= 700000) {
      taxNew = 0;
    }
    // Cess 4%
    setNewRegimeTax(taxNew * 1.04);

    // 2. Calculate Old Regime Tax (80C capped at 1.5L, standard deduction ₹50,000 applies)
    const oldStandardDeduction = 50000;
    const totalDeductions = Math.min(150000, deductions80C) + otherDeductions + oldStandardDeduction;
    const oldTaxableIncome = Math.max(0, annualIncome - totalDeductions);

    // Slabs for Old tax regime:
    // Up to 2,50,000: Nil
    // 2,50,001 to 5,00,000: 5%
    // 5,00,001 to 10,00,000: 20%
    // Above 10,00,000: 30%
    let taxOld = 0;
    if (oldTaxableIncome > 250000) {
      if (oldTaxableIncome <= 500000) {
        taxOld = (oldTaxableIncome - 250000) * 0.05;
      } else {
        // Slab 1: 2.5L to 5L (2.5L at 5% = 12,500)
        taxOld += 12500;
        if (oldTaxableIncome <= 1000000) {
          taxOld += (oldTaxableIncome - 500000) * 0.20;
        } else {
          // Slab 2: 5L to 10L (5L at 20% = 1,000,000)
          taxOld += 100000;
          taxOld += (oldTaxableIncome - 1000000) * 0.30;
        }
      }
    }

    // Tax rebate under 87A for Old Regime: If taxable income <= 5,00,000, rebate is 100% up to ₹12,500
    if (oldTaxableIncome <= 500000) {
      taxOld = 0;
    }
    // Cess 4%
    setOldRegimeTax(taxOld * 1.04);

  }, [annualIncome, deductions80C, otherDeductions]);

  // --- Compliance Deadlines States ---
  const [filterCategory, setFilterCategory] = useState<'all' | 'GST' | 'TDS' | 'Income Tax' | 'PF/ESIC'>('all');

  const filteredCompliance = COMPLIANCE_CALENDAR_RULES.filter((evt) => {
    return filterCategory === 'all' || evt.category === filterCategory;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-dark/70 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-sm shadow-xl border border-primary/15 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden text-left"
      >
        {/* Workspace Title Header */}
        <div className="bg-primary px-6 md:px-8 py-5 text-white flex justify-between items-center shrink-0 border-b border-primary-dark">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-sm">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-wider">Accounting Tools Workspace</h3>
              <p className="text-[10px] text-light/80 font-semibold uppercase tracking-widest mt-0.5">Calculate GST, compare regimes, and verify due filing dates instantly.</p>
            </div>
          </div>
          <button
            id="workspace-close-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-sm hover:bg-white/10 flex items-center justify-center text-white text-xl font-bold cursor-pointer focus:outline-none"
            aria-label="Close Workspace"
          >
            &times;
          </button>
        </div>

        {/* Tab Controls */}
        <div className="bg-light border-b border-primary/10 px-6 shrink-0 flex gap-2 overflow-x-auto py-2">
          <button
            id="workspace-tab-gst"
            onClick={() => setActiveTool('gst')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none ${
              activeTool === 'gst'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:bg-white border border-transparent hover:border-primary/5'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            GST Tax Splitter
          </button>
          
          <button
            id="workspace-tab-tax"
            onClick={() => setActiveTool('tax')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none ${
              activeTool === 'tax'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:bg-white border border-transparent hover:border-primary/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Indian Income Tax Planner
          </button>

          <button
            id="workspace-tab-deadlines"
            onClick={() => setActiveTool('deadlines')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none ${
              activeTool === 'deadlines'
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:bg-white border border-transparent hover:border-primary/5'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Statutory Deadlines List
          </button>
        </div>

        {/* Content Box (Scrollable) */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          
          {/* TOOL 1: GST SPLITTER CALCULATOR */}
          {activeTool === 'gst' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Controls */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Calculation parameters</h4>
                  
                  {/* Amount */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500">Base Amount (₹)</label>
                    <input
                      type="number"
                      id="gst-calc-amount"
                      min={1}
                      value={baseAmount || ''}
                      onChange={(e) => setBaseAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full px-4 py-3 border border-gray-250 bg-gray-50 focus:bg-white text-gray-900 font-bold rounded-xl focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                  </div>

                  {/* Calculation Type Toggle */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500">Tax Application</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        id="gst-excl-btn"
                        onClick={() => setIsInclusive(false)}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                          !isInclusive
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-light'
                        }`}
                      >
                        Add GST (Exclusive)
                      </button>
                      <button
                        id="gst-incl-btn"
                        onClick={() => setIsInclusive(true)}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                          isInclusive
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-light'
                        }`}
                      >
                        Extract GST (Inclusive)
                      </button>
                    </div>
                  </div>

                  {/* Standard GST Rates */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500">Tax Slabs (%)</label>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[5, 12, 18, 28].map((rate) => (
                        <button
                          key={rate}
                          id={`gst-rate-${rate}`}
                          onClick={() => setGstRate(rate)}
                          className={`py-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                            gstRate === rate
                              ? 'bg-secondary text-white border-secondary'
                              : 'bg-white text-gray-600 hover:bg-light'
                          }`}
                        >
                          {rate}%
                        </button>
                      ))}
                      <button
                        id="gst-rate-custom"
                        onClick={() => setGstRate(-1)}
                        className={`py-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                          gstRate === -1
                            ? 'bg-secondary text-white border-secondary'
                            : 'bg-white text-gray-600 hover:bg-light'
                        }`}
                      >
                        Custom
                      </button>
                    </div>
                  </div>

                  {/* Custom Rate input */}
                  {gstRate === -1 && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500">Define Custom Tax Rate (%)</label>
                      <input
                        type="number"
                        id="gst-calc-custom-rate"
                        min={0}
                        max={100}
                        value={customRate}
                        placeholder="Enter tax percentage..."
                        onChange={(e) => setCustomRate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-250 bg-gray-50 rounded-xl focus:bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900"
                      />
                    </div>
                  )}

                  {/* Intra vs Inter State Toggle */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500">Transaction Jurisdiction</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        id="gst-intra-btn"
                        onClick={() => setIsInterState(false)}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                          !isInterState
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-light'
                        }`}
                      >
                        Intra-State (CGST + SGST)
                      </button>
                      <button
                        id="gst-inter-btn"
                        onClick={() => setIsInterState(true)}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                          isInterState
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-light'
                        }`}
                      >
                        Inter-State (IGST)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Split Calculation Output Summary */}
                <div className="bg-light/80 p-6 rounded-3xl border border-primary/5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-primary tracking-widest uppercase block border-b border-primary/10 pb-2">TAX RECKONER LISTING</span>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-500">Pre-Tax Cost</span>
                      <span className="text-base font-bold text-gray-800">₹{(sourceAmount || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>

                    {/* Tax splitting breakdown */}
                    {!isInterState ? (
                      <>
                        <div className="flex justify-between items-center pl-3 border-l-2 border-secondary/20">
                          <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                            CGST <span className="text-[10px] bg-secondary/10 px-1 py-0.5 rounded font-black text-secondary">{currentRate/2}%</span>
                          </span>
                          <span className="text-sm font-semibold text-gray-700">₹{(gstAmount / 2 || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between items-center pl-3 border-l-2 border-secondary/20">
                          <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                            SGST / UTGST <span className="text-[10px] bg-secondary/10 px-1 py-0.5 rounded font-black text-secondary">{currentRate/2}%</span>
                          </span>
                          <span className="text-sm font-semibold text-gray-700">₹{(gstAmount / 2 || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between items-center pl-3 border-l-2 border-primary/20">
                        <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                          IGST <span className="text-[10px] bg-primary/10 px-1 py-0.5 rounded font-black text-primary">{currentRate}%</span>
                        </span>
                        <span className="text-sm font-semibold text-gray-700">₹{(gstAmount || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center border-t border-primary/10 pt-3">
                      <span className="text-xs font-bold text-gray-600 uppercase">Total Consolidated GST</span>
                      <span className="text-base font-extrabold text-primary">₹{(gstAmount || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-primary/10 space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-black text-gray-700">GRAND TOTAL</span>
                      <span className="text-2xl md:text-3xl font-black text-primary">₹{(totalAmount || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>

                    <button
                      id="gst-calc-cta"
                      onClick={() => onContactUs('GST Compliance & Bookkeeping', `Hello, I used your GST Splitter tool for ₹${baseAmount}. I need professional guidance with GSTR audits and general state bookkeeping filings.`)}
                      className="w-full py-3 bg-primary hover:bg-secondary text-white text-xs font-bold rounded-xl transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md focus:outline-none"
                    >
                      <PhoneCall className="w-4 h-4" />
                      Get Help with GSTR Filings & ITC Matching
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOOL 2: INCOME TAX SLAB COMPARATOR */}
          {activeTool === 'tax' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Inputs Left */}
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Annual Estimator Variables</h4>

                  {/* Gross Income */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500">Gross Estimated Annual Income (₹)</label>
                    <input
                      type="number"
                      id="tax-calc-income"
                      min={0}
                      step={10000}
                      value={annualIncome || ''}
                      onChange={(e) => setAnnualIncome(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-4 py-2.5 border border-gray-250 bg-gray-50 font-bold focus:bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* 80C Deductions (Only for Old Regime) */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-gray-500">Sec 80C Deductions (₹)</label>
                      <span className="text-[10px] text-gray-400 font-semibold italic">Capped at ₹1,50,000</span>
                    </div>
                    <input
                      type="number"
                      id="tax-calc-80c"
                      min={0}
                      max={150000}
                      value={deductions80C || ''}
                      onChange={(e) => setDeductions80C(Math.min(150000, Math.max(0, parseInt(e.target.value) || 0)))}
                      className="w-full px-4 py-2.5 border border-gray-250 bg-gray-50 font-bold focus:bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Other Exemptions (Only for Old Regime) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500">Sec 80D Mediclaim / HRA Exempt (₹)</label>
                    <input
                      type="number"
                      id="tax-calc-other"
                      min={0}
                      value={otherDeductions || ''}
                      onChange={(e) => setOtherDeductions(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-4 py-2.5 border border-gray-250 bg-gray-50 font-bold focus:bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="p-3.5 bg-yellow-50 text-yellow-800 rounded-xl border border-yellow-100 flex gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-semibold leading-relaxed">
                      Slabs calculated are based on standard rules. New Regime standard deduction is automatically estimated at ₹75,000 and Old Regime at ₹50,000.
                    </p>
                  </div>
                </div>

                {/* Outputs Right Side */}
                <div className="md:col-span-3 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Regime Comparison Comparison</h4>

                  <div className="grid grid-cols-2 gap-4">
                    {/* New Regime Card */}
                    <div className="bg-white border-2 border-primary p-5 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-black text-primary">New Regime</span>
                          <span className="text-[10px] font-medium bg-primary/10 px-1.5 py-0.5 rounded text-primary uppercase">No Deduct</span>
                        </div>
                        <p className="text-[10px] text-gray-500">Standard deduction ₹75,000 credited automatically.</p>
                      </div>

                      <div className="mt-6">
                        <span className="text-xs text-gray-400 font-bold block uppercase">Estimated Tax</span>
                        <span className="text-xl md:text-2xl font-black text-primary">₹{Math.round(newRegimeTax).toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Old Regime Card */}
                    <div className="bg-white border border-gray-200 p-5 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-black text-gray-700">Old Regime</span>
                          <span className="text-[10px] font-medium bg-gray-150 px-1.5 py-0.5 rounded text-gray-600 uppercase">Interactive</span>
                        </div>
                        <p className="text-[10px] text-gray-500">Allows 80C, 80D, and HRA offset deductions.</p>
                      </div>

                      <div className="mt-6">
                        <span className="text-xs text-gray-400 font-bold block uppercase">Estimated Tax</span>
                        <span className="text-xl md:text-2xl font-black text-gray-700">₹{Math.round(oldRegimeTax).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation banner */}
                  <div className="p-4 rounded-xl bg-primary/10 text-primary border border-primary/10">
                    <div className="flex gap-2">
                      <Sparkles className="w-5 h-5 text-secondary shrink-0" />
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider block">Regime Evaluation Recommendation</span>
                        <p className="text-[11px] font-semibold text-gray-700 mt-1">
                          {newRegimeTax <= oldRegimeTax 
                            ? `The NEW Tax Regime is estimated to save you approximately ₹${Math.round(oldRegimeTax - newRegimeTax).toLocaleString('en-IN')}! Let us guide you on optimizing business expenditures.`
                            : `The OLD Tax Regime is estimated to save you approximately ₹${Math.round(newRegimeTax - oldRegimeTax).toLocaleString('en-IN')} via smart investments! Let us map your declarations.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    id="tax-planner-cta"
                    onClick={() => onContactUs('Income Tax Return Filing', `Hello, I evaluated my tax filing options for a consolidated annual income of ₹${annualIncome}. I'd like a expert review to declare legal deductions and file my ITR successfully.`)}
                    className="w-full py-3.5 bg-secondary hover:bg-primary text-white text-xs font-bold rounded-xl transition-all shadow-md mt-4 cursor-pointer text-center focus:outline-none"
                  >
                    Consult for Full Tax Planning Assessment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TOOL 3: EXHAUSTIVE COMPLIANCE DUE DATES */}
          {activeTool === 'deadlines' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-4 border-b border-gray-100 pb-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Indian Compliance Tracker</h4>
                
                {/* Category filters */}
                <div className="flex gap-1.5 flex-wrap">
                  {['all', 'GST', 'TDS', 'Income Tax', 'PF/ESIC'].map((cat) => (
                    <button
                      key={cat}
                      id={`deadline-filter-${cat}`}
                      onClick={() => setFilterCategory(cat as any)}
                      className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                        filterCategory === cat
                          ? 'bg-primary text-white'
                          : 'bg-gray-150 text-gray-600 hover:bg-light hover:text-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deadline Table/Cards List */}
              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                {filteredCompliance.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-white border border-gray-150 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
                  >
                    {/* Left category */}
                    <div className="flex gap-3 items-center">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        evt.category === 'GST' ? 'bg-green-500' : evt.category === 'TDS' ? 'bg-orange-400' : evt.category === 'Income Tax' ? 'bg-primary' : 'bg-secondary'
                      }`} />
                      <div>
                        <span className="text-xs font-black text-gray-800 block leading-tight">{evt.title}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{evt.category} • {evt.frequency}</span>
                      </div>
                    </div>

                    {/* Middle description */}
                    <div className="md:col-span-2 text-xs font-semibold text-gray-600 leading-normal pr-4">
                      {evt.desc}
                    </div>

                    {/* Right action indicator */}
                    <div className="flex flex-col md:items-end justify-center text-left">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Standard Due Date</span>
                      <span className="text-xs font-black text-primary bg-primary/10 px-2.5 py-1 rounded-lg mt-1">{evt.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-light text-center rounded-3xl border border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="text-xs font-semibold text-gray-600 text-left">
                  Tired of tracking deadlines, incurring penalty interest, and paying late fees? Let us automate your compliance framework.
                </span>
                <button
                  id="deadlines-planner-cta"
                  onClick={() => onContactUs('Corporate & Taxation Compliance', 'Hello AccountVeda, I would like to onboard with you to coordinate my weekly/monthly GST, TDS, EPF, and annual company filings and ensure zero compliance breaches.')}
                  className="px-6 py-2.5 bg-primary hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap inline-block focus:outline-none"
                >
                  Onboard Your Compliance
                </button>
              </div>
            </div>
          )}



        </div>
      </motion.div>
    </div>
  );
}
