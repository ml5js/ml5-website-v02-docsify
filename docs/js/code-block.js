// ==========================================
// Docsify Custom Plugins
// ==========================================

// Code Comment (Bubble) UI Conversion Plugin
window.codeCommentPlugin = function (hook) {
  hook.beforeEach(function (content) {
    return content.replace(
      /```code-comment\s*(\w+)?\s*\n([\s\S]*?)```/g,
      (match, lang = 'code', rawCode) => {
        const rawLines = rawCode.split('\n');
        const lineSpans = [];

        for (let i = 0; i < rawLines.length; i++) {
          const rawLine = rawLines[i];

          // Skip empty lines
          if (!rawLine.trim()) continue;

          let code = '';
          let comment = '';

          // Get leading indentation (supports tabs and spaces)
          const indentMatch = rawLine.match(/^[\t ]*/);
          const indentRaw = indentMatch ? indentMatch[0] : '';

          // Convert tabs to 2 spaces and measure visual width
          const spacesWidth = indentRaw.replace(/\t/g, '  ').length;

          // Turn visual width into a 2-space indent level
          const indentLevel = spacesWidth === 0 ? 0 : Math.max(1, Math.round(spacesWidth / 2));

          // Normalized indent (2 spaces x level)
          const normalizedIndent = '  '.repeat(indentLevel);
          const trimmed = rawLine.trim();

          if (trimmed.startsWith('//') && rawLines[i + 1]) {
            // Two-line style: comment line + code line
            comment = trimmed.slice(2).trim();
            code = rawLines[i + 1].trimEnd();
            i++; // Skip the next line as it's already processed
          } else {
            // Inline style: code // comment
            const idx = rawLine.indexOf('//');
            if (idx !== -1) {
              code = rawLine.slice(0, idx).trimEnd();
              comment = rawLine.slice(idx + 2).trim();
            } else {
              // Simple code line without comment
              code = rawLine.trimEnd();
            }
          }

          // Escape special characters to prevent HTML injection
          const safeCode = (code || '')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

          const safeComment = (comment || '')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

          if (comment) {
            lineSpans.push(`<span class="highlight-line" data-indent="${normalizedIndent}" data-code="${safeCode}" data-comment="${safeComment}"></span>`);
          } else {
            lineSpans.push(`<span class="normal-line" data-indent="${normalizedIndent}" data-code="${safeCode}"></span>`);
          }
        }

        const lines = lineSpans.join('\n');
        return `<pre class="code-comment-wrapper" data-lang="${lang.toLowerCase()}"><code class="language-code-comment">${lines}</code></pre>`;
      }
    );
  });
};

// Custom Copy Icon & Toast Notification Plugin
window.copyIconPlugin = function (hook) {
  hook.doneEach(() => {
    document.querySelectorAll('.markdown-section pre').forEach((block) => {
      // Prevent duplicate copy buttons
      if (block.querySelector('.copy-icon-button')) return;

      const button = document.createElement('button');
      button.className = 'copy-icon-button';
      button.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 18H8V7h11v16z"/>
        </svg>
      `;

      const toast = document.createElement('div');
      toast.className = 'copy-toast';
      toast.textContent = 'Copied!';
      block.appendChild(toast);

      button.addEventListener('click', () => {
        let code = '';
        const codeTag = block.querySelector('code');
        const commentLines = block.querySelectorAll('.highlight-line, .normal-line');

        if (commentLines.length > 0) {
          code = Array.from(commentLines).map((line) => {
            const codePart = line.getAttribute('data-code') || '';
            const commentPart = line.getAttribute('data-comment') || '';

            // Split actual indent off the code text (supports tabs and spaces)
            const indentMatch = codePart.match(/^[\t ]*/);
            const indentFromCode = indentMatch ? indentMatch[0] : '';
            const codeBody = codePart.slice(indentFromCode.length);

            if (commentPart) {
              // Reconstruct two-line layout: comment line + code line
              return `${indentFromCode}// ${commentPart}\n${indentFromCode}${codeBody}`;
            }

            // Code-only line
            return codePart;
          }).join('\n');
        } else {
          // Fallback for regular code blocks without custom attributes
          code = codeTag?.innerText || '';
        }

        navigator.clipboard.writeText(code).then(() => {
          button.classList.add('copied');
          toast.classList.add('visible');

          // Remove toast and button style after 1.2s
          setTimeout(() => {
            button.classList.remove('copied');
            toast.classList.remove('visible');
          }, 1200);
        });
      });

      block.appendChild(button);
    });
  });
};

// Examples Page Search Plugin
window.examplesSearchPlugin = function (hook) {
  hook.doneEach(function () {
    var input = document.getElementById('examples-search');
    var noResults = document.getElementById('examples-no-results');

    // Only execute if search elements exist on the current page
    if (!input || !noResults) return;

    input.addEventListener('input', function () {
      var query = input.value.trim().toLowerCase();
      var anyVisible = false;

      document.querySelectorAll('.ex-group').forEach(function (group) {
        var groupName = (group.dataset.group || '').toLowerCase();
        var cards = group.querySelectorAll('.ex-card');
        var groupHasMatch = false;

        cards.forEach(function (card) {
          var cardName = (card.dataset.name || '').toLowerCase();
          var matches = !query || cardName.indexOf(query) !== -1 || groupName.indexOf(query) !== -1;

          card.classList.toggle('ex-hidden', !matches);
          if (matches) groupHasMatch = true;
        });

        group.classList.toggle('ex-group-hidden', !groupHasMatch);
        if (groupHasMatch) anyVisible = true;
      });

      noResults.style.display = anyVisible ? 'none' : 'block';
    });
  });
};

// Prism.js Custom Highlighting Plugin (Executes after Docsify is ready!)
window.prismCustomPlugin = function (hook) {
  hook.ready(function () {
    if (typeof Prism !== 'undefined') {
      if (Prism.languages.javascript) {
        // Custom highlight for specific keywords in code blocks
        Prism.languages.insertBefore('javascript', 'keyword', {
          'custom-highlight': /\b(function|add|more)\b/,
          'custom-highlight-1': /\b(async|await|add|more)\b/,
          'custom-highlight-2': /\b(add|more)\b/
        });
      }

      // Custom wrap for comment symbols (//) to preserve copy functionality
      Prism.hooks.add('wrap', function (env) {
        if (env.type === 'comment') {
          env.content = env.content.replace(/^(\/\/\s*)/, '<span class="hide-slash">$1</span>');
        }
      });
    }
  });
};