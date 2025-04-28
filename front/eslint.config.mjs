import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:perfectionist/recommended-natural-legacy",
  ),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-jsx-props": "off",
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          ignoreCase: true,
          reservedFirst: true,
          shorthandLast: true,
        },
      ],
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^react$", "^next", "^[a-z]"],
            ["^@"],
            ["^@/application"],
            ["^@/views"],
            ["^@/widgets"],
            ["^@/features"],
            ["^@/entities"],
            ["^@/shared"],
            ["^@/"],
            ["\\/api$"],
            ["\\/config$"],
            ["\\/lib$"],
            ["\\/model$"],
            ["\\/ui$"],
            ["\\.provider$"],
            ["\\.context$"],
            ["\\.service$"],
            ["\\.util$"],
            ["\\.data$"],
            ["\\.const$"],
            ["\\.config$"],
            ["\\.enum$"],
            ["\\.type$"],
            ["\\.interface$"],
            ["^\\.\\.*/use[A-Z].*$", "^\\.*/use[A-Z].*$"],
            ["^\\.\\.(?!/?$)", "^\\.(?!/?$)"],
            ["^.+\\.json$"],
            ["^.+\\.svg$"],
            ["^.+\\.s?css$"],
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
