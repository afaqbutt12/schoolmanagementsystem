import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Teacher from '@/models/Teacher';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const teacher = await Teacher.findOne({ email });
    
    if (!teacher) {
      return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
    }

    if (password !== teacher.password) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    const { password: _, ...teacherResponse } = teacher.toObject();
    
    return NextResponse.json(teacherResponse);
  } catch (error) {
    console.error('Teacher login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

