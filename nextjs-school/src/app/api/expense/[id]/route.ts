import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Expense from '@/models/Expense';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const expense = await Expense.findById(params.id);
    
    if (!expense) {
      return NextResponse.json({ message: 'No expense found' }, { status: 404 });
    }
    
    return NextResponse.json(expense);
  } catch (error) {
    console.error('Get expense error:', error);
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
    
    const result = await Expense.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: 'Expense not found' }, { status: 404 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Update expense error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Expense.findByIdAndDelete(params.id);
    
    if (!result) {
      return NextResponse.json({ message: 'Expense not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

