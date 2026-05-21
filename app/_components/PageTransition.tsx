"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const FADE_OUT_MS = 300;
const FADE_IN_MS = 150;

/**
 * Route fade — link-interceptor pattern.
 *
 * Why this approach: snapshotting children in state didn't work because
 * Next.js App Router replaces the `children` prop synchronously when a
 * route changes. The OLD page can be unmounted from the React tree before
 * the snapshot logic gets a chance to freeze it.
 *
 * Instead, we intercept link clicks BEFORE `router.push()` fires:
 *
 *   1. User clicks an internal <a>.
 *   2. We preventDefault, store the href, kick off opacity 1 → 0 (300ms).
 *   3. After 300ms, `router.push(href)`. Next.js renders the new route.
 *   4. `usePathname()` changes — we flip opacity 0 → 1 (150ms).
 *
 * During step 2, the OLD page is still mounted (we haven't navigated yet),
 * so the fade-out is on the OLD content. During steps 3-4, the wrapper is
 * already invisible (opacity 0) so the new mount is hidden; once the new
 * page is in the DOM, we fade it back in.
 *
 * Marigolds live OUTSIDE this wrapper (in layout.tsx) so they remain
 * visible across the transition.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [opacity, setOpacity] = useState(1);
  const [fadingOut, setFadingOut] = useState(false);
  const pendingHref = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Intercept link clicks BEFORE next/link's React onClick handler. React
  // attaches its synthetic-event listeners at the root container in the
  // bubble phase, so a plain `document.addEventListener("click", ...)` (also
  // bubble) would run AFTER Link has already called preventDefault +
  // router.push — i.e., the navigation already happened by the time we get
  // the event. Attaching in the CAPTURE phase (third arg `true`) fires our
  // handler first, walking down document → root → target. We then call
  // both preventDefault (stop the browser's native link nav) AND
  // stopPropagation (stop the event from reaching Link's React handler).
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as Element | null;
      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;
      if (href.startsWith("http")) return;
      if (href.startsWith("#")) return;
      if (href.startsWith("mailto:")) return;
      if (href.startsWith("tel:")) return;
      if (link.target === "_blank") return;
      if (link.hasAttribute("download")) return;
      if (href === pathname) return;

      e.preventDefault();
      e.stopPropagation();

      pendingHref.current = href;
      setFadingOut(true);
      setOpacity(0);

      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        const next = pendingHref.current;
        pendingHref.current = null;
        timer.current = null;
        if (next) router.push(next);
      }, FADE_OUT_MS);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router, pathname]);

  // When the new route is on screen (pathname has updated), fade the
  // wrapper back to visible. The new page is already mounted by now,
  // just hidden behind opacity 0.
  useEffect(() => {
    if (fadingOut) {
      setFadingOut(false);
      setOpacity(1);
    }
    // intentionally only re-run on pathname change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      style={{
        opacity,
        transition: `opacity ${fadingOut ? FADE_OUT_MS : FADE_IN_MS}ms ease-in-out`,
        willChange: "opacity",
      }}
    >
      {children}
    </div>
  );
}
