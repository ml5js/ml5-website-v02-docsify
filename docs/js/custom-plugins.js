// ==========================================
// Docsify Custom Plugins
// ==========================================

(function () {
  // Inspired by Yafira, her code was merged into the official docsify copy-code plugin!
  const prismCustomPlugin = function (hook) {
    const injectPrismRules = () => {
      if (typeof Prism !== 'undefined' && Prism.languages.javascript) {
        if (!Prism.languages.javascript['custom-highlight']) {
          Prism.languages.insertBefore('javascript', 'keyword', {
            'custom-highlight': /\b(function|add|more)\b/,
            'custom-highlight-1': /\b(async|await|add|more)\b/,
            'custom-highlight-2': /\b(add|more)\b/
          });

          // figure out if the comment is on its own line or right next to some code
          Prism.hooks.add('after-tokenize', function (env) {
            let isLineStart = true;
            for (let i = 0; i < env.tokens.length; i++) {
              let token = env.tokens[i];
              if (typeof token === 'string') {
                if (token.includes('\n')) {
                  const afterLastNewline = token.split('\n').pop();
                  isLineStart = (afterLastNewline.trim() === '');
                } else if (token.trim() !== '') {
                  isLineStart = false;
                }
              } else {
                if (token.type === 'comment') {
                  let aliases = Array.isArray(token.alias) ? token.alias : (token.alias ? [token.alias] : []);
                  // add 'bubble-comment' class if it starts the line, or 'inline-comment' if it's on the side
                  aliases.push(isLineStart ? 'bubble-comment' : 'inline-comment');
                  token.alias = aliases;
                  isLineStart = false;
                } else {
                  isLineStart = false;
                }
              }
            }
          });

          // visually hide the '//' symbol only for bubble comments
          Prism.hooks.add('wrap', function (env) {
            if (env.type === 'comment' && env.classes && env.classes.includes('bubble-comment')) {
              env.content = env.content.replace(/^(\/\/\s*)/, '<span class="hide-slash">$1</span>');
            }
          });
        }
      }
    };

    hook.init(injectPrismRules);
    hook.doneEach(injectPrismRules);
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