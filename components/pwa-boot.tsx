"use client";

import { useServiceWorker } from "@/hooks/use-service-worker";

export function PwaBoot() {
  useServiceWorker();
  return null;
}
