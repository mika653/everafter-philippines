
export type WeddingType = 'Civil' | 'Church' | 'Garden' | 'Beach' | 'Destination';

export interface Vendor {
  id: string;
  name: string;
  category: string;
  location: string;
  priceRange: string;
  budgetTier: 1 | 2 | 3 | 4;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isVerified: boolean;
  tags: string[];
  virtualTourUrl?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  title?: string; // e.g., Atty., Dr., Hon.
  role: 'Principal' | 'Secondary';
  assignment?: 'Veil' | 'Cord' | 'Candle' | 'Arras';
  invitationSent: boolean;
  giftPrepared: boolean;
}

export interface ChecklistItem {
  id: string;
  task: string;
  category: 'Legal' | 'Tradition' | 'Logistics' | 'Attire' | 'Social';
  timeline: string;
  isCompleted: boolean;
  isFilipinoSpecific?: boolean;
}

export interface BudgetItem {
  id: string;
  category: string;
  estimated: number;
  actual: number;
  notes?: string;
}

export interface Tradition {
  id: string;
  title: string;
  description: string;
  significance: string;
  tips: string[];
  phase: 'Pre-wedding' | 'Ceremony' | 'Post-wedding';
  modernTwist?: string;
}

export type SaveTheDateTemplateId = 'classic-elegant' | 'modern-minimal' | 'filipiniana' | 'tropical-beach';

export interface SaveTheDateData {
  groomName: string;
  brideName: string;
  weddingDate: string;
  venue: string;
  location: string;
  photoUrl: string | null;
  templateId: SaveTheDateTemplateId;
  customMessage?: string;
}

export interface SaveTheDateTemplate {
  id: SaveTheDateTemplateId;
  name: string;
  description: string;
  accentColor: string;
}

export interface MatchmakerAnswers {
  styles: string[];
  budgetTier: number | null;
  location: string | null;
  categories: string[];
  priority: string | null;
}
