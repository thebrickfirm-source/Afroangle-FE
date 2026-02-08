import {
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa6"; // Note: FaXTwitter is often in fa6

const PLATFORM_MAP = {
  x: { label: "X", Icon: FaXTwitter },
  instagram: { label: "Instagram", Icon: FaInstagram },
  linkedin: { label: "LinkedIn", Icon: FaLinkedinIn },
  facebook: { label: "Facebook", Icon: FaFacebookF },
  youtube: { label: "YouTube", Icon: FaYoutube },
  tiktok: { label: "TikTok", Icon: FaTiktok },
  website: { label: "Website", Icon: FaGlobe },
};

const SocialLink = ({ platform, url }) => {
  // Find the platform data; default to 'website' if not found
  const platformData =
    PLATFORM_MAP[platform.toLowerCase()] || PLATFORM_MAP.website;
  const { Icon, label } = platformData;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit our ${label} page`}
      className="social-icon-link"
    >
      <Icon size={24} title={label} />
    </a>
  );
};

export default SocialLink;
