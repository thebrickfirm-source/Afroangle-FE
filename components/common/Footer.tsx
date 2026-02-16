import Image from "next/image";
import Link from "next/link";
import NewsletterModal from "./NewsLetterSignUp";

// --- Types for our link structure ---
type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

// --- Data Configuration ---
const footerSections: FooterSection[] = [
  {
    title: "About",
    links: [
      { label: "About Afroangle", href: "/about" },
      // { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "X", href: "https://x.com/theafroangle?s=11" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/afroangle/",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61586718135148&mibextid=wwXIfr",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/afroangle1?igsh=emxhcjZ2YXcwM2Fl",
      },
    ],
  },
  {
    title: "Contact",
    links: [
      // { label: "Help Center", href: "/help" },
      {
        label: "Send us an email",
        href: "mailto:editorial@afroangle.com",
      },

      { label: "Submit an Opinion Piece", href: "/submit" },
    ],
  },
  {
    title: "Subscription",
    links: [
      // { label: "Purchase", href: "/purchase" },
      // { label: "Give a Gift", href: "/gift" },
      // { label: "Manage Subscription", href: "/account" },
      // { label: "Group Subscriptions", href: "/groups" },
      // { label: "Afroangle Editions", href: "/editions" },
      { label: "Monthly digest", href: "/digest" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#406755] mt-40 text-white antialiased">
      <div className="max-w-screen-xl mx-auto px-6 pb-9 pt-16 lg:px-8">
        {/* --- Top Section: Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 tracking-[5%]">
          {/* Column 1: Mission Statement (Spans 4 cols on large screens) */}
          <div className="lg:col-span-4 pr-0 lg:pr-12">
            <p className="text-base leading-loose font-light">
              <span className="font-semibold text-lg">Afroangle</span> is an
              editorial platform that covers culture, history, politics,
              history, innovation, the arts and entertainment to showcase
              Africa’s diversity of voices and narratives.
            </p>
          </div>

          {/* Columns 2-5: Dynamic Link Sections (Span 2 cols each) */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h3 className="font-bold text-lg mb-6 tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-200 font-light hover:text-white font-secondary hover:underline decoration-1 underline-offset-4 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- Divider --- */}
        <div className="border-t border-white/20 mb-9"></div>

        {/* --- Bottom Section: Flex Layout --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-4">
          {/* Left: Logo & Tagline */}
          <div className="flex items-center gap-6">
            {/* SVG Logo Approximation */}
            <div className="flex items-center gap-3">
              <Link href={"/"}>
                <Image
                  src="/afroangle_logo_light.svg"
                  alt="Afroangle Logo"
                  className="w-30 lg:w-auto"
                  width={150}
                  height={30}
                  priority
                />
              </Link>
            </div>
            <span className="font-secondary hidden sm:block font-normal">
              The African lens for all global issues
            </span>
          </div>

          {/* Center: Subscribe Button */}
          <div className="w-full lg:w-auto">
            <NewsletterModal
              trigger={
                <button className="bg-primary-green font-secondary py-4 pl-8 pr-6 ring-1 ring-white text-white slant-top-left leading-none">
                  Subscribe to the monthly digest
                </button>
              }
            ></NewsletterModal>
          </div>

          {/* Right: Copyright & Legal */}
          <div className="text-sm text-left lg:text-right leading-relaxed font-light max-w-xl">
            <p>
              Afroangle.com &copy; 2026 The Afroangle Non-profit Organisation.
              All Rights Reserved.
            </p>
            <p className="opacity-90">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
