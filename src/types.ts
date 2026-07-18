export interface Product {
  id: string;
  image: string; // Product photo URL or visual svg placeholder
  title: string;
  ageRange: string; // e.g. "4+", "6+", "10+"
  price: number;
  rating: number; // 0 to 5
  tags: string[]; // e.g. ["Coding", "Robotics", "Early Math"]
  category: string; // e.g. "STEM", "Coding & Robotics", "Early Learning", "Classroom Essentials"
  isNew: boolean;
  isExclusive: boolean;
  description: string;
  pieceCount: number;
  subject: string; // e.g. "Robotics", "Coding", "Engineering", "Early Math", "Social Studies"
  productLine: string; // e.g. "SPIKE Prime", "BricQ Motion", "DUPLO Education", "Coding Express"
  features: string[]; // key feature bullets
}

export interface Creation {
  id: string;
  imageSrc: string; // base64 or URL
  title: string;
  caption?: string;
  displayName?: string;
  uploadedAt: string; // ISO date or formatted date
}

