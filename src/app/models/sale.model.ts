export interface Sale {
  id?: number;
  medicineId: number;
  medicineName?: string; 
  quantity: number;
  category?: string;
  unitPrice: number;
  totalPrice?: number;   
  date: string;          
}
