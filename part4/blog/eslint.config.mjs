import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  pluginJs.configs.recommended,
  {
    ignores: ["dist/**"],
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': ['error',2],
      '@stylistic/js/linebreak-style': ['error','unix'],
      '@stylistic/js/quotes': ['error','single'],
      '@stylistic/js/semi': ['error','never'],
    },
  },
];