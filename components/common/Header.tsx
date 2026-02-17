import Image from "next/image";
import Link from "next/link";
import NewsletterModal from "./NewsLetterSignUp";
const Header = () => {
  return (
    <header className="font-secondary border-b border-black/30">
      <div className="mx-auto lg:px-8 px-4 py-2 lg:py-6 max-w-screen-xl flex justify-between lg:items-end items-center">
        <div className="flex lg:items-end items-center lg:gap-3">
          <Link href={"/"}>
            <Image
              src="/afroangle-logo.svg"
              alt="Afroangle Logo"
              className="w-30 lg:w-auto"
              width={150}
              height={30}
              priority
            />
          </Link>
          <p className="mb-3 hidden lg:inline-block">
            The African lens for all global issues
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/en/about#submit-piece"
            className="lg:inline-block hidden cursor-pointer group"
          >
            <span className="block slant-bottom-right p-px bg-primary-green">
              <span className="block slant-bottom-right py-4 pr-8 pl-6 leading-none bg-white text-primary-green font-secondary transition-colors group-hover:bg-primary-green group-hover:text-white">
                Submit an Opinion Piece
              </span>
            </span>
          </Link>
          <NewsletterModal />
        </div>
      </div>
    </header>
  );
};
export default Header;
