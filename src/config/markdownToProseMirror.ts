"use client";
import markdownIt from "markdown-it"; // Import markdown-it or similar library

// Define the ProseMirror document node types

const markdownToProseMirror = (
  markdownContent: string
): ProseMirrorNode | null => {
  const md = new markdownIt({ breaks: true }); // Enable line breaks
  const htmlContent = md.render(markdownContent);

  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    // Return null or an empty document node on the server
    return null;
  }

  const htmlToProseMirror = (html: string): ProseMirrorNode => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const nodeToProseMirror = (node: any): ProseMirrorNode | null => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        switch (node.nodeName.toLowerCase()) {
          case "h1":
            return {
              type: "heading",
              attrs: { level: 1 },
              content: parseChildren(node),
            };
          case "h2":
            return {
              type: "heading",
              attrs: { level: 2 },
              content: parseChildren(node),
            };
          case "h3":
            return {
              type: "heading",
              attrs: { level: 3 },
              content: parseChildren(node),
            };
          case "h4":
            return {
              type: "heading",
              attrs: { level: 4 },
              content: parseChildren(node),
            };
          case "h5":
            return {
              type: "heading",
              attrs: { level: 5 },
              content: parseChildren(node),
            };
          case "h6":
            return {
              type: "heading",
              attrs: { level: 6 },
              content: parseChildren(node),
            };
          case "ul":
            return {
              type: "bulletList",
              content: parseChildren(node),
            };
          case "ol":
            return {
              type: "orderedList",
              content: parseChildren(node),
            };
          case "li":
            return {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: parseChildren(node),
                },
              ],
            };
          case "strong":
            return {
              type: "text",
              text: node.textContent || "",
              marks: [{ type: "bold" }],
            };
          case "p":
            return { type: "paragraph", content: parseChildren(node) };
          case "img":
            return {
              type: "image",
              attrs: {
                src: node.getAttribute("src") || "",
                alt: node.getAttribute("alt") || "",
                title: node.getAttribute("title") || "",
              },
            };
          case "blockquote":
            return { type: "blockquote", content: parseChildren(node) };
          case "code":
            return {
              type: "codeBlock",
              content: [{ type: "text", text: node.textContent || "" }],
            };
          case "br":
            return { type: "text", text: "\n" }; // Represent line break within paragraphs
          case "table":
            return {
              type: "table",
              content: parseChildren(node),
            };
          case "thead":
            return {
              type: "tableHeader",
              content: parseChildren(node),
            };
          case "tbody":
            return {
              type: "tableBody",
              content: parseChildren(node),
            };
          case "tr":
            return {
              type: "tableRow",
              content: parseChildren(node),
            };
          case "th":
            return {
              type: "tableHeaderCell",
              content: parseChildren(node),
            };
          case "td":
            return {
              type: "tableCell",
              content: parseChildren(node),
            };
          default:
            // Wrap any other tags in paragraphs
            return {
              type: "paragraph",
              content: parseChildren(node),
            };
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        // Return text content directly if it has meaningful text
        if (node.textContent && node.textContent.trim() !== "") {
          return { type: "text", text: node.textContent.trim() };
        }
      }
      return null;
    };

    const parseChildren = (parent: Node): ProseMirrorNode[] => {
      const nodes: ProseMirrorNode[] = [];
      let tempTextNodes: ProseMirrorNode[] = [];

      Array.from(parent.childNodes).forEach((node) => {
        const pmNode = nodeToProseMirror(node);

        if (pmNode) {
          if (pmNode.type === "text" || pmNode.type === "strong") {
            // Accumulate loose text or inline elements
            tempTextNodes.push(pmNode);
          } else {
            // If a block element is encountered, wrap any accumulated text in a paragraph
            if (tempTextNodes.length > 0) {
              nodes.push({ type: "paragraph", content: tempTextNodes });
              tempTextNodes = [];
            }
            nodes.push(pmNode);
          }
        }
      });

      // Wrap remaining loose text nodes in a paragraph at the end
      if (tempTextNodes.length > 0) {
        nodes.push({ type: "paragraph", content: tempTextNodes });
      }

      return nodes;
    };

    // Ensure lists and tables have valid structures
    const validateStructure = (nodes: ProseMirrorNode[]): ProseMirrorNode[] => {
      return nodes.map((node) => {
        if (node.type === "bulletList" || node.type === "orderedList") {
          node.content =
            node.content?.filter((item) => item.type === "listItem") || [];
        } else if (node.type === "table") {
          node.content =
            node.content?.filter(
              (item) => item.type === "tableHeader" || item.type === "tableBody"
            ) || [];
        } else if (node.type === "tableRow") {
          node.content =
            node.content?.filter(
              (item) =>
                item.type === "tableHeaderCell" || item.type === "tableCell"
            ) || [];
        }
        return node;
      });
    };

    const docContent = parseChildren(doc.body);
    const validatedContent = validateStructure(docContent);

    return { type: "doc", content: validatedContent };
  };

  return htmlToProseMirror(htmlContent);
};

export default markdownToProseMirror;
