import { defineType, defineField } from "sanity";

export const videoUpload = defineType({
  name: "videoUpload",
  type: "object",
  title: "Video / YouTube",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "External Video URL",
      description: "Use this for YouTube, etc.",
      hidden: ({ parent }) => !!parent?.videoFile, // Hides if file is present
    }),
    defineField({
      name: "videoFile",
      type: "file",
      title: "Direct Video Upload",
      description: "Upload an MP4 or WebM file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => !!parent?.url, // Hides if URL is present
    }),
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (fields?.url && fields?.videoFile) {
        return "Please provide either a URL or a File, not both.";
      }
      return true;
    }),
});
