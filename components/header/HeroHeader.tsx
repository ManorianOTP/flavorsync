'use client';

import Link from 'next/link';
import { 
  Container,
  Group, 
  Text, 
  Button,
  Burger,
  Drawer,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';

export function HeroHeader() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <header className={classes.header}>
      <Container size="lg" className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="icon" />
          <Link href="/" className={classes.logoLink}>
            <div className={classes.logoIcon}>
              <Image src="/logo.svg" alt="FlavorSync Logo" width={40} height={40} priority />
            </div>
            <Text size="lg" fw={700} className={classes.logoText}>
              FlavorSync
            </Text>
          </Link>
        </Group>

        <Group gap={5} visibleFrom="sm">
          <ThemeToggle />
          <Button component={Link} href="/login" variant="subtle" color="icon">
            Sign in
          </Button>
        </Group>

        <Drawer
          opened={opened}
          onClose={toggle}
          size="100%"
          padding="md"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <Stack>
            <Group justify="space-between" align="center">
              <Text size="sm">Dark mode</Text>
              <ThemeToggle />
            </Group>
            <Button component={Link} href="/login" variant="subtle" color="icon" onClick={toggle}>
              Sign in
            </Button>
          </Stack>
        </Drawer>
      </Container>
    </header>
  );
} 