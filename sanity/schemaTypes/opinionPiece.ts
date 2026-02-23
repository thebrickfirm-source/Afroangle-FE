import { FileDownload } from "@/components/SanityComponents/FileDownload";
import { defineType, defineField } from "sanity";

export default defineType({
  name: "opinionPiece",
  title: "Opinion Piece Submissions",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Author Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "fileUpload",
      title: "Uploaded Document",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx",
      },
    }),
    defineField({
      name: "downloadButton",
      title: "Review Action",
      type: "string",
      components: {
        field: FileDownload,
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Anonymous Submission",
        subtitle: subtitle || "No email provided",
      };
    },
  },
});
