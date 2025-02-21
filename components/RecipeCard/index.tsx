import { Card, Image, Text, Badge, Group, Stack, Button, Rating } from '@mantine/core';
import { Clock, Users } from 'lucide-react';
import Link from 'next/link';
import type { Recipe } from '../../app/types/recipe';
import { formatTime } from '../../app/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
      <Stack h="100%" justify="space-between">
        <Stack gap="xs">
          <Card.Section>
            <Image
              src={recipe.image}
              height={160}
              alt={recipe.title}
              fallbackSrc="/images/recipe-placeholder.svg"
            />
          </Card.Section>

          <Group justify="space-between" align="center" wrap="nowrap">
            <Text fw={500} size="lg" lineClamp={2}>
              {recipe.title}
            </Text>
            <Group gap={4} wrap="nowrap">
              <Rating value={recipe.rating || 0} fractions={2} readOnly size="sm" />
              {recipe.rating && (
                <Text size="sm" c="dimmed">
                  ({recipe.rating.toFixed(1)})
                </Text>
              )}
            </Group>
          </Group>

          <Text size="sm" c="dimmed" lineClamp={2}>
            {recipe.description}
          </Text>

          <Group gap="xs" wrap="wrap">
            {recipe.tags?.map((tag) => (
              <Badge key={tag} color="icon" size="sm">
                {tag}
              </Badge>
            ))}
          </Group>

          <Stack gap="xs">
            <Group gap="lg">
              <Group gap="xs">
                <Clock size={16} />
                <Text size="sm" c="dimmed">
                  Prep: {formatTime(recipe.prepTime)}
                </Text>
              </Group>
              <Group gap="xs">
                <Clock size={16} />
                <Text size="sm" c="dimmed">
                  Cook: {formatTime(recipe.cookTime)}
                </Text>
              </Group>
            </Group>
            <Group gap="xs">
              <Users size={16} />
              <Text size="sm" c="dimmed">
                Serves {recipe.servings}
              </Text>
            </Group>
          </Stack>
        </Stack>

        <Button
          component={Link}
          href={`/recipes/${recipe.id}`}
          color="icon"
          fullWidth
          radius="md"
        >
          More Details
        </Button>
      </Stack>
    </Card>
  );
} 