import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Sclass from '@/models/Sclass';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const existingClass = await Sclass.findOne({
      sclassName: body.sclassName,
      school: body.adminID,
    });

    if (existingClass) {
      return NextResponse.json({ message: 'Class already exists' }, { status: 400 });
    }

    const sclass = new Sclass({
      sclassName: body.sclassName,
      school: body.adminID,
    });
    
    const result = await sclass.save();
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Class creation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

