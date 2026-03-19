import prisma from './src/utils/prisma';
import bcrypt from 'bcryptjs';

async function seedAdmin() {
  const email = 'admin@vrindaa.com';
  const password = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email },
    update: { role: 'ADMIN' },
    create: {
      email,
      password,
      name: 'Super Admin',
      role: 'ADMIN'
    }
  });

  console.log('✅ Admin user created/updated:', admin.email);
}

seedAdmin()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
