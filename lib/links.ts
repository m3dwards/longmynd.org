import { parse } from "node-html-parser";

export default function externaliseLinks(input: string): string {
  if (!input) return "";
  const root = parse(input);
  const anchorTags = root.querySelectorAll("a");
  for (const anchorTag of anchorTags) {
    if (anchorTag.getAttribute("href").startsWith("http")) {
      anchorTag.setAttribute("rel", "noopener noreferrer").setAttribute("target", "_blank");
    }
  }
  return root.toString();
}
