import ICON_MAP from 'iov-design/src/utils/file-icon';

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
