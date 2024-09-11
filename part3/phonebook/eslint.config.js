import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: ["dist/assets/*.{js,mjs,cjs,jsx}"],
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { 
      globals: globals.browser,
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@stylistic/js/indent': ['error',2],
      '@stylistic/js/linebreak-style': ['error','unix' ],
    },
  },
];