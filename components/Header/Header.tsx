"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for background
      setScrolled(currentScrollY > 8);

      // Hide top bar when scrolling down, show when scrolling up or at top
      if (currentScrollY > 50) {
        // Scrolling down & past 50px - hide top bar
        setShowTopBar(false);
      } else {
        // Scrolling up - show top bar
        setShowTopBar(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-[var(--shadow-nav)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Header Top Section - Hidden when scrolling down */}
      <HeaderTop scrolled={scrolled} showTopBar={showTopBar} />

      {/* Main Navigation */}
      <nav
        className={`container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 ${scrolled ? "-translate-y-3" : ""}`}
      >
        <Link href="/" className="flex items-center gap-2">
          {scrolled ? (
            <Image
              src={siteConfig.company.logoUrl}
              alt={siteConfig.company.name}
              width={150}
              height={150}
              className="w-20 h-auto object-contain"
            />
          ) : (
            <Image
              src={siteConfig.company.logoUrl}
              alt={siteConfig.company.name}
              width={150}
              height={150}
              className="w-20 h-auto object-contain brightness-0 invert"
            />
          )}
        </Link>

        <div className="flex items-center gap-3">
          <ul className="hidden items-center gap-7 lg:flex me-8">
            {siteConfig.navigation.main.map(
              (link: { label: string; href: string }) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      scrolled
                        ? "text-muted-foreground hover:text-primary"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <Button
            className={`hidden lg:inline-flex transition-all duration-300 ${
              scrolled
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-white text-primary hover:bg-white/90"
            }`}
            asChild
          >
            <Link href="#contact">Free Consultation</Link>
          </Button>

          <button
            aria-label="Toggle menu"
            className={`grid h-10 w-10 place-items-center rounded-md border transition-all duration-300 lg:hidden ${
              scrolled
                ? "border-border text-foreground"
                : "border-white/30 text-white hover:border-white/50"
            }`}
            onClick={() => setOpen((s) => !s)}
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-md transition-[max-height] duration-300 ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          {siteConfig.navigation.main.map(
            (link: { label: string; href: string }) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ),
          )}
          <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-border">
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="#contact" onClick={() => setOpen(false)}>
                Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
