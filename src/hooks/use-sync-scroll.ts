import { useEffect } from "react";

type Options = {
  editorSelector?: string;
  previewSelector?: string;
  /** when this changes, re-bind in case DOM was replaced */
  rebindKey?: unknown;
};

/**
 * Proportional bidirectional scroll sync between the markdown editor and the
 * rendered preview. Locks the destination briefly so the listeners don't echo.
 *
 * useSyncScroll({ rebindKey: activePath });
 */
export function useSyncScroll({
  editorSelector = ".mdv-editor .cm-scroller",
  previewSelector = ".mdv-preview",
  rebindKey,
}: Options = {}): void {
  useEffect(() => {
    let editor: HTMLElement | null = null;
    let preview: HTMLElement | null = null;
    let rafId: number | undefined;
    let lockUntil = 0;

    const sync = (src: HTMLElement, dst: HTMLElement) => () => {
      if (performance.now() < lockUntil) return;
      const srcRange = src.scrollHeight - src.clientHeight;
      const dstRange = dst.scrollHeight - dst.clientHeight;
      if (srcRange <= 0 || dstRange <= 0) return;
      const ratio = src.scrollTop / srcRange;
      lockUntil = performance.now() + 60;
      dst.scrollTop = ratio * dstRange;
    };

    let onEditor: (() => void) | undefined;
    let onPreview: (() => void) | undefined;

    const tryAttach = () => {
      editor = document.querySelector<HTMLElement>(editorSelector);
      preview = document.querySelector<HTMLElement>(previewSelector);
      if (!editor || !preview) {
        rafId = requestAnimationFrame(tryAttach);
        return;
      }
      onEditor = sync(editor, preview);
      onPreview = sync(preview, editor);
      editor.addEventListener("scroll", onEditor, { passive: true });
      preview.addEventListener("scroll", onPreview, { passive: true });
    };

    tryAttach();

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      if (editor && onEditor) editor.removeEventListener("scroll", onEditor);
      if (preview && onPreview) preview.removeEventListener("scroll", onPreview);
    };
  }, [editorSelector, previewSelector, rebindKey]);
}
