import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (password !== admin.password) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    const { password: _, ...adminResponse } = admin.toObject();
    
    return NextResponse.json(adminResponse);
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

