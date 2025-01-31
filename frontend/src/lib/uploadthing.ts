import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
 
const f = createUploadthing();
 
export const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await getServerSession();
      if (!session) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof uploadRouter;