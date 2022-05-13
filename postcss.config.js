const autoprefixer = require('autoprefixer');

const browerslist = [
  'defaults',
  'not ie < 11',
  'last 2 versions',
  '> 1%',
  'iOS 7',
  'last 3 iOS versions',
];

module.exports = {
  plugins: [autoprefixer({ overrideBrowserslist: browerslist })],
};
