import { Service, ComplianceEvent } from './types';

export const SERVICES: Service[] = [
  {
    id: 'bookkeeping',
    category: 'accounting',
    title: 'Bookkeeping & Accounting',
    description: 'Accurate and timely recording of all daily transaction ledgers, bank transactions, and purchase-sales journals.',
    details: [
      'Day-to-day data entry and ledger maintenance',
      'Bank statement reconciliation (BJS)',
      'Accounts receivable and payable coordination',
      'Fixed asset register preparation',
      'Monthly audit preparation'
    ]
  },
  {
    id: 'finalization',
    category: 'accounting',
    title: 'Account Finalization',
    description: 'Year-end account adjustments, depreciation provisions, and structured closing of books for financial analysis.',
    details: [
      'Trial Balance reconciliation and scrubbing',
      'Year-end provision and depreciation mapping',
      'Balance Sheet & Profit and Loss Statement assembly',
      'Coordinating with statutory auditors',
      'Director reporting assistance'
    ]
  },
  {
    id: 'financial-reporting',
    category: 'reporting',
    title: 'Financial Reporting',
    description: 'Production of statutory and internal financial reports reflecting key performance ratios and business health.',
    details: [
      'Balance sheets and profit/loss logs',
      'Cash flow statements (Operating, Investing, Financing)',
      'Key financial ratio summaries',
      'Budget vs. actual variance analyzes',
      'Investor-ready reporting packets'
    ]
  },
  {
    id: 'mis-reporting',
    category: 'reporting',
    title: 'MIS Reporting',
    description: 'Tailored management information systems reports to empower stakeholders with actionable analytical data.',
    details: [
      'Operational performance metrics review',
      'Product or segment-wise profitability breakdowns',
      'Working capital cycle trackers',
      'Custom KPI dashboards',
      'Projections and forecasting models'
    ]
  },
  {
    id: 'gst-compliance',
    category: 'taxation',
    title: 'GST Compliance & Filing',
    description: 'Complete GST ecosystem support covering regular returns filing, matching input tax credits, and annual audits.',
    details: [
      'GSTR-1 (Outward Supplies) filing',
      'GSTR-3B (Monthly Summary) filing',
      'GSTR-2B Input Tax Credit (ITC) reconciliation',
      'GSTR-9 & 9C Annual Returns compliance',
      'Responding to department notices and reviews'
    ]
  },
  {
    id: 'tds-compliance',
    category: 'taxation',
    title: 'TDS Compliance',
    description: 'Accurate TDS computation, quarterly e-TDS returns generation, and issuance of required certificates.',
    details: [
      'TDS calculation on payments (Contractors, Rent, Salaries)',
      'Quarterly returns (Form 24Q, 26Q, 27Q) preparation',
      'Form 16/16A certificate generation',
      'Form 26AS tax credit reconciliation',
      'TDS interest and late fee audits'
    ]
  },
  {
    id: 'income-tax',
    category: 'taxation',
    title: 'Income Tax Return (ITR)',
    description: 'Comprehensive annual income tax planning and filing solutions for proprietors, professionals, LLPs, and corporates.',
    details: [
      'Salary, business, and capital gains tax planning',
      'ITR-1 to ITR-6 compilation and e-filing',
      'Advance Tax assessment and planning',
      'Tax exemption audit (Section 80 offsets)',
      'Faceless assessment query support'
    ]
  },
  {
    id: 'epf-esic',
    category: 'compliance',
    title: 'EPF & ESIC filing',
    description: 'Smooth management of employee provident fund and group state insurance statutory contributions.',
    details: [
      'Monthly EPF ECR (Electronic Challan-cum-Return) filing',
      'Monthly ESIC contribution returns creation',
      'New employee registration and UAN generation',
      'Statutory compliance record audit',
      'Labor law compliance advising'
    ]
  }
];

