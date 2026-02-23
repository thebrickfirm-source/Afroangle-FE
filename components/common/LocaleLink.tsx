// components/common/LocaleLink.tsx
"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type LocaleLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
};

export default function LocaleLink({
  href,
  children,
  className,
  activeClassName,
  ...rest
}: LocaleLinkProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const localizedHref = `/${locale}${href.toString() === "/" ? "" : href.toString().startsWith("/") ? href : `/${href}`}`;
  const isActive = pathname === localizedHref;
  console.log(localizedHref);
  return (
    <Link
      href={localizedHref}
      className={`${className} ${isActive ? activeClassName : ""}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
