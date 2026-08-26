"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PracticeAssistant = dynamic(() => import("./PracticeAssistant").then((module) => module.PracticeAssistant), { ssr: false });

export function AssistantLoader() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const browserWindow = window as Window & { requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (browserWindow.requestIdleCallback) {
      const id = browserWindow.requestIdleCallback(() => setReady(true), { timeout: 1800 });
      return () => browserWindow.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(id);
  }, []);
  return ready ? <PracticeAssistant/> : null;
}
