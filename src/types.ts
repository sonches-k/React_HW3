export interface Product {
    id: number;
    name: string;
    category: string;
    description: string;
    image: string;
    quantity: number;
    unit: string;
  }
  
  export interface FiltersState {
    nameRegex: RegExp | null;
    category: string | null;
    nonZeroQuantity: boolean;
  }
  