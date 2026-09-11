export interface ServiceItem {
  number: string;
  id: string;
  titleKo: string;
  titleEn: string;
  description: string;
  highlights: string[];
  tags: string[];
  imagePlaceholder?: string;
}

export interface PackageItem {
  id: string;
  name: string;
  subtitle: string;
  targetAudience: string;
  price: string;
  priceNum: number;
  badge?: string;
  isPopular?: boolean;
  totalContents: string;
  features: string[];
  disclaimer: string;
}

export interface AddonItem {
  id: string;
  title: string;
  description: string;
  estimatedAddPrice: string;
  priceNum: number;
}

export interface TargetMarket {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  languages: string[];
  popularPlatforms: string[];
}

export interface WhyPillar {
  titleEn: string;
  titleKo: string;
  description: string;
  subtext?: string;
  highlightText?: string;
  tags?: string[];
}

export interface StepItem {
  step: string;
  code: string;
  title: string;
  description: string;
  details: string[];
}

export interface ClientProfile {
  number: string;
  title: string;
  description: string;
  iconName: string;
}
