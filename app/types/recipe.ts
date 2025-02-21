export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;  // in minutes
  cookTime: number;  // in minutes
  servings: string;
  ingredients: string[];
  method: string[];
  rating?: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 
    ? `${hours} hr ${remainingMinutes} min` 
    : `${hours} hr`;
} 