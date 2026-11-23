// ==========================================
// Docsify Custom Plugins
// ==========================================

(function () {
  // Inspired by Yafira's work, and Dan Shiffman's NoC Book's Syntax Highlighting!

  // Add // {!3} to highlight the next 3 lines with a bubble comment
  const prismCustomPlugin = function (hook) {
    // Keep our custom Prism colors
    const injectPrismRules = () => {
      if (typeof Prism !== 'undefined' && Prism.languages.javascript) {
        if (!Prism.languages.javascript['custom-highlight']) {
          Prism.languages.insertBefore('javascript', 'keyword', {
            'custom-highlight': /\b(function|add|more)\b/,
            'custom-highlight-1': /\b(async|await|add|more)\b/,
            'custom-highlight-2': /\b(add|more)\b/
          });
        }
      }
    };

    // Copy code slices without breaking Prism tokens
    const codeFragment = (code, start, end) => {
      // Count source text, not HTML tags
      const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      let offset = 0;
      let hasStart = false;
      let node;
      while ((node = walker.nextNode())) {
        const nextOffset = offset + node.textContent.length;
        if (!hasStart && start <= nextOffset) {
          range.setStart(node, start - offset);
          hasStart = true;
        }
        if (hasStart && end <= nextOffset) {
          range.setEnd(node, end - offset);
          return range.cloneContents();
        }
        offset = nextOffset;
      }
      return document.createDocumentFragment();
    };

    const highlightCommentGroups = () => {
      document.querySelectorAll('.markdown-section pre[data-lang]').forEach((pre) => {
        // Skip other languages and processed blocks
        if (pre.dataset.commentHighlight || !/^(javascript|js)$/.test(pre.dataset.lang)) return;
        const code = pre.querySelector('code');
        if (!code) return;
        const source = code.textContent;
        const groups = [];
        let invalidRange = false;

        // Let Prism find real comments
        code.querySelectorAll('.token.comment').forEach((comment) => {
          // Read // {!N} and its explanation
          const match = /^\/\/\s*\{!(\d+)\}\s*(\S[^\r\n]*)$/.exec(comment.textContent);
          if (!match) return;
          const count = Number(match[1]);
          // Find this exact comment in the source
          const prefix = document.createRange();
          prefix.setStart(code, 0);
          prefix.setEndBefore(comment);
          const commentStart = prefix.toString().length;
          const start = source.lastIndexOf('\n', commentStart - 1) + 1;
          // Leave inline comments alone
          if (source.slice(start, commentStart).trim()) return;
          const newline = source.indexOf('\n', commentStart);
          if (!Number.isSafeInteger(count) || count < 1 || newline === -1) {
            invalidRange = true;
            return;
          }
          // Count source lines, including blank ones
          const codeStart = newline + 1;
          let end = codeStart;
          for (let i = 0; i < count; i++) {
            if (end >= source.length) {
              invalidRange = true;
              return;
            }
            const nextLine = source.indexOf('\n', end);
            end = nextLine === -1 ? source.length : nextLine + 1;
          }
          // Keep comment ranges from overlapping
          if (groups.length && start < groups[groups.length - 1].end) {
            invalidRange = true;
            return;
          }
          groups.push({ start, codeStart, end, comment: match[2].trim() });
        });
        // Leave invalid blocks as they are
        if (!groups.length || invalidRange) return;

        // Keep one code element for copying
        const chunks = document.createDocumentFragment();
        const notes = document.createDocumentFragment();
        // Match code and notes with grid rows
        let cursor = 0;
        let row = 0;
        const appendChunk = (start, end, group, isAdjacent = false) => {
          if (start === end) return;
          row++;
          const chunk = document.createElement('span');
          chunk.className = 'comment-code-chunk' + (group ? ' comment-code-highlight' : '');
          if (isAdjacent) chunk.classList.add('comment-group-adjacent');
          chunk.style.setProperty('--comment-row', row);
          chunk.append(codeFragment(code, start, end));
          chunks.append(chunk);
          if (group) {
            const note = document.createElement('span');
            note.className = 'bubble-comment';
            if (isAdjacent) note.classList.add('comment-group-adjacent');
            // Avoid reading the same explanation twice
            note.setAttribute('aria-hidden', 'true');
            note.style.setProperty('--comment-row', row);
            note.textContent = group.comment;
            notes.append(note);
          }
        };
        groups.forEach((group, index) => {
          const isAdjacent = index > 0 && cursor === group.start;
          appendChunk(cursor, group.start);

          // Keep // explanations when copying; drop only {!N}
          const commentSource = document.createElement('span');
          commentSource.className = 'comment-annotation-source';
          commentSource.textContent = source.slice(group.start, group.codeStart)
            .replace(/(\/\/)\s*\{!\d+\}\s*/, '$1 ');
          chunks.append(commentSource);
          appendChunk(group.codeStart, group.end, group, isAdjacent); // Add space between adjacent highlights
          cursor = group.end;
        });
        appendChunk(cursor, source.length);
        // Keep existing copy buttons
        code.replaceChildren(chunks);
        pre.append(notes);
        pre.dataset.commentHighlight = 'true';
        pre.classList.add('comment-highlight-block');
      });
    };

    // Set up colors first, then arrange notes after rendering
    hook.init(injectPrismRules);
    hook.doneEach(() => {
      injectPrismRules();
      highlightCommentGroups();
    });
  };

  // Examples search by Ryan :D 
  const examplesSearchPlugin = function (hook) {
    hook.doneEach(function () {
      var input = document.getElementById('examples-search');
      var noResults = document.getElementById('examples-no-results');
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

  const clearSearchTextPlugin = function (hook) {
    hook.ready(function () {
      const clearText = document.querySelector('.clear-button .visually-hidden');
      if (clearText) clearText.textContent = '';
    });
  };

  const sidebarStatePlugin = function (hook) {
    const sidebarMobileBreakpoint = 1060;
    let hasResizeListener = false;
    let lastIsMobile = null;

    const sidebarStateByViewport = () => {
      const sidebar = document.querySelector('.sidebar');
      if (!sidebar) return;

      const isMobile = window.innerWidth <= sidebarMobileBreakpoint;
      if (isMobile) {
        // mobile view starts with sidebar hidden, but the toggle button is visible!
        sidebar.classList.remove('show');
      } else {
        // laptop/desktop view starts with sidebar visible; (the toggle button will be hidden.)
        sidebar.classList.add('show');
      }
      lastIsMobile = isMobile;
    };

    hook.ready(function () {
      sidebarStateByViewport();

      if (!hasResizeListener) {
        window.addEventListener('resize', function () {
          const isMobile = window.innerWidth <= sidebarMobileBreakpoint;
          if (lastIsMobile === null || isMobile !== lastIsMobile) {
            sidebarStateByViewport();
          }
        });
        hasResizeListener = true;
      }
    });

    hook.doneEach(sidebarStateByViewport);
  };

  window.ml5DocsPlugins = {
    prismCustomPlugin,
    examplesSearchPlugin,
    clearSearchTextPlugin,
    sidebarStatePlugin
  };

})();