import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import ReactPlayer from "react-player";
import SocialEmbedWrapper from "./SocialEmbedWrapper";
export const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <figure className="my-4 lg:my-6 w-full flex flex-col items-center">
          {/* Image Container */}
          <div className="relative w-full h-80 lg:h-112 overflow-hidden">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || "Article Image"}
              fill
              className="object-contain" // object-contain is best for keeping aspect ratio visible
              sizes="(max-width: 1024px) 100vw, 800px" // Improves performance/LCP
            />
          </div>

          {/* Caption */}
          {value.alt && (
            <figcaption className="mt-1 w-full max-w-3xl px-4 font-secondary text-sm text-center text-gray-700 leading-relaxed capitalize">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
    videoUpload: ({ value }) => {
      const { url, videoFileUrl } = value;
      const source = url || videoFileUrl;

      if (!source) return null;

      return (
        <div className="my-4 lg:my-6 w-full overflow-hidden items-center flex aspect-video shadow-md rounded-md">
          <ReactPlayer
            src={source}
            width="100%"
            height="100%"
            controls
            light={false} // Set to true if you want a thumbnail placeholder
          />
        </div>
      );
    },
    socialMediaPost: ({ value }) => {
      return <SocialEmbedWrapper url={value.url} />;
    },
  },

  // 1. Customizing Block types (Headers, Paragraphs)
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-10 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-6 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 py-1 italic my-5">
        {children}
      </blockquote>
    ),
  },

  // 2. Customizing List types
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-10 space-y-2 my-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-10 space-y-2 my-4">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};
