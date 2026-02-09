import { defineType, defineField } from "sanity";

export const socialLinkType = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "X (Twitter)", value: "x" },
          { title: "Instagram", value: "instagram" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Facebook", value: "facebook" },
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
          { title: "Website", value: "website" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: { platform: "platform", url: "url" },
    prepare({ platform, url }) {
      return { title: platform, subtitle: url };
    },
  },
});
