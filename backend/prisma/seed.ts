import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create Communities
  const kigaliVillage = await prisma.community.create({
    data: {
      name: 'Kigali Village',
      location: 'Kigali City',
      district: 'Gasabo',
      sector: 'Kacyiru',
      cell: 'Kamatamu',
      village: 'Kigali Village',
      description: 'Urban community in Kigali with 45 sponsored children',
      totalFamilies: 32,
      totalChildren: 45,
    }
  })

  const musanzeDistrict = await prisma.community.create({
    data: {
      name: 'Musanze District',
      location: 'Northern Province',
      district: 'Musanze',
      sector: 'Muhoza',
      cell: 'Cyuve',
      village: 'Musanze Center',
      description: 'Rural community near Volcanoes National Park',
      totalFamilies: 28,
      totalChildren: 38,
    }
  })

  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@umwiza.org',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      phone: '+250788123456',
    }
  })

  // Create Staff Users
  const staffPassword = await bcrypt.hash('staff123', 10)
  const johnDoe = await prisma.user.create({
    data: {
      email: 'staff@umwiza.org',
      passwordHash: staffPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'STAFF',
      communityId: kigaliVillage.id,
      phone: '+250788234567',
    }
  })

  const janeSmith = await prisma.user.create({
    data: {
      email: 'jane@umwiza.org',
      passwordHash: staffPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'STAFF',
      communityId: musanzeDistrict.id,
      phone: '+250788345678',
    }
  })

  // Create Sponsors
  const sponsor1 = await prisma.sponsor.create({
    data: {
      sponsorCode: 'SP001',
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@email.com',
      country: 'United States',
      sponsorType: 'INDIVIDUAL',
      startDate: new Date('2023-01-15'),
    }
  })

  const sponsor2 = await prisma.sponsor.create({
    data: {
      sponsorCode: 'SP002',
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@email.com',
      country: 'Canada',
      sponsorType: 'FAMILY',
      startDate: new Date('2023-03-20'),
    }
  })

  // Create Families
  const family1 = await prisma.family.create({
    data: {
      communityId: kigaliVillage.id,
      familyCode: 'FAM001',
      motherName: 'Marie Uwase',
      motherAge: 35,
      motherOccupation: 'Small trader',
      fatherName: 'Jean Baptiste',
      fatherAge: 40,
      fatherOccupation: 'Farmer',
      address: 'Kigali Village, Sector 3',
      phone: '+250788456789',
      totalChildren: 3,
      housingType: 'Mud house',
      incomeLevel: 'Low',
      enrollmentDate: new Date('2023-01-01'),
    }
  })

  const family2 = await prisma.family.create({
    data: {
      communityId: musanzeDistrict.id,
      familyCode: 'FAM002',
      motherName: 'Grace Mukamana',
      motherAge: 32,
      guardianName: 'Grace Mukamana',
      guardianRelationship: 'Mother',
      address: 'Musanze Center, Cell Cyuve',
      totalChildren: 2,
      housingType: 'Brick house',
      incomeLevel: 'Medium',
      enrollmentDate: new Date('2023-02-15'),
    }
  })

  // Create Children
  const child1 = await prisma.child.create({
    data: {
      familyId: family1.id,
      childCode: 'CH001',
      firstName: 'Amani',
      lastName: 'Uwase',
      dateOfBirth: new Date('2012-03-15'),
      gender: 'FEMALE',
      photoUrl: '/children/child1.jpg',
      isSponsored: true,
      sponsorId: sponsor1.id,
      sponsorshipStartDate: new Date('2023-01-15'),
      gradeLevel: 'Grade 6',
      schoolName: 'Kigali Primary School',
      interests: 'Reading, Drawing, Mathematics',
      dreams: 'To become a doctor and help people in my community',
    }
  })

  const child2 = await prisma.child.create({
    data: {
      familyId: family1.id,
      childCode: 'CH002',
      firstName: 'Jean',
      lastName: 'Mugabo',
      dateOfBirth: new Date('2014-07-22'),
      gender: 'MALE',
      photoUrl: '/children/child2.jpg',
      isSponsored: true,
      sponsorId: sponsor2.id,
      sponsorshipStartDate: new Date('2023-03-20'),
      gradeLevel: 'Grade 4',
      schoolName: 'Hope Academy',
      interests: 'Football, Science, Music',
      dreams: 'To become an engineer and build schools',
    }
  })

  const child3 = await prisma.child.create({
    data: {
      familyId: family2.id,
      childCode: 'CH003',
      firstName: 'Grace',
      lastName: 'Ishimwe',
      dateOfBirth: new Date('2010-11-08'),
      gender: 'FEMALE',
      photoUrl: '/children/child3.jpg',
      gradeLevel: 'Grade 8',
      schoolName: 'St. Mary Secondary',
      interests: 'Literature, History, Art',
      dreams: 'To become a teacher and educate children',
    }
  })

  // Create Health Records
  await prisma.healthRecord.create({
    data: {
      childId: child1.id,
      recordDate: new Date('2025-01-15'),
      recordType: 'CHECKUP',
      title: 'Regular Health Checkup',
      description: 'Annual health screening',
      diagnosis: 'Healthy',
      hospitalName: 'Kigali Health Center',
      doctorName: 'Dr. Mukamana',
      createdBy: johnDoe.id,
    }
  })

  await prisma.healthRecord.create({
    data: {
      childId: child2.id,
      recordDate: new Date('2024-12-10'),
      recordType: 'VACCINATION',
      title: 'Flu Vaccination',
      description: 'Annual flu vaccine administered',
      treatment: 'Flu vaccine injection',
      hospitalName: 'Hope Medical Center',
      createdBy: johnDoe.id,
    }
  })

  // Create Education Records
  await prisma.educationRecord.create({
    data: {
      childId: child1.id,
      academicYear: '2024',
      term: 'Term 3',
      gradeLevel: 'Grade 6',
      schoolName: 'Kigali Primary School',
      attendancePercentage: 95.5,
      overallGrade: 'A',
      overallPercentage: 87.5,
      rankInClass: 3,
      totalStudents: 45,
      teacherName: 'Mrs. Uwimana',
      teacherComments: 'Excellent student with strong performance in mathematics and science',
      subjects: {
        mathematics: { grade: 'A', percentage: 92 },
        english: { grade: 'B+', percentage: 85 },
        science: { grade: 'A', percentage: 90 },
        social_studies: { grade: 'B', percentage: 82 }
      },
      achievements: 'Best in Mathematics, Science Fair participant',
      createdBy: johnDoe.id,
    }
  })

  // Create Transactions
  await prisma.transaction.create({
    data: {
      transactionCode: 'TXN001',
      childId: child1.id,
      sponsorId: sponsor1.id,
      amount: 50000,
      currency: 'RWF',
      transactionDate: new Date('2025-01-01'),
      transactionType: 'SPONSORSHIP',
      status: 'CONFIRMED',
      paymentMethod: 'Bank Transfer',
      referenceNumber: 'REF001',
      notes: 'Monthly sponsorship payment',
      confirmedBy: admin.id,
      confirmedAt: new Date('2025-01-02'),
    }
  })

  // Create Budget
  await prisma.budget.create({
    data: {
      familyId: family1.id,
      budgetPeriod: 'Q1 2025',
      totalAmount: 150000,
      currency: 'RWF',
      categories: {
        education: { amount: 60000, description: 'School fees and supplies' },
        health: { amount: 30000, description: 'Medical checkups and medications' },
        nutrition: { amount: 40000, description: 'Food supplements' },
        housing: { amount: 20000, description: 'Housing improvements' }
      },
      explanation: 'Quarterly budget for family support including education, health, and nutrition needs',
      status: 'SUBMITTED',
      submittedBy: johnDoe.id,
      submittedAt: new Date(),
    }
  })

  // Create Tasks
  await prisma.task.create({
    data: {
      title: 'Review Q1 Budget Submission',
      description: 'Review and approve the Q1 2025 budget for Family FAM001',
      taskType: 'BUDGET',
      priority: 'HIGH',
      assignedTo: admin.id,
      assignedBy: johnDoe.id,
      relatedEntityType: 'Budget',
      dueDate: new Date('2025-01-31'),
    }
  })

  await prisma.task.create({
    data: {
      title: 'Update Health Records',
      description: 'Complete health record updates for sponsored children',
      taskType: 'HEALTH_RECORD',
      priority: 'MEDIUM',
      assignedTo: johnDoe.id,
      assignedBy: admin.id,
      dueDate: new Date('2025-02-15'),
    }
  })

  // Create Events
  await prisma.event.create({
    data: {
      title: 'Community Health Day',
      description: 'Free health checkups and health education for all families',
      eventType: 'COMMUNITY',
      eventDate: new Date('2025-02-15'),
      location: 'Kigali Village Community Center',
      communityId: kigaliVillage.id,
      isPublic: true,
      attendees: 120,
      status: 'UPCOMING',
      createdBy: admin.id,
    }
  })

  // Create Notifications
  await prisma.notification.create({
    data: {
      userId: johnDoe.id,
      title: 'Budget Pending Review',
      message: 'Your Q1 2025 budget submission is pending admin review',
      notificationType: 'APPROVAL',
      priority: 'HIGH',
      actionUrl: '/dashboard/staff/budgets',
    }
  })

  await prisma.notification.create({
    data: {
      userId: admin.id,
      title: 'New Budget Submission',
      message: 'John Doe has submitted a new budget for review',
      notificationType: 'TASK',
      priority: 'HIGH',
      actionUrl: '/dashboard/admin/approvals',
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log('📊 Created:')
  console.log('  - 2 Communities')
  console.log('  - 3 Users (1 Admin, 2 Staff)')
  console.log('  - 2 Sponsors')
  console.log('  - 2 Families')
  console.log('  - 3 Children')
  console.log('  - 2 Health Records')
  console.log('  - 1 Education Record')
  console.log('  - 1 Transaction')
  console.log('  - 1 Budget')
  console.log('  - 2 Tasks')
  console.log('  - 1 Event')
  console.log('  - 2 Notifications')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })