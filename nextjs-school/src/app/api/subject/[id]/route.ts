import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subject from '@/models/Subject';
// Import models for populate to work correctly
import '@/models/Sclass';
import '@/models/Teacher';
import '@/models/Admin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const subject = await Subject.findById(params.id)
      .populate('sclassName', 'sclassName')
      .populate('teacher', 'name email')
      .populate('school', 'schoolName');
    
    if (!subject) {
      return NextResponse.json({ message: 'No subject found' }, { status: 404 });
    }
    
    return NextResponse.json(subject);
  } catch (error) {
    console.error('Get subject error:', error);
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
    
    const result = await Subject.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: 'Subject not found' }, { status: 404 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Update subject error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Subject.findByIdAndDelete(params.id);
    
    if (!result) {
      return NextResponse.json({ message: 'Subject not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Delete subject error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

