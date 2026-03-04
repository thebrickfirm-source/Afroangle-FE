import { createClient } from "next-sanity";
/* ===========================
   Sanity client
=========================== */
export const sanityUploadClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-26",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});
