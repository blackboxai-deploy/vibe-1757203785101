import { Restaurant, Order, User, AdminStats } from '@/types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizzaria Bella Napoli',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2eb92bee-ed61-4799-9e90-b8c290b68ee6.png',
    rating: 4.8,
    deliveryTime: '30-45 min',
    deliveryFee: 5.99,
    category: 'Pizza',
    description: 'Autêntica pizzaria italiana com massas tradicionais e ingredientes importados',
    isOpen: true,
    menu: [
      {
        id: 'pizza-category',
        name: 'Pizzas Tradicionais',
        items: [
          {
            id: 'margherita',
            name: 'Pizza Margherita',
            description: 'Molho de tomate, mussarela, manjericão fresco e azeite extra virgem',
            price: 42.90,
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/69ca72c8-725e-46b0-abb2-ce21cd2e9aec.png',
            category: 'Pizza',
            available: true,
            options: [
              {
                id: 'size',
                name: 'Tamanho',
                type: 'single',
                required: true,
                choices: [
                  { id: 'small', name: 'Pequena', price: 0 },
                  { id: 'medium', name: 'Média', price: 8.00 },
                  { id: 'large', name: 'Grande', price: 15.00 },
                ]
              }
            ]
          },
          {
            id: 'pepperoni',
            name: 'Pizza Pepperoni',
            description: 'Molho de tomate, mussarela e abundante pepperoni italiano',
            price: 48.90,
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bad8b922-e307-4ab0-baff-090aba84a5e0.png',
            category: 'Pizza',
            available: true,
          },
          {
            id: 'quattro-formaggi',
            name: 'Pizza Quattro Formaggi',
            description: 'Quatro queijos: mussarela, gorgonzola, parmesão e provolone',
            price: 52.90,
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f33ca824-3fa8-418e-a10c-1d976e9f109b.png',
            category: 'Pizza',
            available: true,
          }
        ]
      },
      {
        id: 'drinks-category',
        name: 'Bebidas',
        items: [
          {
            id: 'coca-cola',
            name: 'Coca-Cola Lata',
            description: 'Refrigerante Coca-Cola lata 350ml gelada',
            price: 5.90,
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9dfb93b3-f025-44d9-aa2f-f61fccbb3723.png',
            category: 'Bebida',
            available: true,
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Burger House Premium',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a0fa0c01-0353-478b-86a9-85ae374e804c.png',
    rating: 4.7,
    deliveryTime: '25-40 min',
    deliveryFee: 6.99,
    category: 'Hambúrguer',
    description: 'Hambúrgueres artesanais com ingredientes premium e pães brioche',
    isOpen: true,
    menu: [
      {
        id: 'burger-category',
        name: 'Hambúrgueres Artesanais',
        items: [
          {
            id: 'classic-burger',
            name: 'Classic Burger',
            description: 'Hambúrguer de carne 180g, queijo cheddar, alface, tomate, cebola e molho especial',
            price: 32.90,
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a07e2e0f-6b15-4f8a-90af-38d44a78c5de.png',
            category: 'Hambúrguer',
            available: true,
            options: [
              {
                id: 'meat-point',
                name: 'Ponto da Carne',
                type: 'single',
                required: true,
                choices: [
                  { id: 'rare', name: 'Mal passado', price: 0 },
                  { id: 'medium', name: 'Ao ponto', price: 0 },
                  { id: 'well-done', name: 'Bem passado', price: 0 },
                ]
              },
              {
                id: 'extras',
                name: 'Extras',
                type: 'multiple',
                required: false,
                choices: [
                  { id: 'bacon', name: 'Bacon', price: 6.00 },
                  { id: 'extra-cheese', name: 'Queijo Extra', price: 4.00 },
                  { id: 'onion-rings', name: 'Anéis de Cebola', price: 8.00 },
                ]
              }
            ]
          },
          {
            id: 'bacon-burger',
            name: 'Bacon BBQ Burger',
            description: 'Hambúrguer de carne 200g, bacon crocante, queijo, cebola caramelizada e molho BBQ',
            price: 38.90,
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cd40ab63-24e5-430e-867f-13ecc9eab159.png',
            category: 'Hambúrguer',
            available: true,
          }
        ]
      },
      {
        id: 'sides-category',
        name: 'Acompanhamentos',
        items: [
          {
            id: 'french-fries',
            name: 'Batata Frita Premium',
            description: 'Batatas rústicas crocantes temperadas com ervas finas',
            price: 18.90,
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/74ad4902-da7c-442a-ba9d-4f2f31c05eb8.png',
            category: 'Acompanhamento',
            available: true,
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Sushi Zen',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/73610a6a-564b-4c77-80ae-ac06c63da47c.png',
    rating: 4.9,
    deliveryTime: '40-55 min',
    deliveryFee: 8.99,
    category: 'Japonesa',
    description: 'Culinária japonesa autêntica com ingredientes frescos e sushiman experiente',
    isOpen: true,
    menu: [
      {
        id: 'sushi-category',
        name: 'Sushis e Sashimis',
        items: [
          {
            id: 'combo-sushi',
            name: 'Combo Sushi Premium',
            description: '20 peças variadas: salmão, atum, camarão e peixe branco',
            price: 89.90,
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d5a49e0a-276e-42f4-8f52-62cdb85a3e21.png',
            category: 'Sushi',
            available: true,
          },
          {
            id: 'temaki-salmon',
            name: 'Temaki de Salmão',
            description: 'Cone de alga nori com arroz, salmão fresco, pepino e cream cheese',
            price: 24.90,
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cc2d0bdd-c043-4343-b0d8-1fd30f46dcbc.png',
            category: 'Sushi',
            available: true,
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Taco Libre Mexicano',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d185b523-22c5-4972-b9a3-8a8bdea23bc7.png',
    rating: 4.6,
    deliveryTime: '35-50 min',
    deliveryFee: 7.50,
    category: 'Mexicana',
    description: 'Sabores autênticos do México com receitas tradicionais e temperos especiais',
    isOpen: true,
    menu: [
      {
        id: 'tacos-category',
        name: 'Tacos Tradicionais',
        items: [
          {
            id: 'beef-tacos',
            name: 'Tacos de Carne',
            description: 'Três tacos com carne temperada, cebola, coentro e salsa picante',
            price: 28.90,
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ea26a92d-c8c7-474c-88c1-d742fa2518c2.png',
            category: 'Taco',
            available: true,
          }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Pasta & Amore',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5ff6dba2-490c-494c-8367-edf5ef0d3b2c.png',
    rating: 4.7,
    deliveryTime: '30-45 min',
    deliveryFee: 6.50,
    category: 'Italiana',
    description: 'Massas artesanais feitas diariamente com molhos tradicionais da Itália',
    isOpen: true,
    menu: [
      {
        id: 'pasta-category',
        name: 'Massas Artesanais',
        items: [
          {
            id: 'carbonara',
            name: 'Spaghetti Carbonara',
            description: 'Massa fresca com bacon, ovos, queijo parmesão e pimenta do reino',
            price: 36.90,
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9570c9b6-d3f3-4235-9d91-1e7047fa5154.png',
            category: 'Massa',
            available: true,
          }
        ]
      }
    ]
  }
];

export const mockUser: User = {
  id: 'user1',
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '(11) 99999-9999',
  addresses: [
    {
      id: 'addr1',
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      zipCode: '01234-567',
      coordinates: { lat: -23.550520, lng: -46.633308 }
    }
  ],
  orders: [],
  createdAt: '2024-01-01T00:00:00Z'
};

export const mockOrders: Order[] = [
  {
    id: 'order1',
    userId: 'user1',
    restaurantId: '1',
    restaurantName: 'Pizzaria Bella Napoli',
    items: [
      {
        id: 'item1',
        restaurantId: '1',
        restaurantName: 'Pizzaria Bella Napoli',
        menuItem: mockRestaurants[0].menu[0].items[0],
        quantity: 1,
        selectedOptions: [
          {
            optionId: 'size',
            optionName: 'Tamanho',
            choiceId: 'medium',
            choiceName: 'Média',
            price: 8.00
          }
        ],
        totalPrice: 50.90
      }
    ],
    status: 'preparing',
    totalAmount: 50.90,
    deliveryFee: 5.99,
    deliveryAddress: mockUser.addresses[0],
    paymentMethod: 'credit_card',
    createdAt: '2024-01-15T19:30:00Z',
    estimatedDelivery: '2024-01-15T20:15:00Z',
    deliveryPerson: {
      id: 'delivery1',
      name: 'Carlos Santos',
      phone: '(11) 88888-8888',
      vehicle: 'Moto Honda CG 160',
      rating: 4.8
    }
  }
];

export const mockAdminStats: AdminStats = {
  totalOrders: 1250,
  totalRevenue: 45678.90,
  activeRestaurants: 25,
  averageOrderValue: 36.54,
  ordersToday: 87,
  revenueToday: 3180.75
};

export const categories = [
  'Todos',
  'Pizza',
  'Hambúrguer', 
  'Japonesa',
  'Italiana',
  'Mexicana',
  'Brasileira',
  'Chinesa',
  'Árabe',
  'Vegetariana'
];