import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const students = await Student.find({ school: params.id })
      .populate('sclassName', 'sclassName');
    
    if (!students || students.length === 0) {
      return NextResponse.json({ message: 'No students found' }, { status: 404 });
    }

    const studentsResponse = students.map(student => {
      const { password: _, ...obj } = student.toObject();
      return obj;
    });
    
    return NextResponse.json(studentsResponse);
  } catch (error) {
    console.error('Get students error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Student.deleteMany({ school: params.id });
    
    return NextResponse.json({ 
      message: `${result.deletedCount} students deleted successfully` 
    });
  } catch (error) {
    console.error('Delete students error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

