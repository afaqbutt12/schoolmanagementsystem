import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const student = await Student.findById(params.id)
      .populate('sclassName', 'sclassName')
      .populate('school', 'schoolName')
      .populate('examResult.subName', 'subName')
      .populate('attendance.subName', 'subName sessions');
    
    if (!student) {
      return NextResponse.json({ message: 'No student found' }, { status: 404 });
    }

    const { password: _, ...studentResponse } = student.toObject();
    
    return NextResponse.json(studentResponse);
  } catch (error) {
    console.error('Get student error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const result = await Student.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    const { password: _pwd, ...studentResponse } = result.toObject();
    
    return NextResponse.json(studentResponse);
  } catch (error) {
    console.error('Update student error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Student.findByIdAndDelete(params.id);
    
    if (!result) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete student error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

