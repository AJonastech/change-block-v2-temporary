export const parseHTMLToMKD = (html: string): string => {
  let markdown = html;

  // Remove unwanted paragraphs wrapping headers
  markdown = markdown.replace(/<p><h1>(.*?)<\/h1><\/p>/g, "# $1");
  markdown = markdown.replace(/<p><h2>(.*?)<\/h2><\/p>/g, "## $1");
  markdown = markdown.replace(/<p><h3>(.*?)<\/h3><\/p>/g, "### $1");
  markdown = markdown.replace(/<p><h4>(.*?)<\/h4><\/p>/g, "#### $1");
  markdown = markdown.replace(/<p><h5>(.*?)<\/h5><\/p>/g, "##### $1");
  markdown = markdown.replace(/<p><h6>(.*?)<\/h6><\/p>/g, "###### $1");

  // Convert headers not wrapped in paragraphs
  markdown = markdown.replace(/<h1>(.*?)<\/h1>/g, "# $1");
  markdown = markdown.replace(/<h2>(.*?)<\/h2>/g, "## $1");
  markdown = markdown.replace(/<h3>(.*?)<\/h3>/g, "### $1");
  markdown = markdown.replace(/<h4>(.*?)<\/h4>/g, "#### $1");
  markdown = markdown.replace(/<h5>(.*?)<\/h5>/g, "##### $1");
  markdown = markdown.replace(/<h6>(.*?)<\/h6>/g, "###### $1");

  // Convert bold and italic text
  markdown = markdown.replace(/<b>(.*?)<\/b>/g, "**$1**");
  markdown = markdown.replace(/<i>(.*?)<\/i>/g, "*$1*");

  // Convert blockquotes
  markdown = markdown.replace(/<blockquote>(.*?)<\/blockquote>/g, "> $1");

  // Convert code blocks
  markdown = markdown.replace(
    /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
    "```\n$1\n```"
  );

  // Convert inline code
  markdown = markdown.replace(/<code>(.*?)<\/code>/g, "`$1`");

  // Convert images
  markdown = markdown.replace(/<img alt="(.*?)" src="(.*?)" \/>/g, "![$1]($2)");

  // Convert unordered lists
  markdown = markdown.replace(
    /<ul>\s*(<li>[\s\S]*?<\/li>)\s*<\/ul>/g,
    (match) => {
      return match.replace(/<li>(.*?)<\/li>/g, "- $1");
    }
  );

  // Convert ordered lists
  markdown = markdown.replace(
    /<ol>\s*(<li>[\s\S]*?<\/li>)\s*<\/ol>/g,
    (match) => {
      return match.replace(/<li>(.*?)<\/li>/g, (match, p1) => `1. ${p1}`);
    }
  );

  // Convert citations as links
  markdown = markdown.replace(/<a href="(.*?)">(.*?)<\/a>/g, "[$2]($1)");

  // Convert paragraphs
  markdown = markdown.replace(/<p>(.*?)<\/p>/g, "$1\n");

  return markdown.trim();
};
