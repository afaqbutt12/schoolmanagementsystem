import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Fee from '@/models/Fee';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const fee = await Fee.findById(params.id)
      .populate('student', 'name');
    
    if (!fee) {
      return NextResponse.json({ message: 'No fee found' }, { status: 404 });
    }
    
    return NextResponse.json(fee);
  } catch (error) {
    console.error('Get fee error:', error);
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
    
    const result = await Fee.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: 'Fee not found' }, { status: 404 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Update fee error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Fee.findByIdAndDelete(params.id);
    
    if (!result) {
      return NextResponse.json({ message: 'Fee not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Fee deleted successfully' });
  } catch (error) {
    console.error('Delete fee error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

