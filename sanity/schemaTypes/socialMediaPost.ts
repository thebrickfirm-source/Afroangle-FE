// schemaTypes/twitterEmbed.ts
import { defineField, defineType } from "sanity";

export const socialMediaPost = defineType({
  type: "object",
  name: "socialMediaPost",
  title: "Social Media Post",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "Post URL",
      description: "Paste link from X (Twitter), Instagram, etc.",
    }),
  ],
});
