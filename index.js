import wrapAsm from "./yoga/javascript/src_js/wrapAsm.js";
import yoga from "./tmp/yoga.mjs";

export * from "./yoga/javascript/src_js/generated/YGEnums.js";

import yogaWasm from "./tmp/yoga.js";

export default async function () {
  const mod = await yoga({
    instantiateWasm(info, receive) {
      yogaWasm().buffer.then((wasm) => {
        WebAssembly.instantiate(wasm, info).then((instance) => {
          if (instance instanceof WebAssembly.Instance) {
            receive(instance);
          } else {
            receive(instance.instance);
          }
        });
      });
    },
  });
  return wrapAsm(mod);
}
