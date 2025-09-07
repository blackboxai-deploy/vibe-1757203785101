import { NextRequest, NextResponse } from 'next/server';
import { mockOrders } from '@/data/mockData';
import { Order } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    let filteredOrders = [...mockOrders];

    // Filtrar por usuário
    if (userId) {
      filteredOrders = filteredOrders.filter(
        order => order.userId === userId
      );
    }

    // Filtrar por status
    if (status) {
      filteredOrders = filteredOrders.filter(
        order => order.status === status
      );
    }

    // Ordenar por data (mais recente primeiro)
    filteredOrders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Limitar resultados
    if (limit) {
      const limitNum = parseInt(limit);
      filteredOrders = filteredOrders.slice(0, limitNum);
    }

    return NextResponse.json({
      success: true,
      data: filteredOrders,
      total: filteredOrders.length
    });
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validação básica
    if (!body.userId || !body.restaurantId || !body.items || !body.deliveryAddress) {
      return NextResponse.json(
        { success: false, message: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'O pedido deve conter pelo menos um item' },
        { status: 400 }
      );
    }

    // Calcular total
    const totalAmount = body.items.reduce((sum: number, item: any) => sum + item.totalPrice, 0);
    const deliveryFee = body.deliveryFee || 5.99;

    const newOrder: Order = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: body.userId,
      restaurantId: body.restaurantId,
      restaurantName: body.restaurantName || 'Restaurante',
      items: body.items,
      status: 'pending',
      totalAmount,
      deliveryFee,
      deliveryAddress: body.deliveryAddress,
      paymentMethod: body.paymentMethod || 'credit_card',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // 45 minutos
      deliveryPerson: undefined
    };

    // Em uma aplicação real, salvaria no banco de dados
    mockOrders.unshift(newOrder);

    // Simular processamento assíncrono do pedido
    setTimeout(() => {
      const orderIndex = mockOrders.findIndex(o => o.id === newOrder.id);
      if (orderIndex !== -1) {
        mockOrders[orderIndex].status = 'confirmed';
        mockOrders[orderIndex].deliveryPerson = {
          id: 'delivery-1',
          name: 'Carlos Santos',
          phone: '(11) 99999-9999',
          vehicle: 'Moto Honda CG 160',
          rating: 4.8
        };
      }
    }, 3000); // Confirma após 3 segundos

    return NextResponse.json({
      success: true,
      message: 'Pedido criado com sucesso',
      data: newOrder
    }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}