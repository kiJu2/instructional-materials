import React from "react";
import Link from "next/link";
import { useAuth } from "../contexts/auth.context";
import { useRouter } from "next/router";

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const hideHeader = router.pathname.startsWith("/auth");

  // if (hideHeader) return null;

  return (
    <nav className="bg-neutral-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          MyApp
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-white">
            Home
          </Link>
          <Link href="/auth" className="text-white">
            Auth
          </Link>
          {user && (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
