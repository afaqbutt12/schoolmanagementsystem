import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Fee from '@/models/Fee';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const fee = new Fee({
      ...body,
      school: body.adminID,
    });
    
    const result = await fee.save();
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Fee creation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

