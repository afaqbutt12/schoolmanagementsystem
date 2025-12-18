import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subject from '@/models/Subject';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { subjects } = body;
    
    // Handle bulk creation
    if (subjects && Array.isArray(subjects)) {
      const results = [];
      
      for (const subjectData of subjects) {
        const existingSubject = await Subject.findOne({
          subName: subjectData.subName,
          sclassName: subjectData.sclassName,
          school: subjectData.adminID,
        });

        if (existingSubject) {
          continue; // Skip if already exists
        }

        const subject = new Subject({
          ...subjectData,
          school: subjectData.adminID,
        });
        
        const result = await subject.save();
        results.push(result);
      }
      
      return NextResponse.json(results, { status: 201 });
    }
    
    // Handle single creation
    const existingSubject = await Subject.findOne({
      subName: body.subName,
      sclassName: body.sclassName,
      school: body.adminID,
    });

    if (existingSubject) {
      return NextResponse.json({ message: 'Subject already exists' }, { status: 400 });
    }

    const subject = new Subject({
      ...body,
      school: body.adminID,
    });
    
    const result = await subject.save();
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Subject creation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

