import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Expense from '@/models/Expense';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const expenses = await Expense.find({ school: params.id });
    
    if (!expenses || expenses.length === 0) {
      return NextResponse.json({ message: 'No expenses found' }, { status: 404 });
    }
    
    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Expense.deleteMany({ school: params.id });
    
    return NextResponse.json({ 
      message: `${result.deletedCount} expenses deleted successfully` 
    });
  } catch (error) {
    console.error('Delete expenses error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

