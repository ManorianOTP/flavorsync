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
  useMantineColorScheme,
  ActionIcon,
  useComputedColorScheme,
  TextInput
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { SearchIcon, SunIcon, MoonIcon } from './icons';
import Image from 'next/image';

export function Header() {
  const [opened, { toggle }] = useDisclosure();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const toggleColorScheme = () => 
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');

  const searchButton = (
    <ActionIcon variant="subtle" color="icon" size="sm" radius='xl'>
      <SearchIcon />
    </ActionIcon>
  );

  const themeToggle = (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="subtle"
      color="icon"
      size="md"
      radius='xl'
      aria-label="Toggle color scheme"
      className={classes.themeToggle}
    >
      <div className={classes.themeToggleIcons}>
        <SunIcon />
        <MoonIcon />
      </div>
    </ActionIcon>
  );

  return (
    <header className={classes.header}>
      <Container size="lg" className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="icon" />
          <Group>
            <Link href="/" className={classes.logoLink}>
              <div className={classes.logoIcon}>
                <Image src="/logo.svg" alt="FlavorSync Logo" width={40} height={40} priority />
              </div>
              <Text size="lg" fw={700} className={classes.logoText}>
                FlavorSync
              </Text>
            </Link>
          </Group>
        </Group>

        <TextInput
          className={classes.search}
          placeholder="Search recipes..."
          rightSection={searchButton}
        />

        <Group gap={5} visibleFrom="sm">
          <Link href="/recipes" className={classes.link}>
            Recipes
          </Link>
          <Link href="/collections" className={classes.link}>
            Collections
          </Link>
          {themeToggle}
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
            <TextInput
              placeholder="Search recipes..."
              rightSection={searchButton}
            />
            <Link href="/recipes" className={classes.link} onClick={toggle}>
              Recipes
            </Link>
            <Link href="/collections" className={classes.link} onClick={toggle}>
              Collections
            </Link>
            <Group justify="space-between" align="center">
              <Text size="sm">Dark mode</Text>
              {themeToggle}
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