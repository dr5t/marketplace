export enum UserRole {
  GUEST = "GUEST",
  USER = "USER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  sellerId: string;
  stock: number;
  rating: number;
  reviewsCount: number;
}
