import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { rollNum, studentName, password } = await request.json();

    if (!rollNum || !studentName || !password) {
      return NextResponse.json({ message: 'Roll number, name and password are required' }, { status: 400 });
    }

    const student = await Student.findOne({ rollNum, name: studentName });
    
    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    if (password !== student.password) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    const studentResponse = student.toObject();
    delete studentResponse.password;
    
    return NextResponse.json(studentResponse);
  } catch (error) {
    console.error('Student login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

