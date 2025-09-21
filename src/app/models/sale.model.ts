export interface Sale {
  id?: number;
  medicineId: number;
  medicineName?: string; // Optionnel pour affichage
  quantity: number;
  totalPrice?: number;   // Calculé automatiquement
  date: string;          // ISO string
}
