export interface Medicine {
  id?: number;
  name: string;
  category?: string;
  price: number;
  unitPrice: number;
  stock: number;
  expiryDate: string; // format "YYYY-MM-DD"
}
