import { NextRequest, NextResponse } from 'next/server';
import { mockRestaurants } from '@/data/mockData';

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteProps
) {
  try {
    const { id } = await params;
    
    const restaurant = mockRestaurants.find(r => r.id === id);
    
    if (!restaurant) {
      return NextResponse.json(
        { success: false, message: 'Restaurante não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    console.error('Erro ao buscar restaurante:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteProps
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const restaurantIndex = mockRestaurants.findIndex(r => r.id === id);
    
    if (restaurantIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Restaurante não encontrado' },
        { status: 404 }
      );
    }

    // Atualizar restaurante
    mockRestaurants[restaurantIndex] = {
      ...mockRestaurants[restaurantIndex],
      ...body,
      id // Manter o ID original
    };

    return NextResponse.json({
      success: true,
      message: 'Restaurante atualizado com sucesso',
      data: mockRestaurants[restaurantIndex]
    });
  } catch (error) {
    console.error('Erro ao atualizar restaurante:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteProps
) {
  try {
    const { id } = await params;
    
    const restaurantIndex = mockRestaurants.findIndex(r => r.id === id);
    
    if (restaurantIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Restaurante não encontrado' },
        { status: 404 }
      );
    }

    // Remover restaurante
    const deletedRestaurant = mockRestaurants.splice(restaurantIndex, 1)[0];

    return NextResponse.json({
      success: true,
      message: 'Restaurante removido com sucesso',
      data: deletedRestaurant
    });
  } catch (error) {
    console.error('Erro ao remover restaurante:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}