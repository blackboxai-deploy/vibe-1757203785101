'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockRestaurants, categories } from '@/data/mockData';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredRestaurants = mockRestaurants.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sua comida favorita,
              <br />
              <span className="text-yellow-300">entregue rapidinho!</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Os melhores restaurantes da sua cidade em um só lugar
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-2xl shadow-lg">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Busque por restaurante ou comida..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-0 text-gray-900 text-lg h-14 focus-visible:ring-0"
                  />
                </div>
                <Button 
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 h-14 px-8"
                >
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Categorias</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${
                  selectedCategory === category 
                    ? 'bg-orange-600 hover:bg-orange-700' 
                    : 'hover:bg-orange-50 hover:border-orange-300'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Restaurantes em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredRestaurants.map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurantes/${restaurant.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-48">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 hover:bg-green-600">
                        {restaurant.isOpen ? 'Aberto' : 'Fechado'}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500 text-lg">★</span>
                        <span className="font-semibold">{restaurant.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{restaurant.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{restaurant.deliveryTime}</span>
                      </span>
                      <span className="font-semibold text-orange-600">
                        Entrega: R$ {restaurant.deliveryFee.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search Results */}
      {(searchTerm || selectedCategory !== 'Todos') && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              {searchTerm ? `Resultados para "${searchTerm}"` : `Categoria: ${selectedCategory}`}
            </h2>
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-500">
                  Tente buscar por outro termo ou categoria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <Link key={restaurant.id} href={`/restaurantes/${restaurant.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="relative h-40">
                        <Image
                          src={restaurant.image}
                          alt={restaurant.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge 
                            variant={restaurant.isOpen ? "default" : "secondary"}
                            className={restaurant.isOpen ? "bg-green-500 hover:bg-green-600" : ""}
                          >
                            {restaurant.isOpen ? 'Aberto' : 'Fechado'}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">{restaurant.name}</h3>
                          <div className="flex items-center space-x-1 text-sm">
                            <span className="text-yellow-500">★</span>
                            <span className="font-semibold">{restaurant.rating}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="mb-2">
                          {restaurant.category}
                        </Badge>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{restaurant.deliveryTime}</span>
                          </span>
                          <span className="font-semibold text-orange-600">
                            R$ {restaurant.deliveryFee.toFixed(2)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para pedir?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Cadastre-se agora e ganhe frete grátis na primeira compra!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/registro">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Criar Conta Grátis
              </Button>
            </Link>
            <Link href="/restaurantes">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                Ver Todos os Restaurantes
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}