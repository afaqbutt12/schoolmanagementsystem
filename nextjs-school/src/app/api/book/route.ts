import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Book from '@/models/Book';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const book = new Book({
      ...body,
      school: body.adminID,
    });
    
    const result = await book.save();
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Book creation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

