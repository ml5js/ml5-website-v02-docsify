// To make the <navbar> modular in a simple way!

function navbar(linkToWebEditor = "") {
  let body = document.querySelector('body');
  body.innerHTML += `
    <nav class="iframe-navbar">

      <!-- LEFT BUTTONS -->
      <div class="buttons-left">

        <!-- "Run" button -->
        <button>
          <a href="run.html" target="script-iframe">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill"
              viewBox="3 3 10 10">
              <path
                d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          </a>
        </button>

        <!-- "Stop" button -->
        <button>
          <a href="ready.html" target="script-iframe">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <rect width="80%" height="80%" x="10%" y="10%" />
            </svg>
          </a>
        </button>
      </div>

      <!-- RIGHT BUTTONS -->
      <div class="buttons-right">
        <button>
          <a href="${linkToWebEditor}" target="_blank" class="link-to-p5">
            Open in p5.js Web Editor
          </a>
        </button>
      </div>
    </nav>
  `
}