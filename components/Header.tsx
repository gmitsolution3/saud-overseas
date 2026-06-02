"use client";

import { Button } from "@/components/ui/button";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Countries", href: "#countries" },
  { label: "Success Stories", href: "#stories" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

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
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className={`flex items-center gap-2`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">
            V
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Visora<span className="text-primary">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary-soft"
            asChild
          >
            <a href="tel:+10000000000">
              <Phone className="mr-2 h-4 w-4" /> Call Us
            </a>
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <a href="#contact">Free Consultation</a>
          </Button>
        </div>

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
      </nav>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden border-t border-border bg-background transition-[max-height] duration-300 ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-border">
            <Button
              variant="outline"
              className="w-full border-primary text-primary"
              asChild
            >
              <a href="tel:+10000000000">
                <Phone className="mr-2 h-4 w-4" /> Call Us
              </a>
            </Button>
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
