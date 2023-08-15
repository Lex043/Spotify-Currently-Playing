# React + TypeScript + Vite + tailwindcss boilerplate

This is a boilerplate starter for a react project so i don't keep having to set it up every time i want to start a new project.
It's just a boilerplate with few things i like to have in my projects.

## Installation and Dev

clone the repo or click the use this template button

```bash
  git clone https://github.com/lex043/vite-react-boilerplate.git
```

Go to the project directory

```bash
  cd vite-react-boilerplate
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
