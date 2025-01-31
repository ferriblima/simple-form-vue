/**
 * This file configures Babel, a JavaScript compiler.
 * Babel is used to convert modern JavaScript (ES6+) into older versions
 * to ensure compatibility with different browsers.
 * 
 * In a Vue.js project, Babel helps transpile modern Vue code
 * so it works correctly in older environments.
 */

module.exports = {
  // The `presets` array defines the base configurations for Babel.
  presets: [
    // This preset is provided by Vue CLI and includes necessary Babel plugins
    // for compiling Vue.js applications.
    '@vue/cli-plugin-babel/preset'
  ]
}
