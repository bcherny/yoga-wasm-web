import yoga from "./yoga.wasm" with { type: "file" };
import { file } from "bun";
import initYoga from "./index.js";

const Yoga = await initYoga(
  await file(yoga).arrayBuffer()
);

export * from "./yoga/javascript/src_js/generated/YGEnums.js";
export default Yoga;
