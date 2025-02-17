'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { HeroHeader } from './HeroHeader';

export function HeaderWrapper() {
  const pathname = usePathname();
  const simplePaths = ['/', '/login', '/register'];
  const shouldUseSimpleHeader = simplePaths.includes(pathname);
  
  return shouldUseSimpleHeader ? <HeroHeader /> : <Header />;
} 