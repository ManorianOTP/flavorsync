'use client';

import { Grid, Title, Text, Skeleton, Group, Button, Container } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RecipeCard } from '../../components/RecipeCard';
import type { Recipe } from '../types/recipe';

export default function DashboardPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load recipes');
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  if (error) {
    return (
      <Container py="xl">
        <Text c="red">{error}</Text>
      </Container>
    );
  }

  return (
    <>
      <Container py="xl">
        <Group justify="space-between" align="center" mb="xl">
          <Title order={1}>My Recipes</Title>
          <Button
            leftSection={<Plus size={20} />}
            onClick={() => router.push('/recipes/new')}
            radius="md"
            color="icon"
          >
            Create Recipe
          </Button>
        </Group>
      </Container>

      {recipes.length === 0 && !loading ? (
        <Container>
          <Text ta="center" c="dimmed">
            No recipes found. Start by adding your first recipe!
          </Text>
        </Container>
      ) : (
        <Grid m={5} gutter="xs">
          {loading ? (
            <>
              {[1, 2, 3, 4].map((n) => (
                <Grid.Col key={n} span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2, xxl: 1.5 }}>
                  <Skeleton height={420} radius="md" />
                </Grid.Col>
              ))}
            </>
          ) : (
            <>
              {recipes.map(recipe => (
                <Grid.Col key={recipe.id} span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2, xxl: 1.5 }}>
                  <RecipeCard recipe={recipe} />
                </Grid.Col>
              ))}
            </>
          )}
        </Grid>
      )}
    </>
  );
} 