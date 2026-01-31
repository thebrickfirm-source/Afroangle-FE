import Link from "next/link";

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
      { label: "Our History", href: "/history" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Afroangle Brand Partners", href: "/partners" },
      { label: "Press", href: "/press" },
      { label: "Submit an Opinion Piece", href: "/submit" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Twitter", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Medium", href: "#" },
      { label: "Substack", href: "#" },
      { label: "Afroangle Podcast: Spotify", href: "#" },
    ],
  },
  {
    title: "Subscription",
    links: [
      { label: "Purchase", href: "/purchase" },
      { label: "Give a Gift", href: "/gift" },
      { label: "Manage Subscription", href: "/account" },
      { label: "Group Subscriptions", href: "/groups" },
      { label: "Afroangle Editions", href: "/editions" },
      { label: "Monthly digest", href: "/digest" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#406755] text-white font-serif antialiased">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
        {/* --- Top Section: Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Column 1: Mission Statement (Spans 4 cols on large screens) */}
          <div className="lg:col-span-4 pr-0 lg:pr-12">
            <p className="text-base leading-relaxed text-gray-100">
              <span className="font-bold text-white">
                The Afroangle Publication
              </span>
              believes that great journalism has the power to make each
              reader&apos;s life richer and more fulfilling, and all of society
              stronger and more just.
            </p>
          </div>

          {/* Columns 2-5: Dynamic Link Sections (Span 2 cols each) */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h3 className="font-bold text-lg mb-6 text-white tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-200 hover:text-white hover:underline decoration-1 underline-offset-4 text-sm transition-colors"
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
        <div className="border-t border-white/20 mb-10"></div>

        {/* --- Bottom Section: Flex Layout --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-4">
          {/* Left: Logo & Tagline */}
          <div className="flex items-center gap-6">
            {/* SVG Logo Approximation */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col font-sans font-black leading-none tracking-tighter text-xl">
                <span>AFRO</span>
                <span>ANGLE</span>
              </div>
              <svg
                width="40"
                height="40"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Green Triangle */}
                <path d="M0 50L25 0L50 50H0Z" fill="#00A651" opacity="0.8" />
                {/* Red Circle Ring */}
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="#EF4444"
                  strokeWidth="4"
                />
              </svg>
            </div>

            {/* Vertical Divider (Hidden on mobile) */}
            <div className="hidden sm:block w-px h-10 bg-white/20 mx-2"></div>

            <span className="text-sm font-light text-gray-200 hidden sm:block">
              The African lens for all global issues
            </span>
          </div>

          {/* Center: Subscribe Button */}
          <div className="w-full lg:w-auto">
            <button className="w-full lg:w-auto bg-[#1e4532] hover:bg-[#163626] border border-[#4a725e] text-white px-8 py-3 rounded-sm transition-all shadow-sm text-sm font-medium tracking-wide">
              Subscribe to the daily digest
            </button>
          </div>

          {/* Right: Copyright & Legal */}
          <div className="text-xs text-gray-300 text-left lg:text-right space-y-1 leading-relaxed max-w-md">
            <p>
              Afroangle.com &copy; 2026 The Afroangle Non-profit Organisation.
              All Rights Reserved.
            </p>
            <p className="opacity-80">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
