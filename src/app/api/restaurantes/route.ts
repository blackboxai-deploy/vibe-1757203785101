import { NextRequest, NextResponse } from 'next/server';
import { mockRestaurants } from '@/data/mockData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const isOpen = searchParams.get('isOpen');

    let filteredRestaurants = [...mockRestaurants];

    // Filtrar por categoria
    if (category && category !== 'Todos') {
      filteredRestaurants = filteredRestaurants.filter(
        restaurant => restaurant.category === category
      );
    }

    // Filtrar por busca
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredRestaurants = filteredRestaurants.filter(
        restaurant => 
          restaurant.name.toLowerCase().includes(searchTerm) ||
          restaurant.category.toLowerCase().includes(searchTerm) ||
          restaurant.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filtrar por status de abertura
    if (isOpen === 'true') {
      filteredRestaurants = filteredRestaurants.filter(
        restaurant => restaurant.isOpen
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredRestaurants,
      total: filteredRestaurants.length
    });
  } catch (error) {
    console.error('Erro ao buscar restaurantes:', error);
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
    if (!body.name || !body.category || !body.description) {
      return NextResponse.json(
        { success: false, message: 'Nome, categoria e descrição são obrigatórios' },
        { status: 400 }
      );
    }

    const newRestaurant = {
      id: `restaurant-${Date.now()}`,
      name: body.name,
      image: body.image || 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ecd99399-19d7-47b6-8127-c269a41b28dc.png',
      rating: 0,
      deliveryTime: body.deliveryTime || '30-45 min',
      deliveryFee: body.deliveryFee || 5.99,
      category: body.category,
      description: body.description,
      isOpen: body.isOpen !== undefined ? body.isOpen : true,
      menu: body.menu || []
    };

    // Em uma aplicação real, salvaria no banco de dados
    mockRestaurants.push(newRestaurant);

    return NextResponse.json({
      success: true,
      message: 'Restaurante criado com sucesso',
      data: newRestaurant
    }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar restaurante:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}