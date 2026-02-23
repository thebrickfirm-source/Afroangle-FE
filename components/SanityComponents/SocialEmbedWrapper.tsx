"use client";
import {
  InstagramEmbed,
  LinkedInEmbed,
  TikTokEmbed,
  FacebookEmbed,
  XEmbed,
} from "react-social-media-embed";

interface SocialEmbedWrapperProps {
  url: string;
}

const SocialEmbedWrapper = ({ url }: SocialEmbedWrapperProps) => {
  if (!url) return null;
  // 1. Twitter / X (using react-tweet)
  if (url.includes("twitter.com") || url.includes("x.com")) {
    return (
      <div className="flex justify-center my:4 lg:my-6">
        <XEmbed url={url} width={500} />
      </div>
    );
  }

  // 2. Instagram
  if (url.includes("instagram.com")) {
    return (
      <div className="flex justify-center my:4 lg:my-6">
        <InstagramEmbed url={url} width={500} />
      </div>
    );
  }

  // 3. LinkedIn
  if (url.includes("linkedin.com")) {
    return (
      <div className="flex justify-center my:4 lg:my-6">
        <LinkedInEmbed url={url} postUrl={url} width={500} />
      </div>
    );
  }

  // 4. TikTok
  if (url.includes("tiktok.com")) {
    return (
      <div className="flex justify-center my:4 lg:my-6">
        <TikTokEmbed url={url} width={500} />
      </div>
    );
  }

  // 5. Facebook
  if (url.includes("facebook.com")) {
    return (
      <div className="flex justify-center my:4 lg:my-6">
        <FacebookEmbed url={url} width={500} />
      </div>
    );
  }

  // Fallback for unknown links
  return (
    <div className="my:4 lg:my-6 p-4 border border-dashed border-gray-300 rounded-lg text-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-green font-medium hover:underline"
      >
        View external post on
        {new URL(url).hostname.replace("www.", "")}
      </a>
    </div>
  );
};

export default SocialEmbedWrapper;
