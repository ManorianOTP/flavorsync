'use client';

import RecipeDetails from './RecipeDetails';

export default function RecipePage({ params }: { params: { id: string } }) {
  return <RecipeDetails id={params.id} />;
} 