import { Paper, Text, Stack, Divider, Flex } from '@mantine/core';
import { Clock, Users } from 'lucide-react';

interface RecipeInfoCardsProps {
  prepTime: number;
  cookTime: number;
  servings: string;
}

export function RecipeInfoCards({ prepTime, cookTime, servings }: RecipeInfoCardsProps) {
  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours}h ${remainingMinutes}m` 
      : `${hours}h`;
  };

  return (
    <Paper withBorder p="md" radius="md">
      <Flex align="center" gap={0}>
        <Flex w="33%" justify="center">
          <Stack align="center" gap="xs">
            <Clock size={24} />
            <Stack gap={0} align="center">
              <Text size="sm" fw={500}>Prep Time</Text>
              <Text size="sm" c="dimmed">{formatTime(prepTime)}</Text>
            </Stack>
          </Stack>
        </Flex>

        <Divider orientation="vertical" h={75} />

        <Flex w="33%" justify="center">
          <Stack align="center" gap="xs">
            <Clock size={24} />
            <Stack gap={0} align="center">
              <Text size="sm" fw={500}>Cook Time</Text>
              <Text size="sm" c="dimmed">{formatTime(cookTime)}</Text>
            </Stack>
          </Stack>
        </Flex>

        <Divider orientation="vertical" h={75} />

        <Flex w="33%" justify="center">
          <Stack align="center" gap="xs">
            <Users size={24} />
            <Stack gap={0} align="center">
              <Text size="sm" fw={500}>Servings</Text>
              <Text size="sm" c="dimmed">{servings}</Text>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </Paper>
  );
} 