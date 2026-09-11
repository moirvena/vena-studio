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

export async function submitSupabaseInquiry(data: SupabaseInquiryInput): Promise<string> {
  const id = crypto.randomUUID();
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
  selected_package: string;
  status: string;
  created_at: string;
}

export async function fetchAdminInquiries() {
  return supabase
    .from('inquiries')
    .select('id, brand_name, contact_person, email, selected_package, status, created_at')
    .order('created_at', { ascending: false });
}
