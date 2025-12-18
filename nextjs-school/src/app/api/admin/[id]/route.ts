import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const admin = await Admin.findById(params.id);
    
    if (!admin) {
      return NextResponse.json({ message: 'No admin found' }, { status: 404 });
    }

    const { password, ...adminResponse } = admin.toObject();
    
    return NextResponse.json(adminResponse);
  } catch (error) {
    console.error('Get admin error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

