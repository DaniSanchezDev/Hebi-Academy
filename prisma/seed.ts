import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // --- Courses ---
  await prisma.course.upsert({
    where: { id: "9a29e2eb-0482-4836-b411-4dc6f7eff592" },
    update: { // Define qué actualizar si el curso ya existe
        title: `aprende Next`,
        slug: `next-js-course`,
        description: `Curso para aprender next.js`,
        imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWI84TlRNKuyTqu7B69SKOGhfozgMceFtwDUCEn`,
        price: "Gratis",
        isPublished: true,
        level: `Basic`,
        category: `Frontend`,
        updatedAt: new Date("2025-05-28T13:20:51.213Z")
      },
    create: {
      id: "9a29e2eb-0482-4836-b411-4dc6f7eff592",
      userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8",
      title: `aprende Next`,
      slug: `next-js-course`,
      description: `Curso para aprender next.js`,
      imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWI84TlRNKuyTqu7B69SKOGhfozgMceFtwDUCEn`,
      price: "Gratis",
      isPublished: true,
      level: `Basic`,
      category: `Frontend`,
      createdAt: new Date("2025-05-28T10:54:41.175Z"),
      updatedAt: new Date("2025-05-28T13:20:51.213Z")
    }
  });

  await prisma.course.upsert({
    where: { id: "13ceda10-0a61-4104-abba-c4b5c233c36d" },
    update: { // Define qué actualizar si el curso ya existe
        title: `Laravel desde 0`,
        slug: `laravel-course`,
        description: `Curso de laravel desde 0`,
        imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWIZbdk4ShQiEaW5NfVeO4x3gTjK72McGyU8Smo`,
        price: "0",
        isPublished: true,
        level: `Basic`,
        category: `Backend`,
        updatedAt: new Date("2025-06-05T22:09:59.215Z")
      },
    create: {
      id: "13ceda10-0a61-4104-abba-c4b5c233c36d",
      userId: "user_2y08non2WNf86CbHjg8MRP5vcTt",
      title: `Laravel desde 0`,
      slug: `laravel-course`,
      description: `Curso de laravel desde 0`,
      imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWIZbdk4ShQiEaW5NfVeO4x3gTjK72McGyU8Smo`,
      price: "0",
      isPublished: true,
      level: `Basic`,
      category: `Backend`,
      createdAt: new Date("2025-06-05T21:21:55.107Z"),
      updatedAt: new Date("2025-06-05T22:09:59.215Z")
    }
  });

  await prisma.course.upsert({
    where: { id: "55f43d78-4287-4d2c-a2c0-134bed52f525" },
    update: { // Define qué actualizar si el curso ya existe
        title: `Curso de JavaScript`,
        slug: `js-course`,
        description: null,
        imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWI0BwBrTsSka8iwydOXxLI3TmqDnrYsZbgVoHe`,
        price: "13,99",
        isPublished: true,
        level: null,
        category: null,
        updatedAt: new Date("2025-06-05T21:21:15.564Z")
      },
    create: {
      id: "55f43d78-4287-4d2c-a2c0-134bed52f525",
      userId: "user_2y08non2WNf86CbHjg8MRP5vcTt",
      title: `Curso de JavaScript`,
      slug: `js-course`,
      description: null,
      imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWI0BwBrTsSka8iwydOXxLI3TmqDnrYsZbgVoHe`,
      price: "13,99",
      isPublished: true,
      level: null,
      category: null,
      createdAt: new Date("2025-06-05T21:13:07.998Z"),
      updatedAt: new Date("2025-06-05T21:21:15.564Z")
    }
  });

  await prisma.course.upsert({
    where: { id: "c2af7821-60b5-4100-8bc0-32e48496c311" },
    update: { // Define qué actualizar si el curso ya existe
        title: `Aprende css`,
        slug: `curso-css`,
        description: `prueba de curso de css`,
        imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWI7J9vnbnf0Eg5pLGPCBDaHuM2FySwl1WxXb8T`,
        price: "13,99",
        isPublished: true,
        level: `Basic`,
        category: `UX/UI`,
        updatedAt: new Date("2025-05-30T18:03:56.908Z")
      },
    create: {
      id: "c2af7821-60b5-4100-8bc0-32e48496c311",
      userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8",
      title: `Aprende css`,
      slug: `curso-css`,
      description: `prueba de curso de css`,
      imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWI7J9vnbnf0Eg5pLGPCBDaHuM2FySwl1WxXb8T`,
      price: "13,99",
      isPublished: true,
      level: `Basic`,
      category: `UX/UI`,
      createdAt: new Date("2025-05-30T18:00:55.557Z"),
      updatedAt: new Date("2025-05-30T18:03:56.908Z")
    }
  });

  await prisma.course.upsert({
    where: { id: "da89ecdd-45a0-405b-b3bb-8483c44eea69" },
    update: { // Define qué actualizar si el curso ya existe
        title: `Curso de Angular`,
        slug: `angular-course`,
        description: `Curso para aprender angular en el menor tiempo posible y sin ningún tipo de base en el lenguaje, lo que quieras`,
        imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWIlxkXKzji1qAeaYUg0BTC5KkWxyrDtwNv4mzZ`,
        price: "37,99",
        isPublished: true,
        level: `Expert`,
        category: `Frontend`,
        updatedAt: new Date("2025-06-04T20:32:00.066Z")
      },
    create: {
      id: "da89ecdd-45a0-405b-b3bb-8483c44eea69",
      userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8",
      title: `Curso de Angular`,
      slug: `angular-course`,
      description: `Curso para aprender angular en el menor tiempo posible y sin ningún tipo de base en el lenguaje, lo que quieras`,
      imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWIlxkXKzji1qAeaYUg0BTC5KkWxyrDtwNv4mzZ`,
      price: "37,99",
      isPublished: true,
      level: `Expert`,
      category: `Frontend`,
      createdAt: new Date("2025-05-30T13:20:44.804Z"),
      updatedAt: new Date("2025-06-04T20:32:00.066Z")
    }
  });

  await prisma.course.upsert({
    where: { id: "847412ec-043b-448e-b9a2-bf6561262ea6" },
    update: { // Define qué actualizar si el curso ya existe
        title: `Curso de React Native`,
        slug: `react-native-course`,
        description: `Curso de React Native desde cero para programar`,
        imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWIXjoBo4c2DjrhkcNxYM4bR807oOFHXQz65TZE`,
        price: "25,99",
        isPublished: true,
        level: `Advanced`,
        category: `Full Stack`,
        updatedAt: new Date("2025-06-05T21:25:36.062Z")
      },
    create: {
      id: "847412ec-043b-448e-b9a2-bf6561262ea6",
      userId: "user_2y08non2WNf86CbHjg8MRP5vcTt",
      title: `Curso de React Native`,
      slug: `react-native-course`,
      description: `Curso de React Native desde cero para programar`,
      imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWIXjoBo4c2DjrhkcNxYM4bR807oOFHXQz65TZE`,
      price: "25,99",
      isPublished: true,
      level: `Advanced`,
      category: `Full Stack`,
      createdAt: new Date("2025-06-05T21:23:13.532Z"),
      updatedAt: new Date("2025-06-05T21:25:36.062Z")
    }
  });

  await prisma.course.upsert({
    where: { id: "a0586b84-77db-4ffd-af66-3740b749743e" },
    update: { // Define qué actualizar si el curso ya existe
        title: `Tailwind Avanzado`,
        slug: `tailwind-advanced-course`,
        description: `Curso de tailwind 4 para avanzados`,
        imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWIcdrks72rzLa6w4JET79WK1Bg5R2jAuGyObQS`,
        price: "13,99",
        isPublished: true,
        level: `Advanced`,
        category: `UX/UI`,
        updatedAt: new Date("2025-06-05T21:27:24.472Z")
      },
    create: {
      id: "a0586b84-77db-4ffd-af66-3740b749743e",
      userId: "user_2y08non2WNf86CbHjg8MRP5vcTt",
      title: `Tailwind Avanzado`,
      slug: `tailwind-advanced-course`,
      description: `Curso de tailwind 4 para avanzados`,
      imageURL: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWIcdrks72rzLa6w4JET79WK1Bg5R2jAuGyObQS`,
      price: "13,99",
      isPublished: true,
      level: `Advanced`,
      category: `UX/UI`,
      createdAt: new Date("2025-06-05T21:26:26.047Z"),
      updatedAt: new Date("2025-06-05T21:27:24.472Z")
    }
  });

  // --- Chapters ---
  await prisma.chapter.upsert({
    where: { id: "1c806590-25de-4e01-ae51-6beb8512e815" },
    update: {
        title: `Chapter 2 next`,
        description: null,
        videoUrl: null,
        position: 2,
        isPublished: true,
        isFree: false,
        updatedAt: new Date("2025-05-28T11:45:41.820Z")
      },
    create: {
      id: "1c806590-25de-4e01-ae51-6beb8512e815",
      title: `Chapter 2 next`,
      description: null,
      videoUrl: null,
      position: 2,
      isPublished: true,
      isFree: false,
      courseId: "9a29e2eb-0482-4836-b411-4dc6f7eff592",
      createdAt: new Date("2025-05-28T10:56:14.760Z"),
      updatedAt: new Date("2025-05-28T11:45:41.820Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "0c921d25-6869-4525-a247-8aad23500b54" },
    update: {
        title: `Chapter 1 Next`,
        description: null,
        videoUrl: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWIUYNaiQbrCyoWK5PlXZqRYne9uzpFBvJ23G0d`,
        position: 1,
        isPublished: true,
        isFree: false,
        updatedAt: new Date("2025-05-30T08:41:54.267Z")
      },
    create: {
      id: "0c921d25-6869-4525-a247-8aad23500b54",
      title: `Chapter 1 Next`,
      description: null,
      videoUrl: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWIUYNaiQbrCyoWK5PlXZqRYne9uzpFBvJ23G0d`,
      position: 1,
      isPublished: true,
      isFree: false,
      courseId: "9a29e2eb-0482-4836-b411-4dc6f7eff592",
      createdAt: new Date("2025-05-28T10:55:57.911Z"),
      updatedAt: new Date("2025-05-30T08:41:54.267Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "4d3ff9d6-751f-43e6-8e10-5721b1ff8904" },
    update: {
        title: `Chapter 1 - JS`,
        description: `<p><br></p>`,
        videoUrl: null,
        position: 1,
        isPublished: true,
        isFree: false,
        updatedAt: new Date("2025-06-05T21:15:24.542Z")
      },
    create: {
      id: "4d3ff9d6-751f-43e6-8e10-5721b1ff8904",
      title: `Chapter 1 - JS`,
      description: `<p><br></p>`,
      videoUrl: null,
      position: 1,
      isPublished: true,
      isFree: false,
      courseId: "55f43d78-4287-4d2c-a2c0-134bed52f525",
      createdAt: new Date("2025-06-05T21:14:24.751Z"),
      updatedAt: new Date("2025-06-05T21:15:24.542Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "e5a53e13-8d09-4dfc-ae7c-05aae79ef712" },
    update: {
        title: `Chapter 2 - Loops`,
        description: null,
        videoUrl: null,
        position: 2,
        isPublished: true,
        isFree: false,
        updatedAt: new Date("2025-06-05T21:15:29.498Z")
      },
    create: {
      id: "e5a53e13-8d09-4dfc-ae7c-05aae79ef712",
      title: `Chapter 2 - Loops`,
      description: null,
      videoUrl: null,
      position: 2,
      isPublished: true,
      isFree: false,
      courseId: "55f43d78-4287-4d2c-a2c0-134bed52f525",
      createdAt: new Date("2025-06-05T21:14:45.562Z"),
      updatedAt: new Date("2025-06-05T21:15:29.498Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "15a89648-eb5a-4b71-ac22-112f3a7ad4d3" },
    update: {
        title: `Chapter 3 - Do while`,
        description: null,
        videoUrl: null,
        position: 3,
        isPublished: true,
        isFree: false,
        updatedAt: new Date("2025-06-05T21:15:35.633Z")
      },
    create: {
      id: "15a89648-eb5a-4b71-ac22-112f3a7ad4d3",
      title: `Chapter 3 - Do while`,
      description: null,
      videoUrl: null,
      position: 3,
      isPublished: true,
      isFree: false,
      courseId: "55f43d78-4287-4d2c-a2c0-134bed52f525",
      createdAt: new Date("2025-06-05T21:14:56.952Z"),
      updatedAt: new Date("2025-06-05T21:15:35.633Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "a90408f4-c2ba-4226-8c54-e9542df22da0" },
    update: {
        title: `Chapter 1 - Laravel desde 0`,
        description: null,
        videoUrl: null,
        position: 1,
        isPublished: false,
        isFree: false,
        updatedAt: new Date("2025-06-05T21:22:49.264Z")
      },
    create: {
      id: "a90408f4-c2ba-4226-8c54-e9542df22da0",
      title: `Chapter 1 - Laravel desde 0`,
      description: null,
      videoUrl: null,
      position: 1,
      isPublished: false,
      isFree: false,
      courseId: "13ceda10-0a61-4104-abba-c4b5c233c36d",
      createdAt: new Date("2025-06-05T21:22:49.264Z"),
      updatedAt: new Date("2025-06-05T21:22:49.264Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "0196e78f-6b3d-4975-9e98-cf0035753d89" },
    update: {
        title: `Chapter 4 - Basic knwoledge`,
        description: null,
        videoUrl: null,
        position: 3,
        isPublished: true,
        isFree: false,
        updatedAt: new Date("2025-05-30T13:24:33.995Z")
      },
    create: {
      id: "0196e78f-6b3d-4975-9e98-cf0035753d89",
      title: `Chapter 4 - Basic knwoledge`,
      description: null,
      videoUrl: null,
      position: 3,
      isPublished: true,
      isFree: false,
      courseId: "da89ecdd-45a0-405b-b3bb-8483c44eea69",
      createdAt: new Date("2025-05-30T13:23:38.231Z"),
      updatedAt: new Date("2025-05-30T13:24:33.995Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "7701a780-26ba-4f41-b1a3-b2444eb6d9d7" },
    update: {
        title: `Chapter 1 - Introduction`,
        description: null,
        videoUrl: null,
        position: 1,
        isPublished: false,
        isFree: false,
        updatedAt: new Date("2025-06-05T21:25:21.632Z")
      },
    create: {
      id: "7701a780-26ba-4f41-b1a3-b2444eb6d9d7",
      title: `Chapter 1 - Introduction`,
      description: null,
      videoUrl: null,
      position: 1,
      isPublished: false,
      isFree: false,
      courseId: "847412ec-043b-448e-b9a2-bf6561262ea6",
      createdAt: new Date("2025-06-05T21:25:21.632Z"),
      updatedAt: new Date("2025-06-05T21:25:21.632Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "d5391852-41c5-4616-815e-73a9ee124b6f" },
    update: {
        title: `Chapter 2 - Build your first app with angular`,
        description: null,
        videoUrl: null,
        position: 1,
        isPublished: true,
        isFree: false,
        updatedAt: new Date("2025-05-30T13:24:33.995Z")
      },
    create: {
      id: "d5391852-41c5-4616-815e-73a9ee124b6f",
      title: `Chapter 2 - Build your first app with angular`,
      description: null,
      videoUrl: null,
      position: 1,
      isPublished: true,
      isFree: false,
      courseId: "da89ecdd-45a0-405b-b3bb-8483c44eea69",
      createdAt: new Date("2025-05-30T13:23:00.892Z"),
      updatedAt: new Date("2025-05-30T13:24:33.995Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "dd708656-3eeb-4d0d-af2c-14f6114075c5" },
    update: {
        title: `Chapter 3 - What do you need?`,
        description: null,
        videoUrl: null,
        position: 2,
        isPublished: true,
        isFree: false,
        updatedAt: new Date("2025-05-30T13:24:33.995Z")
      },
    create: {
      id: "dd708656-3eeb-4d0d-af2c-14f6114075c5",
      title: `Chapter 3 - What do you need?`,
      description: null,
      videoUrl: null,
      position: 2,
      isPublished: true,
      isFree: false,
      courseId: "da89ecdd-45a0-405b-b3bb-8483c44eea69",
      createdAt: new Date("2025-05-30T13:23:17.516Z"),
      updatedAt: new Date("2025-05-30T13:24:33.995Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "7d8ce7d8-d5b9-4c3b-9b07-29812601cbb3" },
    update: {
        title: `Chapter 2 - React Native`,
        description: null,
        videoUrl: null,
        position: 2,
        isPublished: false,
        isFree: false,
        updatedAt: new Date("2025-06-05T21:25:33.327Z")
      },
    create: {
      id: "7d8ce7d8-d5b9-4c3b-9b07-29812601cbb3",
      title: `Chapter 2 - React Native`,
      description: null,
      videoUrl: null,
      position: 2,
      isPublished: false,
      isFree: false,
      courseId: "847412ec-043b-448e-b9a2-bf6561262ea6",
      createdAt: new Date("2025-06-05T21:25:33.327Z"),
      updatedAt: new Date("2025-06-05T21:25:33.327Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "9a68cd00-1946-4403-a95e-8bf504d161eb" },
    update: {
        title: `Chapter 1 - Colores de Tailwind`,
        description: null,
        videoUrl: null,
        position: 1,
        isPublished: false,
        isFree: false,
        updatedAt: new Date("2025-06-05T21:27:22.180Z")
      },
    create: {
      id: "9a68cd00-1946-4403-a95e-8bf504d161eb",
      title: `Chapter 1 - Colores de Tailwind`,
      description: null,
      videoUrl: null,
      position: 1,
      isPublished: false,
      isFree: false,
      courseId: "a0586b84-77db-4ffd-af66-3740b749743e",
      createdAt: new Date("2025-06-05T21:27:22.180Z"),
      updatedAt: new Date("2025-06-05T21:27:22.180Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "82e3038c-5532-4ff7-af2c-88253c90e7d9" },
    update: {
        title: `Chapteer 1 - CSS`,
        description: `<p>Hola Pruyeba de <strong>texto</strong></p>`,
        videoUrl: null,
        position: 0,
        isPublished: true,
        isFree: false,
        updatedAt: new Date("2025-05-30T18:03:35.475Z")
      },
    create: {
      id: "82e3038c-5532-4ff7-af2c-88253c90e7d9",
      title: `Chapteer 1 - CSS`,
      description: `<p>Hola Pruyeba de <strong>texto</strong></p>`,
      videoUrl: null,
      position: 0,
      isPublished: true,
      isFree: false,
      courseId: "c2af7821-60b5-4100-8bc0-32e48496c311",
      createdAt: new Date("2025-05-30T18:02:37.398Z"),
      updatedAt: new Date("2025-05-30T18:03:35.475Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "625e7ef0-1020-46eb-a2ab-37fc7e9f30ef" },
    update: {
        title: `Chapter 2 - HTML`,
        description: null,
        videoUrl: null,
        position: 1,
        isPublished: true,
        isFree: false,
        updatedAt: new Date("2025-05-30T18:03:43.445Z")
      },
    create: {
      id: "625e7ef0-1020-46eb-a2ab-37fc7e9f30ef",
      title: `Chapter 2 - HTML`,
      description: null,
      videoUrl: null,
      position: 1,
      isPublished: true,
      isFree: false,
      courseId: "c2af7821-60b5-4100-8bc0-32e48496c311",
      createdAt: new Date("2025-05-30T18:02:46.722Z"),
      updatedAt: new Date("2025-05-30T18:03:43.445Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "84119bb1-36ed-4a47-b7a2-108baf8de524" },
    update: {
        title: `Chapter 3 shadcn`,
        description: null,
        videoUrl: null,
        position: 3,
        isPublished: true,
        isFree: false,
        updatedAt: new Date("2025-06-02T11:26:30.147Z")
      },
    create: {
      id: "84119bb1-36ed-4a47-b7a2-108baf8de524",
      title: `Chapter 3 shadcn`,
      description: null,
      videoUrl: null,
      position: 3,
      isPublished: true,
      isFree: false,
      courseId: "9a29e2eb-0482-4836-b411-4dc6f7eff592",
      createdAt: new Date("2025-06-02T11:26:09.365Z"),
      updatedAt: new Date("2025-06-02T11:26:30.147Z")
    }
  });

  await prisma.chapter.upsert({
    where: { id: "ae9c036c-8684-4b4a-8399-5fe913225a58" },
    update: {
        title: `Chapter 1 - Introduction`,
        description: null,
        videoUrl: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWIUU9qErbrCyoWK5PlXZqRYne9uzpFBvJ23G0d`,
        position: 0,
        isPublished: true,
        isFree: false,
        updatedAt: new Date("2025-06-04T20:39:51.728Z")
      },
    create: {
      id: "ae9c036c-8684-4b4a-8399-5fe913225a58",
      title: `Chapter 1 - Introduction`,
      description: null,
      videoUrl: `https://9ilv68byiw.ufs.sh/f/9nuGMhitMKWIUU9qErbrCyoWK5PlXZqRYne9uzpFBvJ23G0d`,
      position: 0,
      isPublished: true,
      isFree: false,
      courseId: "da89ecdd-45a0-405b-b3bb-8483c44eea69",
      createdAt: new Date("2025-05-30T13:22:47.576Z"),
      updatedAt: new Date("2025-06-04T20:39:51.728Z")
    }
  });

  // --- UserProgress ---
  await prisma.userProgress.upsert({
    where: { userId_chapterId: { userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8", chapterId: "0c921d25-6869-4525-a247-8aad23500b54" } },
    update: { 
        isCompleted: true,
        updatedAt: new Date("2025-05-30T13:48:34.594Z")
      },
    create: {
      id: "ba9746da-3b41-4e86-b5a8-bff2399e2070",
      userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8",
      chapterId: "0c921d25-6869-4525-a247-8aad23500b54",
      isCompleted: true,
      createdAt: new Date("2025-05-30T13:48:34.594Z"),
      updatedAt: new Date("2025-05-30T13:48:34.594Z")
    }
  });

  await prisma.userProgress.upsert({
    where: { userId_chapterId: { userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8", chapterId: "82e3038c-5532-4ff7-af2c-88253c90e7d9" } },
    update: { 
        isCompleted: true,
        updatedAt: new Date("2025-05-30T18:04:42.854Z")
      },
    create: {
      id: "e7e28be1-e555-4191-a6ea-17a72d41fa42",
      userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8",
      chapterId: "82e3038c-5532-4ff7-af2c-88253c90e7d9",
      isCompleted: true,
      createdAt: new Date("2025-05-30T18:04:42.854Z"),
      updatedAt: new Date("2025-05-30T18:04:42.854Z")
    }
  });

  await prisma.userProgress.upsert({
    where: { userId_chapterId: { userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8", chapterId: "625e7ef0-1020-46eb-a2ab-37fc7e9f30ef" } },
    update: { 
        isCompleted: true,
        updatedAt: new Date("2025-05-30T18:05:09.935Z")
      },
    create: {
      id: "03c5a0ce-7663-4156-ac93-9a63ae31ad7c",
      userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8",
      chapterId: "625e7ef0-1020-46eb-a2ab-37fc7e9f30ef",
      isCompleted: true,
      createdAt: new Date("2025-05-30T18:05:09.935Z"),
      updatedAt: new Date("2025-05-30T18:05:09.935Z")
    }
  });

  await prisma.userProgress.upsert({
    where: { userId_chapterId: { userId: "user_2y08non2WNf86CbHjg8MRP5vcTt", chapterId: "dd708656-3eeb-4d0d-af2c-14f6114075c5" } },
    update: { 
        isCompleted: true,
        updatedAt: new Date("2025-06-04T20:29:06.932Z")
      },
    create: {
      id: "651bec2f-5dc8-4bea-ae0f-9f3f06e0bbca",
      userId: "user_2y08non2WNf86CbHjg8MRP5vcTt",
      chapterId: "dd708656-3eeb-4d0d-af2c-14f6114075c5",
      isCompleted: true,
      createdAt: new Date("2025-06-04T20:29:06.932Z"),
      updatedAt: new Date("2025-06-04T20:29:06.932Z")
    }
  });

  await prisma.userProgress.upsert({
    where: { userId_chapterId: { userId: "user_2y08non2WNf86CbHjg8MRP5vcTt", chapterId: "ae9c036c-8684-4b4a-8399-5fe913225a58" } },
    update: { 
        isCompleted: true,
        updatedAt: new Date("2025-06-04T20:41:34.494Z")
      },
    create: {
      id: "3db77012-11f3-4240-8a2b-27d6f9364528",
      userId: "user_2y08non2WNf86CbHjg8MRP5vcTt",
      chapterId: "ae9c036c-8684-4b4a-8399-5fe913225a58",
      isCompleted: true,
      createdAt: new Date("2025-06-04T20:28:56.209Z"),
      updatedAt: new Date("2025-06-04T20:41:34.494Z")
    }
  });

  await prisma.userProgress.upsert({
    where: { userId_chapterId: { userId: "user_2y08non2WNf86CbHjg8MRP5vcTt", chapterId: "d5391852-41c5-4616-815e-73a9ee124b6f" } },
    update: { 
        isCompleted: true,
        updatedAt: new Date("2025-06-04T20:41:38.088Z")
      },
    create: {
      id: "83fc6eef-bcce-4845-b12f-10396e9b108e",
      userId: "user_2y08non2WNf86CbHjg8MRP5vcTt",
      chapterId: "d5391852-41c5-4616-815e-73a9ee124b6f",
      isCompleted: true,
      createdAt: new Date("2025-06-04T20:41:38.088Z"),
      updatedAt: new Date("2025-06-04T20:41:38.088Z")
    }
  });

  await prisma.userProgress.upsert({
    where: { userId_chapterId: { userId: "user_2y08non2WNf86CbHjg8MRP5vcTt", chapterId: "0196e78f-6b3d-4975-9e98-cf0035753d89" } },
    update: { 
        isCompleted: true,
        updatedAt: new Date("2025-06-04T20:41:44.353Z")
      },
    create: {
      id: "3b92250a-3d3b-4909-9b28-d434f13c1c92",
      userId: "user_2y08non2WNf86CbHjg8MRP5vcTt",
      chapterId: "0196e78f-6b3d-4975-9e98-cf0035753d89",
      isCompleted: true,
      createdAt: new Date("2025-06-04T20:41:44.353Z"),
      updatedAt: new Date("2025-06-04T20:41:44.353Z")
    }
  });

  await prisma.userProgress.upsert({
    where: { userId_chapterId: { userId: "user_2y08non2WNf86CbHjg8MRP5vcTt", chapterId: "82e3038c-5532-4ff7-af2c-88253c90e7d9" } },
    update: { 
        isCompleted: true,
        updatedAt: new Date("2025-06-04T20:43:17.003Z")
      },
    create: {
      id: "62d524fa-0730-4144-b3b2-7d5eb1fd186f",
      userId: "user_2y08non2WNf86CbHjg8MRP5vcTt",
      chapterId: "82e3038c-5532-4ff7-af2c-88253c90e7d9",
      isCompleted: true,
      createdAt: new Date("2025-06-04T20:43:17.003Z"),
      updatedAt: new Date("2025-06-04T20:43:17.003Z")
    }
  });

  // --- StripeCustomer ---
  await prisma.stripeCustomer.upsert({
    where: { userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8" },
    update: { 
        stripeCustomerId: "cus_SPHtMxDfH6hDTq",
        updatedAt: new Date("2025-05-30T13:49:45.044Z")
      },
    create: {
      id: "7563b239-616a-4674-9945-c84f5eeadf65",
      userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8",
      stripeCustomerId: "cus_SPHtMxDfH6hDTq",
      createdAt: new Date("2025-05-30T13:49:45.044Z"),
      updatedAt: new Date("2025-05-30T13:49:45.044Z")
    }
  });

  await prisma.stripeCustomer.upsert({
    where: { userId: "user_2y08non2WNf86CbHjg8MRP5vcTt" },
    update: { 
        stripeCustomerId: "cus_SQnGCY835DxCYB",
        updatedAt: new Date("2025-06-03T14:18:59.539Z")
      },
    create: {
      id: "023c7da5-4682-41ed-af00-7f017f36c550",
      userId: "user_2y08non2WNf86CbHjg8MRP5vcTt",
      stripeCustomerId: "cus_SQnGCY835DxCYB",
      createdAt: new Date("2025-06-03T14:18:59.539Z"),
      updatedAt: new Date("2025-06-03T14:18:59.539Z")
    }
  });

  // --- Purchases ---
  await prisma.purchase.upsert({
    where: { userId_courseId: { userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8", courseId: "9a29e2eb-0482-4836-b411-4dc6f7eff592" } },
    update: { // Define qué actualizar si la compra ya existe
        price: 0, // price es Float en Purchase
        updatedAt: new Date("2025-05-30T13:48:23.250Z")
      },
    create: {
      id: "a33415e9-28c3-4fd9-bf25-5b75584d7666",
      userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8",
      courseId: "9a29e2eb-0482-4836-b411-4dc6f7eff592",
      price: 0,
      createdAt: new Date("2025-05-30T13:48:23.250Z"),
      updatedAt: new Date("2025-05-30T13:48:23.250Z")
    }
  });

  await prisma.purchase.upsert({
    where: { userId_courseId: { userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8", courseId: "da89ecdd-45a0-405b-b3bb-8483c44eea69" } },
    update: { // Define qué actualizar si la compra ya existe
        price: 37.99, // price es Float en Purchase
        updatedAt: new Date("2025-05-30T17:55:12.702Z")
      },
    create: {
      id: "8703bab0-5e35-43cd-9859-3b96d3b47d42",
      userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8",
      courseId: "da89ecdd-45a0-405b-b3bb-8483c44eea69",
      price: 37.99,
      createdAt: new Date("2025-05-30T17:55:12.702Z"),
      updatedAt: new Date("2025-05-30T17:55:12.702Z")
    }
  });

  await prisma.purchase.upsert({
    where: { userId_courseId: { userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8", courseId: "c2af7821-60b5-4100-8bc0-32e48496c311" } },
    update: { // Define qué actualizar si la compra ya existe
        price: 13.99, // price es Float en Purchase
        updatedAt: new Date("2025-05-30T18:04:31.818Z")
      },
    create: {
      id: "6f94d7ce-58ea-458b-be83-8ef18763647f",
      userId: "user_2x8QwR3VzyN7AnWmyHgnjMeW3b8",
      courseId: "c2af7821-60b5-4100-8bc0-32e48496c311",
      price: 13.99,
      createdAt: new Date("2025-05-30T18:04:31.818Z"),
      updatedAt: new Date("2025-05-30T18:04:31.818Z")
    }
  });

  await prisma.purchase.upsert({
    where: { userId_courseId: { userId: "user_2y08non2WNf86CbHjg8MRP5vcTt", courseId: "c2af7821-60b5-4100-8bc0-32e48496c311" } },
    update: { // Define qué actualizar si la compra ya existe
        price: 13.99, // price es Float en Purchase
        updatedAt: new Date("2025-06-03T14:31:15.502Z")
      },
    create: {
      id: "2a10e09b-3176-4faf-8394-5cc5b38bfad3",
      userId: "user_2y08non2WNf86CbHjg8MRP5vcTt",
      courseId: "c2af7821-60b5-4100-8bc0-32e48496c311",
      price: 13.99,
      createdAt: new Date("2025-06-03T14:31:15.502Z"),
      updatedAt: new Date("2025-06-03T14:31:15.502Z")
    }
  });

  await prisma.purchase.upsert({
    where: { userId_courseId: { userId: "user_2y08non2WNf86CbHjg8MRP5vcTt", courseId: "da89ecdd-45a0-405b-b3bb-8483c44eea69" } },
    update: { // Define qué actualizar si la compra ya existe
        price: 37.99, // price es Float en Purchase
        updatedAt: new Date("2025-06-04T20:28:39.243Z")
      },
    create: {
      id: "8ab15f86-9cac-401d-a3f0-14d34fdc1214",
      userId: "user_2y08non2WNf86CbHjg8MRP5vcTt",
      courseId: "da89ecdd-45a0-405b-b3bb-8483c44eea69",
      price: 37.99,
      createdAt: new Date("2025-06-04T20:28:39.243Z"),
      updatedAt: new Date("2025-06-04T20:28:39.243Z")
    }
  });

  console.log(`Seeding finished.`);
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
