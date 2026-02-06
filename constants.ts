
import { Vendor, ChecklistItem, BudgetItem, Tradition, SaveTheDateTemplate, SaveTheDateData } from './types';

export const VENDORS: Vendor[] = [
  {
    id: '1',
    name: 'Palazzo Verde',
    category: 'Venues',
    location: 'Metro Manila (South)',
    priceRange: '₱₱₱',
    budgetTier: 3,
    rating: 4.9,
    reviewCount: 124,
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
    isVerified: true,
    tags: ['Garden', 'Traditional', 'Grand', 'Church'],
    virtualTourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '2',
    name: 'Juan Carlo the Caterer',
    category: 'Caterers',
    location: 'Metro Manila (North)',
    priceRange: '₱₱₱',
    budgetTier: 3,
    rating: 4.8,
    reviewCount: 350,
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200',
    isVerified: true,
    tags: ['Luxury', 'Gourmet', 'Filipino Cuisine', 'Church', 'Civil']
  },
  {
    id: '3',
    name: 'The Hills Tagaytay',
    category: 'Venues',
    location: 'Tagaytay',
    priceRange: '₱₱',
    budgetTier: 2,
    rating: 4.7,
    reviewCount: 95,
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200',
    isVerified: true,
    tags: ['Scenic', 'Cold Weather', 'Nature', 'Intimate', 'Garden']
  },
  {
    id: '4',
    name: 'Rosa Clara Philippines',
    category: 'Bridal Gowns',
    location: 'Metro Manila (South)',
    priceRange: '₱₱₱₱',
    budgetTier: 4,
    rating: 4.9,
    reviewCount: 88,
    imageUrl: 'https://images.unsplash.com/photo-1594553703248-6a59c5bcc31e?auto=format&fit=crop&q=80&w=1200',
    isVerified: true,
    tags: ['Designer', 'International', 'Classic', 'Church', 'Civil']
  },
  {
    id: '5',
    name: 'Bohol Beach Club',
    category: 'Venues',
    location: 'Bohol',
    priceRange: '₱₱₱',
    budgetTier: 3,
    rating: 4.8,
    reviewCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200',
    isVerified: true,
    tags: ['Beach', 'Destination', 'Romantic', 'Intimate'],
    virtualTourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '6',
    name: 'Northern Lights Photo',
    category: 'Photographers',
    location: 'Luzon (North)',
    priceRange: '₱₱',
    budgetTier: 2,
    rating: 4.6,
    reviewCount: 54,
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=1200',
    isVerified: false,
    tags: ['Candid', 'Outdoors', 'Intimate']
  },
  {
    id: '7',
    name: 'Crimson Boracay',
    category: 'Venues',
    location: 'Boracay',
    priceRange: '₱₱₱₱',
    budgetTier: 4,
    rating: 4.9,
    reviewCount: 180,
    imageUrl: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1200',
    isVerified: true,
    tags: ['Luxury', 'Beach', 'Modern', 'Destination']
  },
  {
    id: '8',
    name: 'Central Luzon Catering',
    category: 'Caterers',
    location: 'Luzon (Central)',
    priceRange: '₱',
    budgetTier: 1,
    rating: 4.5,
    reviewCount: 38,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
    isVerified: true,
    tags: ['Affordable', 'Family Style', 'Intimate', 'Civil']
  }
];

