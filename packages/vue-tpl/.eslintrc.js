module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  plugins: ["vue"],
  rules: {}
};