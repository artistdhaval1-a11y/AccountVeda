export interface Inquiry {
  id: string;
  timestamp: string;
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  businessType: string;
  servicesSelected: string[];
  message: string;
  status: 'Received' | 'Scheduled' | 'Completed';
}

export interface Service {
  id: string;
  title: string;
  category: 'accounting' | 'taxation' | 'compliance' | 'reporting';
  description: string;
  details: string[];
}

export interface ComplianceEvent {
  id: string;
  title: string;
  dueDate: string;
  desc: string;
  authority: string;
  category: 'GST' | 'TDS' | 'Income Tax' | 'PF/ESIC';
  frequency: 'Monthly' | 'Quarterly' | 'Annually';
}
