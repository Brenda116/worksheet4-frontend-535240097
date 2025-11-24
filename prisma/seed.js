require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.post.count();
  if (count > 0) {
    console.log(`Already seeded (${count} posts).`);
    const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
    console.log(posts);
    return;
  }

  const data = [
    {
      title: 'Selamat Datang di Blog',
      content: 'Ini adalah posting pertama yang ditambahkan ke database SQLite untuk demo CRUD dan deployment Vercel.',
    },
    {
      title: 'Prisma + SQLite',
      content: 'Menggunakan Prisma Client untuk berinteraksi dengan database SQLite pada Next.js (local seed).',
    },
    {
      title: 'Tips Deploy',
      content: 'Sertakan file `prisma/dev.db` di repo sebelum push supaya Vercel bisa membaca data (read-only).',
    },
  ];

  const created = await prisma.post.createMany({ data });
  console.log('Seeded posts:', created);

  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  console.log(posts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
