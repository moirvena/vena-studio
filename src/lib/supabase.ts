import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jghulxdxkrzlvwyjseme.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaHVseGR4a3J6bHZ3eWpzZW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxMTYyMTcsImV4cCI6MjEwNDY5MjIxN30.dGk5SKDnQOrdzpfidmOfn___VPdozqo04WWYfCkwWxo';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SupabaseInquiryInput {
  brandName: string;
  contactPerson: string;
  email: string;
  phone: string;
  selectedPackage: string;
  selectedAddons: string[];
  targetMarkets: string[];
  category: string;
  instagramHandle: string;
  websiteUrl: string;
  monthlyBudget: string;
  message: string;
}

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function submitSupabaseInquiry(data: SupabaseInquiryInput): Promise<string> {
  const id = generateUUID();
  const { error } = await supabase.from('inquiries').insert({
    id,
    brand_name: data.brandName,
    contact_person: data.contactPerson,
    email: data.email,
    phone: data.phone || null,
    selected_package: data.selectedPackage,
    selected_addons: data.selectedAddons,
    target_markets: data.targetMarkets,
    category: data.category,
    instagram_handle: data.instagramHandle || null,
    website_url: data.websiteUrl || null,
    monthly_budget: data.monthlyBudget,
    message: data.message || null,
    status: 'new',
  });

  if (error) throw error;
  return id;
}

export interface AdminInquiry {
  id: string;
  brand_name: string;
  contact_person: string;
  email: string;
  phone: string | null;
  selected_package: string;
  selected_addons: string[] | null;
  target_markets: string[] | null;
  category: string | null;
  instagram_handle: string | null;
  website_url: string | null;
  monthly_budget: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export async function fetchAdminInquiries() {
  return supabase
    .from('inquiries')
    .select('id, brand_name, contact_person, email, phone, selected_package, selected_addons, target_markets, category, instagram_handle, website_url, monthly_budget, message, status, created_at')
    .order('created_at', { ascending: false });
}
