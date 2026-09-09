import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { MotionConfig, LazyMotion, domAnimation } from "framer-motion";

import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/jetbrains-mono/500.css";

import "./app.css";

const siteUrl = "https://abdulazeez.dev";
const siteTitle = "Abdulazeez Badmus — React Developer · Full Stack Engineer";
const siteDesc = "Building products that serve communities. React Developer at Manaknight — Manhaj, Aqua, and systems work in Rust/Tauri.";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={siteDesc} />
        <meta name="theme-color" content="#111110" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDesc} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased">
        <MotionConfig reducedMotion="user">
          <LazyMotion features={domAnimation}>
            <div className="flex min-h-screen flex-1 flex-col">{children}</div>
          </LazyMotion>
        </MotionConfig>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
