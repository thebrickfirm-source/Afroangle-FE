import { CommentIcon, ThumbsUpIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const commentType = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      description: "Only approved comments will show on the live site",
      initialValue: true,
    }),
    defineField({
      name: "name",
      title: "name",
      type: "string",
      readOnly: true, // Usually set by the frontend form
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Comment Message",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "article",
      title: "Related Article",
      type: "reference",
      to: [{ type: "article" }],
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: "language",
      type: "string",
      title: "Language",
      readOnly: true,
      hidden: true,
    }),
  ],
  // This section ensures you can see the Article title and Commenter name in the Sanity list
  preview: {
    select: {
      title: "name",
      subtitle: "article.title",
      approved: "approved",
    },
    prepare({ title, subtitle, approved }) {
      return {
        title: `${title || "Anonymous"}`,
        subtitle: `On: ${subtitle || "Unknown Article"}`,
        media: approved ? ThumbsUpIcon : CommentIcon,
      };
    },
  },
});
