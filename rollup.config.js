import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import url from "@rollup/plugin-url";
import dts from "rollup-plugin-dts";
import { image } from "@rollup/plugin-image";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.js",
                format: "cjs",
                sourcemap: true,
            },
            {
                file: "dist/index.esm.js",
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({
                useTsconfigDeclarationDir: true,
            }),
            postcss({
                extract: true,
                minimize: true,
                sourceMap: true,
            }),
            url({
                include: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.gif"],
                limit: 8192,
            }),
            // image(),
            terser(),
        ],
        external: ["react", "react-dom", "clsx", "tailwind-merge"],
    },
    {
        input: "dist/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
        external: [/\.css/],
    },
];
