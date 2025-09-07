'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockOrders } from '@/data/mockData';

const statusMap = {
  pending: { label: 'Pendente', color: 'bg-yellow-500' },
  confirmed: { label: 'Confirmado', color: 'bg-blue-500' },
  preparing: { label: 'Preparando', color: 'bg-orange-500' },
  ready_for_pickup: { label: 'Pronto', color: 'bg-purple-500' },
  out_for_delivery: { label: 'Saiu para entrega', color: 'bg-indigo-500' },
  delivered: { label: 'Entregue', color: 'bg-green-500' },
  cancelled: { label: 'Cancelado', color: 'bg-red-500' },
};

export default function PedidosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Meus Pedidos</h1>

          {mockOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum pedido encontrado
              </h2>
              <p className="text-gray-600 mb-6">
                Você ainda não fez nenhum pedido. Que tal começar agora?
              </p>
              <Link href="/restaurantes">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Explorar Restaurantes
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {mockOrders.map((order) => {
                const status = statusMap[order.status];
                const orderDate = new Date(order.createdAt);
                const estimatedDelivery = new Date(order.estimatedDelivery);

                return (
                  <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">
                                Pedido #{order.id.slice(-8).toUpperCase()}
                              </h3>
                              <Badge className={`${status.color} text-white`}>
                                {status.label}
                              </Badge>
                            </div>
                            <p className="text-gray-600">{order.restaurantName}</p>
                            <p className="text-sm text-gray-500">
                              Pedido em {orderDate.toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className="mt-4 lg:mt-0 text-right">
                            <p className="text-2xl font-bold text-orange-600">
                              R$ {(order.totalAmount + order.deliveryFee).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.items.reduce((sum, item) => sum + item.quantity, 0)} item{order.items.length > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="border-t pt-4 mb-4">
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center space-x-4">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image
                                    src={item.menuItem.image}
                                    alt={item.menuItem.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900">{item.menuItem.name}</h4>
                                  {item.selectedOptions.length > 0 && (
                                    <p className="text-sm text-gray-500">
                                      {item.selectedOptions.map(option => option.choiceName).join(', ')}
                                    </p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">Qtd: {item.quantity}</p>
                                  <p className="text-sm text-gray-600">R$ {item.totalPrice.toFixed(2)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Delivery Info */}
                        {order.status !== 'cancelled' && (
                          <div className="border-t pt-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <h5 className="font-medium text-gray-900 mb-1">Endereço de Entrega</h5>
                                <p className="text-gray-600">
                                  {order.deliveryAddress.street}, {order.deliveryAddress.number}
                                  {order.deliveryAddress.complement && `, ${order.deliveryAddress.complement}`}
                                </p>
                                <p className="text-gray-600">
                                  {order.deliveryAddress.neighborhood}, {order.deliveryAddress.city}
                                </p>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900 mb-1">Previsão de Entrega</h5>
                                <p className="text-gray-600">
                                  {estimatedDelivery.toLocaleTimeString('pt-BR', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                                {order.deliveryPerson && (
                                  <div className="mt-2">
                                    <p className="font-medium text-gray-900">{order.deliveryPerson.name}</p>
                                    <p className="text-gray-600">{order.deliveryPerson.phone}</p>
                                    <div className="flex items-center space-x-1 mt-1">
                                      <span className="text-yellow-500">★</span>
                                      <span className="text-sm">{order.deliveryPerson.rating}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="border-t pt-4 flex flex-col sm:flex-row gap-3 justify-between">
                          <div className="flex gap-2">
                            <Link href={`/pedidos/${order.id}`}>
                              <Button variant="outline" size="sm">
                                Ver Detalhes
                              </Button>
                            </Link>
                            {order.status === 'delivered' && (
                              <Button variant="outline" size="sm">
                                Pedir Novamente
                              </Button>
                            )}
                          </div>
                          
                          {(order.status === 'pending' || order.status === 'confirmed') && (
                            <Button variant="destructive" size="sm">
                              Cancelar Pedido
                            </Button>
                          )}
                          
                          {order.status === 'delivered' && (
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              Avaliar Pedido
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}