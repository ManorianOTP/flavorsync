import { NextResponse } from 'next/server';
import type { Recipe } from '../../types/recipe';

// Temporary in-memory storage until we implement Cloudflare
export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Spaghetti Carbonara',
    description: 'A traditional Italian pasta dish made with eggs, cheese, pancetta, and black pepper.',
    image: '/images/carbonara.svg',
    prepTime: 15,
    cookTime: 20,
    servings: '4',
    ingredients: [
      '400g spaghetti',
      '200g pancetta',
      '4 large eggs',
      '100g Pecorino Romano',
      '100g Parmigiano Reggiano',
      'Black pepper',
      'Salt'
    ],
    method: [
      'Bring a large pot of salted water to boil',
      'Cook spaghetti according to package instructions',
      'Meanwhile, cook pancetta until crispy',
      'Mix eggs and cheese in a bowl',
      'Combine pasta with egg mixture and pancetta',
      'Season with black pepper'
    ],
    rating: 4.8,
    tags: ['Italian', 'Pasta', 'Quick', 'Traditional'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Homemade Pizza Margherita',
    description: 'Classic Neapolitan pizza with fresh mozzarella, tomatoes, and basil.',
    image: '/images/margherita.svg',
    prepTime: 90,
    cookTime: 15,
    servings: '2',
    ingredients: [
      'Pizza dough',
      'San Marzano tomatoes',
      'Fresh mozzarella',
      'Fresh basil',
      'Olive oil',
      'Salt'
    ],
    method: [
      'Preheat oven to highest setting',
      'Roll out pizza dough',
      'Add tomato sauce',
      'Top with mozzarella',
      'Bake until crust is golden',
      'Garnish with fresh basil'
    ],
    rating: 4.9,
    tags: ['Italian', 'Pizza', 'Vegetarian'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Classic Tiramisu',
    description: 'A rich Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream.',
    image: '/images/tiramisu.svg',
    prepTime: 30,
    cookTime: 240,
    servings: '8',
    ingredients: [
      '500g mascarpone cheese',
      '4 large eggs',
      '100g sugar',
      '24 ladyfinger cookies',
      'Strong brewed coffee',
      'Cocoa powder',
      'Dark chocolate'
    ],
    method: [
      'Separate eggs and beat yolks with sugar',
      'Mix in mascarpone until smooth',
      'Beat egg whites until stiff peaks form',
      'Fold egg whites into mascarpone mixture',
      'Dip ladyfingers in coffee and layer',
      'Add mascarpone mixture and repeat',
      'Dust with cocoa powder and chill'
    ],
    rating: 4.9,
    tags: ['Italian', 'Dessert', 'No-Bake'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Tonkotsu Ramen',
    description: 'Rich and creamy Japanese ramen with pork bone broth, tender chashu, and perfect jammy eggs.',
    image: '/images/ramen.svg',
    prepTime: 60,
    cookTime: 720,
    servings: '6',
    ingredients: [
      'Pork bones',
      'Ramen noodles',
      'Chashu pork',
      'Ajitsuke tamago (marinated eggs)',
      'Green onions',
      'Nori',
      'Bamboo shoots'
    ],
    method: [
      'Simmer pork bones for 12 hours',
      'Prepare chashu pork',
      'Make marinated eggs',
      'Cook fresh ramen noodles',
      'Assemble bowls with hot broth',
      'Add toppings and serve'
    ],
    rating: 4.7,
    tags: ['Japanese', 'Soup', 'Complex'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheese, fresh vegetables, and special sauce on a toasted brioche bun.',
    image: '/images/burger.svg',
    prepTime: 20,
    cookTime: 10,
    servings: '4',
    ingredients: [
      'Ground beef',
      'Brioche buns',
      'Cheddar cheese',
      'Lettuce',
      'Tomato',
      'Red onion',
      'Special sauce'
    ],
    method: [
      'Form beef into patties',
      'Season with salt and pepper',
      'Grill to desired doneness',
      'Add cheese to melt',
      'Toast the buns',
      'Assemble with toppings and sauce'
    ],
    rating: 4.6,
    tags: ['American', 'Beef', 'Quick', 'Grilling'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function GET() {
  // In production, this would fetch from your database
  return NextResponse.json(mockRecipes);
}

export async function POST(request: Request) {
  try {
    await request.json();
    // In production, this would save to your database
    return NextResponse.json({ message: 'Recipe created successfully' });
  } catch {
    return NextResponse.json({ message: 'Failed to create recipe' }, { status: 400 });
  }
} 