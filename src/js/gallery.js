// Gallery filtering and the photo viewer.
(function () {
  var buttons = document.querySelectorAll('[data-filter]');
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.tile'));
  var status = document.querySelector('.gallery-status');
  var emptyMessage = document.querySelector('.gallery-empty');
  var dialog = document.querySelector('.lightbox');
  var image = dialog.querySelector('.lightbox-image');
  var video = dialog.querySelector('.lightbox-video');
  var caption = dialog.querySelector('.lightbox-caption');
  var current = -1;
  var opener = null;

  function visibleTiles() {
    return tiles.filter(function (tile) { return !tile.hidden; });
  }

  function applyFilter(category) {
    tiles.forEach(function (tile) {
      tile.hidden = category !== 'all' && tile.dataset.category !== category;
    });
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', button.dataset.filter === category);
    });
    var count = visibleTiles().length;
    emptyMessage.hidden = count > 0;
    status.textContent = count > 0 ? 'Showing ' + count + ' items' : '';
  }

  function show(index) {
    var list = visibleTiles();
    current = (index + list.length) % list.length;
    var data = list[current].querySelector('.tile-button').dataset;
    video.pause();
    if (data.video) {
      image.hidden = true;
      image.removeAttribute('src');
      video.hidden = false;
      if (video.getAttribute('src') !== data.video) video.setAttribute('src', data.video);
      video.setAttribute('aria-label', data.alt);
    } else {
      video.hidden = true;
      video.removeAttribute('src');
      video.load();
      image.hidden = false;
      image.src = data.full;
      image.width = data.width;
      image.height = data.height;
      image.alt = data.alt;
    }
    caption.textContent = data.status ? data.status + ' — ' + data.alt : data.alt;
    if (data.credit) caption.textContent += ' · ' + data.credit;
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () { applyFilter(button.dataset.filter); });
  });

  tiles.forEach(function (tile) {
    tile.querySelector('.tile-button').addEventListener('click', function (event) {
      opener = event.currentTarget;
      show(visibleTiles().indexOf(tile));
      dialog.showModal();
    });
  });

  dialog.querySelector('.lightbox-close').addEventListener('click', function () { dialog.close(); });
  dialog.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
  dialog.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });

  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
  dialog.addEventListener('close', function () {
    video.pause();
    if (opener) opener.focus();
  });

  applyFilter('all');
})();
