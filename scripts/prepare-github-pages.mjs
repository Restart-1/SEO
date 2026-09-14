import { cp, mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

const outputDir = join(process.cwd(), 'dist', 'client');

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtmlFiles(path));
    else if (entry.name.endsWith('.html')) files.push(path);
  }

  return files;
}

for (const source of await collectHtmlFiles(outputDir)) {
  const route = relative(outputDir, source).replace(/\.html$/, '');
  if (route === 'index' || route === '404') continue;

  const destination = join(outputDir, route, 'index.html');
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination);
}

await writeFile(join(outputDir, '.nojekyll'), '');
