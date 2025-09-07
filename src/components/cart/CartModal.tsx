'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { state: cartState, updateQuantity, removeItem, clearCart } = useCart();

  if (cartState.items.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Seu Carrinho</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 0L6 5H3" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Carrinho vazio
            </h3>
            <p className="text-gray-500 mb-4">
              Adicione itens dos restaurantes para começar seu pedido
            </p>
            <Link href="/restaurantes" onClick={onClose}>
              <Button className="bg-orange-600 hover:bg-orange-700">
                Ver Restaurantes
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[400px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {cartState.restaurantName}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Limpar carrinho
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {cartState.items.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {item.menuItem.name}
                  </h4>
                  
                  {item.selectedOptions.length > 0 && (
                    <div className="mt-1">
                      {item.selectedOptions.map((option) => (
                        <Badge
                          key={`${option.optionId}-${option.choiceId}`}
                          variant="secondary"
                          className="text-xs mr-1"
                        >
                          {option.choiceName}
                          {option.price > 0 && ` +R$ ${option.price.toFixed(2)}`}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        -
                      </Button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-orange-600">
                        R$ {item.totalPrice.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>R$ {cartState.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxa de entrega</span>
            <span>R$ {cartState.deliveryFee.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-orange-600">
              R$ {(cartState.totalAmount + cartState.deliveryFee).toFixed(2)}
            </span>
          </div>
          
          <Link href="/checkout" onClick={onClose} className="block">
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Finalizar Pedido
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};