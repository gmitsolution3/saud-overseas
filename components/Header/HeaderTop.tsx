import { siteConfig } from "@/config";
import { Phone, Mail } from "lucide-react";

export default function HeaderTop({
  scrolled,
  showTopBar,
}: {
  scrolled: boolean;
  showTopBar: boolean;
}) {
  return (
    <div
      className={`border-b border-border transition-all duration-300 ${
        scrolled ? "py-1.5" : "py-2"
      } ${showTopBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} ${
        !scrolled ? "border-white/20" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-end gap-6 px-4 sm:px-6 lg:px-8">
        <a
          href={`tel:${siteConfig.contact.phone}`}
          className={`flex items-center gap-2 text-xs transition-colors ${
            scrolled
              ? "text-muted-foreground hover:text-primary"
              : "text-white/80 hover:text-white"
          }`}
        >
          <Phone className="h-3.5 w-3.5" />
          <span>{siteConfig.contact.phone}</span>
        </a>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className={`flex items-center gap-2 text-xs transition-colors ${
            scrolled
              ? "text-muted-foreground hover:text-primary"
              : "text-white/80 hover:text-white"
          }`}
        >
          <Mail className="h-3.5 w-3.5" />
          <span>{siteConfig.contact.email}</span>
        </a>
      </div>
    </div>
  );
}
