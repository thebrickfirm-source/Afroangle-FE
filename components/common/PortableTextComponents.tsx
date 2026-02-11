import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image"; // Ensure you have this helper
import ReactPlayer from "react-player";
import { Tweet } from "react-tweet";

export const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <>
          <div className="relative w-full h-100 my-4">
            {/* Uses Next.js Image for optimization */}
            <Image
              src={urlFor(value).url()}
              alt={value.alt || "Article Image"}
              fill
              className="object-contain w-full"
            />
          </div>
          <p className="mt-3 w-full font-secondary text-sm text-center capitalize">
            {value.alt}
          </p>
        </>
      );
    },
    videoUpload: ({ value }) => {
      const { url, videoFileUrl } = value;
      const source = url || videoFileUrl;

      if (!source) return null;

      return (
        <div className="my-10 w-full overflow-hidden rounded-xl bg-black aspect-video shadow-md">
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
      const { url } = value;
      if (!url) return null;

      // Extract ID for Twitter/X
      if (url.includes("twitter.com") || url.includes("x.com")) {
        const id = url.split("/").pop()?.split("?")[0];
        return (
          <div className="flex justify-center my-6" data-theme="light">
            <Tweet id={id as string} />
          </div>
        );
      }
      // Fallback for other links
      return (
        <a href={url} target="_blank" className="text-blue-500 italic">
          View external post
        </a>
      );
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
