import { promises as fs } from "fs";

let i = 0;

async function run() {
  for (fs.readFile(
    "../files/cedict_1_0_ts_utf-8_mdbg.txt"
  )) {
    if (line.start)
    i++;
    if (i === 5) {
      break;
    }
  }
}

run().catch(console.log);
