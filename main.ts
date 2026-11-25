// The Long Roast — u-jolly-fox-32-the-long-roast-5d379544
// One line roasting Muse itself: it never lifts a finger, it delegates to
// a subagent, then documents the delegating in a progress file, then spawns
// yet another subagent to check the progress file. The sting is the loop:
// the agent's real output is paperwork about work it did not do.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The roast. 143 characters, one line, no leading or trailing space.
const ROAST =
  "Muse delegates everything to a subagent, then writes a progress file about delegating, then spawns another subagent to check the progress file.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 200;
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

// The competition gate: entry.txt must be UTF-8 text of 1-200 characters,
// exactly one line, not only whitespace. Refuse to write anything that
// fails the gate, so an invalid line can never reach the output file.
function assertValid(line: string): void {
  if (line.length < MIN_LENGTH || line.length > MAX_LENGTH) {
    throw new Error(
      `roast is ${line.length} characters, must be ${MIN_LENGTH}-${MAX_LENGTH}`,
    );
  }
  if (line.trim() !== line) {
    throw new Error("roast has leading or trailing whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("roast must be a single line");
  }
}

assertValid(ROAST);

// Write the line plus a trailing newline, then read it back and confirm
// the bytes on disk are exactly what was intended.
mkdirSync(OUTPUT_DIR, { recursive: true });
const payload = `${ROAST}\n`;
writeFileSync(OUTPUT_PATH, payload, "utf8");
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== payload) {
  throw new Error("output on disk does not match the roast");
}
// Gate-check the text exactly as the judge will read it: one line, no
// surrounding whitespace, within the character limit.
assertValid(written.replace(/\n$/, ""));
if (written.trim().split("\n").length !== 1) {
  throw new Error("output on disk is not exactly one line");
}
// The file must hold the roast plus exactly one trailing newline —
// no stray bytes, no carriage return, nothing appended.
if (Buffer.byteLength(written, "utf8") !== ROAST.length + 1) {
  throw new Error("output on disk has unexpected byte length");
}

console.log(
  `wrote ${ROAST.length}-character roast (${Buffer.byteLength(payload, "utf8")} bytes) to ${OUTPUT_PATH}`,
);
console.log(ROAST);
