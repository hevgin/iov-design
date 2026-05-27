'use strict';

var fs = require('fs');
var path = require('path');

var fontDir = path.resolve(__dirname, '../../font');
var targetFontsDir = path.resolve(__dirname, '../../packages/theme-chalk/src/fonts');
var targetScssFile = path.resolve(__dirname, '../../packages/theme-chalk/src/iovfont.scss');
var targetSvgJsFile = path.resolve(__dirname, '../../src/utils/iov-svg-icon.js');

var whitelist = [
  'excel',
  'word',
  'pdf',
  'ppt',
  'img',
  'zip',
  'other',
  'img-fail',
  'img-placeholder',
  'clear',
  'clear-hover',
  'unfold',
  'fold',
  'flash'
];

if (!fs.existsSync(targetFontsDir)) {
  fs.mkdirSync(targetFontsDir, { recursive: true });
}

var fontExts = ['.woff2', '.woff', '.ttf'];
fontExts.forEach(function(ext) {
  var src = path.join(fontDir, 'iconfont' + ext);
  var dest = path.join(targetFontsDir, 'iovfont' + ext);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Copied: ' + src + ' -> ' + dest);
  } else {
    console.warn('Warning: Font file not found: ' + src);
  }
});

var cssContent = fs.readFileSync(path.join(fontDir, 'iconfont.css'), 'utf8');

var scssContent = cssContent
  .replace(/font-family:\s*"iconfont"/, "font-family: 'iovfont'")
  .replace(/url\('iconfont\.(woff2|woff|ttf)([^']*)'\)/g, "url('./fonts/iovfont.$1$2')")
  .replace(/\.iconfont\s*\{[^}]*\}/, '')
  .replace(/\.icon-/g, '.iov-icon-');

fs.writeFileSync(targetScssFile, scssContent);
console.log('Generated: ' + targetScssFile);

if (whitelist.length > 0) {
  var iconfontJs = fs.readFileSync(path.join(fontDir, 'iconfont.js'), 'utf8');
  var svgMatch = iconfontJs.match(/window\._iconfont_svg_string_\d+\s*=\s*'(<svg>.*<\/svg>)'/);
  if (!svgMatch) {
    console.warn('Warning: Could not extract SVG string from iconfont.js');
  } else {
    var svgString = svgMatch[1];
    var symbolRegex = /<symbol\s+id="icon-([^"]+)"[^>]*>[\s\S]*?<\/symbol>/g;
    var allSymbols = [];
    var match;
    while ((match = symbolRegex.exec(svgString)) !== null) {
      allSymbols.push({ id: match[1], full: match[0] });
    }

    var whitelistMap = {};
    whitelist.forEach(function(name) { whitelistMap[name] = true; });
    var filteredSymbols = allSymbols.filter(function(s) {
      return whitelistMap[s.id];
    });

    var filteredSvg = filteredSymbols.map(function(s) {
      return s.full.replace(/id="icon-/, 'id="iov-icon-');
    }).join('');

    var output = '(function() {\n';
    output += '  if (typeof document === \'undefined\') return;\n';
    output += '  var svgStr = \'<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden">\' + \'' + filteredSvg.replace(/'/g, "\\'") + '\' + \'</svg>\';\n';
    output += '  var div = document.createElement(\'div\');\n';
    output += '  div.innerHTML = svgStr;\n';
    output += '  document.body.insertBefore(div.firstChild, document.body.firstChild);\n';
    output += '})();\n';

    var targetDir = path.dirname(targetSvgJsFile);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(targetSvgJsFile, output);
    console.log('Generated: ' + targetSvgJsFile + ' (' + filteredSymbols.length + '/' + allSymbols.length + ' icons)');
  }
} else {
  console.log('Whitelist is empty, skipping SVG icon generation.');
}
