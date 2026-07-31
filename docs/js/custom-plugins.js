// ==========================================
// Docsify Custom Plugins
// ==========================================

(function () {
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

  window.ml5DocsPlugins = {
    prismCustomPlugin,
    examplesSearchPlugin,
    clearSearchTextPlugin
  };

})();