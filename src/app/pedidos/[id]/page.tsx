'use client';

import React, { use, useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockOrders } from '@/data/mockData';
import { OrderStatus } from '@/types';

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

const statusMap = {
  pending: { label: 'Pendente', color: 'bg-yellow-500', description: 'Aguardando confirmação do restaurante' },
  confirmed: { label: 'Confirmado', color: 'bg-blue-500', description: 'Pedido confirmado pelo restaurante' },
  preparing: { label: 'Preparando', color: 'bg-orange-500', description: 'Seu pedido está sendo preparado' },
  ready_for_pickup: { label: 'Pronto', color: 'bg-purple-500', description: 'Pedido pronto para retirada' },
  out_for_delivery: { label: 'Saiu para entrega', color: 'bg-indigo-500', description: 'Pedido a caminho do endereço' },
  delivered: { label: 'Entregue', color: 'bg-green-500', description: 'Pedido entregue com sucesso' },
  cancelled: { label: 'Cancelado', color: 'bg-red-500', description: 'Pedido cancelado' },
};

const statusOrder: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered'];

export default function OrderPage({ params }: OrderPageProps) {
  const { id } = use(params);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualizar tempo a cada minuto para simular tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Simular um pedido se não encontrar
  const order = mockOrders.find(o => o.id === id) || {
    ...mockOrders[0],
    id: id,
  };

  const status = statusMap[order.status];
  const orderDate = new Date(order.createdAt);
  const estimatedDelivery = new Date(order.estimatedDelivery);
  const currentStatusIndex = statusOrder.indexOf(order.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Pedido #{order.id.slice(-8).toUpperCase()}
                </h1>
                <p className="text-lg text-gray-600">{order.restaurantName}</p>
                <p className="text-sm text-gray-500">
                  Pedido realizado em {orderDate.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <Badge className={`${status.color} text-white mb-2`}>
                  {status.label}
                </Badge>
                <p className="text-right text-2xl font-bold text-orange-600">
                  R$ {(order.totalAmount + order.deliveryFee).toFixed(2)}
                </p>
              </div>
            </div>
            <p className="text-gray-600">{status.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Acompanhe seu pedido</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {statusOrder.slice(0, -1).map((statusKey, index) => {
                      const statusInfo = statusMap[statusKey];
                      const isCompleted = index <= currentStatusIndex;
                      const isCurrent = index === currentStatusIndex;
                      
                      return (
                        <div key={statusKey} className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-green-500 text-white' 
                              : isCurrent 
                              ? 'bg-orange-500 text-white animate-pulse' 
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            {isCompleted ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className="text-sm font-bold">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>
                              {statusInfo.label}
                            </p>
                            <p className={`text-sm ${isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'}`}>
                              {statusInfo.description}
                            </p>
                          </div>
                          {isCurrent && (
                            <div className="text-sm text-orange-600 font-medium">
                              Em andamento
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {order.status === 'delivered' && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-green-800 font-medium">Pedido entregue com sucesso!</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        Entregue em {estimatedDelivery.toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  )}

                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-blue-900">Previsão de entrega</p>
                          <p className="text-blue-700">
                            {estimatedDelivery.toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-blue-700">
                            {Math.max(0, Math.ceil((estimatedDelivery.getTime() - currentTime.getTime()) / (1000 * 60)))} min restantes
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Itens do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900">{item.menuItem.name}</h4>
                          <p className="text-gray-600 text-sm line-clamp-1">{item.menuItem.description}</p>
                          {item.selectedOptions.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.selectedOptions.map((option) => (
                                <Badge
                                  key={`${option.optionId}-${option.choiceId}`}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {option.choiceName}
                                  {option.price > 0 && ` +R$ ${option.price.toFixed(2)}`}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Qtd: {item.quantity}</p>
                          <p className="text-orange-600 font-semibold">R$ {item.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Delivery Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Entrega</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Endereço</p>
                    <p className="text-gray-600 text-sm">
                      {order.deliveryAddress.street}, {order.deliveryAddress.number}
                      {order.deliveryAddress.complement && `, ${order.deliveryAddress.complement}`}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {order.deliveryAddress.neighborhood}, {order.deliveryAddress.city}
                    </p>
                    <p className="text-gray-600 text-sm">CEP: {order.deliveryAddress.zipCode}</p>
                  </div>
                  
                  {order.deliveryPerson && (
                    <div>
                      <Separator className="my-3" />
                      <p className="font-medium text-gray-900 mb-1">Entregador</p>
                      <p className="text-gray-900">{order.deliveryPerson.name}</p>
                      <p className="text-gray-600 text-sm">{order.deliveryPerson.phone}</p>
                      <p className="text-gray-600 text-sm">{order.deliveryPerson.vehicle}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{order.deliveryPerson.rating}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>R$ {order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxa de entrega</span>
                    <span>R$ {order.deliveryFee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-orange-600">R$ {(order.totalAmount + order.deliveryFee).toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Pagamento: {order.paymentMethod === 'credit_card' ? 'Cartão de Crédito' : 
                              order.paymentMethod === 'debit_card' ? 'Cartão de Débito' :
                              order.paymentMethod === 'pix' ? 'PIX' : 'Dinheiro'}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                {(order.status === 'pending' || order.status === 'confirmed') && (
                  <Button variant="destructive" className="w-full">
                    Cancelar Pedido
                  </Button>
                )}
                
                {order.status === 'delivered' && (
                  <>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      Pedir Novamente
                    </Button>
                    <Button variant="outline" className="w-full">
                      Avaliar Pedido
                    </Button>
                  </>
                )}
                
                <Button variant="outline" className="w-full">
                  Entrar em Contato
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}