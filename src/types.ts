export type CommunityType = 'All' | 'Sunni' | 'Shia' | 'Bohra';

export interface Profile {
  id: string;
  name: string;
  age: number;
  height: string;
  gender: 'Female' | 'Male';
  community: 'Sunni' | 'Shia' | 'Bohra';
  subCommunity: string;
  education: string;
  profession: string;
  companyOrField: string;
  city: string;
  district: string;
  photoUrl: string;
  photoPrivacy: 'Public' | 'OnRequest' | 'Blur';
  familyRoots: string;
  waliGuardian: string;
  waliRelation: string;
  waliContactAvailable: boolean;
  nikahView: string;
  about: string;
  verified: boolean;
  zeroDowryPledge: boolean;
  maritalStatus: 'Never Married' | 'Divorced' | 'Widowed';
}

export interface SuccessStory {
  id: string;
  coupleNames: string;
  location: string;
  year: string;
  quote: string;
  fullStory: string;
  imageUrl: string;
  community: string;
  nikahHighlight: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  office: string;
  experience: string;
  bio: string;
  imageUrl: string;
  specialization: string;
}

export interface FoundationEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  category: 'Upcoming' | 'Past';
  description: string;
  highlights: string[];
  imageUrl: string;
  capacity?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  originalTitleHindi?: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  imageUrl: string;
}

export interface BureauOffice {
  id: string;
  name: string;
  city: string;
  type: 'Head Office' | 'Regional Bureau';
  address: string;
  timing: string;
  phone: string;
  email: string;
  counselorInCharge: string;
}
