'use client';

import { createTheme, virtualColor } from '@mantine/core';

export const theme = createTheme({
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
  
  colors: {
    icon: virtualColor({
      name: 'icon',
      dark: 'yellow',
      light: 'blue',
    }),
  },
}); 