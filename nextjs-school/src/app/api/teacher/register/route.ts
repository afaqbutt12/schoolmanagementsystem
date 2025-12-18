import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Teacher from '@/models/Teacher';
import Subject from '@/models/Subject';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const existingTeacher = await Teacher.findOne({ email: body.email });

    if (existingTeacher) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    const teacher = new Teacher({
      ...body,
      school: body.adminID,
    });
    
    const result = await teacher.save();
    
    // Update the subject with teacher reference
    if (body.teachSubject) {
      await Subject.findByIdAndUpdate(body.teachSubject, { teacher: teacher._id });
    }
    
    const { password: _, ...teacherResponse } = result.toObject();
    
    return NextResponse.json(teacherResponse, { status: 201 });
  } catch (error) {
    console.error('Teacher registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

