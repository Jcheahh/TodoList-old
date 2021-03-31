module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: [
        "react",
    ],
    rules: {
        quotes: ["error", "double"],
        indent: ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        camelcase: "off",
        "no-shadow": "off",
        "react/jsx-props-no-spreading": "off",
        "react/destructuring-assignment": "off",
        "import/prefer-default-export": "off",
    },
};
