import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Fee from '@/models/Fee';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const fees = await Fee.find({ school: params.id })
      .populate('student', 'name');
    
    if (!fees || fees.length === 0) {
      return NextResponse.json({ message: 'No fees found' }, { status: 404 });
    }
    
    return NextResponse.json(fees);
  } catch (error) {
    console.error('Get fees error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Fee.deleteMany({ school: params.id });
    
    return NextResponse.json({ 
      message: `${result.deletedCount} fees deleted successfully` 
    });
  } catch (error) {
    console.error('Delete fees error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

