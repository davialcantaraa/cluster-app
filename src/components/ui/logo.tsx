import Link from "next/link";

export const Logo = () => {
  return (
    <div className="w-full border-b p-3">
      <Link href="/" className="flex gap-2">
        <div className="h-6 w-6 rounded-full bg-black" />
        <p>Cluster</p>
      </Link>
    </div>
  );
};
