import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Notice from '@/models/Notice';
import '@/models/Admin'; // Import Admin model for populate

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const notice = await Notice.findById(params.id)
      .populate('school', 'schoolName');

    if (!notice) {
      return NextResponse.json({ message: 'No notice found' }, { status: 404 });
    }

    return NextResponse.json(notice);
  } catch (error) {
    console.error('Get notice error:', error);
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

    const result = await Notice.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: 'Notice not found' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Update notice error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const result = await Notice.findByIdAndDelete(params.id);

    if (!result) {
      return NextResponse.json({ message: 'Notice not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    console.error('Delete notice error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
