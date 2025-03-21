import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  audioUploader: f({
    audio: {
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ metadata, file }) => {
    // This code RUNS ON YOUR SERVER after upload
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
