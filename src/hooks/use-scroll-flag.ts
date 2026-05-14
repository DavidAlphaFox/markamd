import { useEffect } from "react";

/**
 * Mount once near the app root. Listens to scroll events globally and
 * adds an `is-scrolling` class to whichever element fired the event,
 * removing it after a short idle window.
 *
 * Pairs with CSS:
 *   ::-webkit-scrollbar-thumb { background: transparent; transition: ... }
 *   .is-scrolling::-webkit-scrollbar-thumb { background: ... }
 *
 * Result: every scroll container in the app gets macOS-style auto-hide
 * scrollbars with no per-element wiring.
 */
export function useGlobalScrollFlag(idleMs = 800): void {
  useEffect(() => {
    const timers = new WeakMap<Element, number>();

    const onScroll = (e: Event) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      target.classList.add("is-scrolling");
      const prev = timers.get(target);
      if (prev != null) window.clearTimeout(prev);
      timers.set(
        target,
        window.setTimeout(() => {
          target.classList.remove("is-scrolling");
        }, idleMs),
      );
    };

    // capture phase so we catch every scroll regardless of stopPropagation
    document.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("scroll", onScroll, true);
    };
  }, [idleMs]);
}
