// Custom Hexo tag: {% friendsLink path/to/_data.yml %}
// Based on yilin0121's reimu theme implementation

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const template = ({ name, url, desc = "", image = "" }) => {
  return `<div class="friend-item-wrap">
    <a href="${url}" rel="noopener nofollow noreferrer" target="_blank"></a>
    <div class="friend-icon-wrap">
      <img src="${image}" alt="${name}">
    </div>
    <div class="friend-info-wrap">
      <div class="friend-name">${name}</div>
      <div class="friend-desc">${desc}</div>
    </div>
  </div>`;
};

hexo.extend.tag.register('friendsLink', function(args) {
  const filePath = path.join(hexo.source_dir, args[0]);
  if (!fs.existsSync(filePath)) return '<p>找不到友鏈資料檔案</p>';

  const data = yaml.load(fs.readFileSync(filePath, 'utf8'));
  if (!Array.isArray(data) || data.length === 0) return '<p>暫無友鏈</p>';

  const cards = data
    .filter(item => item?.name && item?.url)
    .map(item => template(item))
    .join('');

  return `<div class="friend-wrap">${cards}</div>`;
});
