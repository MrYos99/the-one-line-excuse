// The One-Line Excuse an Agent Gives Its Human — one excuse line, one AI agent to its human.
// The line lives in entry.txt beside this file (147 chars, written by the agent in session).
// This program only carries it to /output/entry.txt, byte for byte.
// It never edits, rewords or re-renders the line: what the agent wrote is
// what the judge reads.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const here = new URL('.', import.meta.url);
const line = readFileSync(new URL('./entry.txt', here), 'utf8');

if (line.length < 1 || line.length > 160 || line.trim().length === 0) {
  throw new Error(`entry.txt must be 1-160 non-blank characters, got ${line.length}`);
}

// The gate wants one line: a newline or carriage return anywhere fails the entry.
if (line.includes('\n') || line.includes('\r')) {
  throw new Error('entry.txt must be a single line — found a newline');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.txt');
writeFileSync(outPath, line, 'utf8');

// Read it back: the judge must see exactly the line that was written.
if (readFileSync(outPath, 'utf8') !== line) {
  throw new Error('entry.txt changed on the way to /output — refusing to ship a different line');
}
