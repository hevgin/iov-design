const fs = require('fs');
const path = require('path');
const { generate } = require('@arco-design/color');

const colors = {
  primary: '#2F48FF',
  success: '#23B25D',
  warning: '#FF7D00',
  danger: '#F53F3F',
  gold: '#F7BA1E',
  blue: '#168CFF',
  purple: '#722ED1',
  pink: '#D91AD9',
  line: ['#EDEFF3', '#DCDFE6', '#D2D5DF', '#C3C7D1', '#E6E8ED'],
  fill: ['#F6F7F8', '#F2F3F5', '#E5E6EB', '#ABAFB5', '#777D87', '#494B53', '#212026', '#0D1722'],
  text: ['#C6C7CA', '#A2A3AA', '#6B707A', '#65677A', '#3D4158', '#212026', '#0D1722']
};

// 生成基础颜色
function generateBaseColor() {
  let baseColor = '';
  for (const name in colors) {
    baseColor = baseColor + `// --color-${name}\n`;
    const list = Array.isArray(colors[name]) ? colors[name] : generate(colors[name], {index: 10, list: true});
    // 蓝色微调
    if (name === 'primary') {
      list.splice(0, 2, '#F0F4FD', '#E3EBFF');
    }
    // 绿色微调
    if (name === 'success') {
      list.splice(0, 1, '#EFF9F3');
    }
    // 红色微调
    if (name === 'danger') {
      list.splice(0, 1, '#FFF1F1');
    }
    list.forEach((item, index) => {
      baseColor = baseColor + `$--color-${name}-${index + 1}: ${item} !default;\n`;
    });
    baseColor = baseColor + '\n';
  }
  return baseColor;
}

// 生成颜色文件
function createColorFile() {
  const baseColor = generateBaseColor();
  fs.writeFile(path.join(__dirname, './packages/theme-chalk/src/common/color.scss'), baseColor, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('color.scss数据写入成功');
    }
  });
}

createColorFile();

