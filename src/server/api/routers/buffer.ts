// import { z } from "zod";
// import { createTRPCRouter, publicProcedure } from "../trpc";
// import { base64ToArrayBuffer } from "~/lib/utils";
// import sharp from "sharp";

// export const bufferRouter = createTRPCRouter({
//   buffer: publicProcedure
//     .input(z.object({ base64: z.string() }))
//     .query(async ({ input }) => {
//       const { base64 } = input;
//       const arrayBuffer = base64ToArrayBuffer(base64);
//       const sharpInstance = sharp(arrayBuffer, { animated: false });
//       const metadata = await sharpInstance.metadata();
//       return metadata;
//     }),
//   get: publicProcedure
//     .input(z.object({ url: z.string().url() }))
//     .query(async ({ input }) => {
//       const { url } = input;
//       try {
//         const request = await fetch(url);
//         const arrayBuffer = await request.arrayBuffer();
//         return arrayBuffer;
//       } catch (e) {
//         throw new Error(String(e));
//       }
//     }),
// });
