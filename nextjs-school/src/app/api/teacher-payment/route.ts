import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TeacherPayment from '@/models/TeacherPayment';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const payment = new TeacherPayment({
      ...body,
      school: body.adminID,
    });
    
    const result = await payment.save();
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Teacher payment creation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

