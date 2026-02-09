import ShareButton from "../common/ShareButton";

export default function AuthorNav() {
  return (
    <div className="w-full max-w-screen-xl mx-auto justify-between flex items-center px-4 py-10 lg:pl-24 lg:pr-8">
      <h3 className="text-2xl text-primary-red">WRITER</h3>
      <ShareButton />
    </div>
  );
}
