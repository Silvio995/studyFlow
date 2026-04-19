"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { applyTheme, getStoredTheme, saveTheme, ThemeMode } from "@/lib/storage";

const links = [
  { href: "/", label: "Home" },
  { href: "/tasks", label: "Tasks" },
  { href: "/subjects", label: "Subjects" },
  { href: "/about", label: "About" },
];

const isActive = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export function SiteNav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<ThemeMode>(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const onToggleTheme = () => {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    saveTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <header className="app-header sticky top-0 z-40">
      <nav className="main-shell py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-main md:text-xl">
            StudyFlow
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-1.5">
            <ul className="flex flex-wrap items-center justify-end gap-1.5">
              {links.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`nav-link ${active ? "nav-link-active" : ""}`}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={onToggleTheme}
              className="button-secondary text-sm"
              aria-label="Toggle theme"
            >
              Toggle Theme
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
