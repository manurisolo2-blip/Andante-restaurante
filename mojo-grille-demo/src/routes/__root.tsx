import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { generateRestaurantSchema, generateMenuSchema } from "../lib/seo";
import { locationsList } from "../data/locations";
import { categories, menu } from "../data/menu";
import { SmoothScroll } from "../components/mojo/SmoothScroll";
import { NoiseOverlay } from "../components/mojo/NoiseOverlay";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Andante Restaurante Bar | Bistró Contemporáneo & Coctelería en Palermo Hollywood" },
      {
        name: "description",
        content:
          "Bistró contemporáneo, cafetería de especialidad, alta gastronomía estacional con opciones Sin TACC garantizadas, coctelería de autor y ciclos de jazz en Palermo Hollywood, Buenos Aires.",
      },
      {
        name: "keywords",
        content:
          "Andante Restaurante Bar, bistró Palermo Hollywood, restaurante Arévalo 1677, cafetería de especialidad CABA, menú Sin TACC CABA, coctelería de autor Buenos Aires, jazz en vivo Palermo, cava de vinos Palermo",
      },
      { name: "theme-color", content: "#0E1726" },
      { name: "author", content: "Andante Restaurante Bar" },

      // OpenGraph Metadata
      { property: "og:title", content: "Andante Restaurante Bar | Bistró Contemporáneo & Coctelería en Palermo Hollywood" },
      {
        property: "og:description",
        content:
          "Bistró contemporáneo, cafetería de especialidad, alta gastronomía estacional con opciones Sin TACC garantizadas, coctelería de autor y ciclos de jazz en Palermo Hollywood, Buenos Aires.",
      },
      { property: "og:url", content: "https://andantebar.com.ar/" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Andante Restaurante Bar" },
      { property: "og:locale", content: "es_AR" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:image", content: "https://andantebar.com.ar/og-image.jpg" },
      {
        property: "og:image:alt",
        content: "Andante Restaurante Bar - Bistró Contemporáneo en Palermo Hollywood",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },

      // Twitter Card Metadata
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Andante Restaurante Bar | Bistró Contemporáneo en Palermo Hollywood" },
      {
        name: "twitter:description",
        content:
          "Alta gastronomía estacional con opciones Sin TACC garantizadas, coctelería de autor y ciclos de jazz en Palermo Hollywood.",
      },
      { name: "twitter:image", content: "https://andantebar.com.ar/og-image.jpg" },
      { name: "twitter:image:alt", content: "Andante Restaurante Bar Palermo Hollywood" },

      // Local Geo Meta for Palermo Hollywood, Buenos Aires
      { name: "geo.region", content: "AR-C" },
      { name: "geo.placename", content: "Palermo Hollywood, Buenos Aires, Argentina" },
      { name: "geo.position", content: "-34.5815;-58.4372" },
      { name: "ICBM", content: "-34.5815, -58.4372" },
    ],
    links: [
      { rel: "canonical", href: "https://andantebar.com.ar/" },
      { rel: "alternate", href: "https://andantebar.com.ar/", hrefLang: "x-default" },
      { rel: "alternate", href: "https://andantebar.com.ar/", hrefLang: "es-ar" },
      { rel: "alternate", href: "https://andantebar.com.ar/", hrefLang: "en-us" },
      {
        rel: "preload",
        href: "/fonts/spot-normal.otf",
        as: "font",
        type: "font/otf",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/Clarkson.ttf",
        as: "font",
        type: "font/ttf",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const schemaOrgGraph = {
    "@context": "https://schema.org",
    "@graph": [
      ...locationsList.map((loc) => generateRestaurantSchema(loc)),
      generateMenuSchema(categories, menu),
    ],
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgGraph) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <NoiseOverlay />
      <SmoothScroll>
        <Outlet />
      </SmoothScroll>
    </QueryClientProvider>
  );
}
