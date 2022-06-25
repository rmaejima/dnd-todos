module.exports = {
  trailingComma: 'all',
  semi: true,
  singleQuote: true,
  importOrder: [
    '^@core/(.*)$',
    '^@server/(.*)$',
    '^@ui/(.*)$',
    'react',
    'contexts',
    'consts',
    'pages',
    'components/(.*)$',
    'utils',
    'types',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
