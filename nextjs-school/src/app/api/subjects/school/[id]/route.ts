import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subject from '@/models/Subject';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const subjects = await Subject.find({ school: params.id })
      .populate('sclassName', 'sclassName')
      .populate('teacher', 'name');
    
    if (!subjects || subjects.length === 0) {
      return NextResponse.json({ message: 'No subjects found' }, { status: 404 });
    }
    
    return NextResponse.json(subjects);
  } catch (error) {
    console.error('Get subjects error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Subject.deleteMany({ school: params.id });
    
    return NextResponse.json({ 
      message: `${result.deletedCount} subjects deleted successfully` 
    });
  } catch (error) {
    console.error('Delete subjects error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

