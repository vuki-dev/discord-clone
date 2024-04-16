import { getUserServerSide } from "@/lib/server-side-utils";
import { UserType } from "@/lib/types";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const auth = async () => {
    const { id } = await getUserServerSide();

    if(!id) throw new Error("Unauthorized");

    return { userId: id};
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    serverImage: f({ image: {maxFileSize: "4MB", maxFileCount: 1} })
        .middleware(()=> auth())
        .onUploadComplete(()=>{}),
    messageFile: f(["image", "pdf"])
        .middleware(()=> auth())
        .onUploadComplete(()=>{})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;