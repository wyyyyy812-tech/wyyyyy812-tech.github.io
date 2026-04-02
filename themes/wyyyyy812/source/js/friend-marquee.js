(function() {
  function extractFriendData() {
    const friendItems = document.querySelectorAll('.friend-item-wrap');
    const friends = [];
    friendItems.forEach(item => {
      const link = item.querySelector('a');
      const img = item.querySelector('.friend-icon-wrap img');
      const name = item.querySelector('.friend-name');
      const desc = item.querySelector('.friend-desc');
      if (link && img && name) {
        friends.push({
          name: name.textContent.trim(),
          url: link.href,
          desc: desc ? desc.textContent.trim() : '',
          image: img.src
        });
      }
    });
    return friends;
  }

  function initMarquee() {
    const friendWrap = document.querySelector('.friend-wrap');
    if (!friendWrap) return;

    const friends = extractFriendData();
    if (friends.length === 0) return;

    const marqueeContainer = document.createElement('div');
    marqueeContainer.className = 'friend-marquee-container';

    const row1 = createMarqueeRow(friends, 'row1');
    const row2 = createMarqueeRow(friends, 'row2');

    marqueeContainer.appendChild(row1);
    marqueeContainer.appendChild(row2);

    friendWrap.insertBefore(marqueeContainer, friendWrap.firstChild);
  }

  function createMarqueeRow(data, rowClass) {
    const row = document.createElement('div');
    row.className = 'friend-marquee-row ' + rowClass;

    const track = document.createElement('div');
    track.className = 'friend-marquee-track';

    const repeatTimes = 15;
    for (let i = 0; i < repeatTimes; i++) {
      data.forEach(function(friend) {
        track.appendChild(createMarqueeItem(friend));
      });
    }

    row.appendChild(track);
    return row;
  }

  function createMarqueeItem(friend) {
    const item = document.createElement('a');
    item.className = 'friend-marquee-item';
    item.href = friend.url;
    item.target = '_blank';
    item.rel = 'noopener noreferrer';

    const img = document.createElement('img');
    img.src = friend.image;
    img.alt = friend.name;
    img.loading = 'eager';

    const name = document.createElement('div');
    name.className = 'friend-marquee-name';
    name.textContent = friend.name;

    item.appendChild(img);
    item.appendChild(name);
    return item;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMarquee);
  } else {
    initMarquee();
  }
})();
