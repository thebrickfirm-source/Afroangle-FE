import {
  DocumentIcon,
  ComposeIcon,
  ThListIcon,
  ImageIcon,
} from "@sanity/icons";
import { defineType, defineField } from "sanity";
import { GenerateAudioInput } from "@/components/common/GenerateAudio";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "content", title: "Content", icon: ComposeIcon },
    { name: "meta", title: "Meta & SEO", icon: ThListIcon },
    { name: "media", title: "Media", icon: ImageIcon },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      group: "meta",
      to: [{ type: "author" }],
      options: { disableNew: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Body Content",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        { type: "videoEmbed" },
        // Added: Flexible Social Embed
        {
          type: "object",
          name: "socialEmbed",
          title: "Social Media Post",
          fields: [
            defineField({
              name: "url",
              type: "url",
              title: "Post URL",
              description: "Paste link from X (Twitter), Instagram, etc.",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "mainImage",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption/Alt Text",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "audio",
      type: "file",
      group: "media",
      components: { input: GenerateAudioInput },
      options: { accept: "audio/mpeg" },
    }),
    defineField({
      name: "categories",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
});
