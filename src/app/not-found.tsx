import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-muted">
      <div className="animate-bounce mb-6">
        <Ghost className="w-20 h-20 text-destructive" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-muted-foreground text-lg mb-6 max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link href="/">
        <Button variant="outline" className="transition hover:scale-105">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
