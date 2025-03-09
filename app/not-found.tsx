import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function NotFoundAlternative() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[180px] font-bold text-gray-100">404</div>
          </div>
          <div className="relative z-10 h-40 flex items-center justify-center">
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-medium">Oops!</span>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-medium text-gray-900 mb-2">
          Page not found
        </h2>
        <p className="text-gray-500 mb-8">
          We couldn't find the page you're looking for.
        </p>

        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
          <Link href="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFoundAlternative;
