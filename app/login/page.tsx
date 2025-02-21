'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, Paper, TextInput, PasswordInput, Button, Title, Text, Anchor, Stack } from '@mantine/core';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';
import classes from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/dashboard',
      });

      if (result?.error) {
        notifications.show({
          title: 'Error',
          message: 'Invalid email or password. Please try again.',
          color: 'red',
        });
        return;
      }

      notifications.show({
        title: 'Success',
        message: 'Successfully logged in',
        color: 'green',
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      notifications.show({
        title: 'Error',
        message: 'An unexpected error occurred. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xs" className={classes.container}>
      <Paper radius="md" p="xl" withBorder className={classes.form}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to FlavorSync
        </Title>

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="hello@flavorsync.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              radius="md"
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              radius="md"
              required
            />

            <Button 
              type="submit" 
              radius="xl" 
              color="icon"
              loading={loading}
            >
              Sign in
            </Button>
          </Stack>
        </form>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor component={Link} href="/register" fw={700} c="icon">
            Register
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
} 