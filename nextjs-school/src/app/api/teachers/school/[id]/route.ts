import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Teacher from '@/models/Teacher';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const teachers = await Teacher.find({ school: params.id })
      .populate('teachSubject', 'subName')
      .populate('teachSclass', 'sclassName');
    
    if (!teachers || teachers.length === 0) {
      return NextResponse.json({ message: 'No teachers found' }, { status: 404 });
    }

    const teachersResponse = teachers.map(teacher => {
      const { password: _, ...obj } = teacher.toObject();
      return obj;
    });
    
    return NextResponse.json(teachersResponse);
  } catch (error) {
    console.error('Get teachers error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Teacher.deleteMany({ school: params.id });
    
    return NextResponse.json({ 
      message: `${result.deletedCount} teachers deleted successfully` 
    });
  } catch (error) {
    console.error('Delete teachers error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

