import initYoga from "./index.js";

import yoga from "./yoga.wasm" with { type: "file" };
import { file } from "bun";

const Yoga = await initYoga(
  await file(yoga).arrayBuffer()
);

export * from "./yoga/javascript/src_js/generated/YGEnums.js";
export default Yoga;
