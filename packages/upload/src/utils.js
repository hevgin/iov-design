const ICON_MAP = {
  img: '//obs-helf.cucloud.cn/prod-common-public/iov-design/img.png', // require('./assets/img.png'),
  pdf: '//obs-helf.cucloud.cn/prod-common-public/iov-design/pdf.png', // require('./assets/pdf.png'),
  excel: '//obs-helf.cucloud.cn/prod-common-public/iov-design/excel.png', // require('./assets/excel.png'),
  zip: '//obs-helf.cucloud.cn/prod-common-public/iov-design/zip.png', // require('./assets/zip.png'),
  rar: '//obs-helf.cucloud.cn/prod-common-public/iov-design/zip.png', // require('./assets/zip.png'),
  '7z': '//obs-helf.cucloud.cn/prod-common-public/iov-design/zip.png', // require('./assets/zip.png'),
  ppt: '//obs-helf.cucloud.cn/prod-common-public/iov-design/ppt.png', // require('./assets/ppt.png'),
  word: '//obs-helf.cucloud.cn/prod-common-public/iov-design/word.png', // require('./assets/word.png'),
  default: '//obs-helf.cucloud.cn/prod-common-public/iov-design/file.png' // require('./assets/file.png')
};

export function iconStyle(fileName) {
  if (!fileName) return;
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
