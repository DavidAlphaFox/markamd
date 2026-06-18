import { expect, test } from "bun:test";
import { getWhatsNewToastMessage } from "../src/lib/release-notes";

test("calls out the latest v1.5 polish in the what's-new toast", () => {
  expect(getWhatsNewToastMessage("1.5.11")).toBe(
    "v1.5.11: Tabs reorder cleanly, duplicate opens focus the existing tab, reading find refocuses, and PDF printing is cleaner",
  );
});

test("falls back to a generic update message for other versions", () => {
  expect(getWhatsNewToastMessage("1.6.0")).toBe("updated to v1.6.0");
});
