import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Parent from '@/models/Parent';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const parents = await Parent.find({ school: params.id })
      .populate('children', 'name rollNum');
    
    if (!parents || parents.length === 0) {
      return NextResponse.json({ message: 'No parents found' }, { status: 404 });
    }
    
    return NextResponse.json(parents);
  } catch (error) {
    console.error('Get parents error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Parent.deleteMany({ school: params.id });
    
    return NextResponse.json({ 
      message: `${result.deletedCount} parents deleted successfully` 
    });
  } catch (error) {
    console.error('Delete parents error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

