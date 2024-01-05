import { NextResponse } from "next/server";
import fs from "fs";

import { createWorker } from "tesseract.js";

export async function GET(req: Request) {
  const buffer = fs.readFileSync(`${process.cwd()}/data/sample.png`);

  const worker = await createWorker("eng");

  (async () => {
    const {
      data: { text },
    } = await worker.recognize(buffer);
    console.log(text);
    await worker.terminate();
  })();

  return NextResponse.json(
    { ok: true },
    {
      status: 200,
    }
  );
}
