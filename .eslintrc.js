module.exports = {
    root: true,
    env: {
        node: true,
        jest: true // Add this line to recognize Jest globals
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {}
};