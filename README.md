# AutoTranslate

A CLI tool for setting up automatic page translation using local LLMs via Ollama.

## Features

- Interactive CLI setup using `@clack/prompts`
- Generates a client-side translation script
- Supports Ollama as a local translation provider
- Translates content within `<x-translate>` elements on web pages

## Prerequisites

- [Bun](https://bun.sh) runtime
- [Ollama](https://ollama.com) installed and running

## Installation

```bash
bun install
```

## Usage

```bash
bun run index.ts
```

Follow the interactive prompts to:
1. Select a translation provider (currently Ollama)
2. Specify the output path for the generated `translate.js` file
3. Choose your Ollama model (e.g., `llama3.1:8b`)

If the model isn't installed, the tool will offer to pull it automatically.

## How It Works

The tool generates a `translate.js` script that:
- Scans for `<x-translate>` elements on a page
- Extracts text content from those elements
- Sends the text to a local Ollama instance for translation
- Replaces the content with translated text in the user's browser language

## Generated Script Usage

Include the generated `translate.js` in your HTML and mark elements for translation:

```html
<x-translate>Hello World</x-translate>
<script src="translate.js"></script>
```

## License

MIT
