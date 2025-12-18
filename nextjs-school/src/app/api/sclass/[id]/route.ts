import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Sclass from '@/models/Sclass';
import Student from '@/models/Student';
import Subject from '@/models/Subject';
import Teacher from '@/models/Teacher';
// Import Admin model for populate
import '@/models/Admin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const sclass = await Sclass.findById(params.id)
      .populate('school', 'schoolName');
    
    if (!sclass) {
      return NextResponse.json({ message: 'No class found' }, { status: 404 });
    }

    // Get counts for related data
    const studentsCount = await Student.countDocuments({ sclassName: params.id });
    const subjectsCount = await Subject.countDocuments({ sclassName: params.id });
    const teachersCount = await Teacher.countDocuments({ teachSclass: params.id });

    // Get list of students, subjects, and teachers
    const students = await Student.find({ sclassName: params.id }).select('name rollNum email');
    const subjects = await Subject.find({ sclassName: params.id }).select('subName subCode');
    const teachers = await Teacher.find({ teachSclass: params.id }).select('name email').populate('teachSubject', 'subName');
    
    return NextResponse.json({
      ...sclass.toObject(),
      studentsCount,
      subjectsCount,
      teachersCount,
      students,
      subjects,
      teachers,
    });
  } catch (error) {
    console.error('Get class error:', error);
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
    
    const result = await Sclass.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: 'Class not found' }, { status: 404 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Update class error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const result = await Sclass.findByIdAndDelete(params.id);
    
    if (!result) {
      return NextResponse.json({ message: 'Class not found' }, { status: 404 });
    }

    // Delete related data
    await Student.deleteMany({ sclassName: params.id });
    await Subject.deleteMany({ sclassName: params.id });
    await Teacher.deleteMany({ teachSclass: params.id });
    
    return NextResponse.json({ message: 'Class and related data deleted successfully' });
  } catch (error) {
    console.error('Delete class error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

