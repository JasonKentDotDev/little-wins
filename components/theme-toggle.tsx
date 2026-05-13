"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <Button aria-label="Loading theme toggle" size="icon" variant="ghost" />;

  const isDark = resolvedTheme === "dark";
  return (
    <Button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      size="icon"
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle cozy theme"
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  );
}
