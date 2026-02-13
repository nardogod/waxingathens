import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-apple-bg flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold text-apple-text mb-2">404</h1>
      <p className="text-apple-text-secondary mb-6">Page not found.</p>
      <Link
        href="/en"
        className="px-6 py-3 bg-apple-accent text-white rounded-apple font-medium"
      >
        Go to Waxing Athens
      </Link>
    </div>
  );
}
