// Click-to-enlarge screenshots for the project cards on www.ucaiug.io.
// Uses the native <dialog> element: Esc closes it, focus is trapped while open
// and returns to the thumbnail afterwards. No libraries.
(function () {
  var lb = document.getElementById('uca-lightbox');
  if (!lb || typeof lb.showModal !== 'function') return; // very old browser: thumbnails stay plain images

  var img = document.getElementById('uca-lb-img');
  var title = document.getElementById('uca-lb-title');
  var caption = document.getElementById('uca-lb-caption');
  var site = document.getElementById('uca-lb-site');
  var repo = document.getElementById('uca-lb-repo');
  var opener = null;

  document.addEventListener('click', function (e) {
    var b = e.target.closest('.uca-thumb');
    if (!b) return;
    opener = b;
    img.src = b.dataset.full;
    img.alt = b.dataset.caption;
    title.textContent = b.dataset.title;
    caption.textContent = b.dataset.caption;
    site.hidden = !b.dataset.site;
    site.href = b.dataset.site || '#';
    repo.href = b.dataset.repo;
    lb.showModal();
  });

  lb.querySelector('.uca-lb-close').addEventListener('click', function () { lb.close(); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); }); // click on the dimmed backdrop
  lb.addEventListener('close', function () {
    img.removeAttribute('src');
    if (opener) opener.focus();
  });
})();