export const COMPLIANCE_CALENDAR_RULES: ComplianceEvent[] = [
  {
    id: 'gst-gstr1',
    title: 'GSTR-1 Outward Return',
    dueDate: '11th of succeeding month',
    desc: 'Mandatory upload of details of outward supplies of goods or services key for buyers to get input tax credits.',
    authority: 'GST Portals',
    category: 'GST',
    frequency: 'Monthly'
  },
  {
    id: 'gst-gstr3b',
    title: 'GSTR-3B Tax Filing',
    dueDate: '20th of succeeding month',
    desc: 'Self-declaration summarizing monthly inward items, ITC deductions, and payment of output taxes.',
    authority: 'GST Portals',
    category: 'GST',
    frequency: 'Monthly'
  },
  {
    id: 'tds-challan-281',
    title: 'TDS Payment Deposition',
    dueDate: '7th of succeeding month',
    desc: 'Deposition of consolidated withholding tax (TDS) deducted during the preceding calendar month.',
    authority: 'Income Tax Department',
    category: 'TDS',
    frequency: 'Monthly'
  },
  {
    id: 'tds-quarterly-return',
    title: 'Quarterly e-TDS Filing',
    dueDate: '31st of month following Quarter',
    desc: 'Submission of electronic quarterly returns (Form 24Q, 26Q) detailing deductors, deductees, and paid challans.',
    authority: 'Income Tax Department',
    category: 'TDS',
    frequency: 'Quarterly'
  },
  {
    id: 'epf-ecr-deposit',
    title: 'EPF Ledger Filing & Payment',
    dueDate: '15th of succeeding month',
    desc: 'Remittance of monthly Provident Fund contributions with individual salary schedules via the Unified Portal.',
    authority: 'EPFO India',
    category: 'PF/ESIC',
    frequency: 'Monthly'
  },
  {
    id: 'esic-deposit',
    title: 'ESIC Contribution Filing',
    dueDate: '15th of succeeding month',
    desc: 'Monthly statutory payment of State Insurance contributions mirroring employer and employee wages shares.',
    authority: 'ESIC Portal',
    category: 'PF/ESIC',
    frequency: 'Monthly'
  },
  {
    id: 'advance-tax-q1',
    title: 'Advance Tax Inst. 1 (15%)',
    dueDate: '15th June annually',
    desc: 'First installment of mandatory advance tax for taxpayers whose estimated annual tax liability exceeds ₹10,000.',
    authority: 'Income Tax Department',
    category: 'Income Tax',
    frequency: 'Quarterly'
  },
  {
    id: 'advance-tax-q2',
    title: 'Advance Tax Inst. 2 (45%)',
    dueDate: '15th September annually',
    desc: 'Cumulative second installment of advance tax up to 45% of total estimated taxation liability.',
    authority: 'Income Tax Department',
    category: 'Income Tax',
    frequency: 'Quarterly'
  },
  {
    id: 'advance-tax-q3',
    title: 'Advance Tax Inst. 3 (75%)',
    dueDate: '15th December annually',
    desc: 'Cumulative third installment of advance tax up to 75% of total taxation liability due.',
    authority: 'Income Tax Department',
    category: 'Income Tax',
    frequency: 'Quarterly'
  },
  {
    id: 'advance-tax-q4',
    title: 'Advance Tax Inst. 4 (100%)',
    dueDate: '15th March annually',
    desc: 'Final cumulative installment of advance tax (100%) to avoid late payment compounding interests.',
    authority: 'Income Tax Department',
    category: 'Income Tax',
    frequency: 'Quarterly'
  },
  {
    id: 'itr-filing-non-audit',
    title: 'Income Tax Filing (Non-Audit)',
    dueDate: '31st July annually',
    desc: 'Deadline for individuals, salaried employees, and business proprietors who do not require accounts auditing under tax laws.',
    authority: 'Income Tax Department',
    category: 'Income Tax',
    frequency: 'Annually'
  },
  {
    id: 'itr-filing-audit',
    title: 'Income Tax Filing (Audit)',
    dueDate: '31st October annually',
    desc: 'Annual deadline for filing Income Tax Returns for accounts requiring structured auditing (e.g. Turnovers > ₹2Cr+ / ₹10Cr+).',
    authority: 'Income Tax & Auditors',
    category: 'Income Tax',
    frequency: 'Annually'
  }
];

export const CHALLENGES = [
  'Accounting takes valuable focus hours from business growth.',
  'GST or TDS notifications are frequently missed or compounding.',
  'Monthly bookkeeping ledgers get easily disorganized and cluttered.',
  'Lack of clear timely MIS summaries or ratios for active investments.',
  'Heavy expenses or management overheads of full-time physical accountants.'
];

export const SOLUTIONS = [
  { title: 'Dedicated Accounting Support', desc: 'Continuous expert tracking of ledger ledger entries and reconciliations.' },
  { title: 'Proactive Due Alerts', desc: 'No late fees. We track and preempt your GST, TDS, EPF, and tax filings on time.' },
  { title: 'Audited & Safe Reports', desc: 'Tax ready balance sheets, income accounts, MIS charts prepared to gold standard.' },
  { title: 'Efficient Remote Service', desc: 'Saves 60% of physical accounting team space, salary, and system costs.' },
  { title: ' Ahmedabad Personal Touch', desc: 'In-person reviews and customized reporting configurations whenever needed.' }
];

import testimonialsData from './testimonials.json';

export const TESTIMONIALS = testimonialsData;
