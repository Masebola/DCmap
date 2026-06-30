import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const componentFiles = (await readdir('components')).filter(name => name.endsWith('.js')).map(name => join('components',name));
const sourceFiles = ['index.html', ...componentFiles];
const renderedActions = new Set();
for (const file of sourceFiles) {
  const text = await readFile(file,'utf8');
  for (const match of text.matchAll(/data-action=["'`]([^"'`$]+)["'`]/g)) renderedActions.add(match[1]);
}
const app = await readFile('assets/js/app.js','utf8');
const handled = new Set();
for (const match of app.matchAll(/action === '([^']+)'/g)) handled.add(match[1]);
for (const match of app.matchAll(/progressMutationActions = new Set\(\[([^\]]+)\]\)/g)) {
  for (const value of match[1].matchAll(/'([^']+)'/g)) handled.add(value[1]);
}
const missing = [...renderedActions].filter(action => !handled.has(action));
if (missing.length) throw new Error(`Rendered actions without handlers: ${missing.join(', ')}`);
console.log(`All ${renderedActions.size} rendered actions have application handlers.`);
