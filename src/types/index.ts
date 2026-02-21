export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
}

export interface Category {
  name: string;
  icon: any;
}
