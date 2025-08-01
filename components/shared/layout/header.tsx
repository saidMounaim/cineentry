"use client";

import Link from "next/link";
import React from "react";
import { Film, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import UserDropdown from "../user/user-dropdown";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { data: session } = authClient.useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Cineentry
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            {session ? (
              <UserDropdown />
            ) : (
              <Link href="/sign-in">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
