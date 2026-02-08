import { UserIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        // Ensures uniqueness for this document type
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Profile image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required().min(5),
        }),
      ],
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(20),
    }),

    // Scalable socials field
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [{ type: "socialLink" }],
      validation: (Rule) => Rule.unique().max(10),
      description: "Add the platforms this Author is active.",
    }),
  ],
});
