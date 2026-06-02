"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config";
import { Mail, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-background transition-all duration-300 ${
        scrolled
          ? "shadow-[var(--shadow-nav)] border-b border-border"
          : "border-b border-transparent"
      }`}
    >
      {/* Header Top Section */}
      <div
        className={`border-b border-border transition-all duration-300 ${
          scrolled ? "py-1.5" : "py-2"
        }`}
      >
        <div className="container mx-auto flex items-center justify-end gap-6 px-4 sm:px-6 lg:px-8">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{siteConfig.contact.phone}</span>
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>{siteConfig.contact.email}</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={siteConfig.company.logoUrl}
            alt={siteConfig.company.name}
            width={150}
            height={150}
            className="w-20 h-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-3">
          <ul className="hidden items-center gap-7 lg:flex me-8">
            {siteConfig.navigation.main.map(
              (link: { label: string; href: string }) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>

          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <a href="#contact">Free Consultation</a>
          </Button>

          <button
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
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
        className={`lg:hidden overflow-hidden border-t border-border bg-background transition-[max-height] duration-300 ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          {siteConfig.navigation.main.map(
            (link: { label: string; href: string }) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {link.label}
              </a>
            ),
          )}
          <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-border">
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a href="#contact" onClick={() => setOpen(false)}>
                Free Consultation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
