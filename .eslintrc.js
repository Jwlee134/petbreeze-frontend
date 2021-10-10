module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: { JSX: true, NodeJS: true }, // xxx is not defined 경고 제거
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["warn"], // 선언하기 전에 사용한다면 경고
    "no-param-reassign": "off", // 변수 재할당 허용
    "global-require": "off", // 함수 내에서 require 사용가능
    camelcase: "off", // 카멜 케이스 사용하지 않아도 됨
    "import/order": "off", // import 순서 무시
    "react/prop-types": "off", // propTypes 사용할 필요 없음
    "react/require-default-props": "off", // defaultProps 사용할 필요 없음
    "react/jsx-props-no-spreading": "off", // prop에 spread 연산자 허용
    "no-console": "off", // console.log 허용
    "no-nested-ternary": "off", // ternary operator nesting 허용
    "arrow-body-style": "off", // 화살표 함수 return 사용 허용
    "consistent-return": "off", // 화살표 함수 return 사용 허용
    "no-lonely-if": "off", // else 없이 if 사용 허용
    "no-await-in-loop": "off", // for문 내 await 사용 허용
    "dot-notation": "off", // object bracket 표기법 허용
    "no-shadow": "off", // 다른 스코프 내에서 변수 이름 중복 허용
    "react/no-array-index-key": "off", // key로 index사용 허용
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }], // for문 i++ 사용 허용
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }], // devDependency 모듈인데 dependency에 들어가야 한다는 에러 제거
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] }, // jsx를 사용가능한 파일 확장자명 설정
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      }, // import 시 확장자명을 써 줄 필요 없음
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".ts", ".tsx", ".d.ts", ".native.js"],
      },
    },
  },
};
