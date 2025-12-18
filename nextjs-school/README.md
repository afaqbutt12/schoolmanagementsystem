# School Management System - Next.js

A comprehensive School Management System built with Next.js 14, featuring the App Router, MongoDB, Redux Toolkit, and Material UI.

## Features

- **Multi-Role Authentication**: Admin, Teacher, and Student login portals
- **Admin Dashboard**: Manage students, teachers, classes, subjects, fees, expenses, library, and parents
- **Student Dashboard**: View subjects, assignments, and attendance
- **Teacher Dashboard**: Manage classes, students, and track progress
- **Modern UI**: Built with Material UI components and custom styling

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **State Management**: Redux Toolkit
- **Database**: MongoDB with Mongoose
- **UI Library**: Material UI v5
- **Styling**: Emotion (styled components)
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)

### Installation

1. Clone the repository and navigate to the nextjs-school directory:

```bash
cd nextjs-school
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/school_management
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nextjs-school/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── admin/             # Admin pages
│   │   ├── student/           # Student pages
│   │   ├── teacher/           # Teacher pages
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable components
│   ├── lib/                   # Utility functions (MongoDB connection)
│   ├── models/                # Mongoose models
│   └── redux/                 # Redux store and slices
├── public/                    # Static assets
└── package.json
```

## API Routes

### Authentication
- `POST /api/admin/register` - Register new admin
- `POST /api/admin/login` - Admin login
- `POST /api/student/login` - Student login
- `POST /api/teacher/login` - Teacher login

### Students
- `GET /api/students/school/:id` - Get all students by school
- `GET /api/student/:id` - Get student details
- `PUT /api/student/:id` - Update student
- `DELETE /api/student/:id` - Delete student

### Teachers
- `POST /api/teacher/register` - Register teacher
- `GET /api/teachers/school/:id` - Get all teachers by school
- `GET /api/teacher/:id` - Get teacher details

### Classes
- `POST /api/sclass` - Create class
- `GET /api/sclass/school/:id` - Get all classes by school
- `GET /api/sclass/:id` - Get class details

### Subjects
- `POST /api/subject` - Create subject
- `GET /api/subjects/school/:id` - Get all subjects by school
- `GET /api/subjects/class/:id` - Get subjects by class

### Additional Routes
- Notices, Complains, Books, Fees, Expenses, Parents, Teacher Payments

## Demo Credentials

### Admin
- Email: yogendra@12
- Password: zxc

### Student
- Roll Number: 1
- Name: Dipesh Awasthi
- Password: zxc

### Teacher
- Email: tony@12
- Password: zxc

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Migrating from React + Express

This project is a migration from a traditional React + Express stack to Next.js. Key changes:

1. **API Routes**: Express routes converted to Next.js API routes (`/app/api/`)
2. **Routing**: React Router replaced with Next.js App Router
3. **State Management**: Redux configured for Next.js with proper SSR handling
4. **Database**: MongoDB connection optimized for serverless environment
5. **TypeScript**: Full TypeScript support added

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

