'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Image,
  Title,
  Text,
  Group,
  Stack,
  Button,
  Checkbox,
  Divider,
  Rating,
  Badge,
  Skeleton,
  Paper,
  Box,
  rem,
} from '@mantine/core';
import { ArrowLeft, Heart } from 'lucide-react';
import type { Recipe } from '../../types/recipe';
import { RecipeInfoCards } from '../../../components/Recipe/RecipeInfoCards';

interface RecipeDetailsProps {
  id: string;
}

export default function RecipeDetails({ id }: RecipeDetailsProps) {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>([]);

  const fetchRecipe = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/recipes/${id}`);
      if (!response.ok) {
        throw new Error(
          response.status === 404 
            ? 'Recipe not found' 
            : 'Failed to fetch recipe'
        );
      }
      const data = await response.json();
      setRecipe(data);
      setCheckedIngredients(new Array(data.ingredients.length).fill(false));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load recipe');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients(prev => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Button
          variant="subtle"
          color="gray"
          leftSection={<ArrowLeft size={16} />}
          onClick={() => router.back()}
          mb="xl"
        >
          Back to recipes
        </Button>
        <Paper radius="md" p="xl" withBorder>
          <Text c="red" ta="center" size="lg">{error}</Text>
        </Paper>
      </Container>
    );
  }

  if (loading || !recipe) {
    return (
      <Container size="lg" py="xl">
        <Stack>
          <Skeleton height={400} radius="md" />
          <Skeleton height={50} radius="md" />
          <Skeleton height={100} radius="md" />
          <Skeleton height={200} radius="md" />
        </Stack>
      </Container>
    );
  }

  return (
    <Box>
      {/* Back Button (Desktop Only) */}
      <Box
        display={{ base: 'none', md: 'block' }}
        mb="xl"
      >
        <Container size="lg">
          <Button
            variant="subtle"
            color="gray"
            leftSection={<ArrowLeft size={16} />}
            onClick={() => router.back()}
          >
            Back to recipes
          </Button>
        </Container>
      </Box>

      {/* Main Content */}
      <Container 
        size="lg" 
        pt={{ base: "var(--mantine-header-height)", md: 0 }} 
        pb="xl" 
        px={0}
        styles={(theme) => ({
          root: {
            maxWidth: '100%',
            [`@media (minWidth: ${theme.breakpoints.md})`]: {
              maxWidth: 'var(--container-size)',
              padding: `0 var(--mantine-spacing-md)`,
              margin: '0 auto',
            },
          },
        })}
      >
        <Image
          src={recipe.image}
          h={{ base: 300, md: 400 }}
          alt={recipe.title}
          radius={0}
          fallbackSrc="/images/recipe-placeholder.svg"
          styles={(theme) => ({
            root: {
              width: '100vw',
              maxWidth: '100vw',
              marginBottom: theme.spacing.xl,
              [`@media (minWidth: ${theme.breakpoints.md})`]: {
                width: '100%',
                maxWidth: '100%',
                borderRadius: theme.radius.md,
              },
            },
            imageWrapper: {
              width: '100vw',
              [`@media (minWidth: ${theme.breakpoints.md})`]: {
                width: '100%',
              },
            },
          })}
        />

        <Paper 
          radius={0}
          p={{ base: 0, md: rem(16) }}
          withBorder={false}
          bg={{ base: "var(--mantine-color-dark-7)", md: "var(--mantine-color-body)" }}
          styles={(theme) => ({
            root: {
              [`@media (minWidth: ${theme.breakpoints.md})`]: {
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.gray[3]}`,
              },
            },
          })}
        >
          <Stack gap="xl">
            <Stack gap="md" px={{ base: 'md', md: 0 }}>
              <Title order={1} size="h1">
                {recipe.title}
              </Title>

              {recipe.rating !== undefined && (
                <Group gap="xs">
                  <Rating value={recipe.rating} fractions={2} readOnly />
                  <Text size="sm" c="dimmed">({recipe.rating})</Text>
                </Group>
              )}

              <Button
                variant="light"
                color="pink"
                radius="md"
                leftSection={<Heart size={16} />}
                w={{ base: '100%', sm: 'auto' }}
              >
                Save Recipe
              </Button>

              <Text size="lg" c="dimmed">
                {recipe.description}
              </Text>

              {recipe.tags && recipe.tags.length > 0 && (
                <Group gap="xs" wrap="wrap">
                  {recipe.tags.map((tag: string) => (
                    <Badge key={tag} color="icon" size="lg">
                      {tag}
                    </Badge>
                  ))}
                </Group>
              )}

              <RecipeInfoCards
                prepTime={recipe.prepTime}
                cookTime={recipe.cookTime}
                servings={recipe.servings}
              />
            </Stack>

            <Divider mx={{ base: 'md', md: 0 }} />

            <Stack gap="md" px={{ base: 'md', md: 0 }}>
              <Title order={2} size="h2" mb="md">
                Ingredients
              </Title>
              <Stack gap="xs">
                {recipe.ingredients.map((ingredient: string, index: number) => (
                  <Group key={index} gap="xs" wrap="nowrap">
                    <Checkbox
                      color="icon"
                      checked={checkedIngredients[index]}
                      onChange={() => toggleIngredient(index)}
                    />
                    <Text
                      style={{
                        textDecoration: checkedIngredients[index] ? 'line-through' : 'none',
                        color: checkedIngredients[index] ? 'var(--mantine-color-dimmed)' : 'inherit',
                      }}
                    >
                      {ingredient}
                    </Text>
                  </Group>
                ))}
              </Stack>
            </Stack>

            <Divider mx={{ base: 'md', md: 0 }} />

            <Stack gap="md" px={{ base: 'md', md: 0 }}>
              <Title order={2} size="h2" mb="md">
                Method
              </Title>
              <Stack gap="lg">
                {recipe.method.map((step: string, index: number) => (
                  <Stack key={index} gap="xs">
                    <Text fw={500} size="xl">
                      Step {index + 1}
                    </Text>
                    <Text size="md">
                      {step}
                    </Text>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
} 