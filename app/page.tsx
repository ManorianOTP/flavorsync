import { Container, Title, Text, Button, Group } from '@mantine/core';
import Link from 'next/link';
import classes from './page.module.css';

export default function Home() {
  return (
    <div className={classes.hero}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Your Personal{' '}
              <Text component="span" className={classes.highlight} inherit>
                Recipe Hub
              </Text>
            </Title>
            
            <Text className={classes.description} mt={30}>
              Discover, organize, and share your favorite recipes with FlavorSync. 
              Join our community of food lovers and start your culinary journey today.
            </Text>

            <Group mt={40}>
              <Button
                size="lg"
                className={classes.control}
                component={Link}
                href="/register"
                variant="filled"
                color="icon"
              >
                Get Started
              </Button>
              
              <Button
                size="lg"
                className={classes.control}
                component={Link}
                href="/recipes"
                variant="outline"
                color="icon"
              >
                Browse Recipes
              </Button>
            </Group>

            <Text mt={30} size="sm" c="dimmed">
              No credit card required. Start for free.
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
}
