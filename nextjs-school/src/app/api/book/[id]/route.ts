import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Book from '@/models/Book';
// Import models for populate to work correctly
import '@/models/Student';
import '@/models/Admin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const book = await Book.findById(params.id)
      .populate('borrower', 'name');
    
    if (!book) {
      return NextResponse.json({ message: 'No book found' }, { status: 404 });
    }
    
    return NextResponse.json(book);
  } catch (error) {
    console.error('Get book error:', error);
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
    
    const result = await Book.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Update book error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Book.findByIdAndDelete(params.id);
    
    if (!result) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

