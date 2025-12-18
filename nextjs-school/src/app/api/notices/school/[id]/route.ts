import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Notice from '@/models/Notice';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const notices = await Notice.find({ school: params.id });
    
    if (!notices || notices.length === 0) {
      return NextResponse.json({ message: 'No notices found' }, { status: 404 });
    }
    
    return NextResponse.json(notices);
  } catch (error) {
    console.error('Get notices error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Notice.deleteMany({ school: params.id });
    
    return NextResponse.json({ 
      message: `${result.deletedCount} notices deleted successfully` 
    });
  } catch (error) {
    console.error('Delete notices error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

