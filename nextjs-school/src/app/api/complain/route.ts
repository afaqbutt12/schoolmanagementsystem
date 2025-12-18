import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Complain from '@/models/Complain';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const complain = new Complain({
      ...body,
      school: body.adminID,
    });
    
    const result = await complain.save();
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Complain creation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

