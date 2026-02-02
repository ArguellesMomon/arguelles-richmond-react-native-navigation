export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryDark: string;
  success: string;
  danger: string;
  shadow: string;
}