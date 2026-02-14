import { FeedbackIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export default defineType({
  name: "opinionPiece",
  title: "Opinion Piece",
  type: "document",
  icon: FeedbackIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "article",
      title: "Content",
      type: "array", // Change from 'blockContent' to 'array'
      of: [
        {
          type: "block",
        },
      ],
    }),
  ],
});
