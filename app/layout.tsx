import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { Inter } from 'next/font/google';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { Providers } from './providers';
import { Header } from '@/components/header/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: {
    template: '%s | FlavorSync',
    default: 'FlavorSync - Your Recipe Hub',
  },
  description: 'Discover, share, and organize your favorite recipes with FlavorSync. Join our community of food lovers and start your culinary journey today.',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
    other: {
      rel: 'apple-touch-icon',
      url: '/logo.svg',
    },
  },
  manifest: '/manifest.json',
  keywords: ['recipes', 'cooking', 'food', 'recipe sharing', 'recipe organization', 'culinary', 'cooking app'],
  authors: [{ name: 'FlavorSync Team' }],
  creator: 'FlavorSync',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flavorsync.app', // TODO: change to the actual URL
    title: 'FlavorSync - Your Recipe Hub',
    description: 'Discover, share, and organize your favorite recipes with FlavorSync. Join our community of food lovers and start your culinary journey today.',
    siteName: 'FlavorSync',
    images: [
      {
        url: '/logo.svg',
        width: 40,
        height: 40,
        alt: 'FlavorSync Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
