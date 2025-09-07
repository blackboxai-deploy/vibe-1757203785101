'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockRestaurants } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { MenuItem, SelectedOption } from '@/types';
import { toast } from 'sonner';

interface RestaurantPageProps {
  params: Promise<{ id: string }>;
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const { id } = use(params);
  const { addItem } = useCart();
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>('');
  
  const restaurant = mockRestaurants.find(r => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Restaurante não encontrado</h1>
          <p className="text-gray-600 mb-6">O restaurante que você está procurando não existe.</p>
          <Button className="bg-orange-600 hover:bg-orange-700">
            Voltar aos restaurantes
          </Button>
        </div>
      </div>
    );
  }

  const menuCategories = restaurant.menu.map(category => category.name);
  const displayedCategories = selectedMenuCategory 
    ? restaurant.menu.filter(category => category.name === selectedMenuCategory)
    : restaurant.menu;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Restaurant Header */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="relative h-64 md:h-80 -mx-4">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-6 left-4 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-green-500">
                  {restaurant.isOpen ? 'Aberto' : 'Fechado'}
                </Badge>
                <Badge variant="secondary" className="bg-white/90 text-gray-900">
                  {restaurant.category}
                </Badge>
                <div className="flex items-center space-x-1 bg-black/70 px-2 py-1 rounded">
                  <span className="text-yellow-400">★</span>
                  <span className="font-semibold">{restaurant.rating}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-lg opacity-90 max-w-2xl">{restaurant.description}</p>
            </div>
          </div>
          
          <div className="py-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="font-medium">Entrega: R$ {restaurant.deliveryFee.toFixed(2)}</span>
                </div>
              </div>
              
              {menuCategories.length > 1 && (
                <Select value={selectedMenuCategory} onValueChange={setSelectedMenuCategory}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filtrar categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as categorias</SelectItem>
                    {menuCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {displayedCategories.map((category) => (
              <div key={category.id} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.name}</h2>
                <div className="grid gap-6">
                  {category.items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      restaurant={restaurant}
                      onAddToCart={addItem}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

interface MenuItemCardProps {
  item: MenuItem;
  restaurant: {
    id: string;
    name: string;
  };
  onAddToCart: (restaurantId: string, restaurantName: string, menuItem: MenuItem, quantity: number, selectedOptions: SelectedOption[]) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, restaurant, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddToCart = () => {
    if (!item.available) {
      toast.error('Este item não está disponível no momento');
      return;
    }

    // Validar opções obrigatórias
    if (item.options) {
      const missingRequired = item.options.filter(option => 
        option.required && !selectedOptions[option.id]
      );
      
      if (missingRequired.length > 0) {
        toast.error(`Por favor, selecione: ${missingRequired.map(o => o.name).join(', ')}`);
        return;
      }
    }

    // Converter opções selecionadas
    const optionsArray: SelectedOption[] = [];
    if (item.options) {
      item.options.forEach(option => {
        const selectedChoiceId = selectedOptions[option.id];
        if (selectedChoiceId) {
          const choice = option.choices.find(c => c.id === selectedChoiceId);
          if (choice) {
            optionsArray.push({
              optionId: option.id,
              optionName: option.name,
              choiceId: choice.id,
              choiceName: choice.name,
              price: choice.price
            });
          }
        }
      });
    }

    onAddToCart(restaurant.id, restaurant.name, item, quantity, optionsArray);
    setIsDialogOpen(false);
    setQuantity(1);
    setSelectedOptions({});
  };

  const getTotalPrice = () => {
    let total = item.price * quantity;
    if (item.options) {
      item.options.forEach(option => {
        const selectedChoiceId = selectedOptions[option.id];
        if (selectedChoiceId) {
          const choice = option.choices.find(c => c.id === selectedChoiceId);
          if (choice) {
            total += choice.price * quantity;
          }
        }
      });
    }
    return total;
  };

  const canAddToCart = item.available && (
    !item.options || 
    item.options.every(option => !option.required || selectedOptions[option.id])
  );

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
              {!item.available && (
                <Badge variant="destructive">Indisponível</Badge>
              )}
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-orange-600">
                R$ {item.price.toFixed(2)}
              </span>
              
              {item.options && item.options.length > 0 ? (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-orange-600 hover:bg-orange-700"
                      disabled={!item.available}
                    >
                      Personalizar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{item.name}</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <p className="text-gray-600">{item.description}</p>
                      
                      {item.options.map((option) => (
                        <div key={option.id}>
                          <h4 className="font-semibold mb-2">
                            {option.name}
                            {option.required && <span className="text-red-500 ml-1">*</span>}
                          </h4>
                          <div className="space-y-2">
                            {option.choices.map((choice) => (
                              <label
                                key={choice.id}
                                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                              >
                                <div className="flex items-center space-x-3">
                                  <input
                                    type="radio"
                                    name={option.id}
                                    value={choice.id}
                                    checked={selectedOptions[option.id] === choice.id}
                                    onChange={(e) => setSelectedOptions({
                                      ...selectedOptions,
                                      [option.id]: e.target.value
                                    })}
                                    className="text-orange-600"
                                  />
                                  <span>{choice.name}</span>
                                </div>
                                {choice.price > 0 && (
                                  <span className="text-sm text-gray-600">
                                    +R$ {choice.price.toFixed(2)}
                                  </span>
                                )}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          >
                            -
                          </Button>
                          <span className="text-lg font-semibold">{quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        
                        <Button
                          onClick={handleAddToCart}
                          disabled={!canAddToCart}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          Adicionar R$ {getTotalPrice().toFixed(2)}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button 
                  onClick={() => {
                    onAddToCart(restaurant.id, restaurant.name, item, 1, []);
                  }}
                  className="bg-orange-600 hover:bg-orange-700"
                  disabled={!item.available}
                >
                  Adicionar
                </Button>
              )}
            </div>
          </div>
          
          <div className="relative w-32 md:w-40 flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};