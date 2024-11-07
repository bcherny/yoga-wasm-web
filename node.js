import initYoga from "./index.js";

import yoga from "./dist/yoga.wasm" with { type: "file" };
import { file } from "bun";

const Yoga = await initYoga(
  file(yoga)
);

export * from "./yoga/javascript/src_js/generated/YGEnums.js";
export default Yoga;
