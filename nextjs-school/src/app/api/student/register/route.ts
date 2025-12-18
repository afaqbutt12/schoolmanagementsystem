import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const existingStudent = await Student.findOne({
      rollNum: body.rollNum,
      school: body.adminID,
      sclassName: body.sclassName,
    });

    if (existingStudent) {
      return NextResponse.json({ message: 'Roll Number already exists' }, { status: 400 });
    }

    const student = new Student({
      ...body,
      school: body.adminID,
    });
    
    const result = await student.save();
    
    const studentResponse = result.toObject();
    delete studentResponse.password;
    
    return NextResponse.json(studentResponse, { status: 201 });
  } catch (error) {
    console.error('Student registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

