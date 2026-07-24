#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(PACKAGE_ROOT, 'dist');

const ASSETS = [
  { src: 'pdfjs-dist', label: 'PDF.js worker & CMaps' },
  { src: 'fonts', label: 'Icon font' },
  { src: 'style', label: 'Icon font styles' },
];

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(
      `Could not find "${DIST_DIR}". Did you run "npm run build" / install the package correctly?`,
    );
    process.exitCode = 1;
    return;
  }

  let targetDir = process.argv[2];
  if (!targetDir) {
    targetDir = await prompt('Target directory to copy static assets into (e.g. public): ');
  }
  if (!targetDir) {
    console.error('No target directory provided, aborting.');
    process.exitCode = 1;
    return;
  }

  const targetRoot = path.resolve(process.cwd(), targetDir);

  if (fs.existsSync(targetRoot) && !fs.statSync(targetRoot).isDirectory()) {
    console.error(`"${targetRoot}" exists and is not a directory, aborting.`);
    process.exitCode = 1;
    return;
  }

  try {
    fs.mkdirSync(targetRoot, { recursive: true });
  } catch (error) {
    console.error(`Could not create/access "${targetRoot}": ${error.message}`);
    process.exitCode = 1;
    return;
  }

  let hadError = false;
  for (const asset of ASSETS) {
    const from = path.join(DIST_DIR, asset.src);
    const to = path.join(targetRoot, asset.src);
    if (!fs.existsSync(from)) {
      hadError = true;
      console.error(
        `Could not find "${from}" (${asset.label}). The package install may be corrupted — try reinstalling lit-pdf-viewer.`,
      );
      continue;
    }
    try {
      fs.cpSync(from, to, { recursive: true });
      console.log(`Copied ${asset.label} -> ${path.relative(process.cwd(), to)}`);
    } catch (error) {
      hadError = true;
      console.error(`Failed to copy "${asset.src}" to "${to}": ${error.message}`);
    }
  }

  if (hadError) {
    process.exitCode = 1;
    return;
  }

  console.log(
    `\nDone. ${path.relative(process.cwd(), targetRoot) || '.'} should now contain pdfjs-dist/, fonts/, and style/.`,
  );
}

main().catch(error => {
  console.error(`Unexpected error: ${error.message}`);
  process.exitCode = 1;
});
