import { useEffect, type RefObject } from "react";
import { EditorSelection } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

function textNodesWithin(root: HTMLElement): Text[] {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest(".mdv-copy")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    },
  );
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) nodes.push(node as Text);
  return nodes;
}

function findTextInDom(root: HTMLElement, text: string): Range | null {
  const needle = text.trim();
  if (!needle) return null;

  const nodes = textNodesWithin(root);
  const fullText = nodes.map((node) => node.textContent ?? "").join("");
  const index = fullText.indexOf(needle);
  if (index < 0) return null;

  let position = 0;
  let startNode: Text | null = null;
  let startOffset = 0;
  let endNode: Text | null = null;
  let endOffset = 0;

  for (const node of nodes) {
    const length = node.textContent?.length ?? 0;
    if (!startNode && position + length > index) {
      startNode = node;
      startOffset = index - position;
    }
    if (!endNode && position + length >= index + needle.length) {
      endNode = node;
      endOffset = index + needle.length - position;
      break;
    }
    position += length;
  }

  if (!startNode || !endNode) return null;
  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  return range;
}

function selectionText(selection: Selection): string {
  return selection.toString().trim();
}

export function useSelectionSyncText(
  viewRef: RefObject<EditorView | null>,
  rebindKey?: unknown,
): void {
  useEffect(() => {
    const onMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const text = selectionText(selection);
      if (!text) return;

      const prose = document.querySelector<HTMLElement>(".mdv-prose");
      const editorContent = document.querySelector<HTMLElement>(".mdv-editor .cm-content");
      const anchor = selection.anchorNode;
      if (!anchor) return;

      if (prose?.contains(anchor)) {
        const view = viewRef.current;
        if (!view) return;
        const index = view.state.doc.toString().indexOf(text);
        if (index < 0) return;

        const range = EditorSelection.range(index, index + text.length);
        view.dispatch({
          selection: EditorSelection.create([range]),
          effects: EditorView.scrollIntoView(range, { y: "center" }),
        });
        view.focus();
        return;
      }

      if (editorContent?.contains(anchor) && prose) {
        const range = findTextInDom(prose, text);
        if (!range) return;

        selection.removeAllRanges();
        selection.addRange(range);
        range.startContainer.parentElement?.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    };

    document.addEventListener("mouseup", onMouseUp);
    return () => document.removeEventListener("mouseup", onMouseUp);
  }, [viewRef, rebindKey]);
}
