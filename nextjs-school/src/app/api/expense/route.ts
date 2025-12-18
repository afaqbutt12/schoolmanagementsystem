import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Expense from '@/models/Expense';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const expense = new Expense({
      ...body,
      school: body.adminID,
    });
    
    const result = await expense.save();
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Expense creation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

