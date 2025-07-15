const ICON_MAP = {
  img: require('./assets/img.png'),
  pdf: require('./assets/pdf.png'),
  excel: require('./assets/excel.png'),
  zip: require('./assets/zip.png'),
  rar: require('./assets/zip.png'),
  '7z': require('./assets/zip.png'),
  ppt: require('./assets/ppt.png'),
  word: require('./assets/word.png'),
  default: require('./assets/file.png')
};

export function iconStyle(fileName) {
  const suffixMap = {
    img: ['png', 'jpg', 'jpeg'],
    word: ['doc', 'docx'],
    excel: ['xls', 'xlsx'],
    ppt: ['ppt', 'pptx']
  };

  const ext = fileName.split('.').pop().toLowerCase();

  for (const [key, list] of Object.entries(suffixMap)) {
    if (list.includes(ext)) {
      return { 'background-image': `url(${ICON_MAP[key]})` };
    }
  }

  return { 'background-image': `url(${ICON_MAP[ext] || ICON_MAP.default})` };
}
