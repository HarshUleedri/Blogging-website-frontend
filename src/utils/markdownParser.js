import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Change theme as needed
import sanitizeHtml from "sanitize-html";

export const md = new MarkdownIt({
  html: true, // Allow basic HTML inside Markdown
  linkify: true, // Convert links into clickable links
  typographer: true, // Smart quotes and dashes

  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="hljs language-${lang}">${
          hljs.highlight(str, { language: lang }).value
        }</code></pre>`;
      } catch (__) {}
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

export const renderMarkdown = (text) => {
  const rawHtml = md.render(text);
  return sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      a: ["href", "target"],
      img: ["src", "alt"],
    },
  });
};
