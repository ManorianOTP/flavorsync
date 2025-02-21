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
  ActionIcon,
  TextInput,
  Avatar,
  Flex,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSession, signOut } from 'next-auth/react';
import { Download, Plus } from 'lucide-react';
import classes from './Header.module.css';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import Image from 'next/image';
import { useState } from 'react';

export function Header() {
  const [opened, { toggle }] = useDisclosure();
  const { data: session } = useSession();
  const [isAnimating, setIsAnimating] = useState(false);

  // Generate initials from email for mobile view
  const initials = session?.user?.email
    ?.split('@')[0]
    .split('.')
    .map(part => part[0]?.toUpperCase())
    .join('');

  const handlePlusClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const rightSection = (
    <Group gap={2}>
      <ActionIcon 
        variant="subtle" 
        color="icon" 
        size="md" 
        radius='xl'
        className={classes.scrapeButton}
      >
        <Download size={16} />
      </ActionIcon>
      <Divider orientation="vertical" />
      <div style={{ position: 'relative', width: '32px' }}>
        <div className={classes.rightSectionWrapper}>
          <div className={`${classes.fillAnimation} ${isAnimating ? classes.active : ''}`} />
        </div>
        <ActionIcon 
          component={Link}
          href="/recipes/new"
          variant="subtle" 
          color="icon" 
          size="md" 
          radius='xl'
          className={`${classes.plusButton} ${isAnimating ? classes.animating : ''}`}
          onClick={handlePlusClick}
        >
          <Plus size={16} />
        </ActionIcon>
      </div>
    </Group>
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
          placeholder="Add a Recipe"
          rightSection={rightSection}
          rightSectionWidth={70}
        />

        <Group gap={5} visibleFrom="sm">
          <Link href="/recipes" className={classes.link}>
            Recipes
          </Link>
          <Link href="/collections" className={classes.link}>
            Collections
          </Link>
          <ThemeToggle />
          {session?.user ? (
            <UserMenu />
          ) : (
            <Button component={Link} href="/login" variant="subtle" color="icon">
              Sign in
            </Button>
          )}
        </Group>

        <Drawer
          opened={opened}
          onClose={toggle}
          size="100%"
          padding="md"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <Stack h="100%" justify="space-between">
            <Stack>
              {session?.user && (
                <Flex justify="space-between" align="center" mb="sm">
                  <Group gap="xs">
                    <Avatar size={34} radius="xl" color="icon">
                      {initials}
                    </Avatar>
                    <Text size="sm" fw={500} lineClamp={1}>
                      {session.user.email}
                    </Text>
                  </Group>
                </Flex>
              )}
              
              <TextInput
                placeholder="Add a Recipe"
                rightSection={rightSection}
                rightSectionWidth={70}
              />
              <Link href="/recipes" className={classes.link} onClick={toggle}>
                Recipes
              </Link>
              <Link href="/collections" className={classes.link} onClick={toggle}>
                Collections
              </Link>
              {session?.user && (
                <Link href="/profile" className={classes.link} onClick={toggle}>
                  Profile
                </Link>
              )}
              <Group justify="space-between" align="center">
                <Text size="sm">Dark mode</Text>
                <ThemeToggle />
              </Group>
            </Stack>

            {session?.user ? (
              <Button 
                variant="subtle" 
                color="red" 
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  toggle();
                }}
                fullWidth
              >
                Sign out
              </Button>
            ) : (
              <Button 
                component={Link} 
                href="/login" 
                variant="subtle" 
                color="icon" 
                onClick={toggle}
                fullWidth
              >
                Sign in
              </Button>
            )}
          </Stack>
        </Drawer>
      </Container>
    </header>
  );
} 