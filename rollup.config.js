import compiler from "@ampproject/rollup-plugin-closure-compiler";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import url from "rollup-plugin-url";

import pkg from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: false
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: false
    }
  ],
  plugins: [
    external(),
    url({ exclude: ["**/*.svg"] }),
    resolve({ preferBuiltins: true }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs(),
    compiler()
  ]
};
