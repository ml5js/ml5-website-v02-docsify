# ml5.js Website on Docsify

This is the current version of the ml5.js website., which is built using Docsify. It contains documentation and and reference materials for for the ml5.js library models.

> This is the current version of the ml5.js website.

## Live Site

[https://docs.ml5js.org](https://docs.ml5js.org)

## Tech Stack

- [Docsify](https://docsify.js.org/) - Static docs framework 
- [docsify-tabs](https://jhildenbiddle.github.io/docsify-tabs/) - Tabbed content plugin 
- [docsify search](https://docsify.js.org/#/plugins?id=full-text-search) - Full-text search plugin 
- [Fira Code](https://fonts.google.com/specimen/Fira+Code) - Monospace code font 

## Project Structure

```
ml5-website-v02-docsify/
├── docs/
│   ├── assets/           # Favicons and static images
│   ├── contributing/     # Contribution guide pages
│   ├── css/              # Global and markdown stylesheets
│   ├── learn/            # Tutorials and learning content
│   ├── reference/        # ml5 model API reference pages
│   ├── styleguide/       # Documentation style guide
│   ├── welcome/          # Getting started pages
│   ├── sidebar.md        # Sidebar navigation
│   ├── footer.md         # Site-wide footer
│   └── index.html        # Docsify entry point and config
├── package.json
└── README.md
```

## Local Setup
You can simply clone the repository and run the website locally. The site is temporarily deployed to: https://ml5-next-gen-docs.netlify.app/.

### Prerequisites

- [GitHub Desktop](https://desktop.github.com/)
  - Unless you are already familiar with Git and Command Line Interface (CLI).
- [Node.js](https://nodejs.org/) v18 or v20 LTS
- [Docsify](https://docsify.js.org/#/quickstart)

### Steps

1. Clone the repository:
  ```bash
  git clone https://github.com/ml5js/ml5-website-v02-docsify
  cd ml5-website-v02-docsify
  ```

2. Serve with docsify-cli (recommended)
```bash
npm install -g docsify-cli
docsify serve docs
```

The site will be available at `http://localhost:3000`.

## Contributing

We welcome contributions!

If you are in the ml5.js organization, create a new branch, keeping the naming convention described below. Please avoid using any other punctuation marks other than hyphens, "-". Category can be optional.

```
(category)/author-description-of-changes
```

If you are **not** in the ml5.js organization, follow these steps:

1. Fork the repository and clone it to your local machine.
2. Make changes.
3. Commit your changes and push to the "main" branch on your forked repository.
4. Create a new Pull Request (PR), by clicking on "Contribute" and then "Open Pull Request" on your forked repository.
5. The PR will be reviewed and merged.

## Issues

Please feel free to add any issues or feature requests on the [Issues](https://github.com/ml5js/ml5-website-v02-docsify/issues).


## Code of Conduct

We believe in a friendly internet and community as much as we do in building friendly machine learning for the web. Please refer to our 
[Code of Conduct](https://github.com/ml5js/Code-of-Conduct) for our rules for interacting with ml5 as a developer, contributor, or as a person using the library.

## Acknowledgements

ml5.js is supported by the time and dedication of open source developers from 
all over the world. Funding and support is generously provided by a 
[Google Education grant](https://edu.google.com/giving/) at NYU's ITP/IMA program 
and NYU Shanghai's IMA.

