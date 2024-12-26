import type { Yoga } from "./wrapAsm.js";

export * from "./generated/YGEnums.js";
export * from "./wrapAsm.js";

export function initYoga(
  wasm: BufferSource | WebAssembly.Module
): Promise<Yoga>;
export function getYoga(): Yoga;
