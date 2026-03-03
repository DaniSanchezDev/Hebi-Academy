import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ metadata }) => {
    return { uploadedBy: metadata };
  }),
  // endpoint de chapter video para uploadthing
  chapterVideo: f({
    video: {
      maxFileSize: "512GB",
      maxFileCount: 1,
    },
  }).onUploadComplete(({ file }) => {
    return { file: file.ufsUrl };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
