var fs = require('fs');
var path = require('path');
var Components = require('../../components.json');
var themes = [
  'theme-chalk'
];
Components = Object.keys(Components);
var basepath = path.resolve(__dirname, '../../packages/');

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

function mkdirsSync(dirPath) {
  if (fs.existsSync(dirPath)) {
    return true;
  }
  var parent = path.dirname(dirPath);
  if (!fs.existsSync(parent)) {
    mkdirsSync(parent);
  }
  fs.mkdirSync(dirPath);
}

function copyDirSync(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    mkdirsSync(destDir);
  }

  fs.readdirSync(srcDir).forEach(function(file) {
    var srcPath = path.join(srcDir, file);
    var destPath = path.join(destDir, file);
    var stat = fs.statSync(srcPath);

    if (stat.isFile()) {
      fs.copyFileSync
        ? fs.copyFileSync(srcPath, destPath)
        : fs.writeFileSync(destPath, fs.readFileSync(srcPath));
    } else if (stat.isDirectory()) {
      copyDirSync(srcPath, destPath); // 递归处理子目录
    }
  });
}

themes.forEach((theme) => {
  var isSCSS = theme !== 'theme-default';
  var indexContent = isSCSS ? '@import "./base.scss";\n' : '@import "./base.css";\n';
  Components.forEach(function(key) {
    if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
    var fileName = key + (isSCSS ? '.scss' : '.css');
    indexContent += '@import "./' + fileName + '";\n';
    var filePath = path.resolve(basepath, theme, 'src', fileName);
    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8');
      console.log(theme, ' 创建遗漏的 ', fileName, ' 文件');
    }
  });
  fs.writeFileSync(path.resolve(basepath, theme, 'src', isSCSS ? 'index.scss' : 'index.css'), indexContent);

  var srcAssetsPath = path.resolve(basepath, theme, 'src/assets');
  var distAssetsPath = path.resolve(basepath, theme, 'lib/assets');

  if (fs.existsSync(srcAssetsPath)) {
    copyDirSync(srcAssetsPath, distAssetsPath);
    console.log(theme, '复制 assets 完成');
  }
});
