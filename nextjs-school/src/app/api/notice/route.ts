import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Notice from '@/models/Notice';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const notice = new Notice({
      ...body,
      school: body.adminID,
    });
    
    const result = await notice.save();
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Notice creation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

