export interface BusinessData {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  headline: string;
  insights: {
    seoScore: number;
    visibility: number;
    engagement: number;
    conversion: number;
  };
}

export interface BusinessFormData {
  name: string;
  location: string;
}