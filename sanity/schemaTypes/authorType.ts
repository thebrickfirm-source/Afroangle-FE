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
      title: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "caption",
          title: "Caption/Alt Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
