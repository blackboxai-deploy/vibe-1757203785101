'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, MenuItem, SelectedOption } from '@/types';
import { toast } from 'sonner';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  deliveryFee: number;
  restaurantId: string | null;
  restaurantName: string | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { restaurantId: string; restaurantName: string; menuItem: MenuItem; quantity: number; selectedOptions: SelectedOption[] } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  deliveryFee: 5.99,
  restaurantId: null,
  restaurantName: null,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { restaurantId, restaurantName, menuItem, quantity, selectedOptions } = action.payload;
      
      // Se tem itens de outro restaurante, limpa o carrinho
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        toast.error('Você só pode pedir de um restaurante por vez. Carrinho limpo.');
        return {
          ...initialState,
          items: [],
          restaurantId,
          restaurantName,
        };
      }

      const optionsPrice = selectedOptions.reduce((sum, option) => sum + option.price, 0);
      const totalPrice = (menuItem.price + optionsPrice) * quantity;
      
      const newItem: CartItem = {
        id: `${menuItem.id}-${Date.now()}`,
        restaurantId,
        restaurantName,
        menuItem,
        quantity,
        selectedOptions,
        totalPrice,
      };

      const newItems = [...state.items, newItem];
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newItems.reduce((sum, item) => sum + item.totalPrice, 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
        restaurantId,
        restaurantName,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.itemId);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
      
      return {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
        restaurantId: newItems.length === 0 ? null : state.restaurantId,
        restaurantName: newItems.length === 0 ? null : state.restaurantName,
      };
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { itemId } });
      }

      const newItems = state.items.map(item => {
        if (item.id === itemId) {
          const optionsPrice = item.selectedOptions.reduce((sum, option) => sum + option.price, 0);
          const totalPrice = (item.menuItem.price + optionsPrice) * quantity;
          return { ...item, quantity, totalPrice };
        }
        return item;
      });

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newItems.reduce((sum, item) => sum + item.totalPrice, 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
      };
    }

    case 'CLEAR_CART': {
      return initialState;
    }

    case 'LOAD_CART': {
      return action.payload;
    }

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (restaurantId: string, restaurantName: string, menuItem: MenuItem, quantity: number, selectedOptions: SelectedOption[]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('deliveryapp-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('deliveryapp-cart', JSON.stringify(state));
  }, [state]);

  const addItem = (restaurantId: string, restaurantName: string, menuItem: MenuItem, quantity: number, selectedOptions: SelectedOption[]) => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { restaurantId, restaurantName, menuItem, quantity, selectedOptions } 
    });
    toast.success(`${menuItem.name} adicionado ao carrinho`);
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
    toast.success('Item removido do carrinho');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Carrinho limpo');
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};