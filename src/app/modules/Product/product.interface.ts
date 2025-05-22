export interface IProduct {
  name: string;
  description?: string;
  price: number;
  stock: number; // current available stock
  createdAt?: Date;
  updatedAt?: Date;
}
