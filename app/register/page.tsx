'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Paper, TextInput, PasswordInput, Button, Title, Text, Anchor, Stack } from '@mantine/core';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';
import classes from './register.module.css';
import { z } from 'zod';

const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate the form data
      RegisterSchema.parse({ email, password, confirmPassword });

      // Make API call to register the user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }

      notifications.show({
        title: 'Success',
        message: 'Registration successful! Please log in.',
        color: 'green',
      });

      router.push('/login');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        notifications.show({
          title: 'Validation Error',
          message: firstError.message,
          color: 'red',
        });
      } else {
        notifications.show({
          title: 'Error',
          message: error instanceof Error ? error.message : 'Something went wrong during registration',
          color: 'red',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xs" className={classes.container}>
      <Paper radius="md" p="xl" withBorder className={classes.form}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Create your FlavorSync account
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              radius="md"
              required
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              radius="md"
              required
            />

            <Button 
              type="submit" 
              radius="xl" 
              color="icon"
              loading={loading}
            >
              Create account
            </Button>
          </Stack>
        </form>

        <Text ta="center" mt="md">
          Already have an account?{' '}
          <Anchor component={Link} href="/login" fw={700} c="icon">
            Sign in
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
} 