export const FILIPINO_TRADITIONS: Tradition[] = [
  {
    id: 't1',
    title: 'Pamamanhikan',
    phase: 'Pre-wedding',
    description: 'The formal meeting of the two families where the groom and his parents visit the bride\'s family to formally ask for her hand.',
    significance: 'It respects the elders and ensures the union starts with family harmony and blessing.',
    tips: ['Bring meaningful food or gifts', 'Prepare a "Save the Date" card for parents'],
    modernTwist: 'Host it as a cozy brunch or a hybrid video call if family members are overseas.'
  },
  {
    id: 't2',
    title: 'Bulungan',
    phase: 'Pre-wedding',
    description: 'A "whispering" session between families to discuss wedding logistics, budget, and responsibilities.',
    significance: 'Prevents public embarrassment and promotes consensus without the pressure of a grand meeting.',
    tips: ['Keep it intimate', 'Have a clear list of topics'],
    modernTwist: 'Use a shared digital spreadsheet to keep everyone on the same page after the talk.'
  },
  {
    id: 't3',
    title: 'The Arras Ceremony',
    phase: 'Ceremony',
    description: 'The groom presents 13 gold or silver coins to the bride, representing their shared wealth.',
    significance: 'Symbolizes the groom\'s commitment to provide and the bride\'s stewardship of their resources.',
    tips: ['Use heirloom coins', 'Practice the "pouring" motion'],
    modernTwist: 'Use custom coins engraved with your wedding date or initials.'
  },
  {
    id: 't4',
    title: 'The Cord and Veil',
    phase: 'Ceremony',
    description: 'Principal sponsors drape a veil and an infinity-shaped cord over the couple.',
    significance: 'The veil represents being clothed as one, while the cord signifies a lifelong eternal bond.',
    tips: ['Involve cherished Ninongs and Ninangs', 'Practice with the pins'],
    modernTwist: 'Design a bespoke cord made of silk or floral vines to match your theme.'
  },
  {
    id: 't5',
    title: 'Unity Candle',
    phase: 'Ceremony',
    description: 'The couple lights a single center candle from two smaller individual candles.',
    significance: 'Represents the merging of two lives and two families into a single bright light.',
    tips: ['Assign family elders to light the initial candles'],
    modernTwist: 'Mix two colors of sand or paint on a canvas for a lasting piece of art.'
  },
  {
    id: 't6',
    title: 'Prosperity Dance',
    phase: 'Post-wedding',
    description: 'Also known as the Money Dance, guests pin paper bills onto the couple\'s attire during their first dance.',
    significance: 'A communal way for family and friends to help the couple start their financial life together.',
    tips: ['Have safety pins ready', 'Prepare an upbeat playlist'],
    modernTwist: 'Provide a stylish "Money Tree" or display a discrete QR code for digital transfers.'
  },
  {
    id: 't7',
    title: 'Sabugan / Reception Tokens',
    phase: 'Post-wedding',
    description: 'The distribution of small tokens or "pasalubong" to guests as they leave.',
    significance: 'A gesture of gratitude for the community that supported the union.',
    tips: ['Choose locally sourced items', 'Add personalized notes'],
    modernTwist: 'Give eco-friendly seeds, artisanal local coffee, or succulents.'
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: 'c1', task: 'Pamamanhikan (Formal meeting of families)', category: 'Tradition', timeline: '12 Months Before', isCompleted: false, isFilipinoSpecific: true },
  { id: 'c2', task: 'Book your Church or Civil venue', category: 'Logistics', timeline: '12 Months Before', isCompleted: false },
  { id: 'c3', task: 'Secure Marriage License from LCR', category: 'Legal', timeline: '6 Months Before', isCompleted: false, isFilipinoSpecific: true },
  { id: 'c4', task: 'Attend Canonical Interview (for Church weddings)', category: 'Legal', timeline: '3 Months Before', isCompleted: false, isFilipinoSpecific: true },
  { id: 'c5', task: 'Choose Principal Sponsors (Ninongs/Ninangs)', category: 'Social', timeline: '6 Months Before', isCompleted: false, isFilipinoSpecific: true },
  { id: 'c6', task: 'Buy Arras, Candles, Veil, and Cord', category: 'Tradition', timeline: '3 Months Before', isCompleted: false, isFilipinoSpecific: true },
  { id: 'c7', task: 'Final Gown and Barong Fitting', category: 'Attire', timeline: '1 Month Before', isCompleted: false }
];

export const INITIAL_BUDGET: BudgetItem[] = [
  { id: 'b1', category: 'Venue & Food', estimated: 250000, actual: 0 },
  { id: 'b2', category: 'Attire (Gown/Barong)', estimated: 80000, actual: 0 },
  { id: 'b3', category: 'Photo & Video', estimated: 120000, actual: 0 },
  { id: 'b4', category: 'Rings & Jewelry', estimated: 50000, actual: 0 },
  { id: 'b5', category: 'Tokens for Sponsors', estimated: 15000, actual: 0 }
];

export const SAVE_THE_DATE_TEMPLATES: SaveTheDateTemplate[] = [
  {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    description: 'Timeless serif typography with delicate gold accents',
    accentColor: '#C5A572',
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean lines and bold sans-serif letterforms',
    accentColor: '#1C3347',
  },
  {
    id: 'filipiniana',
    name: 'Filipiniana',
    description: 'Heritage-inspired motifs with warm earth tones',
    accentColor: '#8B6914',
  },
  {
    id: 'tropical-beach',
    name: 'Tropical / Beach',
    description: 'Breezy ocean palette with botanical accents',
    accentColor: '#6B96AD',
  }
];

export const DEFAULT_SAVE_THE_DATE: SaveTheDateData = {
  groomName: '',
  brideName: '',
  weddingDate: '',
  venue: '',
  location: '',
  photoUrl: null,
  templateId: 'classic-elegant',
  customMessage: "We're getting married!",
};
