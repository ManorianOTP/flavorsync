import { NextResponse } from 'next/server';
import { registerUser } from '../[...nextauth]/route';
import { z } from 'zod';

const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Register attempt for:', body.email);
    
    const { email, password } = RegisterSchema.parse(body);
    
    try {
      const user = await registerUser(email, password);
      console.log('Registration successful:', user);
      return NextResponse.json(user);
    } catch (error) {
      console.error('Registration failed:', error);
      if (error instanceof Error && error.message === 'User already exists') {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 409 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
} 