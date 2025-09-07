'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { CartModal } from '@/components/cart/CartModal';

export const Header: React.FC = () => {
  const { state: cartState } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900">DeliveryApp</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/restaurantes" 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Restaurantes
              </Link>
              <Link 
                href="/pedidos" 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Meus Pedidos
              </Link>
              <Link 
                href="/perfil" 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Perfil
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative hover:bg-orange-50 hover:border-orange-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 0L6 5H3m0 0v16h18V5H6z" />
                </svg>
                Carrinho
                {cartState.totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartState.totalItems}
                  </Badge>
                )}
              </Button>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/registro">
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    Cadastrar
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link 
                      href="/"
                      className="text-lg font-medium text-gray-900 hover:text-orange-600 transition-colors py-2"
                    >
                      Home
                    </Link>
                    <Link 
                      href="/restaurantes"
                      className="text-lg font-medium text-gray-900 hover:text-orange-600 transition-colors py-2"
                    >
                      Restaurantes
                    </Link>
                    <Link 
                      href="/pedidos"
                      className="text-lg font-medium text-gray-900 hover:text-orange-600 transition-colors py-2"
                    >
                      Meus Pedidos
                    </Link>
                    <Link 
                      href="/perfil"
                      className="text-lg font-medium text-gray-900 hover:text-orange-600 transition-colors py-2"
                    >
                      Perfil
                    </Link>
                    
                    <div className="border-t pt-4 space-y-2">
                      <Link href="/auth/login" className="block">
                        <Button variant="outline" size="sm" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/auth/registro" className="block">
                        <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                          Cadastrar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};