import { siteConfig } from "@/config";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "./ui/icons";

export default function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={siteConfig.company.logoUrl}
                alt={siteConfig.company.name}
                width={150}
                height={150}
                className="w-20 h-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-footer-foreground/70">
              {siteConfig.company.slogan}
            </p>
            <div className="mt-5 flex gap-2">
              <Link
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="linkedin"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-footer-foreground/80 transition-colors hover:border-primary hover:text-primary"
              >
                <Linkedin />
              </Link>
              <Link
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="twitter"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-footer-foreground/80 transition-colors hover:border-primary hover:text-primary"
              >
                <Twitter />
              </Link>
              <Link
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="instagram"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-footer-foreground/80 transition-colors hover:border-primary hover:text-primary"
              >
                <Instagram />
              </Link>
              <Link
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="facebook"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-footer-foreground/80 transition-colors hover:border-primary hover:text-primary"
              >
                <Facebook />
              </Link>
            </div>
          </div>

          {siteConfig.footer.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-footer-foreground/70 transition-colors hover:text-primary"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-footer-foreground/60">
            © {new Date().getFullYear()} {siteConfig.company.name}.
            All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-footer-foreground/70">
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
