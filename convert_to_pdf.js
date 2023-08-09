//How to run a terminal comment in node.js? I want to run "pandoc -o output.pdf output.md
//
import { exec } from "child_process";

exec(
  "pandoc tickets.md -o tickets.pdf --include-in-header=headers.tex --pdf-engine=xelatex",
  (err) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
  }
);
