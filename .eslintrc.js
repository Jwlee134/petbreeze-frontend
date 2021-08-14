module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    quotes: ["error", "double"],
    "react-native/no-inline-styles": 0,
    curly: "off",
    "no-bitwise": "allow",
  },
};
