import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Teacher from '@/models/Teacher';
// Import models for populate to work correctly
import '@/models/Admin';
import '@/models/Subject';
import '@/models/Sclass';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const teacher = await Teacher.findById(params.id)
      .populate('teachSubject', 'subName subCode')
      .populate('teachSclass', 'sclassName')
      .populate('school', 'schoolName');
    
    if (!teacher) {
      return NextResponse.json({ message: 'No teacher found' }, { status: 404 });
    }

    const { password: _, ...teacherResponse } = teacher.toObject();
    
    return NextResponse.json(teacherResponse);
  } catch (error) {
    console.error('Get teacher error:', error);
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
    
    const result = await Teacher.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
    }

    const { password: _pwd, ...teacherResponse } = result.toObject();
    
    return NextResponse.json(teacherResponse);
  } catch (error) {
    console.error('Update teacher error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Teacher.findByIdAndDelete(params.id);
    
    if (!result) {
      return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Delete teacher error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

