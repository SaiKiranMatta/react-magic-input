import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import url from "@rollup/plugin-url";

const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.main,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: "./tsconfig.json",
            }),
            postcss({
                plugins: [tailwindcss(), autoprefixer()],
                inject: true,
                extract: true,
                minimize: true,
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
        input: "src/index.ts",

        output: [{ file: packageJson.types }],

        plugins: [dts()],

        external: [/\.css/],
    },
];
