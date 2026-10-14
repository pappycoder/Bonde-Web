import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/**
 * App-store links. Renders nothing until the deployment configures
 * `NEXT_PUBLIC_APP_STORE_URL` / `NEXT_PUBLIC_PLAY_STORE_URL`, so the site never
 * ships a dead download button.
 */
export function StoreButtons() {
  const stores = [
    { label: "App Store", href: siteConfig.links.appStore },
    { label: "Google Play", href: siteConfig.links.playStore },
  ].filter((store) => store.href);

  if (stores.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {stores.map((store) => (
        <Button key={store.label} asChild variant="outline" size="sm">
          <a href={store.href} target="_blank" rel="noreferrer noopener">
            <Download className="size-4" />
            {store.label}
          </a>
        </Button>
      ))}
    </div>
  );
}
