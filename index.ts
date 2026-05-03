import { intro, outro, text, select, isCancel } from '@clack/prompts'
import { setupOllama } from './providers/ollama';

export function check<T>(val: T | symbol): T {
  if (isCancel(val)) { outro('Cancelled'); process.exit(0); }
  return val as T;
}



async function runProviderSetup(provider: string, filePath: string) {
  switch (provider) {
    case 'ollama':
      setupOllama(filePath)
      break;

    default:
      break;
  }
}

async function main() {
  intro('translate-setup');

  const provider = check(await select({
    message: 'Choose a provider',
    options: [{ value: 'ollama', label: 'Ollama (local)' }]
  }));

  const filePath = check(await text({
    message: 'Enter the filepath that the translate.js file will go to',
    placeholder: 'Default is the root of the project'
  }));

  runProviderSetup(provider, filePath)
}

main();
