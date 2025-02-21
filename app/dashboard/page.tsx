'use client';

import {
  Grid,
  Title,
  Text,
  Skeleton,
  Group,
  Container,
  TextInput,
  Select,
  MultiSelect,
  RangeSlider,
  Stack,
  Paper,
  Button,
  Collapse,
  ActionIcon,
  NumberInput,
} from '@mantine/core';
import { useEffect, useState, useMemo } from 'react';
import { RecipeCard } from '../../components/RecipeCard';
import type { Recipe } from '../types/recipe';
import { Search, ChevronDown, ChevronUp, X, Star } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import { formatTime } from '../types/recipe';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'rating-high', label: 'Highest Rated' },
  { value: 'rating-low', label: 'Lowest Rated' },
];

const TAGS = [
  'Breakfast', 'Lunch', 'Dinner', 'Dessert',
  'Vegetarian', 'Vegan', 'Gluten-Free',
  'Quick & Easy', 'Meal Prep', 'Healthy',
  'Comfort Food', 'Baking', 'Grilling'
];

export default function DashboardPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtersOpen, { toggle: toggleFilters }] = useDisclosure(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [minRating, setMinRating] = useState<number | ''>(0);
  
  // Calculate max cooking time from recipes
  const maxCookingTime = useMemo(() => {
    if (recipes.length === 0) return 180; // Default max if no recipes
    return Math.max(
      ...recipes.map(recipe => (recipe.prepTime || 0) + (recipe.cookTime || 0))
    );
  }, [recipes]);

  // Round up to nearest hour for better UX
  const roundedMaxTime = useMemo(() => {
    const roundToHour = Math.ceil(maxCookingTime / 60) * 60;
    return Math.max(60, roundToHour); // Minimum 1 hour
  }, [maxCookingTime]);

  const [cookingTime, setCookingTime] = useState<[number, number]>([0, roundedMaxTime]);

  // Update cooking time range when maxCookingTime changes
  useEffect(() => {
    setCookingTime([0, roundedMaxTime]);
  }, [roundedMaxTime]);

  // Generate marks for the slider
  const timeMarks = useMemo(() => {
    const marks = [{ value: 0, label: '0m' }];
    
    // Add hour marks
    for (let i = 60; i <= roundedMaxTime; i += 60) {
      marks.push({
        value: i,
        label: `${i / 60}h`
      });
    }
    
    return marks;
  }, [roundedMaxTime]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load recipes');
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  // Filter and sort logic
  const filteredRecipes = useMemo(() => {
    return recipes
      .filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.description?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesTags = selectedTags.length === 0 ||
          selectedTags.every(tag => recipe.tags?.includes(tag));
        
        const matchesRating = minRating === '' || minRating === 0 ||
          (recipe.rating && recipe.rating >= minRating);
        
        const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
        const matchesCookingTime = totalTime >= cookingTime[0] && totalTime <= cookingTime[1];

        return matchesSearch && matchesTags && matchesRating && matchesCookingTime;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'name-asc':
            return a.title.localeCompare(b.title);
          case 'name-desc':
            return b.title.localeCompare(a.title);
          case 'rating-high':
            return (b.rating || 0) - (a.rating || 0);
          case 'rating-low':
            return (a.rating || 0) - (b.rating || 0);
          default:
            return 0;
        }
      });
  }, [recipes, searchQuery, selectedTags, sortBy, minRating, cookingTime]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSortBy('newest');
    setMinRating(0);
    setCookingTime([0, roundedMaxTime]);
  };

  if (error) {
    return (
      <Container py="xl">
        <Text c="red">{error}</Text>
      </Container>
    );
  }

  return (
    <>
      <Container py="xl">
        <Group justify="space-between" align="center" mb="md">
          <Title order={1}>My Recipes</Title>
          <Button
            variant="subtle"
            color="gray"
            onClick={toggleFilters}
            leftSection={filtersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          >
            Filters
          </Button>
        </Group>

        <Collapse in={filtersOpen}>
          <Paper withBorder p="md" radius="md" mb="xl">
            <Stack>
              <Group grow>
                <TextInput
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftSection={<Search size={16} />}
                  rightSection={
                    searchQuery && (
                      <ActionIcon size="sm" variant="subtle" onClick={() => setSearchQuery('')}>
                        <X size={16} />
                      </ActionIcon>
                    )
                  }
                />
                <Select
                  placeholder="Sort by"
                  data={SORT_OPTIONS}
                  value={sortBy}
                  onChange={(value) => setSortBy(value || 'newest')}
                />
              </Group>

              <Group grow>
                <MultiSelect
                  placeholder="Filter by tags"
                  data={TAGS}
                  value={selectedTags}
                  onChange={setSelectedTags}
                  searchable
                  clearable
                />
                <NumberInput
                  placeholder="Minimum rating"
                  value={minRating}
                  onChange={(val) => setMinRating(typeof val === 'number' ? val : 0)}
                  min={0}
                  max={5}
                  step={0.5}
                  clampBehavior="strict"
                  allowDecimal
                  allowNegative={false}
                  leftSection={<Star size={16} color="var(--mantine-color-yellow-5)" />}
                />
              </Group>

              <Stack gap="xs">
                <Group justify="space-between" align="center">
                  <Text size="sm" fw={500}>Total Time</Text>
                  <Text size="sm" c="dimmed">
                    {formatTime(cookingTime[0])} - {formatTime(cookingTime[1])}
                  </Text>
                </Group>
                <RangeSlider
                  value={cookingTime}
                  onChange={setCookingTime}
                  min={0}
                  max={roundedMaxTime}
                  step={5}
                  minRange={10}
                  marks={timeMarks}
                  label={formatTime}
                  labelTransitionProps={{
                    transition: 'fade',
                    duration: 150
                  }}
                />
              </Stack>

              <Group justify="flex-end">
                <Button variant="subtle" color="red" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Collapse>
      </Container>

      {filteredRecipes.length === 0 && !loading ? (
        <Container>
          <Text ta="center" c="dimmed">
            No recipes found. Try adjusting your filters or add your first recipe!
          </Text>
        </Container>
      ) : (
        <Grid m={5} gutter="xs">
          {loading ? (
            <>
              {[1, 2, 3, 4].map((n) => (
                <Grid.Col key={n} span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2, xxl: 1.5 }}>
                  <Skeleton height={420} radius="md" />
                </Grid.Col>
              ))}
            </>
          ) : (
            <>
              {filteredRecipes.map(recipe => (
                <Grid.Col key={recipe.id} span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2, xxl: 1.5 }}>
                  <RecipeCard recipe={recipe} />
                </Grid.Col>
              ))}
            </>
          )}
        </Grid>
      )}
    </>
  );
} 