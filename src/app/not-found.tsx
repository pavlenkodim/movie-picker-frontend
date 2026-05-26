import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center ">
      <div className="text-8xl font-bold">404</div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        className="rounded-full px-5 py-2 mt-5 bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        href="/"
      >
        Go home
      </Link>
    </div>
  );
}
