const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting CampusOS Institutional Database Seeding...');

  // 1. Clean existing data in reverse order of foreign keys
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.discussionPost.deleteMany();
  await prisma.hostelComplaint.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.timetable.deleteMany();
  await prisma.marks.deleteMany();
  await prisma.examination.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.subjectFaculty.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.student.deleteMany();
  await prisma.faculty.deleteMany();
  await prisma.semester.deleteMany();
  await prisma.course.deleteMany();
  await prisma.department.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash('Admin@123456', 10);
  const facultyPassword = await bcrypt.hash('Faculty@123456', 10);
  const studentPassword = await bcrypt.hash('Student@123456', 10);

  // 2. Create Administrator
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@campusos.edu',
      password: adminPassword,
      firstName: 'Dr. Arthur',
      lastName: 'Pendelton',
      role: 'ADMIN',
      phone: '+1-555-0100',
    },
  });

  // 3. Create Departments
  const cseDept = await prisma.department.create({
    data: {
      code: 'CSE',
      name: 'Computer Science and Engineering',
      description: 'Department of Computer Science, AI, and Software Engineering',
    },
  });

  const eceDept = await prisma.department.create({
    data: {
      code: 'ECE',
      name: 'Electronics and Communication Engineering',
      description: 'Department of VLSI, Embedded Systems, and Telecommunications',
    },
  });

  // 4. Create Degree Programs
  const btechCse = await prisma.course.create({
    data: {
      code: 'BTECH-CSE',
      name: 'Bachelor of Technology in Computer Science',
      departmentId: cseDept.id,
      durationYears: 4,
    },
  });

  // 5. Create Semesters
  const sem5 = await prisma.semester.create({
    data: {
      semesterNo: 5,
      academicYear: '2026-2027',
      courseId: btechCse.id,
    },
  });

  // 6. Create Subjects
  const dsa = await prisma.subject.create({
    data: {
      code: 'CS301',
      name: 'Data Structures and Algorithms',
      credits: 4,
      departmentId: cseDept.id,
      semesterId: sem5.id,
    },
  });

  const dbms = await prisma.subject.create({
    data: {
      code: 'CS302',
      name: 'Database Management Systems',
      credits: 4,
      departmentId: cseDept.id,
      semesterId: sem5.id,
    },
  });

  const os = await prisma.subject.create({
    data: {
      code: 'CS303',
      name: 'Operating Systems & Architecture',
      credits: 3,
      departmentId: cseDept.id,
      semesterId: sem5.id,
    },
  });

  const webDev = await prisma.subject.create({
    data: {
      code: 'CS304',
      name: 'Full-Stack Web Engineering',
      credits: 4,
      departmentId: cseDept.id,
      semesterId: sem5.id,
    },
  });

  // 7. Create Faculty User & Profile
  const facultyUser1 = await prisma.user.create({
    data: {
      email: 'faculty.johnson@campusos.edu',
      password: facultyPassword,
      firstName: 'Dr. Robert',
      lastName: 'Johnson',
      role: 'FACULTY',
      phone: '+1-555-0201',
    },
  });

  const facultyProfile1 = await prisma.faculty.create({
    data: {
      userId: facultyUser1.id,
      employeeId: 'FAC-CSE-101',
      departmentId: cseDept.id,
      designation: 'Professor & Head of Research',
      qualification: 'Ph.D. in Distributed Systems',
      officeLocation: 'Turing Hall, Room 304',
    },
  });

  // Allocate Faculty to Subjects
  await prisma.subjectFaculty.createMany({
    data: [
      { subjectId: dsa.id, facultyId: facultyProfile1.id },
      { subjectId: webDev.id, facultyId: facultyProfile1.id },
    ],
  });

  // 8. Create Student Users & Profiles
  const studentUser1 = await prisma.user.create({
    data: {
      email: 'rahul.kumar@campusos.edu',
      password: studentPassword,
      firstName: 'Rahul',
      lastName: 'Kumar',
      role: 'STUDENT',
      phone: '+91-98765-43210',
    },
  });

  const studentProfile1 = await prisma.student.create({
    data: {
      userId: studentUser1.id,
      enrollmentNo: 'EN2024CS042',
      courseId: btechCse.id,
      semesterId: sem5.id,
      gender: 'MALE',
      hostelRoom: 'Block B - 402',
      guardianName: 'Rajesh Kumar',
      guardianPhone: '+91-98765-00001',
    },
  });

  const studentUser2 = await prisma.user.create({
    data: {
      email: 'student.sarah@campusos.edu',
      password: studentPassword,
      firstName: 'Sarah',
      lastName: 'Connor',
      role: 'STUDENT',
      phone: '+1-555-0302',
    },
  });

  const studentProfile2 = await prisma.student.create({
    data: {
      userId: studentUser2.id,
      enrollmentNo: 'EN2024CS043',
      courseId: btechCse.id,
      semesterId: sem5.id,
      gender: 'FEMALE',
      hostelRoom: 'Block A - 210',
    },
  });

  // 9. Enroll Students in Subjects
  const subjects = [dsa, dbms, os, webDev];
  for (const sub of subjects) {
    await prisma.enrollment.createMany({
      data: [
        { studentId: studentProfile1.id, subjectId: sub.id, semesterId: sem5.id, academicYear: '2026-2027' },
        { studentId: studentProfile2.id, subjectId: sub.id, semesterId: sem5.id, academicYear: '2026-2027' },
      ],
    });
  }

  // 10. Seed Attendance Records (past 14 days)
  const now = new Date();
  for (let i = 1; i <= 14; i++) {
    const sessionDate = new Date(now);
    sessionDate.setDate(now.getDate() - i);
    // Exclude Sundays
    if (sessionDate.getDay() === 0) continue;

    const formattedDate = new Date(sessionDate.toISOString().split('T')[0]);

    await prisma.attendance.create({
      data: {
        studentId: studentProfile1.id,
        subjectId: dsa.id,
        facultyId: facultyProfile1.id,
        date: formattedDate,
        status: i % 7 === 0 ? 'ABSENT' : 'PRESENT',
      },
    });

    await prisma.attendance.create({
      data: {
        studentId: studentProfile1.id,
        subjectId: webDev.id,
        facultyId: facultyProfile1.id,
        date: formattedDate,
        status: 'PRESENT',
      },
    });
  }

  // 11. Create Assignments
  const dsaAssignment = await prisma.assignment.create({
    data: {
      title: 'Graph Traversal & Dijkstra Algorithm Analysis',
      description: 'Implement BFS, DFS, and Dijkstra shortest path algorithm with time complexity benchmark against dense graphs.',
      subjectId: dsa.id,
      facultyId: facultyProfile1.id,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // in 5 days
      maxMarks: 100,
    },
  });

  const webAssignment = await prisma.assignment.create({
    data: {
      title: 'Full-Stack Authentication and RBAC Flow',
      description: 'Build a secure JWT authentication flow with refresh tokens and role-based middleware guards.',
      subjectId: webDev.id,
      facultyId: facultyProfile1.id,
      deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // in 8 days
      maxMarks: 50,
    },
  });

  // Sample submission by Rahul Kumar
  await prisma.submission.create({
    data: {
      assignmentId: dsaAssignment.id,
      studentId: studentProfile1.id,
      fileUrl: '/uploads/sample-dijkstra-report.pdf',
      fileName: 'rahul_kumar_dijkstra_report.pdf',
      status: 'GRADED',
      marks: 92,
      feedback: 'Excellent complexity analysis and clean implementation!',
      gradedAt: new Date(),
    },
  });

  // 12. Create Examination & Marks
  const midtermExam = await prisma.examination.create({
    data: {
      name: 'Mid-Semester Examination 2026',
      examType: 'MIDTERM',
      subjectId: dsa.id,
      semesterId: sem5.id,
      examDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      startTime: '10:00 AM',
      endTime: '01:00 PM',
      totalMarks: 100,
      roomNo: 'Exam Hall C-102',
    },
  });

  await prisma.marks.create({
    data: {
      examinationId: midtermExam.id,
      studentId: studentProfile1.id,
      marksObtained: 88.5,
      remarks: 'Outstanding logical reasoning and algorithmic proof.',
    },
  });

  // 13. Create Timetable
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
  for (const day of days) {
    await prisma.timetable.create({
      data: {
        subjectId: dsa.id,
        facultyId: facultyProfile1.id,
        semesterId: sem5.id,
        dayOfWeek: day,
        startTime: '09:00 AM',
        endTime: '10:30 AM',
        roomNo: 'Lab-301',
      },
    });

    await prisma.timetable.create({
      data: {
        subjectId: webDev.id,
        facultyId: facultyProfile1.id,
        semesterId: sem5.id,
        dayOfWeek: day,
        startTime: '11:00 AM',
        endTime: '12:30 PM',
        roomNo: 'Lab-304',
      },
    });
  }

  // 14. Create Announcements
  await prisma.announcement.create({
    data: {
      title: 'University Hackathon 2026 Announced: Build with AI',
      content: 'The Department of Computer Science is hosting the annual 48-hour hackathon. Cash prizes up to $10,000. Registration opens next Monday.',
      authorId: adminUser.id,
      targetRole: 'ALL',
      priority: 'HIGH',
      category: 'Events',
    },
  });

  await prisma.announcement.create({
    data: {
      title: 'Hostel Maintenance Schedule for Block B',
      content: 'Wi-Fi network upgrades and electrical maintenance will take place this Saturday from 10:00 AM to 02:00 PM.',
      authorId: adminUser.id,
      targetRole: 'STUDENT',
      priority: 'NORMAL',
      category: 'Hostel',
    },
  });

  // 15. Create Hostel Complaint
  await prisma.hostelComplaint.create({
    data: {
      studentId: studentProfile1.id,
      title: 'Intermittent Wi-Fi Connectivity in Room 402',
      description: 'The access point on the 4th floor loses connection every evening around 8:00 PM.',
      category: 'INTERNET',
      status: 'IN_PROGRESS',
      roomNo: 'Block B - 402',
      resolutionNotes: 'Technician dispatched to replace the corridor router.',
    },
  });

  // 16. Create Discussion Posts & Comments
  const forumPost = await prisma.discussionPost.create({
    data: {
      title: 'Tips for optimizing Dijkstra algorithm using Fibonacci heaps?',
      content: 'Has anyone benchmarked binary heaps vs Fibonacci heaps in practice for sparse graphs? Does the amortized complexity advantage hold true in standard memory layouts?',
      authorId: studentUser1.id,
      subjectId: dsa.id,
      category: 'Algorithms',
    },
  });

  await prisma.comment.create({
    data: {
      postId: forumPost.id,
      authorId: facultyUser1.id,
      content: 'In practice, binary heaps often outperform Fibonacci heaps due to memory locality and cache misses, despite the theoretical advantage of Fibonacci heaps.',
    },
  });

  await prisma.like.create({
    data: {
      postId: forumPost.id,
      userId: studentUser2.id,
    },
  });

  // 17. Seed Notification
  await prisma.notification.create({
    data: {
      userId: studentUser1.id,
      title: 'Welcome to CampusOS',
      message: 'Your student dashboard is ready. Check your enrolled subjects and upcoming classes.',
      link: '/student/dashboard',
    },
  });

  console.log('✅ CampusOS Database Seed Completed Successfully!');
  console.log('---------------------------------------------------------');
  console.log('Admin:   admin@campusos.edu / Admin@123456');
  console.log('Faculty: faculty.johnson@campusos.edu / Faculty@123456');
  console.log('Student: rahul.kumar@campusos.edu / Student@123456 (or EN2024CS042)');
  console.log('---------------------------------------------------------');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

