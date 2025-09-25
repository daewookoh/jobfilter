"use client";

import { useState } from "react";
import { useAuth } from "~/lib/auth/useAuth";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white transition-colors hover:text-purple-300"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
          <span className="text-sm font-semibold text-white">
            {user.email?.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="hidden sm:block">{user.email}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/20 bg-white/10 py-2 shadow-xl backdrop-blur-sm">
          <div className="border-b border-white/20 px-4 py-2">
            <p className="text-sm font-medium text-white">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-left text-white transition-colors hover:bg-white/20"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
