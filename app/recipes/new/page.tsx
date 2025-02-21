'use client';

import { useState } from 'react';
import { Container, Button, Paper, Stack, Title, TextInput, Textarea, NumberInput, Group, Image, FileInput, Rating, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload } from 'lucide-react';
import type { Recipe } from '../../types/recipe';

export default function NewRecipePage() {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Partial<Recipe>>({
    title: '',
    description: '',
    image: '/images/recipe-placeholder.svg',
    prepTime: 0,
    cookTime: 0,
    servings: '1',
    ingredients: [''],
    method: [''],
    tags: [],
    rating: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('/images/recipe-placeholder.svg');

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;
        setImagePreview(preview);
        setRecipe({ ...recipe, image: preview });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // For now, just console.log the recipe
    console.log('New Recipe:', recipe);
    if (imageFile) {
      console.log('Image File:', imageFile);
    }
  };

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Button
          variant="subtle"
          color="gray"
          leftSection={<ArrowLeft size={16} />}
          onClick={() => router.back()}
        >
          Back to recipes
        </Button>
        <Button
          color="icon"
          onClick={handleSave}
        >
          Save Recipe
        </Button>
      </Group>

      <Paper radius="md" p="xl" withBorder>
        <Stack gap="md">
          <Title order={2}>Recipe Details</Title>

          <Stack align="center" gap="sm">
            <Image
              src={imagePreview}
              alt="Recipe preview"
              radius="md"
              w={300}
              h={200}
              fit="cover"
            />
            <FileInput
              accept="image/*"
              label="Recipe Image"
              description="Upload an image of your recipe"
              placeholder="Click to upload"
              value={imageFile}
              onChange={handleImageChange}
              leftSection={<Upload size={16} />}
              style={{ width: '300px' }}
            />
          </Stack>
          
          <TextInput
            label="Title"
            placeholder="Enter recipe title"
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
          />

          <Stack gap="md">
            <Text size="sm" fw={500}>Rating</Text>
            <Group gap="xs">
              <Rating
                value={recipe.rating || 0}
                onChange={(value) => setRecipe({ ...recipe, rating: value })}
                fractions={2}
              />
              {(recipe.rating || 0) > 0 && (
                <Text size="sm" c="dimmed">({recipe.rating})</Text>
              )}
            </Group>
          </Stack>

          <Textarea
            label="Description"
            placeholder="Enter recipe description"
            value={recipe.description}
            onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
            minRows={3}
          />

          <Group grow>
            <NumberInput
              label="Prep Time"
              description="(minutes)"
              placeholder="Enter prep time"
              value={recipe.prepTime}
              onChange={(value) => setRecipe({ ...recipe, prepTime: typeof value === 'number' ? value : 0 })}
              min={0}
            />
            <NumberInput
              label="Cook Time"
              description="(minutes)"
              placeholder="Enter cook time"
              value={recipe.cookTime}
              onChange={(value) => setRecipe({ ...recipe, cookTime: typeof value === 'number' ? value : 0 })}
              min={0}
            />
            <Stack>
              <div/>
              <NumberInput
                label="Servings"
                placeholder="Enter number of servings"
                value={Number(recipe.servings)}
                onChange={(value) => setRecipe({ ...recipe, servings: String(value || 1) })}
                min={1}
              />
            </Stack>
          </Group>

          <Title order={3} mt="md">Ingredients</Title>
          {recipe.ingredients?.map((ingredient, index) => (
            <Group key={index}>
              <TextInput
                placeholder="Enter ingredient"
                value={ingredient}
                style={{ flex: 1 }}
                onChange={(e) => {
                  const newIngredients = [...(recipe.ingredients || [])];
                  newIngredients[index] = e.target.value;
                  setRecipe({ ...recipe, ingredients: newIngredients });
                }}
              />
              <Button
                variant="subtle"
                color="red"
                onClick={() => {
                  const newIngredients = recipe.ingredients?.filter((_, i) => i !== index);
                  setRecipe({ ...recipe, ingredients: newIngredients });
                }}
              >
                Remove
              </Button>
            </Group>
          ))}
          <Button
            variant="light"
            onClick={() => {
              const newIngredients = [...(recipe.ingredients || []), ''];
              setRecipe({ ...recipe, ingredients: newIngredients });
            }}
          >
            Add Ingredient
          </Button>

          <Title order={3} mt="md">Method</Title>
          {recipe.method?.map((step, index) => (
            <Group key={index}>
              <TextInput
                placeholder={`Step ${index + 1}`}
                value={step}
                style={{ flex: 1 }}
                onChange={(e) => {
                  const newMethod = [...(recipe.method || [])];
                  newMethod[index] = e.target.value;
                  setRecipe({ ...recipe, method: newMethod });
                }}
              />
              <Button
                variant="subtle"
                color="red"
                onClick={() => {
                  const newMethod = recipe.method?.filter((_, i) => i !== index);
                  setRecipe({ ...recipe, method: newMethod });
                }}
              >
                Remove
              </Button>
            </Group>
          ))}
          <Button
            variant="light"
            onClick={() => {
              const newMethod = [...(recipe.method || []), ''];
              setRecipe({ ...recipe, method: newMethod });
            }}
          >
            Add Step
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
} 