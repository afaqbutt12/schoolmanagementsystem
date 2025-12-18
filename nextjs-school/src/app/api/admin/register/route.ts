import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const existingAdminByEmail = await Admin.findOne({ email: body.email });
    const existingSchool = await Admin.findOne({ schoolName: body.schoolName });

    if (existingAdminByEmail) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }
    
    if (existingSchool) {
      return NextResponse.json({ message: 'School name already exists' }, { status: 400 });
    }

    const admin = new Admin(body);
    const result = await admin.save();
    
    const { password: _, ...adminResponse } = result.toObject();
    
    return NextResponse.json(adminResponse, { status: 201 });
  } catch (error) {
    console.error('Admin registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

