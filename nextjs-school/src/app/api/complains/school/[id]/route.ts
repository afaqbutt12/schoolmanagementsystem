import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Complain from '@/models/Complain';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const complains = await Complain.find({ school: params.id })
      .populate('user', 'name');
    
    if (!complains || complains.length === 0) {
      return NextResponse.json({ message: 'No complains found' }, { status: 404 });
    }
    
    return NextResponse.json(complains);
  } catch (error) {
    console.error('Get complains error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

