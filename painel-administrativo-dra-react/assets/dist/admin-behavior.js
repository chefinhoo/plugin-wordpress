(function () {
  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var data = window.draPanelData || {};
    var numComments = parseInt(data.numComments, 10) || 0;
    var numMedia = parseInt(data.numMedia, 10) || 0;
    var numUsers = parseInt(data.numUsers, 10) || 0;

    document.querySelectorAll('#adminmenu a.menu-top').forEach(function (a) {
      var li = a.parentElement;
      var slot = document.createElement('span');
      slot.className = 'hoost-slot';

      if (li && li.classList.contains('wp-has-submenu')) {
        var arrow = document.createElement('span');
        arrow.className = 'hoost-arrow';
        arrow.innerHTML = '&#xf107;';
        slot.appendChild(arrow);
      }
      a.appendChild(slot);
    });

    function addMenuCount(slugPart, count) {
      if (!count) return;
      document.querySelectorAll('#adminmenu a.menu-top').forEach(function (a) {
        var href = a.getAttribute('href') || '';
        if (href.indexOf(slugPart) === -1) return;
        var slot = a.querySelector('.hoost-slot');
        if (!slot || slot.querySelector('.hoost-menu-count')) return;
        var span = document.createElement('span');
        span.className = 'hoost-menu-count';
        span.textContent = count;
        var arrow = slot.querySelector('.hoost-arrow');
        if (arrow) slot.insertBefore(span, arrow);
        else slot.appendChild(span);
      });
    }

    addMenuCount('edit-comments.php', numComments);
    addMenuCount('upload.php', numMedia);
    addMenuCount('users.php', numUsers);

    var overlay = document.createElement('div');
    overlay.id = 'hoost-mobile-overlay';
    document.body.appendChild(overlay);

    var hamburger = document.createElement('button');
    hamburger.id = 'hoost-hamburger';
    hamburger.type = 'button';
    hamburger.innerHTML = '<span>☰</span>';
    hamburger.setAttribute('aria-label', 'Menu');
    document.body.appendChild(hamburger);

    var menuWrap = document.getElementById('adminmenuwrap');

    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menuWrap) menuWrap.classList.toggle('hoost-mobile-open');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', function () {
      if (menuWrap) menuWrap.classList.remove('hoost-mobile-open');
      overlay.classList.remove('active');
    });

    var topbar = document.createElement('div');
    topbar.id = 'hoost-topbar';
    topbar.innerHTML =
      '<div class="hoost-topbar-inner">' +
      '<div class="hoost-brand">Painel Administrativo DRA</div>' +
      '<div class="hoost-user">' + escapeHtml(data.userName || '') + '</div>' +
      '</div>';
    document.body.insertBefore(topbar, document.body.firstChild);
  });
})();
