import { useEffect, useRef, useState } from "react";
import { profile } from "../data/site";

/** Copies the contact email; returns [copied, copy]. Falls back to mailto. */
export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return [copied, copy];
}
