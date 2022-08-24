module.exports = {
    'env': {
        'browser': true,
        'node': true,
        'es2021': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'plugins': [
        'react',
        '@typescript-eslint',
    ],
    'rules': {
        'semi': ['error', 'always'], // 分号
        'no-prototype-builtins': 'off', // 禁止使用 Object.prototypes 中的属性
        'react/react-in-jsx-scope': 'off', // jsx 中的react
        'react/no-find-dom-node': ['off'], // findDOMNode在函数组件中的使用
        '@typescript-eslint/no-explicit-any': ['off'], // 不检查any类型
        '@typescript-eslint/no-var-requires': ['off'], // 不检查require
        '@typescript-eslint/consistent-type-imports': 'error', // 导入类型的规范
        '@typescript-eslint/no-unused-vars': 'error', // 不检查未使用的变量
        '@typescript-eslint/ban-ts-comment': ['off'], // 禁止使用ts注释
    },
};
