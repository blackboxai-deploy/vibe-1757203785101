export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  category: string;
  description: string;
  isOpen: boolean;
  menu: MenuCategory[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  options?: MenuOption[];
}

export interface MenuOption {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  required: boolean;
  choices: MenuChoice[];
}

export interface MenuChoice {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  restaurantId: string;
  restaurantName: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: SelectedOption[];
  totalPrice: number;
}

export interface SelectedOption {
  optionId: string;
  optionName: string;
  choiceId: string;
  choiceName: string;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  status: OrderStatus;
  totalAmount: number;
  deliveryFee: number;
  deliveryAddress: Address;
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery: string;
  deliveryPerson?: DeliveryPerson;
}

export interface Address {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  orders: Order[];
  createdAt: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed' 
  | 'preparing'
  | 'ready_for_pickup'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface Filter {
  category?: string;
  rating?: number;
  deliveryTime?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  activeRestaurants: number;
  averageOrderValue: number;
  ordersToday: number;
  revenueToday: number;
}