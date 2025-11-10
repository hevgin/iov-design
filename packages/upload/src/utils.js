import ICON_MAP from 'iov-design/src/utils/file-icon';

export function iconStyle(fileName) {
  if (!fileName) return {};

  const ext = fileName.split('.').pop().toLowerCase();
  const iconUrl = ICON_MAP[ext] || ICON_MAP.default;

  return { backgroundImage: `url(${iconUrl})` };
}
