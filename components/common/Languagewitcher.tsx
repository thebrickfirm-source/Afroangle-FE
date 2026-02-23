"use client";

import { usePathname, useRouter } from "next/navigation";

const locales = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (targetLocale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${targetLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map(({ code, label }, index) => (
        <span key={code} className="flex items-center gap-2">
          <button
            onClick={() => switchLocale(code)}
            disabled={currentLocale === code}
            className={`font-secondary transition-opacity ${
              currentLocale === code
                ? "text-white opacity-100"
                : "text-white/60 hover:text-white opacity-60 hover:opacity-100"
            }`}
          >
            {label}
          </button>
          {index < locales.length - 1 && (
            <span className="text-white/30 text-sm">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
