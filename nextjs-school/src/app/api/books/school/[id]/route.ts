import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Book from '@/models/Book';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const books = await Book.find({ school: params.id })
      .populate('borrower', 'name');
    
    if (!books || books.length === 0) {
      return NextResponse.json({ message: 'No books found' }, { status: 404 });
    }
    
    return NextResponse.json(books);
  } catch (error) {
    console.error('Get books error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Book.deleteMany({ school: params.id });
    
    return NextResponse.json({ 
      message: `${result.deletedCount} books deleted successfully` 
    });
  } catch (error) {
    console.error('Delete books error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

