import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Parent from '@/models/Parent';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const parent = await Parent.findById(params.id)
      .populate('children', 'name rollNum');
    
    if (!parent) {
      return NextResponse.json({ message: 'No parent found' }, { status: 404 });
    }
    
    return NextResponse.json(parent);
  } catch (error) {
    console.error('Get parent error:', error);
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
    
    const result = await Parent.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: 'Parent not found' }, { status: 404 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Update parent error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Parent.findByIdAndDelete(params.id);
    
    if (!result) {
      return NextResponse.json({ message: 'Parent not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Parent deleted successfully' });
  } catch (error) {
    console.error('Delete parent error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

