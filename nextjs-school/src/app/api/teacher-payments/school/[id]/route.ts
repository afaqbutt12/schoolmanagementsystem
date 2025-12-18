import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TeacherPayment from '@/models/TeacherPayment';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const payments = await TeacherPayment.find({ school: params.id })
      .populate('teacher', 'name');
    
    if (!payments || payments.length === 0) {
      return NextResponse.json({ message: 'No payments found' }, { status: 404 });
    }
    
    return NextResponse.json(payments);
  } catch (error) {
    console.error('Get payments error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await TeacherPayment.deleteMany({ school: params.id });
    
    return NextResponse.json({ 
      message: `${result.deletedCount} payments deleted successfully` 
    });
  } catch (error) {
    console.error('Delete payments error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

