'use client';

import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import classes from './Header.module.css';
import { SunIcon, MoonIcon } from './icons';

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const toggleColorScheme = () => 
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');

  return (
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
} 