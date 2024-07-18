export const parseMKD = (markdown: string): string => {
  let html = markdown;

  // Convert headers
  html = html.replace(/^\s*######\s+(.*)$/gm, "<h6>$1</h6>");
  html = html.replace(/^\s*#####\s+(.*)$/gm, "<h5>$1</h5>");
  html = html.replace(/^\s*####\s+(.*)$/gm, "<h4>$1</h4>");
  html = html.replace(/^\s*###\s+(.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^\s*##\s+(.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^\s*#\s+(.*)$/gm, "<h1>$1</h1>");

  // Convert bold text
  html = html.replace(/\*\*(.*?)\*\*/gm, "<b>$1</b>");

  // Convert italic text
  html = html.replace(/\*(.*?)\*/gm, "<i>$1</i>");

  // Convert code blocks
  html = html.replace(/```([\s\S]*?)```/gm, "<pre><code>$1</code></pre>");

  // Convert inline code
  html = html.replace(/`([^`]+)`/gm, "<code>$1</code>");

  // Convert blockquotes
  html = html.replace(/^\>\s+(.*)$/gm, "<blockquote>$1</blockquote>");

  // Convert images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/gm, '<img alt="$1" src="$2" />');

  // Convert unordered lists
  html = html.replace(/^\s*[-*]\s+(.*)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>[\s\S]*?<\/li>)/gm, "<ul>$1</ul>");

  // Convert ordered lists
  html = html.replace(/^\s*\d+\.\s+(.*)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>[\s\S]*?<\/li>)/gm, "<ol>$1</ol>");

  // Convert line breaks
   html = html.replace(/\n/gm, "<p></p>");

  // Wrap text that is not already wrapped in HTML tags into paragraphs
  html = html.replace(/^(?!<[^>]+>)(.+)$/gm, "<p>$1</p>");

  return html.trim();
};
