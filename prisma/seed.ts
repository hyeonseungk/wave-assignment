import { PrismaClient, UserGrade } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  await prisma.$connect();
  // 회원 생성
  const user1 = {
    id: 1,
    email: 'alice@test.com',
    nickname: 'alice',
    grade: UserGrade.FREE,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  };
  const user2 = {
    id: 2,
    email: 'michael@test.com',
    nickname: 'michael',
    grade: UserGrade.PREMIUM,
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  };
  await prisma.user.upsert({
    where: {
      id: 1,
    },
    update: user1,
    create: user1,
  });
  await prisma.user.upsert({
    where: {
      id: 2,
    },
    update: user2,
    create: user2,
  });

  // 상품 보이스 생성
  const voice1 = {
    id: 10,
    name: '신뢰감 가는 남성 MC 목소리',
    explanation: '신뢰감 가는 남성 MC 목소리..',
    link: 'https://www.google.com/voice1.mp3',
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  };
  const voice2 = {
    id: 20,
    name: '흥겨운 여성 MC 목소리',
    explanation: '겨운 여성 MC 목소리..',
    link: 'https://www.google.com/voice2.mp3',
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  };
  await prisma.voice.upsert({
    where: {
      id: 10,
    },
    update: voice1,
    create: voice1,
  });

  await prisma.voice.upsert({
    where: {
      id: 20,
    },
    update: voice2,
    create: voice2,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
