import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Parent from '@/models/Parent';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const parent = new Parent({
      ...body,
      school: body.adminID,
    });
    
    const result = await parent.save();
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Parent creation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

