export const parseMKD = (markdown: string): string => {
  let html = markdown;

  // Convert headers
  html = html.replace(/^######\s+(.*)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####\s+(.*)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####\s+(.*)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.*)$/gm, "<h1>$1</h1>");

  // Convert bold text
  html = html.replace(/\*\*(.*?)\*\*/gm, "<b>$1</b>");

  // Convert italic text
  html = html.replace(/\*(.*?)\*/gm, "<i>$1</i>");

  // Convert blockquotes
  html = html.replace(/^\>\s+(.*)$/gm, "<blockquote>$1</blockquote>");

  // Convert code blocks
  html = html.replace(/```([\s\S]*?)```/gm, "<pre><code>$1</code></pre>");

  // Convert inline code
  html = html.replace(/`([^`]+)`/gm, "<code>$1</code>");

  // Convert images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/gm, '<img alt="$1" src="$2" />');

  // Convert unordered lists
  html = html.replace(/^\s*[-*]\s+(.*)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>[\s\S]*?<\/li>)(?!<\/ul>)/gm, "<ul>$1</ul>");

  // Convert ordered lists
  html = html.replace(/^\s*\d+\.\s+(.*)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>[\s\S]*?<\/li>)(?!<\/ol>)/gm, "<ol>$1</ol>");

  // Convert citations as links
  html = html.replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>');

  // Convert tables
  
  html = html.replace(/((?:\|.+\|\n)+)/gm, (match) => {
    const rows = match.trim().split("\n");
    const header = rows[0];
    const align = rows[1];
    const bodyRows = rows.slice(2);

    // Process header
    const headerHtml = `<thead><tr>${header
      .split("|")
      .map((cell) => `<th>${cell.trim()}</th>`)
      .join("")}</tr></thead>`;

    // Process body
    const bodyHtml = `<tbody>${bodyRows
      .map(
        (row) =>
          `<tr>${row
            .split("|")
            .map((cell) => `<td>${cell.trim()}</td>`)
            .join("")}</tr>`
      )
      .join("")}</tbody>`;

    return `<table>${headerHtml}${bodyHtml}</table>`;
  });

  // Convert new lines to paragraphs
  html = html.replace(
    /([^\n]+)\n(?!<\/(h\d|ul|ol|blockquote|pre|table)>)/g,
    "<p>$1</p>"
  );

  return html.trim();
};
