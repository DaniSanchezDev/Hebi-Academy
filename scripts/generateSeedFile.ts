// d:/Dano/Liceo/2-DAW/Academia-online/Hebi-academy/scripts/generateSeedFile.ts
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Función para escapar strings para usarlos en template literals dentro del seed
function escapeString(str: string | null | undefined): string | null {
  if (str === null || str === undefined) return null;
  // Escapa backticks, template literal placeholders ${}, y barras invertidas
  return `\`${str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\``;
}

async function generateSeed() {
  console.log('Generando contenido para el archivo seed...');

  let seedContent = `import { PrismaClient } from '@prisma/client';\n\n`;
  seedContent += `const prisma = new PrismaClient();\n\n`;
  seedContent += `async function main() {\n`;
  seedContent += `  console.log(\`Start seeding ...\`);\n\n`;

  // 1. Obtener y generar para Courses
  const courses = await prisma.course.findMany();
  if (courses.length > 0) {
    seedContent += `  // --- Courses ---\n`;
    for (const course of courses) {
      seedContent += `  await prisma.course.upsert({\n`;
      seedContent += `    where: { id: "${course.id}" },\n`; // Asumiendo que 'id' es el identificador único para upsert
      seedContent += `    update: { // Define qué actualizar si el curso ya existe
        title: ${escapeString(course.title)},
        slug: ${escapeString(course.slug)},
        description: ${escapeString(course.description)},
        imageURL: ${escapeString(course.imageURL)},
        price: ${course.price ? `"${course.price}"` : null},
        isPublished: ${course.isPublished},
        level: ${escapeString(course.level)},
        category: ${escapeString(course.category)},
        updatedAt: new Date("${course.updatedAt.toISOString()}")
      },\n`;
      seedContent += `    create: {\n`;
      seedContent += `      id: "${course.id}",\n`;
      seedContent += `      userId: "${course.userId}",\n`;
      seedContent += `      title: ${escapeString(course.title)},\n`;
      seedContent += `      slug: ${escapeString(course.slug)},\n`;
      seedContent += `      description: ${escapeString(course.description)},\n`;
      seedContent += `      imageURL: ${escapeString(course.imageURL)},\n`;
      seedContent += `      price: ${course.price ? `"${course.price}"` : null},\n`;
      seedContent += `      isPublished: ${course.isPublished},\n`;
      seedContent += `      level: ${escapeString(course.level)},\n`;
      seedContent += `      category: ${escapeString(course.category)},\n`;
      seedContent += `      createdAt: new Date("${course.createdAt.toISOString()}"),\n`;
      seedContent += `      updatedAt: new Date("${course.updatedAt.toISOString()}")\n`;
      seedContent += `    }\n`;
      seedContent += `  });\n\n`;
    }
  }

  // 2. Obtener y generar para Chapters
  const chapters = await prisma.chapter.findMany();
  if (chapters.length > 0) {
    seedContent += `  // --- Chapters ---\n`;
    for (const chapter of chapters) {
      seedContent += `  await prisma.chapter.upsert({\n`;
      seedContent += `    where: { id: "${chapter.id}" },\n`;
      seedContent += `    update: {
        title: ${escapeString(chapter.title)},
        description: ${escapeString(chapter.description)},
        videoUrl: ${escapeString(chapter.videoUrl)},
        position: ${chapter.position},
        isPublished: ${chapter.isPublished},
        isFree: ${chapter.isFree},
        updatedAt: new Date("${chapter.updatedAt.toISOString()}")
      },\n`;
      seedContent += `    create: {\n`;
      seedContent += `      id: "${chapter.id}",\n`;
      seedContent += `      title: ${escapeString(chapter.title)},\n`;
      seedContent += `      description: ${escapeString(chapter.description)},\n`;
      seedContent += `      videoUrl: ${escapeString(chapter.videoUrl)},\n`;
      seedContent += `      position: ${chapter.position},\n`;
      seedContent += `      isPublished: ${chapter.isPublished},\n`;
      seedContent += `      isFree: ${chapter.isFree},\n`;
      seedContent += `      courseId: "${chapter.courseId}",\n`;
      seedContent += `      createdAt: new Date("${chapter.createdAt.toISOString()}"),\n`;
      seedContent += `      updatedAt: new Date("${chapter.updatedAt.toISOString()}")\n`;
      seedContent += `    }\n`;
      seedContent += `  });\n\n`;
    }
  }
  
  // 3. Obtener y generar para UserProgress
  // Nota: userId aquí es un string. Asegúrate de que estos IDs correspondan a usuarios válidos
  // en tu sistema de autenticación (Clerk) si es necesario para la lógica de tu aplicación.
  const userProgresses = await prisma.userProgress.findMany();
  if (userProgresses.length > 0) {
    seedContent += `  // --- UserProgress ---\n`;
    for (const progress of userProgresses) {
      seedContent += `  await prisma.userProgress.upsert({\n`;
      seedContent += `    where: { userId_chapterId: { userId: "${progress.userId}", chapterId: "${progress.chapterId}" } },\n`;
      seedContent += `    update: { 
        isCompleted: ${progress.isCompleted},
        updatedAt: new Date("${progress.updatedAt.toISOString()}")
      },\n`;
      seedContent += `    create: {\n`;
      seedContent += `      id: "${progress.id}",\n`;
      seedContent += `      userId: "${progress.userId}",\n`;
      seedContent += `      chapterId: "${progress.chapterId}",\n`;
      seedContent += `      isCompleted: ${progress.isCompleted},\n`;
      seedContent += `      createdAt: new Date("${progress.createdAt.toISOString()}"),\n`;
      seedContent += `      updatedAt: new Date("${progress.updatedAt.toISOString()}")\n`;
      seedContent += `    }\n`;
      seedContent += `  });\n\n`;
    }
  }

  // 4. Obtener y generar para StripeCustomer
  const stripeCustomers = await prisma.stripeCustomer.findMany();
  if (stripeCustomers.length > 0) {
    seedContent += `  // --- StripeCustomer ---\n`;
    for (const customer of stripeCustomers) {
      seedContent += `  await prisma.stripeCustomer.upsert({\n`;
      seedContent += `    where: { userId: "${customer.userId}" },\n`; // userId es @unique
      seedContent += `    update: { 
        stripeCustomerId: "${customer.stripeCustomerId}",
        updatedAt: new Date("${customer.updatedAt.toISOString()}")
      },\n`;
      seedContent += `    create: {\n`;
      seedContent += `      id: "${customer.id}",\n`;
      seedContent += `      userId: "${customer.userId}",\n`;
      seedContent += `      stripeCustomerId: "${customer.stripeCustomerId}",\n`;
      seedContent += `      createdAt: new Date("${customer.createdAt.toISOString()}"),\n`;
      seedContent += `      updatedAt: new Date("${customer.updatedAt.toISOString()}")\n`;
      seedContent += `    }\n`;
      seedContent += `  });\n\n`;
    }
  }

  // 5. Obtener y generar para Purchase
  const purchases = await prisma.purchase.findMany();
  if (purchases.length > 0) {
    seedContent += `  // --- Purchases ---\n`;
    for (const purchase of purchases) {
      seedContent += `  await prisma.purchase.upsert({\n`;
      seedContent += `    where: { userId_courseId: { userId: "${purchase.userId}", courseId: "${purchase.courseId}" } },\n`;
      seedContent += `    update: { // Define qué actualizar si la compra ya existe
        price: ${purchase.price}, // price es Float en Purchase
        updatedAt: new Date("${purchase.updatedAt.toISOString()}")
      },\n`;
      seedContent += `    create: {\n`;
      seedContent += `      id: "${purchase.id}",\n`;
      seedContent += `      userId: "${purchase.userId}",\n`;
      seedContent += `      courseId: "${purchase.courseId}",\n`;
      seedContent += `      price: ${purchase.price},\n`; // price es Float en Purchase
      seedContent += `      createdAt: new Date("${purchase.createdAt.toISOString()}"),\n`;
      seedContent += `      updatedAt: new Date("${purchase.updatedAt.toISOString()}")\n`;
      seedContent += `    }\n`;
      seedContent += `  });\n\n`;
    }
  }

  seedContent += `  console.log(\`Seeding finished.\`);\n`;
  seedContent += `}\n\n`;
  seedContent += `main()\n`;
  seedContent += `  .catch(async (e) => {\n`;
  seedContent += `    console.error(e);\n`;
  seedContent += `    await prisma.$disconnect();\n`;
  seedContent += `    process.exit(1);\n`;
  seedContent += `  })\n`;
  seedContent += `  .finally(async () => {\n`;
  seedContent += `    await prisma.$disconnect();\n`;
  seedContent += `  });\n`;

  // Escribir el contenido al archivo prisma/seed.ts
  // __dirname en un script de ES Module puede no funcionar como esperas si usas "type": "module" en package.json.
  // Usaremos path.resolve para una ruta más robusta desde la raíz del proyecto.
  const projectRoot = path.resolve(__dirname, '../'); // Asume que 'scripts' está en la raíz
  const seedFilePath = path.join(projectRoot, 'prisma/seed.ts');
  
  try {
    fs.writeFileSync(seedFilePath, seedContent);
    console.log(`Archivo seed generado en: ${seedFilePath}`);
  } catch (error) {
    console.error('Error al escribir el archivo seed:', error);
  }
}

generateSeed()
  .catch((e) => {
    console.error('Error en generateSeed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });