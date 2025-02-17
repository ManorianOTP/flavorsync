import { Container, Title, Text, Button, Stack } from '@mantine/core';

export default function Home() {
  return (
    <Container size="lg" py="xl">
      <Stack align="center" gap="xl">
        <Title order={1}>Welcome to FlavorSync</Title>
        <Text size="lg" c="dimmed" ta="center">
          Your personal recipe hub for discovering, sharing, and organizing your favorite dishes.
        </Text>
        <Button size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
          Get Started
        </Button>
      </Stack>
    </Container>
  );
}
