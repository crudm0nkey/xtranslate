import { confirm, text } from "@clack/prompts"
import { check } from ".."
import { $ } from 'bun'

function buildJsScript(model: string) {
  return `async function translatePage() {
    const langName = new Intl.DisplayNames([navigator.language], { type: 'language' }).of(navigator.language);
    const els = [...document.querySelectorAll('x-translate')];
    const textMap = {};
    els.forEach((el, i) => {
      textMap[i] = el.textContent.trim();
    });
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        model: '${model}',
        prompt: \`Translate the values in this JSON to \${langName}. Return ONLY the JSON object with no explanation, no backticks, no extra text: \${JSON.stringify(textMap)}\`,
        stream: false
      })
    });
    const raw = await response.text();
    const data = JSON.parse(raw);
    const translated = JSON.parse(data.response.match(/\\{[\\s\\S]*\\}/)[0]);
    els.forEach((el, i) => {
      if (translated[i] !== undefined) {
        el.textContent = translated[i];
      }
    });
  }
  translatePage();`
}

async function promptModel() {
  const model = check(await text({
    message: 'Enter the model name',
    placeholder: 'Ex. llama3.1:8b',
  }))
  return model
}

async function promptInstallModel(model: string) {
  const proceed = check(await confirm({
    message: 'Model not installed, do you want to install it?'
  }))
  if (!proceed) process.exit(1)

  await $`ollama pull ${model}`
}


async function isModelInstalled(model: string) {
  const output = await $`ollama list`.text()
  if (output.includes(model)) {
    return true
  }
  return false
}

export async function setupOllama(filePath: string) {
  const model = await promptModel()
  const modelInstalled = await isModelInstalled(model)

  if (!modelInstalled) {
    await promptInstallModel(model)
  }

  const script = buildJsScript(model)
  await Bun.write(`${filePath}/translate.js`, script)
  console.log('wrote')
}
