import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Sclass from '@/models/Sclass';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const classes = await Sclass.find({ school: params.id });
    
    if (!classes || classes.length === 0) {
      return NextResponse.json({ message: 'No classes found' }, { status: 404 });
    }
    
    return NextResponse.json(classes);
  } catch (error) {
    console.error('Get classes error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Sclass.deleteMany({ school: params.id });
    
    return NextResponse.json({ 
      message: `${result.deletedCount} classes deleted successfully` 
    });
  } catch (error) {
    console.error('Delete classes error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

